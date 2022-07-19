import Card from "../ui/Card";
import samplePart from "../../public/sample_part.jpg"
import classes from '../CarItem.module.css'
import {FC} from "react";
import {Part} from "../../interfaces/interfaces";
import Image from "next/image";

const PartItem: FC<Part> = (props) => {
    return(
        <li className={classes.item}>
            <Card>
                <div className={classes.image}>
                    <Image src={samplePart} alt='part'/>
                </div>
                {/*TODO: кривокосо*/}
                <div className={classes.content}>
                    <span className={classes.title}>{props.name} </span>
                    <br/>
                     на складе: {props.count}
                    <br/>
                    <span className={classes.price}>{props.price}</span> руб
                </div>
            </Card>
        </li>
    )
}

export default PartItem;