const Payment = require("../models/Payment");
const db = require("../config/db"); // ✅ importa la conexión


exports.createPayment = async (req, res) => {
    const { reservacionId, monto, metodo_pago } = req.body;

    if (!reservacionId || !monto || !metodo_pago) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    try {
        await Payment.create({
            userId: req.user.id,
            reservationId: reservacionId,
            monto,
            metodo: metodo_pago
        });
        await db.query(
            `UPDATE reservacion SET estado = 'pagado' WHERE idreservacion = ?`,
            [reservacionId]
        );


        res.status(201).json({ message: "Pago registrado exitosamente" });
    } catch (error) {
        res.status(500).json({ message: "Error al registrar el pago", error });
    }
};
