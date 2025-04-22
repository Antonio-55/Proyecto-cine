const express = require("express");
const router = express.Router();
const { createReservation, getUserReservations } = require("../controlers/reservationController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createReservation); // Crear una reservación
router.get("/", authMiddleware, getUserReservations); // Ver mis reservaciones

module.exports = router;
