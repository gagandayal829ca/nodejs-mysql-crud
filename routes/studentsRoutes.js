const express = require("express");
const {
  getStudents,
  getStudentById,
  createStudent,
} = require("../controllers/studentController");

//router object
const router = express.Router();

// Routes

// Get all students list
router.get("/getall", getStudents);

// Get student by ID
router.get("/get/:id", getStudentById);

// Create Student
router.post("/create", createStudent);

module.exports = router;
