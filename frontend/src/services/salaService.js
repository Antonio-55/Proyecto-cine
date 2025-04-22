import axios from "axios";
import { getToken } from "./authService";

const API = "http://localhost:4000/api/salas";

const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

export const obtenerSalas = async () => {
  const response = await axios.get(API);
  return response.data;
};

export const crearSala = async (data) => {
  const response = await axios.post(API, data, authHeader());
  return response.data;
};

export const editarSala = async (id, data) => {
  const response = await axios.put(`${API}/${id}`, data, authHeader());
  return response.data;
};

export const eliminarSala = async (id) => {
  const response = await axios.delete(`${API}/${id}`, authHeader());
  return response.data;
};
