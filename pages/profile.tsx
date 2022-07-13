import {NextPage} from "next";
import Head from "next/head";
import UserInfo from "../components/UserInfo";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import CarList from "../components/CarList";

const Profile: NextPage = (props: any) => {
    const auth = useContext(AuthContext)
    const [user, setUser] = useState({
        name: '', surname: '', patronymic:''
    })
    const [cars, setCars] = useState()
    useEffect(()=>{
        if(auth.token){
            axios.get('/api/account',
                {headers: {Authorization: `Bearer ${auth.token}`}})
                .then(res => setUser(res.data))
        }
    }, [auth.token])
    useEffect(()=>{
        if(auth.token){
            axios.get('/api/account/cars',
                {headers: {Authorization: `Bearer ${auth.token}`}})
                .then(res => setCars(res.data))
        }
    }, [auth.token])
    return (
        <div>
            <Head>
                <title>Профиль</title>
            </Head>
            <UserInfo
                name={user.name}
                surname={user.surname}
                patronymic={user.patronymic}
            />
            {cars && <CarList cars={cars}/>}
        </div>
    )
}
export default Profile