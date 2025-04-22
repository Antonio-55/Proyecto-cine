const db = require("../config/db");

class Sala {
    static create(nombre, filas, columnas) {
        return new Promise((resolve, reject) => {
            db.query(
                "INSERT INTO salas (nombre, filas, columnas) VALUES (?, ?, ?)",
                [nombre, filas, columnas],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        });
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM salas", (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }
}

module.exports = Sala;
