import Button from "../ui/Button";
import axios from "axios";
import { ChangeEvent, FC, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AuthCtx } from "../../interfaces/interfaces";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const AddType: FC<{tt: string}> = (props) => {
    const auth: AuthCtx = useContext(AuthContext);
    const router = useRouter()
    const [type, setType] = useState<string>("");

    const send = () => {
        axios.post(`/api/${props.tt}/addType?name=${type}`,  {},
                { headers: { Authorization: `Bearer ${auth.token}` } })
            .then((res) =>
                router.push("/admin")
                .then(() => toast.success(`Тип ${props.tt=="works"?"работы":"запчасти"} добавлен`)))
            .catch(res=> toast.error(res.response.data))
    };
    const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value);
    };

    return (
        <div>
            <h2>Добавить тип {props.tt=="works"?"работы":"запчасти"}</h2>
            <input type="text" placeholder="Введите имя"
                   onChange={changeHandler} value={type}/>
            <br/><br/>
            <Button onClick={send}>Добавить</Button>
        </div>
    );
};
export default AddType;