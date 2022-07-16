import classes from "../CarList.module.css"
import EditItem from "./EditItem";
import {FC, useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import Button from "../ui/Button";
import {AuthCtx, Brand, Car} from "../../interfaces/interfaces";

const EditList: FC<{cars: Car[]}> = (props) =>{
    const auth = useContext<AuthCtx>(AuthContext)
    const [brands, setBrands] = useState<Brand[]>([])
    useEffect(()=>{
        if(!!auth.token){
            axios.get('/api/cars/brand',
                {headers: {Authorization: `Bearer ${auth.token}`}})
                .then(res => setBrands(res.data))
        }
    },[auth.token])
    return(<>
            <div className={classes.adders}>
                <Button href='/admin/new-brand'>Добавить брэнд</Button>
                <Button href='/admin/new-model'>Добавить модель</Button>
                <Button href='/admin/new-car'>Добавить машину</Button>
            </div>
        <ul className={classes.list}>
            {props.cars.map((car: any) => (
                    <EditItem
                        brands={brands}
                        key={car.id}
                        id={car.id}
                        year={car.year}
                        brand={car.brand}
                        model={car.model}
                        price={car.price}
                        condition={car.condition}
    />
))}
    </ul>
        </>
)
}

export default EditList;