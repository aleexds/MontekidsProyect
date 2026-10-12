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

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/95 backdrop-blur-md border-b border-surface-container-high transition-colors duration-300 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo dinámico (Modo Claro / Modo Oscuro) */}
          <a href="#inicio" className="flex items-center gap-2">
            <img 
              src={logoMontekids} 
              alt="Logo MonteKids" 
              className="h-9 sm:h-16 lg:h-20 w-auto block dark:hidden transition-opacity duration-300"
            />
            <img 
              src={logoDark} 
              alt="Logo MonteKids Dark" 
              className="h-9 sm:h-16 lg:h-20 w-auto hidden dark:block transition-opacity duration-300"
            />
          </a>

          {/* Links de Navegación (Escritorio) */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-on-surface-variant">
            <a href="#inicio" className="hover:text-primary transition-colors">{t('nav.home', 'Inicio')}</a>
            <a href="#filosofia" className="hover:text-primary transition-colors">{t('nav.philosophy', 'Filosofía')}</a>
            <a href="#aulas" className="hover:text-primary transition-colors">{t('nav.classrooms', 'Aulas')}</a>
            <a href="#opiniones" className="hover:text-primary transition-colors">{t('nav.reviews', 'Opiniones')}</a>
            <a href="#ubicacion" className="hover:text-primary transition-colors">{t('nav.contact', 'Ubicación & Contacto')}</a>
          </div>

          {/* Acciones & Controles de Accesibilidad (Escritorio) */}
          <div className="hidden md:flex items-center gap-2 sm:gap-3">
            
            {/* Botón Aumentar/Cambiar Tamaño de Texto */}
            <button
              onClick={toggleFontSize}
              title="Cambiar tamaño de texto"
              className="px-2.5 py-1.5 rounded-full bg-surface-container-high text-on-surface font-extrabold text-xs hover:bg-surface-container-low transition-all flex items-center justify-center shadow-sm cursor-pointer"
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
              className="p-2 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-low transition-all flex items-center justify-center shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Botón Iniciar Sesión (Escritorio) */}
            <Link 
              to="/LOGIN" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tertiary text-white font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">lock</span>
              <span>{t('nav.login', 'Iniciar Sesión')}</span>
            </Link>
          </div>

          {/* Acciones Móvil: Modo Oscuro + Hamburguesa */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setIsDark(!isDark)}
              aria-label="Cambiar tema"
              className="p-2 rounded-xl bg-surface-container-high text-on-surface hover:bg-surface-container-low transition-all flex items-center justify-center shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              aria-label="Menú principal"
              className="p-2.5 rounded-xl bg-primary text-white hover:bg-primary/90 transition-all flex items-center justify-center cursor-pointer shadow-md active:scale-95"
            >
              <span className="material-symbols-outlined text-[24px]">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

        </div>

        {/* Menú Desplegable Móvil */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-surface-container-high/60 bg-surface-container-lowest/98 backdrop-blur-md mt-3 pt-4 pb-4 px-4 flex flex-col gap-4 shadow-xl rounded-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/70 px-2 mb-1">
                Navegación
              </span>
              <a 
                href="#inicio" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm text-on-surface hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-primary text-[20px]">home</span>
                <span>{t('nav.home', 'Inicio')}</span>
              </a>
              <a 
                href="#filosofia" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm text-on-surface hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-primary text-[20px]">psychology</span>
                <span>{t('nav.philosophy', 'Filosofía')}</span>
              </a>
              <a 
                href="#aulas" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm text-on-surface hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-primary text-[20px]">school</span>
                <span>{t('nav.classrooms', 'Aulas')}</span>
              </a>
              <a 
                href="#opiniones" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm text-on-surface hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-primary text-[20px]">rate_review</span>
                <span>{t('nav.reviews', 'Opiniones')}</span>
              </a>
              <a 
                href="#ubicacion" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-2.5 rounded-xl font-bold text-sm text-on-surface hover:bg-surface-container-high transition-colors"
              >
                <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
                <span>{t('nav.contact', 'Ubicación & Contacto')}</span>
              </a>
            </div>

            {/* Accesibilidad Móvil */}
            <div className="pt-3 border-t border-surface-container-high/40 flex flex-col gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/70 px-2">
                Herramientas y Configuración
              </span>
              <div className="flex items-center justify-between gap-2 p-2 bg-surface-container-low rounded-xl">
                <span className="text-xs font-bold text-on-surface px-2">Tamaño de Texto</span>
                <button
                  onClick={toggleFontSize}
                  className="px-3 py-1.5 rounded-lg bg-surface-container-high text-on-surface font-extrabold text-xs"
                >
                  {fontLabels[fontSizeIndex]}
                </button>
              </div>

              <div className="flex items-center justify-between gap-2 p-2 bg-surface-container-low rounded-xl">
                <span className="text-xs font-bold text-on-surface px-2">Accesibilidad Color</span>
                <ColorblindToggle />
              </div>

              <div className="flex items-center justify-between gap-2 p-2 bg-surface-container-low rounded-xl">
                <span className="text-xs font-bold text-on-surface px-2">Idioma</span>
                <LanguageToggle />
              </div>
            </div>

            <div className="pt-2 border-t border-surface-container-high/40">
              <Link 
                to="/LOGIN" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-tertiary text-white font-bold text-sm hover:brightness-110 active:scale-95 transition-all shadow-md cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">lock</span>
                <span>{t('nav.login', 'Iniciar Sesión')}</span>
              </Link>
            </div>
          </div>
        )}
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