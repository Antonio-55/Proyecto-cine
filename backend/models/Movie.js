const db = require("../config/db");

class Movie {
  static async create(titulo, poster_url, sipnosis, genero) {
    const [result] = await db.query(
      "INSERT INTO peliculas (titulo, poster_url, sinopsis, genero) VALUES (?, ?, ?, ?)",
      [titulo, poster_url, sipnosis, genero]
    );
    return result;
  }

  static async getAll() {
    const [rows] = await db.query("SELECT * FROM peliculas");
    return rows;
  }

  static async delete(id) {
    const [result] = await db.query("DELETE FROM peliculas WHERE idpeliculas = ?", [id]);
    return result;
  }
}

module.exports = Movie;

