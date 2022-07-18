import CarItem from "./CarItem";
import classes from  "./CarList.module.css"
import {FC} from "react";
import {Car} from "../interfaces/interfaces";

const CarList: FC<{cars: Car[], own?: boolean}> = (props) =>{
    return(
        <ul className={classes.list}>
            {props.cars.map((car: any) => (
                <CarItem
                    key={car.id}
                    id={car.id}
                    year={car.year}
                    brand={car.brand}
                    model={car.model}
                    price={car.price}
                    sold={car.sold}
                    condition={car.condition}
                    img_url={car.img_url}
                    own={props.own}
                />
            ))}
        </ul>
    )
}

export default CarList;