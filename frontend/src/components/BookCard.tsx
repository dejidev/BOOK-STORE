import { getImgUrl } from "../utils/getImgUrl";
import { Link } from "react-router-dom";

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

type Props = {
    book: Book
}
const BookCard: React.FC<Props> = ({ book }) => {

    return (
        <div className=" m-4 bg-white shadow-md rounded-xl overflow-hidden transition hover:scale-105 hover:shadow-xl duration-300">
            <img
                src={getImgUrl(book.coverImage)}
                alt={book.title}
                className="w-full"
            />
            <Link to={`/books/${book._id}`}>
                <div className="py-4 cursor">
                    <h2 className="text-md font-semibold mb-1">{book.title}</h2>
                    <p className="text-xs text-gray-700 mb-2">{book.description.length > 80 ? `${book.description.slice(0, 80)}...` : book.description}</p>
                    <p className="text-sm text-gray-500 mb-2 capitalize">{book.category}</p>

                    <div className="flex items-center space-x-2">
                        <span className="text-red-500 font-bold">${book.newPrice.toFixed(2)}</span>
                        <span className="line-through text-gray-400 text-sm">${book.oldPrice.toFixed(2)}</span>
                    </div>

                    {book.trending && (
                        <span className="inline-block mt-2 text-xs bg-yellow-400 text-black px-2 py-1 rounded">
                            Trending
                        </span>
                    )}
                </div>
            </Link>

        </div>
    )
}

export default BookCard
