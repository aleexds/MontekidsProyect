import { useState, useEffect, useRef } from 'react';

const OPTIONS = [
  {
    id: 'normal',
    name: 'Sin ceguera cromática',
    shortName: 'Visión',
    desc: 'Visión de colores estándar',
    badgeColor: 'bg-gradient-to-r from-red-500 via-green-500 to-blue-500',
  },
  {
    id: 'protanopia',
    name: 'Protanopia',
    shortName: 'Protanopia',
    desc: 'Deficiencia cono rojo',
    badgeColor: 'bg-[#002fbe]',
  },
  {
    id: 'deuteranopia',
    name: 'Deuteranopia',
    shortName: 'Deuteranopia',
    desc: 'Deficiencia cono verde',
    badgeColor: 'bg-[#4056a1]',
  },
  {
    id: 'tritanopia',
    name: 'Tritanopia',
    shortName: 'Tritanopia',
    desc: 'Deficiencia cono azul',
    badgeColor: 'bg-[#d63031]',
  },
];

const applyColorblindFilter = (mode) => {
  const root = document.documentElement;
  root.classList.remove('filter-protanopia', 'filter-deuteranopia', 'filter-tritanopia');
  if (mode && mode !== 'normal') {
    root.classList.add(`filter-${mode}`);
  }
};

export default function ColorblindToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState(() => {
    return localStorage.getItem('montekids_colorblind_filter') || 'normal';
  });
  const dropdownRef = useRef(null);

  // Aplicar filtro al DOM cada vez que cambie o se monte
  useEffect(() => {
    applyColorblindFilter(activeFilter);
  }, [activeFilter]);

  // Sincronizar cambios entre diferentes componentes/páginas
  useEffect(() => {
    const handleSync = (e) => {
      setActiveFilter(e.detail);
    };

    window.addEventListener('montekids-colorblind-change', handleSync);
    return () => window.removeEventListener('montekids-colorblind-change', handleSync);
  }, []);

  // Cerrar al hacer clic afuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (id) => {
    setActiveFilter(id);
    applyColorblindFilter(id);
    localStorage.setItem('montekids_colorblind_filter', id);
    window.dispatchEvent(new CustomEvent('montekids-colorblind-change', { detail: id }));
    setIsOpen(false);
  };

  const currentOption = OPTIONS.find((opt) => opt.id === activeFilter) || OPTIONS[0];

  return (
    <div className="relative font-sans" ref={dropdownRef}>
      {/* Botón con estilo armónico con el de texto y tema */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title="Filtro de tonalidades para daltonismo"
        aria-label="Filtro de accesibilidad para daltonismo"
        className={`px-3 py-1.5 rounded-full transition-all flex items-center justify-center shadow-sm cursor-pointer text-xs font-extrabold ${
          activeFilter !== 'normal'
            ? 'bg-primary text-white hover:brightness-110'
            : 'bg-surface-container-high text-on-surface hover:bg-surface-container-low'
        }`}
      >
        <span className="material-symbols-outlined text-[16px] mr-1">palette</span>
        <span>{currentOption.shortName}</span>
        <span className="material-symbols-outlined text-[14px] ml-0.5 opacity-70">
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {/* Menú Desplegable Accesible */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-surface-container-lowest border border-surface-container-high rounded-2xl shadow-xl py-2 z-50 animate-pop-bounce">
          <div className="px-3.5 py-1.5 border-b border-surface-container-high mb-1 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              Tonalidades Daltonismo
            </span>
            <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
              visibility
            </span>
          </div>

          <div className="flex flex-col py-1">
            {OPTIONS.map((opt) => {
              const isSelected = activeFilter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelect(opt.id)}
                  className={`w-full px-3.5 py-2 text-left flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-primary-container/20 text-primary font-bold'
                      : 'text-on-surface hover:bg-surface-container-high/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`w-3.5 h-3.5 rounded-full shrink-0 shadow-inner ${opt.badgeColor}`} />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold leading-tight">{opt.name}</span>
                      <span className="text-[10px] text-on-surface-variant font-normal leading-tight">
                        {opt.desc}
                      </span>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="material-symbols-outlined text-[16px] text-primary shrink-0 ml-2">
                      check
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
