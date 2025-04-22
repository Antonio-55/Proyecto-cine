import React, { useState } from "react";
import { register } from "../services/authService";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function RegisterPage() {
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(form);
      setMensaje("✅ Registro exitoso. Redirigiendo...");
      setTimeout(() => navigate("/login"), 1500); // Redirige automáticamente
    } catch {
      setMensaje("⚠️ Error al registrar.");
    }
  };

  return (
    <div className="auth-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input name="nombre" placeholder="Nombre completo" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Correo electrónico" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Contraseña" onChange={handleChange} required />
        <button type="submit">Registrarse</button>
      </form>
      <p>{mensaje}</p>
    </div>
  );
}
