import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';

const LANGUAGES = [
  {
    id: 'es',
    name: 'Español',
    shortName: 'ES',
    flag: '🇪🇸',
    nativeName: 'Español',
    desc: 'Idioma predeterminado'
  },
  {
    id: 'en',
    name: 'English',
    shortName: 'EN',
    flag: '🇺🇸',
    nativeName: 'English',
    desc: 'English language'
  },
  {
    id: 'zh',
    name: '中文 (Chino)',
    shortName: 'ZH',
    flag: '🇨🇳',
    nativeName: '简体中文',
    desc: '中文语言支持'
  }
];

export default function LanguageToggle() {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const dropdownRef = useRef(null);

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
    setLanguage(id);
    setIsOpen(false);
  };

  const currentLang = LANGUAGES.find((l) => l.id === language) || LANGUAGES[0];

  return (
    <div className="relative font-sans" ref={dropdownRef}>
      {/* Botón con estilo armónico con los demás controles */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        title="Cambiar idioma / Change language / 切换语言"
        aria-label="Selector de idioma"
        className="px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-low transition-all flex items-center justify-center shadow-sm cursor-pointer text-xs font-extrabold"
      >
        <span className="material-symbols-outlined text-[16px] mr-1">translate</span>
        <span className="mr-1 text-[13px]">{currentLang.flag}</span>
        <span>{currentLang.shortName}</span>
        <span className="material-symbols-outlined text-[14px] ml-0.5 opacity-70">
          {isOpen ? 'expand_less' : 'expand_more'}
        </span>
      </button>

      {/* Menú Desplegable Accesible de Idiomas */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest border border-surface-container-high rounded-2xl shadow-xl py-2 z-50 animate-pop-bounce">
          <div className="px-3.5 py-1.5 border-b border-surface-container-high mb-1 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant">
              Seleccionar Idioma
            </span>
            <span className="material-symbols-outlined text-[14px] text-on-surface-variant">
              language
            </span>
          </div>

          <div className="flex flex-col py-1">
            {LANGUAGES.map((lang) => {
              const isSelected = language === lang.id;
              return (
                <button
                  key={lang.id}
                  type="button"
                  onClick={() => handleSelect(lang.id)}
                  className={`w-full px-3.5 py-2 text-left flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-primary-container/20 text-primary font-bold'
                      : 'text-on-surface hover:bg-surface-container-high/60'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-lg leading-none">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold leading-tight">{lang.nativeName}</span>
                      <span className="text-[10px] text-on-surface-variant font-normal leading-tight">
                        {lang.name}
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
