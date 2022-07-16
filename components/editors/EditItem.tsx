import Card from "../ui/Card";
import classes from './EditItem.module.css'
import Image from "next/image"
import sampleCar from "../../public/sample_car.jpg"
import Button from "../ui/Button";
import {ChangeEvent, FC, useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {AddCarResponse, AuthCtx, ItemProps, Model} from "../../interfaces/interfaces";

const EditItem: FC<ItemProps> = (props) => {
    const auth = useContext<AuthCtx>(AuthContext)
    const [form, setForm] = useState<AddCarResponse>({
        brand_id: props.brand.id, model_id: props.model.id,
        year: props.year, price: props.price, condition: props.condition
    })

    const changeHandler = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const [models, setModels] = useState<Model[]>([])
    useEffect(()=>{
        if(!!auth.token && !!form.brand_id){
            axios.get(`/api/cars/model?brand_id=${form.brand_id}`,
                {headers: {Authorization: `Bearer ${auth.token}`}})
                .then(res => setModels(res.data))
        }
    },[auth.token, form.brand_id])


    const saveHandler = () =>{
        axios.post('/api/cars/edit',{...form, id: props.id},
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res => console.log(res))
    }
    const deleteHandler = () =>{
        axios.post(`/api/cars/delete/${props.id}`,{},
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(() => alert("deleted!"))
    }

    return(
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <Image src={sampleCar} alt='car'/>
                </div>
                <div className={classes.content}>
                    <div className={classes.flex}>
                        <div>id({props.id})</div>
                        <select value={form.brand_id} onChange={changeHandler} id="brand_id" name="brand_id">
                            {props.brands.map((br: any, index:any) =>{
                                return(<option key={index} value={br.id}>{br.brand}</option>)})}
                        </select>
                        <select value={form.model_id} onChange={changeHandler} id="model_id" name="model_id">
                            <option value="">----------</option>
                            {models.map((md, index) =>{
                                return(<option key={index} value={md.id}>{md.model}</option>)})}
                        </select>
                        <input className={classes.year} type="number" min="1900" max="2022" step="1" value={form.year}
                               onChange={changeHandler} name='year' id='year'/>
                    </div>
                    <div className={classes.flex}>
                        <input className={classes.price} type="number" value={form.price}
                               onChange={changeHandler} name='price' id='price'/>руб
                        <select value={form.condition} onChange={changeHandler} id="condition" name="condition">
                            <option  value='NEW'>NEW</option>
                            <option  value='USED'>USED</option>
                        </select>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button onClick={saveHandler}>Сохранить</Button>
                    <Button onClick={deleteHandler}>Удалить</Button>
                </div>

            </Card>
        </li>
    )
}

export default EditItem;