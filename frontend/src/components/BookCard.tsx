import { getImgUrl } from "../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { addToCart } from "../redux/features/cart/cartSlice";


type Book = {
    _id: string | number;
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
    const dispatch = useDispatch();


    const handleAddToCart = () => {
        console.log("Clicked on the cart");

        dispatch(addToCart({
            _id: book._id,
            name: book.title,
            price: book.newPrice,
            quantity: 1,
            // coverImage: book.coverImage
        }));
    };


    return (
        <div className="m-4 bg-white flex align-center shadow-md rounded-xl overflow-hidden transition hover:scale-105 hover:shadow-xl duration-300">
            <img
                src={getImgUrl(book.coverImage)}
                alt={book.title}
                className="w-32 object-cover"
            />

            <div className="p-4 flex-1 flex flex-col justify-between">
                <Link to={`/books/${book._id}`}>
                    <div>
                        <h2 className="text-md font-semibold mb-1">{book.title}</h2>
                        <p className="text-xs text-gray-700 mb-2">
                            {book.description.length > 80
                                ? `${book.description.slice(0, 80)}...`
                                : book.description}
                        </p>
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

                {/* Cart Button */}
                <button
                    onClick={handleAddToCart}
                    className="mt-4 flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-sm text-black font-medium py-1 px-3 rounded transition"
                >
                    <FaShoppingCart />
                    Add to Cart
                </button>
            </div>
        </div>
    )
}

export default BookCard
