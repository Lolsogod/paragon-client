import classes from './Button.module.css';
import Link from "next/link";

const Button = (props: any) => {
    return <Link href={`${props.href}`}>
        <a className={classes.btn}>{props.children}</a>
    </Link>;
}

export default Button;