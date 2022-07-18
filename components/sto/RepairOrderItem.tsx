import Card from "../ui/Card";
import classes from '../CarItem.module.css'
import {FC} from "react";
import {RepairOrder} from "../../interfaces/interfaces";
import Button from "../ui/Button";

const ReapairOrderItem: FC<RepairOrder> = (props) => {
    return(
        <li className={classes.item}>
            <Card>
                <div className={classes.content}>
                    <span className={classes.title}>Заказ №{props.id}</span>
                    {props.result}
                    <br/>
                    <span className={classes.price}>Дата заказа: {props.order_date}</span>
                </div>
                <div className={classes.actions}>
                    <Button href={`/sto/repair/${props.id}`}>Инфо</Button>
                </div>
            </Card>
        </li>
    )
}

export default ReapairOrderItem;