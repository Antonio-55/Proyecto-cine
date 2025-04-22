import axios from "axios";
import { getToken } from "./authService";

const API = "http://localhost:4000/api/funciones";
const API_SALAS = "http://localhost:4000/api/salas";
const API_PELICULAS = "http://localhost:4000/api/peliculas";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

export const obtenerFunciones = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const crearFuncion = async (data) => {
  const res = await axios.post(API, data, authHeader());
  return res.data;
};

export const obtenerSalas = async () => {
  const res = await axios.get(API_SALAS);
  return res.data;
};

export const obtenerPeliculas = async () => {
  const res = await axios.get(API_PELICULAS);
  return res.data;
};

export const eliminarFuncion = async (id) => {
    const res = await axios.delete(`${API}/${id}`, authHeader());
    return res.data;
  };