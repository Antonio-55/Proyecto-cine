const express = require("express");
const router = express.Router();
const { obtenerAsientosPorFuncion } = require("../controlers/asientoController");

router.get("/funciones/:id/asientos", obtenerAsientosPorFuncion);

module.exports = router;
