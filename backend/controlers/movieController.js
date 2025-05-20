const Movie = require("../models/Movie");
const db = require("../config/db");

exports.createMovie = async (req, res) => {
    const { titulo, poster_url, sinopsis, genero } = req.body;

    // Verifica que sea admin
    if (req.user.rol !== "administrador") {
        return res.status(403).json({ message: "Acceso denegado: solo administradores pueden crear películas." });
    }

    if (!titulo || !poster_url || !sinopsis || !genero) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    try {
        await Movie.create(titulo, poster_url, sinopsis, genero);
        res.status(201).json({ message: "Película creada exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al crear película", error });
    }
};

exports.getMovies = async (req, res) => {
    try {
        const movies = await Movie.getAll();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener películas", error });
    }
};

exports.deleteMovie = async (req, res) => {
    const { id } = req.params;

    if (req.user.rol !== "administrador") {
        return res.status(403).json({ message: "Acceso denegado: solo administradores pueden eliminar películas." });
    }

    try {
        await Movie.delete(id);
        res.json({ message: "Película eliminada correctamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar película", error });
    }
};

exports.getFuncionesPorPelicula = async (req, res) => {
  const { id } = req.params;

  const sql = `
    SELECT f.idfunciones AS idFuncion, f.fecha, f.hora, s.nombre AS sala
    FROM funciones f
    JOIN salas s ON f.sala_idSalas = s.idSalas
    WHERE f.pelicula_idPeliculas = ?
    ORDER BY f.fecha, f.hora
  `;

  try {
    const [funciones] = await db.query(sql, [id]);

    if (funciones.length === 0) {
      return res.status(404).json({ message: "No hay funciones para esta película" });
    }

    res.json(funciones);
  } catch (error) {
    console.error("Error al obtener funciones por película:", error);
    res.status(500).json({ message: "Error del servidor", error });
  }
};