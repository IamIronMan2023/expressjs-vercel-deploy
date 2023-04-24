const Employee = require("../models/Employee");

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.json(employees);
  } catch (error) {
    throw error;
  }
};

const getEmployee = async (req, res) => {
  const id = req.params.id;

  try {
    const employee = await Employee.findById(id);
    res.json(employee);
  } catch (error) {
    throw error;
  }
};

const createEmployee = async (req, res) => {
  const { first_name, last_name, email, age } = req.body;

  try {
    const employee = await Employee.create({
      first_name: first_name,
      last_name: last_name,
      email: email,
      age: age,
    });

    if (employee) {
      res.status(201).json({
        id: employee._id,
        msg: `Data inserted`,
      });
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
    const employee = await Employee.findByIdAndUpdate(id, {
      first_name: first_name,
      last_name: last_name,
      email: email,
      age: age,
    });

    if (employee) {
      res.status(200).json({ msg: `Data updated with id ${employee._id}` });
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
    await Employee.findByIdAndDelete(id)
      .then(() => res.status(200).json({ msg: `Data deleted with id ${id}` }))
      .catch((err) => res.status(400).json({ msg: "Data not deleted" }));
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
