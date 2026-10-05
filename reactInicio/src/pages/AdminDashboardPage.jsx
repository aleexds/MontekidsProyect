import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useLanguage } from '../context/LanguageContext';
import { ParentHeader } from '../components/ParentHeader';
import { UserAvatar } from '../components/UserAvatar';

const API = 'http://localhost:3000';

const formatDateKey = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function AdminDashboardPage() {
  const { activeUser } = useAuth();
  const { t, language } = useLanguage();

  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  // Pestaña activa derivada directamente de la URL hash ('dashboard' | 'alumnos' | 'curriculum' | 'reportes' | 'direccion')
  const activeTab = location.hash === '#alumnos'
    ? 'alumnos'
    : location.hash === '#curriculum'
      ? 'curriculum'
      : location.hash === '#reportes'
        ? 'reportes'
        : location.hash === '#direccion'
          ? 'direccion'
          : 'dashboard';

  // Aula del docente
  const selectedClassroom = activeUser?.classroom || "Aula Semillitas (2 a 4 años)";
  const [studentSearch, setStudentSearch] = useState('');

  // Estados de Fecha y Calendario de Asistencia
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(true);

  // Estados de Modales para Acciones con Alumnos
  const [noteModalStudent, setNoteModalStudent] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [noteSuccessMsg, setNoteSuccessMsg] = useState('');

  const [taskModalStudent, setTaskModalStudent] = useState(null);
  const [taskTitle, setTaskTitle] = useState('');
  const [taskSubtitle, setTaskSubtitle] = useState('');
  const [taskIcon, setTaskIcon] = useState('alarm');
  const [taskSuccessMsg, setTaskSuccessMsg] = useState('');

  // Estados de Plan Curricular
  const [curriculumEvents, setCurriculumEvents] = useState([]);
  const [currSearch, setCurrSearch] = useState('');
  const [showCurrModal, setShowCurrModal] = useState(false);
  const [currTitle, setCurrTitle] = useState('');
  const [currDate, setCurrDate] = useState('');
  const [currTime, setCurrTime] = useState('09:00 AM - 10:30 AM');
  const [currCategory, setCurrCategory] = useState('workshops');
  const [currDescription, setCurrDescription] = useState('');
  const [currSuccessMsg, setCurrSuccessMsg] = useState('');

  // Estados de Sección Reportes/Comentarios
  const [reports, setReports] = useState([]);
  const [selectedTutorId, setSelectedTutorId] = useState('all');
  const [replyModalReport, setReplyModalReport] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replyStatusTag, setReplyStatusTag] = useState('Atendido');
  const [replySuccessMsg, setReplySuccessMsg] = useState('');

  // Estados de Observaciones del Dueño / Dirección
  const [ownerComments, setOwnerComments] = useState([]);

  useEffect(() => {
    Promise.all([
      fetch(`${API}/users`).then(r => r.json()),
      fetch(`${API}/gameHistory`).then(r => r.json()),
      fetch(`${API}/attendance`).then(r => r.json()).catch(() => []),
      fetch(`${API}/curriculumEvents`).then(r => r.json()).catch(() => []),
      fetch(`${API}/reports`).then(r => r.json()).catch(() => []),
      fetch(`${API}/ownerComments`).then(r => r.json()).catch(() => [])
    ]).then(([u, g, a, cEvents, repData, oComments]) => {
      setUsers(u);
      setGames(g);
      setAttendance(Array.isArray(a) ? a : []);
      setCurriculumEvents(Array.isArray(cEvents) ? cEvents : []);
      setReports(Array.isArray(repData) ? repData : []);
      setOwnerComments(Array.isArray(oComments) ? oComments : []);
      setLoading(false);
    }).catch(e => console.error(e));
  }, []);

  // Enviar respuesta a un reporte/comentario de un tutor
  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyModalReport || !replyText.trim()) return;

    const replyData = {
      author: activeUser?.name || 'Docente Karina S.',
      role: 'Guía AMI',
      time: 'hace unos momentos',
      statusTag: replyStatusTag || 'Atendido',
      text: replyText.trim(),
      signed: true,
      avatar: activeUser?.avatar || activeUser?.avatarUrl || ''
    };

    try {
      await fetch(`${API}/reports/${replyModalReport.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reply: replyData })
      });

      setReports(prev => prev.map(r => String(r.id) === String(replyModalReport.id) ? { ...r, reply: replyData } : r));
      setReplySuccessMsg('¡Respuesta enviada al tutor con éxito!');
      setTimeout(() => {
        setReplyModalReport(null);
        setReplyText('');
        setReplyStatusTag('Atendido');
        setReplySuccessMsg('');
      }, 1500);
    } catch (err) {
      console.error('Error al responder reporte:', err);
    }
  };

  // Crear nueva actividad en el Plan Curricular
  const handleCreateCurriculumEvent = async (e) => {
    e.preventDefault();
    if (!currTitle.trim() || !currDate) return;

    const catLabels = {
      workshops: 'Estimulación AMI',
      special: 'Lúdico / Huerta',
      meetings: 'Reunión Familias',
      academic: 'Área Académica'
    };

    const newEvt = {
      id: `ce-${Date.now()}`,
      title: currTitle.trim(),
      date: currDate,
      time: currTime.trim() || 'Durante la jornada',
      category: currCategory,
      categoryLabel: catLabels[currCategory] || 'Actividad',
      classroom: selectedClassroom || activeUser?.classroom || 'Aula Semillitas (2 a 4 años)',
      teacherName: activeUser?.name || 'Docente Karina S.',
      description: currDescription.trim() || 'Actividad pedagógica planificada.'
    };

    try {
      const res = await fetch(`${API}/curriculumEvents`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEvt)
      });
      const saved = await res.json();
      setCurriculumEvents(prev => [...prev, saved]);
      setCurrSuccessMsg('¡Actividad curricular guardada con éxito! Ya es visible en el calendario de los estudiantes.');
      setTimeout(() => {
        setShowCurrModal(false);
        setCurrTitle('');
        setCurrDate('');
        setCurrDescription('');
        setCurrSuccessMsg('');
      }, 1500);
    } catch (err) {
      console.error('Error al crear actividad curricular:', err);
    }
  };

  const handleDeleteCurriculumEvent = async (id) => {
    try {
      await fetch(`${API}/curriculumEvents/${id}`, { method: 'DELETE' });
      setCurriculumEvents(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      console.error('Error al eliminar actividad curricular:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f9fc] dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 flex justify-center items-center font-bold">
        Cargando dashboard...
      </div>
    );
  }

  // Nombres de Meses y Días traducidos según idioma del contexto
  const defaultMonths = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const translatedMonths = t('calendarPage.months');
  const monthNames = Array.isArray(translatedMonths) ? translatedMonths : defaultMonths;

  const translatedDays = t('calendarPage.daysOfWeek');
  const daysOfWeek = Array.isArray(translatedDays) ? translatedDays : ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const formatDisplayDate = (d) => {
    const localeStr = language === 'en' ? 'en-US' : language === 'zh' ? 'zh-CN' : 'es-ES';
    return d.toLocaleDateString(localeStr, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Navegación de Calendario
  const handlePrevMonth = () => {
    setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCalendarMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };
  const handlePrevDay = () => {
    setSelectedDate(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() - 1);
      if (d.getMonth() !== calendarMonth.getMonth() || d.getFullYear() !== calendarMonth.getFullYear()) {
        setCalendarMonth(new Date(d.getFullYear(), d.getMonth(), 1));
      }
      return d;
    });
  };
  const handleNextDay = () => {
    setSelectedDate(prev => {
      const d = new Date(prev);
      d.setDate(d.getDate() + 1);
      if (d.getMonth() !== calendarMonth.getMonth() || d.getFullYear() !== calendarMonth.getFullYear()) {
        setCalendarMonth(new Date(d.getFullYear(), d.getMonth(), 1));
      }
      return d;
    });
  };
  const handleGoToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setCalendarMonth(new Date(today.getFullYear(), today.getMonth(), 1));
  };

  const handleSelectDay = (dayDate) => {
    if (!dayDate) return;
    setSelectedDate(dayDate);
  };

  const selectedDateStr = formatDateKey(selectedDate);

  const handleToggleAttendance = async (studentId, status) => {
    const existingIndex = attendance.findIndex(
      a => a.studentId === studentId && a.date === selectedDateStr
    );

    if (existingIndex >= 0) {
      const existing = attendance[existingIndex];
      const updated = { ...existing, status };
      setAttendance(prev => prev.map(a => a.id === existing.id ? updated : a));

      try {
        await fetch(`${API}/attendance/${existing.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status })
        });
      } catch (e) {
        console.error('Error al actualizar asistencia:', e);
      }
    } else {
      const newRecord = {
        id: `att-${studentId}-${selectedDateStr}`,
        studentId,
        date: selectedDateStr,
        status
      };
      setAttendance(prev => [...prev, newRecord]);

      try {
        await fetch(`${API}/attendance`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newRecord)
        });
      } catch (e) {
        console.error('Error al guardar asistencia:', e);
      }
    }
  };

  // Enviar Nota a la Bitácora del Estudiante (ParentDashboard)
  const handleSendNote = async (e) => {
    e.preventDefault();
    if (!noteModalStudent || !noteText.trim()) return;

    const studentFullName = `${noteModalStudent.child?.firstName || ''} ${noteModalStudent.child?.lastName || ''}`.trim();
    const newNote = {
      id: `tn-${Date.now()}`,
      studentId: noteModalStudent.id,
      studentName: studentFullName,
      teacherName: activeUser?.name || 'Docente Karina S.',
      time: 'hace unos momentos',
      createdAt: new Date().toISOString(),
      text: noteText.trim()
    };

    try {
      await fetch(`${API}/teacherNotes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newNote)
      });
      setNoteSuccessMsg('¡Nota enviada con éxito! Ya es visible en la Bitácora del familiar.');
      setTimeout(() => {
        setNoteModalStudent(null);
        setNoteText('');
        setNoteSuccessMsg('');
      }, 1500);
    } catch (err) {
      console.error('Error al guardar nota:', err);
    }
  };

  // Asignar Actividad/Material al Estudiante (CalendarPage)
  const handleAssignTask = async (e) => {
    e.preventDefault();
    if (!taskModalStudent || !taskTitle.trim()) return;

    const studentFullName = `${taskModalStudent.child?.firstName || ''} ${taskModalStudent.child?.lastName || ''}`.trim();
    const newTask = {
      id: `act-${Date.now()}`,
      studentId: taskModalStudent.id,
      studentName: studentFullName,
      text: taskTitle.trim(),
      subtitle: taskSubtitle.trim() || 'Asignado por el docente',
      checked: false,
      icon: taskIcon || 'alarm',
      isPending: true
    };

    try {
      await fetch(`${API}/assignedActivities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask)
      });
      setTaskSuccessMsg('¡Actividad asignada con éxito! Ya aparece en los Materiales Pendientes del calendario.');
      setTimeout(() => {
        setTaskModalStudent(null);
        setTaskTitle('');
        setTaskSubtitle('');
        setTaskSuccessMsg('');
      }, 1500);
    } catch (err) {
      console.error('Error al asignar actividad:', err);
    }
  };

  // Filtrar alumnos del aula seleccionada
  const allStudentUsers = users.filter(u => u.role === 'tutor' || u.child?.firstName);
  const studentsInClass = allStudentUsers.filter(u => !selectedClassroom || selectedClassroom === 'all' || u.child?.classroom === selectedClassroom);
  
  const searchedStudents = studentsInClass.filter(u => {
    if (!studentSearch.trim()) return true;
    const term = studentSearch.toLowerCase();
    const childNameStr = `${u.child?.firstName || ''} ${u.child?.lastName || ''}`.toLowerCase();
    const tutorNameStr = (u.name || '').toLowerCase();
    return childNameStr.includes(term) || tutorNameStr.includes(term);
  });

  const studentCount = studentsInClass.length;
  const displayCount = studentCount; 

  const classUserIds = studentsInClass.map(u => u.id);
  const classGames = games.filter(g => classUserIds.includes(g.userId));

  // Mapa de asistencia para la fecha seleccionada
  const dateAttendanceMap = attendance
    .filter(a => a.date === selectedDateStr)
    .reduce((acc, curr) => {
      acc[curr.studentId] = curr.status;
      return acc;
    }, {});

  const presentCount = studentsInClass.filter(s => dateAttendanceMap[s.id] === 'present').length;
  const absentCount = studentsInClass.filter(s => dateAttendanceMap[s.id] === 'absent').length;

  // Días para la cuadrícula del calendario
  const calendarYear = calendarMonth.getFullYear();
  const calendarMonthIdx = calendarMonth.getMonth();
  const firstDayIndex = new Date(calendarYear, calendarMonthIdx, 1).getDay();
  const totalDaysInMonth = new Date(calendarYear, calendarMonthIdx + 1, 0).getDate();

  const daysToRender = [];
  for (let i = 0; i < firstDayIndex; i++) {
    daysToRender.push(null);
  }
  for (let d = 1; d <= totalDaysInMonth; d++) {
    daysToRender.push(new Date(calendarYear, calendarMonthIdx, d));
  }
  
  // Data for Orange Card (Classroom stars)
  const totalGlobalStars = studentsInClass.reduce((acc, u) => acc + (u.estrellas || 0), 0);
  const userWithMaxStars = [...studentsInClass].sort((a,b) => (b.estrellas || 0) - (a.estrellas || 0))[0];
  const topStudentText = userWithMaxStars && (userWithMaxStars.estrellas || 0) > 0 
    ? `🏆 Top: ${userWithMaxStars.child?.firstName || userWithMaxStars.name?.split(' ')[0]} (${userWithMaxStars.estrellas} ⭐)`
    : t('adminDashboard.noStarsYet', 'Sin estrellas aún');

  // Data for Cyan Card (Classroom games)
  const totalGlobalGames = classGames.length;
  const gameCounts = classGames.reduce((acc, g) => {
    acc[g.gameName] = (acc[g.gameName] || 0) + 1;
    return acc;
  }, {});
  let mostPlayedGame = t('adminDashboard.noGamesYet', 'Aún no hay juegos');
  let maxGameCount = 0;
  for (const [name, count] of Object.entries(gameCounts)) {
    if (count > maxGameCount) {
      maxGameCount = count;
      mostPlayedGame = `🎮 ${name}`;
    }
  }

  // Tutores del aula de la docente
  const classTutors = users.filter(u => u.role === 'tutor' && (!selectedClassroom || selectedClassroom === 'all' || u.child?.classroom === selectedClassroom));
  const classTutorIds = classTutors.map(u => String(u.id));

  // Reportes enviados por los tutores de esta aula
  const classroomReports = reports.filter(r => !r.userId || classTutorIds.includes(String(r.userId)));

  // Reportes filtrados por la pestaña de tutor elegida
  const filteredReportsByTutor = selectedTutorId === 'all'
    ? classroomReports
    : classroomReports.filter(r => String(r.userId) === String(selectedTutorId));

  const adminNavItems = [
    { path: '/admin#dashboard', label: t('adminDashboard.nav.dashboard', 'Dashboard') },
    { path: '/admin#alumnos', label: t('adminDashboard.nav.students', 'Alumnos') },
    { path: '/admin#curriculum', label: t('adminDashboard.nav.curriculum', 'Plan Curricular') },
    { path: '/admin#reportes', label: t('adminDashboard.nav.reports', 'Reportes') },
    { path: '/admin#direccion', label: 'Observaciones del Dueño' }
  ];

  return (
    <div className="min-h-screen bg-[#f9f9fc] dark:bg-zinc-950 font-sans text-slate-900 dark:text-zinc-100 transition-colors duration-300">
      <ParentHeader customNavItems={adminNavItems} />

      <main className="pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full transition-colors duration-300">
        


        {/* ========================================================================= */}
        {/* PESTAÑA 1: DASHBOARD OVERVIEW */}
        {/* ========================================================================= */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 w-full items-start">
            
            {/* CONTENIDO PRINCIPAL IZQUIERDO */}
            <div className="flex flex-col gap-6 w-full min-w-0">
              
              {/* 3 CARDS SUPERIORES */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                
                {/* Card 1 */}
                <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs transition-colors duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-[10px] font-black text-pink-700 dark:text-pink-400 tracking-wider uppercase mb-1">
                        {t('adminDashboard.activeCensus', 'Censo Activo')}
                      </div>
                      <div className="text-lg font-bold text-slate-900 dark:text-white">
                        {t('adminDashboard.registeredChildren', 'Niños Registrados')}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950/50 flex justify-center items-center text-xl">👶</div>
                  </div>
                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-4xl font-black text-slate-900 dark:text-white leading-none">{displayCount}</span>
                    <span className="text-sm font-bold text-slate-500 dark:text-zinc-400">{t('adminDashboard.students', 'Alumnos')}</span>
                    <span className="bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full text-[11px] font-extrabold">↗ +3 este mes</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-400 dark:text-zinc-500">{t('adminDashboard.roomCapacity', 'Capacidad de sala: 96%')}</span>
                    <span className="text-sky-500">{t('adminDashboard.freeSpot', '1 cupo libre')}</span>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 p-6 rounded-2xl text-white shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-[10px] font-black text-white/80 tracking-wider uppercase mb-1">
                        {t('adminDashboard.starsEconomy', 'Economía de Estrellas')}
                      </div>
                      <div className="text-lg font-bold">
                        {t('adminDashboard.accumulatedStars', 'Estrellas Acumuladas')}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex justify-center items-center text-xl">⭐</div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-black leading-none">{totalGlobalStars}</span>
                      <span className="text-sm font-bold text-white/90">{t('adminDashboard.totalStars', 'Estrellas Totales')}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-xs font-extrabold text-white bg-black/10 p-2.5 rounded-lg">
                    <span>{topStudentText}</span>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 dark:from-cyan-700 dark:to-cyan-800 p-6 rounded-2xl text-white shadow-md flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-[10px] font-black text-white/80 tracking-wider uppercase mb-1">
                        {t('adminDashboard.gamesActivity', 'Actividad de Juegos')}
                      </div>
                      <div className="text-lg font-bold">
                        {t('adminDashboard.sessionsCompleted', 'Sesiones Realizadas')}
                      </div>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/20 flex justify-center items-center text-lg">🎮</div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-baseline gap-3">
                      <span className="text-4xl font-black leading-none">{totalGlobalGames}</span>
                      <span className="text-sm font-bold text-white/90">{t('adminDashboard.totalGames', 'Juegos Totales')}</span>
                    </div>
                    
                    <div className="w-20 h-10">
                      <svg width="100%" height="100%" viewBox="0 0 80 40">
                        <path d="M 0 30 Q 20 10, 40 20 T 80 5" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="3" strokeLinecap="round"/>
                        <circle cx="80" cy="5" r="4" fill="#fff" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex justify-between text-xs font-extrabold text-white bg-black/10 p-2.5 rounded-lg">
                    <span>{mostPlayedGame}</span>
                  </div>
                </div>

              </div>

              {/* PANEL LONGITUDINAL */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-xs transition-colors duration-300">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
                  <div>
                    <div className="text-[10px] font-black text-pink-700 dark:text-pink-400 tracking-wider uppercase mb-1">
                      {t('adminDashboard.longitudinalPanel', 'Panel Longitudinal')}
                    </div>
                    <h3 className="m-0 text-lg font-bold text-slate-900 dark:text-white">
                      {t('adminDashboard.metricsTitle', 'Métricas de Desarrollo y Progresión')}
                    </h3>
                  </div>
                  <div className="flex bg-slate-100 dark:bg-zinc-800 rounded-full p-1 border border-slate-200 dark:border-zinc-700">
                    <button className="border-none bg-pink-700 text-white rounded-full px-4 py-1.5 text-xs font-bold">{t('adminDashboard.last6Months', 'Últimos 6 Meses')}</button>
                    <button className="border-none bg-transparent text-slate-600 dark:text-zinc-400 rounded-full px-4 py-1.5 text-xs font-semibold">{t('adminDashboard.quarter', 'Trimestre')}</button>
                    <button className="border-none bg-transparent text-slate-600 dark:text-zinc-400 rounded-full px-4 py-1.5 text-xs font-semibold">{t('adminDashboard.annual', 'Anual')}</button>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-5 mb-5 text-xs font-bold text-slate-600 dark:text-zinc-400">
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-fuchsia-500"></span> {t('adminDashboard.psychomotorSensory', 'Psicomotriz y Sensorial')}</div>
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-sky-500"></span> {t('adminDashboard.cognitiveLanguage', 'Cognitivo y Lenguaje')}</div>
                  <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> {t('adminDashboard.socioemotional', 'Socioemocional')}</div>
                </div>

                <div className="relative h-56 border-b border-slate-200 dark:border-zinc-800">
                  <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none">
                    <path d="M 50 150 Q 200 120, 350 100 T 650 40 L 750 30" fill="none" stroke="#d946ef" strokeWidth="4" />
                    <path d="M 50 160 Q 200 140, 350 120 T 650 60 L 750 50" fill="none" stroke="#0ea5e9" strokeWidth="4" />
                    
                    <circle cx="50" cy="150" r="6" fill="#fff" stroke="#d946ef" strokeWidth="3" />
                    <circle cx="350" cy="100" r="6" fill="#fff" stroke="#d946ef" strokeWidth="3" />
                    <circle cx="750" cy="30" r="6" fill="#fff" stroke="#d946ef" strokeWidth="3" />
                    
                    <circle cx="50" cy="160" r="6" fill="#fff" stroke="#0ea5e9" strokeWidth="3" />
                    <circle cx="350" cy="120" r="6" fill="#fff" stroke="#0ea5e9" strokeWidth="3" />
                    <circle cx="750" cy="50" r="6" fill="#fff" stroke="#0ea5e9" strokeWidth="3" />

                    <rect x="340" y="140" width="20" height="60" rx="10" fill="#fbd38d" />
                    <rect x="640" y="90" width="20" height="110" rx="10" fill="#fbd38d" />
                    <rect x="740" y="80" width="20" height="120" rx="10" fill="#fbd38d" />
                  </svg>

                  <div className="absolute top-2 left-[60%] sm:left-[630px] bg-pink-700 text-white px-2.5 py-1 rounded-full text-[10px] font-black">★ Oct: 93% Sensorial</div>
                  <div className="absolute top-16 left-[30%] sm:left-[300px] bg-teal-700 text-white px-2.5 py-1 rounded-full text-[10px] font-black">+ Sep: 86% Lenguaje</div>
                </div>

                <div className="flex justify-between px-4 pt-3 text-xs font-bold text-slate-600 dark:text-zinc-400">
                  <span>Mayo</span>
                  <span>Junio</span>
                  <span>Julio</span>
                  <span>Agosto</span>
                  <span>Sept</span>
                  <span className="text-slate-900 dark:text-white font-black">Oct (Actual)</span>
                </div>
              </div>

              {/* LISTA DE ESTUDIANTES Y CALENDARIO DE ASISTENCIA */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-xs transition-colors duration-300">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-5 gap-3">
                  <div>
                    <div className="text-[10px] font-black text-sky-500 tracking-wider uppercase mb-1">
                      {t('adminDashboard.takeAttendance', 'PASAR LISTA Y REVISAR HISTORIAL')}
                    </div>
                    <h3 className="m-0 text-lg font-bold text-slate-900 dark:text-white flex flex-wrap items-center gap-2">
                      <span>{t('adminDashboard.attendanceRecord', 'Registro de Asistencia')}</span>
                      <span className="text-xs font-bold text-pink-700 dark:text-pink-300 bg-pink-100 dark:bg-pink-950/50 px-3 py-1 rounded-full capitalize">
                        📅 {formatDisplayDate(selectedDate)}
                      </span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    <button 
                      onClick={handlePrevDay} 
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-white font-bold text-xs hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                      title="Día Anterior"
                    >
                      {t('adminDashboard.prevDay', '◄ Anterior')}
                    </button>
                    <button 
                      onClick={handleGoToday} 
                      className="px-3.5 py-1.5 rounded-xl border-none bg-sky-500 hover:bg-sky-600 text-white font-extrabold text-xs transition-colors cursor-pointer"
                    >
                      {t('adminDashboard.today', 'Hoy')}
                    </button>
                    <button 
                      onClick={handleNextDay} 
                      className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-800 text-slate-900 dark:text-white font-bold text-xs hover:bg-slate-100 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                      title="Día Siguiente"
                    >
                      {t('adminDashboard.nextDay', 'Siguiente ►')}
                    </button>
                    <button 
                      onClick={() => setShowCalendar(!showCalendar)} 
                      className={`px-3.5 py-1.5 rounded-xl border font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5 ${
                        showCalendar 
                          ? 'bg-slate-900 text-white dark:bg-zinc-100 dark:text-zinc-900 border-transparent' 
                          : 'bg-white dark:bg-zinc-800 text-slate-900 dark:text-white border-slate-300 dark:border-zinc-700 hover:bg-slate-50 dark:hover:bg-zinc-700'
                      }`}
                    >
                      {showCalendar ? t('adminDashboard.hideCalendar', '🗓️ Ocultar Calendario') : t('adminDashboard.showCalendar', '🗓️ Ver Calendario')}
                    </button>
                  </div>
                </div>

                {showCalendar && (
                  <div className="bg-slate-50 dark:bg-zinc-800/60 rounded-2xl p-4 mb-5 border border-slate-200 dark:border-zinc-700">
                    <div className="flex justify-between items-center mb-3">
                      <button 
                        onClick={handlePrevMonth}
                        className="px-3 py-1 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-bold text-xs text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-700 cursor-pointer"
                      >
                        {t('adminDashboard.prevMonth', '‹ Mes Ant.')}
                      </button>
                      <span className="text-sm font-black text-slate-900 dark:text-white">
                        {monthNames[calendarMonthIdx]} {calendarYear}
                      </span>
                      <button 
                        onClick={handleNextMonth}
                        className="px-3 py-1 rounded-lg border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 font-bold text-xs text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-700 cursor-pointer"
                      >
                        {t('adminDashboard.nextMonth', 'Mes Sig. ›')}
                      </button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center mb-1.5">
                      {daysOfWeek.map(day => (
                        <div key={day} className="text-[11px] font-extrabold text-slate-400 dark:text-zinc-500 uppercase">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1.5">
                      {daysToRender.map((dateObj, idx) => {
                        if (!dateObj) {
                          return <div key={`empty-${idx}`} className="h-10" />;
                        }

                        const dateKey = formatDateKey(dateObj);
                        const isSelected = formatDateKey(selectedDate) === dateKey;
                        const isToday = formatDateKey(new Date()) === dateKey;
                        const hasAttendanceRecords = attendance.some(a => a.date === dateKey);

                        return (
                          <button
                            key={dateKey}
                            onClick={() => handleSelectDay(dateObj)}
                            className={`h-10 rounded-xl border text-xs font-bold flex flex-col items-center justify-center relative transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-pink-700 border-pink-700 text-white font-black shadow-sm ring-2 ring-pink-500/30'
                                : isToday
                                ? 'bg-sky-100 dark:bg-sky-950/60 border-sky-400 text-sky-800 dark:text-sky-300 font-black'
                                : 'bg-white dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-800 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-700'
                            }`}
                          >
                            <span>{dateObj.getDate()}</span>
                            {hasAttendanceRecords && (
                              <span 
                                className={`w-1.5 h-1.5 rounded-full mt-0.5 ${isSelected ? 'bg-white' : 'bg-emerald-500'}`} 
                              />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {studentsInClass.length === 0 ? (
                    <div className="p-5 text-slate-500 dark:text-zinc-400 text-sm font-medium col-span-2">
                      {t('adminDashboard.noStudentsInClass', 'No hay estudiantes registrados en esta aula.')}
                    </div>
                  ) : (
                    studentsInClass.map(student => {
                      const status = dateAttendanceMap[student.id];
                      const isPresent = status === 'present';
                      const isAbsent = status === 'absent';

                      return (
                        <div key={student.id} className="flex justify-between items-center bg-slate-50 dark:bg-zinc-800/80 p-4 rounded-2xl border border-slate-200 dark:border-zinc-700">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full font-black flex justify-center items-center text-sm ${
                              isPresent 
                                ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400' 
                                : isAbsent 
                                ? 'bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400' 
                                : 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
                            }`}>
                              {(student.child?.firstName?.[0] || 'N').toUpperCase()}{(student.child?.lastName?.[0] || '').toUpperCase()}
                            </div>
                            <div>
                              <div className="text-sm font-bold text-slate-900 dark:text-white">
                                {student.child?.firstName || 'Nombre'} {student.child?.lastName || 'Apellido'}
                              </div>
                              <div className="text-xs text-slate-500 dark:text-zinc-400">
                                {t('adminDashboard.tutor', 'Tutor:')} {student.name}
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleToggleAttendance(student.id, 'present')}
                              className={`w-9 h-9 rounded-full border-none cursor-pointer flex justify-center items-center font-black transition-all ${
                                isPresent 
                                  ? 'bg-emerald-600 text-white shadow-md scale-105' 
                                  : 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900'
                              }`}
                              title={t('adminDashboard.present', 'Presente')}
                            >
                              ✓
                            </button>
                            <button 
                              onClick={() => handleToggleAttendance(student.id, 'absent')}
                              className={`w-9 h-9 rounded-full border-none cursor-pointer flex justify-center items-center font-black transition-all ${
                                isAbsent 
                                  ? 'bg-red-600 text-white shadow-md scale-105' 
                                  : 'bg-red-100 dark:bg-red-950/40 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900'
                              }`}
                              title={t('adminDashboard.absent', 'Ausente')}
                            >
                              ✗
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

              </div>

            </div>

            {/* SIDEBAR DERECHO */}
            <div className="flex flex-col gap-6 w-full">
              
              {/* ASISTENCIA SUMMARY */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-xs transition-colors duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-zinc-800 flex justify-center items-center text-lg">🧑‍🤝‍🧑</div>
                    <div>
                      <h4 className="m-0 text-base font-bold text-slate-900 dark:text-white">
                        {t('adminDashboard.attendanceSummary', 'Resumen Asistencia')}
                      </h4>
                      <span className="text-xs font-bold text-slate-500 dark:text-zinc-400">
                        {selectedDate.toLocaleDateString(language === 'en' ? 'en-US' : 'es-ES', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                    {presentCount}
                    <span className="text-sm font-bold text-slate-400 dark:text-zinc-500">/{studentsInClass.length}</span>
                  </div>
                </div>
                
                <div className="h-2 bg-slate-100 dark:bg-zinc-800 rounded-full mb-3 overflow-hidden">
                  <div 
                    className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full transition-all duration-300"
                    style={{ width: `${studentsInClass.length > 0 ? (presentCount / studentsInClass.length) * 100 : 0}%` }}
                  />
                </div>
                
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-emerald-600 dark:text-emerald-400">✓ {presentCount} {t('adminDashboard.presentCountLabel', 'presentes')}</span>
                  <span className="text-red-600 dark:text-red-400">✗ {absentCount} {t('adminDashboard.absentCountLabel', 'ausentes')}</span>
                </div>
              </div>

              {/* TIP MONTESSORI */}
              <div className="bg-violet-50 dark:bg-violet-950/40 rounded-2xl p-6 border border-violet-100 dark:border-violet-900/50">
                <div className="flex gap-3">
                  <div className="text-2xl">💡</div>
                  <div>
                    <div className="text-[10px] font-black text-violet-600 dark:text-violet-400 tracking-wider uppercase mb-1">
                      {t('adminDashboard.montessoriTipTitle', 'TIP MONTESSORI DEL DÍA')}
                    </div>
                    <p className="m-0 text-xs font-semibold text-violet-900 dark:text-violet-200 leading-relaxed">
                      {t('adminDashboard.montessoriTipText', '"Cualquier ayuda innecesaria es un obstáculo para el desarrollo infantil." Permite 3 intentos autónomos antes de asistir en la abotonadura.')}
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* PESTAÑA 2: GESTIÓN DE ALUMNOS (SECCIÓN ALUMNOS NUEVA) */}
        {/* ========================================================================= */}
        {activeTab === 'alumnos' && (
          <div className="flex flex-col gap-6 w-full">
            
            {/* CABECERA Y FILTROS DE ALUMNOS */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-[10px] font-black text-pink-700 dark:text-pink-400 uppercase tracking-widest block mb-1">
                  {t('adminDashboard.teachingSection', 'SECCIÓN DE DOCENCIA')}
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white m-0">
                  {t('adminDashboard.studentsManagementTitle', 'Gestión y Registro de Alumnos')}
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                  {t('adminDashboard.studentsManagementSubtitle', 'Revisa información de cada niño/a, envía comentarios a su bitácora y asigna actividades o materiales.')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                {/* Buscador de alumnos */}
                <div className="relative flex-1 sm:w-64">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                    search
                  </span>
                  <input
                    type="text"
                    value={studentSearch}
                    onChange={e => setStudentSearch(e.target.value)}
                    placeholder={t('adminDashboard.searchStudentPlaceholder', 'Buscar alumno o tutor...')}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>

            {/* TARJETAS DE ALUMNOS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchedStudents.length === 0 ? (
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 text-center text-slate-500 dark:text-zinc-400 text-sm font-medium col-span-full">
                  {t('adminDashboard.noStudentsFound', 'No se encontraron estudiantes para los criterios seleccionados.')}
                </div>
              ) : (
                searchedStudents.map(student => {
                  const firstName = student.child?.firstName || 'Nombre';
                  const lastName = student.child?.lastName || '';
                  const fullName = `${firstName} ${lastName}`.trim();
                  const tutorName = student.name || 'Tutor Registrado';
                  const ageUnit = language === 'en' ? 'years' : language === 'zh' ? '岁' : 'años';
                  const age = student.child?.age ? `${student.child.age} ${ageUnit}` : `3 ${ageUnit}`;
                  const gender = student.child?.gender || (firstName.endsWith('a') ? 'Niña' : 'Niño');
                  const classroomName = student.child?.classroom || t('adminDashboard.unassignedClassroom', 'Sin aula asignada');
                  const stars = student.estrellas || 0;

                  return (
                    <div key={student.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                      <div>
                        {/* Cabecera del Alumno */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 text-white font-black text-base flex justify-center items-center shadow-sm">
                              {firstName[0]}{lastName[0] || ''}
                            </div>
                            <div>
                              <h3 className="font-extrabold text-slate-900 dark:text-white text-base m-0">
                                {fullName}
                              </h3>
                              <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium block">
                                👨‍👩‍👦 {t('adminDashboard.tutorLabel', 'Tutor:')} <strong className="text-slate-700 dark:text-zinc-200">{tutorName}</strong>
                              </span>
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-black flex items-center gap-1 border border-amber-200 dark:border-amber-800">
                            ⭐ {stars}
                          </span>
                        </div>

                        {/* Etiquetas de Información del Alumno */}
                        <div className="grid grid-cols-2 gap-2 mb-5">
                          <div className="bg-slate-50 dark:bg-zinc-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-zinc-700/60">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 block uppercase">{t('adminDashboard.genderLabel', 'GÉNERO')}</span>
                            <span className="text-xs font-black text-slate-800 dark:text-zinc-200">
                              {gender === 'Niña' ? t('adminDashboard.girl', '👧 Niña') : t('adminDashboard.boy', '👦 Niño')}
                            </span>
                          </div>
                          <div className="bg-slate-50 dark:bg-zinc-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-zinc-700/60">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 block uppercase">{t('adminDashboard.ageLabel', 'EDAD')}</span>
                            <span className="text-xs font-black text-slate-800 dark:text-zinc-200">
                              🎂 {age}
                            </span>
                          </div>
                          <div className="col-span-2 bg-slate-50 dark:bg-zinc-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-zinc-700/60">
                            <span className="text-[10px] font-bold text-slate-400 dark:text-zinc-500 block uppercase">{t('adminDashboard.assignedClassroomLabel', 'AULA ASIGNADA')}</span>
                            <span className="text-xs font-black text-pink-700 dark:text-pink-300">
                              🏫 {classroomName}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Botones de Acción Docente */}
                      <div className="flex flex-col gap-2 pt-3 border-t border-slate-100 dark:border-zinc-800">
                        <button
                          onClick={() => {
                            setNoteModalStudent(student);
                            setNoteText('');
                            setNoteSuccessMsg('');
                          }}
                          className="w-full py-2.5 px-4 rounded-xl bg-pink-700 hover:bg-pink-800 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                        >
                          <span>{t('adminDashboard.sendNoteBtn', '💬 Enviar Comentario a Bitácora')}</span>
                        </button>
                        <button
                          onClick={() => {
                            setTaskModalStudent(student);
                            setTaskTitle('');
                            setTaskSubtitle('');
                            setTaskSuccessMsg('');
                          }}
                          className="w-full py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                        >
                          <span>{t('adminDashboard.assignTaskBtn', '📋 Asignar Actividad o Material')}</span>
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* PESTAÑA 3: PLAN CURRICULAR Y CALENDARIO DE AULAS */}
        {/* ========================================================================= */}
        {activeTab === 'curriculum' && (
          <div className="flex flex-col gap-6 w-full">
            
            {/* CABECERA DE PLAN CURRICULAR */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-[10px] font-black text-pink-700 dark:text-pink-400 uppercase tracking-widest block mb-1">
                  {t('adminDashboard.planningHeader', 'PLANIFICACIÓN EDUCATIVA Y CALENDARIO')}
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white m-0">
                  {t('adminDashboard.curriculumTitle', 'Plan Curricular de')} {selectedClassroom === 'all' ? t('adminDashboard.allClassrooms', 'Todas las Aulas') : selectedClassroom}
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                  {t('adminDashboard.curriculumSubtitle', 'Programa temas y actividades para cada fecha. Se sincronizan automáticamente con el calendario de las familias.')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                    search
                  </span>
                  <input
                    type="text"
                    value={currSearch}
                    onChange={e => setCurrSearch(e.target.value)}
                    placeholder={t('adminDashboard.searchCurriculumPlaceholder', 'Buscar en el plan curricular...')}
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <button
                  onClick={() => {
                    setCurrTitle('');
                    setCurrDate('');
                    setCurrDescription('');
                    setCurrSuccessMsg('');
                    setShowCurrModal(true);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-pink-700 hover:bg-pink-800 text-white font-extrabold text-xs shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">event</span>
                  <span>{t('adminDashboard.addCurriculumBtn', '+ Programar Actividad')}</span>
                </button>
              </div>
            </div>

            {/* LISTA / TARJETAS DE ACTIVIDADES CURRICULARES */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {curriculumEvents.filter(evt => {
                const matchesClassroom = !selectedClassroom || selectedClassroom === 'all' || evt.classroom === selectedClassroom;
                if (!matchesClassroom) return false;
                if (!currSearch.trim()) return true;
                const term = currSearch.toLowerCase();
                return evt.title.toLowerCase().includes(term) || evt.description?.toLowerCase().includes(term);
              }).length === 0 ? (
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 text-center text-slate-500 dark:text-zinc-400 text-sm font-medium col-span-full">
                  {t('adminDashboard.noCurriculumEvents', 'No hay actividades programadas en el plan curricular. Haz clic en "+ Programar Actividad" para añadir una nueva.')}
                </div>
              ) : (
                curriculumEvents
                  .filter(evt => {
                    const matchesClassroom = !selectedClassroom || selectedClassroom === 'all' || evt.classroom === selectedClassroom;
                    if (!matchesClassroom) return false;
                    if (!currSearch.trim()) return true;
                    const term = currSearch.toLowerCase();
                    return evt.title.toLowerCase().includes(term) || evt.description?.toLowerCase().includes(term);
                  })
                  .map(evt => (
                    <div key={evt.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-pink-100 text-pink-800 dark:bg-pink-950/40 dark:text-pink-300">
                            {evt.categoryLabel || 'Actividad'}
                          </span>
                          <span className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">calendar_today</span>
                            {evt.date}
                          </span>
                        </div>

                        <h3 className="font-extrabold text-slate-900 dark:text-white text-base mb-1">
                          {evt.title}
                        </h3>
                        <p className="text-xs text-pink-700 dark:text-pink-400 font-bold mb-2">
                          ⏰ {evt.time}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed mb-4">
                          {evt.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-zinc-400">
                        <span className="font-semibold">{evt.classroom || selectedClassroom}</span>
                        <button
                          onClick={() => handleDeleteCurriculumEvent(evt.id)}
                          className="text-red-500 hover:text-red-700 dark:hover:text-red-400 font-bold flex items-center gap-1 cursor-pointer transition-colors"
                          title={t('adminDashboard.deleteEventTitle', 'Eliminar del plan curricular')}
                        >
                          <span className="material-symbols-outlined text-[14px]">delete</span>
                          <span>{t('adminDashboard.deleteBtn', 'Eliminar')}</span>
                        </button>
                      </div>
                    </div>
                  ))
              )}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* PESTAÑA 4: GESTIÓN DE REPORTES Y MENSAJES DE FAMILIAS */}
        {/* ========================================================================= */}
        {activeTab === 'reportes' && (
          <div className="flex flex-col gap-6 w-full">
            
            {/* CABECERA DE REPORTES */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-[10px] font-black text-pink-700 dark:text-pink-400 uppercase tracking-widest block mb-1">
                  {t('adminDashboard.reportsHeader', 'ATENCIÓN Y MENSAJERÍA A FAMILIAS')}
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white m-0">
                  {t('adminDashboard.reportsTitle', 'Reportes y Comentarios del')} {selectedClassroom === 'all' ? t('adminDashboard.assignedClassroomTitle', 'Aula Asignada') : selectedClassroom}
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                  {t('adminDashboard.reportsSubtitle', 'Revisa los avisos de salud, permisos u observaciones enviadas por los tutores y responde directamente a sus mensajes.')}
                </p>
              </div>

              <div className="flex items-center gap-2 bg-slate-100 dark:bg-zinc-800 px-4 py-2 rounded-full border border-slate-200 dark:border-zinc-700">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-extrabold text-slate-800 dark:text-zinc-200">
                  {classroomReports.length} {t('adminDashboard.totalMessages', 'Mensajes en Total')}
                </span>
              </div>
            </div>

            {/* SELECCIÓN / PESTAÑAS DE TUTORES (DIVIDIDO POR CADA PADRE/TUTOR) */}
            <div className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-500 dark:text-zinc-400">
                {t('adminDashboard.filterByTutor', '👨‍粒‍👦 Filtrar por Tutor de Estudiante:')}
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedTutorId('all')}
                  className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                    selectedTutorId === 'all'
                      ? 'bg-pink-700 text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  {t('adminDashboard.allTutors', '🌐 Todos los Tutores')} ({classroomReports.length})
                </button>

                {classTutors.map(tutor => {
                  const tutorReportCount = classroomReports.filter(r => String(r.userId) === String(tutor.id)).length;
                  const childFirstName = tutor.child?.firstName || 'Estudiante';
                  return (
                    <button
                      key={tutor.id}
                      onClick={() => setSelectedTutorId(tutor.id)}
                      className={`px-4 py-2 rounded-full text-xs font-extrabold transition-all cursor-pointer flex items-center gap-1.5 ${
                        selectedTutorId === tutor.id
                          ? 'bg-pink-700 text-white shadow-xs'
                          : 'bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700'
                      }`}
                    >
                      <span>👨‍👩‍👦 {tutor.name} ({childFirstName})</span>
                      <span className={`px-2 py-0.2 text-[10px] rounded-full font-black ${
                        selectedTutorId === tutor.id ? 'bg-white/20 text-white' : 'bg-slate-200 dark:bg-zinc-700 text-slate-700 dark:text-zinc-300'
                      }`}>
                        {tutorReportCount}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* LISTA DE MENSAJES / REPORTES DE TUTORES */}
            <div className="flex flex-col gap-5">
              {filteredReportsByTutor.length === 0 ? (
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 text-center text-slate-500 dark:text-zinc-400 text-sm font-medium">
                  {t('adminDashboard.noReportsForTutor', 'No hay reportes o mensajes registrados para el tutor seleccionado.')}
                </div>
              ) : (
                filteredReportsByTutor.map(report => {
                  const categoryBadgeColor = report.category === 'salud'
                    ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300'
                    : report.category === 'horario'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-300'
                    : 'bg-purple-100 text-purple-800 dark:bg-purple-950/40 dark:text-purple-300';

                  const senderUser = users.find(u => String(u.id) === String(report.userId) || u.name === report.sender);
                  const senderAvatar = senderUser?.avatar || senderUser?.avatarUrl || report.senderAvatar;

                  const teacherUser = report.reply ? (users.find(u => u.name === report.reply.author) || (activeUser?.role === 'teacher' ? activeUser : null)) : null;
                  const replyAvatar = teacherUser?.avatar || teacherUser?.avatarUrl || report.reply?.avatar;

                  return (
                    <article
                      key={report.id}
                      className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col gap-4 transition-all hover:shadow-md"
                    >
                      {/* ENCABEZADO DEL REPORTE */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-zinc-800 pb-3">
                        <div className="flex items-center gap-3">
                          <UserAvatar
                            avatar={senderAvatar}
                            name={report.sender || 'Tutor'}
                            className="w-10 h-10 rounded-full border-2 border-pink-500/20 shrink-0"
                          />
                          <div>
                            <h3 className="font-extrabold text-slate-900 dark:text-white text-base m-0">
                              {report.title}
                            </h3>
                            <span className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">
                              De: <strong className="text-slate-800 dark:text-zinc-200">{report.sender || 'Tutor'}</strong> • {report.time}
                            </span>
                          </div>
                        </div>

                        <span className={`px-3 py-1 rounded-full text-xs font-extrabold self-start sm:self-center uppercase tracking-wider ${categoryBadgeColor}`}>
                          {report.categoryLabel || report.category || 'Mensaje'}
                        </span>
                      </div>

                      {/* CONTENIDO DEL MENSAJE DEL PADRE */}
                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-100 dark:border-zinc-800 text-xs text-slate-700 dark:text-zinc-200 leading-relaxed font-medium">
                        {report.message}
                      </div>

                      {/* ADJUNTO SI TIENE */}
                      {report.attachment && (
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-zinc-800 text-xs text-slate-700 dark:text-zinc-300 font-bold self-start">
                          <span className="material-symbols-outlined text-[16px]">description</span>
                          <span>{report.attachment}</span>
                          <span className="text-[10px] text-slate-400">({report.attachmentSize || 'PDF'})</span>
                        </div>
                      )}

                      {/* RESPUESTA ACTUAL DE LA DOCENTE (SI EXISTE) */}
                      {report.reply ? (
                        <div className="p-4 rounded-xl bg-pink-50/70 dark:bg-pink-950/30 border border-pink-200/60 dark:border-pink-900/40 flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <UserAvatar
                                avatar={replyAvatar}
                                name={report.reply.author || 'Docente'}
                                className="w-7 h-7 rounded-full shrink-0 border border-pink-300 dark:border-pink-800"
                              />
                              <div>
                                <span className="text-xs font-bold text-pink-900 dark:text-pink-200">
                                  {report.reply.author || 'Docente'} ({report.reply.role || 'Docente'})
                                </span>
                                <span className="text-[10px] text-pink-500 dark:text-pink-400 block">
                                  {report.reply.time}
                                </span>
                              </div>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full bg-pink-200 dark:bg-pink-900/60 text-pink-800 dark:text-pink-200 text-[10px] font-black uppercase">
                              ✓ {report.reply.statusTag || 'Atendido'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-800 dark:text-zinc-200 italic font-medium m-0">
                            "{report.reply.text}"
                          </p>
                        </div>
                      ) : (
                        <div className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px]">schedule</span>
                          <span>{t('adminDashboard.pendingResponse', 'Pendiente de respuesta por la docente')}</span>
                        </div>
                      )}

                      {/* BOTÓN RESPONDER */}
                      <div className="pt-2 border-t border-slate-100 dark:border-zinc-800 flex justify-end">
                        <button
                          onClick={() => {
                            setReplyModalReport(report);
                            setReplyText(report.reply?.text || '');
                            setReplyStatusTag(report.reply?.statusTag || 'Atendido');
                            setReplySuccessMsg('');
                          }}
                          className="px-4 py-2 rounded-xl bg-pink-700 hover:bg-pink-800 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[16px]">reply</span>
                          <span>{report.reply ? t('adminDashboard.modifyReply', 'Modificar Respuesta') : t('adminDashboard.replyToTutor', 'Responder al Tutor')}</span>
                        </button>
                      </div>
                    </article>
                  );
                })
              )}
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* PESTAÑA 5: OBSERVACIONES Y RETROALIMENTACIÓN DE LA DIRECCIÓN / DUEÑO */}
        {/* ========================================================================= */}
        {activeTab === 'direccion' && (() => {
          const myTeacherComments = ownerComments.filter(comment => {
            if (!activeUser) return true;
            if (comment.teacherId && String(comment.teacherId) === String(activeUser.id)) return true;

            const commentIdStr = String(comment.teacherId || '').toLowerCase();
            const activeIdStr = String(activeUser.id || '').toLowerCase();
            const activeEmailStr = String(activeUser.email || '').toLowerCase();
            const activeNameStr = String(activeUser.name || '').toLowerCase();
            const commentNameStr = String(comment.teacherName || '').toLowerCase();

            if (commentIdStr && (commentIdStr === activeIdStr || activeIdStr.includes(commentIdStr))) return true;
            if (commentNameStr && (commentNameStr.includes(activeNameStr) || activeNameStr.includes(commentNameStr))) return true;

            const keywords = ['karina', 'esteban', 'marcela'];
            for (const kw of keywords) {
              const matchesComment = commentNameStr.includes(kw) || commentIdStr.includes(kw);
              const matchesUser = activeNameStr.includes(kw) || activeEmailStr.includes(kw) || activeIdStr.includes(kw);
              if (matchesComment && matchesUser) return true;
            }

            return false;
          });

          return (
            <div className="flex flex-col gap-6 w-full">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-1">
                    COMUNICACIÓN CON LA DIRECCIÓN
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white m-0">
                    Observaciones y Mensajes del Dueño / Dirección
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                    Aquí podrás revisar las notas, retroalimentaciones e indicaciones directas enviadas por la dirección de la guardería.
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-amber-50 dark:bg-amber-950/40 px-4 py-2 rounded-full border border-amber-200 dark:border-amber-800">
                  <span className="text-base">📢</span>
                  <span className="text-xs font-extrabold text-amber-800 dark:text-amber-300">
                    {myTeacherComments.length} Comunicados para tu Aula
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-5">
                {myTeacherComments.length === 0 ? (
                  <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 text-center text-slate-500 dark:text-zinc-400 text-sm font-medium">
                    No tienes comentarios ni observaciones registradas por la dirección por el momento.
                  </div>
                ) : (
                  myTeacherComments.map(comment => (
                    <article
                      key={comment.id}
                      className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-amber-300 dark:border-amber-700/60 bg-gradient-to-r from-amber-50/30 to-white dark:from-amber-950/10 dark:to-zinc-900 shadow-xs flex flex-col gap-4 transition-all hover:shadow-md"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-zinc-800 pb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white font-black flex items-center justify-center text-sm shadow-sm shrink-0">
                            👑
                          </div>
                          <div>
                            <h3 className="font-extrabold text-slate-900 dark:text-white text-base m-0">
                              {comment.title}
                            </h3>
                            <span className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">
                              De: <strong className="text-amber-700 dark:text-amber-400">{comment.ownerName || 'Dirección General'}</strong> • Para: <strong className="text-slate-800 dark:text-zinc-200">{comment.teacherName}</strong> • {comment.time || comment.date}
                            </span>
                          </div>
                        </div>

                        <span className="px-3 py-1 rounded-full text-xs font-extrabold self-start sm:self-center uppercase tracking-wider bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                          ⭐ Para tu Aula
                        </span>
                      </div>

                      <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-100 dark:border-zinc-800 text-xs text-slate-800 dark:text-zinc-200 leading-relaxed font-medium">
                        "{comment.text}"
                      </div>
                    </article>
                  ))
                )}
              </div>
            </div>
          );
        })()}

      </main>

      {/* ========================================================================= */}
      {/* MODAL 1: ENVIAR COMENTARIO / NOTA A LA BITÁCORA DEL PADRE */}
      {/* ========================================================================= */}
      {noteModalStudent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 max-w-md w-full shadow-2xl font-sans animate-in fade-in">
            <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white m-0">
                {t('adminDashboard.noteModalTitle', '💬 Enviar Comentario a Bitácora')}
              </h3>
              <button 
                onClick={() => setNoteModalStudent(null)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendNote} className="flex flex-col gap-4">
              <div>
                <span className="text-xs text-slate-500 dark:text-zinc-400 block mb-1">{t('adminDashboard.targetStudentLabel', 'Estudiante destinatario:')}</span>
                <div className="p-3 rounded-xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-800/50 font-extrabold text-xs text-pink-700 dark:text-pink-300">
                  👶 {noteModalStudent.child?.firstName} {noteModalStudent.child?.lastName} ({t('adminDashboard.tutorLabel', 'Tutor:')} {noteModalStudent.name})
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">
                  {t('adminDashboard.writeNoteLabel', 'Escribe tu observación o comentario pedagógico:')}
                </label>
                <textarea
                  rows={4}
                  required
                  value={noteText}
                  onChange={e => setNoteText(e.target.value)}
                  placeholder={t('adminDashboard.notePlaceholder', 'Ej: Exploró con entusiasmo el material sensorial y participó activamente en la rutina...')}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500 font-medium"
                />
              </div>

              {noteSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <span>✓</span>
                  <span>{noteSuccessMsg}</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setNoteModalStudent(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  {t('adminDashboard.cancelBtn', 'Cancelar')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pink-700 hover:bg-pink-800 text-white font-extrabold text-xs shadow-sm cursor-pointer"
                >
                  {t('adminDashboard.sendToLogBtn', 'Enviar a Bitácora')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: ASIGNAR ACTIVIDAD O MATERIAL AL ESTUDIANTE */}
      {/* ========================================================================= */}
      {taskModalStudent && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 max-w-md w-full shadow-2xl font-sans animate-in fade-in">
            <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white m-0">
                {t('adminDashboard.taskModalTitle', '📋 Asignar Actividad o Material')}
              </h3>
              <button 
                onClick={() => setTaskModalStudent(null)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAssignTask} className="flex flex-col gap-4">
              <div>
                <span className="text-xs text-slate-500 dark:text-zinc-400 block mb-1">{t('adminDashboard.assignToLabel', 'Asignar a:')}</span>
                <div className="p-3 rounded-xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800/50 font-extrabold text-xs text-cyan-800 dark:text-cyan-300">
                  👶 {taskModalStudent.child?.firstName} {taskModalStudent.child?.lastName}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">
                  {t('adminDashboard.taskTitleLabel', 'Título del Material o Tarea:')}
                </label>
                <input
                  type="text"
                  required
                  value={taskTitle}
                  onChange={e => setTaskTitle(e.target.value)}
                  placeholder={t('adminDashboard.taskTitlePlaceholder', 'Ej: Materiales reciclados para el Sombrero Loco...')}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">
                  {t('adminDashboard.taskSubtitleLabel', 'Nota / Indicación adicional:')}
                </label>
                <input
                  type="text"
                  value={taskSubtitle}
                  onChange={e => setTaskSubtitle(e.target.value)}
                  placeholder={t('adminDashboard.taskSubtitlePlaceholder', 'Ej: Pendiente para el Mar 31 Oct')}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-cyan-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">
                  {t('adminDashboard.taskIconLabel', 'Icono representativo:')}
                </label>
                <div className="flex gap-2">
                  {[
                    { id: 'alarm', icon: '⏰' },
                    { id: 'eco', icon: '🍏' },
                    { id: 'done_all', icon: '👕' },
                    { id: 'checklist', icon: '📋' }
                  ].map(item => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setTaskIcon(item.id)}
                      className={`flex-1 p-2 rounded-xl border text-sm font-bold transition-all cursor-pointer ${
                        taskIcon === item.id 
                          ? 'bg-cyan-600 text-white border-cyan-600' 
                          : 'bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-zinc-700 text-slate-700 dark:text-zinc-300'
                      }`}
                    >
                      {item.icon}
                    </button>
                  ))}
                </div>
              </div>

              {taskSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <span>✓</span>
                  <span>{taskSuccessMsg}</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setTaskModalStudent(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  {t('adminDashboard.cancelBtn', 'Cancelar')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-xs shadow-sm cursor-pointer"
                >
                  {t('adminDashboard.assignToCalendarBtn', 'Asignar a Calendario')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 3: PROGRAMAR NUEVA ACTIVIDAD EN EL PLAN CURRICULAR */}
      {/* ========================================================================= */}
      {showCurrModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 max-w-md w-full shadow-2xl font-sans animate-in fade-in">
            <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white m-0">
                {t('adminDashboard.currModalTitle', '📅 Programar Actividad Curricular')}
              </h3>
              <button 
                onClick={() => setShowCurrModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCurriculumEvent} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">
                  {t('adminDashboard.currTitleLabel', 'Título de la Actividad o Tema:')}
                </label>
                <input
                  type="text"
                  required
                  value={currTitle}
                  onChange={e => setCurrTitle(e.target.value)}
                  placeholder={t('adminDashboard.currTitlePlaceholder', 'Ej: Taller de Expresión Plástica y Texturas...')}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">
                    {t('adminDashboard.currDateLabel', 'Fecha:')}
                  </label>
                  <input
                    type="date"
                    required
                    value={currDate}
                    onChange={e => setCurrDate(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">
                    {t('adminDashboard.currTimeLabel', 'Horario:')}
                  </label>
                  <input
                    type="text"
                    value={currTime}
                    onChange={e => setCurrTime(e.target.value)}
                    placeholder={t('adminDashboard.currTimePlaceholder', 'Ej: 09:00 AM - 10:30 AM')}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">
                  {t('adminDashboard.currCategoryLabel', 'Área / Categoría:')}
                </label>
                <select
                  value={currCategory}
                  onChange={e => setCurrCategory(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-bold text-slate-800 dark:text-zinc-200 outline-none cursor-pointer"
                >
                  <option value="workshops">{t('adminDashboard.catWorkshops', 'Estimulación AMI (Talleres)')}</option>
                  <option value="special">{t('adminDashboard.catSpecial', 'Lúdico / Huerta / Actividades Especiales')}</option>
                  <option value="meetings">{t('adminDashboard.catMeetings', 'Reunión Familias / Institucional')}</option>
                  <option value="academic">{t('adminDashboard.catAcademic', 'Área Académica / Expresión')}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">
                  {t('adminDashboard.currDescLabel', 'Descripción Pedagógica u Observaciones:')}
                </label>
                <textarea
                  rows={3}
                  value={currDescription}
                  onChange={e => setCurrDescription(e.target.value)}
                  placeholder={t('adminDashboard.currDescPlaceholder', 'Detalla los objetivos pedagógicos o lo que los estudiantes realizarán ese día...')}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500 font-medium"
                ></textarea>
              </div>

              {currSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <span>✓</span>
                  <span>{currSuccessMsg}</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowCurrModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  {t('adminDashboard.cancelBtn', 'Cancelar')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pink-700 hover:bg-pink-800 text-white font-extrabold text-xs shadow-sm cursor-pointer"
                >
                  {t('adminDashboard.saveToCalendarBtn', 'Guardar en Calendario')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 4: RESPONDER A UN REPORTE DE TUTOR */}
      {/* ========================================================================= */}
      {replyModalReport && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 max-w-md w-full shadow-2xl font-sans animate-in fade-in">
            <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white m-0">
                {t('adminDashboard.replyModalTitle', '💬 Responder a')} {replyModalReport.sender || 'Tutor'}
              </h3>
              <button 
                onClick={() => setReplyModalReport(null)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSendReply} className="flex flex-col gap-4">
              <div>
                <span className="text-xs text-slate-500 dark:text-zinc-400 block mb-1">{t('adminDashboard.tutorInquiryLabel', 'Consulta del Familiar:')}</span>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-800 dark:text-zinc-200">
                  <strong className="text-pink-700 dark:text-pink-400 block mb-0.5">{replyModalReport.title}</strong>
                  <p className="m-0 text-[11px] text-slate-600 dark:text-zinc-300 font-medium">{replyModalReport.message}</p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">
                  {t('adminDashboard.replyStatusLabel', 'Etiqueta de Estado de Respuesta:')}
                </label>
                <select
                  value={replyStatusTag}
                  onChange={e => setReplyStatusTag(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-bold text-slate-800 dark:text-zinc-200 outline-none cursor-pointer"
                >
                  <option value="Atendido">{t('adminDashboard.optAttended', '✓ Atendido / Enterado')}</option>
                  <option value="Dosis completada">{t('adminDashboard.optDose', '💊 Dosis o Medicamento Administrado')}</option>
                  <option value="Permiso Registrado">{t('adminDashboard.optPermission', '⏰ Horario / Permiso Autorizado')}</option>
                  <option value="Observación Registrada">{t('adminDashboard.optObs', '📝 Registrado en Ficha')}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">
                  {t('adminDashboard.replyMessageLabel', 'Respuesta o Mensaje para el Tutor:')}
                </label>
                <textarea
                  rows={4}
                  required
                  value={replyText}
                  onChange={e => setReplyText(e.target.value)}
                  placeholder={t('adminDashboard.replyPlaceholder', 'Escribe la respuesta que se mostrará en el panel del familiar...')}
                  className="w-full p-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500 font-medium"
                ></textarea>
              </div>

              {replySuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <span>✓</span>
                  <span>{replySuccessMsg}</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setReplyModalReport(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  {t('adminDashboard.cancelBtn', 'Cancelar')}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pink-700 hover:bg-pink-800 text-white font-extrabold text-xs shadow-sm cursor-pointer"
                >
                  {t('adminDashboard.sendReplyBtn', 'Enviar Respuesta')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
