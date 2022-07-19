import Link from "next/link";
import classes from './MainNavigation.module.css';
import LogOut from "../LogOut";
import React, {FC} from "react";



const MainNavigation: FC<{isAuthenticated: boolean, role: string}> = (props) => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
          <Link href='/'>PARAGON</Link>
      </div>
      <nav>
        <ul>
            <>
            {props.role == "WORKER"  && <li><Link href="/sto">СТО</Link></li>}
            {!props.isAuthenticated && <>
                <li><Link href='/login'>ВОЙТИ</Link></li>
            <li><Link href='/register'>РЕГИСТРАЦИЯ</Link></li>
            </>}
            {props.isAuthenticated  &&<>
                {props.role == "ADMIN" && <li><Link href="/admin">АДМИН-ПАНЕЛЬ</Link></li>}
                <li><Link href="/profile">ПРОФИЛЬ</Link></li>
                <li><LogOut/></li>
            </>
           }</>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
