import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PerfilPage from "./pages/PerfilPage";
import RequireAuth from "./components/RequireAuth";
import AdminSalasPage from "./pages/AdminSalasPage";
import AdminPeliculasPage from "./pages/AdminPeliculasPage";
import AdminFuncionesPage from "./pages/AdminFuncionesPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import CarteleraPage from "./pages/CarteleraPage";
import ReservarPage from "./pages/ReservarPage";
import PagoPage from "./pages/PagoPage";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<CarteleraPage />} />
        <Route path="/reservar/:id" element={<ReservarPage />} />
        <Route path="/pago" element={<PagoPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas protegidas */}
        <Route path="/perfil" element={
          <RequireAuth>
            <PerfilPage />
          </RequireAuth>
        } />
        <Route
          path="/admin/salas"
          element={
            <RequireAuth>
              <AdminSalasPage />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/peliculas"
          element={
            <RequireAuth>
              <AdminPeliculasPage />
            </RequireAuth>
          }
        />
        <Route
          path="/admin/funciones"
          element={
            <RequireAuth>
              <AdminFuncionesPage />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <AdminPanelPage />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
