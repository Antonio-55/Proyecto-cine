import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CarteleraPage = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [funciones, setFunciones] = useState([]);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
  const [errorFunciones, setErrorFunciones] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPeliculas = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/peliculas");
        const data = await res.json();
        setPeliculas(data);
      } catch (error) {
        console.error("Error al obtener películas:", error);
      }
    };

    fetchPeliculas();
  }, []);

  const handleSeleccionarPelicula = async (pelicula) => {
    setPeliculaSeleccionada(pelicula);
    setErrorFunciones(null);
    setFunciones([]);

    try {
      const res = await fetch(
        `http://localhost:4000/api/funciones/pelicula/${pelicula.idPeliculas}`
      );

      if (!res.ok) {
        const errorData = await res.json();
        setErrorFunciones(errorData.message || "No se encontraron funciones");
        return;
      }

      const data = await res.json();
      setFunciones(data);
    } catch (error) {
      console.error("Error al obtener funciones:", error);
      setErrorFunciones("Error al obtener funciones del servidor");
    }
  };

  const formatFecha = (fechaISO) => {
    const date = new Date(fechaISO);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h4" gutterBottom>
        Cartelera
      </Typography>

      <Box display="flex" flexWrap="wrap" justifyContent="flex-start">
        {peliculas.map((pelicula) => (
          <Box key={pelicula.idPeliculas} maxWidth="300px" m={2}>
            <Card>
              <CardMedia
                component="img"
                height="400"
                image={pelicula.poster_url}
                alt={pelicula.titulo}
              />
              <CardContent>
                <Typography variant="h6">{pelicula.titulo}</Typography>
                <Typography variant="body2" gutterBottom>
                  {pelicula.sinopsis}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => handleSeleccionarPelicula(pelicula)}
                >
                  Ver funciones
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      {peliculaSeleccionada && (
        <>
          <Typography variant="h5" gutterBottom mt={4}>
            Funciones disponibles para {peliculaSeleccionada.titulo}
          </Typography>

          {errorFunciones && (
            <Alert severity="warning" sx={{ mt: 2, mb: 2 }}>
              {errorFunciones}
            </Alert>
          )}

          <Box display="flex" flexWrap="wrap" justifyContent="flex-start">
            {funciones.map((f) => (
              <Box key={f.idFuncion} maxWidth="300px" m={2}>
                <Card>
                  <CardContent>
                    <Typography variant="body1">Sala: {f.sala}</Typography>
                    <Typography variant="body2">
                      Fecha: {formatFecha(f.fecha)}
                    </Typography>
                    <Typography variant="body2">Hora: {f.hora}</Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ marginTop: "1rem" }}
                      onClick={() => navigate(`/reservar/${f.idFuncion}`)}
                    >
                      Reservar
                    </Button>
                  </CardContent>
                </Card>
              </Box>
            ))}
          </Box>
        </>
      )}
    </div>
  );
};

export default CarteleraPage;
