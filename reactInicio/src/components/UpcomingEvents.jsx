import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/useAuth';
import { getTeacherForUser } from '../utils/teacherHelper';

export function UpcomingEvents({ activeCategory, onOpenOrderModal, showToast }) {
  const { t } = useLanguage();
  const { activeUser } = useAuth();
  const teacher = getTeacherForUser(activeUser);
  const childName = activeUser?.child?.name || 'Mateo';

  const [rsvpConfirmed, setRsvpConfirmed] = useState(true);

  const toggleRSVP = () => {
    if (rsvpConfirmed) {
      setRsvpConfirmed(false);
      showToast(t('calendarPage.toastRsvpUnchecked', 'Asistencia desmarcada temporalmente'), 'info');
    } else {
      setRsvpConfirmed(true);
      showToast(
        t('calendarPage.toastRsvpChecked', '¡Asistencia confirmada para {name}!').replace('{name}', childName),
        'check_circle'
      );
    }
  };

  const showSpecial = activeCategory === 'all' || activeCategory === 'special';
  const showMeetings = activeCategory === 'all' || activeCategory === 'meetings';

  return (
    <div className="flex flex-col gap-6 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-['Nunito'] text-2xl font-bold text-on-surface tracking-tight">
            {t('calendarPage.upcomingSectionTitle', 'Próximos Eventos y Actividades Destacadas')}
          </h2>
          <span className="px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-md text-label-md font-extrabold">
            {(showSpecial && showMeetings) ? t('calendarPage.twoUpcomingBadge', '2 Próximos') : t('calendarPage.oneUpcomingBadge', '1 Próximo')}
          </span>
        </div>
        <span className="font-body-sm text-body-sm text-on-surface-variant hidden sm:inline">
          {childName} {t('calendarPage.enrolledSubtitle', 'matriculado/a en ambas')}
        </span>
      </div>

      {/* EVENTO 1: Sombrero Loco & Huerta (Categoría: Special) */}
      {showSpecial && (
        <article
          id="evento-sombrero"
          className="bg-surface-container-lowest rounded-3xl p-5 md:p-6 shadow-[0_8px_30px_-4px_rgba(254,166,24,0.18)] transition-all duration-300 hover:shadow-[0_12px_36px_-4px_rgba(254,166,24,0.28)] relative overflow-hidden flex flex-col md:flex-row gap-6 items-start"
        >
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-secondary-container"></div>

          <div className="flex md:flex-col items-center justify-center shrink-0 w-full md:w-36 bg-secondary-fixed/50 rounded-2xl p-4 text-center">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-secondary-fixed font-bold">
              {t('calendarPage.tuesday', 'Martes')}
            </span>
            <span className="font-['Nunito'] text-4xl font-black text-secondary leading-none my-1">31</span>
            <span className="font-label-md text-label-md text-on-secondary-fixed-variant font-bold">
              {t('calendarPage.october2026', 'Octubre 2026')}
            </span>
            <div className="mt-2 w-9 h-9 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-fixed shadow-sm">
              <span className="material-symbols-outlined text-[20px]">psychiatry</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between h-full gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">nature_people</span>
                  {t('calendarPage.tagGarden', 'Huerta Pedagógica & Estimulación')}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-medium">
                  {t('calendarPage.presentialBadge', 'Presencial')}
                </span>
              </div>
              <h3 className="font-['Nunito'] text-xl font-extrabold text-on-surface tracking-tight">
                {t('calendarPage.event1Title', 'Día del Sombrero Loco & Huerta Comunitaria')}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-on-surface-variant font-label-md text-label-md mt-1 mb-2.5">
                <span className="flex items-center gap-1.5 text-on-surface font-semibold">
                  <span className="material-symbols-outlined text-secondary text-[18px]">schedule</span>
                  09:00 AM - 12:00 PM
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">pin_drop</span>
                  {t('calendarPage.locGarden', 'Aula Semillitas & Patio Huerta Montessori')}
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {t('calendarPage.event1Desc', 'Traer un sombrero decorado con elementos reciclados hechos en casa para la dinámica de estimulación sensorial, motricidad táctil y siembra de plantines en el huerto pedagógico junto a {name}.').replace('{name}', childName)}
              </p>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-surface-container-high">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={toggleRSVP}
                  className={`px-4 py-2.5 rounded-full font-label-md text-label-md flex items-center gap-2 shadow-sm transition-all cursor-pointer active:scale-95 ${
                    rsvpConfirmed
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">check_circle</span>
                  <span>
                    {rsvpConfirmed 
                      ? t('calendarPage.rsvpConfirmed', '✓ Asistencia Confirmada de {name}').replace('{name}', childName)
                      : t('calendarPage.rsvpConfirm', 'Confirmar Asistencia')}
                  </span>
                </button>
                <span className="font-body-sm text-body-sm text-on-surface-variant hidden sm:inline">
                  {t('calendarPage.companionsCount', '2 acompañantes registrados')}
                </span>
              </div>
              <button
                type="button"
                onClick={() => showToast(t('calendarPage.toastDownloadingGuide', 'Descargando Guía Pedagógica Sombrero Loco (PDF 1.4MB)'), 'download')}
                className="px-4 py-2.5 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-primary text-[18px]">download_for_offline</span>
                <span>{t('calendarPage.downloadGuideBtn', 'Descargar Guía de Actividad (PDF)')}</span>
              </button>
            </div>
          </div>
        </article>
      )}

      {/* EVENTO 2: Reunión Trimestral (Categoría: Meetings) */}
      {showMeetings && (
        <article
          id="evento-reunion"
          className="bg-surface-container-lowest rounded-3xl p-5 md:p-6 shadow-[0_8px_30px_-4px_rgba(183,0,114,0.16)] transition-all duration-300 hover:shadow-[0_12px_36px_-4px_rgba(183,0,114,0.26)] relative overflow-hidden flex flex-col md:flex-row gap-6 items-start"
        >
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-tertiary"></div>

          <div className="flex md:flex-col items-center justify-center shrink-0 w-full md:w-36 bg-tertiary-fixed/40 rounded-2xl p-4 text-center">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-on-tertiary-fixed font-bold">
              {t('calendarPage.friday', 'Viernes')}
            </span>
            <span className="font-['Nunito'] text-4xl font-black text-tertiary leading-none my-1">27</span>
            <span className="font-label-md text-label-md text-on-tertiary-fixed-variant font-bold">
              {t('calendarPage.october2026', 'Octubre 2026')}
            </span>
            <div className="mt-2 w-9 h-9 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-sm">
              <span className="material-symbols-outlined text-[20px]">groups</span>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-between h-full gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">psychology</span>
                  {t('calendarPage.tagNeuro', 'Evaluación de Neurodesarrollo')}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-tertiary-container/60 text-on-tertiary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                  {t('calendarPage.virtualBadge', 'Virtual vía Google Meet')}
                </span>
              </div>
              <h3 className="font-['Nunito'] text-xl font-extrabold text-on-surface tracking-tight">
                {t('calendarPage.event2Title', 'Reunión Trimestral de Familias • Informe Bimestral')}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-on-surface-variant font-label-md text-label-md mt-1 mb-2.5">
                <span className="flex items-center gap-1.5 text-on-surface font-semibold">
                  <span className="material-symbols-outlined text-tertiary text-[18px]">nest_clock_farsight_analog</span>
                  16:00 - 17:00 hrs
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-primary text-[18px]">co_present</span>
                  {t('calendarPage.locNeuro', 'Docente {teacher} + Psicopedagogía Montekids').replace('{teacher}', teacher.name)}
                </span>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                {t('calendarPage.event2Desc', 'Revisión conjunta personalizada del progreso motor fino, lenguaje activo y autorregulación de {name} según la rúbrica AMI. Se presentará el portafolio fotográfico bimestral.').replace('{name}', childName)}
              </p>
            </div>

            <div className="pt-3 flex flex-wrap items-center justify-between gap-4 border-t border-surface-container-high">
              <a
                href="https://meet.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-full bg-tertiary hover:bg-on-tertiary-container text-on-tertiary font-label-md text-label-md flex items-center gap-2 shadow-[0_6px_20px_-2px_rgba(183,0,114,0.35)] transition-transform active:scale-95"
              >
                <span className="material-symbols-outlined text-[18px]">video_camera_front</span>
                <span>{t('calendarPage.joinMeetBtn', 'Unirse a Sesión Virtual (Google Meet)')}</span>
              </a>
              <button
                type="button"
                onClick={onOpenOrderModal}
                className="px-4 py-2.5 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[18px]">format_list_bulleted</span>
                <span>{t('calendarPage.viewAgendaBtn', 'Ver Orden del Día')}</span>
              </button>
            </div>
          </div>
        </article>
      )}

      {/* Tarjeta Resumen Pedagógico */}
      <div className="bg-surface-container-lowest rounded-3xl p-5 md:p-6 shadow-[0_4px_20px_-2px_rgba(29,17,73,0.04)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary-fixed shadow-sm shrink-0">
            <span className="material-symbols-outlined text-[32px]">insights</span>
          </div>
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-black">
              {t('calendarPage.pedagogicalSummaryBadge', 'Resumen Pedagógico de Octubre')}
            </span>
            <h4 className="font-['Nunito'] text-lg text-on-surface font-extrabold">
              {t('calendarPage.pedagogicalSummaryTitle', '18 Sesiones Sensoriales Completadas')}
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {t('calendarPage.pedagogicalSummaryDesc', '{name} asistió al 96% de las actividades guiadas en su aula.').replace('{name}', childName)}
            </p>
          </div>
        </div>
        <div className="w-full md:w-48 flex flex-col items-end shrink-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="font-label-lg text-label-lg text-primary font-black">+24%</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              {t('calendarPage.vsSept', 'frente a Sept')}
            </span>
          </div>
          <svg className="w-full h-10 overflow-visible" viewBox="0 0 160 36">
            <path className="text-primary" d="M0,28 Q20,24 40,26 T80,14 T120,18 T160,4" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
            <circle className="fill-primary animate-ping" cx="160" cy="4" r="4"></circle>
            <circle className="fill-primary-container" cx="160" cy="4" r="3"></circle>
          </svg>
        </div>
      </div>
    </div>
  );
}