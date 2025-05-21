import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PerfilPage from "./pages/PerfilPage";
import CarteleraPage from "./pages/CarteleraPage";
import ReservarPage from "./pages/ReservarPage";
import PagoPage from "./pages/PagoPage";

// Admin
import AdminPanelPage from "./pages/AdminPanelPage";
import AdminFuncionesPage from "./pages/AdminFuncionesPage";
import AdminPeliculasPage from "./pages/AdminPeliculasPage";
import AdminSalasPage from "./pages/AdminSalasPage";
import AdminPanelTabs from "./pages/AdminPanelTabs";


// Protección por rol
import RutaPrivada from "./components/RutaPrivada";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Cliente */}
      <Route path="/perfil" element={
        <RutaPrivada rolPermitido="cliente">
          <PerfilPage />
        </RutaPrivada>
      } />
      <Route path="/cliente/cartelera" element={
        <RutaPrivada rolPermitido="cliente">
          <CarteleraPage />
        </RutaPrivada>
      } />
      <Route path="/reservar/:id" element={
        <RutaPrivada rolPermitido="cliente">
          <ReservarPage />
        </RutaPrivada>
      } />
      <Route path="/pago" element={
        <RutaPrivada rolPermitido="cliente">
          <PagoPage />
        </RutaPrivada>
      } />

      {/* Admin */}
  
      <Route
        path="/admin"
        element={
          <RutaPrivada rolPermitido="administrador">
            <AdminPanelTabs />  {/* ✅ el componente correcto con tabs */}
          </RutaPrivada>
        }
      />

      <Route path="/admin/funciones" element={
        <RutaPrivada rolPermitido="administrador">
          <AdminFuncionesPage />
        </RutaPrivada>
      } />
      <Route path="/admin/peliculas" element={
        <RutaPrivada rolPermitido="administrador">
          <AdminPeliculasPage />
        </RutaPrivada>
      } />
      <Route path="/admin/salas" element={
        <RutaPrivada rolPermitido="administrador">
          <AdminSalasPage />
        </RutaPrivada>
      } />

      {/* Fallback */}
      <Route path="*" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
