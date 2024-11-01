const db = require("../config/db");

//Get all Students list
const getStudents = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM students");
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No records found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All students records",
      totalStudents: data[0].length,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get all student API",
      error,
    });
  }
};

const getStudentById = async (req, res) => {
  const studentId = req.params.id;

  if (!studentId) {
    res.status(404).send({
      success: false,
      message: "Invalid or Provide student Id",
    });
  }

  // In the below if we pass the variable directly chances of SQL Injection is there
  //   const data = await db.query(`SELECT * FROM students WHERE id=` + studentId);

  const data = await db.query(`SELECT * FROM students WHERE idstudents=?`, [
    studentId,
  ]);

  if (!data) {
    res.status(404).send({
      success: false,
      message: "No records found",
    });
  }
  res.status(200).send({
    sucess: true,
    studentDetails: data[0],
  });
};

// Create Student
const createStudent = async (req, res) => {
  try {
    console.log(req.body);
    const { name, roll_no, fees, medium } = req.body;

    if (!name || roll_no || fees || medium) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }

    const data = await db.query(
      `INSERT INTO students (name, roll_no, fees, medium) VALUE (?,?,?,?)`,
      [name, roll_no, fees, medium]
    );

    if (!data) {
      return res.status(404).send({
        success: false,
        message: "Error in Insert Query",
      });
    }
    res.status(201).send({
      success: true,
      message: "New student record created",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in create student API",
      error,
    });
  }
};

module.exports = { getStudents, getStudentById, createStudent };
