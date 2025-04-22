const db = require("../config/db");

class Reservation {
    static create({ fecha, userId, funcionId, asientoId }) {
        return new Promise((resolve, reject) => {
            db.query(
                `INSERT INTO reservacion (fecha, users_idUsuarios, funciones_idfunciones, asientos_idasientos) 
                 VALUES (?, ?, ?, ?)`,
                [fecha, userId, funcionId, asientoId],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        });
    }

    static getByUser(userId) {
        return new Promise((resolve, reject) => {
            db.query(
                `SELECT r.idreservacion, r.fecha, f.fecha AS fecha_funcion, f.hora, p.titulo AS pelicula, s.nombre AS sala
                 FROM reservacion r
                 JOIN funciones f ON r.funciones_idfunciones = f.idfunciones
                 JOIN peliculas p ON f.pelicula_idPeliculas = p.idPeliculas
                 JOIN salas s ON f.sala_idSalas = s.idSalas
                 WHERE r.users_idUsuarios = ?`,
                [userId],
                (err, results) => {
                    if (err) reject(err);
                    resolve(results);
                }
            );
        });
    }
}

module.exports = Reservation;
