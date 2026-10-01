import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/useAuth';
import { getTeacherForUser } from '../utils/teacherHelper';

export function ParentSidebar() {
  const { t } = useLanguage();
  const { activeUser } = useAuth();
  const teacher = getTeacherForUser(activeUser);

  return (
    <aside className="lg:col-span-4 flex flex-col gap-5">
      {/* Logros Recientes */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700/60 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-gray-900 dark:text-white text-sm flex items-center gap-1.5">
            <span>{t('parentDashboard.sidebar.achievementsTitle')}</span>
            <span>⭐</span>
          </h3>
          <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60">
            {t('parentDashboard.sidebar.levelBadge')}
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600/40">
            <div className="w-9 h-9 rounded-full bg-amber-400 text-slate-950 font-bold flex items-center justify-center shrink-0">
              🏅
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900 dark:text-white">
                {t('parentDashboard.sidebar.badge1Title')}
              </span>
              <span className="text-[11px] text-gray-500 dark:text-slate-300">
                {t('parentDashboard.sidebar.badge1Desc')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600/40">
            <div className="w-9 h-9 rounded-full bg-pink-500 text-white font-bold flex items-center justify-center shrink-0">
              📖
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900 dark:text-white">
                {t('parentDashboard.sidebar.badge2Title')}
              </span>
              <span className="text-[11px] text-gray-500 dark:text-slate-300">
                {t('parentDashboard.sidebar.badge2Desc')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-2.5 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600/40">
            <div className="w-9 h-9 rounded-full bg-cyan-500 text-white font-bold flex items-center justify-center shrink-0">
              🤝
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-gray-900 dark:text-white">
                {t('parentDashboard.sidebar.badge3Title')}
              </span>
              <span className="text-[11px] text-gray-500 dark:text-slate-300">
                {t('parentDashboard.sidebar.badge3Desc')}
              </span>
            </div>
          </div>
        </div>

        <a className="text-xs text-purple-700 dark:text-sky-300 font-bold hover:underline self-end pt-1" href="#">
          {t('parentDashboard.sidebar.viewAllBadges')}
        </a>
      </div>

      {/* Sugerencia IA NeuroPed */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-cyan-400 to-cyan-500 p-5 text-slate-950 shadow-md flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full bg-purple-900 text-white text-[10px] font-bold uppercase tracking-wider">
            {t('parentDashboard.sidebar.aiBadge')}
          </span>
          <span className="text-[10px] text-slate-900 font-black uppercase tracking-wider">NeuroPed™</span>
        </div>
        <p className="text-xs font-medium leading-relaxed">
          {t('parentDashboard.sidebar.aiTip')}
        </p>
        <button className="w-full py-2 rounded-xl bg-slate-950 hover:bg-slate-900 text-white font-bold text-xs transition-all shadow-sm" type="button">
          {t('parentDashboard.sidebar.aiActionBtn')}
        </button>
      </div>

      {/* Recordatorios */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700/60 shadow-sm flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-amber-500 text-[20px]">calendar_month</span>
          <h3 className="font-bold text-gray-900 dark:text-white text-sm">
            {t('parentDashboard.sidebar.remindersTitle')}
          </h3>
        </div>
        <div className="flex flex-col gap-2.5">
          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600/40 flex items-start gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex flex-col items-center justify-center shrink-0">
              <span className="text-[9px] font-bold leading-none">VIE</span>
              <span className="text-xs font-black leading-none mt-0.5">27</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                {t('parentDashboard.sidebar.rem1Title')}
              </h4>
              <p className="text-[11px] text-gray-500 dark:text-slate-300">
                {t('parentDashboard.sidebar.rem1Desc')}
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600/40 flex items-start gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-pink-100 dark:bg-pink-950/60 text-pink-800 dark:text-sky-300 flex flex-col items-center justify-center shrink-0">
              <span className="text-[9px] font-bold leading-none">MAR</span>
              <span className="text-xs font-black leading-none mt-0.5">31</span>
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 dark:text-white">
                {t('parentDashboard.sidebar.rem2Title')}
              </h4>
              <p className="text-[11px] text-gray-500 dark:text-slate-300">
                {t('parentDashboard.sidebar.rem2Desc')}
              </p>
            </div>
          </div>
        </div>
        <button className="w-full py-2 rounded-xl bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 text-gray-800 dark:text-slate-100 text-xs font-bold transition-colors flex items-center justify-center gap-1.5" type="button">
          <span className="material-symbols-outlined text-[16px]">sync</span>
          <span>{t('parentDashboard.sidebar.syncCalendar')}</span>
        </button>
      </div>

      {/* Contacto de Sala */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700/60 shadow-sm flex flex-col gap-3">
        <h3 className="font-bold text-gray-900 dark:text-white text-sm">
          {t('parentDashboard.sidebar.teacherContactTitle')}
        </h3>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-600 dark:bg-purple-500 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-sm">
            {teacher.initials}
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-gray-900 dark:text-white">{teacher.name}</span>
            <span className="text-[11px] text-gray-500 dark:text-slate-300">
              {teacher.role}
            </span>
            <span className="text-[10px] text-cyan-600 dark:text-cyan-300 font-bold">
              {t('parentDashboard.sidebar.teacherAvailability')}
            </span>
          </div>
        </div>
        <a className="mt-1 w-full py-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 font-bold text-xs transition-colors flex items-center justify-center gap-2 border border-emerald-200 dark:border-emerald-800/50" href="https://wa.me/#" target="_blank" rel="noreferrer">
          <span className="material-symbols-outlined text-[18px]">chat</span>
          <span>{t('parentDashboard.sidebar.whatsappBtn')}</span>
        </a>
      </div>
    </aside>
  );
}