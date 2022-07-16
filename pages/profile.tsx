import {NextPage} from "next";
import Head from "next/head";
import UserInfo from "../components/UserInfo";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import CarList from "../components/CarList";
import {AuthCtx, Car, User} from "../interfaces/interfaces";

const Profile: NextPage = () => {
    const auth = useContext<AuthCtx>(AuthContext)
    const [user, setUser] = useState<User>({
        name: '', surname: '', patronymic:''
    })
    const [cars, setCars] = useState<Car[]>()
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
                surname={user.surname}
                name={user.name}
                patronymic={user.patronymic}
            />
            {cars && <CarList cars={cars}/>}
        </div>
    )
}
export default Profile