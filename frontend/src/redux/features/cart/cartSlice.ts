import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CartItem {
    _id: number;
    name: string;
    price: number;
    quantity?: number;
}

interface CartState {
    cartItems: CartItem[];
}


const initialState: CartState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.cartItems.find(
                item => item._id === action.payload._id
            );

            if (!existingItem) {
                state.cartItems.push(action.payload)
                // alert("Item added successfully")
            } else {
                // alert("Item already exist")
                console.log("Item already existed")
            }
        }
    }
})


export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;