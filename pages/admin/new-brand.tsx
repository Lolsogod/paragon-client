import AddBrand from "../../components/adders/AddBrand";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {AuthCtx} from "../../interfaces/interfaces";

const NewBrand = ()=>{
    const auth = useContext<AuthCtx>(AuthContext)
    if(auth.role != "ADMIN") return <div>нет доступа</div>
    return( <div>
        <AddBrand/>
    </div>)
}
export default  NewBrand