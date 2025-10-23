const mongoose = require("mongoose");

const foodItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true },
  carbs: { type: Number, required: true },
  fats: { type: Number, required: true },
});

const mealSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  mealType: { 
    type: String, 
    enum: ["Breakfast", "Lunch", "Dinner", "Snack"], 
    required: true 
  },
  foodItems: [foodItemSchema]
}, { timestamps: true });

module.exports = mongoose.model("Meal", mealSchema);

// updated code 
// const mongoose = require("mongoose");

// const mealSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   calories: {
//     type: Number,
//     required: true,
//   },
//   protein: {
//     type: Number,
//     default: 0,
//   },
//   carbs: {
//     type: Number,
//     default: 0,
//   },
//   fats: {
//     type: Number,
//     default: 0,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Meal", mealSchema);