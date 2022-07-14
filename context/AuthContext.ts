import {createContext} from 'react';
import {AuthCtx} from "../interfaces/interfaces";

const noop = () => {}
export const AuthContext = createContext<AuthCtx>({
    token: '',
    role: '',
    userId: 0,
    email: '',
    login: noop,
    logout: noop,
    isAuthenticated: false
})