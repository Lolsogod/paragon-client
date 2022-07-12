import classes from './Button.module.css';
import Link from "next/link";

const Button = (props: any) => {
    if (props.href){

        return <Link href={`${props.href}`}>
            <a className={classes.btn}>{props.children}</a>
        </Link>;
    }else
        return <a className={classes.btn} onClick={props.onClick}>{props.children}</a>

}

export default Button;