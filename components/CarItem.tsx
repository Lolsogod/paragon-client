//TODO: посмотреть гайдик из телеги
import Card from "./ui/Card";
import classes from './CarItem.module.css'
import Link from "next/link";

const CarItem = (props: any) => {
    return(
        <li className={classes.item}>
            <Card>
                <div className={classes.content}>
                    <b>{props.brand} {props.model}</b> {props.year}
                </div>
                <div className={classes.actions}>
                    <button><Link href={`${props.model}`}>Инфо</Link></button>
                </div>
            </Card>
        </li>
    )
}

export default CarItem;
