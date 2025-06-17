// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from "../src/routers/route.tsx"
import { store } from './redux/store.ts'
import { Provider } from 'react-redux'
import 'sweetalert2/dist/sweetalert2.js';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
