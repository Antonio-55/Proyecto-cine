const db = require("../config/db");

class Payment {
    static create({ userId, reservationId, monto, metodo }) {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO pagos (usuario_idUsuarios, reservacion_idreservacion, monto, metodo_pago, estado, fecha_pago)
                 VALUES (?, ?, ?, ?, 'completado', NOW())`,
                [userId, reservationId, monto, metodo],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        });
    }
}

module.exports = Payment;
