import { Navigate } from "react-router-dom";
import { getToken } from "../services/authService";

export default function RequireAuth({ children }) {
  const token = getToken();
  return token ? children : <Navigate to="/login" />;
}
