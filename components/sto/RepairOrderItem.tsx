import Card from "../ui/Card";
import classes from '../CarItem.module.css'
import {FC, useContext, useEffect, useState} from "react";
import {AuthCtx, Car, RepairOrder} from "../../interfaces/interfaces";
import Button from "../ui/Button";
import axios from "axios";
import {toast} from "react-toastify";
import {AuthContext} from "../../context/AuthContext";

const ReapairOrderItem: FC<RepairOrder> = (props) => {
    const auth = useContext<AuthCtx>(AuthContext)
    const [car, setCar] = useState<Car>()
    let split = props.order_date.split("T");
    const date = split[0]
    split = split[1].split(":")
    const time = split[0] + ":" + split[1]
    useEffect(()=>{
        axios.get(`/api/cars/getCarById?id=${props.car_id}`,
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res => setCar(res.data))
            .catch(res=> toast.error(res.response.data))
    },[props.car_id,  auth.token])
    return(
        <li className={classes.item}>
            <Card>
                <div className={classes.content}>
                    <span className={classes.title}>Заказ №{props.id} </span>
                    {car?.brand.brand} {car?.model.model} -
                    {!props.result && <span> {props.description} </span>}
                    {props.result && <span> Завершён: {props.result} </span>}
                    <br/>
                    <span className={classes.price}>Дата заказа: {date} {time}</span>
                </div>
                <div className={classes.actions}>
                    <Button href={`/sto/repair/${props.id}`}>Инфо</Button>
                </div>
            </Card>
        </li>
    )
}

export default ReapairOrderItem;