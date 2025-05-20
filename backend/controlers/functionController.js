const FunctionModel = require("../models/Function");
const db = require("../config/db");

exports.createFunction = async (req, res) => {
  const { fecha, hora, sala_idSalas, pelicula_idPeliculas } = req.body;

  if (!fecha || !hora || !sala_idSalas || !pelicula_idPeliculas) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    // 🔍 Verificar si ya existe una función para esa sala y fecha
    const [existe] = await db.query(
      "SELECT * FROM funciones WHERE sala_idSalas = ? AND fecha = ?",
      [sala_idSalas, fecha]
    );

    if (existe.length > 0) {
      return res.status(409).json({ message: "Ya existe una función para esta sala y fecha." });
    }

    // ✅ Si no existe, crear la función
    const result = await FunctionModel.create({ fecha, hora, sala_idSalas, pelicula_idPeliculas });
    res.status(201).json({ message: "Función creada", id: result.insertId });

  } catch (error) {
    console.error("Error al crear función:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};


exports.getFunciones = async (req, res) => {
  try {
    const funciones = await FunctionModel.findAll();
    res.json(funciones);
  } catch (error) {
    console.error("Error al obtener funciones:", error);
    res.status(500).json({ message: "Error del servidor" });
  }
};

exports.getFuncionById = async (req, res) => {
  const id = req.params.id;

  const sql = `
    SELECT f.*, p.titulo AS pelicula, s.nombre AS sala, s.filas, s.columnas
    FROM funciones f
    JOIN peliculas p ON f.pelicula_idPeliculas = p.idPeliculas
    JOIN salas s ON f.sala_idSalas = s.idSalas
    WHERE f.idfunciones = ?
  `;

  try {
    const [results] = await db.query(sql, [id]);

    if (results.length === 0) {
      return res.status(404).json({ message: "Función no encontrada" });
    }

    res.json(results[0]);
  } catch (err) {
    console.error("Error al obtener función por ID:", err);
    res.status(500).json({ message: "Error en el servidor", err });
  }
};

exports.getFuncionesByPelicula = async (req, res) => {
  const idPelicula = req.params.id;

  try {
    const [funciones] = await db.query(
      `SELECT f.idfunciones AS idFuncion, f.fecha, f.hora, s.nombre AS sala
       FROM funciones f
       JOIN salas s ON f.sala_idSalas = s.idSalas
       WHERE f.pelicula_idPeliculas = ?`,
      [idPelicula]
    );

    if (funciones.length === 0) {
      return res.status(404).json({ message: "Esta película aún no tiene funciones disponibles" });
    }

    res.json(funciones);
  } catch (error) {
    console.error("Error al obtener funciones por película:", error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};


