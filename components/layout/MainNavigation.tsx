import Link from "next/link";
import classes from './MainNavigation.module.css';
import LogOut from "../LogOut";


function MainNavigation() {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>
          <Link href='/'>Paragon</Link>
      </div>
      <nav>
        <ul>

          <li>
            <Link href='/auth'>Войти</Link>
          </li>
            <li>
                <Link href='/register'>Регистрация</Link>
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
