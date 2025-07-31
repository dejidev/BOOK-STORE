// const express = require('express')
// const app = express()
// const serverless = require("serverless-http");
// require('dotenv').config()



// const cors = require("cors")


// const port = process.env.PORT || 5000
// const mongoose = require('mongoose');

// //Middleware
// app.use(express.json());



// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }));
// // app.use(cors({
// //     origin: ["http://localhost:5173"]
// // }))
// // app.use((req, res, next) => {
// //     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Or the appropriate origin
// //     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Or the methods you need
// //     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Or the headers you need
// //     res.setHeader('Access-Control-Allow-Credentials', 'true'); // <--- Add this line
// //     next();
// // });


// const bookRoutes = require("../src/books/book.route.js")
// const orderRoutes = require("../src/order/order.route.js")
// const userRoutes = require("../src/users/user.route.js")
// const adminRoute = require("../src/stats/admin.stats.js")


// app.use("/api/books", bookRoutes)
// app.use("/api/orders", orderRoutes)
// app.use("/api/auth", userRoutes)
// app.use("/api/admin", adminRoute)


// async function main() {
//     await mongoose.connect(process.env.DB_URI);
//     app.use("/", (req, res) => {
//         res.send("Books Store here. . .")
//     })
// }


// main()
//     .then(() => console.log("MongoDB Connected Successfully"))
//     .catch(err => console.log(err));


// // app.listen(port, () => {
// //     console.log(`App is listening on port ${port}`)
// // })


// app.get("/", (req, res) => {
//     res.send("Book Store API root.");
// });


// // Export for Vercel
// module.exports = serverless(app);




























const express = require('express');
const serverless = require("serverless-http");
const mongoose = require('mongoose');
const cors = require("cors");
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

// DB connect
mongoose.connect(process.env.DB_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Error:", err));

// Routes
app.use("/api/books", require("../src/books/book.route"));
app.use("/api/orders", require("../src/order/order.route"));
app.use("/api/auth", require("../src/users/user.route"));
app.use("/api/admin", require("../src/stats/admin.stats"));

app.get("/", (req, res) => {
    res.send("📚 Book Store API root");
});

// ✅ Local dev server
if (process.env.NODE_ENV !== "production") {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
        console.log(`🚀 Local server listening on port ${port}`);
    });
}

// ✅ Vercel export
module.exports = serverless(app);
