const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes")


const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes); //  Agregar las rutas de autenticación
app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
    res.send("¡Servidor funcionando correctamente con MySQL y Express! 🚀");
});

const PORT =  4000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

const functionRoutes = require("./routes/functionRoutes");
app.use("/api/funciones", functionRoutes);

const movieRoutes = require("./routes/movieRoutes");
app.use("/api/peliculas", movieRoutes);

const salaRoutes = require("./routes/salaRoutes");
app.use("/api/salas", salaRoutes);

const reservationRoutes = require("./routes/reservationRoutes");
app.use("/api/reservations", reservationRoutes);

const paymentRoutes = require("./routes/paymentRoutes");
app.use("/api/payments", paymentRoutes);

const asientoRoutes = require("./routes/asientoRoutes");
app.use("/api", asientoRoutes); 

const adminRoutes = require('./routes/adminRoutes');

app.use('/api/admin', adminRoutes);

