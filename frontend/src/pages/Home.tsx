// import { useEffect, useState } from "react"
import Banner from "../components/Banner"
import TopSeller from "../components/TopSeller"
import Recommended from "../components/Recommended"
import News from "../components/News"
import Footer from "../components/Footer"

const Home = () => {

  return (
    <div>
      <Banner />
      <TopSeller />
      <Recommended />
      <News />
      <Footer />
    </div>
  )
}

export default Home
