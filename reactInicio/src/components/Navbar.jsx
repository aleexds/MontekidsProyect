import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logoMontekids from '../img/logoMontekids.png';
import logoDark from '../img/logoDarkMontekids.png';
import ColorblindToggle from './ColorblindToggle';
import LanguageToggle from './LanguageToggle';
import AiDrawer from './AiDrawer';
import { useLanguage } from '../context/LanguageContext';

export default function Navbar() {
  const { t } = useLanguage();
  const [isDark, setIsDark] = useState(false);
  const [fontSizeIndex, setFontSizeIndex] = useState(0); // 0: Normal, 1: Mediano, 2: Grande
  const [isAiOpen, setIsAiOpen] = useState(false); // Controla el panel lateral derecho

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
    <>
      <nav className="w-full bg-surface-container-lowest border-b border-surface-container-high transition-colors duration-300 px-4 sm:px-6 lg:px-8 py-3 relative z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo dinámico (Modo Claro / Modo Oscuro) */}
          <a href="#inicio" className="flex items-center gap-2">
            <img 
              src={logoMontekids} 
              alt="Logo MonteKids" 
              className="h-9 sm:h-20 w-auto block dark:hidden transition-opacity duration-300"
            />
            <img 
              src={logoDark} 
              alt="Logo MonteKids Dark" 
              className="h-9 sm:h-20 w-auto hidden dark:block transition-opacity duration-300"
            />
          </a>

          {/* Links de Navegación */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-on-surface-variant">
            <a href="#inicio" className="hover:text-primary transition-colors">{t('nav.home', 'Inicio')}</a>
            <a href="#filosofia" className="hover:text-primary transition-colors">{t('nav.philosophy', 'Filosofía')}</a>
            <a href="#aulas" className="hover:text-primary transition-colors">{t('nav.classrooms', 'Aulas')}</a>
            <a href="#opiniones" className="hover:text-primary transition-colors">{t('nav.reviews', 'Opiniones')}</a>
            <a href="#ubicacion" className="hover:text-primary transition-colors">{t('nav.contact', 'Ubicación & Contacto')}</a>
          </div>

          {/* Acciones & Controles de Accesibilidad */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Botón Aumentar/Cambiar Tamaño de Texto */}
            <button
              onClick={toggleFontSize}
              title="Cambiar tamaño de texto"
              className="px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface font-extrabold text-xs hover:bg-surface-container-low transition-all flex items-center justify-center shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px] mr-1">text_fields</span>
              {fontLabels[fontSizeIndex]}
            </button>

            {/* Botón Filtro Daltonismo */}
            <ColorblindToggle />

            {/* Botón Idioma */}
            <LanguageToggle />

            {/* Botón Modo Oscuro */}
            <button
              onClick={() => setIsDark(!isDark)}
              aria-label="Cambiar tema"
              className="p-2 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-low transition-all flex items-center justify-center shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Botón Asistente IA */}
            <button 
              onClick={() => setIsAiOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-bold text-xs hover:brightness-105 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">smart_toy</span>
              <span>{t('nav.aiAssistant', 'Asistente IA')}</span>
            </button>

            {/* Botón Iniciar Sesión */}
            <Link 
              to="/LOGIN" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tertiary text-white font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">lock</span>
              <span>{t('nav.login', 'Iniciar Sesión')}</span>
            </Link>

          </div>
        </div>
      </nav>

      {/* ASISTENTE IA — componente con soporte de idiomas */}
      <AiDrawer isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </>
  );
}