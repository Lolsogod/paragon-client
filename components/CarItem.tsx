import Card from "./ui/Card";
import classes from './CarItem.module.css'
import Image from "next/image"
import sampleCar from "../public/sample_car.jpg"
import Button from "./ui/Button";
import {FC} from "react";
import {Car} from "../interfaces/interfaces";

const CarItem: FC<Car> = (props) => {
    return(
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <Image src={sampleCar} alt='car'/>
                </div>
                <div className={classes.content}>
                    <span className={classes.title}>{props.brand.brand} {props.model.model} </span>
                    {props.year} {props.condition}
                    <br/>
                    <span className={classes.price}>{props.price}</span> руб
                </div>
                <div className={classes.actions}>
                     <Button href={`${props.id}`}>Инфо</Button>
                </div>
            </Card>
        </li>
    )
}

export default CarItem;
