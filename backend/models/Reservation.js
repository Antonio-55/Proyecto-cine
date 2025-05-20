const db = require("../config/db");

class Reservation {
  static async create({ fecha, userId, funcionId, asientoId }) {
    const [result] = await db.query(
      `INSERT INTO reservacion (fecha, usuario_idUsuarios, funcion_idFunciones, asiento_idAsientos, estado)
       VALUES (?, ?, ?, ?, 'pendiente')`,
      [fecha, userId, funcionId, asientoId]
    );
    return result;
  }

  static async getByUser(userId) {
    const [rows] = await db.query(
      `SELECT r.idreservacion, r.fecha, f.fecha AS fecha_funcion, f.hora, p.titulo AS pelicula, s.nombre AS sala
       FROM reservacion r
       JOIN funciones f ON r.funciones_idfunciones = f.idfunciones
       JOIN peliculas p ON f.pelicula_idPeliculas = p.idPeliculas
       JOIN salas s ON f.sala_idSalas = s.idSalas
       WHERE r.users_idUsuarios = ?`,
      [userId]
    );
    return rows;
  }
}

module.exports = Reservation;