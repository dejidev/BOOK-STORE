require("dotenv").config();
const express = require("express");
const User = require("./user.model");
const router = express.Router();
const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET_KEY

console.log(User)

router.post("/admin", async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await User.findOne({ username })
        if (!admin) {
            res.status(404).send({ message: "Admin not found" })
        }
        if (admin.password !== admin.password) {
            res.status(401).send({ message: "Invalid password" })
        }

        const token = jwt.sign(
            { id: admin._id, username: admin.username, role: admin.role },
            JWT_SECRET,
            { expiresIn: "2h" }
        )

        return res.status(200).json({
            message: "Authentication successful",
            token: token,
            user: {
                username: admin.username,
                role: admin.role
            }
        })
    } catch (error) {
        console.error("Failed to login as admin", error);
        res.status(401).send({ message: "Failed to login as admin" })
    }
})

module.exports = router;