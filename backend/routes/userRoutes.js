const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Obtener todos los usuarios (solo admins deberían usarla)
router.get("/", (req, res) => {
    db.query("SELECT * FROM users", (err, results) => {
        if (err) {
            console.error("Error obteniendo usuarios:", err);
            res.status(500).json({ error: "Error en el servidor" });
            return;
        }
        res.json(results);
    });
});

// ✅ Nueva ruta para obtener el perfil del usuario autenticado
router.get("/perfil", authMiddleware, (req, res) => {
    const userId = req.user.id;

    db.query("SELECT nombre, email, rol FROM users WHERE idUsuarios = ?", [userId], (err, results) => {
        if (err) {
            console.error("Error al obtener perfil:", err);
            return res.status(500).json({ message: "Error del servidor" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json(results[0]);
    });
});

module.exports = router;

