import AnimatedInteractiveWord from './AnimatedInteractiveWord'; // Ajusta la ruta si está en otra carpeta

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
  // Formatear el mes y año actual (ej: "Octubre 2026") usando la fecha real o seleccionada
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  const currentMonthName = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  return (
    <div className="flex flex-col gap-6 mb-8 font-sans">
      {/* Título y Acciones Principales */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold tracking-widest text-primary uppercase mb-1 block">
            Panel de Actividades
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-on-surface tracking-tight flex flex-wrap gap-x-2">
            {/* Aplicamos el componente interactivo de colores aleatorios */}
            <AnimatedInteractiveWord 
              word="Calendario" 
              baseColorClass="text-on-surface transition-colors duration-300 cursor-default" 
            />
            <AnimatedInteractiveWord 
              word="y" 
              baseColorClass="text-on-surface transition-colors duration-300 cursor-default" 
            />
            <AnimatedInteractiveWord 
              word="Actividades" 
              baseColorClass="text-on-surface transition-colors duration-300 cursor-default" 
            />
          </h1>
        </div>

        {/* Botón de Sincronización */}
        <div className="flex items-center gap-3">
          <button
            onClick={onSync}
            className="flex items-center gap-2 bg-primary text-on-primary px-4 py-2.5 rounded-2xl font-bold text-sm shadow-sm hover:opacity-95 transition-all cursor-pointer active:scale-95"
          >
            <span className="material-symbols-outlined text-lg">sync</span>
            Sincronizar Calendario
          </button>
        </div>
      </div>

      {/* Barra de Control: Meses, Navegación y Filtros */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 bg-surface-container-lowest p-4 rounded-3xl border border-surface-container-low shadow-sm">
        
        {/* Navegador de Meses */}
        <div className="flex items-center justify-between lg:justify-start gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={onPrevMonth}
              className="p-2 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface transition-colors cursor-pointer"
              title="Mes Anterior"
            >
              <span className="material-symbols-outlined text-xl">chevron_left</span>
            </button>
            
            <h2 className="text-lg font-bold text-on-surface min-w-[160px] text-center">
              {currentMonthName} {currentYear}
            </h2>

            <button
              onClick={onNextMonth}
              className="p-2 rounded-xl bg-surface-container-low hover:bg-surface-container-high text-on-surface transition-colors cursor-pointer"
              title="Mes Siguiente"
            >
              <span className="material-symbols-outlined text-xl">chevron_right</span>
            </button>
          </div>
        </div>

        {/* Selector de Categorías (Filtros) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'all'
                ? 'bg-primary text-on-primary shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Todas
          </button>
          <button
            onClick={() => setActiveCategory('workshops')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'workshops'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Estimulación AMI
          </button>
          <button
            onClick={() => setActiveCategory('special')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'special'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Lúdico / Huerta
          </button>
          <button
            onClick={() => setActiveCategory('meetings')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === 'meetings'
                ? 'bg-fuchsia-600 text-white shadow-sm'
                : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            Reunión Familias
          </button>
        </div>

        {/* Selector de Vistas (Mes / Semana / Agenda) */}
        <div className="flex items-center bg-surface-container-low p-1 rounded-2xl self-center lg:self-auto">
          <button
            onClick={() => setActiveView('mes')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeView === 'mes'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Mes
          </button>
          <button
            onClick={() => setActiveView('semana')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeView === 'semana'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Semana
          </button>
          <button
            onClick={() => setActiveView('agenda')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeView === 'agenda'
                ? 'bg-surface-container-lowest text-on-surface shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Agenda
          </button>
        </div>

      </div>
    </div>
  );
}