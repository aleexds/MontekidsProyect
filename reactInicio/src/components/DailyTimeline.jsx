
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/useAuth';
import { getTeacherForUser } from '../utils/teacherHelper';

export function DailyTimeline() {
  const { language, t } = useLanguage();
  const { activeUser } = useAuth();
  const teacher = getTeacherForUser(activeUser);

  // Generar fecha actual formateada dinámicamente según el idioma
  const getTodayFormatted = () => {
    const today = new Date();
    const localeMap = {
      es: 'es-ES',
      en: 'en-US',
      zh: 'zh-CN'
    };
    const currentLocale = localeMap[language] || 'es-ES';

    if (language === 'en') {
      const formattedDate = today.toLocaleDateString(currentLocale, { month: 'long', day: 'numeric', year: 'numeric' });
      return `Today, ${formattedDate}`;
    } else if (language === 'zh') {
      const formattedDate = today.toLocaleDateString(currentLocale, { year: 'numeric', month: 'long', day: 'numeric' });
      return `今天, ${formattedDate}`;
    } else {
      const day = today.getDate();
      const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
      const month = monthNames[today.getMonth()];
      const year = today.getFullYear();
      return `Hoy, ${day} de ${month}, ${year}`;
    }
  };

  return (
    <div className="lg:col-span-8 flex flex-col gap-5">
      {/* Header Bitácora */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-gray-100 dark:bg-slate-800 p-4 rounded-2xl border border-gray-200 dark:border-slate-700/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></span>
            <h2 className="font-bold text-gray-900 dark:text-white text-lg">
              {t('parentDashboard.timeline.headerTitle')}
            </h2>
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-300">
            {getTodayFormatted()}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider self-start sm:self-center">
          <span className="material-symbols-outlined text-[16px]">sensors</span>
          {t('parentDashboard.timeline.inSession')}
        </span>
      </div>

      {/* Tarjetas de Actividades */}
      <div className="flex flex-col gap-4">
        {/* Actividad 1 */}
        <article className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-pink-100 dark:bg-pink-950/50 text-pink-600 dark:text-sky-300 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                  {t('parentDashboard.timeline.act1Title')}
                </h4>
                <span className="text-[10px] text-pink-600 dark:text-sky-300 font-extrabold uppercase tracking-wider">
                  {t('parentDashboard.timeline.act1Area')}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-slate-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">nest_clock_farsight_analog</span>
                {t('parentDashboard.timeline.act1Time')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 text-[11px] font-semibold">
                {t('parentDashboard.timeline.completedSuccess')}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600/40 flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-600 dark:bg-purple-500 text-white font-bold flex items-center justify-center text-xs shrink-0">
              {teacher.initials}
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  {teacher.name}
                </span>
                <span className="text-gray-400 dark:text-slate-300 text-[11px]">• hace 2 hrs</span>
              </div>
              <p className="text-xs text-gray-700 dark:text-slate-100 italic">
                {t('parentDashboard.timeline.act1Note')}
              </p>
            </div>
          </div>
        </article>

        {/* Actividad 2 */}
        <article className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[18px]">spa</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                  {t('parentDashboard.timeline.act2Title')}
                </h4>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-extrabold uppercase tracking-wider">
                  {t('parentDashboard.timeline.act2Area')}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-500 dark:text-slate-300 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">nest_clock_farsight_analog</span>
                {t('parentDashboard.timeline.act2Time')}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-slate-200 text-[11px] font-semibold">
                {t('parentDashboard.timeline.completedAt')}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600/40 flex items-start gap-3">
            <div className="w-9 h-9 rounded-full bg-purple-600 dark:bg-purple-500 text-white font-bold flex items-center justify-center text-xs shrink-0">
              {teacher.initials}
            </div>
            <div className="flex flex-col gap-0.5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-gray-900 dark:text-white">
                  {teacher.name}
                </span>
                <span className="text-gray-400 dark:text-slate-300 text-[11px]">• hace 35 min</span>
              </div>
              <p className="text-xs text-gray-700 dark:text-slate-100 italic">
                {t('parentDashboard.timeline.act2Note')}
              </p>
            </div>
          </div>
        </article>

        {/* Actividad en curso */}
        <article className="bg-gradient-to-r from-cyan-50 to-white dark:from-slate-800 dark:to-slate-800/90 rounded-2xl p-5 border border-cyan-200 dark:border-cyan-700/50 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-cyan-500 text-white flex items-center justify-center font-bold shrink-0 shadow-md">
              🌿
            </div>
            <div>
              <h4 className="font-bold text-gray-900 dark:text-white text-sm">
                {t('parentDashboard.timeline.act3Title')}
              </h4>
              <p className="text-xs text-gray-500 dark:text-slate-300">
                {t('parentDashboard.timeline.act3Desc')}
              </p>
            </div>
          </div>
          <span className="px-3 py-1.5 rounded-full bg-cyan-600 dark:bg-cyan-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm shrink-0 self-start sm:self-auto">
            <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
            {t('parentDashboard.timeline.inProgress')}
          </span>
        </article>
      </div>

      
    </div>
  );
}