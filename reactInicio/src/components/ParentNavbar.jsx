

export const ParentNavbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_4px_20px_-4px_rgba(29,17,73,0.06)]">
      <div className="h-20 max-w-[1440px] mx-auto px-margin flex items-center justify-between gap-gutter">
        <div className="flex items-center gap-space-md shrink-0">
          <img alt="Montekids logo" className="h-8 w-auto object-contain" src="https://lh3.googleusercontent.com/aida/AEtjO1Us8ZFAUCMxluv2Dhf7Y_HNFoZIniAzJTtSW8dJD6M74o11v3WFlFD0OmsZUtYwS0LQitdc9whbxgetAtvQDjrBvzcvmvFh6EBx3UPaQ767s5jjmM2uCVAzewYa4wyXoE05tndPXdcKCu6LOuni-Sd2WvDqslLRMMdoR1LI8tEXf_-cCtjG1qo6K5_0_4aQWf9-mqAVhdUfJlE4KFzY2GCJXYoaGPGhVgQef4hQwkiinQA94ihsPpyZInT6" />
          <div className="hidden sm:flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface leading-none">Montekids</span>
            <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mt-0.5">Portal de Familias</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-space-xs p-1 bg-surface-container-high rounded-full">
          <a className="px-space-md py-2.5 rounded-full font-label-lg text-label-lg bg-inverse-surface text-inverse-on-surface shadow-[0_8px_20px_-4px_rgba(50,40,95,0.35)] transition-all" href="#">Mi Hijo/a</a>
          <a className="px-space-md py-2.5 rounded-full font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-all" href="#">Mis Comentarios/Reportes</a>
          <a className="px-space-md py-2.5 rounded-full font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-all" href="#">Calendario de Actividades</a>
        </nav>

        <div className="flex items-center gap-space-sm shrink-0">
          <div className="hidden md:flex items-center bg-surface-container-low px-space-xs py-1 rounded-full text-on-surface-variant font-label-md text-label-md">
            <button className="px-2 py-1 rounded-full hover:bg-surface-container-high hover:text-on-surface transition-colors" title="Reducir texto" type="button">A-</button>
            <span className="px-1.5 font-bold text-on-surface">100%</span>
            <button className="px-2 py-1 rounded-full hover:bg-surface-container-high hover:text-on-surface transition-colors" title="Aumentar texto" type="button">A+</button>
          </div>

          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" title="Modo de contraste" type="button">
            <span className="material-symbols-outlined text-[20px]">contrast</span>
          </button>

          <button className="relative w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors" title="Notificaciones" type="button">
            <span className="material-symbols-outlined text-[20px]">notifications</span>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-tertiary rounded-full ring-2 ring-surface"></span>
          </button>

          {/* Perfil del Usuario: Valeria Quirós */}
          <div className="flex items-center gap-space-xs pl-space-xs py-1 pr-space-sm bg-surface-container-lowest rounded-full shadow-[0_2px_8px_rgba(29,17,73,0.04)]">
            <img alt="Valeria Quirós" className="w-8 h-8 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAGzcMY-K18BY7689A7MD9FdiVhoj_uniIQAeuFnAHYaAzXK-3VRfSo66ats0cj3et9Ipu2_OhARIDEs2AouQR8RaB37lAvhH0MPjwbO3CDyAEIFKagGZZBpI8HIaDW3z9O9zzMVlYlFvSuPRJIgLp-FtHrh232AV9VWihzlQ9cim2FV2qQo1lil6k47rpFg5CUFiTlErRmODAv9gve0hMq7CSFE_OCT6wmK009iKvWefXLGuN0y3HbtQ" />
            <div className="hidden xl:flex flex-col text-left">
              <span className="font-label-md text-label-md text-on-surface leading-tight">Valeria Quirós</span>
              <span className="font-label-sm text-label-sm text-secondary leading-tight">Mamá de Mateo</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};