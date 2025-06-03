const db = require("../config/db");

exports.getAdminReport = async (req, res) => {
  try {
    const [result] = await db.query(`
      SELECT 
        f.fecha,
        COUNT(r.idReservacion) AS butacasReservadas,
        s.filas * s.columnas AS totalButacas,
        45 AS precio,
        (COUNT(r.idReservacion) * 45) AS ingresoGenerado,
        ((s.filas * s.columnas - COUNT(r.idReservacion)) * 45) AS ingresoPerdido
      FROM funciones f
      JOIN salas s ON f.sala_idSalas = s.idSalas
      LEFT JOIN reservacion r ON r.funcion_idFunciones = f.idFunciones AND r.estado = 'pagado'
      WHERE f.fecha >= CURDATE() AND f.fecha < CURDATE() + INTERVAL 8 DAY
      GROUP BY f.idFunciones
    `);

    const reporte = {};

    result.forEach(row => {
      const fecha = new Date(row.fecha).toISOString().split("T")[0];

      if (!reporte[fecha]) {
        reporte[fecha] = {
          butacas: 0,
          ingresos: 0,
          ingresosPerdidos: 0
        };
      }

      reporte[fecha].butacas += row.butacasReservadas;
      reporte[fecha].ingresos += row.ingresoGenerado;
      reporte[fecha].ingresosPerdidos += row.ingresoPerdido;
    });

    res.json(reporte);
  } catch (error) {
    console.error("Error al generar el reporte:", error);
    res.status(500).json({ error: "Error al generar el reporte" });
  }
};
