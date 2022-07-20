import type { NextPage} from 'next'
import Head from 'next/head'
import {useContext, useEffect, useState} from "react";
import {AuthCtx, Car, RepairOrder, Work} from "../../../../interfaces/interfaces";
import {useRouter} from "next/router";
import axios from "axios";
import {AuthContext} from "../../../../context/AuthContext";
import Button from "../../../../components/ui/Button";
import {useAuthCheck} from "../../../../hooks/auth.check.hook";
import classes from "../../../../components/editors/EditItem.module.css"
import {toast} from "react-toastify";




const OrderInfo: NextPage = () => {
    const auth = useContext<AuthCtx>(AuthContext);
    const { query } = useRouter();
    const [car, setCar] = useState<Car>()
    const [order, setOrder] = useState<RepairOrder>({
        id: query.orderId, car_id: 0, order_date: '', result: '',
        work_type: 0, user_id: '', description: ''
    })
    useEffect(()=>{
        setOrder({...order, id: query.orderId})
    },[query.orderId])
    useEffect(() => {
        if (order.id) {
            axios.get(`/api/orders/repairOrderById?id=${order.id}`,
                {headers: { Authorization: `Bearer ${auth.token}`},})
                .then(res => {
                    console.log(res.data)
                    setOrder(res.data)
                })
                .catch(res=> toast.error(res.response.data))
        }
    }, [order.id, auth.token]);
    useEffect(()=>{
        if(order.car_id != 0)
            axios.get(`/api/cars/getCarById?id=${order.car_id}`,
                {headers: {Authorization: `Bearer ${auth.token}`}})
                .then(res => setCar(res.data))
                .catch(res=> toast.error(res.response.data))
    },[order.car_id,  auth.token])
    const [works, setWorks] = useState<Work[]>([])
    const [loaded, setLoaded] = useState("false")
    useEffect(() => {
        if (order.id) {
            axios.get(`/api/works/getWorksById?order_id=${order.id}`,
                {headers: { Authorization: `Bearer ${auth.token}`},})
                .then(res => {
                    setLoaded("true")
                    setWorks(res.data)
                })
                .catch(res=> toast.error(res.response.data))
        }
    }, [order.id,  auth.token]);
    console.log(works)
    const [result, setResult] = useState<string>("")
    const finishOrder = () =>{
        axios.put(`/api/orders/finishRepairOrder`,{id: order.id, result},
            {headers: { Authorization: `Bearer ${auth.token}`}})
            .then(() => {
                toast.success("Заказ завершён.")
                setOrder({...order, result: result})
            })
            .catch(res=> toast.error(res.response.data))
    }
    const {checkAuth,checkRole, PushBack} = useAuthCheck()
    if (!checkAuth()) return <PushBack/>
    return (
        <>
            {loaded == "true" &&
                <div>
                    <Head>
                        <title>Инфо</title>
                    </Head>
                    <h1>Заказ: №{order.id}</h1>
                    <h2>{car?.brand.brand} {car?.model.model} - {order.description}</h2>
                    <h1>Cписок работ:</h1>
                        <div className="table100">
                            {works.map((work: Work, index) => (
                                <>
                                    <h2>{work.description} </h2>
                                    <table key={index}>
                                        <thead>
                                        <tr className="table100-head">
                                            <th className="column1">Название</th>
                                            <th className="column2">Цена</th>
                                            <th className="column3">Кол-во</th>
                                            <th className="column4">Общ. цена</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {work.used_parts.map((part)=>(
                                            <tr key={part.part_id}>
                                                <td className="column1">{part.name}</td>
                                                <td className="column2">{part.price}</td>
                                                <td className="column3">{part.count}</td>
                                                <td className="column4">{part.count*part.price}</td>
                                            </tr>
                                        ))}
                                        <tr>
                                            <td className="column1">Работа</td>
                                            <td className="column2">{work.price}</td>
                                            <td className="column3">1</td>
                                            <td className="column4">{work.price}</td>
                                        </tr>
                                        <tr>
                                            <td className="column1">Всего</td>
                                            <td className="column2"></td>
                                            <td className="column3"></td>
                                            <td className="column4">{work.total_price}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                    <br/>
                                </>
                            ))}
                        </div>
                    {works.length == 0 && <div>Нет работ</div>}
                    <br/>
                    {!checkRole("WORKER") && !order.result && <><Button href={`${query.orderId}/addWork`}>Добавить работу</Button>
                    <br/><br/>
                    <div className={classes.flexCenter}>
                        <input style={{"width": "20rem"}} type="text" placeholder="Введите результат"
                               onChange={e=>setResult(e.target.value)} value={result} name='result'/>
                        <Button onClick={finishOrder}>Завершить</Button>
                    </div></>}
                </div>}
            {!!order.result && <h2>Заказ завершён, результат: {order.result}</h2>}

            {loaded=="false" && <div>не верный id</div>}
        </>
    )

}
export default OrderInfo