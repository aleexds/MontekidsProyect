import { useState, useEffect } from 'react';
import logoMontekids from '../img/logoMontekids.png';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);

  // Sincronizar el estado con la clase 'dark' en el elemento <html>
  useEffect(() => {

    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <nav className="w-full bg-white dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800 transition-colors duration-300 px-4 sm:px-6 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img src={logoMontekids} alt="Montekids" className="h-20 w-auto" />
        </div>

        {/* Links de Navegación */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-zinc-300">
          <a href="#inicio" className="hover:text-primary transition-colors">Inicio</a>
          <a href="#filosofia" className="hover:text-primary transition-colors">Filosofía</a>
          <a href="#aulas" className="hover:text-primary transition-colors">Aulas</a>
          <a href="#opiniones" className="hover:text-primary transition-colors">Opiniones</a>
          <a href="#ubicacion" className="hover:text-primary transition-colors">Ubicación & Contacto</a>
        </div>

        {/* Acciones & Selector de Tema */}
        <div className="flex items-center gap-3">
          
          {/* Botón de Cambio de Tema */}
          <button
            onClick={toggleTheme}
            aria-label="Cambiar tema"
            className="p-2.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-amber-400 hover:bg-slate-200 dark:hover:bg-zinc-700 transition-all flex items-center justify-center shadow-sm"
          >
            <span className="material-symbols-outlined text-[20px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Botón Asistente IA / Iniciar Sesión */}
          <button className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500 text-white font-bold text-xs">
            <span className="material-symbols-outlined text-[18px]">smart_toy</span>
            <span>Asistente IA</span>
          </button>

          <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tertiary text-white font-bold text-xs">
            <span className="material-symbols-outlined text-[18px]">lock</span>
            <span>Iniciar Sesión</span>
          </button>

        </div>
      </div>
    </nav>
  );
}