import {deleteCookie} from "cookies-next";
import Link from "next/link";

function LogOut() {
    const logOut = () =>{
        deleteCookie("jwtCookie")
        window.location.reload()
    }
    return(
        <a onClick={logOut}>Выйти</a>
    )
}

export default LogOut