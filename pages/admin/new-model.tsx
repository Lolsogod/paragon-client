import AddModel from "../../components/adders/AddModel";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {NextPage} from "next";
import {Brand} from "../../interfaces/interfaces";
import {useAuthCheck} from "../../hooks/auth.check.hook";
import {toast} from "react-toastify";


const NewModel: NextPage = ()=>{
    const auth = useContext(AuthContext)
    const [brands, setBrands] = useState<Brand[]>([])

    useEffect(()=>{
        axios.get('/api/cars/brand',
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res => setBrands(res.data))
            .catch(res=> toast.error(res.response.data))
    },[])
    const {checkRole, PushBack} = useAuthCheck()
    if (checkRole("ADMIN")) return <PushBack/>
    return( <div>
        <AddModel brands={brands}/>
    </div>)
}
export default  NewModel