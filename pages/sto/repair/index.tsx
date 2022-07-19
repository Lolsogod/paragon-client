import type { NextPage } from 'next'
import Head from 'next/head'
import axios from "axios";
import {AuthCtx, RepairOrder} from "../../../interfaces/interfaces";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import RepairOrderList from "../../../components/sto/RepairOrderList";
import {useAuthCheck} from "../../../hooks/auth.check.hook";


const RepairOrders: NextPage = () => {
    const auth = useContext<AuthCtx>(AuthContext)
    const [repairOrders, setRepairOrders] = useState<RepairOrder[]>([])

    useEffect(()=>{
        if(!!auth.token){
            axios.get('/api/orders/repairOrders',
                {headers: {Authorization: `Bearer ${auth.token}`}})
                .then(res => setRepairOrders(res.data))
        }
    },[auth.token])
    const {checkRole, PushBack} = useAuthCheck()
    if (checkRole("WORKER")) return <PushBack/>
    return (
        <>
            <Head>
                <title>Parts</title>
            </Head>
            <RepairOrderList orders={repairOrders} />

        </>
    )

}

export default RepairOrders