const express = require("express");
const { register, login } = require("../controlers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
