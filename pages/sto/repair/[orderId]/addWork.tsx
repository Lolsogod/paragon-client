import PartRequestList from "../../../../components/sto/PartRequestList";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import {AuthCtx, PartType, WorkRequest} from "../../../../interfaces/interfaces";
import {AuthContext} from "../../../../context/AuthContext";
import axios from "axios";
import {useRouter} from "next/router";
import Button from "../../../../components/ui/Button";
import {useAuthCheck} from "../../../../hooks/auth.check.hook";
import classes from "../../../../components/editors/EditItem.module.css";
import {toast} from "react-toastify";

const AddWork = () =>{
    const { query } = useRouter()
    const router = useRouter()
    const auth = useContext<AuthCtx>(AuthContext)
    const [types, setTypes] = useState<PartType[]>([])
    const [work, setWork] = useState<WorkRequest>({
        order: "", description:"", used_parts: [], work_price: 0
    } )
    useEffect(()=>{
        setWork({...work, order: query.orderId})
    },[query.orderId, auth.token])

    useEffect(()=>{
        axios.get('/api/parts/getAllTypes',
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res => setTypes(res.data))
            .catch(res=> toast.error(res.response.data))
    },[auth.token])
    const changeHandler = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setWork({...work, [event.target.name]: event.target.value})
    }
    const addHandler = () =>{
        axios.post('/api/works/addWork', work,
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(() => {
                toast.success("Работа добавленна.")
                router.push(`/sto/repair/${work.order}`)
            })
            .catch(res=> toast.error(res.response.data))
    }

    const {checkRole, PushBack} = useAuthCheck()
    if (checkRole("WORKER")) return <PushBack/>
    return(
        <div>
            <h1>Работа</h1>
            <div className={classes.flexCenter}>
                <div>
                    <label htmlFor="description">Описание</label>
                    <input type="text" placeholder="Введите описание"
                           onChange={changeHandler} value={work.description} name='description'/>
                </div>
                <div>
                    <label htmlFor="work_price">Цена</label>
                    <input type="number" placeholder="Введите цену"
                           onChange={changeHandler} value={work.work_price} name='work_price'/></div>
                </div>
            Детали для работы
            <br/><br/>
            <PartRequestList types={types} repair={true} work={work} setWork={setWork}/>
            <Button onClick={addHandler}>Добвить</Button>
        </div>

    )
}
export default AddWork