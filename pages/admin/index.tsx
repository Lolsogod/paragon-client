import {GetStaticProps, NextPage} from "next";
import Link from "next/link";
import axios from "axios";
import CarList from "../../components/CarList";
import EditList from "../../components/editors/EditList";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import NoAccess from "../../components/layout/NoAccess";

const Admin: NextPage = (props: any) => {
    const auth = useContext(AuthContext)
    if(auth.role != "ADMIN") return <div>нет доступа</div>
    return (
        <>
            <EditList cars={props.cars}/>
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