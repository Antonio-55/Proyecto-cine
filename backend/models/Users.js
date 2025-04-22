const db = require("../config/db");
const bcrypt = require("bcryptjs");

class User {
    static async create(nombre, email, password, rol = "cliente") { // ✅ El rol es opcional
        const hashedPassword = await bcrypt.hash(password, 10);
        return new Promise((resolve, reject) => {
            db.query(
                "INSERT INTO users (nombre, email, contraseña, rol) VALUES (?, ?, ?, ?)",
                [nombre, email, hashedPassword, rol],
                (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                }
            );
        });
    }

    static findByEmail(email) {
        return new Promise((resolve, reject) => {
            db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
                if (err) reject(err);
                resolve(results[0]);
            });
        });
    }
}

module.exports = User;
