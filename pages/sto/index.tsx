import {NextPage} from "next";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {AuthCtx} from "../../interfaces/interfaces";
import Button from "../../components/ui/Button";
import classes from "../../components/CarList.module.css";
import {useRouter} from "next/router";
import {useAuthCheck} from "../../hooks/auth.check.hook";


const StoMain: NextPage = () => {
    const {checkRole, PushBack} = useAuthCheck()
    if (checkRole("WORKER")) return <PushBack/>
    console.log(checkRole("WORKER"))
    return (
        <>
            <div className={classes.adders}>
                <Button href='/sto/parts'>Список деталей</Button>
                <Button href='/sto/repair'>Заказы на ремонт</Button>
            </div>

        </>
    )
}


export default StoMain