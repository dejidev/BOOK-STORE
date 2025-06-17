const express = require('express')
const app = express()
require('dotenv').config()
const cors = require("cors")


const port = process.env.PORT || 5000
const mongoose = require('mongoose');

//Middleware
app.use(express.json());
// app.use(cors({
//     origin: ["https://localhost:5173"]
// }))



const bookRoutes = require("./src/books/book.route.js")
console.log(bookRoutes.route);
app.use("/api/books", bookRoutes)

async function main() {
    // await mongoose.connect(process.env.DB_URI);
    // app.use("/", (req, res) => {
    //     res.send("Books Store here. . .")
    // })
    app.get("/", (req, res) => {
        console.log("Testing");

    })
}


main()
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(err => console.log(err));


app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
