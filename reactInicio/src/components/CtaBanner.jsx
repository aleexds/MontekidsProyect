import { useLanguage } from '../context/LanguageContext';

export default function CtaBanner() {
  const { t } = useLanguage();

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-12" id="visita">
      <div className="max-w-7xl mx-auto">
        {/* Usamos colores inline directos bg-gradient para el morado/púrpura de Stitch */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#4E00DE] to-[#A323D1] text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
          
          {/* Destellos de luz en el fondo */}
          <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-[#00dbeb]/25 blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#ffa71a]/20 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider mb-4">
              <span className="material-symbols-outlined text-[18px]">stars</span>
              <span>{t('cta.badge', 'Admisiones 2027')}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {t('cta.title', '¿Listo para impulsar el futuro de tu pequeño?')}
            </h2>

            <p className="mt-4 text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl leading-relaxed">
              {t('cta.desc', 'Cupos limitados para el ciclo escolar 2027. Agenda hoy mismo tu visita guiada presencial o virtual y descubre cómo hacemos de cada descubrimiento una experiencia inolvidable.')}
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              {/* Botón WhatsApp Blanco con Texto Oscuro e Ícono Verde */}
              <a 
                href="https://wa.me/50687909556"
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-[#1d1149] font-bold text-sm shadow-lg hover:bg-slate-100 transition-all text-center"
              >
                <span className="material-symbols-outlined text-[#25D366] text-[22px]">chat</span>
                <span>{t('cta.btnChat', 'Chatear por WhatsApp')}</span>
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-4 text-white/80 text-xs sm:text-sm font-medium">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">schedule</span> {t('cta.f1', 'Respuesta inmediata')}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[16px]">location_on</span> {t('cta.f2', 'Recorrido personalizado de 40 min')}
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}