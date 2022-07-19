import type {GetStaticPaths, GetStaticProps, NextPage} from 'next'
import Head from 'next/head'
import CarDetail from "../components/CarDetail";
import axios from "axios";
import {Car, CarPaths} from "../interfaces/interfaces";




const CarId: NextPage<{carInfo: Car}> = (props) => {
    return (
        <div>
            <Head>
                <title>Инфо</title>
            </Head>
            <CarDetail carInfo={props.carInfo}/>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (context)=> {
    let car: Car | null = null;
    if(context.params != undefined)
        await axios.get(`http://localhost:8080/cars/getCarById?id=${context.params.carId}`)
            .then(res => car = res.data)
    return{
        props:{carInfo: car},
        revalidate: 1
    }
}
export const getStaticPaths: GetStaticPaths = async (): Promise<CarPaths> => {
    let ids: number[] = [];
    await axios.get(`http://localhost:8080/cars/allIds`)
        .then(res => {
            ids = res.data
        })

    return {
        paths: ids.map(id => ({params: {carId: id.toString()}})),
        fallback: false
    }
}
export default CarId