import AddBrand from "../../components/adders/AddBrand";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

const newBrand = ()=>{
    const auth = useContext(AuthContext)
    if(auth.role != "admin") return <div>нет доступа</div>
    return( <div>
        <AddBrand/>
    </div>)
}
export default  newBrand