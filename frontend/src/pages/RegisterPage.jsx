import React, { useState } from "react";
import { register } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  Grid,
  Box,
} from "@mui/material";

export default function RegisterPage() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    try {
      await register(form);
      navigate("/login");
    } catch {
      setMensaje("⚠️ Error al registrarse.");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f0f0f0",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box sx={{ color: "#212121", pl: 2 }}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                Registro
              </Typography>
              <Typography variant="subtitle1">
                Crea una cuenta para comenzar
              </Typography>
              <Typography mt={4}>
                Accede a la plataforma para gestionar funciones, reservar butacas y más.
              </Typography>
              <Button
                variant="contained"
                sx={{ mt: 4, backgroundColor: "#E50914", borderRadius: 999 }}
              >
                Más información
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              elevation={10}
              sx={{
                p: 4,
                borderRadius: 4,
                backgroundColor: "#ffffff",
              }}
            >
              <Typography variant="h5" fontWeight="bold" mb={2} color="#212121">
                Crear cuenta
              </Typography>
              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
                  variant="filled"
                  sx={{ mb: 2, backgroundColor: "white", borderRadius: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="Correo"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  variant="filled"
                  sx={{ mb: 2, backgroundColor: "white", borderRadius: 2 }}
                  required
                />
                <TextField
                  fullWidth
                  label="Contraseña"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  variant="filled"
                  sx={{ mb: 2, backgroundColor: "white", borderRadius: 2 }}
                  required
                />
                <Button
                  type="submit"
                  fullWidth
                  sx={{
                    mt: 2,
                    backgroundColor: "#E50914",
                    color: "white",
                    borderRadius: 999,
                    fontWeight: "bold",
                  }}
                >
                  Registrarse
                </Button>
              </form>

              {mensaje && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {mensaje}
                </Alert>
              )}

              <Typography variant="body2" sx={{ mt: 3, color: "#212121" }}>
                ¿Ya tienes una cuenta? {" "}
                <Link to="/login" style={{ color: "#E50914", textDecoration: "none" }}>
                  Inicia sesión aquí
                </Link>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
