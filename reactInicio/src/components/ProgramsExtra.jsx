import { useLanguage } from '../context/LanguageContext';

export default function ProgramsExtra() {
  const { t } = useLanguage();

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16" id="programas-extra">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 font-bold text-xs uppercase tracking-wider mb-2">
              
              <span>{t('IMAS.badge', 'Programas Educativos')}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-on-surface">
              {t('IMAS.title', 'Nuestras Aulas y Niveles de Desarrollo')}
            </h2>
            <p className="text-on-surface-variant mt-1 text-sm sm:text-base max-w-xl">
              {t('IMAS.desc', 'Espacios especialmente preparados con mobiliario ergonómico a escala infantil y materiales autocorrectivos.')}
            </p>
          </div>
        </div>

        {/* 3 Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          
          {/* Paso 1: Documento */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden border-t-4 border-primary-container">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-cyan-100 text-primary font-bold text-xs">
                  {t('IMAS.r1Age', 'Paso 1')}
                </span>
                <span className="material-symbols-outlined text-primary text-[28px]">assignment</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-on-surface leading-relaxed">
                {t('IMAS.r1Title', 'Completa el formulario de atención en línea del IMAS con tus datos personales, tu número de cédula y los datos del menor.')}
              </h3>
            </div>

            {/* Símbolo Paso 1: Documento Formulario */}
            <div className="mt-6 flex justify-center items-center pb-2">
              <svg viewBox="0 0 160 160" className="w-36 h-36 sm:w-40 sm:h-40 select-none drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Círculo Morado */}
                <circle cx="80" cy="80" r="72" fill="#a25997" />
                
                {/* Hoja de Formulario */}
                <rect x="42" y="32" width="76" height="98" rx="8" fill="#f8f2fb" stroke="#753068" strokeWidth="2.5" />
                
                {/* Texto FORM */}
                <text x="80" y="53" textAnchor="middle" fill="#753068" fontSize="15" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.8">FORM</text>
                
                {/* Líneas de Campos */}
                <line x1="52" y1="63" x2="108" y2="63" stroke="#753068" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="52" y1="73" x2="74" y2="73" stroke="#753068" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="80" y1="73" x2="108" y2="73" stroke="#753068" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="52" y1="83" x2="108" y2="83" stroke="#753068" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="52" y1="93" x2="78" y2="93" stroke="#753068" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="52" y1="103" x2="108" y2="103" stroke="#753068" strokeWidth="2.5" strokeLinecap="round" />
                
                {/* Firma */}
                <path d="M 88 118 Q 94 112 98 118 T 106 114" fill="none" stroke="#753068" strokeWidth="2.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          {/* Paso 2: Flechas de Traslado */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden border-t-4 border-tertiary">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-pink-100 text-tertiary font-bold text-xs">
                  {t('IMAS.r2Age', 'Paso 2')}
                </span>
                <span className="material-symbols-outlined text-tertiary text-[28px]">swap_horiz</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-on-surface leading-relaxed">
                {t('IMAS.r2Title', 'Especifica en la sección de detalles o notas que estás solicitando un traslado de centro de Cuidado y Desarrollo Infantil (CECUDI) o Red de Cuido, indicando la razón del cambio y el nuevo centro de interés.')}
              </h3>
            </div>

            {/* Símbolo Paso 2: Flechas de Traslado */}
            <div className="mt-6 flex justify-center items-center pb-2">
              <svg viewBox="0 0 160 160" className="w-36 h-36 sm:w-40 sm:h-40 select-none drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Círculo Morado */}
                <circle cx="80" cy="80" r="72" fill="#a25997" />
                
                {/* Flecha inferior hacia la derecha (morada) */}
                <path
                  d="M 52 86 H 94 V 75 L 120 94 L 94 113 V 102 H 52 Z"
                  fill="#884485"
                  stroke="#501e52"
                  strokeWidth="3"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                
                {/* Flecha superior hacia la izquierda (lila claro) */}
                <path
                  d="M 108 66 H 66 V 55 L 40 74 L 66 93 V 82 H 108 Z"
                  fill="#eee6ff"
                  stroke="#501e52"
                  strokeWidth="3.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Paso 3: Avión de Papel */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden border-t-4 border-secondary-container">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs">
                  {t('IMAS.r3Age', 'Paso 3')}
                </span>
                <span className="material-symbols-outlined text-secondary text-[28px]">send</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-on-surface leading-relaxed">
                {t('IMAS.r3Title', 'Envía la solicitud y espera a que un trabajador social se comunique contigo para validar el cambio y verificar los espacios en la nueva ubicación.')}
              </h3>
            </div>

            {/* Símbolo Paso 3: Avión de Papel */}
            <div className="mt-6 flex justify-center items-center pb-2">
              <svg viewBox="0 0 160 160" className="w-36 h-36 sm:w-40 sm:h-40 select-none drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Círculo Morado */}
                <circle cx="80" cy="80" r="72" fill="#a25997" />
                
                {/* Avión de papel blanco plegado con sombras */}
                <g transform="translate(6, 4)">
                  {/* Sombra / pliegue inferior */}
                  <path d="M 120 46 L 82 98 L 90 124 Z" fill="#dfd0e6" stroke="#c4b0ce" strokeWidth="1" />
                  {/* Cara interior en sombra */}
                  <path d="M 82 98 L 90 124 L 72 110 Z" fill="#ccb7d5" />
                  {/* Ala principal superior blanca */}
                  <path d="M 120 46 L 38 108 L 82 98 Z" fill="#ffffff" />
                </g>
              </svg>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
