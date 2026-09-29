export function ReportSidebar() {
  return (
    <aside className="lg:col-span-4 flex flex-col gap-6 font-sans">
      {/* Contacto Directo */}
      <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-[0_4px_20px_rgba(30,18,74,0.05)] relative">
        <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-[18px]">support_agent</span>
          <span>Contacto Directo de Sala</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <img className="w-16 h-16 rounded-2xl object-cover shadow-md ring-2 ring-primary-container" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyd0Rz-BQi70CfH7chrpPK_zMWnk4VwmWUiqguBJqRfju-QARjzHZ8dlrkRBlTmljgtHgwjcxj48py0UhA2ngwPWS0lxlc-Rbgzix9_l9-kbNURRRyd7Mv5Zx6GzjgOePrqzx20LCUME7JNnj4-ysKzI4MHeukPHNg5UPJEzjub_50rHjDZ_BnN9-ohq47XKx2r0EypyFm_veULijLBSv9waf3XgqW3VKhCmMD2icUJvkNcWGQPzoguQ" alt="Docente Karina S." />
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-surface-container-lowest" title="En línea en el aula"></span>
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-on-surface leading-snug">Docente Karina S.</h3>
            <p className="text-xs text-secondary font-bold">Guía AMI Titular • Aula Semillitas</p>
            <div className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-medium">
              <span className="material-symbols-outlined text-[13px] text-primary">schedule</span>
              Receso familias: 13:00 - 14:00 hrs
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-2.5">
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low text-on-surface text-xs font-medium">
            <span className="text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">call</span>
              Anexo de Recepción / Sala:
            </span>
            <strong className="font-heading text-sm text-primary font-bold">Ext. 104</strong>
          </div>
        </div>
      </div>

      {/* Asistente IA */}
      <div className="rounded-2xl p-5 bg-gradient-to-br from-primary-container/90 to-primary text-on-primary-container shadow-[0_12px_32px_-4px_rgba(0,219,235,0.3)] relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary text-white text-xs font-bold uppercase tracking-wider shadow-sm">
            <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
            Asistente IA • Guía Familiar
          </span>
          <span className="material-symbols-outlined text-[24px] text-primary opacity-60">psychology_alt</span>
        </div>
        <h3 className="font-heading text-base font-bold text-on-surface leading-tight">
          ¿Cómo redactar un reporte de salud efectivo?
        </h3>
        <p className="text-xs text-on-primary-container/90 mt-2 leading-snug font-medium">
          Para garantizar la seguridad farmacológica de tu hijo/a en el aula nido:
        </p>
        <ul className="mt-3 space-y-2.5 text-xs text-on-surface font-medium">
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-white text-primary flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 shadow-sm">1</span>
            <span>Especificar <strong className="font-bold">dosis exacta</strong> (ml/gotas) y horario fijado.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-white text-primary flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 shadow-sm">2</span>
            <span>Indicar si requiere <strong className="font-bold">refrigeración previa</strong> en recepción.</span>
          </li>
          <li className="flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-white text-primary flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5 shadow-sm">3</span>
            <span>Adjuntar siempre la <strong className="font-bold">receta o autorización</strong> firmada.</span>
          </li>
        </ul>
        <button type="button" className="mt-5 w-full py-3 px-4 rounded-full bg-text-main text-white hover:opacity-90 text-xs font-bold flex items-center justify-center gap-2 shadow-md transition-all">
          <span className="material-symbols-outlined text-[18px] text-primary-container">edit_note</span>
          Usar Plantilla Rápida de Salud
        </button>
      </div>

      {/* Normativa */}
      <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-[0_4px_16px_rgba(30,18,74,0.04)]">
        <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
          <span>Horarios de Retiro y Normativa</span>
        </div>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          Todo adulto autorizado distinto de los tutores titulares (Valeria y Roberto) debe portar documento de identidad y estar previamente registrado en el portal.
        </p>
        <div className="mt-4 pt-3 border-t border-surface-container space-y-2 text-xs">
          <div className="flex items-center justify-between text-on-surface">
            <span className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-primary">login</span>
              Entrada habitual:
            </span>
            <strong className="font-bold">08:00 - 08:30 AM</strong>
          </div>
          <div className="flex items-center justify-between text-on-surface">
            <span className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-secondary">logout</span>
              Salida ordinaria:
            </span>
            <strong className="font-bold">13:30 - 14:00 PM</strong>
          </div>
        </div>
      </div>
    </aside>
  );
}