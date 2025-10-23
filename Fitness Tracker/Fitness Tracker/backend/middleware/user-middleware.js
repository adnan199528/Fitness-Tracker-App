// middlewares/user-middleware.js
const jwt = require("jsonwebtoken");
const User = require("../models/user-models");

const JWT_SECRET = process.env.JWT_SECRET || "fitness_secret";

const userMiddleware = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ error: "Unauthorized - token not provided" });
    }

    if (token.startsWith("Bearer ")) token = token.slice(7).trim();

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) return res.status(404).json({ error: "User not found" });

    // attach full user (without password)
    req.user = user;
    req.userId = user._id;
    req.token = token;

    next();
  } catch (err) {
    console.error("User middleware error:", err.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = userMiddleware;
