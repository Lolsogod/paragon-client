import Button from "../ui/Button";
import axios from "axios";
import {ChangeEvent, FC, useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {AuthCtx, Brand} from "../../interfaces/interfaces";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const AddModel: FC<{brands: Brand[]}> = (props) =>{
    const auth = useContext<AuthCtx>(AuthContext)
    const router = useRouter()
    const [model, setModel] = useState<string>('')
    const [brand, setBrand] = useState<string>('')
    const send = ()=>{
        axios.post('/api/cars/addModel', {model, brand_id: brand},
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(()=> {
                toast.success("Модель добавленна.")
                router.push("/admin")
            })
            .catch(()=> toast.error("Введены некоректные данные."))
    }
    const changeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
        setModel(event.target.value)
    }
    const brandChange = (event: ChangeEvent<HTMLSelectElement>) =>{
        setBrand(event.target.value)
    }

    return(
        <div>
            <h2>Добавить модель</h2>
            <label htmlFor="brand_id">Брэнд</label>
            <select value={brand} onChange={brandChange} id="brand_id" name="brand_id">
                <option value="">----------------</option>
                {props.brands.map((br: any, index:any) =>{
                    return(<option key={index} value={br.id}>{br.brand}</option>)})}
            </select>
            <br/><br/>
            <input type="text" placeholder="Введите имя"
                   onChange={changeHandler} value={model}/>
            <br/><br/>
            <Button onClick={send}>Добавить</Button>
        </div>
    )
}
export default AddModel