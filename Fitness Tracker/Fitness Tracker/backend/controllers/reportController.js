// controllers/reportController.js
const PDFDocument = require("pdfkit");
const { Parser } = require("json2csv");
const Workout = require("../models/workout-model");
const Meal = require("../models/Mealmodel");
const Progress = require("../models/Progress");

// helper: userId le lo req se
const getUserIdFromReq = (req) => {
  if (req.userId) return req.userId;
  if (req.user && (req.user._id || req.user.id)) return req.user._id || req.user.id;
  return null;
};

// helper: build date filter for mongoose
const buildDateFilter = (startDate, endDate) => {
  if (!startDate && !endDate) return null;
  const filter = {};
  if (startDate) filter.$gte = new Date(startDate);
  if (endDate) {
    const d = new Date(endDate);
    d.setHours(23, 59, 59, 999); // include end day
    filter.$lte = d;
  }
  return filter;
};

const generatePDFReport = async (req, res) => {
  try {
    console.log("Generating PDF report with query:", req.query);
    const userId = getUserIdFromReq(req);
    const { startDate, endDate } = req.query;
    const dateFilter = buildDateFilter(startDate, endDate);
    console.log("Constructed date filter:", dateFilter);

    const workoutQuery = {};
    const mealQuery = {};
    const progressQuery = {};

    if (userId) {
      workoutQuery.userId = userId;
      mealQuery.userId = userId;
      progressQuery.userId = userId;
    }

    if (dateFilter) {
      workoutQuery.createdAt = dateFilter;
      mealQuery.createdAt = dateFilter;
      progressQuery.date = dateFilter;
    }

    // fetch from collections (if you stored userId there)
    let workouts = await Workout.find(workoutQuery).sort({ createdAt: -1 }).lean();
    let meals = await Meal.find(mealQuery).sort({ createdAt: -1 }).lean();
    let progress = await Progress.find(progressQuery).sort({ date: -1 }).lean();

    console.log(`Found ${workouts.length} workouts, ${meals.length} meals, ${progress.length} progress entries.`);

    // Start PDF
    const doc = new PDFDocument({ margin: 40, size: "A4" });
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=fitness-report.pdf");
    doc.pipe(res);

    // --- Register a function to draw border on every page ---
    const drawBorder = () => {
        doc.rect(20, 20, doc.page.width - 40, doc.page.height - 40).stroke();
        doc.x = 40;
        doc.y = 40;
        // Reset font and other properties to prevent state leakage from watermark
        doc.font('Helvetica').fontSize(10).fillColor('black').opacity(1);
    };

    // --- Function to add watermark ---
    const drawWatermark = () => {
        const pageWidth = doc.page.width;
        const pageHeight = doc.page.height;
        const text = "Fitness Tracker";
        doc.save();
        doc.font('Helvetica-Bold').fontSize(80).fillColor('black').opacity(0.1);
        const textWidth = doc.widthOfString(text);
        const textHeight = doc.currentLineHeight();
        doc.translate(pageWidth / 2, pageHeight / 2)
           .rotate(-45, { origin: [0, 0] })
           .text(text, -textWidth / 2, -textHeight / 2, {
               lineBreak: false
           });
        doc.restore();
    };

    doc.on('pageAdded', () => {
        drawWatermark();
        drawBorder();
    });

    // --- Draw on the first page ---
    drawWatermark();
    drawBorder();

    // --- Header ---
    doc.fontSize(20).font('Helvetica-Bold').text("Fitness Report", { align: "center", underline: true });
    doc.moveDown(1.5);

    const userLabel = (req.user && (req.user.name || req.user.email)) ? `${req.user.name || req.user.email}` : "User";
    
    // User, Generated, Range info
    doc.fontSize(10).font('Helvetica-Bold').text("User: ", { continued: true }).text(userLabel, { font: 'Helvetica-Bold' });
    doc.font('Helvetica-Bold').text("Generated: ", { continued: true }).text(new Date().toLocaleString(), { font: 'Helvetica-Bold' });
    if (startDate || endDate) {
      doc.font('Helvetica-Bold').text("Range: ", { continued: true }).text(`${startDate || "start"} — ${endDate || "end"}`, { font: 'Helvetica-Bold' });
    }
    doc.moveDown(2);


    // --- Workouts Section ---
    doc.fontSize(16).font('Helvetica-Bold').text("Workouts", { underline: true });
    doc.moveDown(0.5);
    if (!workouts || workouts.length === 0) {
      doc.fontSize(10).font('Helvetica').text("No workouts found for this range.");
    } else {
      workouts.forEach((w, i) => {
        const d = w.createdAt ? new Date(w.createdAt) : null;
        doc.fontSize(12).font('Helvetica-Bold').text(`${i + 1}. ${d ? d.toDateString() : 'Workout Entry'}`);
        doc.font('Helvetica-Bold').fontSize(9);
        doc.text(`   Exercise: ${w.exerciseName || "Exercise"}`);
        doc.font('Helvetica').fontSize(9);
        if (w.category) doc.text(`   Category: ${w.category}`);
        if (w.sets !== undefined) doc.text(`   Sets: ${w.sets}`);
        if (w.reps !== undefined) doc.text(`   Reps: ${w.reps}`);
        if (w.weight !== undefined) doc.text(`   Weight: ${w.weight}`);
        doc.moveDown(0.5);
      });
    }
    doc.moveDown(1); // Space between sections


    // --- Meals Section ---
    doc.fontSize(16).font('Helvetica-Bold').text("Meals / Nutrition", { underline: true });
    doc.moveDown(0.5);
    if (!meals || meals.length === 0) {
      doc.fontSize(10).font('Helvetica').text("No meal/nutrition data found for this range.");
    } else {
      meals.forEach((m, i) => {
        const d = m.createdAt ? new Date(m.createdAt) : null;
        doc.fontSize(12).font('Helvetica-Bold').text(`${i + 1}. ${d ? d.toDateString() : 'Meal Entry'}`);
        doc.font('Helvetica-Bold').fontSize(9);
        doc.text(`   Meal Type: ${m.mealType || 'N/A'}`);
        doc.font('Helvetica').fontSize(9);
        if (m.foodItems && Array.isArray(m.foodItems)) {
          m.foodItems.forEach(fi => {
            doc.text(`   Food Name: ${fi.name || "Food Item"}`);
            if (fi.quantity !== undefined) doc.text(`     Quantity: ${fi.quantity}`);
            if (fi.calories !== undefined) doc.text(`     Calories: ${fi.calories}`);
            if (fi.protein !== undefined) doc.text(`     Protein: ${fi.protein}`);
            if (fi.carbs !== undefined) doc.text(`     Carbs: ${fi.carbs}`);
            if (fi.fats !== undefined) doc.text(`     Fats: ${fi.fats}`);
            doc.moveDown(0.3);
          });
        } else if (m.menu) {
          doc.fontSize(9).font('Helvetica').text(`   Menu: ${m.menu}`);
        }
        doc.moveDown(0.5);
      });
    }
    doc.moveDown(1); // Space between sections


    // --- Progress Section ---
    doc.fontSize(16).font('Helvetica-Bold').text("Progress", { underline: true });
    doc.moveDown(0.5);
    if (!progress || progress.length === 0) {
      doc.fontSize(10).font('Helvetica').text("No progress data found for this range.");
    } else {
      progress.forEach((p, i) => {
        const d = p.date ? new Date(p.date) : null;
        doc.fontSize(12).font('Helvetica-Bold').text(`${i + 1}. ${d ? d.toDateString() : "Progress Entry"}`);
        doc.font('Helvetica').fontSize(9);
        if (p.weight !== undefined) doc.text(`   Weight: ${p.weight}`);
        if (p.waist !== undefined) doc.text(`   Waist: ${p.waist}`);
        if (p.chest !== undefined) doc.text(`   Chest: ${p.chest}`);
        if (p.runtime !== undefined) doc.text(`   RunTime: ${p.runtime}`);
        if (p.liftMax !== undefined) doc.text(`   LiftMax: ${p.liftMax}`);
        if (p.bodyFatPercentage !== undefined) doc.text(`   BodyFat%: ${p.bodyFatPercentage}`);
        doc.moveDown(0.5);
      });
    }

    // --- Footer ---
    const pageHeight = doc.page.height;
    doc.fontSize(8).font('Helvetica-Oblique').text('--- End of Fitness Report ---', 50, pageHeight - 35, {
        align: 'center',
        lineBreak: false
    });


    doc.end();
  } catch (err) {
    console.error("PDF report error:", err);
    res.status(500).json({ error: err.message });
  }
};

const generateCSVReport = async (req, res) => {
  try {
    console.log("Generating CSV report with query:", req.query);
    const userId = getUserIdFromReq(req);
    const { startDate, endDate } = req.query;
    const dateFilter = buildDateFilter(startDate, endDate);
    console.log("Constructed date filter:", dateFilter);

    const workoutQuery = {};
    const mealQuery = {};
    const progressQuery = {};

    if (userId) {
      workoutQuery.userId = userId;
      mealQuery.userId = userId;
      progressQuery.userId = userId;
    }
    if (dateFilter) {
      workoutQuery.createdAt = dateFilter;
      mealQuery.createdAt = dateFilter;
      progressQuery.date = dateFilter;
    }

    const workouts = await Workout.find(workoutQuery).sort({ createdAt: -1 }).lean();
    const meals = await Meal.find(mealQuery).sort({ createdAt: -1 }).lean();
    let progress = await Progress.find(progressQuery).sort({ date: -1 }).lean();

    console.log(`Found ${workouts.length} workouts, ${meals.length} meals, ${progress.length} progress entries.`);

    // map rows
    const workoutRows = (workouts || []).map(w => ({
      date: w.createdAt ? new Date(w.createdAt).toISOString() : "",
      exerciseName: w.exerciseName || "",
      sets: w.sets ?? "",
      reps: w.reps ?? "",
      weight: w.weight ?? "",
      category: w.category || ""
    }));

    const mealRows = [];
    (meals || []).forEach(m => {
      const date = m.createdAt ? new Date(m.createdAt).toISOString() : "";
      if (m.foodItems && Array.isArray(m.foodItems) && m.foodItems.length) {
        m.foodItems.forEach(fi => {
          mealRows.push({
            date,
            mealType: m.mealType || "",
            foodName: fi.name || "",
            quantity: fi.quantity ?? "",
            calories: fi.calories ?? "",
            protein: fi.protein ?? "",
            carbs: fi.carbs ?? "",
            fats: fi.fats ?? ""
          });
        });
      } else {
        mealRows.push({ date, mealType: m.mealType || "", foodName: m.menu || "", quantity: "", calories: "", protein: "", carbs: "", fats: "" });
      }
    });

    const progressRows = (progress || []).map(p => ({
      date: p.date ? new Date(p.date).toISOString() : "",
      weight: p.weight ?? "",
      waist: p.waist ?? "",
      chest: p.chest ?? "",
      runtime: p.runtime ?? "",
      liftMax: p.liftMax ?? ""
    }));

    const parser = new Parser();
    const workoutCsv = workoutRows.length ? parser.parse(workoutRows) : "No workouts";
    const mealCsv = mealRows.length ? parser.parse(mealRows) : "No meals";
    const progressCsv = progressRows.length ? parser.parse(progressRows) : "No progress";
    
    const userLabel = (req.user && (req.user.name || req.user.email)) ? `${req.user.name || req.user.email}` : "User";
    const generatedDate = new Date().toLocaleString();
    const rangeLabel = (startDate || endDate) ? `${startDate || "start"} — ${endDate || "end"}`: "All time";

    const finalCsv = [
      `,,,,,,,,"Fitness Tracker Report"`, // Centered heading
      `"User: ${userLabel}"`,
      `"Generated: ${generatedDate}"`,
      `"Range: ${rangeLabel}"`,
      "",
      "WORKOUTS",
      workoutCsv,
      "",
      "MEALS",
      mealCsv,
      "",
      "PROGRESS",
      progressCsv,
      "",
      "--- End of Fitness Tracker Report ---"
    ].join("\n");

    res.header("Content-Type", "text/csv");
    res.attachment("fitness-report.csv");
    return res.send(finalCsv);
  } catch (err) {
    console.error("CSV report error:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { generatePDFReport, generateCSVReport };