// routes/courses.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Course'); // Make sure you have this model created

// GET /api/courses - fetch up to 4 courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().limit(4);
    res.json(courses);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;
