import { useNavigate } from 'react-router-dom';
import {
  useDeleteBookMutation,
  useFetchAllBookQuery
} from '../../redux/features/books/booksApi';
import { getImgUrl } from '../../utils/getImgUrl';

const ManageBook = () => {
  const navigate = useNavigate();

  const { data: books, isLoading, refetch } = useFetchAllBookQuery();
  const [deleteBook] = useDeleteBookMutation();

  const handleDeleteBook = async (id: number | string) => {
    try {
      await deleteBook(id).unwrap();
      console.log("Book deleted");
      alert('Book deleted successfully');
      refetch();
    } catch (error) {
      console.error('Failed to delete a book', error);
      alert('Failed to delete a book');
    }
  };


  const handleEditClick = (id) => {
    navigate(`/dashboard/edit-book/${id}`);
  };

  if (isLoading) return <p>Loading books...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Books</h2>
      {books?.books?.length === 0 ? (
        <p>No books available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {books?.books?.map((book) => (
            <div
              key={book._id}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <img
                src={getImgUrl(book.coverImage).toString()}
                // src={getImgUrls(book.coverImage)}
                alt={book.title}
                className="w-full h-40 object-cover rounded mb-2"
              />
              <h3 className="text-lg font-bold">{book.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                {book.description.slice(0, 100)}...
              </p>
              <p className="text-sm">
                <span className="line-through">${book.oldPrice}</span>{' '}
                <span className="text-green-600">${book.newPrice}</span>
              </p>
              <div className="flex justify-end mt-4 gap-2">
                <button
                  onClick={() => handleEditClick(book._id)}
                  className="px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteBook(Number(book._id))}
                  className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageBook;
