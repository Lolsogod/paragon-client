import Button from "../ui/Button";
import axios from "axios";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";

const AddBrand = () =>{
    const auth = useContext(AuthContext)
    const [brand, setBrand] = useState<string>('')
    const send = ()=>{
        axios.post('/api/cars/brand', {brand},
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res=>console.log(res))
    }
    const changeHandler = (event: any) =>{
        setBrand(event.target.value)
    }
    return(
        <div>
            <h2>Добавить брэнд</h2>
            <input type="text" placeholder="Введите имя"
            onChange={changeHandler} value={brand}/>
            <Button onClick={send}>Добавить</Button>
        </div>
    )
}
export default AddBrand