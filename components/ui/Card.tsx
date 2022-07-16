import classes from './Card.module.css';
import React, {FC} from "react";

const Card: FC<{children: React.ReactNode}> = (props) => {
    return <div className={classes.card}>{props.children}</div>;
}

export default Card;