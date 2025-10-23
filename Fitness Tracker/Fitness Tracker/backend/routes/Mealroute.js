// 
// const express = require("express");
// const router = express.Router();
// const mealController = require("../controllers/Mealcontroller");

// // Routes
// router.post("/", mealController.addMeal);        // ➕ Add
// router.get("/", mealController.getMeals);        // 📖 Get (by userId)
// router.put("/:id", mealController.updateMeal);   // ✏️ Update
// router.delete("/:id", mealController.deleteMeal);// ❌ Delete

// module.exports = router;

// updated code 
const express = require("express");
const router = express.Router();
const userMiddleware = require("../middleware/user-middleware");

const {
  addMeal,
  getMeals,
  updateMeal,
  deleteMeal,
} = require("../controllers/Mealcontroller");

router.post("/", userMiddleware, addMeal);
router.get("/", userMiddleware, getMeals);
router.patch("/:id", userMiddleware, updateMeal);
router.delete("/:id", userMiddleware, deleteMeal);

module.exports = router;