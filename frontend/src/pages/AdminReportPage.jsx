import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

const AdminReportPage = () => {
  const [reporte, setReporte] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const obtenerReporte = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get("http://localhost:4000/api/admin/report", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = Object.entries(response.data).map(([fecha, valores]) => ({
          fecha,
          ...valores,
        }));

        setReporte(data);
        setLoading(false);
      } catch (error) {
        console.error("Error al obtener el reporte:", error);
        setLoading(false);
      }
    };

    obtenerReporte();
  }, []);

  if (loading) {
    return (
      <Box textAlign="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={3} style={{ padding: 20 }}>
      <Typography variant="h5" gutterBottom>
        Reporte de Actividad (Próximos 8 días)
      </Typography>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell>Butacas reservadas</TableCell>
            <TableCell>Ingresos</TableCell>
            <TableCell>Ingresos perdidos</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reporte.map((dia) => (
            <TableRow key={dia.fecha}>
              <TableCell>{dia.fecha}</TableCell>
              <TableCell>{dia.butacas}</TableCell>
              <TableCell>Q {dia.ingresos.toFixed(2)}</TableCell>
              <TableCell>Q {dia.ingresosPerdidos.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Typography variant="h6" gutterBottom style={{ marginTop: 40 }}>
        Comparación de Ingresos vs Pérdidas
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={reporte}>
          <XAxis dataKey="fecha" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="ingresos" fill="#4caf50" name="Ingresos" />
          <Bar dataKey="ingresosPerdidos" fill="#f44336" name="Ingresos Perdidos" />
        </BarChart>
      </ResponsiveContainer>
    </Paper>
  );
};

export default AdminReportPage;
