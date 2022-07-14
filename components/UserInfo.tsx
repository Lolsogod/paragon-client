import Button from "./ui/Button";
import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

const UserInfo = (props: any) =>{
    return(
        <>
            <h1>{props.surname} {props.name} {props.patronymic}</h1>
        </>
    )
}
export default UserInfo