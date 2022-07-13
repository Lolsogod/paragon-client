import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from "../components/layout/Layout";
import {useAuth} from "../hooks/auth.hook";
import { AuthContext } from '../context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
    const {login, logout, token, role, userId,email} = useAuth()
    const isAuthenticated = !!token;
    return (
        // @ts-ignore
      <AuthContext.Provider value={{token, login, logout, role, userId, email}}>
          <Layout isAuthenticated={isAuthenticated} role={role}>
            <Component {...pageProps} isAuthenticated={isAuthenticated} />
          </Layout>
      </AuthContext.Provider>
  )
}

export default MyApp
