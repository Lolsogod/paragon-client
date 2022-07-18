import PartRequestList from "../../../../components/sto/PartRequestList";
import {ChangeEvent, useContext, useEffect, useState} from "react";
import {AuthCtx, PartType, WorkRequest} from "../../../../interfaces/interfaces";
import {AuthContext} from "../../../../context/AuthContext";
import axios from "axios";
import {useRouter} from "next/router";
import Button from "../../../../components/ui/Button";

const AddWork = () =>{
    const { query } = useRouter()
    const auth = useContext<AuthCtx>(AuthContext)
    const [types, setTypes] = useState<PartType[]>([])
    const [work, setWork] = useState<WorkRequest>({
        order: "", description:"", used_parts: [], work_price: 0
    } )
    useEffect(()=>{
        setWork({...work, order: query.orderId})
    },[query.orderId])

    useEffect(()=>{
        if(!!auth.token){
            axios.get('/api/parts/getAllTypes',
                {headers: {Authorization: `Bearer ${auth.token}`}})
                .then(res => setTypes(res.data))
        }
    },[auth.token])
    const changeHandler = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setWork({...work, [event.target.name]: event.target.value})
    }
    const addHandler = () =>{
        axios.post('/api/works/addWork', work,
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(() => alert("успешно добавлено"))
    }
    return(
        <div>
            <h1>Работа</h1>
            <input type="text" placeholder="Введите описание"
                   onChange={changeHandler} value={work.description} name='description'/>
            <input type="number" placeholder="Введите цену"
                   onChange={changeHandler} value={work.work_price} name='work_price'/>
            <br/>
            Детали для работы
            <PartRequestList types={types} repair={true} work={work} setWork={setWork}/>
            <Button onClick={addHandler}>Добвить</Button>
        </div>

    )
}
export default AddWork