import classes from "./CarDetail.module.css"
import Button from "./ui/Button";
import axios from "axios";
import {FC, useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {AuthCtx, Car} from "../interfaces/interfaces";
import Image from "next/image";
import sampleCar from "../public/sample_car.jpg";
import getRuCondition from "../hooks/condition.hook";

const CarDetail: FC<{carInfo: Car}> = (props) =>{
    const auth = useContext<AuthCtx>(AuthContext)
    const makeOrder = () =>{
        axios.post(`/api/orders/carOrder?car_id=${props.carInfo.id}`,{},
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(() => alert("Покупка успешно совершена"))
    }
    return(
        <>
            <div className={classes.flex}>
                <div className={classes.image}>
                    {props.carInfo.img_url?<img src={props.carInfo.img_url} alt="car"/>:
                        <img src="/sample_car.jpg" alt='car'/>}
                </div>
                <div>
                    <h1>{props.carInfo.brand.brand} {props.carInfo.model.model}</h1>
                    <h2>Год: {props.carInfo.year}</h2>
                    <h2>Состояние: {getRuCondition(props.carInfo.condition)}</h2>
                    <h2>Цена: {props.carInfo.price} руб</h2>
                    {auth.isAuthenticated && !props.carInfo.sold &&
                        <Button onClick={makeOrder}>Купить</Button>}
                    {!auth.isAuthenticated &&  !props.carInfo.sold &&
                        <>
                            <h4>Для совершения покупок необходимо войти в систему</h4>
                        </>}
                </div>
            </div>
        </>
    )
}
export default CarDetail