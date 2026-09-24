import { useState, useEffect } from 'react';
import logoMontekids from '../img/logoMontekids.png';

export default function Navbar() {
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
          
          {/* Logo */}
          <div className="flex items-center gap-2">
            <img src={logoMontekids} alt="Logo MonteKids" />
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

            {/* Botón Asistente IA */}
            <button 
              onClick={() => setIsAiOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-bold text-xs hover:brightness-105 active:scale-95 transition-all shadow-sm cursor-pointer"
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

      {/* OVERLAY Y PANEL LATERAL DERECHO (DRAWER) DEL ASISTENTE IA */}
      {isAiOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Fondo traslúcido con blur */}
          <div 
            onClick={() => setIsAiOpen(false)} 
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            {/* Contenedor principal del Panel Lateral */}
            <div className="w-screen max-w-md bg-surface-container-lowest border-l border-surface-container-high shadow-2xl flex flex-col justify-between transition-transform duration-300 ease-in-out">
              
              {/* Encabezado del Panel */}
              <div className="p-5 border-b border-surface-container-high flex items-center justify-between bg-surface-container-low/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined">smart_toy</span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-base text-on-surface">Asistente IA Montekids</h3>
                    <span className="inline-flex items-center gap-1.5 text-xs text-primary font-semibold">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                      En línea
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => setIsAiOpen(false)}
                  className="p-1.5 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Área de Chat / Mensajes */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4">
                <div className="bg-surface-container-low p-4 rounded-2xl rounded-tl-sm text-sm text-on-surface leading-relaxed border border-surface-container-high">
                  👋 ¡Hola! Soy el asistente virtual de Montekids[cite: 15]. ¿En qué te puedo colaborar hoy? Puedo brindarte información sobre:
                  <ul className="mt-2 space-y-1 list-disc list-inside text-xs text-on-surface-variant">
                    <li>Proceso de matrícula y admisiones</li>
                    <li>Planes de estimulación temprana</li>
                    <li>Horarios y ubicación del centro</li>
                  </ul>
                </div>
              </div>

              {/* Input Footer */}
              <div className="p-4 border-t border-surface-container-high bg-surface-container-lowest">
                <form 
                  onSubmit={(e) => e.preventDefault()}
                  className="flex items-center gap-2 bg-surface-container-high p-1.5 rounded-full"
                >
                  <input 
                    type="text" 
                    placeholder="Escribe tu consulta..." 
                    className="flex-1 px-4 py-2 bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/60 border-none focus:outline-none"
                  />
                  <button 
                    type="submit" 
                    className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center hover:brightness-110 transition-all shrink-0"
                  >
                    <span className="material-symbols-outlined text-[18px]">send</span>
                  </button>
                </form>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}