import AnimatedInteractiveWord from './AnimatedInteractiveWord';
import { useLanguage } from '../context/LanguageContext';

export function CalendarHeader({
  activeCategory,
  setActiveCategory,
  activeView,
  setActiveView,
  onSync,
  currentDate,
  onPrevMonth,
  onNextMonth
}) {
  const { t } = useLanguage();

  const defaultMonths = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const translatedMonths = t('calendarPage.months');
  const monthNames = Array.isArray(translatedMonths) ? translatedMonths : defaultMonths;
  
  const currentMonthName = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  return (
    <div className="flex flex-col gap-6 mb-12 font-sans">
      {/* Fila Superior: Título y Botón de Sincronización */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-primary uppercase mb-1 block">
            {t('calendarPage.activitiesPanel', 'Panel de Actividades')}
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-on-surface tracking-tight flex flex-wrap gap-x-2">
            <AnimatedInteractiveWord 
              word={t('calendarPage.titleWord1', 'Calendario')} 
              baseColorClass="text-on-surface transition-colors duration-300 cursor-default" 
            />
            <AnimatedInteractiveWord 
              word={t('calendarPage.titleWord2', 'y')} 
              baseColorClass="text-on-surface transition-colors duration-300 cursor-default" 
            />
            <AnimatedInteractiveWord 
              word={t('calendarPage.titleWord3', 'Actividades')} 
              baseColorClass="text-on-surface transition-colors duration-300 cursor-default" 
            />
          </h1>
        </div>

        {/* Botón de Sincronización */}
        <button
          onClick={onSync}
          className="flex items-center gap-2 bg-[#006971] text-white px-4 py-2.5 rounded-2xl font-bold text-sm shadow-sm hover:opacity-95 transition-all cursor-pointer active:scale-95 w-fit"
        >
          <span className="material-symbols-outlined text-lg">sync</span>
          {t('calendarPage.syncBtn', 'Sincronizar con Google Calendar / iCal')}
        </button>
      </div>

      {/* Fila de Controles: Mes, Vistas y Filtros (Con separación adicional respecto al título) */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-surface-container-lowest p-3.5 rounded-3xl border border-surface-container-low shadow-sm mt-3">
        
        {/* Bloque Izquierdo: Selector de Mes con Icono y Vistas */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Navegador de Meses con el icono de calendario incorporado */}
          <div className="flex items-center bg-surface-container-low px-2 py-1.5 rounded-2xl border border-surface-container-high/40 gap-1.5">
            <span className="material-symbols-outlined text-primary text-lg pl-1">calendar_month</span>
            <button
              onClick={onPrevMonth}
              className="p-1 rounded-xl hover:bg-surface-container-lowest text-on-surface transition-colors cursor-pointer"
              title={t('calendarPage.prevMonth', 'Mes Anterior')}
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            
            <h2 className="text-sm font-bold text-on-surface px-1 min-w-[120px] text-center">
              {currentMonthName} {currentYear}
            </h2>

            <button
              onClick={onNextMonth}
              className="p-1 rounded-xl hover:bg-surface-container-lowest text-on-surface transition-colors cursor-pointer"
              title={t('calendarPage.nextMonth', 'Mes Siguiente')}
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>

          {/* Selector de Vistas (Texto blanco claro para la opción activa) */}
          <div className="flex items-center bg-surface-container-low p-1 rounded-2xl border border-surface-container-high/40">
            <button
              onClick={() => setActiveView('mes')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeView === 'mes'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {t('calendarPage.viewMonth', 'Mes')}
            </button>
            <button
              onClick={() => setActiveView('semana')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeView === 'semana'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {t('calendarPage.viewWeek', 'Semana')}
            </button>
            <button
              onClick={() => setActiveView('agenda')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeView === 'agenda'
                  ? 'bg-primary text-white shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {t('calendarPage.viewAgenda', 'Agenda')}
            </button>
          </div>
        </div>

        {/* Bloque Derecho: Filtros por Tipo de Evento (Píldoras) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 xl:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === 'all'
                ? 'bg-on-surface text-surface shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
            {t('calendarPage.filterAll', 'Todos los eventos')}
          </button>

          <button
            onClick={() => setActiveCategory('special')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === 'special'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-amber-500/10 text-amber-800 dark:text-amber-300 hover:bg-amber-500/20 border border-amber-500/20'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            {t('calendarPage.filterSpecial', 'Actividades Especiales (2)')}
          </button>

          <button
            onClick={() => setActiveCategory('meetings')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === 'meetings'
                ? 'bg-fuchsia-600 text-white shadow-sm'
                : 'bg-fuchsia-500/10 text-fuchsia-800 dark:text-fuchsia-300 hover:bg-fuchsia-500/20 border border-fuchsia-500/20'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-fuchsia-500"></span>
            {t('calendarPage.filterMeetings', 'Reuniones de Padres (1)')}
          </button>

          <button
            onClick={() => setActiveCategory('workshops')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
              activeCategory === 'workshops'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-500/20 border border-emerald-500/20'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            {t('calendarPage.filterWorkshops', 'Talleres Estimulación (2)')}
          </button>
        </div>


      </div>
    </div>
  );
}