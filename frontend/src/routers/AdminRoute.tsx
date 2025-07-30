// import React from 'react'
// import { Navigate, Outlet } from "react-router-dom"

// const AdminRoute = ({ children }: { children?: React.ReactNode }) => {
//     const token = localStorage.getItem("token");

//     if (!token) {
//         return <Navigate to="/admin" />
//     }

//     return children ? <>{children}</> : <Outlet />
// }

// export default AdminRoute;



import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface AdminRouteProps {
    children?: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/admin" replace />;
    }

    // If used with children (wrapped in JSX), render them
    // Otherwise, render the nested route via Outlet
    return <>{children ? children : <Outlet />}</>;
};

export default AdminRoute;

