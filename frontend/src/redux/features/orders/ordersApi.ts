import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import getbaseUrl from '../../../utils/baseurl';

type OrderInput = {
    name: string;
    email: string;
    address: {
        country: string;
        state: string;
        city: string;
        zipCode: string;
    };
    phone: string; // we collect it as a string, convert to number when sending
    productId: string[];
    totalPrice: number;
};



const baseQuery = fetchBaseQuery({
    baseUrl: `${getbaseUrl()}/api/orders`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem("token");
        if (token) {
            Headers.set("Authorization", `Bearer ${token}`)
        }
        return Headers;
    }
})


const ordersApi = createApi({
    reducerPath: "orderApi",
    baseQuery,
    tagTypes: ["Orders"],
    endpoints: (builder) => ({
        createOrder: (builder.mutation)<OrderInput, OrderInput>({
            query: (newOrder) => ({
                url: "/",
                method: "POST",
                body: newOrder,
                credentials: "include"
            })
        }),

        getOrderByEmail: (builder.query)({
            query: (email) => ({
                url: `/${email}`,
                providesTags: ["Orders"]
            })
        })
    })

})



export const { useCreateOrderMutation, useGetOrderByEmailQuery } = ordersApi;
export default ordersApi;