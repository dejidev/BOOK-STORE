import './App.css'
import { Outlet } from "react-router-dom"
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <div>
        <Navbar/>

        <main className='max-w-screen-2xl m-4'>
          <Outlet />
        </main>
      </div>


    </>
  )
}

export default App
