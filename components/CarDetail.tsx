import Button from "./ui/Button";
import axios from "axios";
import {FC, useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {AuthCtx, Car} from "../interfaces/interfaces";

const CarDetail: FC<{carInfo: Car}> = (props) =>{
    const auth = useContext<AuthCtx>(AuthContext)
    const makeOrder = () =>{
        axios.post(`/api/orders/carOrder?car_id=${props.carInfo.id}`,{},
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(() => alert("Покупка успешно совершена"))
    }
    return(
        <>

            <h1>{props.carInfo.brand.brand} {props.carInfo.model.model}</h1>
            <h2>Год: {props.carInfo.year}</h2>
            <h2>Состояние: {props.carInfo.condition}</h2>
            <h2>Цена: {props.carInfo.price}</h2>
            {auth.isAuthenticated && !props.carInfo.sold &&
                <Button onClick={makeOrder}>Купить</Button>}
            {!auth.isAuthenticated &&  !props.carInfo.sold &&
                <>
                    <h4>Для совершения покупок необходимо войти в систему</h4>
                </>}
        </>
    )
}
export default CarDetail