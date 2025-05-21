import React, { useState } from "react";
import {
  Tabs,
  Tab,
  Box,
  Paper,
  Typography,
  AppBar,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import AdminFuncionesPage from "./AdminFuncionesPage";
import AdminPeliculasPage from "./AdminPeliculasPage";
import AdminSalasPage from "./AdminSalasPage";

export default function AdminPanelTabs() {
  const [tab, setTab] = useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", p: 3 }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 3,
          borderRadius: 3,
          backgroundColor: "#1976d2",
          color: "white",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h4">Panel de Administración</Typography>
          <Button variant="contained" color="error" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </Box>

        <AppBar
          position="static"
          color="default"
          sx={{ mt: 2, borderRadius: 1, backgroundColor: "#eeeeee" }}
        >
          <Tabs
            value={tab}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            sx={{
              ".MuiTab-root": { fontWeight: "bold" },
              ".Mui-selected": { color: "#1976d2 !important" },
            }}
          >
            <Tab label="🎭 Funciones" />
            <Tab label="🎬 Películas" />
            <Tab label="🪑 Salas" />
          </Tabs>
        </AppBar>
      </Paper>

      <Paper elevation={2} sx={{ p: 3, borderRadius: 3, backgroundColor: "#ffffff" }}>
        {tab === 0 && <AdminFuncionesPage />}
        {tab === 1 && <AdminPeliculasPage />}
        {tab === 2 && <AdminSalasPage />}
      </Paper>
    </Box>
  );
}
