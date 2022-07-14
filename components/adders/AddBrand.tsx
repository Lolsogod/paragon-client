import Button from "../ui/Button";
import axios from "axios";
import {ChangeEvent, FC, useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {AuthCtx} from "../../interfaces/interfaces";

const AddBrand: FC  = () =>{
    const auth: AuthCtx = useContext(AuthContext)
    const [brand, setBrand] = useState<string>('')
    const send = () => {
        axios.post('/api/cars/brand', {brand},
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res=>console.log(res))
            .catch(()=>alert("Неудалось добавить брэнд..."))
    }
    const changeHandler = (event: ChangeEvent<HTMLInputElement>) =>{
        setBrand(event.target.value)
    }
    return(
        <div>
            <h2>Добавить брэнд</h2>
            <input type="text" placeholder="Введите имя"
            onChange={changeHandler} value={brand}/>
            <br/><br/>
            <Button onClick={send}>Добавить</Button>
        </div>
    )
}
export default AddBrand