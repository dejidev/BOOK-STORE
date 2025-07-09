import { useGetOrderByEmailQuery } from "../redux/features/orders/ordersApi";
import { useAuth } from "../context/AuthContext";


const Orders = () => {
    const { currentUser } = useAuth()
    console.log("Current User:", currentUser.email);

    const { data: orders = [] } = useGetOrderByEmailQuery(currentUser?.email as string || " ")

    console.log(orders);

    return (
        <div className="">
            {orders.length === 0 ? (
                <div>No orders found</div>
            ) : (
                <div>
                    {orders.map((order: any, index: number) => (
                        <div key={order._id} className="text-gray-700 text-sm p-4 mb-4">
                            <p>#{index}</p>
                            <h2 className="text-xl font-bold text-black">Order ID: {order._id}</h2>
                            <p>Email: {order.email}</p>
                            <p>Total Price: ${order.totalPrice}</p>
                            <p>
                                Address:{" "}
                                {`${order.address.country}, ${order.address.state}, ${order.address.city}, ${order.address.zipCode}`}
                            </p>
                            <p>Phone: {order.phone}</p>
                            <h3 className="font-semibold">Products:</h3>
                            <ul>
                                {order.productId.map((product: any) => (
                                    <li key={product._id} className="ml-4">
                                        {product}
                                    </li>
                                ))} 
                            </ul>
                        </div>
                    ))}
                </div>
            )}
        </div>

    )
}


export default Orders;