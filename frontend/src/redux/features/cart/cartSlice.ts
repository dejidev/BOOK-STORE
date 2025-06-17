import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import Swal from 'sweetalert2';

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
                Swal.fire({
                    title: "Item added successfully!",
                    icon: "success",
                    draggable: true
                });
            } else {
                // alert("Item already exist")
                Swal.fire({
                    icon: "error",
                    title: "Item already exist!",
                    // footer: '<a href="#">Why do I have this issue?</a>'
                });
            }
        },

        removeFromCart: (state, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter(item => item._id !== action.payload);
        },
        clearCart: (state,) => {
            state.cartItems = []
        }
    }
})


export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;