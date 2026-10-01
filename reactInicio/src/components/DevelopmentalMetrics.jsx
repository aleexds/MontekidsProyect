import { useLanguage } from '../context/LanguageContext';

export function DevelopmentalMetrics() {
  const { t } = useLanguage();

  const metrics = [
    {
      title: t('parentDashboard.metrics.m1Title'),
      score: '94%',
      status: t('parentDashboard.metrics.m1Status'),
      color: 'text-emerald-700 dark:text-emerald-300',
      bgBar: 'bg-emerald-500',
      icon: 'bolt'
    },
    {
      title: t('parentDashboard.metrics.m2Title'),
      score: '88%',
      status: t('parentDashboard.metrics.m2Status'),
      color: 'text-purple-700 dark:text-sky-300',
      bgBar: 'bg-purple-500',
      icon: 'psychology'
    },
    {
      title: t('parentDashboard.metrics.m3Title'),
      score: '91%',
      status: t('parentDashboard.metrics.m3Status'),
      color: 'text-amber-700 dark:text-amber-300',
      bgBar: 'bg-amber-500',
      icon: 'sports_handball'
    },
    {
      title: t('parentDashboard.metrics.m4Title'),
      score: '96%',
      status: t('parentDashboard.metrics.m4Status'),
      color: 'text-cyan-700 dark:text-cyan-300',
      bgBar: 'bg-cyan-500',
      icon: 'record_voice_over'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, idx) => (
        <div
          key={idx}
          className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-gray-100 dark:border-slate-700/60 shadow-sm flex flex-col justify-between gap-3 hover:shadow-md transition-all"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-500 dark:text-slate-300">
              {metric.title}
            </span>
            <div className="w-8 h-8 rounded-xl bg-gray-50 dark:bg-slate-700/60 flex items-center justify-center text-gray-700 dark:text-slate-200">
              <span className="material-symbols-outlined text-[18px]">{metric.icon}</span>
            </div>
          </div>

          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-black text-gray-900 dark:text-white">
              {metric.score}
            </span>
            <span className={`text-[11px] font-bold ${metric.color}`}>
              {metric.status}
            </span>
          </div>

          {/* Barra de progreso */}
          <div className="w-full h-2 rounded-full bg-gray-100 dark:bg-slate-700 overflow-hidden">
            <div
              className={`h-full rounded-full ${metric.bgBar}`}
              style={{ width: metric.score }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}