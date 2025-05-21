import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Modal,
  Box,
} from "@mui/material";

const styleModal = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const fixedCardStyle = {
  height: "100%", // Para que todas tengan misma altura
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
};

const Cartelera = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [funcionSeleccionada, setFuncionSeleccionada] = useState(null);

  useEffect(() => {
    const fetchFunciones = async () => {
      try {
        const res = await fetch("http://localhost:3000/funciones");
        const data = await res.json();
        setPeliculas(data);
      } catch (error) {
        console.error("Error al obtener funciones:", error);
      }
    };

    fetchFunciones();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Cartelera
      </Typography>

      <Grid container spacing={3}>
        {peliculas.map((f) => (
          <Grid item xs={12} sm={6} md={4} key={f.id}>
            <Card style={fixedCardStyle}>
              <CardContent>
                <Typography variant="h6">{f.nombre_pelicula}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {f.descripcion || "Sin descripción"}
                </Typography>
              </CardContent>
              <CardContent>
                <Button
                  variant="outlined"
                  onClick={() => setFuncionSeleccionada(f)}
                >
                  Ver funciones
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={!!funcionSeleccionada}
        onClose={() => setFuncionSeleccionada(null)}
        aria-labelledby="modal-funcion"
      >
        <Box sx={styleModal}>
          {funcionSeleccionada && (
            <>
              <Typography variant="h6" id="modal-funcion">
                {funcionSeleccionada.nombre_pelicula}
              </Typography>
              <Typography>Sala: {funcionSeleccionada.nombre_sala}</Typography>
              <Typography>Fecha: {funcionSeleccionada.fecha}</Typography>
              <Typography>Hora: {funcionSeleccionada.hora}</Typography>
              <Button
                sx={{ mt: 2 }}
                variant="contained"
                onClick={() => setFuncionSeleccionada(null)}
              >
                Cerrar
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Cartelera;
