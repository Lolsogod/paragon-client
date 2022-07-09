import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

function Layout(props: any) {
  return (
    <div>
      <MainNavigation isAuthenticated={props.isAuthenticated} />
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
