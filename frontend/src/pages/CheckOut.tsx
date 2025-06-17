
// const CheckOut = () => {
//   return (
//     <div>
//       CheckOut
//     </div>
//   )
// }

// export default CheckOut


import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";

const Checkout = () => {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        country: "",
        state: "",
        city: "",
        zipCode: "",
        phone: "",
    });
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isChecked) return alert("Please agree to the terms and conditions");

        const order = {
            ...formData,
            productIds: cartItems.map(item => item._id),
            totalPrice: cartItems.reduce((sum, item) => sum + item.price, 0),
        };

        console.log("Order placed:", order);

        // Optional: POST to API here

        alert("Order placed successfully!");
        navigate("/thank-you"); // Or wherever you want to redirect
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
            <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* User Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} className="border p-2 rounded" />
                    <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} className="border p-2 rounded" />
                    <input type="text" name="country" placeholder="Country" required value={formData.country} onChange={handleChange} className="border p-2 rounded" />
                    <input type="text" name="state" placeholder="State" required value={formData.state} onChange={handleChange} className="border p-2 rounded" />
                    <input type="text" name="city" placeholder="City" required value={formData.city} onChange={handleChange} className="border p-2 rounded" />
                    <input type="text" name="zipCode" placeholder="Zip Code" required value={formData.zipCode} onChange={handleChange} className="border p-2 rounded" />
                    <input type="tel" name="phone" placeholder="Phone Number" required value={formData.phone} onChange={handleChange} className="border p-2 rounded" />
                </div>

                {/* Cart Summary */}
                <div className="bg-gray-50 p-4 rounded">
                    <h3 className="text-lg font-medium mb-2">Order Summary</h3>
                    <ul className="space-y-1 text-sm">
                        {cartItems.map(item => (
                            <li key={item._id}>
                                {item.name} - ${item.price.toFixed(2)}
                            </li>
                        ))}
                    </ul>
                    <p className="font-semibold mt-2">Total: ${totalPrice.toFixed(2)}</p>
                </div>

                {/* Terms and Submit */}
                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="terms"
                        checked={isChecked}
                        onChange={() => setIsChecked(prev => !prev)}
                        className="accent-yellow-500"
                    />
                    <label htmlFor="terms" className="text-sm">I agree to the terms and conditions</label>
                </div>

                <button type="submit" className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded transition">
                    Place Order
                </button>
            </form>
        </div>
    );
};

export default Checkout;
