const Reservation = require("../models/Reservation");
const Asiento = require("../models/Asiento");


exports.createReservation = async (req, res) => {
    const { funcionId, asientoId, fecha } = req.body;

    if (!funcionId || !asientoId || !fecha) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    try {
        const disponible = await Asiento.estaDisponible(asientoId);

        if (!disponible) {
            return res.status(409).json({ message: "Este asiento ya está reservado" });
        }

        // 1. Crear la reservación
        await Reservation.create({
            fecha,
            userId: req.user.id,
            funcionId,
            asientoId
        });

        // 2. Marcar el asiento como reservado
        await Asiento.marcarComoReservado(asientoId);

        res.status(201).json({ message: "Reservación creada y asiento reservado" });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la reservación", error });
    }
};


exports.getUserReservations = async (req, res) => {
    try {
        const reservaciones = await Reservation.getByUser(req.user.id);
        res.json(reservaciones);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener reservaciones", error });
    }
};
