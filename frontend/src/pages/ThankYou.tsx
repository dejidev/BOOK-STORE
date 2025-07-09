import { Link } from 'react-router-dom';

const ThankYou = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 text-center">
            <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You!</h1>
            <p className="text-lg text-gray-700 mb-6">
                Your order has been placed successfully. We’ll send you an email with the details shortly.
            </p>

            <Link
                to="/"
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-6 rounded transition"
            >
                Continue Shopping
            </Link>
        </div>
    );
};

export default ThankYou;
