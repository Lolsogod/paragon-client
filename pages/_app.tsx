import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "../components/layout/Layout";
import {useAuth} from "../hooks/auth.hook";
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
    const {login, logout, token, role, ready} = useAuth()

    const isAuthenticated: boolean = !!token;
    return (
        <>{ready &&
          <AuthContext.Provider value={{token, login, logout, role, isAuthenticated}}>
              <ToastContainer/>
              <Layout isAuthenticated={isAuthenticated} role={role}>
                  <Component {...pageProps} isAuthenticated={isAuthenticated} />
              </Layout>
          </AuthContext.Provider>}
            {!ready && <div></div>}
        </>
  )
}

export default MyApp
