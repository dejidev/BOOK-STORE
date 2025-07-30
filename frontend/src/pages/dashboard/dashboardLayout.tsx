import React, { useEffect, useState } from 'react';
import getbaseUrl from '../../utils/baseurl';
import axios from 'axios';
import LoadingSpinner from '../../components/Loading';

import { NavLink, Outlet } from 'react-router-dom';
import { FaBook, FaPlus, FaEdit, FaHome, FaRegEdit } from 'react-icons/fa';


const DashboardLayout = () => {
    const [loading, setLoading] = useState<boolean>(true); 
    const [data, setData] = useState<any>({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${getbaseUrl()}/api/admin`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                });
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setLoading(false);
            }
        };

        fetchData(); // ✅ You forgot to call the function!
    }, []);

    if (loading) return <LoadingSpinner />;

    return (
        <div className="flex min-h-screen bg-blue-50">
            {/* Sidebar */}
            <aside className="w-64 bg-blue-400 text-white flex flex-col px-4 py-6 shadow-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Panel</h2>
                <nav className="flex flex-col space-y-3">
                    <NavItem to="/dashboard" label="Dashboard Home" icon={<FaHome />} />
                    <NavItem to="/dashboard/add-new-book" label="Add New Book" icon={<FaPlus />} />
                    {/* <NavItem to="/dashboard/edit-book/:id" label="Edit Book" icon={<FaRegEdit />} /> */}
                    <NavItem to="/dashboard/manage-books" label="Manage Books" icon={<FaBook />} />
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <Outlet context={data} />
            </main>
        </div>
    );
};






// Sidebar Item Component
const NavItem = ({ to, label, icon }: { to: string; label: string; icon: React.ReactNode }) => {
    return (
        <NavLink
            to={to}
            end
            className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-md transition ${isActive ? 'bg-white text-blue-400 font-semibold' : 'hover:bg-blue-500'
                }`
            }
        >
            {icon}
            <span>{label}</span>
        </NavLink>
    );
};






export default DashboardLayout;






