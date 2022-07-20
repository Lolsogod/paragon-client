import type { NextPage } from 'next'
import Head from 'next/head'
import axios from "axios";
import {AuthCtx, Part} from "../../../interfaces/interfaces";
import PartList from "../../../components/sto/PartList";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";
import {useAuthCheck} from "../../../hooks/auth.check.hook";
import Button from "../../../components/ui/Button";
import {toast} from "react-toastify";

const Parts: NextPage = () => {
    const auth = useContext<AuthCtx>(AuthContext)
    const [parts, setParts] = useState<Part[]>([])

    useEffect(()=>{
        axios.get('/api/parts/allParts',
            {headers: {Authorization: `Bearer ${auth.token}`}})
            .then(res => setParts(res.data))
            .catch(res=> toast.error(res.response.data))
    },[])
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