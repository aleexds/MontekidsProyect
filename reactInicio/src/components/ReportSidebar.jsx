export function ReportSidebar() {
  return (
    <aside className="lg:col-span-4 flex flex-col gap-space-md">
      {/* Contacto Directo */}
      <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-[0_4px_20px_rgba(30,18,74,0.05)] overflow-hidden relative">
        <div className="flex items-center gap-2 text-primary font-label-md text-label-md mb-3">
          <span className="material-symbols-outlined text-[18px]">support_agent</span>
          <span>Contacto Directo de Sala</span>
        </div>
        <div className="flex items-center gap-3.5">
          <div className="relative shrink-0">
            <img className="w-16 h-16 rounded-2xl object-cover shadow-md ring-2 ring-primary-container" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyd0Rz-BQi70CfH7chrpPK_zMWnk4VwmWUiqguBJqRfju-QARjzHZ8dlrkRBlTmljgtHgwjcxj48py0UhA2ngwPWS0lxlc-Rbgzix9_l9-kbNURRRyd7Mv5Zx6GzjgOePrqzx20LCUME7JNnj4-ysKzI4MHeukPHNg5UPJEzjub_50rHjDZ_BnN9-ohq47XKx2r0EypyFm_veULijLBSv9waf3XgqW3VKhCmMD2icUJvkNcWGQPzoguQ" alt="Docente Karina S." />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-surface-container-lowest" title="En línea en el aula"></span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface leading-snug">Docente Karina S.</h3>
            <p class="font-label-sm text-label-sm text-secondary font-bold">Guía AMI Titular • Aula Semillitas</p>
            <div className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-[11px]">
              <span className="material-symbols-outlined text-[13px] text-primary">schedule</span>
              Receso familias: 13:00 - 14:00 hrs
            </div>
          </div>
        </div>
        <div className="mt-space-md flex flex-col gap-2">
          <a href="#" className="w-full h-11 flex items-center justify-center gap-2 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 text-[#0d7335] font-label-md text-label-md font-bold transition-all">
            <span className="material-symbols-outlined text-[20px] text-[#25D366]">chat</span>
            WhatsApp Institucional de Sala
          </a>
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low text-on-surface font-body-sm text-body-sm">
            <span className="text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">call</span>
              Anexo Recepción:
            </span>
            <strong className="font-headline-sm text-[15px] text-primary">Ext. 104</strong>
          </div>
        </div>
      </div>

      {/* Asistente IA */}
      <div className="rounded-lg p-space-md bg-gradient-to-br from-primary-container/90 to-primary-fixed text-on-primary-container shadow-[0_12px_32px_-4px_rgba(0,219,235,0.3)] relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary text-on-tertiary font-label-sm text-label-sm font-bold uppercase tracking-wider shadow-sm">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            Asistente IA • Guía Familiar
          </span>
          <span className="material-symbols-outlined text-[24px] text-primary opacity-60">psychology_alt</span>
        </div>
        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-tight">
          ¿Cómo redactar un reporte de salud efectivo?
        </h3>
        <p className="font-body-sm text-body-sm text-on-primary-fixed-variant mt-1.5 leading-snug">
          Para garantizar la seguridad farmacológica de Mateo en el aula nido:
        </p>
        <ul className="mt-3 space-y-2 font-body-sm text-body-sm text-on-surface font-semibold">
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5">1</span>
            <span>Especificar <strong>dosis exacta</strong> (ml/gotas) y horario fijado.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5">2</span>
            <span>Indicar si requiere <strong>refrigeración previa</strong> en recepción.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="w-5 h-5 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center text-[12px] font-bold shrink-0 mt-0.5">3</span>
            <span>Adjuntar siempre la <strong>receta o autorización</strong> firmada.</span>
          </li>
        </ul>
      </div>

      {/* Normativa */}
      <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-[0_4px_16px_rgba(30,18,74,0.04)]">
        <div className="flex items-center gap-2 text-secondary font-label-md text-label-md mb-2">
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
          <span>Horarios de Retiro y Normativa</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
          Todo adulto autorizado distinto de los tutores titulares debe portar documento de identidad y estar previamente registrado.
        </p>
        <div className="mt-3 pt-3 border-t border-surface-container space-y-2">
          <div className="flex items-center justify-between text-on-surface font-body-sm text-body-sm">
            <span className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-primary">login</span>
              Entrada habitual:
            </span>
            <strong className="font-semibold">08:00 - 08:30 AM</strong>
          </div>
          <div className="flex items-center justify-between text-on-surface font-body-sm text-body-sm">
            <span className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-secondary">logout</span>
              Salida ordinaria:
            </span>
            <strong className="font-semibold">13:30 - 14:00 PM</strong>
          </div>
        </div>
      </div>
    </aside>
  );
}