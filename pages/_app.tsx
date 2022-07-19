import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "../components/layout/Layout";
import {useAuth} from "../hooks/auth.hook";
import { AuthContext } from '../context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
    const {login, logout, token, role, ready} = useAuth()
    const isAuthenticated: boolean = !!token;
    return (
        <>{ready &&
          <AuthContext.Provider value={{token, login, logout, role, isAuthenticated}}>
              <Layout isAuthenticated={isAuthenticated} role={role}>
                  <Component {...pageProps} isAuthenticated={isAuthenticated} />

              </Layout>
          </AuthContext.Provider>}
            {!ready && <div></div>}
        </>
  )
}

export default MyApp
