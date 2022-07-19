import type { NextPage } from 'next'
import Head from 'next/head'

import CarList from "../components/CarList";
import {GetStaticProps} from "next";
import axios from "axios";
import {Car} from "../interfaces/interfaces";
import {useAuthCheck} from "../hooks/auth.check.hook";

const Home: NextPage<{cars: Car[]}> = (props) => {

    return (
      <>
          <Head>
              <title>Home</title>
              <meta name="title" content="Paragon"/>
              <meta name="description" content="Авто дилер и СТО с выгодными ценами."/>
              <meta name="keywords" content="Машина,  авто-дилер, дилер, авто, автомобиль, купит, ремонт автомобилей, сто, сервис технического обслуживания"/>
              <meta name="robots" content="index, follow"/>
              <meta httpEquiv="Content-Type" content="text/html; charset=utf-8"/>
              <meta name="language" content="Russian"/>
          </Head>
          <CarList cars={props.cars}/>
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
export default Home
