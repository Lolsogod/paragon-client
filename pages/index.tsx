import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import CarList from "../components/CarList";
import {GetServerSideProps, GetStaticProps} from "next";
import {getCookie} from "cookies-next";
import axios from "axios";
import {useEffect, useState} from "react";

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

    const [cars, setCars] = useState(props.cars)
    useEffect(()=>{
        axios.get('http://localhost:5000/cars/',{
            headers: {Authorization: `Bearer ${getCookie("jwtCookie")}`}})
            .then(res => setCars(res.data))
        console.log("here")
    },[])
  return (
      <>
          <Head>
              <title>Home</title>
          </Head>
          <CarList cars={cars}/>
      </>
  )

}
/*
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
    let cars: any[]=[];

    /*await axios.get('http://localhost:5000/cars/')
        .then(res => cars = res.data)
        .catch(()=> cars = [])*/

    return{
        props:{
            cars: cars
        },
        revalidate: 3600
    }
}
export default Home
