import { useState } from "react";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../redux/store";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
        console.log(isMenuOpen);

    }

    const cartItems = useSelector((state: RootState) => state.cart.cartItems)

    // const { currentUser, logout } = useAuth()
    const { logout } = useAuth()

    const handlelogOut = () => {
        // logout(currentUser)
        logout()
        navigate("/login")
    }

    const navigation: { name: string; link: string }[] = [
        { name: "Dashboard", link: "" },
        { name: "Orders", link: "orders" },
        { name: "cartpage", link: "cart" },
        { name: "checkout", link: "checkout" },
    ]
    return (
        <header className="bg-white shadow-md  top-0 left-0 w-full mx-auto">
            <div className="max-w-screen-2xl mx-auto px-4 py-4 sm:px-12 flex justify-between items-center">
                {/* Logo */}
                <Link to="/">
                    <h1 className="text-xl font-bold">Book Store</h1>
                </Link>

                {/* Desktop Links */}
                <nav className="hidden md:flex ">
                    <ul className="md: flex space-x-6" >
                        {navigation.map((item) => (
                            <Link to={`/${item.link}`} key={item.name} className="text-gray-700 hover:text-blue-500 capitalize" >
                                {item.name}
                            </Link>
                        ))}
                    </ul>

                    <Link to="/cart">
                        <div className="flex items-center justify-center gap-2 text-center">
                            <FaShoppingCart />
                            <span>Cart ({cartItems.length})</span>
                        </div>
                    </Link>

                    <button onClick={handlelogOut}>
                        <p className="text-red-700 cursor-pointer">Logout</p>
                    </button>


                </nav>

                {/* Mobile Toggle Button */}
                <div className="md:hidden">
                    {isMenuOpen ? (
                        <FaTimes className="text-2xl cursor-pointer" onClick={toggleMenu} />
                    ) : (
                        <FaBars className="text-2xl cursor-pointer" onClick={toggleMenu} />
                    )}
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white px-4 py-4 shadow-md">
                    <nav className="flex flex-col space-y-4">
                        {navigation.map((item) => (
                            <a href={`/${item.link}`} key={item.name} className="mx-auto">
                                {item.name}
                            </a>
                        ))}

                        <Link to="/cart">
                            <div className="flex items-center justify-center gap-2 text-center mx-4">
                                <FaShoppingCart className="text-2xl " />
                                <span className="text-sm font-semibold ">{cartItems.length}</span>
                            </div>
                        </Link>

                    </nav>
                </div>
            )}
        </header>
    )
}

export default Navbar;
