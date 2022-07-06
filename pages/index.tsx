import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import CarList from "../components/CarList";
import {GetServerSideProps, GetStaticProps} from "next";

import axios from "axios";

//remove later
/*const FAKE_RESPONSE = [
    {
        id: 10,
        year: 2012,
        brand: "Volkswagen",
        model: "Polo"
    },
    {
        id: 11,
        year: 2019,
        brand: "Volkswagen",
        model: "Tiguan"
    }
]*/

const Home: NextPage = (props: any) => {


  return (
      <>
          <Head>
              <title>Home</title>
          </Head>
          <CarList cars={props.cars}/>
      </>
  )

}
/*TODO: возможно использовать static props c revalidate уточнить...
export const getServerSideProps: GetServerSideProps = async (context) =>{
    const req = context.req;
    const res = context.res;

    return{
        props:{
            cars: FAKE_RESPONSE
        }
    }
}*/
export const getStaticProps: GetStaticProps = async () => {
    let cars;
    await axios.get('http://localhost:5000/cars/')
        .then(res => cars = res.data)

    return{
        props:{
            cars: cars
        },
        revalidate: 3600
    }
}
export default Home
