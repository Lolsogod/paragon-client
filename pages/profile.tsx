import {NextPage} from "next";
import Head from "next/head";
import UserInfo from "../components/UserInfo";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../context/AuthContext";
import axios from "axios";
import CarList from "../components/CarList";
import {AuthCtx, Car, RepairOrder, User} from "../interfaces/interfaces";
import {useAuthCheck} from "../hooks/auth.check.hook";
import RepairOrderList from "../components/sto/RepairOrderList";
import {toast} from "react-toastify";

const Profile: NextPage = () => {
    const auth = useContext<AuthCtx>(AuthContext)
    const [user, setUser] = useState<User>({
        name: '', surname: '', patronymic:''
    })
    const [cars, setCars] = useState<Car[]>()
    const [order, setOrder] = useState<string>("1")
    useEffect(()=>{
            axios.get('http://localhost:8081/account',
                {headers: {Authorization: `Bearer ${auth.token}`}})
                .then(res => setUser(res.data))
                .catch(res=> toast.error(res.response.data))
    }, [auth.token])
    useEffect(()=>{
            axios.get('http://localhost:8081/account/cars',
                {headers: {Authorization: `Bearer ${auth.token}`}})
                .then(res => {
                    console.log(res.data)
                    setCars(res.data)
                })
                .catch(res=> toast.error(res.response.data))
    }, [auth.token])
    //заказы
    const [pendingOrders, setPendingOrders] = useState<RepairOrder[]>([])
    useEffect(()=>{
            axios.get('http://localhost:8081/account/repairOrders',
                {headers: {Authorization: `Bearer ${auth.token}`}})
                .then(res => setPendingOrders(res.data))
                .catch(res=> toast.error(res.response.data))

    },[auth.token])
    //завершённые
    const [finishedOrders, setFinishedOrders] = useState<RepairOrder[]>([])
    useEffect(()=>{
            axios.get('/api/account/finishedRepairOrders',
                {headers: {Authorization: `Bearer ${auth.token}`}})
                .then(res => setFinishedOrders(res.data))
                .catch(res=> toast.error(res.response.data))

    },[auth.token])
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
            {/*нет заказов добавь*/}
            {order=="1" &&
                <RepairOrderList orders={pendingOrders}/>
            }
            {order=="2" &&
                <RepairOrderList orders={finishedOrders}/>
            }
        </div>
    )
}
export default Profile