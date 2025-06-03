require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

const db = pool.promise(); 

// Solo para mensaje en consola 
db.getConnection()
  .then(() => console.log(" Conectado a la base de datos MySQL"))
  .catch((err) => console.error(" Error conectando a MySQL:", err));

module.exports = db;
