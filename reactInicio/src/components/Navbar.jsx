import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

export default function Navbar({ onOpenAi }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-surface/85 backdrop-blur-xl shadow-sm">
      <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* Logo Montekids Oficial */}
        <a href="#inicio" className="flex items-center">
          <Logo width={190} height={48} />
        </a>

        {/* Navegación por Anclajes */}
        <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full bg-surface-container-low text-sm font-bold">
          <a className="px-4 py-2 rounded-full text-primary hover:bg-surface-container-high transition-all" href="#inicio">Inicio</a>
          <a className="px-4 py-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all" href="#filosofia">Filosofía</a>
          <a className="px-4 py-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all" href="#aulas">Aulas</a>
          <a className="px-4 py-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all" href="#opiniones">Opiniones</a>
          <a className="px-4 py-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all" href="#ubicacion">Ubicación & Contacto</a>
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={onOpenAi}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-bold text-sm shadow-sm hover:brightness-105 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">smart_toy</span>
            <span>Asistente IA</span>
          </button>

          <Link 
            to="/login" 
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-tertiary text-white font-bold text-sm shadow-md hover:bg-tertiary/90 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">lock</span>
            <span>Iniciar Sesión</span>
          </Link>

          <button 
            type="button" 
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-full bg-surface-container-low text-on-surface"
          >
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-surface border-b border-surface-container-low px-6 py-4 flex flex-col gap-3 font-bold shadow-lg">
          <a onClick={() => setMenuOpen(false)} href="#inicio" className="py-2 text-primary">Inicio</a>
          <a onClick={() => setMenuOpen(false)} href="#filosofia" className="py-2 text-on-surface-variant">Filosofía</a>
          <a onClick={() => setMenuOpen(false)} href="#aulas" className="py-2 text-on-surface-variant">Aulas</a>
          <a onClick={() => setMenuOpen(false)} href="#opiniones" className="py-2 text-on-surface-variant">Opiniones</a>
          <a onClick={() => setMenuOpen(false)} href="#ubicacion" className="py-2 text-on-surface-variant">Ubicación & Contacto</a>
          <button 
            type="button"
            onClick={() => { setMenuOpen(false); onOpenAi(); }}
            className="flex items-center justify-center gap-2 py-2.5 rounded-full bg-primary-container text-on-primary-container mt-2"
          >
            <span className="material-symbols-outlined text-[18px]">smart_toy</span>
            <span>Abrir Asistente IA</span>
          </button>
        </div>
      )}
    </header>
  );
}