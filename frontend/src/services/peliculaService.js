import axios from "axios";
import { getToken } from "./authService";

const API = "http://localhost:4000/api/peliculas";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

export const obtenerPeliculas = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const crearPelicula = async (data) => {
  const res = await axios.post(API, data, authHeader());
  return res.data;
};

export const eliminarPelicula = async (id) => {
  const res = await axios.delete(`${API}/${id}`, authHeader());
  return res.data;
};
