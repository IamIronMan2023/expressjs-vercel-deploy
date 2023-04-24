const db = require("../database");
const bcrypt = require("bcrypt");

const getAllEmployees = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM employees");
    res.json(rows);
  } catch (error) {
    throw error;
  }
};

const getEmployee = async (req, res) => {
  const id = req.params.id;

  try {
    const [rows] = await db.query("SELECT * FROM employees WHERE id = ?", [id]);
    res.json(rows);
  } catch (error) {
    throw error;
  }
};

const createEmployee = async (req, res) => {
  const { first_name, last_name, email, age } = req.body;

  try {
    const [result] = await db.query(
      "INSERT INTO employees(first_name, last_name, email, age) VALUES(?, ?, ?, ?)",
      [first_name, last_name, email, age]
    );

    if (result && result.affectedRows > 0) {
      res.status(201).json({ msg: `Data inserted with id ${result.insertId}` });
    } else {
      res.status(400).json({ msg: "Data not inserted" });
    }
  } catch (error) {
    throw error;
  }
};

const updateEmployee = async (req, res) => {
  const { first_name, last_name, email, age, id } = req.body;

  try {
    const [result] = await db.query(
      "UPDATE employees SET first_name = ?, last_name = ?, email = ?, age = ? WHERE id = ?",
      [first_name, last_name, email, age, id]
    );

    if (result && result.affectedRows > 0) {
      res.status(200).json({ msg: `Data updated with id ${id}` });
    } else {
      res.status(400).json({ msg: "Data not updated" });
    }
  } catch (error) {
    throw error;
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.body;

  try {
    const [result] = await db.query("DELETE FROM employees WHERE id = ?", [id]);

    if (result && result.affectedRows > 0) {
      res.status(200).json({ msg: `Data deleted with id ${id}` });
    } else {
      res.status(400).json({ msg: "Data not updated" });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
