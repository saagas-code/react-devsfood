
export type accounts = {
    id: number,
    email: string,
    name: string,
    idState: number,
    password: string,
    token: string
}

export type erroLogin = {
    email?: {
        value?: string,
        msg?: string,
        param?: string,
        location?: string
    },
    password?: {
        value: string,
        msg: string,
        param: string,
        location: string
    },
    confirmPassword?: string
}

export type Categories = {
    id: number
    name: string,
    image: string
}

export type Products = {
    id: number,
    id_cat: number,
    name: string
    image: string,
    ingredients: string,
    points: number,
    price: number
} 

export type Product = {
    id: number,
    id_cat: number,
    name: string
    image: string,
    ingredients: string,
    points: number,
    price: number
    qnt?: number
}

export type cupom = {
    _id: string,
    code: string,
    discount: number
}

export type  Address = {
    local: string,
    rua: string,
    numero: string,
    estado: string,
    cidade: string
}

export type OrderItems = {
    id: number,
    idFood: number,
    idOrder: number,
    name: string,
    price: number,
    qnt: number
}

export type Order = {
    id: number,
    idUser: number,
    total: number,
    orderDate: Date,
    status: string
    OrderItems: OrderItems[]
}

