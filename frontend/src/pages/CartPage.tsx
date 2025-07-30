import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/features/cart/cartSlice";
import { FaTrash } from "react-icons/fa";
import type { RootState } from "../redux/store";
import { Link } from "react-router-dom";

const CartPage = () => {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const dispatch = useDispatch();

    const handleRemove = (_id: number) => {
        dispatch(removeFromCart(_id));
    };

    const handleClearCart = () => {
        if (window.confirm("Are you sure you want to clear the cart?")) {
            dispatch(clearCart());
        }
    };


    const handleCheckout = () => {
        if (cartItems.length === 0) {
            alert("Cart is empty!");
        } else {
            alert("Proceeding to checkout...");
            // Navigate to checkout page or trigger checkout logic here
            // Navigate({checkout})
        }
      };

    return (
        <div>
            <div className="max-w-4xl mx-auto p-4 mt-6">
                <h2 className="text-2xl font-semibold mb-4">🛒 Your Cart</h2>

                {cartItems.length === 0 ? (
                    <p className="text-gray-600">Your cart is empty.</p>
                ) : (
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div key={item._id} className="flex justify-between items-center p-4 border rounded-md shadow-sm bg-white">
                                <div>
                                    <h3 className="text-lg font-medium">{item.name}</h3>
                                    <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                                </div>
                                <button
                                    onClick={() => handleRemove(item._id)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <FaTrash />
                                </button>
                            </div>
                        ))}

                        <button
                            onClick={handleClearCart}
                            className="mt-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow"
                        >
                            Clear Cart
                        </button>
                        <Link to="/checkout">
                                <button
                                    onClick={handleCheckout}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-2 rounded-md"
                                >
                                    Checkout
                                </button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CartPage



