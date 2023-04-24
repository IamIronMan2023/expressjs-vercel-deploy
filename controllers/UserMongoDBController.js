const bcrypt = require("bcrypt");
const User = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    throw error;
  }
};

const getUser = async (req, res) => {
  let id = req.params.id;
  try {
    const user = await User.findById(id);

    if (user) {
      res.json(user);
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

    const user = await User.create({
      name: name,
      email: email,
      password: hashPassword,
    });

    if (user) {
      res.status(201).json({ msg: `Data inserted with id ${user._id}` });
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
    const user = await User.findById(id);
    user.name = name;
    user.email = email;
    user.password = hashPassword;
    await user.save();

    res.status(200).json({ msg: "Data updated successfully" });
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    await User.findByIdAndDelete(id);
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
