import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Box, Typography, Button, Alert } from "@mui/material";
import palette from "../theme/palette";

const PagoPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [pagado, setPagado] = useState(false);

  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  if (!state) return null;

  const { funcion, asientosSeleccionados, total } = state;

  const handlePagar = async () => {
    try {
      // Simulación de confirmación de pago
      // Aquí podrías hacer un PATCH o PUT al backend para marcar la reservación como "pagado"
      setPagado(true);
      setTimeout(() => {
        navigate("/perfil");
      }, 3000);
    } catch (error) {
      console.error("Error al procesar pago", error);
    }
  };

  return (
    <Box p={4} sx={{ backgroundColor: palette.background, minHeight: "100vh" }}>
      <Typography variant="h5" color={palette.primary} gutterBottom>
        Confirmar Pago
      </Typography>

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
        <Typography color={palette.text}><strong>Total a pagar:</strong> Q{total}.00</Typography>
      </Box>

      <Box mt={4}>
        <Button
          variant="contained"
          sx={{ backgroundColor: palette.primary }}
          onClick={handlePagar}
          disabled={pagado}
        >
          Pagar ahora
        </Button>
      </Box>

      {pagado && (
        <Box mt={3}>
          <Alert severity="success">
            ¡Pago confirmado! Serás redirigido a la página principal...
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default PagoPage;
