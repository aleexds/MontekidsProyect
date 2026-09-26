

import { useLanguage } from '../context/LanguageContext';

export default function Programs() {
  const { t } = useLanguage();

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16" id="aulas">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 font-bold text-xs uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-[14px]">school</span>
              <span>{t('programs.badge', 'Programas Educativos')}</span>
            </div>
            <h2 className="text-3xl font-extrabold text-on-surface">
              {t('programs.title', 'Nuestras Aulas y Niveles de Desarrollo')}
            </h2>
            <p className="text-on-surface-variant mt-1 text-sm sm:text-base max-w-xl">
              {t('programs.desc', 'Espacios especialmente preparados con mobiliario ergonómico a escala infantil y materiales autocorrectivos.')}
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm font-bold">
            <span className="text-on-surface-variant">{t('programs.cycle', 'Ciclo Escolar 2027')}</span>
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span className="text-amber-600">{t('programs.openEnrollment', 'Matrículas Abiertas')}</span>
          </div>
        </div>

        {/* 3 Program Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Aula 1: Semillitas */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden border-t-4 border-primary-container">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-cyan-100 text-primary font-bold text-xs">
                  {t('programs.r1Age', '2 a 3 Años')}
                </span>
                <span className="material-symbols-outlined text-primary text-[28px]">spa</span>
              </div>
              <h3 className="text-2xl font-bold text-on-surface">{t('programs.r1Title', 'Aula Semillitas')}</h3>
              <p className="text-xs text-on-surface-variant mt-2 mb-4">
                {t('programs.r1Desc', 'Estimulación sensorial profunda, primeras estructuras de comunicación, motricidad gruesa exploratoria y desapego seguro.')}
              </p>
              <div className="space-y-2 text-xs font-semibold text-on-surface border-t pt-3">
                <p><strong>{t('programs.ratioLabel', 'Ratio:')}</strong> {t('programs.r1Ratio', '1 Educadora por 5 niños')}</p>
                <p><strong>{t('programs.capLabel', 'Capacidad:')}</strong> {t('programs.r1Cap', '10 niños máximo por sala')}</p>
                <p><strong>{t('programs.schedLabel', 'Jornada:')}</strong> {t('programs.r1Sched', 'Mañana (8:30 a 12:30)')}</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t">
              <div className="w-full bg-surface-container-high rounded-full h-2.5 mb-2 overflow-hidden">
                <div className="bg-primary-container h-full rounded-full" style={{ width: '80%' }}></div>
              </div>
              <div className="flex justify-between text-xs font-bold mb-3">
                <span className="text-on-surface-variant">{t('programs.r1Assigned', '80% Cupos Asignados')}</span>
                <span className="text-primary">{t('programs.r1Free', '2 Lugares Libres')}</span>
              </div>
              <a href="#ubicacion" className="w-full py-2.5 rounded-full bg-surface-container-low text-primary font-bold text-xs flex items-center justify-center gap-1 hover:bg-primary-container hover:text-white transition-colors">
                <span>{t('programs.consultBtn', 'Consultar Cupo')}</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </a>
            </div>
          </div>

          {/* Aula 2: Exploradores */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden border-t-4 border-tertiary">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-pink-100 text-tertiary font-bold text-xs">
                  {t('programs.r2Age', '3 a 4 Años')}
                </span>
                <span className="material-symbols-outlined text-tertiary text-[28px]">explore</span>
              </div>
              <h3 className="text-2xl font-bold text-on-surface">{t('programs.r2Title', 'Aula Exploradores')}</h3>
              <p className="text-xs text-on-surface-variant mt-2 mb-4">
                {t('programs.r2Desc', 'Desarrollo de lenguaje activo, socialización cooperativa, pensamiento prelógico y conquista de la autonomía cotidiana.')}
              </p>
              <div className="space-y-2 text-xs font-semibold text-on-surface border-t pt-3">
                <p><strong>{t('programs.ratioLabel', 'Ratio:')}</strong> {t('programs.r2Ratio', '1 Educadora por 7 niños')}</p>
                <p><strong>{t('programs.capLabel', 'Capacidad:')}</strong> {t('programs.r2Cap', '14 niños máximo por sala')}</p>
                <p><strong>{t('programs.schedLabel', 'Jornada:')}</strong> {t('programs.r2Sched', 'Completa o Media Jornada')}</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t">
              <div className="w-full bg-surface-container-high rounded-full h-2.5 mb-2 overflow-hidden">
                <div className="bg-tertiary h-full rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div className="flex justify-between text-xs font-bold mb-3">
                <span className="text-on-surface-variant">{t('programs.r2Assigned', '65% Cupos Asignados')}</span>
                <span className="text-tertiary">{t('programs.r2Free', '5 Lugares Libres')}</span>
              </div>
              <a href="#ubicacion" className="w-full py-2.5 rounded-full bg-surface-container-low text-tertiary font-bold text-xs flex items-center justify-center gap-1 hover:bg-tertiary hover:text-white transition-colors">
                <span>{t('programs.consultBtn', 'Consultar Cupo')}</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </a>
            </div>
          </div>

          {/* Aula 3: Creadores */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden border-t-4 border-secondary-container">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs">
                  {t('programs.r3Age', '4 a 5 Años')}
                </span>
                <span className="material-symbols-outlined text-secondary text-[28px]">brush</span>
              </div>
              <h3 className="text-2xl font-bold text-on-surface">{t('programs.r3Title', 'Aula Creadores')}</h3>
              <p className="text-xs text-on-surface-variant mt-2 mb-4">
                {t('programs.r3Desc', 'Iniciación a la pre-lectoescritura fonética sensorial, motricidad fina refinada, proyectos científicos y retos lúdicos.')}
              </p>
              <div className="space-y-2 text-xs font-semibold text-on-surface border-t pt-3">
                <p><strong>{t('programs.ratioLabel', 'Ratio:')}</strong> {t('programs.r3Ratio', '1 Educadora por 8 niños')}</p>
                <p><strong>{t('programs.capLabel', 'Capacidad:')}</strong> {t('programs.r3Cap', '16 niños máximo por sala')}</p>
                <p><strong>{t('programs.schedLabel', 'Jornada:')}</strong> {t('programs.r3Sched', 'Completa (8:30 a 16:30)')}</p>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t">
              <div className="w-full bg-surface-container-high rounded-full h-2.5 mb-2 overflow-hidden">
                <div className="bg-secondary-container h-full rounded-full" style={{ width: '88%' }}></div>
              </div>
              <div className="flex justify-between text-xs font-bold mb-3">
                <span className="text-on-surface-variant">{t('programs.r3Assigned', '88% Cupos Asignados')}</span>
                <span className="text-amber-600">{t('programs.r3Free', 'Últimos Cupos')}</span>
              </div>
              <a href="#ubicacion" className="w-full py-2.5 rounded-full bg-surface-container-low text-secondary font-bold text-xs flex items-center justify-center gap-1 hover:bg-secondary-container hover:text-white transition-colors">
                <span>{t('programs.consultBtn', 'Consultar Cupo')}</span>
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}