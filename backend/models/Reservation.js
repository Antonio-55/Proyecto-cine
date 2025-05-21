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
  `SELECT 
      r.idReservacion,
      r.estado,
      r.fecha,
      f.fecha AS fecha_funcion,
      f.hora,
      p.titulo AS pelicula,
      s.nombre AS sala,
      a.fila,
      a.columna
   FROM reservacion r
   JOIN funciones f ON r.funcion_idFunciones = f.idfunciones
   JOIN peliculas p ON f.pelicula_idPeliculas = p.idPeliculas
   JOIN salas s ON f.sala_idSalas = s.idSalas
   JOIN asientos a ON r.asiento_idAsientos = a.idasientos
   WHERE r.usuario_idUsuarios = ? AND r.estado = 'pagado'
   ORDER BY f.fecha DESC, f.hora DESC`,
  [userId]
);


  // Agrupar asientos por función
  const reservasAgrupadas = [];

  for (const r of rows) {
    const clave = `${r.pelicula}-${r.fecha_funcion}-${r.hora}`;
    const existente = reservasAgrupadas.find(
      (x) => x.clave === clave
    );

    const etiquetaAsiento = `${String.fromCharCode(64 + r.fila)}${r.columna}`;

    if (existente) {
      existente.asientos.push(etiquetaAsiento);
    } else {
      reservasAgrupadas.push({
        clave,
        pelicula: r.pelicula,
        sala: r.sala,
        fecha_funcion: r.fecha_funcion,
        hora: r.hora,
        estado: r.estado,
        asientos: [etiquetaAsiento],
      });
    }
  }

  return reservasAgrupadas;
}

}

module.exports = Reservation;