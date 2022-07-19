import Card from "./ui/Card";
import classes from './CarItem.module.css'
import Image from "next/image"
import sampleCar from "../public/sample_car.jpg"
import Button from "./ui/Button";
import {FC} from "react";
import {Car} from "../interfaces/interfaces";
import getRuCondition from "../hooks/condition.hook";

const CarItem: FC<Car> = (props) => {
    console.log(props.img_url)
    return(
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    {props.img_url?<img src={props.img_url} alt="car"/>:
                        <Image src={sampleCar} alt='car'/>}
                </div>
                <div className={classes.content}>
                    <span className={classes.title}>{props.brand.brand} {props.model.model} </span>
                    {props.year} <span className={classes.condition}>{getRuCondition(props.condition)}</span>
                    <br/>
                    <span className={classes.price}>{props.price}</span> руб
                </div>
                <div className={classes.actions}>
                     <Button href={`${props.id}`}>Инфо</Button>
                    <br/><br/>
                    {props.own && <Button href={`/sto/repair/request/${props.id}`}>Ремонт</Button>}
                </div>
            </Card>
        </li>
    )
}

export default CarItem;
