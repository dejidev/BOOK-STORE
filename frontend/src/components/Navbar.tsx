import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);


    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
        console.log(isMenuOpen);

    }

    // type NavigationItem = { name: string, href: string }

    // type Navigation = NavigationItem[]


    const navigation: { name: string; href: string }[] = [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Orders", href: "/dashboard" },
        { name: "Cart Page", href: "/dashboard" },
        { name: "Check Out", href: "/dashboard" },
    ]
    return (
        <header className="bg-white shadow-md  top-0 left-0 w-full mx-auto">
            <div className="max-w-screen-2xl mx-auto px-4 py-4 sm:px-12 flex justify-between items-center">
                {/* Logo */}
                <h1 className="text-xl font-bold">Book Store</h1>

                {/* Desktop Links */}
                <nav className="hidden md:flex ">
                    <ul className="md: flex space-x-6" >
                        {navigation.map((item) => (
                            <li key={item.name}>
                                {item.name}
                            </li>
                        ))}
                    </ul>

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
                                <a href={item.href} key={item.name} className="mx-auto">
                                    {item.name}
                                </a>
                            ))}
                    </nav>
                </div>
            )}
        </header>
    )
}

export default Navbar;
