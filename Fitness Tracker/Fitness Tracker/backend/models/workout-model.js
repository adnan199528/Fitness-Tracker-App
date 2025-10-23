// const mongoose = require('mongoose');

// const workoutSchema = new mongoose.Schema({
//   userId: {
//   type: mongoose.Schema.Types.ObjectId,   // MongoDB ka unique ID
//   ref: 'User',                            // Yeh bata raha hai ki yeh ID User model se linked hai
//   required: true
// },
//   exerciseName: {
//     type: String,
//     required: true,
//   },
//   sets: {
//     type: Number,
//     required: true,
//   },
//   reps: {
//     type: Number,
//     required: true,
//   },
//   weight: {
//     type: Number,
//     default: 0,
//   },
//   category: {
//     type: String,
//     enum: ['Strength', 'Cardio'], // sirf ye do categories allow hongi
//     required: true,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model('Workout', workoutSchema);

// check the update code 
const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  
  exerciseName: {
    type: String,
    required: true,
    trim: true,
  },
  sets: {
    type: Number,
    required: true,
  },
  reps: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;