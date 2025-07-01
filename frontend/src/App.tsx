import './App.css'
import { Outlet } from "react-router-dom"
import Navbar from './components/Navbar'
import { AuthProvider } from './context/AuthContext'

function App() {


  return (
    <>

      <AuthProvider>
        <div className=''>
          <Navbar />

          <main className='max-w-screen-2xl m-4 px-4 sm:px-8 md:px-16 '>
            <Outlet />
          </main>
          
        </div>
      </AuthProvider>

    </>
  )
}

export default App
