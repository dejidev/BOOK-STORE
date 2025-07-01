import { useState } from "react";
import BookCard from "./BookCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
// import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';
import { useFetchAllBookQuery } from "../redux/features/books/booksApi";




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
    // const [books, setBooks] = useState<Book[]>([])

    const [selectedCategory, setSelectedCategory] = useState("Choose a genre")

    const { data } = useFetchAllBookQuery();
    const books: Book[] = data ?? [];


    // console.log("API data response:", data);
    // console.log(books)

    // useEffect(() => {
    //     fetch("/books.json")
    //         .then(res => res.json())
    //         .then((data) => setBooks(data))
    //         .catch(err => console.error("Failed to load books:", err));
    // }, [])

    // console.log(books);
    // console.log(selectedCategory);


    // const filteredBooks = selectedCategory === "Choose a genre" ? books : books.filter(book => book.category === selectedCategory.toLowerCase())
    const filteredBooks = selectedCategory === "Choose a genre"
        ? books
        : books.filter(book =>
            book.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

    // console.log(filteredBooks);


    return (
        <div>
            <h2 className="text-2xl font-semibold my-6">TOP SELLER</h2>
            {/* Category filtering */}
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

            <Swiper
                slidesPerView={1}
                spaceBetween={10}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 40,
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 50,
                    },
                    1180: {
                        slidesPerView: 3,
                        spaceBetween: 50,
                    }
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >


                {
                    filteredBooks.length > 0 && filteredBooks.map((book, index) =>
                        <SwiperSlide >
                            <BookCard book={book} key={index} />
                        </SwiperSlide>
                    )}
            </Swiper>





        </div>
    )
}

export default TopSeller;



