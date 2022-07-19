import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {AuthCtx} from "../../interfaces/interfaces";
import AddType from "../../components/adders/AddType";
import {useAuthCheck} from "../../hooks/auth.check.hook";

const NewWorkType = ()=>{
    const {checkRole, PushBack} = useAuthCheck()
    if (checkRole("WORKER")) return <PushBack/>
    return( <div>
        <AddType tt="works" />
    </div>)
}
export default  NewWorkType