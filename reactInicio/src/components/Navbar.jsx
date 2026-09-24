import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isDark, setIsDark] = useState(false);
  const [fontSizeIndex, setFontSizeIndex] = useState(0); // 0: Normal, 1: Mediano, 2: Grande
  const [isAiOpen, setIsAiOpen] = useState(false); // Estado para el modal/chat del Asistente IA

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
      <nav className="w-full bg-surface-container-lowest border-b border-surface-container-high transition-colors duration-300 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-xl text-on-surface">
              Monte<span className="text-secondary-container">kids</span>
            </span>
          </div>

          {/* Links de Navegación */}
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-on-surface-variant">
            <a href="#inicio" className="hover:text-primary transition-colors">Inicio</a>
            <a href="#filosofia" className="hover:text-primary transition-colors">Filosofía</a>
            <a href="#aulas" className="hover:text-primary transition-colors">Aulas</a>
            <a href="#opiniones" className="hover:text-primary transition-colors">Opiniones</a>
            <a href="#ubicacion" className="hover:text-primary transition-colors">Ubicación & Contacto</a>
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

            {/* Botón Asistente IA Activo */}
            <button 
              onClick={() => setIsAiOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-bold text-xs hover:brightness-105 active:scale-95 transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">smart_toy</span>
              <span>Asistente IA</span>
            </button>

            {/* Botón Iniciar Sesión */}
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tertiary text-white font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow-sm">
              <span className="material-symbols-outlined text-[18px]">lock</span>
              <span>Iniciar Sesión</span>
            </button>

          </div>
        </div>
      </nav>

      {/* Modal / Ventana del Asistente IA */}
      {isAiOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-surface-container-lowest border border-surface-container-high rounded-2xl p-6 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setIsAiOpen(false)}
              className="absolute top-4 right-4 text-on-surface-variant hover:text-on-surface transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                <span className="material-symbols-outlined">smart_toy</span>
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-on-surface">Asistente IA Montekids</h3>
                <p className="text-xs text-on-surface-variant">¿En qué puedo ayudarte hoy?</p>
              </div>
            </div>

            <div className="bg-surface-container-low rounded-xl p-4 text-sm text-on-surface mb-4">
              👋 ¡Hola! Soy el asistente virtual de Montekids. Puedo guiarte sobre el proceso de admisión, métodos educativos o agendar una visita guiada.
            </div>

            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="Escribe tu mensaje..." 
                className="flex-1 px-4 py-2 rounded-full bg-surface-container-high text-on-surface text-sm border-none focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button className="px-4 py-2 rounded-full bg-primary text-white font-bold text-xs hover:brightness-110 transition-all">
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}