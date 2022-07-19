import type { NextPage} from 'next'
import Head from 'next/head'
import {useContext, useEffect, useState} from "react";
import {AuthCtx, RepairOrder, Work} from "../../../../interfaces/interfaces";
import {useRouter} from "next/router";
import axios from "axios";
import {AuthContext} from "../../../../context/AuthContext";
import Button from "../../../../components/ui/Button";
import CarItem from "../../../../components/CarItem";
import {useAuthCheck} from "../../../../hooks/auth.check.hook";
import classes from "../../../../components/editors/EditItem.module.css"




const OrderInfo: NextPage = () => {
    const auth = useContext<AuthCtx>(AuthContext);
    const { query } = useRouter();
    const [order, setOrder] = useState<RepairOrder>({
        id: query.orderId, car_id: 0, order_date: '', result: ''
    })
    useEffect(()=>{
        setOrder({...order, id: query.orderId})
    },[query.orderId])
    const [works, setWorks] = useState<Work[]>([])
    const [loaded, setLoaded] = useState("false")
    useEffect(() => {
        if (!!auth.token && order.id) {
            axios.get(`/api/works/getWorksById?order_id=${order.id}`,
                {headers: { Authorization: `Bearer ${auth.token}`},})
                .then(res => {
                    setLoaded("true")
                    setWorks(res.data)
                })
                .catch(e => console.log(e));
        }
    }, [auth.token, order.id]);

    const [result, setResult] = useState<string>("")
    const finishOrder = () =>{
        axios.post(`/api/orders/finishRepairOrder`,{id: order.id, result},
            {headers: { Authorization: `Bearer ${auth.token}`}})
            .then(() => alert("завершён"))
            .catch(e => console.log(e));
    }
    const {checkAuth,checkRole, PushBack} = useAuthCheck()
    if (!checkAuth()) return <PushBack/>
    if(!checkRole("WORKER")){
        return (
            <>
                {loaded == "true" &&
                    <div>
                        <Head>
                            <title>Инфо</title>
                        </Head>
                        <h1>Заказ: №{order.id}</h1>
                            <div className="wrap-table100">
                                <div className="table100">
                                    {works.map((work: Work, index) => (
                                        <>
                                            <h2>{work.description} </h2>
                                            <table>
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
                            </div>

                        {works.length == 0 && <div>Нет работ</div>}
                        <br/>
                        <Button href={`${query.orderId}/addWork`}>Добавить работу</Button>
                        <br/><br/>
                        <div className={classes.flexCenter}>
                            <input style={{"width": "20rem"}} type="text" placeholder="Введите результат"
                                   onChange={e=>setResult(e.target.value)} value={result} name='result'/>
                            <Button onClick={finishOrder}>Завершить</Button>
                        </div>
                    </div>}

                {loaded=="false" && <div>не верный id</div>}
            </>
        )
    }
    return (
        <>
            {loaded == "true" &&
                <div>
                    <Head>
                        <title>Инфо</title>
                    </Head>
                    <h1>Заказ: №{order.id}</h1>
                    <h2>список работ</h2>
                    {works.map((work: Work, index) => (
                        <div key={index}>
                            {work.description} {work.price} руб
                            <ol>
                                {work.used_parts.map((part)=>(
                                    <li key={part.part_id}>
                                        {part.name} цена:{part.price}x{part.count} руб
                                    </li>
                                ))}
                            </ol>
                            Всего: {work.total_price}
                        </div>
                    ))}
                </div>}
            {loaded=="false" && <div>не верный id</div>}
        </>
    )
}
export default OrderInfo