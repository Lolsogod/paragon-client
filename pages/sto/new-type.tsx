import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {AuthCtx} from "../../interfaces/interfaces";
import AddType from "../../components/adders/AddType";

const NewType = ()=>{
    const auth = useContext<AuthCtx>(AuthContext)
    if(auth.role != "ADMIN") return <div>нет доступа</div>
    return( <div>
        <AddType tt="parts"/>
    </div>)
}
export default  NewType