import {FC, useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {AuthCtx} from "../interfaces/interfaces";
import {useRouter} from "next/router";


const LogOut: FC = () => {
    const router = useRouter();
    const auth = useContext<AuthCtx>(AuthContext)
    const logOut = (event: any) =>{
        event.preventDefault()
        auth.logout()
        router.push("/")
    }
    return(
        <a href={"/"} onClick={e=> logOut(e)}>ВЫЙТИ</a>
    )
}

export default LogOut