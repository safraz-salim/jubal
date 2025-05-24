const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment');
const auth = require('../middleware/auth'); // JWT auth middleware

router.post('/enroll', auth, async (req, res) => {
  const { courseId } = req.body;
  const studentId = req.user.id; // Assuming you store user ID in JWT

  try {
    // Check if the student is already enrolled in this course
    const existingEnrollment = await Enrollment.findOne({ studentId, courseId });

    if (existingEnrollment) {
      return res.status(400).json({ msg: 'You are already enrolled in this course' });
    }

    // Create new enrollment
    const enrollment = new Enrollment({ studentId, courseId });
    await enrollment.save();

    res.status(201).json({ msg: 'Enrollment successful', enrollment });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route to get all courses the current student is enrolled in
router.get('/my-courses', auth, async (req, res) => {
  const studentId = req.user.id;

  try {
    // Find all enrollments by this student, and populate course info
    const enrollments = await Enrollment.find({ studentId }).populate('courseId');

    // Extract just the course info
    const enrolledCourses = enrollments.map(enrollment => enrollment.courseId);

    res.json(enrolledCourses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;