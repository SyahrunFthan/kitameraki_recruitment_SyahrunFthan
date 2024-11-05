const express = require("express");
const {
  createTask,
  getDataTask,
  updateTask,
  deleteTask,
  getDataById,
} = require("../controllers/ControllerTask");
const Authentication = require("../middleware/Authentication");

// Create Route Api
const router = express.Router();

router.use(Authentication);
router.post("/", createTask);
router.get("/", getDataTask);
router.get("/:id", getDataById);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
