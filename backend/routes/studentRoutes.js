const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");

// Register student
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    // Check existing user
    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Create student (password hashing happens automatically in model)
    const student = await Student.create({
      name,
      email,
      password,
      course,
    });

    res.status(201).json({ message: "Student registered", student });
  } catch (error) {
    console.error("REGISTER ERROR:", error);   // <-- add log
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
