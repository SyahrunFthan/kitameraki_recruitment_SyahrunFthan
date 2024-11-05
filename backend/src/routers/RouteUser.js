const express = require("express");
const { login, register, logout } = require("../controllers/ControllerUser");

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.delete("/:id", logout);

module.exports = router;
