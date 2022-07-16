import {FC, useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {AuthCtx} from "../interfaces/interfaces";


const LogOut: FC = () => {
    const auth = useContext<AuthCtx>(AuthContext)
    const logOut = () =>{
        auth.logout()
        window.location.reload()
    }
    return(
        <a onClick={logOut}>ВЫЙТИ</a>
    )
}

export default LogOut