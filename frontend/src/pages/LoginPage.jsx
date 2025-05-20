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
    setMensaje(""); // limpia mensaje anterior
    try {
      await login(form); // Guarda el token
      const token = localStorage.getItem("token");
      const payload = JSON.parse(atob(token.split(".")[1]));
      const rol = payload.rol;

      // Redirigir por rol
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
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Iniciar sesión
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Correo"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Contraseña"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              fullWidth
              required
            />
            <Button type="submit" variant="contained" fullWidth>
              Entrar
            </Button>
          </Stack>
        </form>

        {mensaje && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {mensaje}
          </Alert>
        )}

        <Typography variant="body2" sx={{ mt: 3 }}>
          ¿No tienes una cuenta?{" "}
          <Link to="/register" style={{ color: "#1976D2", textDecoration: "none" }}>
            Regístrate aquí
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}
