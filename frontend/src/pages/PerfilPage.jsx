import React, { useEffect, useState } from "react";
import { getPerfil, logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  Divider,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  Grid,
} from "@mui/material";
import { QRCodeCanvas } from "qrcode.react";
import palette from "../theme/palette";

// Formateadores
function formatearFecha(fechaStr) {
  const fecha = new Date(fechaStr);
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(fecha);
}

function formatearHora(horaStr) {
  const [h, m] = horaStr.split(":");
  return `${h}:${m}`;
}

export default function PerfilPage() {
  const [user, setUser] = useState(null);
  const [reservas, setReservas] = useState([]);
  const [qrReserva, setQrReserva] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const data = await getPerfil();
        setUser(data);

        if (data.rol === "cliente") {
          const token = localStorage.getItem("token");
          const res = await fetch("http://localhost:4000/api/reservations", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const dataReservas = await res.json();
          setReservas(dataReservas);
        }
      } catch (error) {
        console.error("Error al cargar perfil o reservas:", error);
      }
    };

    fetchPerfil();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const cancelarReserva = async (idReservacion) => {
    const confirmar = window.confirm("¿Seguro que quieres cancelar esta reserva?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:4000/api/reservations/${idReservacion}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setReservas((prev) =>
        prev.filter((r) => r.idReservacion !== idReservacion)
      );
    } catch (error) {
      alert("Error al cancelar la reserva");
      console.error(error);
    }
  };

  const mostrarQR = (reserva) => {
    setQrReserva(reserva);
  };

  const cerrarQR = () => {
    setQrReserva(null);
  };

  if (!user) return <Typography>Cargando perfil...</Typography>;

  return (
    <Box p={4} sx={{ backgroundColor: palette.background, minHeight: "100vh" }}>
      {/* PERFIL */}
      <Paper elevation={3} sx={{ p: 3, maxWidth: 600, margin: "0 auto" }}>
        <Typography variant="h4" gutterBottom>
          Perfil
        </Typography>

        <Typography><strong>Nombre:</strong> {user.nombre}</Typography>
        <Typography><strong>Email:</strong> {user.email}</Typography>
        <Typography><strong>Rol:</strong> {user.rol}</Typography>

        <Box mt={3}>
          <Button variant="outlined" color="error" onClick={handleLogout}>
            Cerrar sesión
          </Button>
        </Box>

        {user.rol === "cliente" && (
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/cliente/cartelera")}
            >
              Ver Cartelera
            </Button>
          </Box>
        )}
      </Paper>

      {/* RESERVAS DEL CLIENTE */}
      {user.rol === "cliente" && (
        <Box mt={6}>
          <Typography
            variant="h5"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#d32f2f" }}
          >
            🎟️ Tus Reservas
          </Typography>
          <Divider sx={{ my: 2 }} />

          {/* Resumen */}
          <Box mb={3}>
            <Typography variant="body1">
              📊 <strong>Total de funciones reservadas:</strong> {reservas.length}
            </Typography>
            <Typography variant="body1">
              🎫 <strong>Total de asientos:</strong>{" "}
              {reservas.reduce((acc, r) => acc + r.asientos.length, 0)}
            </Typography>
          </Box>

          {reservas.length === 0 ? (
            <Typography>No tienes reservas aún.</Typography>
          ) : (
            <Grid container spacing={3}>
              {reservas.map((r, index) => (
                <Grid item xs={12} md={6} key={index}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 2,
                      height: "100%",
                      backgroundColor: "#fff",
                      borderLeft: r.estado === "pagado" ? "5px solid green" : "5px solid orange",
                    }}
                  >
                    <Typography><strong>Película:</strong> {r.pelicula}</Typography>
                    <Typography><strong>Sala:</strong> {r.sala}</Typography>
                    <Typography><strong>Fecha:</strong> {formatearFecha(r.fecha_funcion)}</Typography>
                    <Typography><strong>Hora:</strong> {formatearHora(r.hora)}</Typography>

                    <Stack direction="row" spacing={1} my={1}>
                      <Chip
                        label={r.estado.toUpperCase()}
                        color={r.estado === "pagado" ? "success" : "warning"}
                        size="small"
                      />
                    </Stack>

                    <Typography><strong>Asientos:</strong> {r.asientos.join(", ")}</Typography>

                    <Stack direction="row" spacing={1} mt={2}>
                      <Button
                        variant="outlined"
                        color="error"
                        size="small"
                        onClick={() => cancelarReserva(r.idReservacion)}
                      >
                        Cancelar reserva
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        size="small"
                        onClick={() => mostrarQR(r)}
                      >
                        Ver QR
                      </Button>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      )}

      {/* MODAL QR */}
      <Dialog open={Boolean(qrReserva)} onClose={cerrarQR}>
        <DialogTitle>🎟️ Código QR de tu reserva</DialogTitle>
        <DialogContent sx={{ textAlign: "center", pt: 3 }}>
          {qrReserva && (
            <QRCodeCanvas
              value={JSON.stringify({
                pelicula: qrReserva.pelicula,
                sala: qrReserva.sala,
                fecha: qrReserva.fecha_funcion,
                hora: qrReserva.hora,
                asientos: qrReserva.asientos,
              })}
              size={200}
            />
          )}
          <Typography mt={2}>
            Muestra este código al ingresar a la sala.
          </Typography>
        </DialogContent>
      </Dialog>

      {/* PANEL ADMIN */}
      {user.rol === "administrador" && (
        <Box mt={4}>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate("/admin")}
          >
            Ir al panel de administración
          </Button>
        </Box>
      )}
    </Box>
  );
}
