import classes from './Card.module.css';
//TODO: почитать про тс и убрать ани

const Card = (props: any) => {
    return <div className={classes.card}>{props.children}</div>;
}

export default Card;