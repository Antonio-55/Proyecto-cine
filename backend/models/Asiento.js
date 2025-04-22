const db = require("../config/db");

class Asiento {
    static marcarComoReservado(idAsiento) {
        return new Promise((resolve, reject) => {
            db.query(
                "UPDATE asientos SET estado = 'reservado' WHERE idasientos = ?",
                [idAsiento],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        });
    }

    static async estaDisponible(idAsiento) {
        return new Promise((resolve, reject) => {
            db.query(
                "SELECT estado FROM asientos WHERE idasientos = ?",
                [idAsiento],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results[0]?.estado === "disponible");
                }
            );
        });
    }

    static obtenerPorFuncion(funcionId) {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT a.idasientos, a.fila, a.columna, a.estado
                FROM asientos a
                JOIN funciones f ON a.sala_idsalas = f.salas_idsalas
                WHERE f.idfunciones = ?
            `;
            db.query(query, [funcionId], (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
    
}

module.exports = Asiento;

