import classes from './Button.module.css';
import Link from "next/link";
import React, {FC} from "react";

const Button: FC<{href?: string, onClick?: ()=> void, children: React.ReactNode, btnType?: string}> = (props) => {
    let type: string;
    if(props.btnType == undefined){
        type = "def"
    }else type = props.btnType
    const types: {[key: string]: string} = {
        reg: classes.regBtn,
        def: classes.btn
    }
    if (props.href){
        return <Link href={`${props.href}`}>
            <a className={types[type]}>{props.children}</a>
        </Link>;
    }else
        return <a className={types[type]} onClick={props.onClick}>{props.children}</a>

}

export default Button;