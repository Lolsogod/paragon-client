import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {AuthCtx} from "../../interfaces/interfaces";
import AddType from "../../components/adders/AddType";
import {useAuthCheck} from "../../hooks/auth.check.hook";

const NewType = ()=>{
    const {checkRole, PushBack} = useAuthCheck()
    if (checkRole("ADMIN")) return <PushBack/>
    return( <div>
        <AddType tt="parts"/>
    </div>)
}
export default  NewType