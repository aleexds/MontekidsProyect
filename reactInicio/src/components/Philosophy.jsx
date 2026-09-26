

import { useLanguage } from '../context/LanguageContext';

export default function Philosophy() {
  const { t } = useLanguage();

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-surface-container-low/60" id="filosofia">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-tertiary-container/40 text-on-tertiary-container font-bold text-xs uppercase tracking-wide mb-2">
            {t('philosophy.badge', 'Filosofía & Metodología AMI')}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface">
            {t('philosophy.title', 'Nuestra Filosofía y Metodología Pedagógica')}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-on-surface-variant">
            {t('philosophy.desc', 'Tres pilares diseñados para respetar los periodos sensitivos, la curiosidad innata y el neurodesarrollo integral.')}
          </p>
        </div>

        {/* 3 Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="group bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center text-tertiary mb-4">
                <span className="material-symbols-outlined text-[32px]">extension</span>
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded bg-tertiary/10 text-tertiary font-bold text-xs mb-2">
                {t('philosophy.c1Badge', 'Desarrollo 360°')}
              </span>
              <h3 className="text-xl font-bold text-on-surface mb-2">
                {t('philosophy.c1Title', 'Estimulación Temprana Integral 🧠')}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {t('philosophy.c1Desc', 'Integración de hitos cognitivos, motores, sensoriales y socio-lingüísticos mediante exploración con material concreto Montessori.')}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs font-bold text-tertiary uppercase">
              <span>{t('philosophy.c1Footer', 'Circuitos Sensoriomotores')}</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="group bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center text-primary mb-4">
                <span className="material-symbols-outlined text-[32px]">devices</span>
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded bg-primary/10 text-primary font-bold text-xs mb-2">
                {t('philosophy.c2Badge', 'Conexión Continua')}
              </span>
              <h3 className="text-xl font-bold text-on-surface mb-2">
                {t('philosophy.c2Title', 'Acompañamiento a Familias 📱')}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {t('philosophy.c2Desc', 'Acceso exclusivo para apoderados: bitácora diaria en tiempo real, registro fotográfico de logros y comunicación directa.')}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs font-bold text-primary uppercase">
              <span>{t('philosophy.c2Footer', 'Montekids App Familiar')}</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="group bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-secondary mb-4">
                <span className="material-symbols-outlined text-[32px]">psychology_alt</span>
              </div>
              <span className="inline-block px-2.5 py-0.5 rounded bg-secondary/10 text-secondary font-bold text-xs mb-2">
                {t('philosophy.c3Badge', 'Innovación Pedagógica')}
              </span>
              <h3 className="text-xl font-bold text-on-surface mb-2">
                {t('philosophy.c3Title', 'Seguimiento Continuo con IA 🌟')}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {t('philosophy.c3Desc', 'Sinergia entre educadoras de excelencia y análisis adaptativo para sugerir dinámicas personalizadas al ritmo de cada niño.')}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t flex items-center justify-between text-xs font-bold text-secondary uppercase">
              <span>{t('philosophy.c3Footer', 'Planes Personalizados')}</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}