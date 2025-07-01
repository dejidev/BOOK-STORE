const express = require('express')
const app = express()
require('dotenv').config()
const cors = require("cors")


const port = process.env.PORT || 5000
const mongoose = require('mongoose');

//Middleware
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"]
}))
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Or the appropriate origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Or the methods you need
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Or the headers you need
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // <--- Add this line
    next();
});


const bookRoutes = require("./src/books/book.route.js")
const orderRoutes = require("./src/order/order.routes.js")

app.use("/api/books", bookRoutes)
app.use("/api/orders", orderRoutes)

async function main() {
    await mongoose.connect(process.env.DB_URI);
    app.use("/", (req, res) => {
        res.send("Books Store here. . .")
    })
}


main()
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(err => console.log(err));


app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
