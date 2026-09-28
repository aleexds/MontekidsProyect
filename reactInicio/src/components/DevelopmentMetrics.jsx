
export const DevelopmentMetrics = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
      {/* Motricidad Fina */}
      <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-[0_4px_20px_-4px_rgba(29,17,73,0.06)] hover:shadow-[0_12px_32px_-4px_rgba(254,166,24,0.25)] transition-all flex flex-col justify-between gap-space-sm group">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-secondary-fixed/50 flex items-center justify-center text-secondary font-bold">
                <span className="material-symbols-outlined text-[22px]">pan_tool_alt</span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">Área Física</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Motricidad Fina</h3>
              </div>
            </div>
            <span className="font-headline-lg text-headline-lg text-secondary font-extrabold">85%</span>
          </div>
          <div className="w-full h-3.5 bg-surface-container rounded-full overflow-hidden p-0.5">
            <div className="h-full bg-secondary-container rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(254,166,24,0.6)]" style={{ width: '85%' }}></div>
          </div>
          <div className="mt-space-sm inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary-fixed/40 text-on-secondary-fixed font-label-md text-label-md">
            <span>🌟</span>
            <span>¡Excelente en uso de pinza!</span>
          </div>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant bg-surface-container-low p-2.5 rounded-md">
          Logró encastres autónomos y trasvase de semillas con cuchara ergonómica sin dificultad.
        </p>
      </div>

      {/* Lenguaje y Expresión */}
      <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-[0_4px_20px_-4px_rgba(29,17,73,0.06)] hover:shadow-[0_12px_32px_-4px_rgba(183,0,114,0.25)] transition-all flex flex-col justify-between gap-space-sm group">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-tertiary-fixed/60 flex items-center justify-center text-tertiary font-bold">
                <span className="material-symbols-outlined text-[22px]">forum</span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary">Comunicación</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Lenguaje y Expresión</h3>
              </div>
            </div>
            <span className="font-headline-lg text-headline-lg text-tertiary font-extrabold">90%</span>
          </div>
          <div className="w-full h-3.5 bg-surface-container rounded-full overflow-hidden p-0.5">
            <div className="h-full bg-tertiary rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(183,0,114,0.5)]" style={{ width: '90%' }}></div>
          </div>
          <div className="mt-space-sm inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-tertiary-fixed/40 text-on-tertiary-fixed-variant font-label-md text-label-md">
            <span>💬</span>
            <span>Conoce 6 palabras nuevas</span>
          </div>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant bg-surface-container-low p-2.5 rounded-md">
          Pronunciación fluida de fonemas /M/, /P/ y formulación de frases continuas de 4 elementos.
        </p>
      </div>

      {/* Sensorial y Cognitivo */}
      <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-[0_4px_20px_-4px_rgba(29,17,73,0.06)] hover:shadow-[0_12px_32px_-4px_rgba(0,105,113,0.25)] transition-all flex flex-col justify-between gap-space-sm group">
        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary-fixed/60 flex items-center justify-center text-primary font-bold">
                <span className="material-symbols-outlined text-[22px]">extension</span>
              </div>
              <div>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary">Cognición</span>
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Sensorial y Cognitivo</h3>
              </div>
            </div>
            <span className="font-headline-lg text-headline-lg text-primary font-extrabold">78%</span>
          </div>
          <div className="w-full h-3.5 bg-surface-container rounded-full overflow-hidden p-0.5">
            <div className="h-full bg-primary-container rounded-full transition-all duration-1000 shadow-[0_0_12px_rgba(0,219,235,0.6)]" style={{ width: '78%' }}></div>
          </div>
          <div className="mt-space-sm inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed/40 text-on-primary-fixed-variant font-label-md text-label-md">
            <span>🧩</span>
            <span>Avanzando en patrones</span>
          </div>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant bg-surface-container-low p-2.5 rounded-md">
          Reconoce secuencias por color y disfruta la caja de texturas naturales con gran atención.
        </p>
      </div>
    </section>
  );
};