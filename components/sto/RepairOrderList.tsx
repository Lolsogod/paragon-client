import classes from  "../CarList.module.css"
import {FC} from "react";
import {RepairOrder} from "../../interfaces/interfaces";
import RepairOrderItem from "./RepairOrderItem";

const RepairOrderList: FC<{orders: RepairOrder[]}> = (props) =>{
    if(props.orders.length == 0) return <div>Нет заказов</div>
    return(
        <ul className={classes.list}>
            {props.orders.map((repairOrder: RepairOrder, index) => (
                    <RepairOrderItem
                        key={index}
                        id={repairOrder.id}
                        car_id={repairOrder.car_id}
                        order_date={repairOrder.order_date}
                        result={repairOrder.result}

    />
))}
    </ul>
)
}

export default RepairOrderList;