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
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-space-md md:p-space-lg shadow-[0_24px_48px_-8px_rgba(30,18,74,0.2)] flex flex-col gap-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">assignment</span>
                </div>
                <h3 className="font-['Nunito'] text-lg text-on-surface font-bold">Orden del Día • 27 Octubre</h3>
              </div>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface flex items-center justify-center cursor-pointer"
                onClick={() => setShowOrderModal(false)}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="flex flex-col gap-3 py-2 text-on-surface-variant font-body-md text-body-md">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-surface-container font-label-sm text-label-sm font-bold flex items-center justify-center text-primary shrink-0">1</span>
                <div>
                  <strong className="text-on-surface block font-label-md text-label-md">16:00 - 16:15 hrs: Bienvenida y Enfoque Bimestral</strong>
                  <p className="font-body-sm text-body-sm">Introducción al método de observación Montessori del Aula Semillitas.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-surface-container font-label-sm text-label-sm font-bold flex items-center justify-center text-primary shrink-0">2</span>
                <div>
                  <strong className="text-on-surface block font-label-md text-label-md">16:15 - 16:40 hrs: Presentación Individual de Informes</strong>
                  <p className="font-body-sm text-body-sm">Revisión del neurodesarrollo motor, esquema corporal e interacción de Mateo.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-surface-container font-label-sm text-label-sm font-bold flex items-center justify-center text-primary shrink-0">3</span>
                <div>
                  <strong className="text-on-surface block font-label-md text-label-md">16:40 - 17:00 hrs: Espacio de Consultas con Psicopedagogía</strong>
                  <p className="font-body-sm text-body-sm">Pautas para el acompañamiento en casa y estimulación del sueño autónomo.</p>
                </div>
              </div>
            </div>
            <div className="pt-3 border-t border-surface-container flex items-center justify-end gap-2">
              <button
                type="button"
                className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-md text-label-md cursor-pointer"
                onClick={() => setShowOrderModal(false)}
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Guía IA Paso a Paso Lúdico */}
      {showIAModal && (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm flex items-center justify-center p-4 font-sans">
          <div className="bg-surface-container-lowest rounded-3xl max-w-lg w-full p-space-md md:p-space-lg shadow-[0_24px_48px_-8px_rgba(30,18,74,0.2)] flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                </div>
                <h3 className="font-['Nunito'] text-lg text-on-surface font-bold">Guía Exprés: Sombrero de Huerta</h3>
              </div>
              <button
                type="button"
                className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-highest text-on-surface flex items-center justify-center cursor-pointer"
                onClick={() => setShowIAModal(false)}
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <div className="space-y-3 font-body-sm text-body-sm text-on-surface-variant">
              <div className="p-3 rounded-2xl bg-secondary-fixed/30 text-on-secondary-fixed">
                <strong>Objetivo Montessori:</strong> Dejar que Mateo tome decisiones sobre colores y texturas, evitando corregir la simetría.
              </div>
              <ul className="space-y-2 list-disc pl-5">
                <li><strong>Minuto 1-5:</strong> Recortar la base con un cono de cartón o plato biodegradable.</li>
                <li><strong>Minuto 5-10:</strong> Dejar que Mateo pinte con sus deditos tonos verdes y naranjas simulando zanahorias y hojas.</li>
                <li><strong>Minuto 10-15:</strong> Adherir ramitas secas y hojas caídas del parque utilizando pegamento al agua no tóxico.</li>
              </ul>
            </div>
            <div className="pt-3 border-t border-surface-container flex items-center justify-end">
              <button
                type="button"
                className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md cursor-pointer"
                onClick={() => setShowIAModal(false)}
              >
                ¡Listo para crear!
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