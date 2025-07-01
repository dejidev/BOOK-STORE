// instead of "react-router"
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CartPage from "../pages/CartPage";
import CheckOut from "../pages/CheckOut";
import SingleBook from "../redux/features/cart/Singlebook";
// import Cart from "../pages/cart"
import PrivateRoute from "./privateroute"

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/orders",
                element: <div>Orders</div>
            },
            {
                path: "/about",
                element: <div>About</div>
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/cart",
                element: <CartPage />
            },
            {
                path: "/checkout",
                element: <PrivateRoute><CheckOut /></PrivateRoute>
            },
            {
                path: "/books/:id", // ← plural!
                element: <SingleBook />
            }

        ]
    },
]);


export default router;

