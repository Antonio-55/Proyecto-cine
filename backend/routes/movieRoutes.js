const express = require("express");
const router = express.Router();
const { createMovie, getMovies, deleteMovie } = require("../controlers/movieController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", getMovies); // Pública
router.post("/", authMiddleware, createMovie); // Solo admins
router.delete("/:id", authMiddleware, (req, res, next) => {
    if (req.user.rol !== "administrador") {
        return res.status(403).json({ message: "Acceso no autorizado" });
    }
    next();
}, deleteMovie); // Solo admins

module.exports = router;
