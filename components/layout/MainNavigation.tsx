import Link from "next/link";
import classes from './MainNavigation.module.css';
import {deleteCookie} from "cookies-next";
import LogOut from "../LogOut";


function MainNavigation() {
    const logOut = () =>{
        deleteCookie("jwtCookie")
    }
  return (
    <header className={classes.header}>
      <div className={classes.logo}>Paragon</div>
      <nav>
        <ul>
          <li>
            <Link href='/'>Главная</Link>
          </li>
          <li>
            <Link href='/auth'>Войти</Link>
          </li>
            <li>
                <LogOut/>
            </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
