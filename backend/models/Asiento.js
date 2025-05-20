const db = require("../config/db");

class Asiento {
  static async marcarComoReservado(idAsiento) {
    const [result] = await db.query(
      "UPDATE asientos SET estado = 'reservado' WHERE idasientos = ?",
      [idAsiento]
    );
    return result;
  }

  static async estaDisponible(idAsiento) {
    const [rows] = await db.query(
      `SELECT r.estado
       FROM reservacion r
       WHERE r.asiento_idAsientos = ? AND r.estado IN ('pendiente', 'pagado')`,
      [idAsiento]
    );
    return rows.length === 0;
  }

  static async obtenerPorFuncion(funcionId) {
  const [rows] = await db.query(
    `
    SELECT 
      a.idasientos, a.fila, a.columna,
      COALESCE(r.estado, 'disponible') AS estado
    FROM asientos a
    JOIN funciones f ON a.sala_idSalas = f.sala_idSalas
    LEFT JOIN reservacion r 
      ON r.asiento_idAsientos = a.idasientos 
      AND r.funcion_idFunciones = ?
    WHERE f.idfunciones = ?
    `,
    [funcionId, funcionId]
  );
  return rows;
}

}

module.exports = Asiento;

