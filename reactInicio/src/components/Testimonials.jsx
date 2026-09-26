

import { useLanguage } from '../context/LanguageContext';

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-surface-container-low/80" id="opiniones">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-wide mb-2">
            {t('testimonials.badge', 'Comunidad y Confianza')}
          </span>
          <h2 className="text-3xl font-extrabold text-on-surface">
            {t('testimonials.title', 'Familias Felices en Montekids')}
          </h2>
          <p className="text-on-surface-variant mt-1 text-sm sm:text-base">
            {t('testimonials.desc', 'Testimonios reales de familias que confían en nuestro acompañamiento.')}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <div className="flex text-amber-500 mb-3">★★★★★</div>
            <p className="text-sm sm:text-base text-on-surface italic mb-6 leading-relaxed">
              {t('testimonials.t1Text', '“Excelente atención y metodología. Mateo ha avanzado muchísimo en su lenguaje, autonomía y motricidad. Además la plataforma web nos mantiene al tanto de cada hito diario.”')}
            </p>
            <div className="flex items-center gap-4 border-t pt-4">
              <div className="w-12 h-12 rounded-full bg-pink-100 text-tertiary flex items-center justify-center font-bold text-lg">VQ</div>
              <div>
                <h4 className="font-bold text-sm text-on-surface">{t('testimonials.t1Author', 'Valeria Quirós')}</h4>
                <p className="text-xs text-on-surface-variant">{t('testimonials.t1Role', 'Mamá de Mateo (Aula Exploradores)')}</p>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <div className="flex text-amber-500 mb-3">★★★★★</div>
            <p className="text-sm sm:text-base text-on-surface italic mb-6 leading-relaxed">
              {t('testimonials.t2Text', '“El ambiente es cariñoso y estimulante. Las maestras están altamente capacitadas y el enfoque en ritmo individual marca una gran diferencia en la seguridad de Sofi.”')}
            </p>
            <div className="flex items-center gap-4 border-t pt-4">
              <div className="w-12 h-12 rounded-full bg-cyan-100 text-primary flex items-center justify-center font-bold text-lg">CM</div>
              <div>
                <h4 className="font-bold text-sm text-on-surface">{t('testimonials.t2Author', 'Carlos Mendoza')}</h4>
                <p className="text-xs text-on-surface-variant">{t('testimonials.t2Role', 'Papá de Sofía (Aula Creadores)')}</p>
              </div>
            </div>
          </div>

        </div>

        {/* Counter Pillows */}
        <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-md grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span className="text-3xl sm:text-4xl font-extrabold text-primary">{t('testimonials.c1Val', '+150')}</span>
            <p className="font-bold text-xs text-on-surface mt-1">{t('testimonials.c1Title', 'Niños Felices')}</p>
            <span className="text-[11px] text-on-surface-variant">{t('testimonials.c1Desc', 'Acompañados activamente')}</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-extrabold text-secondary-container">{t('testimonials.c2Val', '12')}</span>
            <p className="font-bold text-xs text-on-surface mt-1">{t('testimonials.c2Title', 'Años de Trayectoria')}</p>
            <span className="text-[11px] text-on-surface-variant">{t('testimonials.c2Desc', 'Educación de vanguardia')}</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-extrabold text-tertiary">{t('testimonials.c3Val', '100%')}</span>
            <p className="font-bold text-xs text-on-surface mt-1">{t('testimonials.c3Title', 'Familias Conectadas')}</p>
            <span className="text-[11px] text-on-surface-variant">{t('testimonials.c3Desc', 'Monitoreo en app')}</span>
          </div>
          <div>
            <span className="text-3xl sm:text-4xl font-extrabold text-on-surface">{t('testimonials.c4Val', '5/5 ★')}</span>
            <p className="font-bold text-xs text-on-surface mt-1">{t('testimonials.c4Title', 'Valoración Promedio')}</p>
            <span className="text-[11px] text-on-surface-variant">{t('testimonials.c4Desc', 'Satisfacción verificada')}</span>
          </div>
        </div>

      </div>
    </section>
  );
}