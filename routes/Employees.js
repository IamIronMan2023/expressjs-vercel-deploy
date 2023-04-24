const express = require("express");
const router = express.Router();
// const employeeController = require("../controllers/EmployeesController");
const employeeMongoDBController = require("../controllers/EmployeeMongoDBController");

// Get Request
router.get("/", employeeMongoDBController.getAllEmployees);

// Get Request Parameterized
router.get("/:id", employeeMongoDBController.getEmployee);

// Post Request
router.post("/", employeeMongoDBController.createEmployee);

// Put Request
router.put("/", employeeMongoDBController.updateEmployee);

// Delete Request
router.delete("/", employeeMongoDBController.deleteEmployee);

module.exports = router;
