import AddBrand from "../../components/adders/AddBrand";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {AuthCtx} from "../../interfaces/interfaces";
import {useAuthCheck} from "../../hooks/auth.check.hook";

const NewBrand = ()=>{
    const {checkRole, PushBack} = useAuthCheck()
    if (checkRole("ADMIN")) return <PushBack/>
    return( <div>
        <AddBrand/>
    </div>)
}
export default  NewBrand