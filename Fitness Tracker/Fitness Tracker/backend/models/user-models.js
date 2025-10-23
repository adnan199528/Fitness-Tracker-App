// models/user-models.js
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// Preferences sub-schema
const preferencesSchema = new mongoose.Schema({
  units: { type: String, enum: ["kg/cm", "lb/inch"], default: "kg/cm" },
  theme: { type: String, enum: ["light", "dark"], default: "light" },
  notifications: { type: Boolean, default: true },
}, { _id: false });

// Exercise sub-schema
const exerciseSchema = new mongoose.Schema({
  exerciseName: String,
  sets: Number,
  reps: Number,
  weight: Number,
  duration: Number, // seconds
}, { _id: false });

// Day workout sub-schema
const dayWorkoutSchema = new mongoose.Schema({
  day: String, // e.g., Monday
  exercises: { type: [exerciseSchema], default: () => [] }
}, { _id: false });

// Weekly workout (for a given week number)
const weekWorkoutSchema = new mongoose.Schema({
  week: Number,
  workouts: { type: [dayWorkoutSchema], default: () => [] }
}, { _id: false });

// Meal item subschema
const mealItemSchema = new mongoose.Schema({
  day: String,
  mealType: String, // Breakfast, Lunch, Dinner, Snack
  menu: String
}, { _id: false });

// Progress item
const progressSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  weight: Number,
  bodyFatPercentage: Number,
  workoutsCompleted: { type: Number, default: 0 },
  caloriesBurned: { type: Number, default: 0 }
}, { _id: false });

// User schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  username: { type: String, required: true, unique: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  profilePicture: { type: String, default: "" },

  // plan duration chosen by user
  plan: { type: String, enum: ["1 Week", "1 Month", "1 Year"], default: "1 Month" },

  // detailed plan overview (month/weeks)
  planDetails: {
    type: [{
      month: String,
      weeks: [{
        week: Number,
        focus: String
      }]
    }],
    default: () => ([
      {
        month: "September",
        weeks: [
          { week: 1, focus: "Chest & Back" },
          { week: 2, focus: "Legs & Core" },
          { week: 3, focus: "Full Body" },
          { week: 4, focus: "Strength & Endurance" }
        ]
      }
    ])
  },

  // workouts stored per week (array of weekWorkoutSchema)
  workouts: { type: [weekWorkoutSchema], default: () => ([
    // default week example (week 1)
    {
      week: 1,
      workouts: [
        {
          day: "Monday",
          exercises: [
            { exerciseName: "Bench Press", sets: 4, reps: 12, weight: 50 },
            { exerciseName: "Push-ups", sets: 3, reps: 15, weight: 0 }
          ]
        },
        {
          day: "Wednesday",
          exercises: [
            { exerciseName: "Squats", sets: 4, reps: 12, weight: 60 },
            { exerciseName: "Plank", sets: 3, duration: 60 }
          ]
        }
      ]
    }
  ]) },

  // meals per week
  meals: { type: [mealItemSchema], default: () => ([
    { day: "Monday", mealType: "Breakfast", menu: "Oats, Eggs, Milk" },
    { day: "Monday", mealType: "Lunch", menu: "Grilled Chicken, Brown Rice, Salad" },
    { day: "Monday", mealType: "Dinner", menu: "Salmon, Vegetables" }
  ]) },

  // progress array
  progress: { type: [progressSchema], default: () => ([
    { date: new Date(), weight: 70, bodyFatPercentage: 18, workoutsCompleted: 0, caloriesBurned: 0 }
  ]) },

  preferences: { type: preferencesSchema, default: () => ({}) }
}, { timestamps: true });

// JWT secret (fallback if env not set)
const JWT_SECRET = process.env.JWT_SECRET || "fitness_secret";

// Generate token
userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id.toString(), email: this.email }, JWT_SECRET, { expiresIn: "30d" });
};

// Hide password in responses
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model("User", userSchema);
