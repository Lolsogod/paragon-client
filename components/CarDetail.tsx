import classes from './CarDetail.module.css'

const CarDetail = (props: any) =>{
    return(
        <>
            <h1>{props.carInfo.brand.brand} {props.carInfo.model.model} is cool</h1>
            <h2>Год: {props.carInfo.year}</h2>
            <h2>Состояние: {props.carInfo.condition}</h2>
            <h2>Цена: {props.carInfo.price}</h2>
        </>
    )
}
export default CarDetail