
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from "../pages/AuthView"
import ForgotPasswordView from '../pages/ForgotPasswordView';
import ParentDashboard from '../pages/ParentDashboard';

export default function Routing() { 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/LOGIN" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPasswordView />} />
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}