import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext'; // Asegúrate de que la ruta a tu AuthProvider sea correcta
import Home from '../pages/Home';
import Login from "../pages/AuthView";
import ForgotPasswordView from '../pages/ForgotPasswordView';
import { ParentDashboard } from '../pages/ParentDashboard';
import { ReportsPage } from '../pages/ReportsPage';
import { CalendarPage } from '../pages/CalendarPage';
import { MundoJuegosPage } from '../pages/MundoJuegosPage';
import { TrencitoSonoroPge } from '../pages/TrencitoSonoroPge';
import { MonstruoGlotonPage } from '../pages/MonstruoGlotonPage';
import { GranjaPatitosPage } from '../pages/GranjaPatitosPage';
import { SecuenciaMaestraPage } from '../pages/SecuenciaMaestraPage';
import { SopaEstelarPage } from '../pages/SopaEstelarPage';
import { MercadoNumericoPage } from '../pages/MercadoNumericoPage';
import { StarAdminPage } from '../pages/StarAdminPage';
import { PremiosPage } from '../pages/PremiosPage';
import { AdminDashboardPage } from '../pages/AdminDashboardPage';
import { OwnerDashboardPage } from '../pages/OwnerDashboardPage';
import { CancionesPage } from '../pages/CancionesPage';
import { PrivateRoute } from './PrivateRoute';

export default function Routing() { 
  return (
    <BrowserRouter>
      <AuthProvider> {/* <-- Aquí envolvemos todas las rutas con el Proveedor */}
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/LOGIN" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPasswordView />} />

          {/* Rutas Privadas */}
          <Route path="/parent-dashboard" element={<PrivateRoute><ParentDashboard /></PrivateRoute>} />
          <Route path="/mi-hijo-a" element={<PrivateRoute><ParentDashboard /></PrivateRoute>} />
          <Route path="/mis-comentarios-reportes" element={<PrivateRoute><ReportsPage /></PrivateRoute>} />
          <Route path="/calendario-de-actividades" element={<PrivateRoute><CalendarPage /></PrivateRoute>} />
          <Route path="/juegos" element={<PrivateRoute><MundoJuegosPage /></PrivateRoute>} />
          <Route path="/juegos/trencito-sonoro" element={<PrivateRoute><TrencitoSonoroPge /></PrivateRoute>} />
          <Route path="/juegos/monstruo-gloton" element={<PrivateRoute><MonstruoGlotonPage /></PrivateRoute>} />
          <Route path="/juegos/granja-patitos" element={<PrivateRoute><GranjaPatitosPage /></PrivateRoute>} />
          <Route path="/juegos/secuencia-maestra" element={<PrivateRoute><SecuenciaMaestraPage /></PrivateRoute>} />
          <Route path="/juegos/sopa-estelar" element={<PrivateRoute><SopaEstelarPage /></PrivateRoute>} />
          <Route path="/juegos/mercado-numerico" element={<PrivateRoute><MercadoNumericoPage /></PrivateRoute>} />
          <Route path="/admin-estrellas" element={<PrivateRoute><StarAdminPage /></PrivateRoute>} />
          <Route path="/mis-estrellas" element={<PrivateRoute><StarAdminPage /></PrivateRoute>} />
          <Route path="/juegos/puntuaciones" element={<PrivateRoute><StarAdminPage /></PrivateRoute>} />
          <Route path="/premios" element={<PrivateRoute><PremiosPage /></PrivateRoute>} />
          <Route path="/canciones" element={<PrivateRoute><CancionesPage /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><AdminDashboardPage /></PrivateRoute>} />
          <Route path="/owner-dashboard" element={<PrivateRoute><OwnerDashboardPage /></PrivateRoute>} />
          <Route path="/owner" element={<PrivateRoute><OwnerDashboardPage /></PrivateRoute>} />
          <Route path="/dueno-dashboard" element={<PrivateRoute><OwnerDashboardPage /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}