require('dotenv').config()
const jwt = require("jsonwebtoken");
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.json({ error: "no token provided" })

    const token = authHeader.split(" ")[1]
    if (!token) return res.json({ error: "Token missing" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        next()
    } catch (err) {
        res.status(401).json({ error: "Invalid or expired token" });
    }
}

module.exports = authMiddleware