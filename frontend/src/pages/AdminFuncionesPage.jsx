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
} from "@mui/material";
import {
  obtenerFunciones,
  crearFuncion,
  obtenerSalas,
  obtenerPeliculas,
} from "../services/funcionService"; // Asegúrate de tener este archivo

export default function AdminFuncionesPage() {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [salaId, setSalaId] = useState("");
  const [peliculaId, setPeliculaId] = useState("");
  const [funciones, setFunciones] = useState([]);
  const [salas, setSalas] = useState([]);
  const [peliculas, setPeliculas] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const [funcionesRes, salasRes, peliculasRes] = await Promise.all([
          obtenerFunciones(),
          obtenerSalas(),
          obtenerPeliculas(),
        ]);
        setFunciones(funcionesRes);
        setSalas(salasRes);
        setPeliculas(peliculasRes);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };
    cargarDatos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await crearFuncion({ fecha, hora, sala_idSalas: salaId, pelicula_idPeliculas: peliculaId });
      const funcionesActualizadas = await obtenerFunciones();
      setFunciones(funcionesActualizadas);
      setFecha("");
      setHora("");
      setSalaId("");
      setPeliculaId("");
    } catch (error) {
      console.error("Error al crear función:", error);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        Administrar Funciones
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Fecha"
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Hora"
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          select
          label="Sala"
          value={salaId}
          onChange={(e) => setSalaId(e.target.value)}
          fullWidth
          margin="normal"
          required
        >
          {salas.map((sala) => (
            <MenuItem key={sala.idSalas} value={sala.idSalas}>
              {sala.nombre}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          select
          label="Película"
          value={peliculaId}
          onChange={(e) => setPeliculaId(e.target.value)}
          fullWidth
          margin="normal"
          required
        >
          {peliculas.map((p) => (
            <MenuItem key={p.idPeliculas} value={p.idPeliculas}>
              {p.titulo}
            </MenuItem>
          ))}
        </TextField>
        <Button variant="contained" type="submit" color="primary" fullWidth sx={{ mt: 2 }}>
          Crear Función
        </Button>
      </form>

      <Paper sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Hora</TableCell>
              <TableCell>Sala</TableCell>
              <TableCell>Película</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {funciones.map((f) => (
              <TableRow key={f.idfunciones}>
                <TableCell>{f.fecha}</TableCell>
                <TableCell>{f.hora}</TableCell>
                <TableCell>{f.nombreSala}</TableCell>
                <TableCell>{f.tituloPelicula}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
