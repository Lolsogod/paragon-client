import type { NextPage} from 'next'
import Head from 'next/head'
import {useContext, useEffect, useState} from "react";
import {AuthCtx, RepairOrder, Work} from "../../../../interfaces/interfaces";
import {useRouter} from "next/router";
import axios from "axios";
import {AuthContext} from "../../../../context/AuthContext";
import Button from "../../../../components/ui/Button";
import CarItem from "../../../../components/CarItem";





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

    useEffect(() => {
        if (!!auth.token && order.id) {
            axios.get(`/api/works/getWorksById?order_id=${order.id}`,
                {headers: { Authorization: `Bearer ${auth.token}`},})
                .then(res => setWorks(res.data))
                .catch(e => console.log(e));
        }
    }, [auth.token, order.id]);

    const [result, setResult] = useState<string>("")
    const finishOrder = () =>{
        axios.post(`/api/orders/repairOrder`,{id: order.id, result},
            {headers: { Authorization: `Bearer ${auth.token}`}})
            .then(() => alert("завершён"))
            .catch(e => console.log(e));
    }

    return (
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
            <Button href={`${query.orderId}/addWork`}>Добавить работу</Button>
            <br/>
            <input type="text" placeholder="Введите результат ремонта"
                   onChange={e=>setResult(e.target.value)} value={result} name='result'/>
            <Button onClick={finishOrder}>Завершить</Button>
        </div>
    )
}
export default OrderInfo