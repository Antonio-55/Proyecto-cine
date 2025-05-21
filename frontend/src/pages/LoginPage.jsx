import React, { useState } from "react";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Alert,
  Paper,
  Stack,
  Grid,
  Box,
} from "@mui/material";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje("");
    try {
      await login(form);
      const token = localStorage.getItem("token");
      const payload = JSON.parse(atob(token.split(".")[1]));
      const rol = payload.rol;
      if (rol === "administrador") {
        navigate("/admin");
      } else {
        navigate("/perfil");
      }
    } catch {
      setMensaje("⚠️ Credenciales incorrectas.");
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
                Login
              </Typography>
              <Typography variant="subtitle1">
                Accede a tu cuenta para continuar
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
                Iniciar sesión
              </Typography>
              <form onSubmit={handleSubmit}>
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
                  Entrar
                </Button>
              </form>

              {mensaje && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {mensaje}
                </Alert>
              )}

              <Typography variant="body2" sx={{ mt: 3, color: "#212121" }}>
                ¿No tienes una cuenta? {" "}
                <Link to="/register" style={{ color: "#E50914", textDecoration: "none" }}>
                  Regístrate aquí
                </Link>
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
