import {NextPage} from "next";
import Head from "next/head";
import {useContext, useState} from "react";
import axios from "axios";
import router from "next/router";
import {AuthContext} from "../context/AuthContext";
import classes from "../components/Auth.module.css"
import Button from "../components/ui/Button";
import {useAuthCheck} from "../hooks/auth.check.hook";

import { toast } from 'react-toastify';


const Login: NextPage = () => {
    const auth = useContext(AuthContext)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const submitForm = async () =>{
        await axios.post("http://localhost:8081/auth/token",
            {username, password})
            .then(async res => {
                auth.login(res.data.token)
                await router.push("/")
            })
            .catch(res=> toast.error(res.response.data))

    }

    const {checkAuth, PushBack} = useAuthCheck()
    if (checkAuth()) return <PushBack/>
    return (
        <>
            <div className={classes.formCont}>
                <Head>
                    <title>Логин</title>
                </Head>
                <h1>Вход</h1>
                <form>
                    <div className={`${classes.textField} ${classes.textField_floating}`}>
                        <input type="text" name="username" value={username} placeholder={"a"}
                               onChange={e => setUsername(e.target.value)} className={classes.textField__input}/>
                        <label className={classes.textField__label} htmlFor="username">Логин</label>
                    </div>
                    <div className={`${classes.textField} ${classes.textField_floating}`}>
                        <input type="password" name="password" value={password} placeholder={"a"}
                               onChange={e => setPassword(e.target.value)} className={classes.textField__input}/>
                        <label className={classes.textField__label} htmlFor="username">Пароль</label>
                    </div>
                    <Button onClick={submitForm} btnType={"reg"}>Войти</Button>
                </form>
            </div>
        </>
    )
}

export default Login;