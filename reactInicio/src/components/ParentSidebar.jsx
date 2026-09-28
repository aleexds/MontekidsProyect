

export const ParentSidebar = () => {
  return (
    <aside className="lg:col-span-4 flex flex-col gap-space-md">
      {/* Logros Recientes */}
      <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-[0_4px_20px_-4px_rgba(29,17,73,0.06)] flex flex-col gap-space-sm">
        <div className="flex items-center justify-between">
          <h3 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-1.5">
            <span>Logros Recientes</span>
            <span>⭐</span>
          </h3>
          <span className="font-label-sm text-label-sm text-secondary font-bold px-2 py-0.5 rounded-full bg-secondary-fixed/40">Nivel Nido 2</span>
        </div>
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
            <div className="w-11 h-11 rounded-full bg-secondary-container text-on-secondary flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[22px]">workspace_premium</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface">Pinza de Oro</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Destreza motriz fina y autonomía con pinzas</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
            <div className="w-11 h-11 rounded-full bg-tertiary text-on-tertiary flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[22px]">auto_stories</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface">Lector Estrella</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Reconocimiento auditivo de 5 fonemas</span>
            </div>
          </div>
          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
            <div className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[22px]">volunteer_activism</span>
            </div>
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface">Amigo Colaborador</span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">Ordenó y compartió material en mesa grupal</span>
            </div>
          </div>
        </div>
        <a href="#" className="font-label-md text-label-md text-primary font-bold hover:underline self-end pt-1">
          Ver todas las medallas (8) →
        </a>
      </div>

      {/* Sugerencia IA */}
      <div className="relative overflow-hidden rounded-lg bg-primary-container p-space-md text-on-primary-fixed shadow-[0_12px_32px_-4px_rgba(0,219,235,0.35)] flex flex-col gap-space-sm">
        <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-white/20 blur-xl pointer-events-none"></div>
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-1 rounded-full bg-tertiary text-on-tertiary font-label-sm text-label-sm uppercase tracking-wider font-bold shadow-sm">
            💡 Sugerencia Semanal IA
          </span>
          <span className="font-label-xs text-label-sm text-on-primary-container uppercase font-extrabold tracking-wider">NeuroPed™</span>
        </div>
        <p className="font-body-md text-body-md text-on-primary-fixed leading-snug">
          “Tip para Mateo en casa: Para potenciar el <strong>85% alcanzado en motricidad fina</strong>, refuercen juegos de encastre y amasado con plastilina durante 10 minutos antes de la cena.”
        </p>
        <button className="w-full py-2.5 rounded-full bg-inverse-surface text-inverse-on-surface font-label-md text-label-md shadow-md hover:shadow-lg transition-all text-center" type="button">
          Ver 3 Juegos para Casa 🏡
        </button>
      </div>

      {/* Recordatorios */}
      <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-[0_4px_20px_-4px_rgba(29,17,73,0.06)] flex flex-col gap-space-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[22px]">calendar_month</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface">Próximos Recordatorios</h3>
        </div>
        <div className="flex flex-col gap-space-xs">
          <div className="p-2.5 rounded-lg bg-surface-container-low flex items-start gap-2.5">
            <div className="w-10 h-10 rounded-md bg-secondary-fixed/50 text-secondary flex flex-col items-center justify-center shrink-0">
              <span className="font-label-sm text-label-sm font-bold leading-none">VIE</span>
              <span className="font-headline-sm text-headline-sm font-extrabold leading-none">27</span>
            </div>
            <div>
              <h4 className="font-label-lg text-label-lg text-on-surface">Reunión Trimestral de Familias</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">16:00 hrs • Sesión Virtual con Psicopedagogía</p>
            </div>
          </div>
          <div className="p-2.5 rounded-lg bg-surface-container-low flex items-start gap-2.5">
            <div className="w-10 h-10 rounded-md bg-tertiary-fixed/50 text-tertiary flex flex-col items-center justify-center shrink-0">
              <span className="font-label-sm text-label-sm font-bold leading-none">MAR</span>
              <span className="font-headline-sm text-headline-sm font-extrabold leading-none">31</span>
            </div>
            <div>
              <h4 className="font-label-lg text-label-lg text-on-surface">Día del Sombrero Loco & Huerta</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Traer sombrero con elementos reciclados</p>
            </div>
          </div>
        </div>
        <button className="w-full py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors flex items-center justify-center gap-1.5" type="button">
          <span className="material-symbols-outlined text-[16px]">sync</span>
          <span>Sincronizar con Google Calendar</span>
        </button>
      </div>

      {/* Contacto de Sala */}
      <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-[0_4px_20px_-4px_rgba(29,17,73,0.06)] flex flex-col gap-space-sm">
        <h3 className="font-headline-sm text-headline-sm text-on-surface">Contacto de Sala</h3>
        <div className="flex items-center gap-space-sm">
          <div className="relative">
            <img alt="Docente Karina" className="w-12 h-12 rounded-full object-cover shadow-sm" src="https://lh3.googleusercontent.com/aida/AEtjO1VtC5s3KzQmDzSEOgUEoBq9f6Bf6pLl-kDIpqTGgxvP9BIoe-Qt1zofmkX4MXZC7Llcfhu3QeYkPfTQGjphM1quespU79rUks6zszdXoBPbivvR4pgYaLs_zjfVUQVWISHqNs5xsLH-njChuAWu2uzDTJKJ_TZQhYuxz3Od9Fu24dFEN58BRJOkf9wrKBwLbmcp5pNBh_FG_IYGrX2WCpebd0C8wYDmLyg9upvEdIpKsOfzDinKAhWRSB1_" />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-primary-container ring-2 ring-white"></span>
          </div>
          <div className="flex flex-col">
            <span className="font-label-lg text-label-lg text-on-surface font-bold">Docente Karina S.</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Guía AMI Titular Aula Semillitas</span>
            <span className="font-label-sm text-label-sm text-primary">Disponible en receso (13:00 - 14:00)</span>
          </div>
        </div>
        <a href="https://wa.me/#" target="_blank" rel="noreferrer" className="mt-1 w-full py-2.5 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-label-md text-label-md font-bold transition-colors flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-[18px]">chat</span>
          <span>WhatsApp Institucional</span>
        </a>
      </div>
    </aside>
  );
};