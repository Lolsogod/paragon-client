import Card from "../ui/Card";
import classes from '../CarItem.module.css'
import {FC} from "react";
import {RepairOrder} from "../../interfaces/interfaces";
import Button from "../ui/Button";

const ReapairOrderItem: FC<RepairOrder> = (props) => {
    let split = props.order_date.split("T");
    const date = split[0]
    split = split[1].split(":")
    const time = split[0] + ":" + split[1]
    return(
        <li className={classes.item}>
            <Card>
                <div className={classes.content}>
                    <span className={classes.title}>Заказ №{props.id} </span>
                    {props.result && <span>Завершён: {props.result}</span>}
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