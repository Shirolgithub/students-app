const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware for JWT authentication
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.studentId = decoded.id;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

// Register route
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    if (!name || !email || !password || !course)
      return res.status(400).json({ message: 'All fields are required' });

    const existing = await Student.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const newStudent = new Student({ name, email, password, course });
    await newStudent.save();

    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: student._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token and student info
    res.json({ 
      message: 'Login successful', 
      token,
      student: { name: student.name, email: student.email, course: student.course }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get logged-in student info
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const student = await Student.findById(req.studentId);
    if (!student) return res.status(404).json({ message: 'Student not found' });

    res.json({ student });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
