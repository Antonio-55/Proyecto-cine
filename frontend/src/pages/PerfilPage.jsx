import React, { useEffect, useState } from "react";
import { getPerfil, logout } from "../services/authService";
import { useNavigate } from "react-router-dom";

export default function PerfilPage() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPerfil = async () => {
      const data = await getPerfil();
      setUser(data);
    };
    fetchPerfil();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div>
      <h2>Perfil</h2>
      <p><strong>Nombre:</strong> {user.nombre}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Rol:</strong> {user.rol}</p>

      <button onClick={handleLogout} style={{ marginTop: "15px" }}>
        Cerrar sesión
      </button>

      {/* ✅ Solo visible si el rol es administrador */}
      {user.rol === "administrador" && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={() => navigate("/admin/salas")}>
            Ir al panel de administración
          </button>
        </div>
      )}
    </div>
  );
}


