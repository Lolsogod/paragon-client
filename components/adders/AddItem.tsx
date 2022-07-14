import classes from '../editors/EditItem.module.css'
import Card from "../ui/Card";
import Image from "next/image"
import sampleCar from "../../public/sample_car.jpg"
import Button from "../ui/Button";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";

const EditItem = (props: any) => {
    const auth = useContext(AuthContext)
    const [form, setForm] = useState({
        brand_id: props.brand.id, model_id: props.model.id,
        year: props.year, price: props.price, condition: props.condition
    })

    const changeHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value})
    }
    //TODO: поднять выше но попозже

    const [models, setModels] = useState<any[]>([])

    useEffect(()=>{
        if(!!auth.token){
            if(!!form.brand_id){
                axios.get(`/api/cars/model?brand_id=${form.brand_id}`,
                    {headers: {Authorization: `Bearer ${auth.token}`}})
                    .then(res => setModels(res.data))
            }else setModels([])
        }
    },[auth.token, form.brand_id])


    const addHandler = () =>{
        axios.post('/api/cars/',{...form},
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res => console.log(res))
    }

    return(
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <Image src={sampleCar}></Image>
                </div>
                <div className={classes.content}>
                    <div className={classes.flex}>
                        <select value={form.brand_id} onChange={changeHandler} id="brand_id" name="brand_id">
                            <option value="">----------</option>
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
                               onChange={changeHandler} name='price' id='price'/> руб
                        <select value={form.condition} onChange={changeHandler} id="condition" name="condition">
                            <option value="">----------</option>
                            <option  value='NEW'>NEW</option>
                            <option  value='USED'>USED</option>
                        </select>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button onClick={addHandler}>Добавить</Button>
                </div>

            </Card>
        </li>
    )
}

export default EditItem;