import {NextPage} from "next";
import Head from "next/head";
import {useState} from "react";
import axios from "axios";


const Register: NextPage = (props: any) => {
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const submitForm = async () =>{
        await axios.post("http://localhost:8081/auth/",
            {username, password})
            .then(() => alert("Зареган!"))
    }
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <h1>Регистрация</h1>
            <form>
                <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)}/>
                <br/>
                <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <br/>
                <input type="button" value="Зарегистрироваться" onClick={submitForm}/>
            </form>
        </>
    )

}

export default Register;