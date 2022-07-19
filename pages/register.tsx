import {NextPage} from "next";
import Head from "next/head";
import {ChangeEvent, useContext, useState} from "react";
import axios from "axios";
import Button from "../components/ui/Button";
import classes from "../components/Auth.module.css"
import {AuthCtx, User} from "../interfaces/interfaces";
import {AuthContext} from "../context/AuthContext";
import {useRouter} from 'next/router'
import {useAuthCheck} from "../hooks/auth.check.hook";

const Register: NextPage = () => {
    const auth = useContext<AuthCtx>(AuthContext)
    const [form, setForm] = useState<User & {username: string, password: string}>({
        username:'', password: '', name: '', surname: '', patronymic: ''
    })

    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const submitForm = async () =>{
        await axios.post("http://localhost:8081/auth/",
            {...form})
            .then(() => alert("Зареган!"))
    }
    const {checkAuth, PushBack} = useAuthCheck()
    if (checkAuth()) return <PushBack/>
    return (
        <>
            <Head>
                <title>Регистрация</title>
            </Head>
            <div className={classes.formCont}>
                <h1>Регистрация</h1>
                <form>
                    <div className={`${classes.textField} ${classes.textField_floating}`}>
                        <input type="text" name="username" value={form.username} placeholder={"a"}
                               onChange={changeHandler} className={classes.textField__input}/>
                        <label className={classes.textField__label} htmlFor="username">Логин</label>
                    </div>
                    <div className={`${classes.textField} ${classes.textField_floating}`}>
                        <input type="password" name="password" value={form.password} placeholder={"a"}
                               onChange={changeHandler} className={classes.textField__input}/>
                        <label className={classes.textField__label} htmlFor="username">Пароль</label>
                    </div>
                    <div className={`${classes.textField} ${classes.textField_floating}`}>
                        <input type="text" name="surname" value={form.surname} placeholder={"a"}
                               onChange={changeHandler} className={classes.textField__input}/>
                        <label className={classes.textField__label} htmlFor="username">Фамилия</label>
                    </div>
                    <div className={`${classes.textField} ${classes.textField_floating}`}>
                        <input type="text" name="name" value={form.name} placeholder={"a"}
                               onChange={changeHandler} className={classes.textField__input}/>
                        <label className={classes.textField__label} htmlFor="username">Имя</label>
                    </div>
                    <div className={`${classes.textField} ${classes.textField_floating}`}>
                        <input type="text" name="patronymic" value={form.patronymic} placeholder={"a"}
                               onChange={changeHandler} className={classes.textField__input}/>
                        <label className={classes.textField__label} htmlFor="username">Отчество</label>
                    </div>
                    <br/>
                    <Button onClick={submitForm}>Зарегистрироваться</Button>
                </form>
            </div>
        </>
    )

}

export default Register;