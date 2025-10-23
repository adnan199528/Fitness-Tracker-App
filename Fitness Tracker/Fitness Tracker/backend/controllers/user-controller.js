const bcrypt = require("bcryptjs");
const User = require("../models/user-models");
const Progress = require("../models/Progress");

// Helper to pick only basic info
const pickBasic = (u) => ({
  _id: u._id,
  name: u.name,
  username: u.username,
  email: u.email,
  profilePicture: u.profilePicture,
});

// Home
const home = (req, res) =>
  res.json({ message: "Welcome to Fitness Tracker API 🚀" });

// Helper: returns default structures per plan (simple example)
function getDefaultsForPlan(plan) {
  if (plan === "1 Week") {
    return {
      plan: "1 Week",
      planDetails: [
        { month: "WeekStart", weeks: [{ week: 1, focus: "Full Body" }] },
      ],
    };
  }
  if (plan === "1 Year") {
    return {
      plan: "1 Year",
      planDetails: [{ month: "YearStart", weeks: [] }],
    };
  }
  // default 1 Month
  return { plan: "1 Month" };
}

// Register
const register = async (req, res) => {
  try {
    const { name, username, email, password, plan } = req.body;
    if (!name || !username || !email || !password) {
      return res.status(400).json({
        error: "All fields (name, username, email, password) are required",
      });
    }

    const exists = await User.findOne({ $or: [{ email }, { username }] });
    if (exists)
      return res
        .status(400)
        .json({ error: "User with email or username already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const defaults = getDefaultsForPlan(plan);

    const user = new User({
      name,
      username,
      email,
      password: hashed,
      plan: defaults.plan || "1 Month",
      ...(defaults.planDetails ? { planDetails: defaults.planDetails } : {}),
    });

    await user.save();
    const token = user.generateToken();

    return res.status(201).json({
      message: "User registered",
      token,
      user: pickBasic(user),
    });
  } catch (err) {
    console.error("Register error:", err.stack);
    return res
      .status(500)
      .json({ error: "Server error", details: err.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid credentials" });

    const token = user.generateToken();

    return res.json({
      message: "Login successful",
      token,
      user: pickBasic(user),
    });
  } catch (err) {
    console.error("Login error:", err.stack);
    return res
      .status(500)
      .json({ error: "Server error", details: err.message });
  }
};

// Me
const me = async (req, res) => {
  try {
    return res.json(pickBasic(req.user));
  } catch (err) {
    console.error("Me error:", err.stack);
    return res
      .status(500)
      .json({ error: "Server error", details: err.message });
  }
};

// Get user by ID
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error("Get user profile error:", err.stack);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Update profile
const updateProfile = async (req, res) => {
    try {
      const updates = { ...req.body };
      
      if (req.user.id !== req.params.id) {
        return res.status(403).json({ error: "Forbidden: You can only update your own profile." });
      }

      if (updates.password) {
        updates.password = await bcrypt.hash(updates.password, 10);
      }
  
      if (updates.email) {
        const exists = await User.findOne({
          email: updates.email,
          _id: { $ne: req.params.id },
        });
        if (exists) return res.status(400).json({ error: "Email already in use" });
      }
      if (updates.username) {
        const existsU = await User.findOne({
          username: updates.username,
          _id: { $ne: req.params.id },
        });
        if (existsU)
          return res.status(400).json({ error: "Username already in use" });
      }
  
      const user = await User.findByIdAndUpdate(req.params.id, updates, {
        new: true,
      }).select("-password");

      if (!user) return res.status(404).json({ error: "User not found" });

      res.json({ message: "Profile updated", user: pickBasic(user) });
    } catch (err) {
      console.error("Update profile error:", err.stack);
      res.status(500).json({ error: "Server error", details: err.message });
    }
};

// Update preferences
const updatePreferences = async (req, res) => {
  try {
    const { units, theme, notifications } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        "preferences.units": units,
        "preferences.theme": theme,
        "preferences.notifications": notifications,
      },
      { new: true }
    ).select("preferences");

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({
      message: "Preferences updated",
      preferences: user.preferences,
    });
  } catch (err) {
    console.error("Update preferences error:", err.stack);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Workouts
const addWorkout = async (req, res) => {
  try {
    const { week, workouts } = req.body;
    if (!week || !Array.isArray(workouts))
      return res.status(400).json({ error: "week and workouts[] required" });

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ error: "User not found" });

    const idx = user.workouts.findIndex((w) => w.week === Number(week));
    if (idx >= 0) {
      user.workouts[idx].workouts = workouts;
    } else {
      user.workouts.push({ week: Number(week), workouts });
    }

    await user.save();
    res.json({ message: "Workouts saved", workouts: user.workouts });
  } catch (err) {
    console.error("Add workout error:", err.stack);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

const getWorkouts = async (req, res) => {
  try {
    const weekQ = req.query.week ? Number(req.query.week) : null;
    const user = await User.findById(req.user.id).select("workouts");
    if (!user) return res.status(404).json({ error: "User not found" });
    if (weekQ) {
      const wk = user.workouts.find((w) => w.week === weekQ);
      return res.json(wk || { message: "No workouts for this week" });
    }
    res.json(user.workouts);
  } catch (err) {
    console.error("Get workouts error:", err.stack);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Meals
const addMeals = async (req, res) => {
  try {
    const { meals } = req.body;
    if (!Array.isArray(meals))
      return res.status(400).json({ error: "meals[] required" });

    const user = await User.findById(req.user.id);
    user.meals = user.meals.concat(meals);
    await user.save();
    res.json({ message: "Meals added", meals: user.meals });
  } catch (err) {
    console.error("Add meals error:", err.stack);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

const getMeals = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("meals");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.meals);
  } catch (err) {
    console.error("Get meals error:", err.stack);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

// Progress
const addProgress = async (req, res) => {
  try {
    const { weight, bodyFatPercentage, measurements } = req.body;

    const newProgress = new Progress({
      user: req.user.id,
      weight,
      bodyFatPercentage,
      measurements,
    });

    await newProgress.save();
    res.status(201).json(newProgress);
  } catch (error) {
    console.error("Add progress error:", error.stack);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ user: req.user.id });
    res.json(progress);
  } catch (error) {
    console.error("Get progress error:", error.stack);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Profile Picture Upload
const uploadProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // req.file.path contains the Cloudinary URL
    user.profilePicture = req.file.path;
    await user.save();

    // Send back the updated user object
    const updatedUser = await User.findById(req.user.id);

    res.json({
      message: "Profile picture uploaded successfully",
      user: pickBasic(updatedUser),
    });
  } catch (err) {
    console.error("Upload error:", err.stack);
    res.status(500).json({ error: "Server error", details: err.message });
  }
};

module.exports = {
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
};