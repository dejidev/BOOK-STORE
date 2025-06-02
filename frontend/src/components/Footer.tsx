const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 px-4 mt-16">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Column 1: About */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Bookstore</h2>
                    <p className="text-gray-400 text-sm">
                        Discover a world of books from all genres. Read, learn, and grow with us.
                    </p>
                </div>

                {/* Column 2: Navigation */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Quick Links</h2>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li><a href="/about" className="hover:text-white">About Us</a></li>
                        <li><a href="/contact" className="hover:text-white">Contact</a></li>
                        <li><a href="/faq" className="hover:text-white">FAQ</a></li>
                        <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
                    </ul>
                </div>

                {/* Column 3: Subscription */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">Subscribe to our newsletter</h2>
                    <form className="flex flex-col sm:flex-row items-center gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        <button
                            type="submit"
                            className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm text-gray-500">
                © {new Date().getFullYear()} Bookstore. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
  