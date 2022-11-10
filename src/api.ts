import axios from "axios";
import { off } from "process";
import { gameCart } from "./redux/reducers/Cart";
import { Products } from "./types";

export const API = {
    
    getAll: async (id: number) => {
        let response = await axios.get("http://localhost:8819/tasks?userId="+id);
        return response.data
    },
    
    Login: async ( email: string, password: string ) => {
        try {
            let response = await axios.post("http://localhost:8819/user/signin", {
                email, password
            });
            return response.data
        } catch (error) {
            
        }
    },

    Register: async ( name: string, email: string, password: string) => {
        let response = await axios.post("http://localhost:8819/user/signup", {
            name, email, password
        });
        return response.data
    },

    Request: async ( token: string ) => {
        let response = await axios.get("http://localhost:8819/user/request");
        return response.data
    },

    // Foods

    getProducts: async (limit: number = 6, offset?: number, idCategory?: number, q?: string | null) => {
        let url = `http://localhost:8819/devsfood/foods`
        
        let queryString = [];

        if(q) {
            queryString.push(`q=${q}`);
        }
        if(idCategory) {
            queryString.push(`idCategory=${idCategory}`);
        }
        if(offset) {
            queryString.push(`offset=${offset}`);
        }
        
        let response = await axios.get(
            `http://localhost:8819/devsfood/foods?limit=${limit}&${queryString.join('&')}`
        )
        return response.data
    },


    // Categories

    GetCategories: async () => {
        let response = await axios.get("http://localhost:8819/devsfood/categories");
        return response.data
    },

    // Cupom

    GetCupom: async (code: string) => {
        let response = await axios.get(`http://localhost:8819/devsfood/discounts/${code}`);
        return response.data
    },
    

    // Address

    GetAddress: async (id: number) => {
        let response = await axios.get(`http://localhost:8819/devsfood/addresses/${id}`);
        return response.data
    },

    UpdateAddress: async (id: number, local: string, rua: string, numero: string, estado: string, cidade: string) => {
        let response = await axios.post(`http://localhost:8819/devsfood/addresses/${id}`, {
            local, rua, numero, estado, cidade
        });
        return response.data
    },

    // Orders 

    GetOrders: async (idUser: number) => {
        let response = await axios.get(`http://localhost:8819/devsfood/orders/${idUser}`);
        return response.data
    },

    CreateOrder: async (idUser: number, total: number, items: gameCart[]) => {
        let response = await axios.post(`http://localhost:8819/devsfood/orders`, {
            idUser, total, items
        });
        return response.data
    },

    UpdateOrder: async (idOrder: number, status: string) => {
        let response = await axios.put(`http://localhost:8819/devsfood/orders`, {
            id: idOrder, status
        });
        return response.data
    },

    DeleteOrder: async (idOrder: number) => {
        let response = await axios.post(`http://localhost:8819/devsfood/orders/delete`, {
            id: idOrder
        });
        return response.data
    },



    
}

