import {NextPage} from "next";
import Head from "next/head";
import {useContext, useState} from "react";
import axios from "axios";
import router from "next/router";
import {AuthContext} from "../context/AuthContext";
import classes from "../components/Auth.module.css"
import Button from "../components/ui/Button";


const Login: NextPage = () => {
    const auth = useContext(AuthContext)
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const submitForm = async () =>{
        await axios.post("http://localhost:8081/auth/token",
            {username, password})
            // @ts-ignore
            .then(res => auth.login(res.data.token))
        await router.push("/")
    }
    return (
        <>
            <div className={classes.formCont}>
                <Head>
                    <title>Логин</title>
                </Head>
                <h1>Вход</h1>
                <form>
                    <label htmlFor="username">Логин</label>
                    <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)}/>
                    <label htmlFor="password">Пароль</label>
                    <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                    <br/><br/>
                    <Button onClick={submitForm}>Войти</Button>
                </form>
            </div>
        </>
    )
}

export default Login;