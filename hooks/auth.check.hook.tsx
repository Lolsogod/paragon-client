import {FC, useContext, useEffect} from "react";
import {AuthCtx} from "../interfaces/interfaces";
import {AuthContext} from "../context/AuthContext";
import {useRouter} from "next/router";


export const useAuthCheck = () =>{
    const auth = useContext<AuthCtx>(AuthContext)
    const router = useRouter()

    const checkAuth = ()=>{return auth.isAuthenticated}
    const checkRole = (role: string)=>{return auth.role != role}
    const PushBack:FC = () => {
        useEffect(()=>{
            router.push("/")
        })
        return (<div></div>)
    }

    return {checkAuth, checkRole, PushBack}
}
