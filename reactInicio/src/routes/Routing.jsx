import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext'; // Asegúrate de que la ruta a tu AuthProvider sea correcta
import Home from '../pages/Home';
import Login from "../pages/AuthView";
import ForgotPasswordView from '../pages/ForgotPasswordView';
import { ParentDashboard } from '../pages/ParentDashboard';
import { ReportsPage } from '../pages/ReportsPage';
import { CalendarPage } from '../pages/CalendarPage';

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
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}