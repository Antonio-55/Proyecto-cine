// src/components/RutaPrivada.jsx
import { Navigate } from "react-router-dom";

const RutaPrivada = ({ children, rolPermitido }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const rol = payload.rol;

    if (rol !== rolPermitido) {
      return <Navigate to="/login" />;
    }

    return children;
  } catch (error) {
    console.error("Error al verificar token:", error);
    return <Navigate to="/login" />;
  }
};

export default RutaPrivada;
