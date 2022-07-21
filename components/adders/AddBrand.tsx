import Button from "../ui/Button";
import axios from "axios";
import { ChangeEvent, FC, useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AuthCtx } from "../../interfaces/interfaces";
import {toast} from "react-toastify";
import {useRouter} from "next/router";

const AddBrand: FC = () => {
  const auth: AuthCtx = useContext(AuthContext);
  const router = useRouter()
  const [brand, setBrand] = useState<string>("");

  const send = () => {
    axios.post("http://localhost:8080/addBrand",  {brand},
        { headers: { Authorization: `Bearer ${auth.token}` } })
        .then(() => {
            toast.success("Брэнд добавлен")
            router.push("/admin")
        })
        .catch(()=> toast.error("Введены некоректные данные."))
  };
  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setBrand(event.target.value);
  };

  return (
    <div>
      <h2>Добавить брэнд</h2>
      <input type="text" placeholder="Введите имя"
             onChange={changeHandler} value={brand}/>
      <br/><br/>
      <Button onClick={send}>Добавить</Button>
    </div>
  );
};
export default AddBrand;