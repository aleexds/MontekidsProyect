import { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/useAuth';

const API = 'http://localhost:3000';

export function CalendarGrid({
  activeView = 'mes',
  activeCategory = 'all',
  onSelectEvent,
  currentDate = new Date()
}) {
  const { t } = useLanguage();
  const { activeUser } = useAuth();
  const [apiEvents, setApiEvents] = useState([]);

  const userClassroom = activeUser?.role === 'teacher' 
    ? activeUser?.classroom 
    : (activeUser?.child?.classroom || null);

  useEffect(() => {
    fetch(`${API}/curriculumEvents`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data)) {
          setApiEvents(data);
        }
      })
      .catch(e => console.error(e));
  }, []);

  const defaultMonths = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const translatedMonths = t('calendarPage.months');
  const monthNames = Array.isArray(translatedMonths) ? translatedMonths : defaultMonths;

  const translatedDays = t('calendarPage.daysOfWeek');
  const daysOfWeek = Array.isArray(translatedDays) ? translatedDays : ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const allEvents = useMemo(() => {
    const categoryColors = {
      workshops: { badge: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300', dot: 'bg-emerald-500' },
      special: { badge: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300', dot: 'bg-amber-500' },
      meetings: { badge: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200 dark:bg-fuchsia-950/40 dark:text-fuchsia-300', dot: 'bg-fuchsia-500' },
      academic: { badge: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950/40 dark:text-blue-300', dot: 'bg-blue-500' }
    };

    if (Array.isArray(apiEvents) && apiEvents.length > 0) {
      const filteredEvents = userClassroom
        ? apiEvents.filter(evt => !evt.classroom || evt.classroom === userClassroom)
        : apiEvents;

      return filteredEvents.map(evt => {
        const parts = evt.date ? evt.date.split('-') : [];
        let evtDate = new Date();
        if (parts.length === 3) {
          evtDate = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        }
        const colors = categoryColors[evt.category] || categoryColors.academic;

        return {
          id: evt.id,
          title: evt.title,
          date: evtDate,
          dateText: evt.date && parts.length === 3 ? `${parts[2]} ${monthNames[parseInt(parts[1], 10) - 1] || ''} ${parts[0]}` : '',
          time: evt.time || 'Durante la jornada',
          category: evt.category || 'academic',
          categoryLabel: evt.categoryLabel || 'Actividad',
          badgeColor: colors.badge,
          dotColor: colors.dot,
          description: evt.description || ''
        };
      });
    }

    return [
      {
        id: 'evt-1',
        title: t('calendarPage.events.evt1Title', 'Taller Fonemático y Estimulación'),
        date: new Date(2026, 9, 9),
        dateText: `09 ${monthNames[9]} 2026`,
        time: '09:00 AM - 10:30 AM',
        category: 'workshops',
        categoryLabel: t('calendarPage.events.evt1Cat', 'Estimulación AMI'),
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300',
        dotColor: 'bg-emerald-500',
        description: t('calendarPage.events.evt1Desc', 'Sesión práctica de desarrollo de lenguaje y habilidades fonológicas.')
      },
      {
        id: 'evt-2',
        title: t('calendarPage.events.evt2Title', 'Circuito Sensorial de Primavera'),
        date: new Date(2026, 9, 17),
        dateText: `17 ${monthNames[9]} 2026`,
        time: '10:00 AM - 12:00 PM',
        category: 'special',
        categoryLabel: t('calendarPage.events.evt2Cat', 'Lúdico / Huerta'),
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300',
        dotColor: 'bg-amber-500',
        description: t('calendarPage.events.evt2Desc', 'Actividades al aire libre para exploración táctil y motricidad gruesa.')
      },
      {
        id: 'evt-3',
        title: t('calendarPage.events.evt3Title', 'Taller Fonemático Avanzado'),
        date: new Date(2026, 9, 23),
        dateText: `23 ${monthNames[9]} 2026`,
        time: '09:00 AM - 10:30 AM',
        category: 'workshops',
        categoryLabel: t('calendarPage.events.evt3Cat', 'Estimulación AMI'),
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300',
        dotColor: 'bg-emerald-500',
        description: t('calendarPage.events.evt3Desc', 'Continuación del taller de fonemas enfocado en articulación y vocabulario.')
      },
      {
        id: 'evt-4',
        title: t('calendarPage.events.evt4Title', 'Reunión Trimestral de Familias'),
        date: new Date(2026, 9, 27),
        dateText: `27 ${monthNames[9]} 2026`,
        time: '04:00 PM - 05:30 PM',
        category: 'meetings',
        categoryLabel: t('calendarPage.events.evt4Cat', 'Reunión Familias'),
        badgeColor: 'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200 dark:bg-fuchsia-950/40 dark:text-fuchsia-300',
        dotColor: 'bg-fuchsia-500',
        description: t('calendarPage.events.evt4Desc', 'Presentación de informes de avance académico y emocional del periodo.')
      },
      {
        id: 'evt-5',
        title: t('calendarPage.events.evt5Title', 'Día del Sombrero Loco'),
        date: new Date(2026, 9, 31),
        dateText: `31 ${monthNames[9]} 2026`,
        time: t('calendarPage.events.evt5Time', 'Durante la jornada'),
        category: 'special',
        categoryLabel: t('calendarPage.events.evt5Cat', 'Lúdico / Huerta'),
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300',
        dotColor: 'bg-amber-500',
        description: t('calendarPage.events.evt5Desc', 'Celebración temática interactiva. Recuerda traer el material reciclado.')
      }
    ];
  }, [apiEvents, t, monthNames]);

  const filteredEvents = useMemo(() => {
    return allEvents.filter((evt) => {
      const matchesCategory = activeCategory === 'all' || evt.category === activeCategory;
      const matchesMonth = 
        evt.date.getMonth() === currentDate.getMonth() && 
        evt.date.getFullYear() === currentDate.getFullYear();
      return matchesCategory && matchesMonth;
    });
  }, [allEvents, activeCategory, currentDate]);

  const daysToRender = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    if (activeView === 'semana') {
      const startOfWeek = new Date(year, month, 15);
      const dayOfWeek = startOfWeek.getDay();
      const sunday = new Date(startOfWeek);
      sunday.setDate(startOfWeek.getDate() - dayOfWeek);

      const weekDays = [];
      for (let i = 0; i < 7; i++) {
        const nextDay = new Date(sunday);
        nextDay.setDate(sunday.getDate() + i);
        weekDays.push(nextDay);
      }
      return weekDays;
    }

    const firstDayIndex = new Date(year, month, 1).getDay();
    const totalDays = new Date(year, month + 1, 0).getDate();
    const daysArray = [];

    for (let i = 0; i < firstDayIndex; i++) {
      daysArray.push(null);
    }
    for (let day = 1; day <= totalDays; day++) {
      daysArray.push(new Date(year, month, day));
    }

    return daysArray;
  }, [currentDate, activeView]);

  // -------------------------------------------------------------
  // VISTA: AGENDA
  // -------------------------------------------------------------
  if (activeView === 'agenda') {
    return (
      <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm border border-outline-variant/30 transition-all duration-300 font-sans">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-surface-container-low">
          <div className="flex items-center gap-3">
            <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              {filteredEvents.length} {t('calendarPage.eventsThisMonth', 'Eventos este mes')}
            </span>
            <h3 className="text-lg font-bold text-on-surface">{t('calendarPage.upcomingActivities', 'Próximas Actividades')}</h3>
          </div>
          <span className="text-xs text-on-surface-variant font-medium">{t('calendarPage.chronologicalOrder', 'Orden cronológico')}</span>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="text-center py-12 text-on-surface-variant">
            <span className="material-symbols-outlined text-4xl mb-2">event_busy</span>
            <p className="text-sm font-medium">{t('calendarPage.noEvents', 'No hay eventos para este filtro o mes seleccionado.')}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                id={evt.id}
                onClick={() => onSelectEvent && onSelectEvent(evt.id)}
                className="group flex flex-col md:flex-row md:items-center justify-between p-4 rounded-2xl border border-surface-container-low bg-surface-container-lowest hover:bg-surface-container-low hover:border-primary/20 transition-all duration-200 cursor-pointer gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center justify-center bg-surface-container-low border border-surface-container-high rounded-xl px-3 py-2 min-w-[70px] text-center shadow-2xs">
                    <span className="text-xs font-bold uppercase text-primary">
                      {evt.dateText.split(' ')[1]}
                    </span>
                    <span className="text-xl font-black text-on-surface">
                      {evt.dateText.split(' ')[0]}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${evt.badgeColor}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${evt.dotColor}`}></span>
                        {evt.categoryLabel}
                      </span>
                      <span className="text-xs text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm">schedule</span>
                        {evt.time}
                      </span>
                    </div>

                    <h4 className="font-bold text-on-surface group-hover:text-primary transition-colors text-base">
                      {evt.title}
                    </h4>
                    <p className="text-xs text-on-surface-variant mt-1 line-clamp-1">
                      {evt.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // -------------------------------------------------------------
  // VISTA: MES Y SEMANA
  // -------------------------------------------------------------
  return (
    <div className="bg-surface-container-lowest rounded-3xl p-5 md:p-6 shadow-[0_4px_24px_-2px_rgba(29,17,73,0.06)] flex flex-col font-sans">
      <div className="flex flex-wrap items-center justify-between pb-3 mb-4 gap-2 border-b border-surface-container-low">
        <div className="flex items-center gap-3">
          <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            {filteredEvents.length} {t('calendarPage.eventsThisMonth', 'Eventos este mes')}
          </span>
        </div>
      </div>

      <div className="w-full border border-surface-container-low rounded-2xl overflow-hidden bg-surface-container-low dark:bg-zinc-800/90">
        <div className="grid grid-cols-7 bg-surface-container-low dark:bg-zinc-800 text-center border-b border-surface-container-low dark:border-zinc-700/60">
          {daysOfWeek.map((day) => (
            <div key={day} className="py-2.5 text-xs font-bold text-on-surface-variant uppercase tracking-wider">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 auto-rows-fr bg-surface-container-low/20 dark:bg-zinc-900/60 gap-[1px]">
          {daysToRender.map((date, idx) => {
            if (!date) {
              return (
                <div
                  key={`empty-${idx}`}
                  className="bg-white dark:bg-zinc-800/50 min-h-[90px] p-1.5 opacity-30"
                ></div>
              );
            }

            const dayNum = date.getDate();
            const dayEvents = filteredEvents.filter(
              (e) => e.date.toDateString() === date.toDateString()
            );

            // Verificamos si la celda actual corresponde al día de hoy real
            const today = new Date();
            const isToday = 
              date.getDate() === today.getDate() &&
              date.getMonth() === today.getMonth() &&
              date.getFullYear() === today.getFullYear();

            return (
              <div
                key={date.toISOString()}
                className={`min-h-[90px] p-1.5 flex flex-col justify-between transition-colors ${
                  isToday 
                    ? 'bg-primary-container/25 dark:bg-primary/20 ring-2 ring-primary ring-inset z-10' 
                    : 'bg-white dark:bg-zinc-800/90 dark:hover:bg-zinc-700/80 hover:bg-surface-container-lowest/80'
                }`}
              >
                <div className="text-right">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      isToday
                        ? 'bg-primary text-on-primary shadow-sm'
                        : dayEvents.length > 0
                        ? 'bg-primary-container text-on-primary-container dark:bg-primary/20 dark:text-cyan-300'
                        : 'text-on-surface-variant'
                    }`}
                  >
                    {dayNum}
                  </span>
                </div>

                <div className="flex flex-col gap-1 mt-1 overflow-y-auto max-h-[60px]">
                  {dayEvents.map((evt) => (
                    <button
                      key={evt.id}
                      type="button"
                      onClick={() => onSelectEvent && onSelectEvent(evt.id)}
                      className={`text-left text-white text-[10px] font-bold px-1.5 py-1 rounded-md truncate shadow-sm transition-transform hover:scale-[1.02] cursor-pointer ${evt.dotColor}`}
                      title={`${evt.title} - ${evt.time}`}
                    >
                      {evt.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}