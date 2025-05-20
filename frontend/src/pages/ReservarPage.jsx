import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Box, Button, CircularProgress } from "@mui/material";
import palette from "../theme/palette";

const ReservarPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [funcion, setFuncion] = useState(null);
  const [asientos, setAsientos] = useState([]);
  const [cantidadAsientos, setCantidadAsientos] = useState(1);
  const [asientosSeleccionados, setAsientosSeleccionados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resFuncion = await fetch(`http://localhost:4000/api/funciones/${id}`);
        const dataFuncion = await resFuncion.json();
        setFuncion(dataFuncion);

        const resAsientos = await fetch(`http://localhost:4000/api/funciones/${id}/asientos`);
        const dataAsientos = await resAsientos.json();
        setAsientos(dataAsientos);
        setLoading(false);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    cargarDatos();
  }, [id]);

  const handleReservar = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para reservar.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          funcionId: Number(id),
          asientos: asientosSeleccionados,
          fecha: funcion?.fecha?.split("T")[0],
        }),
      });

      const data = await res.json();
      if (res.status === 201 && data.ids?.length > 0) {
        navigate("/pago", {
          state: {
            funcion,
            asientosSeleccionados,
            reservacionIds: data.ids,
            total: asientosSeleccionados.length * 47,
          },
        });
      } else {
        alert(data.message || "Error al reservar");
      }

    } catch (err) {
      console.error(err);
      alert("Error inesperado al reservar.");
    }
  };

  if (loading || !funcion) return <CircularProgress />;

  return (
    <Box p={3} sx={{ backgroundColor: palette.background, minHeight: "100vh" }}>
      <Typography variant="h5" gutterBottom color={palette.secondary}>
        Reservar función: {funcion.pelicula}
      </Typography>
      <Typography color={palette.text}>Sala: {funcion.sala}</Typography>
      <Typography color={palette.text}>Fecha: {funcion.fecha}</Typography>
      <Typography color={palette.text}>Hora: {funcion.hora}</Typography>

      <Box my={3}>
        <Typography color={palette.text}>¿Cuántos asientos deseas reservar?</Typography>
        <input
          type="number"
          min={1}
          max={10}
          value={cantidadAsientos}
          onChange={(e) => {
            setCantidadAsientos(Number(e.target.value));
            setAsientosSeleccionados([]);
          }}
        />
      </Box>

      <Box my={2}>
        <Typography variant="h6" mb={1} color={palette.text}>Selecciona tus asientos:</Typography>

        <Typography variant="subtitle2" mb={2} color={palette.text}>
          <span style={{ color: "#1976d2" }}>🟦</span> Disponible &nbsp;
          <span style={{ color: palette.selected }}>🟧</span> Seleccionado &nbsp;
          <span style={{ color: palette.reserved }}>🟥</span> Reservado
        </Typography>

        <Box
          sx={{
            backgroundColor: "#cfd8dc",
            width: "60%",
            height: "20px",
            margin: "auto",
            borderRadius: "8px",
            textAlign: "center",
            lineHeight: "20px",
            fontWeight: "bold",
            color: "#333",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
        >
          🎬 Pantalla
        </Box>

        <Box
          display="grid"
          gridTemplateColumns={`repeat(${funcion.columnas}, 1fr)`}
          gap={1}
          maxWidth="fit-content"
          margin="20px auto"
        >
          {(() => {
            const reservados = new Set(
              asientos
                .filter((a) => a.estado === "pendiente" || a.estado === "pagado")
                .map((a) => `${a.fila}-${a.columna}`)
            );

            const seleccionados = new Set(
              asientosSeleccionados.map((a) => `${a.fila}-${a.columna}`)
            );

            const botones = [];

            for (let fila = 1; fila <= funcion.filas; fila++) {
              for (let columna = 1; columna <= funcion.columnas; columna++) {
                const clave = `${fila}-${columna}`;
                const reservado = reservados.has(clave);
                const seleccionado = seleccionados.has(clave);
                const etiqueta = `${String.fromCharCode(64 + fila)}${columna}`;

                botones.push(
                  <Box
                    key={clave}
                    onClick={() => {
                      if (reservado) return;
                      if (seleccionado) {
                        setAsientosSeleccionados((prev) =>
                          prev.filter((x) => `${x.fila}-${x.columna}` !== clave)
                        );
                      } else if (asientosSeleccionados.length < cantidadAsientos) {
                        setAsientosSeleccionados((prev) => [
                          ...prev,
                          { fila, columna },
                        ]);
                      }
                    }}
                    sx={{
                      width: 40,
                      height: 45,
                      borderRadius: "6px 6px 2px 2px",
                      backgroundColor: reservado
                        ? "#B0BEC5"
                        : seleccionado
                        ? palette.selected
                        : "#1976D2",
                      color: "#fff",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      fontSize: "0.75rem",
                      cursor: reservado ? "not-allowed" : "pointer",
                      userSelect: "none",
                      boxShadow: reservado
                        ? "inset 0 -2px 4px rgba(0,0,0,0.3)"
                        : "0 2px 4px rgba(0,0,0,0.2)",
                      transition: "all 0.2s ease",
                      position: "relative",
                      "&:hover": {
                        transform: reservado ? "none" : "scale(1.05)",
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: "12px",
                        backgroundColor: reservado
                          ? "#90A4AE"
                          : seleccionado
                          ? "#FFA000"
                          : "#1565C0",
                        borderTopLeftRadius: "6px",
                        borderTopRightRadius: "6px",
                      },
                    }}
                  >
                    {etiqueta}
                  </Box>
                );
              }
            }

            return botones;
          })()}
        </Box>
      </Box>

      <Box mt={3}>
        <Button
          variant="contained"
          sx={{ backgroundColor: palette.success }}
          disabled={asientosSeleccionados.length !== cantidadAsientos}
          onClick={handleReservar}
        >
          Continuar a pago
        </Button>
      </Box>
    </Box>
  );
};

export default ReservarPage;
