import './App.css'
import { Outlet } from "react-router-dom"
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <div className=''>
        <Navbar />

        <main className='max-w-screen-2xl m-4 px-4 sm:px-8 md:px-16 '>
          <Outlet />
        </main>
      </div>


    </>
  )
}

export default App
