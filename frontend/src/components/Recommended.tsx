import { useState } from 'react'
import BookCard from './BookCard'
import { useFetchAllBookQuery } from '../redux/features/books/booksApi'

const Recommended = () => {
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
    // const [books, setBooks] = useState<Book[]>([])
    const [selectedCategory, setSelectedCategory] = useState("Choose a genre")

    const { data } = useFetchAllBookQuery();
    const books: Book[] = data ?? [];


    // useEffect(() => {
    //     fetch("/books.json")
    //         .then(res => res.json())
    //         .then((data) => setBooks(data))
    //         .catch(err => console.error("Failed to load books:", err));
    // }, [])



    const filteredBooks = selectedCategory === "Choose a genre" ? books : books.filter(book => book.category === selectedCategory.toLowerCase())
    return (
        <div>
            <h2 className="text-2xl font-semibold my-6">RECOMMENDED FOR YOU</h2>
            <div className="mb-8 flex items-center">
                <select
                    name="category"
                    id="category"
                    className="px-4 py-2 border-[1] border-gray-300 bg-[#EAEAEA]
                     text-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-[0.2] transition duration-150 active:border-[1]"
                    onChange={e => setSelectedCategory(e.target.value)}                >
                    {categories.map((category, index) => (
                        <option key={index} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mx-auto"
            >            {
                    filteredBooks.length > 0 && filteredBooks.map((book, index) =>
                        <BookCard book={book} key={index} />
                    )}</div>

        </div>
    )
}

export default Recommended
