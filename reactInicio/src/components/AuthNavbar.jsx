import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoMontekids from '../img/logoMontekids.png';
import logoDark from '../img/logoDarkMontekids.png';

export default function AuthNavbar() {
  const [isDark, setIsDark] = useState(false);
  const [fontSizeIndex, setFontSizeIndex] = useState(0); // 0: Normal, 1: Mediano, 2: Grande

  const fontClasses = ['text-sm-size', 'text-md-size', 'text-lg-size'];
  const fontLabels = ['A', 'A+', 'A++'];

  // Manejador del Tema (Modo Oscuro)
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Manejador del Tamaño de Fuente Global
  const toggleFontSize = () => {
    const nextIndex = (fontSizeIndex + 1) % fontClasses.length;
    
    fontClasses.forEach(cls => document.documentElement.classList.remove(cls));
    if (nextIndex !== 0) {
      document.documentElement.classList.add(fontClasses[nextIndex]);
    }

    setFontSizeIndex(nextIndex);
  };

  return (
    <header className="w-full bg-surface-container-lowest border-b border-surface-container-high transition-colors duration-300 px-4 sm:px-6 lg:px-8 py-3 relative z-30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo dinámico Montekids */}
        <Link to="/" className="flex items-center gap-2">
          <img 
            src={logoMontekids} 
            alt="Logo MonteKids" 
            className="h-10 sm:h-14 w-auto block dark:hidden transition-opacity duration-300"
          />
          <img 
            src={logoDark} 
            alt="Logo MonteKids Dark" 
            className="h-10 sm:h-14 w-auto hidden dark:block transition-opacity duration-300"
          />
        </Link>

        {/* Acciones & Controles de Accesibilidad */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Botón Aumentar/Cambiar Tamaño de Texto */}
          <button
            onClick={toggleFontSize}
            title="Cambiar tamaño de texto"
            className="px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface font-extrabold text-xs hover:bg-surface-container-low transition-all flex items-center justify-center shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px] mr-1">text_fields</span>
            {fontLabels[fontSizeIndex]}
          </button>

          {/* Botón Modo Oscuro */}
          <button
            onClick={() => setIsDark(!isDark)}
            aria-label="Cambiar tema"
            className="p-2 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-low transition-all flex items-center justify-center shadow-sm cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">
              {isDark ? 'light_mode' : 'dark_mode'}
            </span>
          </button>

          {/* Botón Volver a Página Principal */}
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-high text-on-surface font-bold text-xs hover:bg-surface-container-low active:scale-95 transition-all shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span className="hidden sm:inline">Volver a Página Principal</span>
          </Link>

        </div>
      </div>
    </header>
  );
}