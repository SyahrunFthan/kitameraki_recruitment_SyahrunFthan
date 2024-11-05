const express = require("express");
const {
  createTask,
  getDataTask,
  updateTask,
  deleteTask,
  getDataById,
} = require("../controllers/ControllerTask");

// Create Route Api
const router = express.Router();

router.post("/", createTask);
router.get("/", getDataTask);
router.get("/:id", getDataById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
