const express = require("express");
const router = express.Router();
const { createFunction, getFunciones, getFuncionById, getFuncionesByPelicula } = require("../controlers/functionController");
const authMiddleware = require("../middleware/authMiddleware");


router.post("/", authMiddleware, createFunction); // solo admins dentro del controlador
router.get("/", getFunciones);
router.get("/:id", getFuncionById);
router.get("/pelicula/:id", getFuncionesByPelicula); 

module.exports = router;

