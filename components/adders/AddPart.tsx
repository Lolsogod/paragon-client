import {ChangeEvent, FC, useContext, useEffect, useState} from "react";
import {AuthCtx, Brand, Model, PartRequest, PartType} from "../../interfaces/interfaces";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import classes from "../editors/EditItem.module.css";
import Button from "../ui/Button";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const AddPart: FC<{brands: Brand[], types: PartType[]} > = (props) =>{
    const auth = useContext<AuthCtx>(AuthContext)
    const router= useRouter()
    const [partRequest, setParRequest] = useState<PartRequest>(
        {name: '', brand: 0, model: 0, price:0, type: 0}
    )

    const [models, setModels] = useState<Model[]>([])
    useEffect(()=>{
        if(!!partRequest.brand){
            axios.get(`/api/cars/model?brand_id=${partRequest.brand}`,
                {headers: {Authorization: `Bearer ${auth.token}`}})
                .then(res => setModels(res.data))
        }else setModels([])
    },[partRequest.brand])

    const changeHandler = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setParRequest({...partRequest, [event.target.name]: event.target.value})
    }
    const addHandler = () =>{
        axios.post('/api/parts/addPart', partRequest,
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res => router.push("/admin")
                .then(()=>toast.success("Деталь добавленна.")))
            .catch(res=> toast.error(res.response.data))
    }
    return(

       <div className={classes.flexCenter}>
           <input type="text" placeholder="Введите имя"
                  onChange={changeHandler} value={partRequest?.name} name='name'/>
           <select value={partRequest.brand} onChange={changeHandler} id="brand" name="brand">
               <option value="">----------</option>
               {props.brands.map((br: any, index:any) =>{
                   return(<option key={index} value={br.id}>{br.brand}</option>)})}
           </select>
           <select value={partRequest.model} onChange={changeHandler} id="model" name="model">
               <option value="">----------</option>
               {models.map((md, index) =>{
                   return(<option key={index} value={md.id}>{md.model}</option>)})}
           </select>
           <input className={classes.price} type="number" value={partRequest.price}
                  onChange={changeHandler} name='price' id='price'/> руб
           <select value={partRequest.type} onChange={changeHandler} id="type" name="type">
               <option value="">----------</option>
               {props.types.map((ty: any, index:any) =>{
                   return(<option key={index} value={ty.id}>{ty.name}</option>)})}
           </select>
           <Button onClick={addHandler}>Добавить</Button>
       </div>
    )
}
export default AddPart