import {FC} from "react";
import {User} from "../interfaces/interfaces";

const UserInfo: FC<User> = (props) =>{
    return(
        <>
            <h1>{props.surname} {props.name} {props.patronymic}</h1>
        </>
    )
}
export default UserInfo