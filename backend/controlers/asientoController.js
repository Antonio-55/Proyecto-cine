const Asiento = require("../models/Asiento");

exports.obtenerAsientosPorFuncion = async (req, res) => {
  const { id } = req.params;
  try {
    const asientos = await Asiento.obtenerPorFuncion(id);
    res.json(asientos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener asientos", error });
  }
};

