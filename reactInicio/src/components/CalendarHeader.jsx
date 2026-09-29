import { useState } from 'react';

export function CalendarHeader({ activeCategory, setActiveCategory, activeView, setActiveView, onSync }) {
  const [currentMonth] = useState('Octubre 2024');

  return (
    <section className="flex flex-col gap-space-sm mb-space-lg font-sans">
      <div className="flex flex-wrap items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm">
          <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-on-primary shadow-[0_8px_20px_-4px_rgba(0,105,113,0.35)] shrink-0">
            <span className="material-symbols-outlined text-[28px]">calendar_month</span>
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-['Nunito'] text-2xl md:text-3xl font-extrabold text-on-surface tracking-tight">
                Calendario Escolar y Actividades de Mateo
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                En Vivo
              </span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant flex flex-wrap items-center gap-2 mt-0.5">
              <span className="inline-flex items-center text-secondary font-semibold">
                <span className="material-symbols-outlined text-[18px] mr-1">potted_plant</span>
                Aula Semillitas (2 a 3 años)
              </span>
              <span className="text-outline-variant">•</span>
              <span>Ciclo Octubre - Noviembre 2024</span>
              <span className="text-outline-variant">•</span>
              <span className="text-primary font-bold">Docente Karina M.</span>
            </p>
          </div>
        </div>

        {/* Botón de Sincronización */}
        <div className="flex items-center gap-space-xs shrink-0">
          <button
            type="button"
            onClick={onSync}
            className="group relative px-5 py-3 rounded-full bg-primary-container hover:bg-primary-fixed text-on-primary-fixed font-label-lg text-label-lg shadow-[0_8px_24px_-4px_rgba(0,219,235,0.4)] transition-all duration-200 flex items-center gap-2 active:translate-y-0.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-180 duration-500">
              sync
            </span>
            <span>Sincronizar con Google Calendar / iCal</span>
          </button>
        </div>
      </div>

      {/* Controles de Vista, Navegación y Filtros */}
      <div className="mt-space-sm p-3 rounded-2xl bg-surface-container-lowest shadow-[0_4px_16px_-2px_rgba(29,17,73,0.05)] flex flex-col md:flex-row items-center justify-between gap-space-md">
        
        {/* Selector de Mes + Vistas */}
        <div className="flex flex-wrap items-center gap-space-xs w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center bg-surface-container-low rounded-full p-1 shadow-inner">
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container-highest text-on-surface transition-colors cursor-pointer"
              title="Mes Anterior"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_left</span>
            </button>
            <div className="px-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[20px]">event</span>
              <span className="font-['Nunito'] text-base md:text-lg text-on-surface font-extrabold tracking-tight">
                {currentMonth}
              </span>
            </div>
            <button
              type="button"
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-surface-container-highest text-on-surface transition-colors cursor-pointer"
              title="Mes Siguiente"
            >
              <span className="material-symbols-outlined text-[20px]">chevron_right</span>
            </button>
          </div>

          {/* Selector de Modo de Vista */}
          <div className="inline-flex p-1 rounded-full bg-surface-container-low">
            {[
              { id: 'mes', label: 'Mes' },
              { id: 'semana', label: 'Semana' },
              { id: 'agenda', label: 'Agenda' }
            ].map((view) => (
              <button
                key={view.id}
                type="button"
                onClick={() => setActiveView(view.id)}
                className={`px-4 py-1.5 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                  activeView === view.id
                    ? 'bg-inverse-surface text-inverse-on-surface shadow-sm font-bold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {view.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chips de Categorías */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
          {[
            { id: 'all', label: 'Todos los eventos (5)', bg: 'bg-primary text-on-primary', dot: 'bg-white animate-pulse' },
            { id: 'special', label: 'Actividades Especiales (2)', bg: 'bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary-container', dot: 'bg-secondary' },
            { id: 'meetings', label: 'Reuniones de Padres (1)', bg: 'bg-tertiary-fixed text-on-tertiary-fixed hover:bg-tertiary-container', dot: 'bg-tertiary' },
            { id: 'workshops', label: 'Talleres Estimulación (2)', bg: 'bg-primary-fixed text-on-primary-fixed hover:bg-primary-container', dot: 'bg-primary' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer ${
                activeCategory === cat.id
                  ? 'ring-2 ring-primary shadow-sm font-bold ' + cat.bg
                  : cat.bg
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${cat.dot}`}></span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
}