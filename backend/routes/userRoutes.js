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

//  Nueva ruta para obtener el perfil del usuario autenticado

router.get("/perfil", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.query(
      "SELECT nombre, email, rol FROM users WHERE idUsuarios = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Error al obtener perfil:", err);
    res.status(500).json({ message: "Error del servidor" });
  }
});


module.exports = router;

