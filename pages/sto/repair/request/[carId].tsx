import {NextPage} from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import {AuthCtx, RepairOrderRequest, WorkType} from "../../../../interfaces/interfaces";
import {AuthContext} from "../../../../context/AuthContext";
import axios from "axios";
import Button from "../../../../components/ui/Button";
import {useAuthCheck} from "../../../../hooks/auth.check.hook";
import {toast} from "react-toastify";

const RepairCarId: NextPage = () => {
    const auth = useContext<AuthCtx>(AuthContext);
    const { query } = useRouter();
    const router = useRouter()
    const [repairOrder, setReapairOrder] = useState<RepairOrderRequest>({
        car_id: query.carId, description: '', work_type: 0
    })
    const changeHandler = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setReapairOrder({...repairOrder, [event.target.name]: event.target.value})
    }
    const [own, setOwn] = useState<boolean>(false)
    useEffect(()=>{
        setReapairOrder({...repairOrder, car_id: query.carId})
    },[query.carId,  auth.token])
    const [workTypes, setWorkTypes] = useState<WorkType[]>([]);

    useEffect(() => {
        axios.get("/api/works/getTypes",
            {headers: { Authorization: `Bearer ${auth.token}`},})
            .then(res => setWorkTypes(res.data))
            .catch(res=> toast.error(res.response.data))
    }, [ auth.token]);
    useEffect(()=>{
        if (repairOrder.car_id)
            axios.get(`/api/account/checkCar?id=${repairOrder.car_id}`,
                {headers: { Authorization: `Bearer ${auth.token}`},})
                .then(res => setOwn(res.data))
                .catch(()=> setOwn(false))
    },[repairOrder.car_id, auth.token])
    const send = () =>{
        axios.post(`/api/orders/repairOrder`, repairOrder,
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(() => {
                router.push("/profile")
                    .then(()=>toast.success("Запрос успешно отправлен!"))
            })
            .catch(res=> toast.error(res.response.data))
    }
    const {checkAuth, PushBack} = useAuthCheck()
    if (!checkAuth()) return <PushBack/>
    console.log(own)
    if (own){
        return (
            <div>
                <Head>
                    <title>Ремонт</title>
                </Head>
                <h1>Запрос на ремонт</h1>
                <div className="flexCenter">
                    <input style={{"width": "20rem"}} type="text" placeholder="Введите описание проблемы"
                           onChange={changeHandler} value={repairOrder.description}
                           name="description" id="description"/>
                    <select value={repairOrder.work_type} onChange={changeHandler} id="work_type" name="work_type">
                        <option value="">----------</option>
                        {workTypes.map((wt: WorkType, index:number) =>{
                            return(<option key={index} value={wt.id}>{wt.name}</option>)})}
                    </select>
                    <Button onClick={send}>Отправить</Button>
                </div>
            </div>
        )
    }
    return (<div>Машина не найдена или не пренадлежит вам</div>)

}

export default RepairCarId