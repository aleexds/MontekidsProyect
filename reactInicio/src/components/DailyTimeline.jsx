import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/useAuth';
import { getTeacherForUser } from '../utils/teacherHelper';

const API = 'http://localhost:3000';

export function DailyTimeline() {
  const { language, t } = useLanguage();
  const { activeUser } = useAuth();
  const teacher = getTeacherForUser(activeUser);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const loadNotes = () => {
      fetch(`${API}/teacherNotes`)
        .then(r => r.json())
        .then(data => {
          if (Array.isArray(data)) {
            // Filtrar notas por estudiante actual si aplica
            const studentNotes = data.filter(n => !activeUser?.id || n.studentId === activeUser.id || activeUser.role === 'teacher');
            setNotes(studentNotes.length > 0 ? studentNotes : data);
          }
        })
        .catch(e => console.error(e));
    };

    loadNotes();
    const interval = setInterval(loadNotes, 3000);
    return () => clearInterval(interval);
  }, [activeUser]);

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

  const childName = activeUser?.child?.firstName || 'Mateo';

  return (
    <div className="lg:col-span-8 flex flex-col gap-5">
      {/* Header Bitácora */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-gray-100 dark:bg-slate-800 p-4 rounded-2xl border border-gray-200 dark:border-slate-700/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse"></span>
            <h2 className="font-bold text-gray-900 dark:text-white text-lg">
              {t('parentDashboard.timeline.headerTitle', `Bitácora del Día de ${childName}`)}
            </h2>
          </div>
          <p className="text-xs text-gray-500 dark:text-slate-300">
            {getTodayFormatted()}
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 text-xs font-bold uppercase tracking-wider self-start sm:self-center">
          <span className="material-symbols-outlined text-[16px]">sensors</span>
          {t('parentDashboard.timeline.inSession', 'En Jornada Matutina')}
        </span>
      </div>

      {/* Comentarios de la Docente */}
      <div className="flex flex-col gap-4">
        {notes.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700/60 text-center text-sm text-gray-500 dark:text-slate-400">
            Aún no hay notas registradas por el docente para hoy.
          </div>
        ) : (
          notes.map(note => (
            <article key={note.id} className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-gray-100 dark:border-slate-700/60 shadow-sm hover:shadow-md transition-all">
              <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-slate-700/50 border border-gray-100 dark:border-slate-600/40 flex items-start gap-3">
                <div className="w-9 h-9 rounded-full bg-purple-600 dark:bg-purple-500 text-white font-bold flex items-center justify-center text-xs shrink-0">
                  {teacher?.initials || 'KS'}
                </div>
                <div className="flex flex-col gap-1 w-full">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-900 dark:text-white">
                      {note.teacherName || teacher?.name || 'Docente Karina S.'}
                    </span>
                    <span className="text-gray-400 dark:text-slate-300 text-[11px]">
                      • {note.time || 'Reciente'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-700 dark:text-slate-100 italic">
                    "{note.text}"
                  </p>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
  );
}