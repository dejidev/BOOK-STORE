const Order = require("./order.model")

const createOrder = async (req, res) => {
    try {
        const newOrder = new Order(req.body)
        const saveOrder = await newOrder.save();

        res.status(200).json({
            saveOrder
        })

    } catch (error) {
        console.error("Error creating order: ", error);
        res.status(500).json({
            message: "Failed to create an order"
        })
    }
}


const getOrderByEmail = async (req, res) => {
    try {
        const { email } = req.params;
        console.log(email)
        const orders = await Order.find({email}).sort({ createdAt: -1 });
        if (!orders) {
            return res.status(404).json({ message: "Order not found" })
        }
        res.status(200).send(orders)
    } catch (error) {
        console.error("Error fetching order", error)
        res.status(500).json({ message: "Failed to fetch order" })
    }
}


module.exports = {
    createOrder,
    getOrderByEmail
}