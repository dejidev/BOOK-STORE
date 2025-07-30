import React from 'react'
import { useOutletContext } from 'react-router-dom';

type AdminData = {
    totalOrders: number;
    totalSales: number;
    totalBooks: number;
    trendingBooks: number;
    monthlySales: any[];
};


const DashboardHome = () => {
    const data = useOutletContext<AdminData>();
    return (
        <div>
            <div className="p-4">
                <h1 className="text-xl font-semibold mb-4">Admin Dashboard</h1>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(data, null, 2)}
                </pre>
            </div>
        </div>
    )
}

export default DashboardHome
