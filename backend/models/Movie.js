const db = require("../config/db");

class Movie {
    static create(titulo, poster_url, sipnosis, genero) {
        return new Promise((resolve, reject) => {
            db.query(
                "INSERT INTO peliculas (titulo, poster_url, sinopsis, genero) VALUES (?, ?, ?, ?)",
                [titulo, poster_url, sipnosis, genero],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        });
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM peliculas", (err, results) => {
                if (err) reject(err);
                resolve(results);
            });
        });
    }

    static delete(id) {
        return new Promise((resolve, reject) => {
            db.query("DELETE FROM peliculas WHERE idpeliculas = ?", [id], (err, result) => {
                if (err) reject(err);
                resolve(result);
            });
        });
    }
}

module.exports = Movie;
