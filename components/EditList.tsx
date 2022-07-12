import CarItem from "./CarItem";
import classes from  "./CarList.module.css"
import EditItem from "./EditItem";
import {useContext, useEffect, useState} from "react";
import axios from "axios";
import {AuthContext} from "../context/AuthContext";
import Button from "./ui/Button";

const EditList = (props: any) =>{
    const auth = useContext(AuthContext)
    const [brands, setBrands] = useState<any[]>([])
    useEffect(()=>{
        if(!!auth.token){
            axios.get('/api/cars/brand',
                {headers: {Authorization: `Bearer ${auth.token}`}})
                .then(res => setBrands(res.data))
        }
    },[auth.token])
    return(<>
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
        <Button href='/admin/new-brand'>Добавить брэнд</Button>
            <br/>
            <Button href='/admin/new-model'>Добавить модель</Button>
        </>
)
}

export default EditList;