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
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-md border-b border-surface-container-high transition-colors duration-300 px-4 sm:px-6 lg:px-8 py-3">
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

      {/* BOTÓN FLOTANTE ASISTENTE IA (Fijo en esquina inferior derecha) */}
      <button
        onClick={() => setIsAiOpen(true)}
        type="button"
        aria-label={t('nav.aiAssistant', 'Asistente IA')}
        title={t('nav.aiAssistant', 'Asistente IA')}
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-4 py-3 bg-primary-container text-slate-900 rounded-full shadow-[0_8px_25px_rgba(0,219,235,0.45)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:shadow-2xl hover:scale-105 hover:brightness-95 active:scale-95 transition-all duration-300 border border-white/40 dark:border-cyan-300/30 cursor-pointer"
      >
        <span className="material-symbols-outlined text-[22px] text-slate-900 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
          smart_toy
        </span>
        <span className="text-xs font-black tracking-wide pr-0.5 text-slate-900">
          {t('nav.aiAssistant', 'Asistente IA')}
        </span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-80"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-700"></span>
        </span>
      </button>

      {/* ASISTENTE IA — componente con soporte de idiomas */}
      <AiDrawer isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </>
  );
}