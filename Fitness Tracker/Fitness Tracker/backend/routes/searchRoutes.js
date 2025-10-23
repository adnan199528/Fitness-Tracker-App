const express = require("express");
const { search } = require("../controllers/searchController");
const userMiddleware = require("../middleware/user-middleware");

const router = express.Router();

// Example: /search?type=workout&query=chest
router.get("/", userMiddleware, search);

module.exports = router;
