
export interface AuthCtx{
    token: string,
    role: string,
    login: (jwtToken: string) => void,
    logout: () => void,
    isAuthenticated: boolean
}
export interface Brand{
    id: number,
    brand: string
}
export interface Model{
    id: number,
    model: string
    brand: Brand
}
export interface Car{
    id?: number,
    brand: Brand,
    model: Model,
    year: number,
    price: number,
    condition: string,
    sold?: boolean
}
export interface AddCarResponse{
    brand_id: number,
    model_id: number,
    year: number,
    price: number,
    condition: string
}
export interface ItemProps extends Car{
    brands: Brand[]
}
export interface User{
    name: string,
    surname: string,
    patronymic: string
}
export interface ParsedJwt{
    aud: string
    exp: number
    iat: number
    iss: string
    role: string
    sub: string
}
export interface CarPaths{
    paths: { params: { carId: string } }[],
    fallback: boolean,
}


