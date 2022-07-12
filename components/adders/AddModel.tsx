import Button from "../ui/Button";
import axios from "axios";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";

const AddModel = (props: any) =>{
    const auth = useContext(AuthContext)
    const [model, setModel] = useState<string>('')
    const [brand, setBrand] = useState<string>('')
    const send = ()=>{
        axios.post('/api/cars/model', {model, brand_id: brand},
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res=>console.log(res))
    }
    const changeHandler = (event: any) =>{
        setModel(event.target.value)
    }
    const brandChange = (event: any) =>{
        setBrand(event.target.value)
    }

    return(
        <div>
            <h2>Добавить модель</h2>
            <h4>брэнд</h4>
            <select value={brand} onChange={brandChange} id="brand_id" name="brand_id">
                <option value="">----------------</option>
                {props.brands.map((br: any, index:any) =>{
                    return(<option key={index} value={br.id}>{br.brand}</option>)})}
            </select>
            <br/>
            <input type="text" placeholder="Введите имя"
                   onChange={changeHandler} value={model}/>
            <Button onClick={send}>Добавить</Button>
        </div>
    )
}
export default AddModel