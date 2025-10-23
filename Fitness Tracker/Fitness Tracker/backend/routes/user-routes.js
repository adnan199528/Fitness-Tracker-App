const express = require("express");
const router = express.Router();

const userMiddleware = require("../middleware/user-middleware");
const upload = require("../middleware/upload-middleware");
const {
    home,
    register,
    login,
    me,
    getUserProfile,
    updateProfile,
    updatePreferences,
    addWorkout,
    getWorkouts,
    addMeals,
    getMeals,
    addProgress,
    getProgress,
    uploadProfilePicture,
} = require("../controllers/user-controller");


// Public
router.get("/", home);
router.post("/register", register);
router.post("/login", login);

// Protected
router.get("/me", userMiddleware, me);
router.get("/:id", userMiddleware, getUserProfile);
router.put("/:id", userMiddleware, updateProfile);
router.put("/:id/preferences", userMiddleware, updatePreferences);
router.post("/profile-picture", userMiddleware, upload.single('file'), uploadProfilePicture);

// Workouts (protected)
router.post("/workouts", userMiddleware, addWorkout);
router.get("/workouts", userMiddleware, getWorkouts);

// Meals
router.post("/meals", userMiddleware, addMeals);
router.get("/meals", userMiddleware, getMeals);

// Progress
router.post("/progress", userMiddleware, addProgress);
router.get("/progress", userMiddleware, getProgress);

module.exports = router;