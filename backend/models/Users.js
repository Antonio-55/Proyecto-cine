const db = require("../config/db");
const bcrypt = require("bcryptjs"); // ✅ FALTABA ESTO

class User {
  static async findByEmail(email) {
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  }

  static async create(nombre, email, password, rol = "cliente") {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      "INSERT INTO users (nombre, email, contraseña, rol) VALUES (?, ?, ?, ?)",
      [nombre, email, hashedPassword, rol]
    );
    return result;
  }
}

module.exports = User;
