export function CalendarModals({
  showOrderModal,
  setShowOrderModal,
  showIAModal,
  setShowIAModal,
  toastState
}) {
  return (
    <>
      {/* MODAL 1: Orden del Día */}
      {showOrderModal && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 font-sans">
          <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-[0_24px_48px_-8px_rgba(30,18,74,0.2)] flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200 border border-outline-variant/30">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">assignment</span>
                </div>
                <div>
                  <h3 className="font-['Nunito'] text-xl text-on-surface font-extrabold leading-tight">Orden del Día</h3>
                  <p className="text-xs text-on-surface-variant font-medium">Reunión Trimestral • 27 Octubre</p>
                </div>
              </div>
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface flex items-center justify-center cursor-pointer transition-colors"
                onClick={() => setShowOrderModal(false)}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-3 text-on-surface-variant font-body-md text-body-md">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-surface-container-low/60">
                <span className="w-7 h-7 rounded-full bg-primary text-white font-label-md text-xs font-bold flex items-center justify-center shrink-0 shadow-sm mt-0.5">1</span>
                <div>
                  <strong className="text-on-surface block font-bold text-sm">16:00 - 16:15 hrs: Bienvenida y Enfoque Bimestral</strong>
                  <p className="text-xs text-on-surface-variant mt-0.5">Introducción al método de observación Montessori del Aula Semillitas.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-surface-container-low/60">
                <span className="w-7 h-7 rounded-full bg-primary text-white font-label-md text-xs font-bold flex items-center justify-center shrink-0 shadow-sm mt-0.5">2</span>
                <div>
                  <strong className="text-on-surface block font-bold text-sm">16:15 - 16:40 hrs: Presentación Individual de Informes</strong>
                  <p className="text-xs text-on-surface-variant mt-0.5">Revisión del neurodesarrollo motor, esquema corporal e interacción de Mateo.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-surface-container-low/60">
                <span className="w-7 h-7 rounded-full bg-primary text-white font-label-md text-xs font-bold flex items-center justify-center shrink-0 shadow-sm mt-0.5">3</span>
                <div>
                  <strong className="text-on-surface block font-bold text-sm">16:40 - 17:00 hrs: Espacio de Consultas con Psicopedagogía</strong>
                  <p className="text-xs text-on-surface-variant mt-0.5">Pautas para el acompañamiento en casa y estimulación del sueño autónomo.</p>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-surface-container flex items-center justify-end">
              <button
                type="button"
                className="px-6 py-3 rounded-full bg-primary hover:bg-primary/90 text-on-primary font-bold text-xs shadow-md transition-all cursor-pointer"
                onClick={() => setShowOrderModal(false)}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Guía IA Paso a Paso Lúdico (Estilo aireado) */}
      {showIAModal && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-4 md:p-6 font-sans">
          <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-[0_24px_48px_-8px_rgba(30,18,74,0.2)] flex flex-col gap-6 animate-in fade-in zoom-in-95 duration-200 border border-outline-variant/30">
            
            {/* Header del modal */}
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-primary-container/40 text-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">lightbulb</span>
                </div>
                <div>
                  <h3 className="font-['Nunito'] text-xl text-on-surface font-extrabold leading-tight">Guía Exprés: Sombrero de Huerta</h3>
                  <p className="text-xs text-on-surface-variant font-medium">Asistente</p>
                </div>
              </div>
              <button
                type="button"
                className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface flex items-center justify-center cursor-pointer transition-colors"
                onClick={() => setShowIAModal(false)}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Banner Objetivo Montessori */}
            <div className="p-4 rounded-2xl bg-secondary-fixed/30 border border-secondary/20 text-on-secondary-fixed flex items-start gap-3">
              <span className="material-symbols-outlined text-secondary text-[20px] shrink-0 mt-0.5">psychology</span>
              <p className="text-xs leading-relaxed font-medium">
                <strong className="font-bold text-secondary block mb-0.5">Objetivo Montessori:</strong>
                Dejar que tu hijo/a tome decisiones sobre colores y texturas, evitando corregir la simetría para reforzar su autonomía.
              </p>
            </div>

            {/* Lista de pasos con badges numéricos */}
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-surface-container-low/60 border border-surface-container-low">
                <span className="w-7 h-7 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm mt-0.5">1</span>
                <div>
                  <strong className="text-on-surface text-xs font-bold block mb-0.5">Minuto 1 al 5: Base Estructurada</strong>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Recortar la base utilizando un cono de cartón o plato biodegradable reciclado.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-surface-container-low/60 border border-surface-container-low">
                <span className="w-7 h-7 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm mt-0.5">2</span>
                <div>
                  <strong className="text-on-surface text-xs font-bold block mb-0.5">Minuto 5 al 10: Pintura Sensorial</strong>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Dejar que Mateo pinte libremente con sus deditos tonos verdes y naranjas simulando zanahorias y hojas.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-surface-container-low/60 border border-surface-container-low">
                <span className="w-7 h-7 rounded-full bg-primary text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-sm mt-0.5">3</span>
                <div>
                  <strong className="text-on-surface text-xs font-bold block mb-0.5">Minuto 10 al 15: Textura Táctil</strong>
                  <p className="text-xs text-on-surface-variant leading-relaxed">Adherir ramitas secas y hojas caídas del parque utilizando pegamento al agua no tóxico.</p>
                </div>
              </div>
            </div>

            {/* Footer con botón de acción amplio */}
            <div className="pt-2 border-t border-surface-container flex items-center justify-end">
              <button
                type="button"
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-primary hover:bg-primary/90 active:scale-95 text-on-primary font-bold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                onClick={() => setShowIAModal(false)}
              >
                <span className="material-symbols-outlined text-[18px]">brush</span>
                <span>¡Listo para crear!</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Toast Feedback */}
      <div
        className={`fixed bottom-6 right-6 z-50 transition-all duration-300 pointer-events-none bg-inverse-surface text-inverse-on-surface px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 font-label-md text-label-md font-sans ${
          toastState.visible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-20 opacity-0'
        }`}
      >
        <span className="material-symbols-outlined text-primary-container text-[20px]">
          {toastState.icon || 'check_circle'}
        </span>
        <span>{toastState.message}</span>
      </div>
    </>
  );
}