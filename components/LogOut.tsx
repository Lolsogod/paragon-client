import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";


function LogOut() {
    const auth = useContext(AuthContext)
    const logOut = () =>{
        auth.logout()
        window.location.reload()
    }
    return(
        <a onClick={logOut}>ВЫЙТИ</a>
    )
}

export default LogOut