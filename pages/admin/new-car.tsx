import {GetStaticProps, NextPage} from "next";
import axios from "axios";
import AddCar from "../../components/adders/AddCar";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {AuthCtx, Car} from "../../interfaces/interfaces";

const Admin: NextPage = () => {
    const auth = useContext<AuthCtx>(AuthContext)
    if(auth.role != "ADMIN") return <div>нет доступа</div>
    return (
            <AddCar/>
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