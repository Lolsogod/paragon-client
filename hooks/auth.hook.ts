import {useState, useCallback, useEffect} from 'react';
import {ParsedJwt} from "../interfaces/interfaces";

const storageName: string = "userData"
export const useAuth = () =>{
    const [token, setToken] = useState<string>('');
    const [ready, setReady] = useState<boolean>(false)
    const [role, setRole] = useState<string>('');

    const parseJwt = (token: string): ParsedJwt | void => {
        if (!token) { return; }
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    }

    const login = useCallback((jwtToken: string) => {
        setToken(jwtToken);
        const parsed = parseJwt(jwtToken);
        if (parsed) setRole(parsed.role);
        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken
        }));
    }, [])

    const logout = useCallback(() => {
        setToken('');
        setRole('');
        localStorage.removeItem(storageName);
    }, [])

    useEffect(()=>{
        const data: {token:string} = JSON.parse(localStorage.getItem(storageName) || '{}');
        if(data && data.token)
            login(data.token)

        setReady(true)
    }, [login])

    return {login, logout, token, role, ready}
}