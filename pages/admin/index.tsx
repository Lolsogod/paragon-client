import {GetStaticProps, NextPage} from "next";
import axios from "axios";
import EditList from "../../components/editors/EditList";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {AuthCtx, Car} from "../../interfaces/interfaces";
import {useAuthCheck} from "../../hooks/auth.check.hook";

const Admin: NextPage<{cars: Car[]}> = (props) => {
    const {checkRole, PushBack} = useAuthCheck()
    if (checkRole("ADMIN")) return <PushBack/>
    return (
        <>
            <EditList cars={props.cars}/>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    let cars: Car[]=[];

    await axios.get('http://localhost:8080/cars/')
        .then(res => cars = res.data)
        .catch(()=> cars = [])

    return{
        props:{
            cars: cars
        },
        revalidate: 1
    }
}
export default Admin