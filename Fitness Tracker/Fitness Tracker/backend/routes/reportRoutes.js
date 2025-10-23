const express = require("express");
const router = express.Router();
const { generatePDFReport, generateCSVReport } = require("../controllers/reportController");
const userMiddleware = require("../middleware/user-middleware");

// GET request routes for generating reports
router.get("/generate-pdf-report", userMiddleware, generatePDFReport);
router.get("/generate-csv-report", userMiddleware, generateCSVReport);

module.exports = router;