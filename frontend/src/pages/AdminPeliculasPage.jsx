import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Stack,
} from "@mui/material";
import {
  obtenerPeliculas,
  crearPelicula,
  eliminarPelicula,
} from "../services/peliculaService";

export default function AdminPeliculasPage() {
  const [peliculas, setPeliculas] = useState([]);
  const [form, setForm] = useState({
    titulo: "",
    genero: "",
    sinopsis: "",
    poster_url: "",
  });

  const cargarPeliculas = async () => {
    const data = await obtenerPeliculas();
    setPeliculas(data);
  };

  useEffect(() => {
    cargarPeliculas();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearPelicula(form);
      setForm({ titulo: "", genero: "", sinopsis: "", poster_url: "" });
      cargarPeliculas();
    } catch (error) {
      alert("Error al crear película: " + error.response?.data?.message || error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar esta película?")) return;
    try {
      await eliminarPelicula(id);
      cargarPeliculas();
    } catch (error) {
      alert("Error al eliminar película: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Administrar Películas
      </Typography>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <TextField
          name="titulo"
          label="Título"
          value={form.titulo}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          name="genero"
          label="Género"
          value={form.genero}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          name="sinopsis"
          label="Sinopsis"
          value={form.sinopsis}
          onChange={handleChange}
          multiline
          rows={3}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          name="poster_url"
          label="URL del póster"
          value={form.poster_url}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Crear Película
        </Button>
      </form>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Género</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {peliculas.map((pelicula) => (
              <TableRow key={pelicula.idPeliculas}>
                <TableCell>{pelicula.titulo}</TableCell>
                <TableCell>{pelicula.genero}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(pelicula.idPeliculas)}
                  >
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
}
