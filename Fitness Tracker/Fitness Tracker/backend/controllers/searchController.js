const Workout = require("../models/workout-model");
const Meal = require("../models/Mealmodel");
const Progress = require("../models/Progress");
const User = require("../models/user-models");

const search = async (req, res) => {
  try {
    const { 
      query, type, category, mealType, role, isActive,
      dateFrom, dateTo, minWeight, maxWeight, minBodyFat, maxBodyFat, minMuscleMass, maxMuscleMass
    } = req.query;

    let filter = {};
    let results = [];

    switch (type) {
      // 🔹 Workout Search
      case "workout":
        filter = {
          ...(query && { exerciseName: { $regex: query, $options: "i" } }),
          ...(category && { category }),
        };
        if (dateFrom || dateTo) {
          filter.date = {};
          if (dateFrom) filter.date.$gte = new Date(dateFrom);
          if (dateTo) filter.date.$lte = new Date(dateTo);
        }
        results = await Workout.find(filter);
        break;

      // 🔹 Meal/Nutrition Search
      case "nutrition":
        // filter = {
        //   ...(query && { "foodItems.name": { $regex: query, $options: "i" } }),
        //   ...(mealType && { mealType }),
        // };
          filter = {
          ...(query && { "mealType": { $regex: query, $options: "i" } }),
          ...(mealType && { mealType }),
        };
        if (dateFrom || dateTo) {
          filter.date = {};
          if (dateFrom) filter.date.$gte = new Date(dateFrom);
          if (dateTo) filter.date.$lte = new Date(dateTo);
        }
        results = await Meal.find(filter);
        break;

      // 🔹 Progress Search
      case "progress":
        filter = {};
        if (minWeight || maxWeight) {
          filter.weight = {};
          if (minWeight) filter.weight.$gte = Number(minWeight);
          if (maxWeight) filter.weight.$lte = Number(maxWeight);
        }
        if (minBodyFat || maxBodyFat) {
          filter.bodyFat = {};
          if (minBodyFat) filter.bodyFat.$gte = Number(minBodyFat);
          if (maxBodyFat) filter.bodyFat.$lte = Number(maxBodyFat);
        }
        if (minMuscleMass || maxMuscleMass) {
          filter.muscleMass = {};
          if (minMuscleMass) filter.muscleMass.$gte = Number(minMuscleMass);
          if (maxMuscleMass) filter.muscleMass.$lte = Number(maxMuscleMass);
        }
        if (dateFrom || dateTo) {
          filter.date = {};
          if (dateFrom) filter.date.$gte = new Date(dateFrom);
          if (dateTo) filter.date.$lte = new Date(dateTo);
        }
        results = await Progress.find(filter);
        break;

      // 🔹 User Search
      case "user":
        filter = {
          ...(query && {
            $or: [
              { name: { $regex: query, $options: "i" } },
              { email: { $regex: query, $options: "i" } },
            ],
          }),
          ...(role && { role }),
          ...(isActive !== undefined && { isActive: isActive === "true" }),
        };
        results = await User.find(filter).select("-password");
        break;

      default:
        return res.status(400).json({ success: false, error: "Invalid type parameter" });
    }

    return res.json({
      success: true,
      count: results.length,
      data: results
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = { search };
