
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from "../pages/AuthView"
import ForgotPasswordView from '../pages/ForgotPasswordView';

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/LOGIN" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPasswordView />} />
      </Routes>
    </BrowserRouter>
  );
}