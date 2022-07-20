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
    own?: boolean,
    img_url?: string
}
export interface AddCarResponse{
    brand_id: number,
    model_id: number,
    year: number,
    price: number,
    condition: string
    img_url: string | undefined
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
export interface PartType {
    id: number,
    name: string
}
export interface  Part {
    id: number,
    name: string,
    brand_id: number,
    model_id: number,
    price: number,
    type: PartType,
    count: number
}

export interface Work {
    id: number,
    order_id: number,
    description: string,
    price: number,
    total_price: number,
    used_parts: UsedPart[]
}
export interface WorkRequest{
    order: string | string[] | undefined,
    description: string,
    used_parts: OrderPartRequest[]
    work_price: number
}
export interface UsedPart{
    part_id: number,
    count: number,
    brand_id: number,
    model_id: number,
    price: number
    name: string
}


export interface PartRequest {
    name: string,
    brand: number,
    model: number,
    price: number,
    type: number
}
export interface OrderPartRequest{
    id: number,
    count: number
}

export interface RepairOrderRequest{
    car_id: string | string[] | undefined,
    description: string,
    work_type: number
}
export interface WorkType{
    id: number,
    name:string
}
export interface RepairOrder {
    id: string | string[] | undefined,
    car_id: number,
    user_id: string,
    order_date: string,
    description: string,
    work_type: number
    result: string
}
