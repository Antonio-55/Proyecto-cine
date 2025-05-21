import React, { useEffect, useState } from "react";
import {
  TextField,
  Button,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import {
  obtenerFunciones,
  crearFuncion,
  obtenerSalas,
  obtenerPeliculas,
} from "../services/funcionService";

export default function AdminFuncionesPage() {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [salaId, setSalaId] = useState("");
  const [peliculaId, setPeliculaId] = useState("");
  const [funciones, setFunciones] = useState([]);
  const [salas, setSalas] = useState([]);
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    cargarDatos();
  }, []);

  const cargarDatos = async () => {
    const fun = await obtenerFunciones();
    const sal = await obtenerSalas();
    const pel = await obtenerPeliculas();
    setFunciones(fun);
    setSalas(sal);
    setPeliculas(pel);
  };

  const handleCrear = async () => {
    if (!fecha || !hora || !salaId || !peliculaId) {
      alert("Completa todos los campos.");
      return;
    }

    const nuevaFuncion = {
      fecha,
      hora,
      sala_idSalas: salaId,
      pelicula_idPeliculas: peliculaId,
    };

    const creada = await crearFuncion(nuevaFuncion);
    if (creada) {
      await cargarDatos();
      setFecha("");
      setHora("");
      setSalaId("");
      setPeliculaId("");
    }
  };

  return (
    <Box p={4}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3 }}>
        <Typography variant="h5" gutterBottom>
          Crear Nueva Función
        </Typography>

        <Box display="flex" flexWrap="wrap" gap={2} mb={2}>
          <TextField
            label="Fecha"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
          <TextField
            label="Hora"
            type="time"
            InputLabelProps={{ shrink: true }}
            value={hora}
            onChange={(e) => setHora(e.target.value)}
          />
          <TextField
            label="Sala"
            select
            value={salaId}
            onChange={(e) => setSalaId(e.target.value)}
          >
            {salas.map((s) => (
              <MenuItem key={s.idSalas} value={s.idSalas}>
                {s.nombre}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Película"
            select
            value={peliculaId}
            onChange={(e) => setPeliculaId(e.target.value)}
          >
            {peliculas.map((p) => (
              <MenuItem key={p.idPeliculas} value={p.idPeliculas}>
                {p.titulo}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Button
          variant="contained"
          onClick={handleCrear}
          sx={{ px: 4, py: 1, borderRadius: 2 }}
        >
          CREAR FUNCIÓN
        </Button>
      </Paper>

      <Paper elevation={2} sx={{ mt: 4, borderRadius: 3 }}>
        <Typography variant="h6" sx={{ p: 2 }}>
          Funciones Registradas
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell><strong>Fecha</strong></TableCell>
              <TableCell><strong>Hora</strong></TableCell>
              <TableCell><strong>Sala</strong></TableCell>
              <TableCell><strong>Película</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {funciones.map((f) => (
              <TableRow key={f.id}>
                <TableCell>{f.fecha}</TableCell>
                <TableCell>{f.hora}</TableCell>
                <TableCell>{f.sala}</TableCell>
                <TableCell>{f.pelicula}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
