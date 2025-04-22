const db = require("../config/db");

class FunctionModel {
  static create({ fecha, hora, sala_idSalas, pelicula_idPeliculas }) {
    return new Promise((resolve, reject) => {
      const sql = "INSERT INTO funciones (fecha, hora, sala_idSalas, pelicula_idPeliculas) VALUES (?, ?, ?, ?)";
      db.query(sql, [fecha, hora, sala_idSalas, pelicula_idPeliculas], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  }

  static findAll() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT f.idfunciones, f.fecha, f.hora, s.nombre AS sala, p.titulo AS pelicula
                   FROM funciones f
                   JOIN salas s ON f.sala_idSalas = s.idsalas
                   JOIN peliculas p ON f.pelicula_idPeliculas = p.idpeliculas`;
      db.query(sql, (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  }
}

module.exports = FunctionModel;
