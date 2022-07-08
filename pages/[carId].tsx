import type {GetStaticPaths, NextPage} from 'next'
import {useRouter} from 'next/router'
import Head from 'next/head'
import CarDetail from "../components/CarDetail";
import {GetStaticProps} from "next";
import axios from "axios";



const CarId: NextPage = (props: any) => {
    const router = useRouter();
    const carId = router.query.carId;

    return (
        <div>
            <Head>
                <title>Инфо</title>
            </Head>
            <CarDetail carInfo={props.carInfo}/>
        </div>
    )
}
export const getStaticProps: GetStaticProps = async (context: any) => {
    let car;
    await axios.get(`http://localhost:5000/cars/${context.params.carId}`)
        .then(res => car = res.data)
    console.log(car)
    return{
        props:{
            // @ts-ignore
            carInfo: car
        },
        revalidate: 3600
    }
}
export const getStaticPaths: GetStaticPaths = async () => {
    let ids: any[] = [];
    await axios.get(`http://localhost:5000/cars/allIds`)
        .then(res => ids = res.data)
    console.log(ids.map(id => ({params: {carId: id}})))
    return {
        paths: ids.map(id => ({params: {carId: id.toString()}})),
        fallback: false
    }
}
export default CarId