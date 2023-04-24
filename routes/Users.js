const express = require("express");
const router = express.Router();
const userMongoDBController = require("../controllers/UserMongoDBController");

// Get Request
router.get("/", userMongoDBController.getAllUsers);
// Get Request Parameterized
router.get("/:id", userMongoDBController.getUser);
// Post Request
router.post("/", userMongoDBController.createUser);
router.put("/", userMongoDBController.updateUser);
router.delete("/", userMongoDBController.deleteUser);

module.exports = router;
