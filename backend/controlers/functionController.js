const FunctionModel = require("../models/Function");
const db = require("../config/db");

exports.createFunction = async (req, res) => {
  const { fecha, hora, sala_idSalas, pelicula_idPeliculas } = req.body;
  if (!fecha || !hora || !sala_idSalas || !pelicula_idPeliculas) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }
  try {
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
