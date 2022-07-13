import {GetStaticProps, NextPage} from "next";
import Link from "next/link";
import axios from "axios";
import CarList from "../../components/CarList";
import EditList from "../../components/editors/EditList";
import AddCar from "../../components/adders/AddCar";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";

const Admin: NextPage = (props: any) => {
    const auth = useContext(AuthContext)
    if(auth.role != "admin") return <div>нет доступа</div>
    return (
        <>
            <AddCar cars={props.cars}/>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    let cars: any[]=[];

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