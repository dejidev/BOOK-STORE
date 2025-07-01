import { useParams } from 'react-router-dom';
import { useFetchBooksByIdQuery } from '../books/booksApi';
import BookCard from '../../../components/BookCard';

const SingleBook = () => {
    const { id } = useParams<{ id: string }>();

    const { data: book, isLoading, isError } = useFetchBooksByIdQuery(id!, {
        skip: !id,
    });

    console.log(book);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading book details.</div>;

    return (
        <div>
            <h1>Book Details</h1>
            <p>Book ID: {id}</p>
            <h2>{book?.title}</h2>
            <BookCard book={book!} />
        </div>
    );
};

export default SingleBook;
