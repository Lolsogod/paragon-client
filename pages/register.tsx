import {NextPage} from "next";
import Head from "next/head";
import {useState} from "react";
import axios from "axios";
import Button from "../components/ui/Button";
import classes from "../components/Auth.module.css"


const Register: NextPage = () => {

    const [form, setForm] = useState({
        username:'', password: '', name: '', surname: '', patronymic: ''
    })

    const changeHandler = (event: any) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const submitForm = async () =>{
        await axios.post("http://localhost:8081/auth/",
            {...form})
            .then(() => alert("Зареган!"))
    }
    return (
        <>
            <Head>
                <title>Регистрация</title>
            </Head>
            <div className={classes.formCont}>
                <h1>Регистрация</h1>
                <form>
                    <label htmlFor="username">Логин</label>
                    <input type="text" name="username" value={form.username} onChange={changeHandler}/>
                    <label htmlFor="пароль">Пароль</label>
                    <input type="password" name="password" value={form.password} onChange={changeHandler}/>
                    <label htmlFor="пароль">Фамилия</label>
                    <input type="text" name="surname" value={form.surname} onChange={changeHandler}/>
                    <label htmlFor="пароль">Имя</label>
                    <input type="text" name="name" value={form.name} onChange={changeHandler}/>
                    <label htmlFor="пароль">Отчество</label>
                    <input type="text" name="patronymic" value={form.patronymic} onChange={changeHandler}/>
                    <br/><br/>
                    <Button onClick={submitForm}>Зарегистрироваться</Button>
                </form>
            </div>
        </>
    )

}

export default Register;