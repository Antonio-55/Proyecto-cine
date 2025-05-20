const db = require("../config/db");

class Payment {
  static async create({ userId, reservationId, monto, metodo }) {
    const [result] = await db.query(
      `INSERT INTO pagos (usuario_idUsuarios, reservacion_idreservacion, monto, metodo_pago, estado, fecha_pago)
       VALUES (?, ?, ?, ?, 'completado', NOW())`,
      [userId, reservationId, monto, metodo]
    );
    return result;
  }
}

module.exports = Payment;
