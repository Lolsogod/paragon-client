import AddBrand from "../../components/adders/AddBrand";
import AddModel from "../../components/adders/AddModel";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";


const NewModel = (props: any)=>{
    const auth = useContext(AuthContext)
    const [brands, setBrands] = useState<any[]>([])
    useEffect(()=>{
        if(!!auth.token){
            axios.get('/api/cars/brand',
                {headers: {Authorization: `Bearer ${auth.token}`}})
                .then(res => setBrands(res.data))
        }
    },[auth.token])
    return( <div>

        <AddModel brands={brands}/>
    </div>)
}
export default  NewModel