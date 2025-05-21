const Reservation = require("../models/Reservation");
const Asiento = require("../models/Asiento");
const db = require("../config/db");

exports.createReservation = async (req, res) => {
  console.log("📨 Backend recibió:", req.body);

  const { funcionId, asientos, fecha } = req.body;

  if (!funcionId || !Array.isArray(asientos) || asientos.length === 0 || !fecha) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }

  try {
    const fechaSQL = fecha.split("T")[0];
    const idsInsertados = [];

    // 1. Obtener la sala de la función
    const [[funcion]] = await db.query(
      `SELECT sala_idSalas FROM funciones WHERE idfunciones = ?`,
      [funcionId]
    );
    const salaId = funcion?.sala_idSalas;
    if (!salaId) return res.status(400).json({ message: "La función no tiene sala asignada" });

    for (const { fila, columna } of asientos) {
      // 2. Verificar si ya existe ese asiento
      const [[asiento]] = await db.query(
        `SELECT * FROM asientos WHERE sala_idSalas = ? AND fila = ? AND columna = ?`,
        [salaId, fila, columna]
      );

      let asientoId;

      if (asiento) {
        asientoId = asiento.idasientos;
      } else {
        // 3. Si no existe, crear el asiento
        const [result] = await db.query(
          `INSERT INTO asientos (sala_idSalas, fila, columna) VALUES (?, ?, ?)`,
          [salaId, fila, columna]
        );
        asientoId = result.insertId;
      }

      // 4. Verificar si ya está reservado en esta función
      const [yaReservado] = await db.query(
        `SELECT * FROM reservacion WHERE funcion_idFunciones = ? AND asiento_idAsientos = ? AND estado IN ('pendiente', 'pagado')`,
        [funcionId, asientoId]
      );

      if (yaReservado.length > 0) {
        return res.status(409).json({ message: `El asiento F${fila}-C${columna} ya está reservado en esta función` });
      }

      // 5. Crear la reservación
      const result = await Reservation.create({
        fecha: fechaSQL,
        userId: req.user.id,
        funcionId,
        asientoId
      });

      idsInsertados.push(result.insertId);
    }

    return res.status(201).json({
      message: "Reservaciones creadas correctamente",
      ids: idsInsertados
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear reservaciones", error });
  }
};

exports.getUserReservations = async (req, res) => {
  try {
    const [reservaciones] = await db.query(`
      SELECT 
        r.idReservacion,
        r.estado,
        f.fecha AS fecha_funcion,
        f.hora,
        p.titulo AS pelicula,
        s.nombre AS sala,
        GROUP_CONCAT(CONCAT(a.fila, '-', a.columna)) AS asientos
      FROM reservacion r
      JOIN funciones f ON r.funcion_idFunciones = f.idfunciones
      JOIN peliculas p ON f.pelicula_idPeliculas = p.idPeliculas
      JOIN salas s ON f.sala_idSalas = s.idSalas
      JOIN asientos a ON r.asiento_idAsientos = a.idasientos
      WHERE r.usuario_idUsuarios = ?
      GROUP BY r.idReservacion
    `, [req.user.id]);

    const resultado = reservaciones.map(r => ({
      ...r,
      asientos: r.asientos ? r.asientos.split(",") : []
    }));

    res.json(resultado);
  } catch (error) {
    console.error("❌ ERROR en getUserReservations:", error);
    res.status(500).json({ message: "Error al obtener reservaciones", error });
  }
};

exports.cancelarReserva = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("UPDATE reservacion SET estado = 'cancelado' WHERE idReservacion = ?", [id]);
    res.json({ message: "Reserva cancelada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al cancelar", error });
  }
};



exports.confirmarPago = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query("UPDATE reservacion SET estado = 'pagado' WHERE idReservacion = ?", [id]);
    res.json({ message: "Reserva marcada como pagada" });
  } catch (error) {
    res.status(500).json({ message: "Error al confirmar pago", error });
  }
};


