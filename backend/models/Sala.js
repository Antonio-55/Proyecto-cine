const db = require("../config/db");

class Sala {
  static async create(nombre, filas, columnas) {
    const [result] = await db.query(
      "INSERT INTO salas (nombre, filas, columnas) VALUES (?, ?, ?)",
      [nombre, filas, columnas]
    );
    return result;
  }

  static async getAll() {
    const [rows] = await db.query("SELECT * FROM salas");
    return rows;
  }
}

module.exports = Sala;
