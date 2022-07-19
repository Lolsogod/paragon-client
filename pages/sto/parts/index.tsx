import type { NextPage } from 'next'
import Head from 'next/head'
import axios from "axios";
import {AuthCtx, Part} from "../../../interfaces/interfaces";
import PartList from "../../../components/sto/PartList";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {useAuthCheck} from "../../../hooks/auth.check.hook";
import Button from "../../../components/ui/Button";

const Parts: NextPage = () => {
    const auth = useContext<AuthCtx>(AuthContext)
    const [parts, setParts] = useState<Part[]>([])

    useEffect(()=>{
        if(!!auth.token){
            axios.get('/api/parts/allParts',
                {headers: {Authorization: `Bearer ${auth.token}`}})
                .then(res => setParts(res.data))
        }
    },[auth.token])
    const {checkRole, PushBack} = useAuthCheck()
    if (checkRole("WORKER")) return <PushBack/>
    return (
        <>
            <Head>
                <title>Parts</title>
            </Head>
            <PartList parts={parts} />
            <Button href={"parts/request"}>Заказть запчасти</Button>
        </>
    )

}

export default Parts