import AddModel from "../../components/adders/AddModel";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {NextPage} from "next";
import {Brand} from "../../interfaces/interfaces";
import {useAuthCheck} from "../../hooks/auth.check.hook";


const NewModel: NextPage = ()=>{
    const auth = useContext(AuthContext)
    const [brands, setBrands] = useState<Brand[]>([])

    useEffect(()=>{
        if(!!auth.token){
            axios.get('/api/cars/brand',
                {headers: {Authorization: `Bearer ${auth.token}`}})
                .then(res => setBrands(res.data))
        }
    },[auth.token])
    const {checkRole, PushBack} = useAuthCheck()
    if (checkRole("ADMIN")) return <PushBack/>
    return( <div>
        <AddModel brands={brands}/>
    </div>)
}
export default  NewModel