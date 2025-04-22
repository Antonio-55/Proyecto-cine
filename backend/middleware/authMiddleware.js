const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
    const token = req.header("Authorization"); // Obtiene el token del header
    if (!token) return res.status(401).json({ message: "Acceso denegado, token no proporcionado" });

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = verified; // Guarda la info del usuario en la request
        next(); // Continúa con la siguiente función
    } catch (error) {
        res.status(400).json({ message: "Token inválido" });
    }
};
