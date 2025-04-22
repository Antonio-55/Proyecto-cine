const express = require("express");
const router = express.Router();
const { createPayment } = require("../controlers/paymentController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createPayment); // Registrar un pago

module.exports = router;
