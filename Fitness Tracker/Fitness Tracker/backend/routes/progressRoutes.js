// const express = require("express");
// const router = express.Router();
// const {
//   addProgress,
//   getProgress,
//   updateProgress,
//   deleteProgress,
// } = require("../controllers/progressController");

// // Routes
// router.post("/", addProgress);       // Add progress
// router.get("/", getProgress);        // Get all progress
// router.put("/:id", updateProgress);  // Update progress
// router.delete("/:id", deleteProgress); // Delete progress

// module.exports = router;

// updated code 
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  addProgress,
  getProgress,
  updateProgress,
  deleteProgress,
} = require("../controllers/progressController");

// ✅ Create progress
router.post("/", auth, addProgress);

// ✅ Get all progress for logged-in user
router.get("/", auth, getProgress);

// ✅ Update progress by id
router.patch("/:id", auth, updateProgress);

// ✅ Delete progress by id
router.delete("/:id", auth, deleteProgress);

module.exports = router;