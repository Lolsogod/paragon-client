import Link from "next/link";
import classes from './MainNavigation.module.css';
import LogOut from "../LogOut";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";


function MainNavigation(props: any) {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
          <Link href='/'>PARAGON</Link>
      </div>
      <nav>
        <ul>
            {!props.isAuthenticated && <>
                <li><Link href='/login'>ВОЙТИ</Link></li>
            <li><Link href='/register'>РЕГИСТРАЦИЯ</Link></li>
            </>}
            {console.log(props.role)}
            {props.isAuthenticated  &&<>
                {props.role == "ADMIN" && <li><Link href="/admin">АДМИН-ПАНЕЛЬ</Link></li>}
                <li><Link href="/profile">ПРОФИЛЬ</Link></li>
                <li><LogOut/></li>
            </>
           }
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
