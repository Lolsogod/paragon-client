import classes from "../CarList.module.css";
import { FC, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import AddItem from "./AddItem";
import { AuthCtx, Brand } from "../../interfaces/interfaces";

const AddCar: FC = () => {
  const auth = useContext<AuthCtx>(AuthContext);
  const [brands, setBrands] = useState<Brand[]>([]);

  useEffect(() => {
    if (!!auth.token) {
      axios.get("/api/cars/brand",
          {headers: { Authorization: `Bearer ${auth.token}`},})
        .then(res => setBrands(res.data))
        .catch(e => console.log(e));
    }
  }, [auth.token]);

  return (
    <ul className={classes.list}>
      <AddItem
        brands={brands}
        year={0}
        brand={{id: 0, brand:""}}
        model={{id: 0, model: "", brand: {id: 0, brand:""}}}
        price={0}
        condition={""}
        img_url={""}
      />
    </ul>
  );
};
export default AddCar;
