const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoutes = require('./routes/user-routes');
const workoutRoutes = require('./routes/workout-routes');
const mealRoutes = require('./routes/Mealroute');
const progressRoutes = require('./routes/progressRoutes');
const reportRoutes =require('./routes/reportRoutes');
const searchRoutes =require('./routes/searchRoutes');
const connectDB = require('./config/db');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// API Routes
app.use('/api/users', userRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/meals', mealRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/search', searchRoutes);

// Global error handler
app.use((err, req, res, next) => {
  console.error("Global Error Handler caught an error:");
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server!', details: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));