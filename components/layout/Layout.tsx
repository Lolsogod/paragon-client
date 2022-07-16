import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';
import React, {FC} from "react";

const Layout: FC<{isAuthenticated: boolean, role: string, children: React.ReactNode}> = (props) =>{
  return (
    <div>
      <MainNavigation isAuthenticated={props.isAuthenticated} role={props.role}/>
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
