const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const bcrypt = require("bcryptjs");

// Register student
router.post("/register", async (req, res) => {
  try {
    const { name, email, password, course } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name,
      email,
      password: hashedPassword,
      course,
    });

    res.status(201).json({ message: "Student registered", student });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
