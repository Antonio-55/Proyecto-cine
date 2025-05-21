const express = require("express");
const router = express.Router();
const { createReservation, getUserReservations, cancelarReserva, confirmarPago } = require("../controlers/reservationController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createReservation); // Crear una reservación
router.get("/", authMiddleware, getUserReservations); // Ver mis reservaciones
router.delete("/:id", authMiddleware, cancelarReserva);
router.put("/:id/pagar", authMiddleware, confirmarPago); // Confirmar pago



module.exports = router;
