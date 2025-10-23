// const Meal = require("../models/Mealmodel");

// // ➕ Add Meal
// exports.addMeal = async (req, res) => {
//   try {
//     const meal = new Meal(req.body);
//     await meal.save();
//     res.status(201).json({ success: true, data: meal });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

// // 📖 Get All Meals for a User
// exports.getMeals = async (req, res) => {
//   try {
//     const meals = await Meal.find({ userId: req.query.userId }); 
//     res.status(200).json({ success: true, data: meals });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

// // ✏️ Update Meal
// exports.updateMeal = async (req, res) => {
//   try {
//     const meal = await Meal.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!meal) return res.status(404).json({ success: false, message: "Meal not found" });
//     res.status(200).json({ success: true, data: meal });
//   } catch (error) {
//     res.status(400).json({ success: false, error: error.message });
//   }
// };

// // ❌ Delete Meal
// exports.deleteMeal = async (req, res) => {
//   try {
//     const meal = await Meal.findByIdAndDelete(req.params.id);
//     if (!meal) return res.status(404).json({ success: false, message: "Meal not found" });
//     res.status(200).json({ success: true, message: "Meal deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };



// updated code 
const Meal = require("../models/Mealmodel");

// ✅ Add Meal
const addMeal = async (req, res) => {
  const { mealType, foodItems } = req.body;

  let emptyFields = [];

  if (!mealType) {
    emptyFields.push('mealType');
  }

  if (!foodItems || foodItems.length === 0) {
    emptyFields.push('name', 'quantity', 'calories', 'protein', 'carbs', 'fats');
  } else {
    const item = foodItems[0];
    if (!item.name) {
        emptyFields.push('name');
    }
    if (item.quantity == null) {
        emptyFields.push('quantity');
    }
    if (item.calories == null) {
        emptyFields.push('calories');
    }
    if (item.protein == null) {
        emptyFields.push('protein');
    }
    if (item.carbs == null) {
        emptyFields.push('carbs');
    }
    if (item.fats == null) {
        emptyFields.push('fats');
    }
  }

  if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all the fields', emptyFields: [...new Set(emptyFields)] });
  }

  try {
    const meal = new Meal({
      ...req.body,
      userId: req.userId,
    });
    await meal.save();
    res.status(201).json(meal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// ✅ Get Meals (for logged-in user)
const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.userId }).sort({ date: -1 });
    res.json(meals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Update Meal
const updateMeal = async (req, res) => {
  try {
    const updated = await Meal.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) {
        return res.status(404).json({ error: "Meal not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ Delete Meal
const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!meal) {
      return res.status(404).json({ error: "Meal not found" });
    }
    res.status(200).json(meal);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { addMeal, getMeals, updateMeal, deleteMeal };