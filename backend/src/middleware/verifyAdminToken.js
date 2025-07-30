const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyAdminToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    // Check if authorization header exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access Denied, No token was provided" });
    }

    const token = authHeader.split(" ")[1];

    console.log(token)

    // Verify token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid credentials" });
        }

        req.user = decoded; // Optional: store decoded user info
        next(); // Very important!
    });
};

module.exports = verifyAdminToken;