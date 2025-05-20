import React, { useEffect, useState } from "react";
import { getPerfil, logout } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import palette from "../theme/palette";

export default function PerfilPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      const data = await getPerfil();
      setUser(data);
    };
    fetchPerfil();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return <Typography>Cargando perfil...</Typography>;

  return (
    <Box p={4} sx={{ backgroundColor: palette.background, minHeight: "100vh" }}>
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

      {/* Opciones según rol */}
      {user.rol === "cliente" && (
        <Box mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/cliente/cartelera")}
          >
            Ver Cartelera
          </Button>
        </Box>
      )}

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
