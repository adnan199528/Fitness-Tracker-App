const express = require('express');
const router = express.Router();
const {
  addProgress,
  getProgress,
  updateProgress,
  deleteProgress,
} = require('../controllers/progressController');
const requireAuth = require('../middleware/auth');

// require auth for all progress routes
router.use(requireAuth);

// GET all progress
router.get('/', getProgress);

// POST a new progress
router.post('/', addProgress);

// DELETE a progress
router.delete('/:id', deleteProgress);

// UPDATE a progress
router.patch('/:id', updateProgress);

module.exports = router;