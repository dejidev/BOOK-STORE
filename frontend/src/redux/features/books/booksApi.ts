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



const booksApi = createApi({
    reducerPath: 'bookApi',
    baseQuery,
    tagTypes: ["Books"],
    endpoints: (builder) => ({
        fetchAllBook: builder.query<{ books: Book[] }, void>({
            query: () => "/",
            providesTags: ["Books"]
        }),
        // fetchBooksById: builder.query<Book, string>({
        //     query: (id) => `/${id}`,
        //     providesTags: (result, error, id) => [{ type: 'Books', id }],
        // }),
        fetchBooksById: builder.query<Book, string | undefined>({
            query: (id) => `/${id}`,
            // providesTags: (_res, _err, id) => [{ type: 'Books', id }],
        }),

        addBook: builder.mutation<Book, Partial<Book>>({
            query: (newBook) => ({
                url: '/',
                method: 'POST',
                body: newBook,
            }),
            invalidatesTags: ['Books'],
        }),
        updateBook: builder.mutation<Book, Partial<Book> & { id: string }>({
            query: ({ id, ...updatedBook }) => ({
                url: `/${id}`,
                method: 'PUT',
                body: updatedBook,
            }),
            invalidatesTags: ["Books"],
        }),
        deleteBook: builder.mutation<Book, Partial<Book> & { id: string }>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Books"]
        })
    })
});



export const {
    useFetchAllBookQuery,
    useFetchBooksByIdQuery,
    // useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation
} = booksApi;
export default booksApi;