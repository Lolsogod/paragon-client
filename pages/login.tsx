import {NextPage} from "next";
import Head from "next/head";
import {useContext, useState} from "react";
import axios from "axios";
import router from "next/router";
import {AuthContext} from "../context/AuthContext";


const Login: NextPage = (props: any) => {
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
            <Head>
                <title>Home</title>
            </Head>
            <h1>Вход</h1>
            <form>
                <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)}/>
                <br/>
                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <br/>
                <input type="button" value="Войти" onClick={submitForm}/>
            </form>
        </>
    )
}

export default Login;