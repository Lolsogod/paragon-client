import classes from  "../CarList.module.css"
import {Dispatch, FC, SetStateAction, useContext, useState} from "react";
import {AuthCtx, OrderPartRequest, PartType, WorkRequest} from "../../interfaces/interfaces";
import Button from "../ui/Button";
import PartRequestItem from "./PartRequestItem";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import {toast} from "react-toastify";
import {useRouter} from "next/router";


const PartRequestList: FC<{types: PartType[], repair?: boolean, work?: WorkRequest,
    //TODO: поднять часть от ориг реквеста
    setWork? : Dispatch<SetStateAction<WorkRequest>>}> = (props) =>{
    const auth = useContext<AuthCtx>(AuthContext)
    const router = useRouter()
    const [reqParts, setReqParts] = useState<OrderPartRequest[]>([
        {id: 0, count: 1}
    ])
    const addPartToRequest = ()=>{
        if (props.repair && props.work != undefined && props.setWork != undefined){
            let used_parts = [...props.work.used_parts, {id: 0, count: 1}]
            props.setWork({...props.work, used_parts: used_parts})
        }
        else
            setReqParts([...reqParts, {id: 0, count: 1}])
    }
    const send = () =>{
        axios.post('/api/orders/partsOrder', {partRequests: reqParts},
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(() => {
                toast.success("Заказ выполнен.")
                router.push("/sto/parts")
            })
            .catch(()=> toast.error("Неудалось заказать запчасти"))
    }
    const setWorkParts = (parts: OrderPartRequest[]) => {
        if (props.setWork !=undefined && props.work !=undefined)
            props.setWork({...props.work, used_parts: parts})
    }


    return(
        <>
            {!props.repair &&
                <ul className={classes.list}>
                    {reqParts.map((_reqPart: OrderPartRequest, index) => (
                        <PartRequestItem key={index} types={props.types}
                                         index={index} reqParts={reqParts}
                                         setReqParts={setReqParts}/>
                    ))}
                </ul>
            }{props.repair && props.work?.used_parts != undefined &&
                <ul className={classes.list}>
                {props.work?.used_parts.map((_reqPart: OrderPartRequest, index) => (

                    <PartRequestItem key={index} types={props.types}// @ts-ignore
                                     index={index} reqParts={props.work?.used_parts}
                                     setReqParts={setWorkParts}/>
                ))}
            </ul>
        }

            <Button onClick={addPartToRequest}>+</Button>
            <span> </span>
            {!props.repair && <Button onClick={send}>Заказать</Button>}
        </>
    )
}

export default PartRequestList;