import axios from "axios";
export const getPerfil = async () => {
  const token = getToken();
  const response = await axios.get("http://localhost:4000/api/users/perfil", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};


const API = "http://localhost:4000/api/auth"; // Usa tu backend real si cambia

export const register = async (datos) => {
  const response = await axios.post(`${API}/register`, datos);
  return response.data;
};

export const login = async (credenciales) => {
  const response = await axios.post(`${API}/login`, credenciales);
  const token = response.data.token;
  if (token) localStorage.setItem("token", token);
  return response.data;
};

export const getToken = () => localStorage.getItem("token");

export const logout = () => localStorage.removeItem("token");
