const express = require("express");
const router = express.Router();
const { createFunction, getFunciones } = require("../controlers/functionController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createFunction); // solo admins dentro del controlador
router.get("/", getFunciones);

module.exports = router;

