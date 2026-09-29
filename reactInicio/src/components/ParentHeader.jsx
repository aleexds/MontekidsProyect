import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import logoMontekids from '../img/logoMontekids.png';
import logoDark from '../img/logoDarkMontekids.png';
import ColorblindToggle from './ColorblindToggle';
import LanguageToggle from './LanguageToggle';
import AiDrawer from './AiDrawer';
import { useLanguage } from '../context/LanguageContext';

export function ParentHeader() {
  const { t } = useLanguage();
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [fontSizeIndex, setFontSizeIndex] = useState(0); // 0: Normal, 1: Mediano, 2: Grande
  const [isAiOpen, setIsAiOpen] = useState(false);

  const fontClasses = ['text-sm-size', 'text-md-size', 'text-lg-size'];
  const fontLabels = ['A', 'A+', 'A++'];

  // Manejador del Modo Oscuro
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

  const navItems = [
    {
      path: '/mi-hijo-a',
      label: t('parentDashboard.nav.myChild', 'Mi Hijo/a')
    },
    {
      path: '/mis-comentarios-reportes',
      label: t('parentDashboard.nav.reports', 'Mis Comentarios/Reportes')
    },
    {
      path: '/calendario-de-actividades',
      label: t('parentDashboard.nav.calendar', 'Calendario de Actividades')
    }
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-md border-b border-surface-container-high transition-colors duration-300">
        <div className="h-20 max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
          
          {/* Logo Dinámico */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img 
              src={logoMontekids} 
              alt="Logo MonteKids" 
              className="h-9 sm:h-14 w-auto block dark:hidden transition-opacity duration-300"
            />
            <img 
              src={logoDark} 
              alt="Logo MonteKids Dark" 
              className="h-9 sm:h-14 w-auto hidden dark:block transition-opacity duration-300"
            />
          </Link>

          {/* NAV DINÁMICO CON RUTAS ACTIVAS */}
          <nav className="hidden lg:flex items-center gap-1.5 p-1.5 bg-surface-container-high/40 rounded-full border border-surface-container-high">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path || (item.path === '/mi-hijo-a' && location.pathname === '/');
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-full text-xs transition-all ${
                    isActive
                      ? 'font-bold bg-tertiary-container text-on-tertiary-container shadow-xs'
                      : 'font-semibold text-on-surface-variant hover:text-primary hover:bg-surface-container-highest'
                  }`}
                >
                  {item.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Acciones & Controles de Accesibilidad */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">

            {/* Botón Tamaño de Texto */}
            <button
              onClick={toggleFontSize}
              title={t('nav.changeTextSize', 'Cambiar tamaño de texto')}
              type="button"
              className="px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface font-extrabold text-xs hover:bg-surface-container-low transition-all flex items-center justify-center shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] mr-1">text_fields</span>
              {fontLabels[fontSizeIndex]}
            </button>

            {/* Filtro Daltonismo */}
            <ColorblindToggle />

            {/* Cambio de Idioma */}
            <LanguageToggle />

            {/* Modo Oscuro / Claro */}
            <button
              onClick={() => setIsDark(!isDark)}
              aria-label={t('nav.changeTheme', 'Cambiar tema')}
              type="button"
              className="p-2 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-low transition-all flex items-center justify-center shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* Asistente IA */}
            <button 
              onClick={() => setIsAiOpen(true)}
              type="button"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-bold text-xs hover:brightness-105 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">smart_toy</span>
              <span className="hidden xl:inline">{t('nav.aiAssistant', 'AI 助手')}</span>
            </button>

            {/* Perfil del Usuario */}
            <div className="flex items-center gap-2.5 pl-1.5 py-1 pr-3 bg-surface-container-low border border-surface-container-high rounded-full">
              <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container font-bold flex items-center justify-center text-xs">
                VQ
              </div>
              <div className="hidden xl:flex flex-col text-left">
                <span className="text-xs font-bold text-on-surface leading-tight">Valeria Quirós</span>
                <span className="text-[11px] text-primary font-medium leading-tight">
                  {t('parentDashboard.nav.userRole', 'Mamá de Mateo')}
                </span>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* Drawer del Asistente IA */}
      <AiDrawer isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </>
  );
}