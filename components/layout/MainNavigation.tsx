import Link from "next/link";
import classes from './MainNavigation.module.css';

function MainNavigation() {

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
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;
