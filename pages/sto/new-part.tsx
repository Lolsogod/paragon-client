import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext";
import {AuthCtx, Brand, PartType} from "../../interfaces/interfaces";
import AddPart from "../../components/adders/AddPart";
import axios from "axios";
import {useAuthCheck} from "../../hooks/auth.check.hook";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const NewPart = ()=>{
    const auth = useContext<AuthCtx>(AuthContext)
    const [brands, setBrands] = useState<Brand[]>([]);
    const [types, setTypes] = useState<PartType[]>([])

    useEffect(() => {
        axios.get("/api/cars/brand",
            {headers: { Authorization: `Bearer ${auth.token}`},})
            .then(res => setBrands(res.data))
            .catch(res=> toast.error(res.response.data))
    }, []);

    useEffect(() => {
        axios.get("/api/parts/getAllTypes",
            {headers: { Authorization: `Bearer ${auth.token}`},})
            .then(res => setTypes(res.data))
            .catch(res=> toast.error(res.response.data))
    }, []);

    const {checkRole, PushBack} = useAuthCheck()
    if (checkRole("ADMIN")) return <PushBack/>
    return( <div>
        <h2>Добавить новую деталь</h2>
        <AddPart brands={brands} types={types}/>
    </div>)
}
export default  NewPart