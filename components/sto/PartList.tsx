import classes from  "../CarList.module.css"
import {FC} from "react";
import {Part} from "../../interfaces/interfaces";
import PartItem from "./PartItem";

const PartList: FC<{parts: Part[]}> = (props) =>{
    return(
        <ul className={classes.list}>
            {props.parts.map((part: any) => (
                <PartItem
                    key={part.id}
                    id={part.id}
                    name={part.name}
                    brand_id={part.brand_id}
                    model_id={part.model_id}
                    price={part.price}
                    type={part.type}
                    count={part.count}
                />
            ))}
        </ul>
    )
}

export default PartList;