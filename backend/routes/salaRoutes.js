const express = require("express");
const router = express.Router();
const { createSala, getSalas, actualizarSala, eliminarSala } = require("../controlers/salaController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getSalas); // Pública

router.post("/", authMiddleware, (req, res, next) => {
    if (req.user.rol !== "administrador") {
        return res.status(403).json({ message: "Acceso no autorizado" });
    }
    next(); // pasa al controlador si es administrador
}, createSala);

// Actualizar sala
router.put("/:id", authMiddleware, (req, res, next) => {
  if (req.user.rol !== "administrador") {
    return res.status(403).json({ message: "Acceso no autorizado" });
  }
  next();
}, actualizarSala);

// Eliminar sala
router.delete("/:id", authMiddleware, (req, res, next) => {
  if (req.user.rol !== "administrador") {
    return res.status(403).json({ message: "Acceso no autorizado" });
  }
  next();
}, eliminarSala);



module.exports = router;
