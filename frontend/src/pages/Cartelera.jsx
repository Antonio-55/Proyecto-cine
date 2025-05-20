import { useEffect, useState } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";

const Cartelera = () => {
  const [funciones, setFunciones] = useState([]);

  useEffect(() => {
    const fetchFunciones = async () => {
      try {
        const res = await fetch("http://localhost:3000/funciones"); // cambia el endpoint si es necesario
        const data = await res.json();
        setFunciones(data);
      } catch (error) {
        console.error("Error al obtener funciones:", error);
      }
    };

    fetchFunciones();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>Cartelera</Typography>
      <Grid container spacing={3}>
        {funciones.map((f) => (
          <Grid item xs={12} md={6} lg={4} key={f.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{f.nombre_pelicula}</Typography>
                <Typography variant="body1">Sala: {f.nombre_sala}</Typography>
                <Typography variant="body2">Fecha: {f.fecha}</Typography>
                <Typography variant="body2">Hora: {f.hora}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Cartelera;
