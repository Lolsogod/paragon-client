import Card from "./ui/Card";
import classes from './CarItem.module.css'
import Link from "next/link";
import Image from "next/image"
import sampleCar from "../public/sample_car.jpg"
import Button from "./ui/Button";

const CarItem = (props: any) => {
    return(
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <Image src={sampleCar}></Image>
                </div>
                <div className={classes.content}>
                    <b>{props.brand.brand} {props.model.model}</b> {props.year}
                    <br/>
                    {props.price} руб
                </div>
                <div className={classes.actions}>
                     <Button href={`${props.id}`}>Инфо</Button>
                </div>
            </Card>
        </li>
    )
}

export default CarItem;
