import classes from "../editors/EditItem.module.css";
import {AuthCtx, OrderPartRequest, Part, PartType} from "../../interfaces/interfaces";
import {ChangeEvent,  FC,  useContext, useEffect, useState} from "react";
import Card from "../ui/Card";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Button from "../ui/Button";
import {toast} from "react-toastify";

//TODO: убрать any
const PartRequestItem: FC<{
    types: PartType[], index: number, reqParts: OrderPartRequest[],
    setReqParts: any}> = (props) => {
    const auth = useContext<AuthCtx>(AuthContext)
    const [type, setType] = useState<number>(0);
    const [parts, setParts] = useState<Part[]>([])
    useEffect(()=>{
        if(type !=0){
            axios.get(`/api/parts/getPartByType?id=${type}`,
                {headers: {Authorization: `Bearer ${auth.token}`}})
                .then(res => setParts(res.data))
                .catch(res=> toast.error(res.response.data))
        }else setParts([])
    },[type])

    const changeHandler = (event: ChangeEvent<HTMLSelectElement>)=>{
        const updatedReqParts =  props.reqParts.slice()
        updatedReqParts[props.index].id = parseInt(event.target.value)
        props.setReqParts(updatedReqParts)
    }
    const plusCount = ()=>{
        const updatedReqParts =  props.reqParts.slice()
        updatedReqParts[props.index].count++
        props.setReqParts(updatedReqParts)
    }
    const minusCount = ()=>{
        const updatedReqParts =  props.reqParts.slice()
        updatedReqParts[props.index].count--
        props.setReqParts(updatedReqParts)
    }
    return(
        <li className={classes.item}>
            <Card>
                <div className={classes.content}>
                    <div className={classes.flex}>
                        <select value={type} onChange={e=> setType(parseInt(e.target.value))} id="type" name="type">
                            <option value="0">----------</option>
                            {props.types.map((ty: any, index:any) =>{
                                return(<option key={index} value={ty.id}>{ty.name}</option>)})}
                        </select>
                        <select value={props.reqParts[props.index].id} onChange={changeHandler} id="part" name="part">
                            <option value="0">----------</option>
                            {parts.map((pt, index) =>{
                                return(<option key={index} value={pt.id}>{pt.name}</option>)})}
                        </select>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className={classes.flexCenter}>
                        {props.reqParts[props.index].count >= 1 && <Button onClick={minusCount}>-</Button>}
                        {props.reqParts[props.index].count}
                        <Button onClick={plusCount}>+</Button>
                    </div>
                </div>
            </Card>
        </li>
    )
}
export default PartRequestItem