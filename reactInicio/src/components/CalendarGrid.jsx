export function CalendarGrid({ onSelectEvent, onAgendaQuickPeek }) {
  return (
    <div className="bg-surface-container-lowest rounded-3xl p-4 md:p-space-lg shadow-[0_4px_24px_-2px_rgba(29,17,73,0.06)] flex flex-col font-sans">
      {/* Banner de Estado del Mes */}
      <div className="flex flex-wrap items-center justify-between pb-space-sm mb-space-sm gap-2">
        <div className="flex items-center gap-2">
          <h2 className="font-['Nunito'] text-xl font-bold text-on-surface">Cuadrícula Mensual</h2>
          <span className="px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-bold">
            Semana 4 de 5
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-body-sm font-body-sm text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-secondary-container"></span>
            <span>Lúdico / Huerta</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-tertiary"></span>
            <span>Reunión Familias</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-primary-container"></span>
            <span>Estimulación AMI</span>
          </div>
        </div>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2 text-center">
        {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, idx) => (
          <div
            key={day}
            className={`py-2 font-label-md text-label-md uppercase tracking-wider ${
              idx >= 5 ? 'text-secondary font-bold' : 'text-on-surface-variant'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Cuadrícula de días */}
      <div className="grid grid-cols-7 gap-1 md:gap-2 auto-rows-fr">
        {/* Sept 30 */}
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low/50 opacity-40 flex flex-col justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant">30</span>
          <span className="font-label-sm text-label-sm text-outline-variant">Sept</span>
        </div>

        {/* Oct 01 - 04 */}
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col justify-between group cursor-pointer">
          <span className="font-label-md text-label-md text-on-surface-variant group-hover:text-on-surface font-bold">01</span>
          <div className="text-[10px] text-outline-variant font-label-sm">Comienzo Ciclo</div>
        </div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col justify-between group cursor-pointer">
          <span className="font-label-md text-label-md text-on-surface-variant group-hover:text-on-surface font-bold">02</span>
          <div className="p-1 rounded-lg bg-surface-container-high text-on-surface font-label-sm text-[10px] truncate">Música Suave</div>
        </div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant font-bold">03</span>
        </div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant font-bold">04</span>
        </div>

        {/* Fin de semana 05-06 */}
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low/60 flex flex-col justify-between">
          <span className="font-label-md text-label-md text-secondary/70 font-semibold">05</span>
        </div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low/60 flex flex-col justify-between">
          <span className="font-label-md text-label-md text-secondary/70 font-semibold">06</span>
        </div>

        {/* Semana 2: Oct 07 - 13 */}
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low flex flex-col justify-between"><span className="font-label-md font-bold text-on-surface-variant">07</span></div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low flex flex-col justify-between"><span className="font-label-md font-bold text-on-surface-variant">08</span></div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant font-bold">09</span>
          <div className="px-1.5 py-0.5 rounded-md bg-primary-fixed/60 text-on-primary-fixed-variant font-label-sm text-[10px] font-bold truncate">Taller Fonemas</div>
        </div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low flex flex-col justify-between"><span className="font-label-md font-bold text-on-surface-variant">10</span></div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low flex flex-col justify-between"><span className="font-label-md font-bold text-on-surface-variant">11</span></div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low/60 flex flex-col justify-between"><span className="font-label-md font-semibold text-secondary/70">12</span></div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low/60 flex flex-col justify-between"><span className="font-label-md font-semibold text-secondary/70">13</span></div>

        {/* Semana 3: Oct 14 - 20 */}
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low flex flex-col justify-between"><span className="font-label-md font-bold text-on-surface-variant">14</span></div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low flex flex-col justify-between"><span className="font-label-md font-bold text-on-surface-variant">15</span></div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low flex flex-col justify-between"><span className="font-label-md font-bold text-on-surface-variant">16</span></div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant font-bold">17</span>
          <div className="px-1.5 py-0.5 rounded-md bg-primary-container/40 text-on-primary-container font-label-sm text-[10px] font-bold truncate">Circuito Sensorial</div>
        </div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low flex flex-col justify-between"><span className="font-label-md font-bold text-on-surface-variant">18</span></div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low/60 flex flex-col justify-between"><span className="font-label-md font-semibold text-secondary/70">19</span></div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low/60 flex flex-col justify-between"><span className="font-label-md font-semibold text-secondary/70">20</span></div>

        {/* Semana 4: Oct 21 - 27 */}
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low flex flex-col justify-between"><span className="font-label-md font-bold text-on-surface-variant">21</span></div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low flex flex-col justify-between"><span className="font-label-md font-bold text-on-surface-variant">22</span></div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant font-bold">23</span>
          <div className="px-1.5 py-0.5 rounded-md bg-primary-fixed/60 text-on-primary-fixed-variant font-label-sm text-[10px] font-bold truncate">Taller Fonemas</div>
        </div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low flex flex-col justify-between"><span className="font-label-md font-bold text-on-surface-variant">24</span></div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low flex flex-col justify-between"><span className="font-label-md font-bold text-on-surface-variant">25</span></div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low/60 flex flex-col justify-between"><span className="font-label-md font-semibold text-secondary/70">26</span></div>
        
        {/* Oct 27 (Reunión) */}
        <div 
          onClick={() => onSelectEvent('evento-reunion')}
          className="min-h-[105px] p-2 rounded-2xl bg-tertiary-fixed/30 hover:bg-tertiary-fixed/50 transition-all flex flex-col justify-between shadow-sm cursor-pointer border-2 border-tertiary/20"
        >
          <div className="flex items-center justify-between">
            <span className="font-['Nunito'] text-lg text-tertiary font-extrabold">27</span>
            <span className="material-symbols-outlined text-tertiary text-[18px]">videocam</span>
          </div>
          <div className="p-1 rounded-xl bg-tertiary text-on-tertiary font-label-sm text-[10px] font-bold shadow-sm leading-tight">
            Reunión Familias 16:00
          </div>
        </div>

        {/* Semana 5: Oct 28 (HOY) - 31 */}
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-highest flex flex-col justify-between shadow-[0_8px_24px_-4px_rgba(78,0,222,0.25)] relative transform hover:-translate-y-0.5 transition-transform">
          <div className="flex items-center justify-between">
            <span className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-['Nunito'] text-sm font-black">28</span>
            <span className="px-2 py-0.5 rounded-full bg-inverse-surface text-inverse-on-surface font-label-sm text-[10px] font-extrabold uppercase tracking-wide">Hoy</span>
          </div>
          <div className="p-1 rounded-lg bg-surface-container-lowest text-on-surface font-label-sm text-[10px] font-semibold flex items-center gap-1 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
            <span>Clase Sensorial</span>
          </div>
        </div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low flex flex-col justify-between"><span className="font-label-md font-bold text-on-surface-variant">29</span></div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors flex flex-col justify-between">
          <span className="font-label-md text-label-md text-on-surface-variant font-bold">30</span>
          <div className="px-1.5 py-0.5 rounded-md bg-secondary-fixed text-on-secondary-fixed font-label-sm text-[10px] font-bold truncate">Prep. Disfraces</div>
        </div>

        {/* Oct 31 (Sombrero Loco) */}
        <div 
          onClick={() => onSelectEvent('evento-sombrero')}
          className="min-h-[105px] p-2 rounded-2xl bg-secondary-fixed/40 hover:bg-secondary-fixed/60 transition-all flex flex-col justify-between cursor-pointer shadow-sm border-2 border-secondary/30"
        >
          <div className="flex items-center justify-between">
            <span className="font-['Nunito'] text-lg text-secondary font-extrabold">31</span>
            <span className="material-symbols-outlined text-secondary text-[18px]">celebration</span>
          </div>
          <div className="p-1 rounded-xl bg-secondary-container text-on-secondary-fixed font-label-sm text-[10px] font-extrabold shadow-sm leading-tight truncate">
            🎩 Sombrero Loco & Huerta
          </div>
        </div>

        {/* Noviembre Previsualización */}
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low/50 opacity-70 flex flex-col justify-between">
          <div className="flex justify-between">
            <span className="font-label-md text-label-md text-on-surface-variant">01</span>
            <span className="font-label-sm text-[10px] text-outline">Nov</span>
          </div>
          <span className="font-label-sm text-[10px] text-outline-variant">Asueto Escolar</span>
        </div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low/40 opacity-70 flex flex-col justify-between"><span className="font-label-md text-secondary/60">02</span></div>
        <div className="min-h-[105px] p-2 rounded-2xl bg-surface-container-low/40 opacity-70 flex flex-col justify-between"><span className="font-label-md text-secondary/60">03</span></div>
      </div>

      {/* Vista rápida Nov 05 */}
      <div className="mt-space-md pt-space-sm bg-surface-container-low rounded-2xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">Próxima Semana: Mar 05 Nov</span>
          <span className="font-label-md text-label-md text-on-surface font-semibold">Taller de Lectura Compartida con Familias (Biblioteca Nido)</span>
        </div>
        <button 
          type="button" 
          onClick={onAgendaQuickPeek}
          className="font-label-sm text-label-sm text-primary hover:underline font-bold flex items-center gap-1 cursor-pointer shrink-0"
        >
          <span>Agendar</span>
          <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}