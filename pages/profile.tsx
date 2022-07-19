import {NextPage} from "next";
import Head from "next/head";
import UserInfo from "../components/UserInfo";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import CarList from "../components/CarList";
import {AuthCtx, Car, User} from "../interfaces/interfaces";
import {useAuthCheck} from "../hooks/auth.check.hook";

const Profile: NextPage = () => {
    const auth = useContext<AuthCtx>(AuthContext)
    const [user, setUser] = useState<User>({
        name: '', surname: '', patronymic:''
    })
    const [cars, setCars] = useState<Car[]>()
    const [order, setOrder] = useState<string>("1")
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
    const {checkAuth, PushBack} = useAuthCheck()
    if (!checkAuth()) return <PushBack/>
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
            <h2>Купленные Машины</h2>
            {!!cars && <CarList cars={cars} own={true}/>}
            {cars?.length==0 && <div>Нет купленных</div>}
            <h2 style={Object.assign(
                {"display": "inline-block"},
                {"margin-right": "1rem"}
            )}>Заказы на ремонт</h2>
            <select name="1" id="orders" value={order}
                    onChange={e=>setOrder(e.target.value)}>
                <option value="1">В процессе</option>
                <option value="2">Завершённые</option>
            </select>
            {order=="1" && <div>Нет заказов</div>}
            {order=="2" && <div>Нет заказов</div>}
        </div>
    )
}
export default Profile