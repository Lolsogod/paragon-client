import type { NextPage } from 'next'
import Head from 'next/head'
import axios from "axios";
import {AuthCtx, Part} from "../../../interfaces/interfaces";
import PartList from "../../../components/sto/PartList";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../context/AuthContext";

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

    return (
        <>
            <Head>
                <title>Parts</title>
            </Head>
            <PartList parts={parts} />
        </>
    )

}

export default Parts