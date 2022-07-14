export interface AuthCtx{
    token: string,
    role: string,
    userId: number,
    email: string
    login: (jwtToken: string) => void,
    logout: () => void,
    isAuthenticated: boolean
}