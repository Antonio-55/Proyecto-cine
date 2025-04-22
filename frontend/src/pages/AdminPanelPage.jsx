import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Stack } from "@mui/material";

export default function AdminPanelPage() {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Panel de Administración
      </Typography>

      <Stack spacing={2}>
        <Button
          variant="contained"
          onClick={() => navigate("/admin/salas")}
        >
          Gestionar Salas
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/admin/peliculas")}
        >
          Gestionar Películas
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/admin/funciones")}
        >
          Gestionar Funciones
        </Button>
      </Stack>
    </Container>
  );
}
