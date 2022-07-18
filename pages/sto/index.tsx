import {NextPage} from "next";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {AuthCtx} from "../../interfaces/interfaces";
import Button from "../../components/ui/Button";
import classes from "../../components/CarList.module.css";

const StoMain: NextPage = () => {
    return (
        <>
            <div className={classes.adders}>
                <Button href='/sto/new-type'>Добавить тип детали</Button>
                <Button href='/sto/new-part'>Добавить деталь</Button>
            </div>
            <br/>
            <div className={classes.adders}>
                <Button href='/sto/parts'>Список деталей</Button>
                <Button href='/sto/repair'>Заказы на ремонт</Button>
            </div>
        </>
    )
}


export default StoMain