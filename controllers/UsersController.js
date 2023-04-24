const db = require("../database");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    throw error;
  }
};

const getUser = async (req, res) => {
  let id = req.params.id;
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(400).json({ msg: `id ${id} does not exists` });
    }
  } catch (error) {
    throw error;
  }
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (name, email, password) VALUES(?, ?, ?)",
      [name, email, hashPassword]
    );

    if (result && result.affectedRows > 0) {
      res.status(200).json({ msg: `Data inserted with id ${result.insertId}` });
    } else {
      res.status(400).json({ msg: "Data not inserted" });
    }
  } catch (error) {
    throw error;
  }
};

const updateUser = async (req, res) => {
  const { id, name, email, password } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);
  try {
    await db.query(
      "UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?",
      [name, email, hashPassword, id]
    );
    res.status(200).json({ msg: "Data updated successfully" });
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const [result] = await db.query("DELETE FROM users WHERE id = ?", [id]);
    res.status(200).json({ msg: "Data deleted successfully" });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
