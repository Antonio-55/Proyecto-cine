const Sala = require("../models/Sala");
const db = require("../config/db");


exports.createSala = async (req, res) => {
    const { nombre, filas, columnas } = req.body;

    if (req.user.rol !== "administrador") {
        return res.status(403).json({ message: "Acceso denegado: solo administradores pueden crear salas." });
    }

    if (!nombre || !filas || !columnas) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    try {
        await Sala.create(nombre, filas, columnas);
        res.status(201).json({ message: "Sala creada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al crear sala", error });
    }
};

exports.getSalas = async (req, res) => {
    try {
        const salas = await Sala.getAll();
        res.json(salas);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener salas", error });
    }
};

exports.actualizarSala = (req, res) => {
    const id = req.params.id;
    const { nombre, filas, columnas } = req.body;
  
    db.query(
      "UPDATE salas SET nombre = ?, filas = ?, columnas = ? WHERE idsalas = ?",
      [nombre, filas, columnas, id],
      (err, result) => {
        if (err) return res.status(500).json({ message: "Error al actualizar sala", error: err });
        res.json({ message: "Sala actualizada correctamente" });
      }
    );
};
  
exports.eliminarSala = (req, res) => {
    const id = req.params.id;
  
    db.query("DELETE FROM salas WHERE idSalas = ?", [id], (err, result) => {
      if (err) {
        console.error("🛑 Error al eliminar sala:", err); // 👈 Aquí se imprimirá el error real
        return res.status(500).json({ message: "Error al eliminar sala", error: err });
      }
      res.json({ message: "Sala eliminada correctamente" });
    });
  };
  
  