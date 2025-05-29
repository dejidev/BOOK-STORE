import { useEffect, useState } from "react";
import BookCard from "./BookCard";


const TopSeller = () => {
    const categories: string[] = ["Choose a genre", "Business", "Fiction", "Horror", "Adventure"]
    type Book = {
        _id: number,
        title: string,
        description: string,
        category: string,
        trending: boolean,
        coverImage: string,
        oldPrice: number,
        newPrice: number
    }
    const [books, setBooks] = useState<Book[]>([])
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre")



    useEffect(() => {
        fetch("/books.json")
            .then(res => res.json())
            .then((data) => setBooks(data))
            .catch(err => console.error("Failed to load books:", err));
    }, [])

    console.log(books);
    console.log(selectedCategory);


    const filteredBooks = selectedCategory === "Choose a genre" ? books : books.filter(book => book.category === selectedCategory.toLowerCase())
    console.log(filteredBooks);


    return (
        <div>
            <h2 className="text-2xl font-semibold my-6">TOP SELLER</h2>
            {/* Category filtering */}
            <div className="mb-8 flex items-center">
                <select
                    name="category"
                    id="category"
                    className="px-4 py-2 border border-red-300 bg-[#EAEAEA] text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-150"
                    onChange={e => setSelectedCategory(e.target.value)}                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto">
                {
                    filteredBooks.map((book, index) =>
                        <BookCard book={book} index={index} />
                    )}
            </div>


        </div>
    )
}

export default TopSeller;
