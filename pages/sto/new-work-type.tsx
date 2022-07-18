import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {AuthCtx} from "../../interfaces/interfaces";
import AddType from "../../components/adders/AddType";

const NewWorkType = ()=>{
    const auth = useContext<AuthCtx>(AuthContext)
    if(auth.role != "ADMIN") return <div>нет доступа</div>
    return( <div>
        <AddType tt="works" />
    </div>)
}
export default  NewWorkType