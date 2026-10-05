export function GamesAchievements() {
  return (
    <section className="w-full mt-6">
      <div className="bg-surface-container-lowest rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col justify-between">
        {/* Header row */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                emoji_events
              </span>
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-on-surface leading-tight">Mis Logros de Hoy</h3>
              <p className="text-xs text-on-surface-variant font-medium">¡Casi desbloqueas tu próximo juguete mágico!</p>
            </div>
          </div>
          <span className="px-4 py-1 rounded-full bg-secondary-container text-on-secondary-container font-bold shadow-sm">70%</span>
        </div>

        {/* Progress bar */}
        <div className="relative w-full py-2 mb-6">
          <div className="w-full h-6 bg-surface-container rounded-full overflow-hidden p-1 shadow-inner flex items-center">
            <div
              className="h-full bg-gradient-to-r from-primary-container via-secondary-container to-tertiary rounded-full relative transition-all duration-700 shadow-md"
              style={{ width: '70%' }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
            </div>
          </div>
          <div className="flex justify-between items-center px-1 mt-2 font-bold text-xs">
            <span className="text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              Inicio (0 pts)
            </span>
            <span className="text-secondary flex items-center gap-1">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              Meta 1 (3 pts)
            </span>
            <span className="text-tertiary flex items-center gap-1 animate-bounce">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>redeem</span>
              ¡Cofre (5 pts)!
            </span>
          </div>
        </div>

        {/* Medals - full width grid */}
        <div className="mb-6">
          <span className="text-xs uppercase tracking-wider text-on-surface-variant font-extrabold block mb-3">Tus Medallas Ganadas</span>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col items-center justify-center hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-primary text-3xl mb-1">record_voice_over</span>
              <span className="text-xs font-bold text-on-surface mt-1">Explorador Fonemas</span>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col items-center justify-center hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-secondary text-3xl mb-1">extension</span>
              <span className="text-xs font-bold text-on-surface mt-1">Maestro de Formas</span>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col items-center justify-center hover:bg-surface-container transition-colors">
              <span className="material-symbols-outlined text-tertiary text-3xl mb-1">hearing</span>
              <span className="text-xs font-bold text-on-surface mt-1">Oído Musical</span>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col items-center justify-center hover:bg-surface-container transition-colors opacity-40">
              <span className="material-symbols-outlined text-on-surface-variant text-3xl mb-1">lock</span>
              <span className="text-xs font-bold text-on-surface-variant mt-1">Por desbloquear</span>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col items-center justify-center hover:bg-surface-container transition-colors opacity-40">
              <span className="material-symbols-outlined text-on-surface-variant text-3xl mb-1">lock</span>
              <span className="text-xs font-bold text-on-surface-variant mt-1">Por desbloquear</span>
            </div>
            <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col items-center justify-center hover:bg-surface-container transition-colors opacity-40">
              <span className="material-symbols-outlined text-on-surface-variant text-3xl mb-1">lock</span>
              <span className="text-xs font-bold text-on-surface-variant mt-1">Por desbloquear</span>
            </div>
          </div>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between bg-surface-container rounded-2xl px-4 py-3">
          <div className="flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-primary text-lg">psychology</span>
            <span className="text-xs font-bold">Sesión adaptada al ritmo natural de Mateo</span>
          </div>
          <button className="text-primary text-xs hover:underline font-bold" type="button">Ver Galería</button>
        </div>
      </div>
    </section>
  );
}