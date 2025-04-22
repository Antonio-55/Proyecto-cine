const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

exports.register = async (req, res) => {
    try {
        const { nombre, email, password, rol = "cliente" } = req.body; // Asigna "cliente" si no se envía rol
        const existingUser = await User.findByEmail(email);

        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya existe" });
        }

        await User.create(nombre, email, password, rol);
        res.status(201).json({ message: "Usuario creado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al crear usuario", error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);
        
        if (!user) {
            return res.status(401).json({ message: "Usuario no encontrado" });
        }

        const isValidPassword = await bcrypt.compare(password, user.contraseña);
        if (!isValidPassword) {
            return res.status(401).json({ message: "Credenciales incorrectas" });
        }

        //  Generar token JWT con los datos del usuario
        const token = jwt.sign(
            { id: user.idUsuarios, email: user.email, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: "1h" } // Token válido por 1 hora
        );

        res.status(200).json({ message: "Login exitoso", token });
    } catch (error) {
        res.status(500).json({ message: "Error en el login", error });
    }
};
