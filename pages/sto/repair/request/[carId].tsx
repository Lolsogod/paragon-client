import {NextPage} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import {AuthCtx, RepairOrderRequest, WorkType} from "../../../../interfaces/interfaces";
import {AuthContext} from "../../../../context/AuthContext";
import axios from "axios";
import Button from "../../../../components/ui/Button";
import {useAuthCheck} from "../../../../hooks/auth.check.hook";

const RepairCarId: NextPage = () => {
    const auth = useContext<AuthCtx>(AuthContext);
    const { query } = useRouter();
    const [repairOrder, setReapairOrder] = useState<RepairOrderRequest>({
        car_id: query.carId, description: '', work_type: 0
    })
    const changeHandler = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setReapairOrder({...repairOrder, [event.target.name]: event.target.value})
    }
    useEffect(()=>{
        setReapairOrder({...repairOrder, car_id: query.carId})
    },[query.carId])
    const [workTypes, setWorkTypes] = useState<WorkType[]>([]);

    useEffect(() => {
        if (!!auth.token) {
            axios.get("/api/works/getTypes",
                {headers: { Authorization: `Bearer ${auth.token}`},})
                .then(res => setWorkTypes(res.data))
                .catch(e => console.log(e));
        }
    }, [auth.token]);
    const send = () =>{
        axios.post('/api/orders/repairOrder', repairOrder,
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(() => alert("успешно отправлено"))
    }
    const {checkAuth, PushBack} = useAuthCheck()
    if (!checkAuth()) return <PushBack/>
    //TODO: чекать принадлежность машины юзеру
    return (
        <div>
            <Head>
                <title>Ремонт</title>
            </Head>
            <h1>Запрос на ремонт</h1>
            <input type="text" placeholder="Введите описание проблемы"
                   onChange={changeHandler} value={repairOrder.description}
                   name="description" id="description"/>
            <select value={repairOrder.work_type} onChange={changeHandler} id="work_type" name="work_type">
                <option value="">----------</option>
                {workTypes.map((wt: WorkType, index:number) =>{
                    return(<option key={index} value={wt.id}>{wt.name}</option>)})}
            </select>
            <Button onClick={send}>Отправить</Button>

        </div>
    )
}

export default RepairCarId