const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET_KEY


const verifyAdminToken = (req, res, next) => {
    const tokekn = req.header["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ messagge: "Access Denied, No token was provided" })
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid credentials" })
        }
    })
}



module.exports = verifyAdminToken;