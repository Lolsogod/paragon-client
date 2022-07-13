import classes from "../CarList.module.css";
import EditItem from "../editors/EditItem";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import AddItem from "./AddItem";

const AddCar = (props: any) => {
    const auth = useContext(AuthContext)
    const [brands, setBrands] = useState<any[]>([])
    useEffect(()=>{
        if(!!auth.token){
            axios.get('/api/cars/brand',
                {headers: {Authorization: `Bearer ${auth.token}`}})
                .then(res => setBrands(res.data))
        }
    },[auth.token])
    return(
        <ul className={classes.list}>
                <AddItem
                    brands={brands}
                    year={''}
                    brand={''}
                    model={''}
                    price={''}
                    condition={''}
                />
                </ul>
    )
}
export default AddCar