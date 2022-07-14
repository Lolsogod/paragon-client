import Link from "next/link";
import classes from './MainNavigation.module.css';
import LogOut from "../LogOut";
import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";


function MainNavigation(props: any) {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
          <Link href='/'>Paragon</Link>
      </div>
      <nav>
        <ul>
            {!props.isAuthenticated && <>
                <li><Link href='/login'>Войти</Link></li>
            <li><Link href='/register'>Регистрация</Link></li>
            </>}
            {console.log(props.role)}
            {props.isAuthenticated  &&<>
                {props.role == "ADMIN" && <li><Link href="/admin">Админ-панель</Link></li>}
                <li><Link href="/profile">Профиль</Link></li>
                <li><LogOut/></li>
            </>
           }
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
