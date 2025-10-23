// // 
// updated code 
const Progress = require("../models/Progress");

// ✅ Add new progress
const addProgress = async (req, res) => {
  const { weight, waist, chest, runtime, liftMax } = req.body;

  let emptyFields = [];

  if (!weight) {
    emptyFields.push("weight");
  }
  if (!waist) {
    emptyFields.push("waist");
  }
  if (!chest) {
    emptyFields.push("chest");
  }
  if (!runtime) {
    emptyFields.push("runtime");
  }
  if (!liftMax) {
    emptyFields.push("liftMax");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const progress = new Progress({
      ...req.body,
      userId: req.user._id, // token se aa raha hai
    });

    await progress.save();
    res.status(201).json(progress);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get all progress (only logged-in user ka data)
const getProgress = async (req, res) => {
  try {
    const progress = await Progress.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(progress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update progress
const updateProgress = async (req, res) => {
  try {
    const updated = await Progress.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id }, // sirf apna hi update kare
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: "Progress not found" });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete progress
const deleteProgress = async (req, res) => {
  try {
    const deleted = await Progress.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deleted) return res.status(404).json({ error: "Progress not found" });

    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addProgress, getProgress, updateProgress, deleteProgress };