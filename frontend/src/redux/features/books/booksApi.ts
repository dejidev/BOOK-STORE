import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import getbaseUrl from '../../../utils/baseurl';

type Book = {
    _id: number;
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
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");
        if (token) {
            headers.set("Authorization", `Bearer ${token}`);
        }
        return headers;
    }
});

const booksApi = createApi({
    reducerPath: 'bookApi',
    baseQuery,
    tagTypes: ["Books"],
    endpoints: (builder) => ({
        fetchAllBook: builder.query<{ books: Book[] }, void>({
            query: () => "/",
            providesTags: ["Books"]
        }),

        fetchBooksById: builder.query<Book, number>({
            query: (id) => `/${id}`,
        }),

        addBook: builder.mutation<Book, Partial<Book>>({
            query: (newBook) => ({
                url: '/create-books',
                method: 'POST',
                body: newBook,
            }),
            invalidatesTags: ['Books'],
        }),

        updateBook: builder.mutation<Book, Partial<Book> & { id: number }>({
            query: ({ id, ...updatedBook }) => ({
                url: `edit/${id}`,
                method: 'PUT',
                body: updatedBook,
            }),
            invalidatesTags: ["Books"],
        }),

        deleteBook: builder.mutation<void, number>({
            query: (id) => ({
                url: `/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ["Books"]
        }),
    })
});

export const {
    useFetchAllBookQuery,
    useFetchBooksByIdQuery,
    useAddBookMutation,
    useUpdateBookMutation,
    useDeleteBookMutation
} = booksApi;

export default booksApi;
