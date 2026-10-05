import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { useLanguage } from '../context/LanguageContext';

export function ReportComposer({ onAddThread, initialData }) {
  const { activeUser } = useAuth();
  const { t } = useLanguage();
  // Inicializamos el estado directo desde 'initialData' (sin useEffect)
  const [category, setCategory] = useState(initialData?.category || 'salud');
  const [title, setTitle] = useState(initialData?.title || '');
  const [message, setMessage] = useState(initialData?.message || '');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    const newThread = {
      id: String(Date.now()),
      userId: activeUser?.id || null,
      category,
      categoryLabel:
        category === 'salud'
          ? t('reportsPage.catHealthFull')
          : category === 'horario'
          ? t('reportsPage.catScheduleFull')
          : t('reportsPage.catPedagogicalFull'),
      categoryIcon:
        category === 'salud'
          ? 'medical_services'
          : category === 'horario'
          ? 'schedule'
          : 'school',
      time: t('reportsPage.sentJustNow'),
      title,
      sender: activeUser?.name || 'Tutor Montekids',
      senderAvatar: activeUser?.avatar || activeUser?.avatarUrl || '',
      message,
      attachment: file ? file.name : null,
      attachmentSize: file ? `${(file.size / 1024).toFixed(0)} KB` : null,
      reply: null
    };

    onAddThread(newThread);
    setTitle('');
    setMessage('');
    setFile(null);
  };

  const categories = [
    { id: 'salud', label: t('reportsPage.catHealth'), icon: 'medical_services' },
    { id: 'horario', label: t('reportsPage.catSchedule'), icon: 'schedule' },
    { id: 'pedagogica', label: t('reportsPage.catPedagogical'), icon: 'school' }
  ];

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-sm border border-outline-variant/60">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-cyan-100 dark:bg-cyan-950/60 flex items-center justify-center text-cyan-700 dark:text-cyan-300">
          <span className="material-symbols-outlined text-[24px]">edit_square</span>
        </div>
        <div>
          <h2 className="font-['Nunito'] text-xl font-bold text-on-surface">
            {t('reportsPage.composerTitle')}
          </h2>
          <p className="text-body-sm text-on-surface-variant">
            {t('reportsPage.composerSubtitle')}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Categoría */}
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">
            {t('reportsPage.categoryLabel')}
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-label-md transition-all cursor-pointer ${
                  category === cat.id
                    ? 'border-cyan-600 bg-cyan-600 dark:bg-cyan-400 dark:border-cyan-400 text-white dark:text-slate-950 font-bold shadow-sm'
                    : 'border-outline-variant/50 bg-surface hover:bg-surface-container-high text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                <span className="truncate">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Asunto / Título */}
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-1">
            {t('reportsPage.subjectLabel')}
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('reportsPage.subjectPlaceholder')}
            className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface outline-none transition-all"
            required
          />
        </div>

        {/* Mensaje */}
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-1">
            {t('reportsPage.messageLabel')}
          </label>
          <textarea
            rows={7}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('reportsPage.messagePlaceholder')}
            className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface outline-none transition-all font-mono text-sm leading-relaxed"
            required
          />
        </div>

        {/* Adjunto y Botón de Envío */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-label-md cursor-pointer border border-outline-variant/40 transition-all">
            <span className="material-symbols-outlined text-[20px]">attach_file</span>
            <span>{file ? file.name : t('reportsPage.attachBtn')}</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0] || null)}
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-primary text-on-primary font-label-lg font-bold shadow-md hover:bg-primary/90 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
            <span>{t('reportsPage.sendBtn')}</span>
          </button>
        </div>
      </form>
    </div>
  );
}