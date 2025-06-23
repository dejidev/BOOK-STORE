import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import getbaseUrl from '../../../utils/baseurl';

type Book = {
    _id: string;
    title: string;
    description: string;
    category: string;
    trending: boolean;
    coverImage: string;
    oldPrice: number;
    newPrice: number;
};


const baseQuery = fetchBaseQuery({
    baseUrl: `${getbaseUrl()}/api/books`,
    credentials: 'include',
    prepareHeaders: (Headers) => {
        const token = localStorage.getItem("token");

        if (token) {
            Headers.set("Authorization", `Bearer ${token}`)
        }
        return Headers;
    }
})

// const booksApi = createApi({
//     reducerPath: 'bookApi',
//     baseQuery: baseQuery,
//     tagTypes: ["Books"],
//     endpoints: (builder) => ({


//         fetchAllBook: builder.query < { books: Book[] , void}({
//             query: () => "/",
//             providesTags: ["Books"]
//         })
//     }),
// });


const booksApi = createApi({
    reducerPath: 'bookApi',
    baseQuery,
    tagTypes: ["Books"],
    endpoints: (builder) => ({
        fetchAllBook: builder.query<{ books: Book[] }, void>({
            query: () => "/",
            providesTags: ["Books"]
        })
    }),
});



export const { useFetchAllBookQuery } = booksApi;
export default booksApi;