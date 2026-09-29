import { useLanguage } from '../context/LanguageContext';

export function DevelopmentalMetrics() {
  const { t } = useLanguage();

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {/* Motricidad Fina */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">pan_tool_alt</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block">
                  {t('parentDashboard.metrics.physicalArea')}
                </span>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">
                  {t('parentDashboard.metrics.fineMotor')}
                </h3>
              </div>
            </div>
            <span className="text-2xl font-black text-amber-500 dark:text-amber-400">85%</span>
          </div>

          <div className="w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
            <div className="h-full bg-amber-400 rounded-full" style={{ width: '85%' }}></div>
          </div>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-200 text-xs font-semibold">
            <span>{t('parentDashboard.metrics.fineMotorBadge')}</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 dark:text-slate-200 bg-gray-50 dark:bg-slate-700/50 p-3 rounded-xl border border-gray-100 dark:border-slate-600/40">
          {t('parentDashboard.metrics.fineMotorDesc')}
        </p>
      </div>

      {/* Lenguaje y Expresión */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-pink-100 dark:bg-pink-950/50 text-pink-600 dark:text-pink-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">forum</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 dark:text-sky-300 block">
                  {t('parentDashboard.metrics.communicationArea')}
                </span>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">
                  {t('parentDashboard.metrics.language')}
                </h3>
              </div>
            </div>
            <span className="text-2xl font-black text-pink-600 dark:text-sky-300">90%</span>
          </div>

          <div className="w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
            <div className="h-full bg-pink-500 dark:bg-sky-400 rounded-full" style={{ width: '90%' }}></div>
          </div>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 dark:bg-sky-950/50 text-pink-800 dark:text-sky-200 text-xs font-semibold">
            <span>{t('parentDashboard.metrics.languageBadge')}</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 dark:text-slate-200 bg-gray-50 dark:bg-slate-700/50 p-3 rounded-xl border border-gray-100 dark:border-slate-600/40">
          {t('parentDashboard.metrics.languageDesc')}
        </p>
      </div>

      {/* Sensorial y Cognitivo */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all flex flex-col justify-between gap-4">
        <div>
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-100 dark:bg-cyan-950/50 text-cyan-700 dark:text-cyan-300 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px]">extension</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-700 dark:text-cyan-300 block">
                  {t('parentDashboard.metrics.cognitionArea')}
                </span>
                <h3 className="font-bold text-gray-900 dark:text-white text-base">
                  {t('parentDashboard.metrics.sensory')}
                </h3>
              </div>
            </div>
            <span className="text-2xl font-black text-cyan-600 dark:text-cyan-300">78%</span>
          </div>

          <div className="w-full h-3 bg-gray-100 dark:bg-slate-700 rounded-full overflow-hidden p-0.5">
            <div className="h-full bg-cyan-400 rounded-full" style={{ width: '78%' }}></div>
          </div>

          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/50 text-cyan-800 dark:text-cyan-200 text-xs font-semibold">
            <span>{t('parentDashboard.metrics.sensoryBadge')}</span>
          </div>
        </div>
        <p className="text-xs text-gray-600 dark:text-slate-200 bg-gray-50 dark:bg-slate-700/50 p-3 rounded-xl border border-gray-100 dark:border-slate-600/40">
          {t('parentDashboard.metrics.sensoryDesc')}
        </p>
      </div>
    </section>
  );
}