import classes from '../editors/EditItem.module.css'
import Card from "../ui/Card";
import Image from "next/image"
import sampleCar from "../../public/sample_car.jpg"
import Button from "../ui/Button";
import {ChangeEvent, FC, useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {AddCarResponse, AuthCtx,ItemProps, Model} from "../../interfaces/interfaces";
import {toast} from "react-toastify";
import {useRouter} from "next/router";



const AddItem: FC<ItemProps> = (props) => {
    const auth = useContext<AuthCtx>(AuthContext)
    const router = useRouter()
    const [form, setForm] = useState<AddCarResponse>({
        brand_id: props.brand.id, model_id: props.model.id,
        year: props.year, price: props.price, condition: props.condition,
        img_url: props.img_url
    })

    const changeHandler = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const [models, setModels] = useState<Model[]>([])
    useEffect(()=>{
        if(!!form.brand_id){
            axios.get(`/api/cars/model?brand_id=${form.brand_id}`,
                {headers: {Authorization: `Bearer ${auth.token}`}})
                .then(res => setModels(res.data))
                .catch(res=> toast.error(res.response.data))
        }else setModels([])
    },[form.brand_id, auth.token])

    const addHandler = () =>{
        axios.post('/api/cars/addCar', form,
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(() =>
                router.push("/admin")
                    .then(() => toast.success("Машина добавленна"))
            )
            .catch(res=> {
                console.log(res)
                toast.error(res.response.data)
            })
    }

    return(
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    {form.img_url?<img src={form.img_url} alt="car"/>:
                    <Image src={sampleCar} alt='car'/>}
                </div>
                <div className={classes.content}>
                    <div className={classes.flexCenter}>
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
                               onChange={changeHandler} name='year' id='year'/> год
                    </div>
                    <div className={classes.flexCenter}>
                        <input className={classes.price} type="number" value={form.price}
                               onChange={changeHandler} name='price' id='price'/> руб
                        <select value={form.condition} onChange={changeHandler} id="condition" name="condition">
                            <option value="">----------</option>
                            <option  value='NEW'>NEW</option>
                            <option  value='USED'>USED</option>
                        </select>
                        <input type="text" value={form.img_url} placeholder="Url изображения"
                               onChange={changeHandler} name='img_url' id='img_url'/>
                    </div>
                </div>
                <div className={classes.actions}>
                    <Button onClick={addHandler}>Добавить</Button>
                </div>

            </Card>
        </li>
    )
}
export default AddItem;