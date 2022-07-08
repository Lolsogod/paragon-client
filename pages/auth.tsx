import {NextPage} from "next";
import Head from "next/head";
import CarList from "../components/CarList";
import {useState} from "react";
import axios from "axios";
import jwt from "jsonwebtoken"
import {setCookie} from 'cookies-next';
import {serialize} from "cookie";

const Auth: NextPage = (props: any) => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const submitForm = async () =>{
        let token: string = '';
        await axios.post("http://localhost:5001/auth/token",
            {username, password})
            .then(t => token=t.data.token)
        setCookie('jwtCookie', token, {maxAge: 60 * 6 * 24 });
        /*
        const decodedToken = jwt.decode(token)
        // @ts-ignore
        alert(`Hello ${decodedToken.sub}`)*/

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
                <input type="button" value="войти" onClick={submitForm}/>
            </form>
        </>
    )

}

export default Auth;