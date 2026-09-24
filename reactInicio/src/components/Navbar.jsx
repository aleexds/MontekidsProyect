import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ onOpenAi }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header class="fixed top-0 left-0 right-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-sm">
      <div class="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Logo Montekids */}
        <a href="#inicio" class="flex items-center gap-2">
          <span class="material-symbols-outlined text-primary-container text-3xl font-bold">spa</span>
          <span class="font-bold text-2xl text-on-surface tracking-tight">Montekids</span>
        </a>

        {/* Navegación por Anclajes (Desktop) */}
        <nav class="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-surface-container-low text-sm font-bold">
          <a class="px-4 py-2 rounded-full text-primary hover:bg-surface-container-high transition-all" href="#inicio">Inicio</a>
          <a class="px-4 py-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all" href="#filosofia">Filosofía</a>
          <a class="px-4 py-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all" href="#aulas">Aulas</a>
          <a class="px-4 py-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all" href="#opiniones">Opiniones</a>
          <a class="px-4 py-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all" href="#ubicacion">Ubicación & Contacto</a>
        </nav>

        {/* Acciones de la Derecha */}
        <div class="flex items-center gap-2">
          <button 
            type="button"
            onClick={onOpenAi}
            class="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-bold text-sm shadow-sm hover:brightness-105 transition-all"
          >
            <span class="material-symbols-outlined text-[18px]">smart_toy</span>
            <span>Asistente IA</span>
          </button>

          <Link 
            to="/login" 
            class="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-tertiary text-white font-bold text-sm shadow-md hover:bg-tertiary/90 transition-all"
          >
            <span class="material-symbols-outlined text-[18px]">lock</span>
            <span>Iniciar Sesión</span>
          </Link>

          {/* Menú Hamburguesa para Celulares */}
          <button 
            type="button" 
            onClick={() => setMenuOpen(!menuOpen)}
            class="lg:hidden p-2 rounded-full bg-surface-container-low text-on-surface"
          >
            <span class="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Menú Desplegable Responsive */}
      {menuOpen && (
        <div class="lg:hidden bg-surface border-b border-surface-container-low px-6 py-4 flex flex-col gap-3 font-bold shadow-lg">
          <a onClick={() => setMenuOpen(false)} href="#inicio" class="py-2 text-primary">Inicio</a>
          <a onClick={() => setMenuOpen(false)} href="#filosofia" class="py-2 text-on-surface-variant">Filosofía</a>
          <a onClick={() => setMenuOpen(false)} href="#aulas" class="py-2 text-on-surface-variant">Aulas</a>
          <a onClick={() => setMenuOpen(false)} href="#opiniones" class="py-2 text-on-surface-variant">Opiniones</a>
          <a onClick={() => setMenuOpen(false)} href="#ubicacion" class="py-2 text-on-surface-variant">Ubicación & Contacto</a>
          <button 
            type="button"
            onClick={() => { setMenuOpen(false); onOpenAi(); }}
            class="flex items-center justify-center gap-2 py-2.5 rounded-full bg-primary-container text-on-primary-container mt-2"
          >
            <span class="material-symbols-outlined text-[18px]">smart_toy</span>
            <span>Abrir Asistente IA</span>
          </button>
        </div>
      )}
    </header>
  );
}