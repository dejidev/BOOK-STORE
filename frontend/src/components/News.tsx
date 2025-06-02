import React from 'react';
import { Link } from 'react-router-dom';

import news1 from "../assets/news/news-1.png"
import news2 from "../assets/news/news-2.png"
import news3 from "../assets/news/news-3.png"
import news4 from "../assets/news/news-4.png"

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
// import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper/modules';




type News = {
    "id": number,
    "title": string,
    "description": string,
    "image": string
}

const news: News[] = [
    {
        "id": 1,
        "title": "Global Climate Summit Calls for Urgent Action",
        "description": "World leaders gather at the Global Climate Summit to discuss urgent strategies to combat climate change, focusing on reducing carbon emissions and fostering renewable energy solutions.",
        "image": news1
    },
    {
        "id": 2,
        "title": "Breakthrough in AI Technology Announced",
        "description": "A major breakthrough in artificial intelligence has been announced by researchers, with new advancements promising to revolutionize industries from healthcare to finance.",
        "image": news2
    },
    {
        "id": 3,
        "title": "New Space Mission Aims to Explore Distant Galaxies",
        "description": "NASA has unveiled plans for a new space mission that will aim to explore distant galaxies, with hopes of uncovering insights into the origins of the universe.",
        "image": news3
    },
    {
        "id": 4,
        "title": "Stock Markets Reach Record Highs Amid Economic Recovery",
        "description": "Global stock markets have reached record highs as signs of economic recovery continue to emerge following the challenges posed by the global pandemic.",
        "image": news4
    },
    {
        "id": 5,
        "title": "Innovative New Smartphone Released by Leading Tech Company",
        "description": "A leading tech company has released its latest smartphone model, featuring cutting-edge technology, improved battery life, and a sleek new design.",
        "image": news2
    }
]


const News = () => {
    return (
        <div>
            <h2 className="text-2xl font-semibold my-6">NEWS</h2>
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
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
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper"
            >
                {
                    news.map((item, index) => (
                        <SwiperSlide  key={index}>
                            <div className='flex flex-col sm:flex-row items-center sm:justify-between gap-12'>
                                <div className='py-4 flex flex-col item-start sm:w-[70%]'>
                                    <Link to="/">
                                        <h3 className='text-lg font-medium hover:text-blue-500 mb-4 ' >{item.title}</h3>

                                    </Link>
                                    <div className='w-4 h-[1px] bg-yellow-400'></div>
                                    <p className='text-sm text-gray-600'>
                                        {item.description}
                                    </p>
                                </div>

                                <div>
                                    <img src={item.image} alt={item.image} className='w-full object-cover' />
                                </div>
                            </div>
                        </SwiperSlide>

                    ))
                }


            </Swiper>

        </div>
    )
}

export default News
