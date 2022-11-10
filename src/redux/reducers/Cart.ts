import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { Action } from 'history';
import { API } from '../../api';
import { RootState } from '../store';




type game = {
    title: string,
    id: number,
    price: number
}

interface CartProduct extends game {
    qnt: number
}

export type gameCart = {
    id: number
    name: string
    price: number
    qnt: number
    image: string
}

export const slice = createSlice({
    name: 'cart',
    initialState: {
        foodsInCart: [] as gameCart[],
        cupom: 0
    },
    reducers: {
       addToCart: (state, action) => {
        const productIndex = state.foodsInCart.findIndex(product => product.id === action.payload.id);
            if(productIndex !== -1) {
                state.foodsInCart[productIndex].qnt += action.payload.qnt;
            } else {
                state.foodsInCart.push({...action.payload})
            }
        },
        removeFromCart: (state, action) => {
            state.foodsInCart = state.foodsInCart.filter(product => product.id !== action.payload)
        },
        minusQnt: (state, action) => {
            const productIndex = state.foodsInCart.findIndex(product => product.id === action.payload)
            if(state.foodsInCart[productIndex].qnt > 1) {
                state.foodsInCart[productIndex].qnt -= 1
            } else {
                state.foodsInCart = state.foodsInCart.filter(product => product.id !== action.payload)
            }
        },
        increaseQnt: (state, action) => {
            const productIndex = state.foodsInCart.findIndex(product => product.id === action.payload)
            state.foodsInCart[productIndex].qnt += 1
    
        },
        findCupom: (state, action) => {
            state.cupom = action.payload as number
        },
        FinishCart: (state, action) => {
            state.cupom = 0
            state.foodsInCart = []
        }
    },
})

export const getTotalPrice = (state: RootState) => state.cart.foodsInCart.reduce((acc: number, next: { qnt: number; price: number; }) => acc += (next.qnt * next.price) ,(0 - state.cart.cupom)).toFixed(2)

export const { addToCart, removeFromCart, minusQnt, increaseQnt, findCupom, FinishCart } = slice.actions;
export default slice.reducer; 



