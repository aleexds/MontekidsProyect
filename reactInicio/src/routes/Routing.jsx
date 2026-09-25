
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from "../pages/AuthView"

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/LOGIN" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}