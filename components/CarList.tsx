import CarItem from "./CarItem";
import classes from  "./CarList.module.css"

const CarList = (props: any) =>{
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
                />
            ))}
        </ul>
    )
}

export default CarList;