const db = require("../config/db");

class FunctionModel {
  static async create({ fecha, hora, sala_idSalas, pelicula_idPeliculas }) {
    const [result] = await db.query(
      "INSERT INTO funciones (fecha, hora, sala_idSalas, pelicula_idPeliculas) VALUES (?, ?, ?, ?)",
      [fecha, hora, sala_idSalas, pelicula_idPeliculas]
    );
    return result;
  }

  static async findAll() {
    const [rows] = await db.query(
      `SELECT f.idfunciones, f.fecha, f.hora, s.nombre AS sala, p.titulo AS pelicula
       FROM funciones f
       JOIN salas s ON f.sala_idSalas = s.idsalas
       JOIN peliculas p ON f.pelicula_idPeliculas = p.idpeliculas`
    );
    return rows;
  }
}

module.exports = FunctionModel;
