import type { NextPage } from 'next'
import Head from 'next/head'

import CarList from "../components/CarList";
import {GetStaticProps} from "next";
import axios from "axios";
import {Car} from "../interfaces/interfaces";

const Home: NextPage<{cars: Car[]}> = (props) => {
  console.log(props.cars)
    return (
      <>
          <Head>
              <title>Home</title>
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
