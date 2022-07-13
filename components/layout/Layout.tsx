import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

function Layout(props: any) {
  return (
    <div>
      <MainNavigation isAuthenticated={props.isAuthenticated} role={props.role}/>
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
