import classes from './CarDetail.module.css'
import Button from "./ui/Button";
import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

const CarDetail = (props: any) =>{
    const auth = useContext(AuthContext)
    const makeOrder = () =>{
        axios.post(`/api/orders/carOrder?car_id=${props.carInfo.id}`,{},
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res => alert("Покупка успешно совершена"))
    }
    return(
        <>
            <h1>{props.carInfo.brand.brand} {props.carInfo.model.model}</h1>
            <h2>Год: {props.carInfo.year}</h2>
            <h2>Состояние: {props.carInfo.condition}</h2>
            <h2>Цена: {props.carInfo.price}</h2>
            {!props.carInfo.sold && <Button onClick={makeOrder}>Купить</Button>}
            {console.log(props.carInfo)}
        </>
    )
}
export default CarDetail