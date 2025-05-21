import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CardMedia,
  Alert,
  Modal,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  maxHeight: "80vh",
  overflowY: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const CarteleraPage = () => {
  const [peliculas, setPeliculas] = useState([]);
  const [funciones, setFunciones] = useState([]);
  const [peliculaSeleccionada, setPeliculaSeleccionada] = useState(null);
  const [errorFunciones, setErrorFunciones] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
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
    setModalOpen(true);

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
          <Box
            key={pelicula.idPeliculas}
            width="300px"
            m={2}
            style={{ height: "100%" }}
          >
            <Card style={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardMedia
                component="img"
                height="400"
                image={pelicula.poster_url}
                alt={pelicula.titulo}
              />
              <CardContent style={{ flexGrow: 1 }}>
                <Typography variant="h6">{pelicula.titulo}</Typography>
                <Typography variant="body2" gutterBottom noWrap>
                  {pelicula.sinopsis}
                </Typography>
              </CardContent>
              <CardContent>
                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => handleSeleccionarPelicula(pelicula)}
                >
                  Ver funciones
                </Button>
              </CardContent>
            </Card>
          </Box>
        ))}
      </Box>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        aria-labelledby="modal-funciones"
      >
        <Box sx={modalStyle}>
          {peliculaSeleccionada && (
            <>
              <Typography variant="h6" gutterBottom>
                Funciones para {peliculaSeleccionada.titulo}
              </Typography>

              {errorFunciones ? (
                <Alert severity="warning" sx={{ mb: 2 }}>
                  {errorFunciones}
                </Alert>
              ) : (
                funciones.map((f) => (
                  <Card key={f.idFuncion} sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography>Sala: {f.sala}</Typography>
                      <Typography>Fecha: {formatFecha(f.fecha)}</Typography>
                      <Typography>Hora: {f.hora}</Typography>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{ mt: 1 }}
                        onClick={() => navigate(`/reservar/${f.idFuncion}`)}
                      >
                        Reservar
                      </Button>
                    </CardContent>
                  </Card>
                ))
              )}
              <Button fullWidth sx={{ mt: 2 }} onClick={() => setModalOpen(false)}>
                Cerrar
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default CarteleraPage;
