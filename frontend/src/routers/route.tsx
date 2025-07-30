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
import ThankYou from "../pages/ThankYou";
import Orders from "../pages/Orders";
import AdminRoute from "./AdminRoute";
import AdminLogin from "../components/AdminLogin";
import DashboardLayout from "../pages/dashboard/dashboardLayout";
import AddNewBook from "../pages/dashboard/AddNewBook";
import ManageBook from "../pages/dashboard/ManageBook";
import EditBook from "../pages/dashboard/EditBook";
import DashboardHome from "../pages/dashboard/DashboardHome";

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
            },
            {
                path: "/thank-you", // ← plural!
                element: <ThankYou />
            },
            {
                path: "/orders",
                element: <PrivateRoute><Orders /></PrivateRoute>
            }

        ]
    },
    {
        path: "/admin",
        element: <AdminLogin />
    },
    {
        path: "/dashboard",
        element: (
            <AdminRoute>
                <DashboardLayout />
            </AdminRoute>
        ),
        children: [
            {
                path: "",
                element: <DashboardHome /> // or just <div>Dashboard Home</div>
            },
            {
                path: "add-new-book",
                element: <AddNewBook />
            },
            {
                path: "edit-book/:id",
                element: <EditBook />
            },
            {
                path: "manage-books",
                element: <ManageBook />
            }
        ]
    }


]);


export default router;