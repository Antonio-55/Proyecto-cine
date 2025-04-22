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
  obtenerSalas,
  crearSala,
  editarSala,
  eliminarSala,
} from "../services/salaService";

export default function AdminSalasPage() {
  const [salas, setSalas] = useState([]);
  const [form, setForm] = useState({ nombre: "", filas: "", columnas: "" });
  const [editando, setEditando] = useState(null);

  const cargarSalas = async () => {
    const data = await obtenerSalas();
    setSalas(data);
  };

  useEffect(() => {
    cargarSalas();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editando) {
        await editarSala(editando, form);
      } else {
        await crearSala(form);
      }
      setForm({ nombre: "", filas: "", columnas: "" });
      setEditando(null);
      cargarSalas();
    } catch (error) {
      alert("Error al guardar sala: " + error.response?.data?.message || error.message);
    }
  };

  const handleEdit = (sala) => {
    setForm({ nombre: sala.nombre, filas: sala.filas, columnas: sala.columnas });
    setEditando(sala.idSalas);
  };

  const handleDelete = async (id) => {
    console.log("🗑️ ID que se va a eliminar:", id);
    if (!id || id === "undefined") {
      alert("ID no válido");
      return;
    }
    try {
      await eliminarSala(id);
      cargarSalas();
    } catch (err) {
      alert("Error al eliminar sala: " + err.response?.data?.message || err.message);
    }
  };

  const handleCancelEdit = () => {
    setForm({ nombre: "", filas: "", columnas: "" });
    setEditando(null);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Administrar Salas
      </Typography>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <TextField
          name="nombre"
          label="Nombre"
          value={form.nombre}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          name="filas"
          label="Filas"
          type="number"
          value={form.filas}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          name="columnas"
          label="Columnas"
          type="number"
          value={form.columnas}
          onChange={handleChange}
          required
          fullWidth
          margin="normal"
        />
        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            {editando ? "Actualizar sala" : "Crear sala"}
          </Button>
          {editando && (
            <Button variant="outlined" color="secondary" fullWidth onClick={handleCancelEdit}>
              Cancelar
            </Button>
          )}
        </Stack>
      </form>

      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Filas</TableCell>
              <TableCell>Columnas</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {salas.map((sala, index) => (
              <TableRow key={index}>
                <TableCell>{sala.nombre}</TableCell>
                <TableCell>{sala.filas}</TableCell>
                <TableCell>{sala.columnas}</TableCell>
                <TableCell>
                  <Button
                    variant="outlined"
                    onClick={() => handleEdit(sala)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDelete(sala.idSalas)}
                    style={{ marginLeft: 8 }}
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
