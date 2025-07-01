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


module.exports = {
    createOrder
}