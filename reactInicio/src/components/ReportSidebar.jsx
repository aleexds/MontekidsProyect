import { useAuth } from '../context/useAuth';
import { getTeacherForUser } from '../utils/teacherHelper';
import { useLanguage } from '../context/LanguageContext';

export function ReportSidebar({ onUseTemplate }) {
  const { activeUser } = useAuth();
  const { t } = useLanguage();
  const teacher = getTeacherForUser(activeUser);

  return (
    <aside className="lg:col-span-4 flex flex-col gap-6 font-sans">
      {/* Contacto Directo */}
      <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-[0_4px_20px_rgba(30,18,74,0.05)] relative">
        <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider mb-3">
          <span className="material-symbols-outlined text-[18px]">support_agent</span>
          <span>{t('reportsPage.sidebarContactTitle')}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <img 
              className="w-16 h-16 rounded-2xl object-cover shadow-md ring-2 ring-primary-container" 
              src={teacher.avatarUrl} 
              alt={teacher.name} 
            />
            <span 
              className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 ring-2 ring-surface-container-lowest" 
              title={t('reportsPage.sidebarOnlineTitle')}
            ></span>
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-on-surface leading-snug">{teacher.name}</h3>
            <p className="text-xs text-secondary font-bold">{teacher.role}</p>
            <div className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant text-[11px] font-medium">
              <span className="material-symbols-outlined text-[13px] text-primary">schedule</span>
              {t('reportsPage.sidebarBreakHours')}
            </div>
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-2.5">
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low text-on-surface text-xs font-medium">
            <span className="text-on-surface-variant flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">call</span>
              {t('reportsPage.sidebarExtension')}
            </span>
            <strong className="font-heading text-sm text-primary font-bold">Ext. 104</strong>
          </div>
        </div>
      </div>

      {/* Asistente IA (Estilo Turquesa/Cyan Degradado con Glassmorphism) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#00c6d7] via-[#00a8b8] to-[#00838f] text-white p-6 shadow-xl border border-white/20 font-sans">
        {/* Decoraciones circulares de luz en el fondo */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/10 rounded-full blur-xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col gap-4">
          {/* Header del Badge */}
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary text-white font-label-md text-[11px] font-bold shadow-md tracking-wider uppercase">
              <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
              <span>{t('reportsPage.sidebarAiBadge')}</span>
            </div>
            <span className="material-symbols-outlined text-[24px] text-white/80">psychology_alt</span>
          </div>

          {/* Título y Subtítulo */}
          <div>
            <h3 className="font-heading text-lg font-extrabold text-white leading-snug">
              {t('reportsPage.sidebarAiTitle')}
            </h3>
            <p className="text-white/90 text-xs mt-1 font-medium leading-relaxed">
              {t('reportsPage.sidebarAiSubtitle')}
            </p>
          </div>

          {/* Lista de pasos */}
          <ul className="flex flex-col gap-2.5 my-1 text-xs font-medium text-white/95">
            <li className="flex items-start gap-2.5">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#00838f] font-bold text-[11px] shrink-0 mt-0.5 shadow-sm">
                1
              </span>
              <span>
                {t('reportsPage.sidebarStep1')} <strong className="font-bold text-white">{t('reportsPage.sidebarStep1Bold')}</strong> {t('reportsPage.sidebarStep1End')}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#00838f] font-bold text-[11px] shrink-0 mt-0.5 shadow-sm">
                2
              </span>
              <span>
                {t('reportsPage.sidebarStep2')} <strong className="font-bold text-white">{t('reportsPage.sidebarStep2Bold')}</strong> {t('reportsPage.sidebarStep2End')}
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-white text-[#00838f] font-bold text-[11px] shrink-0 mt-0.5 shadow-sm">
                3
              </span>
              <span>
                {t('reportsPage.sidebarStep3')} <strong className="font-bold text-white">{t('reportsPage.sidebarStep3Bold')}</strong> {t('reportsPage.sidebarStep3End')}
              </span>
            </li>
          </ul>

          {/* Botón de plantilla */}
          <button
            type="button"
            onClick={onUseTemplate}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 active:scale-[0.98] text-white text-xs font-extrabold backdrop-blur-md border border-white/30 shadow-lg transition-all duration-200 cursor-pointer group"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:rotate-12 transition-transform">
              edit_note
            </span>
            <span>{t('reportsPage.sidebarTemplateBtn')}</span>
          </button>
        </div>
      </div>

      {/* Normativa */}
      <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-[0_4px_16px_rgba(30,18,74,0.04)]">
        <div className="flex items-center gap-2 text-secondary text-xs font-bold uppercase tracking-wider mb-2">
          <span className="material-symbols-outlined text-[18px]">verified_user</span>
          <span>{t('reportsPage.sidebarNormTitle')}</span>
        </div>
        <p className="text-xs text-on-surface-variant leading-relaxed">
          {t('reportsPage.sidebarNormDesc')}
        </p>
        <div className="mt-4 pt-3 border-t border-surface-container space-y-2 text-xs">
          <div className="flex items-center justify-between text-on-surface">
            <span className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-primary">login</span>
              {t('reportsPage.sidebarEntryLabel')}
            </span>
            <strong className="font-bold">08:00 - 08:30 AM</strong>
          </div>
          <div className="flex items-center justify-between text-on-surface">
            <span className="flex items-center gap-1.5 text-on-surface-variant">
              <span className="material-symbols-outlined text-[16px] text-secondary">logout</span>
              {t('reportsPage.sidebarExitLabel')}
            </span>
            <strong className="font-bold">13:30 - 14:00 PM</strong>
          </div>
        </div>
      </div>
    </aside>
  );
}