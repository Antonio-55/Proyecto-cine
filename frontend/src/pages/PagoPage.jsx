import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Alert,
  TextField,
  CircularProgress,
  Paper,
} from "@mui/material";
import palette from "../theme/palette";

const PagoPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [pagado, setPagado] = useState(false);
  const [procesando, setProcesando] = useState(false);

  // Campos del formulario
  const [tarjeta, setTarjeta] = useState("");
  const [nombre, setNombre] = useState("");
  const [vencimiento, setVencimiento] = useState("");
  const [cvv, setCvv] = useState("");

  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  if (!state) return null;

  const { funcion, asientosSeleccionados, total, idsReservaciones } = state;

  const handlePagar = async () => {
    // Validación básica
    if (!tarjeta || !nombre || !vencimiento || !cvv) {
      alert("Por favor completa todos los campos.");
      return;
    }

    setProcesando(true);

    try {
      const token = localStorage.getItem("token");

      const idsArray = Array.isArray(idsReservaciones)
        ? idsReservaciones
        : [idsReservaciones];

      // Simular tiempo de procesamiento
      for (const id of idsArray) {
        await fetch(`http://localhost:4000/api/reservations/${id}/pagar`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      setTimeout(() => {
        setPagado(true);
        setProcesando(false);
        setTimeout(() => {
          navigate("/perfil");
        }, 3000);
      }, 2000); // Simula 2 segundos de espera

    } catch (error) {
      console.error("Error al procesar pago", error);
      alert("Ocurrió un error al procesar el pago.");
      setProcesando(false);
    }
  };

  return (
    <Box p={4} sx={{ backgroundColor: palette.background, minHeight: "100vh" }}>
      <Typography variant="h5" color={palette.primary} gutterBottom>
        Confirmar Pago
      </Typography>

      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography color={palette.text}><strong>Película:</strong> {funcion.pelicula}</Typography>
        <Typography color={palette.text}><strong>Sala:</strong> {funcion.sala}</Typography>
        <Typography color={palette.text}><strong>Fecha:</strong> {funcion.fecha}</Typography>
        <Typography color={palette.text}><strong>Hora:</strong> {funcion.hora}</Typography>

        <Box mt={2}>
          <Typography color={palette.text}><strong>Asientos:</strong></Typography>
          <Box display="flex" gap={1} flexWrap="wrap" mt={1}>
            {asientosSeleccionados.map((a, idx) => {
              const etiqueta = `${String.fromCharCode(64 + a.fila)}${a.columna}`;
              return (
                <Box
                  key={idx}
                  sx={{
                    backgroundColor: palette.selected,
                    color: "#fff",
                    borderRadius: "6px",
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.8rem",
                  }}
                >
                  {etiqueta}
                </Box>
              );
            })}
          </Box>
        </Box>

        <Box mt={3}>
          <Typography color={palette.text}><strong>Total:</strong> Q{total}.00</Typography>
        </Box>
      </Paper>

      <Typography variant="h6" mb={2} color={palette.text}>
        Detalles de tarjeta
      </Typography>

      <Box display="flex" flexDirection="column" gap={2} maxWidth="400px">
        <TextField
          label="Número de tarjeta"
          variant="outlined"
          value={tarjeta}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "").slice(0, 16); // solo números, máx 16
            const formatted = raw.replace(/(.{4})/g, "$1 ").trim(); // agrupar de 4 en 4
            setTarjeta(formatted);
          }}
          placeholder="1234 5678 9012 3456"
          inputProps={{ maxLength: 19 }}
        />

        <TextField
          label="Nombre del titular"
          variant="outlined"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <TextField
          label="Fecha de vencimiento"
          variant="outlined"
          value={vencimiento}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
            const formatted = raw.replace(/^(\d{2})(\d{0,2})$/, (_, m, y) => (y ? `${m}/${y}` : m));
            setVencimiento(formatted);
          }}
          placeholder="MM/AA"
          inputProps={{ maxLength: 5 }}
        />

        <TextField
          label="CVV"
          variant="outlined"
          type="password"
          value={cvv}
          onChange={(e) => {
            const raw = e.target.value.replace(/\D/g, "").slice(0, 4); // máx 4 dígitos numéricos
            setCvv(raw);
          }}
          placeholder="123"
          inputProps={{ maxLength: 4 }}
        />
      </Box>


      <Box mt={4}>
        <Button
          variant="contained"
          sx={{ backgroundColor: palette.primary }}
          onClick={handlePagar}
          disabled={pagado || procesando}
        >
          {procesando ? "Procesando..." : "Pagar ahora"}
        </Button>
      </Box>

      {procesando && (
        <Box mt={3}>
          <CircularProgress size={28} />
        </Box>
      )}

      {pagado && (
        <Box mt={3}>
          <Alert severity="success">
            ¡Pago confirmado! Serás redirigido al perfil...
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default PagoPage;
