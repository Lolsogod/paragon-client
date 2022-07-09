import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";


function LogOut() {
    const auth = useContext(AuthContext)
    const logOut = () =>{
        auth.logout()
        window.location.reload()
    }
    return(
        <a onClick={logOut}>Выйти</a>
    )
}

export default LogOut