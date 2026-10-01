import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/useAuth';
import { getTeacherForUser } from '../utils/teacherHelper';

export function FamilyHeroBanner() {
  const { t } = useLanguage();
  const { activeUser } = useAuth();
  const [userData, setUserData] = useState(() => {
    try {
      const saved = localStorage.getItem('activeUser');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Cargar los datos de respaldo si no hay usuario activo
  useEffect(() => {
    if (activeUser || userData) {
      return;
    }

    fetch('http://localhost:3000/users')
      .then((res) => res.json())
      .then((users) => {
        if (users && users.length > 0) {
          setUserData(users[0]);
        }
      })
      .catch((err) => {
        console.warn('Error al cargar los datos del usuario:', err);
      });
  }, [activeUser, userData]);

  const currentUser = activeUser || userData;
  const teacher = getTeacherForUser(currentUser);

  // Extraer datos de la estructura de db.json de manera segura
  const lastName = currentUser?.child?.lastName || (currentUser?.name ? currentUser.name.split(' ')[1] : 'Familia');
  const firstName = currentUser?.child?.firstName || 'Explorador';
  const childAge = currentUser?.child?.age || '3';
  const classroom = currentUser?.child?.classroom || 'Aula Semillitas';

  return (
    <section className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-950 text-white p-6 sm:p-8 shadow-xl">
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar con Badge */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full p-1 bg-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] flex items-center justify-center text-3xl font-bold bg-white text-purple-900">
              👦
            </div>
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap bg-cyan-400 text-slate-950 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 animate-ping"></span>
              {t('parentDashboard.hero.presentBadge', 'Presente hoy')}
            </span>
          </div>

          {/* Textos Informativos Dinámicos */}
          <div className="flex flex-col gap-1.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {t('parentDashboard.hero.greeting', '¡Hola, Familia')} {lastName}! 👋
            </h1>
            <p className="text-sm sm:text-base text-purple-100">
              {t('parentDashboard.hero.summaryStart', 'Este es el resumen de')}{' '}
              <span className="font-bold text-cyan-300 underline underline-offset-4">{firstName}</span>{' '}
              {t('parentDashboard.hero.summaryMiddle', 'hoy en el')}{' '}
              <span className="font-bold text-amber-300">
                {classroom}
              </span>.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-white border border-white/10">
                🧒 {childAge} {t('parentDashboard.hero.yearsOld', 'Años cumplidos')} • {classroom}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-cyan-200 border border-white/10 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">schedule</span>
                {t('parentDashboard.hero.attendanceBadge', 'Asistencia: 08:15 AM (Biométrico)')}
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-medium text-pink-200 border border-white/10 flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">school</span>
                {t('parentDashboard.hero.guide', 'Guía:')} {teacher.name}
              </span>
            </div>
          </div>
        </div>

        {/* Botón de Acción */}
        <div className="shrink-0">
          <Link
            to="/mis-comentarios-reportes"
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-pink-500/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">edit_note</span>
            <span>{t('parentDashboard.hero.sendNoteBtn', '+ Enviar Nota a la Docente')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}