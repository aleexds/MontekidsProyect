

export const ParentHero = () => {
  return (
    <section className="relative overflow-hidden rounded-lg bg-gradient-to-br from-inverse-surface via-[#4e00de] to-[#241357] text-inverse-on-surface p-space-md sm:p-space-lg md:p-space-xl shadow-[0_20px_40px_-15px_rgba(78,0,222,0.35)]">
      <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-primary-container/20 blur-3xl pointer-events-none"></div>
      <div className="absolute left-1/3 -bottom-20 w-72 h-72 rounded-full bg-tertiary/25 blur-3xl pointer-events-none"></div>
      
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-md md:gap-space-lg">
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-primary-container shadow-[0_0_24px_rgba(0,219,235,0.7)] flex items-center justify-center">
              <img 
                alt="Mateo Quirós" 
                className="w-full h-full object-cover rounded-full" 
                src="https://lh3.googleusercontent.com/aida/AEtjO1VsPKDc6bdyz38kLffdRfRWQ5NCpmY2dbN_1CG77iyyREwjkG3hfV_UoMHqqir96R_IYPn19ucoAZkg_ORYgjigM0_BlDNg5cEOIrmhuDuogsLbnsl2QDK9RQq9m6ajNh3Du5sIvRuHeTOB86D8QDFk_8kU6p1P0zQ9nhNo7s_KOkuwct6SiL8QCS-mtlwx-Vcp4oQKHA2EiSgr_Dbl2_qRZA1nIaBOizd99qL6dodSmTNCbDnzPfJzHHs" 
              />
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-primary-container text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-[0_4px_10px_rgba(0,219,235,0.4)] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
              Presente hoy
            </span>
          </div>

          <div className="flex flex-col gap-space-xs">
            <h1 className="font-headline-xl text-headline-xl text-inverse-on-surface tracking-tight">
              ¡Hola, Familia Quirós! 👋
            </h1>
            <p className="font-body-lg text-body-lg text-inverse-on-surface/90">
              Este es el resumen de <span class="font-bold text-primary-fixed underline decoration-primary-container decoration-2 underline-offset-4">Mateo</span> hoy en el <span className="font-bold text-secondary-fixed">Aula Semillitas</span>.
            </p>
            <div className="flex flex-wrap items-center gap-space-xs pt-1">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md font-label-md text-label-md text-white shadow-sm">
                <span>🧒</span>
                <span>3 Años cumplidos • Aula Semillitas</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md font-label-md text-label-md text-primary-fixed shadow-sm">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                <span>Asistencia: 08:15 AM (Biométrico)</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md font-label-md text-label-md text-tertiary-fixed shadow-sm">
                <span className="material-symbols-outlined text-[16px]">school</span>
                <span>Guía: Docente Karina S.</span>
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 flex items-center">
          <button 
            onClick={() => document.getElementById('parent-interaction-box')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-space-md py-3.5 rounded-full bg-tertiary text-on-tertiary font-label-lg text-label-lg shadow-[0_8px_24px_rgba(183,0,114,0.4)] hover:shadow-[0_12px_28px_rgba(183,0,114,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2" 
            type="button"
          >
            <span className="material-symbols-outlined text-[20px] transition-transform group-hover:rotate-45">edit_note</span>
            <span>+ Enviar Nota a la Docente</span>
          </button>
        </div>
      </div>
    </section>
  );
};