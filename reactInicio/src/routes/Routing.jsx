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

export default function Routing() { 
  return (
    <BrowserRouter>
      <AuthProvider> {/* <-- Aquí envolvemos todas las rutas con el Proveedor */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/LOGIN" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPasswordView />} />
          <Route path="/parent-dashboard" element={<ParentDashboard />} />
          <Route path="/mi-hijo-a" element={<ParentDashboard />} />
          <Route path="/mis-comentarios-reportes" element={<ReportsPage />} />
          <Route path="/calendario-de-actividades" element={<CalendarPage />} />
          <Route path="/juegos" element={<MundoJuegosPage />} />
          <Route path="/juegos/trencito-sonoro" element={<TrencitoSonoroPge />} />
          <Route path="/juegos/monstruo-gloton" element={<MonstruoGlotonPage />} />
          <Route path="/juegos/granja-patitos" element={<GranjaPatitosPage />} />
          <Route path="/juegos/secuencia-maestra" element={<SecuenciaMaestraPage />} />
          <Route path="/juegos/sopa-estelar" element={<SopaEstelarPage />} />
          <Route path="/juegos/mercado-numerico" element={<MercadoNumericoPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}