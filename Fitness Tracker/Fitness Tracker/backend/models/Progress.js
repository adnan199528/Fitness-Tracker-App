const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  weight: { type: Number },
  waist: { type: Number },
  chest: { type: Number },
  runtime: { type: Number },
  liftMax: { type: Number },
  date: {
    type: Date,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model("Progress", progressSchema);

// updated code 
// const mongoose = require("mongoose");

// const progressSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User", // user-models.js me jo user banaya hai usko refer karega
//       required: true,
//     },
//     date: {
//       type: Date,
//       default: Date.now,
//     },
//     weight: {
//       type: Number,
//       required: false, // optional
//     },
//     height: {
//       type: Number,
//       required: false,
//     },
//     notes: {
//       type: String,
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Progress", progressSchema);