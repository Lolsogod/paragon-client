import type { NextPage } from 'next'
import Head from 'next/head'
import axios from "axios";
import {AuthCtx, PartType} from "../../../interfaces/interfaces";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import PartRequestList from "../../../components/sto/PartRequestList";
import {toast} from "react-toastify";
import {useAuthCheck} from "../../../hooks/auth.check.hook";

const Parts: NextPage = () => {
    const auth = useContext<AuthCtx>(AuthContext)
    const [types, setTypes] = useState<PartType[]>([])

    useEffect(()=>{
        axios.get('/api/parts/getAllTypes',
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res => setTypes(res.data))
            .catch(res=> toast.error(res.response.data))
    },[])
    const {checkRole, PushBack} = useAuthCheck()
    if (checkRole("WORKER")) return <PushBack/>
    return (
        <>
            <Head>
                <title>Parts</title>
            </Head>
            <h1>Заказ запчастей</h1>
            <PartRequestList types={types}/>
        </>
    )

}

export default Parts