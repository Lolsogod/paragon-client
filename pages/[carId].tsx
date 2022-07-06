import type {GetStaticPaths, NextPage} from 'next'
import {useRouter} from 'next/router'
import Head from 'next/head'
import CarDetail from "../components/CarDetail";
import {GetStaticProps} from "next";



const CarId: NextPage = (props: any) => {
    const router = useRouter();
    const model = router.query.carId;

    return (
        <div>
            <Head>
                <title>Инфо</title>
            </Head>
            <CarDetail model={props.carInfo.model}/>
        </div>
    )
}
export const getStaticProps: GetStaticProps = async (context) => {
    return{
        props:{
            // @ts-ignore
            carInfo: {model: context.params.carId}
        },
        revalidate: 3600
    }
}
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [
            {params: {carId: "polo"}},
            {params: {carId: "tiguan"}}
        ],
        fallback: false
    }
}
export default CarId