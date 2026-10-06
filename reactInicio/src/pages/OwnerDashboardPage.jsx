import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { ParentHeader } from '../components/ParentHeader';
import { UserAvatar } from '../components/UserAvatar';

const API = 'http://localhost:3000';

const formatDateKey = (d) => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function OwnerDashboardPage() {
  const { activeUser } = useAuth();
  const location = useLocation();

  // Active tab derived from hash ('dashboard' | 'familias' | 'docentes' | 'observaciones')
  const activeTab = location.hash === '#familias'
    ? 'familias'
    : location.hash === '#docentes'
      ? 'docentes'
      : location.hash === '#observaciones'
        ? 'observaciones'
        : 'dashboard';

  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [curriculumEvents, setCurriculumEvents] = useState([]);
  const [reports, setReports] = useState([]);
  const [ownerComments, setOwnerComments] = useState([]);

  // Search & Filter States
  const [tutorSearch, setTutorSearch] = useState('');
  const [teacherSearch, setTeacherSearch] = useState('');
  const [selectedClassroomFilter, setSelectedClassroomFilter] = useState('all');

  // Modal States for Managing Parent/Child Users
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null); // null = creating
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [childFirstName, setChildFirstName] = useState('');
  const [childLastName, setChildLastName] = useState('');
  const [childAge, setChildAge] = useState('3');
  const [childGender, setChildGender] = useState('Niña');
  const [childClassroom, setChildClassroom] = useState('Aula Semillitas (2 a 4 años)');
  const [userSuccessMsg, setUserSuccessMsg] = useState('');

  // Modal States for Managing Teacher Users
  const [teacherModalOpen, setTeacherModalOpen] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null); // null = creating
  const [tName, setTName] = useState('');
  const [tEmail, setTEmail] = useState('');
  const [tPassword, setTPassword] = useState('');
  const [tClassroom, setTClassroom] = useState('Aula Semillitas (2 a 4 años)');
  const [teacherSuccessMsg, setTeacherSuccessMsg] = useState('');

  // States for Owner Comments to Teachers
  const [targetTeacherId, setTargetTeacherId] = useState('');
  const [commentTitle, setCommentTitle] = useState('');
  const [commentText, setCommentText] = useState('');
  const [commentSuccessMsg, setCommentSuccessMsg] = useState('');

  // Fetch all initial data
  const loadData = () => {
    Promise.all([
      fetch(`${API}/users`).then(r => r.json()),
      fetch(`${API}/gameHistory`).then(r => r.json()).catch(() => []),
      fetch(`${API}/attendance`).then(r => r.json()).catch(() => []),
      fetch(`${API}/curriculumEvents`).then(r => r.json()).catch(() => []),
      fetch(`${API}/reports`).then(r => r.json()).catch(() => []),
      fetch(`${API}/ownerComments`).then(r => r.json()).catch(() => [])
    ]).then(([u, g, a, cEvents, repData, oComments]) => {
      setUsers(u);
      setGames(Array.isArray(g) ? g : []);
      setAttendance(Array.isArray(a) ? a : []);
      setCurriculumEvents(Array.isArray(cEvents) ? cEvents : []);
      setReports(Array.isArray(repData) ? repData : []);
      setOwnerComments(Array.isArray(oComments) ? oComments : []);
      setLoading(false);
    }).catch(e => {
      console.error('Error cargando datos:', e);
      setLoading(false);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  // --------------------------------------------------------------------------
  // USER (PARENT/CHILD) MANAGEMENT ACTIONS
  // --------------------------------------------------------------------------
  const handleOpenUserModal = (u = null) => {
    if (u) {
      setEditingUser(u);
      setUserName(u.name || '');
      setUserEmail(u.email || '');
      setUserPassword(u.password || '');
      setChildFirstName(u.child?.firstName || '');
      setChildLastName(u.child?.lastName || '');
      setChildAge(u.child?.age || '3');
      setChildGender(u.child?.gender || 'Niña');
      setChildClassroom(u.child?.classroom || 'Aula Semillitas (2 a 4 años)');
    } else {
      setEditingUser(null);
      setUserName('');
      setUserEmail('');
      setUserPassword('');
      setChildFirstName('');
      setChildLastName('');
      setChildAge('3');
      setChildGender('Niña');
      setChildClassroom('Aula Semillitas (2 a 4 años)');
    }
    setUserSuccessMsg('');
    setUserModalOpen(true);
  };

  const handleSaveUser = async (e) => {
    e.preventDefault();
    if (!userName.trim() || !userEmail.trim()) return;

    const userData = {
      name: userName.trim(),
      email: userEmail.trim(),
      role: 'tutor',
      password: userPassword.trim() || 'montekids123',
      child: {
        firstName: childFirstName.trim(),
        lastName: childLastName.trim(),
        age: String(childAge),
        gender: childGender,
        classroom: childClassroom
      }
    };

    try {
      if (editingUser) {
        await fetch(`${API}/users/${editingUser.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });
        setUsers(prev => prev.map(u => u.id === editingUser.id ? { ...u, ...userData } : u));
        setUserSuccessMsg('¡Perfil de tutor/estudiante actualizado con éxito!');
      } else {
        const newObj = {
          ...userData,
          id: Math.random().toString(36).substring(2, 9),
          createdAt: new Date().toISOString(),
          estrellas: 10
        };
        const res = await fetch(`${API}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newObj)
        });
        const saved = await res.json();
        setUsers(prev => [...prev, saved]);
        setUserSuccessMsg('¡Nuevo perfil de tutor/estudiante creado con éxito!');
      }

      setTimeout(() => {
        setUserModalOpen(false);
        setUserSuccessMsg('');
      }, 1200);
    } catch (err) {
      console.error('Error al guardar tutor:', err);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este perfil de tutor/estudiante?')) return;
    try {
      await fetch(`${API}/users/${userId}`, { method: 'DELETE' });
      setUsers(prev => prev.filter(u => u.id !== userId));
    } catch (err) {
      console.error('Error al eliminar tutor:', err);
    }
  };

  // --------------------------------------------------------------------------
  // TEACHER MANAGEMENT ACTIONS
  // --------------------------------------------------------------------------
  const handleOpenTeacherModal = (t = null) => {
    if (t) {
      setEditingTeacher(t);
      setTName(t.name || '');
      setTEmail(t.email || '');
      setTPassword(t.password || '');
      setTClassroom(t.classroom || 'Aula Semillitas (2 a 4 años)');
    } else {
      setEditingTeacher(null);
      setTName('');
      setTEmail('');
      setTPassword('');
      setTClassroom('Aula Semillitas (2 a 4 años)');
    }
    setTeacherSuccessMsg('');
    setTeacherModalOpen(true);
  };

  const handleSaveTeacher = async (e) => {
    e.preventDefault();
    if (!tName.trim() || !tEmail.trim()) return;

    const teacherData = {
      name: tName.trim(),
      email: tEmail.trim(),
      role: 'teacher',
      classroom: tClassroom,
      password: tPassword.trim() || 'teacher123'
    };

    try {
      if (editingTeacher) {
        await fetch(`${API}/users/${editingTeacher.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(teacherData)
        });
        setUsers(prev => prev.map(u => u.id === editingTeacher.id ? { ...u, ...teacherData } : u));
        setTeacherSuccessMsg('¡Perfil de docente actualizado con éxito!');
      } else {
        const newTeacher = {
          ...teacherData,
          id: `t-${Date.now()}`,
          createdAt: new Date().toISOString()
        };
        const res = await fetch(`${API}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTeacher)
        });
        const saved = await res.json();
        setUsers(prev => [...prev, saved]);
        setTeacherSuccessMsg('¡Nuevo perfil de docente creado con éxito!');
      }

      setTimeout(() => {
        setTeacherModalOpen(false);
        setTeacherSuccessMsg('');
      }, 1200);
    } catch (err) {
      console.error('Error al guardar docente:', err);
    }
  };

  const handleDeleteTeacher = async (teacherId) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este perfil de docente?')) return;
    try {
      await fetch(`${API}/users/${teacherId}`, { method: 'DELETE' });
      setUsers(prev => prev.filter(u => u.id !== teacherId));
    } catch (err) {
      console.error('Error al eliminar docente:', err);
    }
  };

  // --------------------------------------------------------------------------
  // OWNER COMMENT TO TEACHER ACTIONS
  // --------------------------------------------------------------------------
  const handleSendOwnerComment = async (e) => {
    e.preventDefault();
    if (!targetTeacherId || !commentTitle.trim() || !commentText.trim()) return;

    const targetTeacher = teachersList.find(t => String(t.id) === String(targetTeacherId));
    const teacherNameStr = targetTeacher ? targetTeacher.name : 'Docente Asignado';

    const newComment = {
      id: `oc-${Date.now()}`,
      teacherId: targetTeacherId,
      teacherName: teacherNameStr,
      ownerName: activeUser?.name || 'Dirección General / Dueño',
      time: 'hace unos momentos',
      date: formatDateKey(new Date()),
      createdAt: new Date().toISOString(),
      title: commentTitle.trim(),
      text: commentText.trim()
    };

    try {
      const res = await fetch(`${API}/ownerComments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newComment)
      });
      const saved = await res.json();
      setOwnerComments(prev => [saved, ...prev]);
      setCommentSuccessMsg('¡Observación enviada al docente con éxito!');

      setTimeout(() => {
        setTargetTeacherId('');
        setCommentTitle('');
        setCommentText('');
        setCommentSuccessMsg('');
      }, 1500);
    } catch (err) {
      console.error('Error al enviar comentario de dueño:', err);
    }
  };

  const handleDeleteOwnerComment = async (commentId) => {
    try {
      await fetch(`${API}/ownerComments/${commentId}`, { method: 'DELETE' });
      setOwnerComments(prev => prev.filter(c => c.id !== commentId));
    } catch (err) {
      console.error('Error al eliminar comentario:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f9f9fc] dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 flex justify-center items-center font-bold">
        Cargando Panel de Dirección Montekids...
      </div>
    );
  }

  // User Categories
  const tutorsList = users.filter(u => u.role === 'tutor');
  const teachersList = users.filter(u => u.role === 'teacher');

  // Classrooms List
  const classrooms = [
    "Aula Semillitas (2 a 4 años)",
    "Aula Exploradores (4 a 6 años)",
    "Aula Creadores (6 a 8 años)"
  ];

  // Aggregated Stats
  const totalStudents = tutorsList.length;
  const totalTeachers = teachersList.length;
  const totalGlobalStars = tutorsList.reduce((acc, u) => acc + (u.estrellas || 0), 0);
  const totalGlobalGames = games.length;

  const todayStr = formatDateKey(new Date());
  const todayAttendance = attendance.filter(a => a.date === todayStr);
  const presentToday = todayAttendance.filter(a => a.status === 'present').length;
  const absentToday = todayAttendance.filter(a => a.status === 'absent').length;

  // Filtered tutors for manage tab
  const filteredTutors = tutorsList.filter(u => {
    const matchesClass = selectedClassroomFilter === 'all' || u.child?.classroom === selectedClassroomFilter;
    if (!matchesClass) return false;
    if (!tutorSearch.trim()) return true;
    const term = tutorSearch.toLowerCase();
    const childName = `${u.child?.firstName || ''} ${u.child?.lastName || ''}`.toLowerCase();
    const parentName = (u.name || '').toLowerCase();
    const email = (u.email || '').toLowerCase();
    return childName.includes(term) || parentName.includes(term) || email.includes(term);
  });

  // Filtered teachers for manage tab
  const filteredTeachers = teachersList.filter(t => {
    if (!teacherSearch.trim()) return true;
    const term = teacherSearch.toLowerCase();
    return t.name?.toLowerCase().includes(term) || t.email?.toLowerCase().includes(term) || t.classroom?.toLowerCase().includes(term);
  });

  const ownerNavItems = [
    { path: '/owner-dashboard#dashboard', label: '👑 Vista General Guardería' },
    { path: '/owner-dashboard#familias', label: '👨‍👩‍👦 Gestión Padres e Hijos' },
    { path: '/owner-dashboard#docentes', label: '👩‍🏫 Gestión de Docentes' },
    { path: '/owner-dashboard#observaciones', label: '💬 Enviar Comentarios a Profesores' }
  ];

  return (
    <div className="min-h-screen bg-[#f9f9fc] dark:bg-zinc-950 font-sans text-slate-900 dark:text-zinc-100 transition-colors duration-300">
      {/* HEADER EXCLUSIVO PARA EL DUEÑO CON hideLanguage={true} */}
      <ParentHeader customNavItems={ownerNavItems} hideLanguage={true} />

      <main className="pt-28 sm:pt-32 pb-16 px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto w-full transition-colors duration-300 animate-page-bounce">
        
        {/* BANNER BIENVENIDA DIRECCIÓN */}
        <div className="bg-gradient-to-r from-purple-700 via-pink-700 to-amber-600 rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 opacity-15 text-9xl pointer-events-none select-none">
            🏫
          </div>
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase mb-2">
                <span>👑</span> PANEL EXCLUSIVO DE DIRECCIÓN
              </div>
              <h1 className="text-2xl sm:text-3xl font-black m-0 tracking-tight">
                Guardería Infantil Montekids
              </h1>
              <p className="text-sm font-medium text-white/90 mt-1 max-w-2xl">
                Supervisión general de todas las aulas, administración de perfiles de familias y docentes, y comunicación directa con el equipo pedagógico.
              </p>
            </div>

            <div className="flex items-center gap-3 bg-black/20 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20">
              <div className="text-right">
                <span className="text-[10px] font-extrabold text-white/80 uppercase block">Director/a Activo:</span>
                <span className="text-sm font-black text-white">{activeUser?.name || 'Directora María'}</span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 font-black flex items-center justify-center text-lg">
                👑
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* PESTAÑA 1: VISTA GENERAL (CONSOLIDADO DE TODAS LAS AULAS) */}
        {/* ========================================================================= */}
        {activeTab === 'dashboard' && (
          <div className="flex flex-col gap-8 w-full">
            
            {/* 4 CARDS RESUMEN GENERAL DE TODAS LAS AULAS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* Card 1: Censo Total Alumnos */}
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[10px] font-black text-pink-600 dark:text-pink-400 tracking-wider uppercase block mb-1">
                      TODAS LAS AULAS
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white m-0">
                      Total de Estudiantes
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-pink-100 dark:bg-pink-950/60 flex justify-center items-center text-xl">👶</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">{totalStudents}</span>
                  <span className="text-xs font-bold text-slate-500 dark:text-zinc-400">alumnos inscritos</span>
                </div>
              </div>

              {/* Card 2: Plantilla Docente */}
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[10px] font-black text-purple-600 dark:text-purple-400 tracking-wider uppercase block mb-1">
                      EQUIPO PEDAGÓGICO
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white m-0">
                      Docentes Activos
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/60 flex justify-center items-center text-xl">👩‍🏫</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">{totalTeachers}</span>
                  <span className="text-xs font-bold text-slate-500 dark:text-zinc-400">profesores en 3 aulas</span>
                </div>
              </div>

              {/* Card 3: Estrellas Globales */}
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 dark:from-amber-600 dark:to-amber-700 p-6 rounded-2xl text-white shadow-md flex flex-col justify-between">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[10px] font-black text-white/80 tracking-wider uppercase block mb-1">
                      INCENTIVOS MONTEKIDS
                    </span>
                    <h3 className="text-base font-bold text-white m-0">
                      Estrellas Totales
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex justify-center items-center text-xl">⭐</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black">{totalGlobalStars}</span>
                  <span className="text-xs font-extrabold text-white/90">acumuladas en total</span>
                </div>
              </div>

              {/* Card 4: Juegos Jugados */}
              <div className="bg-gradient-to-br from-cyan-600 to-cyan-700 dark:from-cyan-700 dark:to-cyan-800 p-6 rounded-2xl text-white shadow-md flex flex-col justify-between">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <span className="text-[10px] font-black text-white/80 tracking-wider uppercase block mb-1">
                      MUNDO JUEGOS
                    </span>
                    <h3 className="text-base font-bold text-white m-0">
                      Sesiones de Juego
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex justify-center items-center text-xl">🎮</div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black">{totalGlobalGames}</span>
                  <span className="text-xs font-extrabold text-white/90">partidas completadas</span>
                </div>
              </div>

            </div>

            {/* SECCIÓN ASISTENCIA Y DISTRIBUCIÓN POR AULA */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Desglose de Aulas */}
              <div className="lg:col-span-2 bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col gap-5">
                <div>
                  <span className="text-[10px] font-black text-pink-600 dark:text-pink-400 tracking-wider uppercase block mb-1">
                    DISTRIBUCIÓN INSTITUCIONAL
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white m-0">
                    Estado de Aulas y Docentes Asignados
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {classrooms.map((roomName, idx) => {
                    const roomStudents = tutorsList.filter(u => u.child?.classroom === roomName);
                    const roomTeacher = teachersList.find(t => t.classroom === roomName);
                    const roomStars = roomStudents.reduce((acc, u) => acc + (u.estrellas || 0), 0);

                    const colors = [
                      'from-pink-500 to-rose-600',
                      'from-purple-500 to-indigo-600',
                      'from-amber-500 to-orange-600'
                    ];

                    return (
                      <div key={roomName} className="bg-slate-50 dark:bg-zinc-800/70 p-5 rounded-2xl border border-slate-200 dark:border-zinc-700/80 flex flex-col justify-between gap-4">
                        <div>
                          <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${colors[idx % 3]} text-white font-black flex items-center justify-center text-xs mb-3 shadow-xs`}>
                            0{idx + 1}
                          </div>
                          <h4 className="font-extrabold text-slate-900 dark:text-white text-sm m-0 leading-snug">
                            {roomName}
                          </h4>
                          <span className="text-xs text-slate-500 dark:text-zinc-400 font-semibold block mt-1">
                            👩‍🏫 {roomTeacher ? roomTeacher.name : 'Sin docente asignado'}
                          </span>
                        </div>

                        <div className="pt-3 border-t border-slate-200 dark:border-zinc-700 flex justify-between items-center text-xs font-bold">
                          <span className="text-slate-700 dark:text-zinc-300">👶 {roomStudents.length} Niños</span>
                          <span className="text-amber-600 dark:text-amber-400">⭐ {roomStars}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Asistencia Hoy Global */}
              <div className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between gap-4">
                <div>
                  <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 tracking-wider uppercase block mb-1">
                    CONTROL GENERAL HOY
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white m-0">
                    Asistencia Global
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-zinc-400 font-semibold block mt-1">
                    📅 {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </span>
                </div>

                <div className="bg-emerald-50 dark:bg-emerald-950/40 p-5 rounded-2xl border border-emerald-200 dark:border-emerald-800/60 text-center">
                  <span className="text-5xl font-black text-emerald-700 dark:text-emerald-400 leading-none block mb-1">
                    {presentToday}
                  </span>
                  <span className="text-xs font-extrabold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider">
                    Presentes de {totalStudents} alumnos totales
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs font-bold bg-slate-50 dark:bg-zinc-800/60 p-3 rounded-xl">
                  <span className="text-emerald-600 dark:text-emerald-400">✓ {presentToday} Presentes</span>
                  <span className="text-red-600 dark:text-red-400">✗ {absentToday} Ausentes</span>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* PESTAÑA 2: GESTIÓN DE PADRES E HIJOS */}
        {/* ========================================================================= */}
        {activeTab === 'familias' && (
          <div className="flex flex-col gap-6 w-full">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-[10px] font-black text-pink-700 dark:text-pink-400 uppercase tracking-widest block mb-1">
                  ADMINISTRACIÓN DE USUARIOS TUTORES
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white m-0">
                  Perfiles de Padres y Estudiantes
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                  Crea, edita o elimina cuentas de tutores y asigna sus datos de estudiante y aula correspondiente.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <select
                  value={selectedClassroomFilter}
                  onChange={e => setSelectedClassroomFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-bold text-slate-800 dark:text-zinc-200 outline-none"
                >
                  <option value="all">🌐 Todas las Aulas</option>
                  {classrooms.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>

                <div className="relative flex-1 sm:w-60">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                    search
                  </span>
                  <input
                    type="text"
                    value={tutorSearch}
                    onChange={e => setTutorSearch(e.target.value)}
                    placeholder="Buscar tutor, hijo o correo..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>

                <button
                  onClick={() => handleOpenUserModal(null)}
                  className="px-5 py-2 rounded-xl bg-pink-700 hover:bg-pink-800 text-white font-extrabold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">person_add</span>
                  <span>+ Crear Tutor</span>
                </button>
              </div>
            </div>

            {/* TABLA / TARJETAS DE TUTORES */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTutors.length === 0 ? (
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 text-center text-slate-500 dark:text-zinc-400 text-sm font-medium col-span-full">
                  No se encontraron perfiles de tutores/estudiantes para la búsqueda actual.
                </div>
              ) : (
                filteredTutors.map(tutor => {
                  const childName = `${tutor.child?.firstName || ''} ${tutor.child?.lastName || ''}`.trim() || 'Sin hijo/a registrado';
                  const room = tutor.child?.classroom || 'Sin aula';

                  return (
                    <div key={tutor.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <UserAvatar
                              avatar={tutor.avatar || tutor.avatarUrl}
                              name={tutor.name}
                              className="w-12 h-12 rounded-2xl border-2 border-pink-500/20 shrink-0"
                            />
                            <div>
                              <h3 className="font-extrabold text-slate-900 dark:text-white text-base m-0">
                                {tutor.name}
                              </h3>
                              <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium block">
                                ✉️ {tutor.email}
                              </span>
                            </div>
                          </div>
                          <span className="px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-black">
                            ⭐ {tutor.estrellas || 0}
                          </span>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-100 dark:border-zinc-700/60 mb-4 flex flex-col gap-1 text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-400 dark:text-zinc-500 font-bold uppercase text-[10px]">HIJO/A:</span>
                            <span className="font-extrabold text-slate-900 dark:text-white">{childName} ({tutor.child?.age || '3'} yrs)</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400 dark:text-zinc-500 font-bold uppercase text-[10px]">AULA:</span>
                            <span className="font-extrabold text-pink-700 dark:text-pink-400">{room}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400 dark:text-zinc-500 font-bold uppercase text-[10px]">CLAVE:</span>
                            <span className="font-mono text-slate-600 dark:text-zinc-400">{tutor.password || 'montekids123'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-slate-100 dark:border-zinc-800">
                        <button
                          onClick={() => handleOpenUserModal(tutor)}
                          className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                          <span>Editar</span>
                        </button>
                        <button
                          onClick={() => handleDeleteUser(tutor.id)}
                          className="py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                          title="Eliminar perfil"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
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
        {/* PESTAÑA 3: GESTIÓN DE DOCENTES */}
        {/* ========================================================================= */}
        {activeTab === 'docentes' && (
          <div className="flex flex-col gap-6 w-full">
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <span className="text-[10px] font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest block mb-1">
                  ADMINISTRACIÓN DE PERSONAL DOCENTE
                </span>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white m-0">
                  Profesores y Guías AMI
                </h2>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                  Administra las cuentas de los profesores, sus credenciales y asigna el aula pedagógica que tienen a su cargo.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]">
                    search
                  </span>
                  <input
                    type="text"
                    value={teacherSearch}
                    onChange={e => setTeacherSearch(e.target.value)}
                    placeholder="Buscar docente o correo..."
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                <button
                  onClick={() => handleOpenTeacherModal(null)}
                  className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">person_add</span>
                  <span>+ Crear Docente</span>
                </button>
              </div>
            </div>

            {/* TARJETAS DE DOCENTES */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTeachers.length === 0 ? (
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 text-center text-slate-500 dark:text-zinc-400 text-sm font-medium col-span-full">
                  No se encontraron docentes registrados.
                </div>
              ) : (
                filteredTeachers.map(teacher => {
                  const roomStudentsCount = tutorsList.filter(u => u.child?.classroom === teacher.classroom).length;

                  return (
                    <div key={teacher.id} className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col justify-between hover:shadow-md transition-all">
                      <div>
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-700 text-white font-black text-lg flex justify-center items-center shadow-xs">
                              👩‍🏫
                            </div>
                            <div>
                              <h3 className="font-extrabold text-slate-900 dark:text-white text-base m-0">
                                {teacher.name}
                              </h3>
                              <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium block">
                                ✉️ {teacher.email}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-100 dark:border-zinc-700/60 mb-4 flex flex-col gap-1.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-400 dark:text-zinc-500 font-bold uppercase text-[10px]">AULA CARGO:</span>
                            <span className="font-extrabold text-purple-700 dark:text-purple-400">{teacher.classroom}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400 dark:text-zinc-500 font-bold uppercase text-[10px]">ALUMNOS EN AULA:</span>
                            <span className="font-extrabold text-slate-800 dark:text-zinc-200">{roomStudentsCount} niños</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-400 dark:text-zinc-500 font-bold uppercase text-[10px]">CONTRASEÑA:</span>
                            <span className="font-mono text-slate-600 dark:text-zinc-400">{teacher.password || 'teacher123'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-3 border-t border-slate-100 dark:border-zinc-800">
                        <button
                          onClick={() => handleOpenTeacherModal(teacher)}
                          className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">edit</span>
                          <span>Editar</span>
                        </button>
                        <button
                          onClick={() => handleDeleteTeacher(teacher.id)}
                          className="py-2 px-3 rounded-xl bg-red-50 hover:bg-red-100 dark:bg-red-950/40 dark:hover:bg-red-900/60 text-red-600 dark:text-red-400 font-bold text-xs flex items-center justify-center gap-1 cursor-pointer transition-colors"
                          title="Eliminar docente"
                        >
                          <span className="material-symbols-outlined text-[16px]">delete</span>
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
        {/* PESTAÑA 4: ENVIAR COMENTARIOS Y OBSERVACIONES A DOCENTES */}
        {/* ========================================================================= */}
        {activeTab === 'observaciones' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full items-start">
            
            {/* FORMULARIO DE ENVÍO (COLUMNA IZQUIERDA) */}
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col gap-5">
              <div>
                <span className="text-[10px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest block mb-1">
                  NUEVO COMUNICADO DE DIRECCIÓN
                </span>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white m-0">
                  Enviar Retroalimentación a Docente
                </h3>
                <p className="text-xs text-slate-500 dark:text-zinc-400 mt-1">
                  Escribe una observación o nota pedagógica. El docente la verá reflejada en su Dashboard (`/admin#direccion`).
                </p>
              </div>

              <form onSubmit={handleSendOwnerComment} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">
                    Selecciona el Docente Destinatario:
                  </label>
                  <select
                    required
                    value={targetTeacherId}
                    onChange={e => setTargetTeacherId(e.target.value)}
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-bold text-slate-800 dark:text-zinc-200 outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="">-- Selecciona un profesor --</option>
                    {teachersList.map(t => (
                      <option key={t.id} value={t.id}>
                        👩‍🏫 {t.name} ({t.classroom})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">
                    Título o Asunto del Comunicado:
                  </label>
                  <input
                    type="text"
                    required
                    value={commentTitle}
                    onChange={e => setCommentTitle(e.target.value)}
                    placeholder="Ej: Felicitaciones por la feria de lectoescritura..."
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">
                    Mensaje / Observación Detallada:
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={commentText}
                    onChange={e => setCommentText(e.target.value)}
                    placeholder="Escribe aquí las observaciones, felicitaciones o recomendaciones para la rutina del aula..."
                    className="w-full p-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-amber-500 font-medium"
                  />
                </div>

                {commentSuccessMsg && (
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                    <span>✓</span>
                    <span>{commentSuccessMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Enviar Observación Guardada</span>
                </button>
              </form>
            </div>

            {/* HISTORIAL DE COMUNICADOS ENVIADOS (COLUMNA DERECHA) */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-xs flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white m-0">
                    Historial de Comentarios Enviados
                  </h3>
                  <span className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
                    Todos los mensajes guardados en `db.json` para los profesores.
                  </span>
                </div>
                <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-950/60 dark:text-amber-300 font-extrabold text-xs">
                  {ownerComments.length} Mensajes
                </span>
              </div>

              {ownerComments.length === 0 ? (
                <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 text-center text-slate-500 dark:text-zinc-400 text-sm font-medium">
                  Aún no has enviado comentarios u observaciones a los docentes.
                </div>
              ) : (
                ownerComments.map(comment => (
                  <article
                    key={comment.id}
                    className="bg-white dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-zinc-800 shadow-xs flex flex-col gap-3 transition-all hover:shadow-md"
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-zinc-800 pb-3">
                      <div>
                        <h4 className="font-extrabold text-slate-900 dark:text-white text-base m-0">
                          {comment.title}
                        </h4>
                        <span className="text-xs text-slate-500 dark:text-zinc-400 font-semibold">
                          Para: <strong className="text-purple-700 dark:text-purple-400">{comment.teacherName}</strong> • {comment.time || comment.date}
                        </span>
                      </div>
                      <button
                        onClick={() => handleDeleteOwnerComment(comment.id)}
                        className="text-red-500 hover:text-red-700 text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                        title="Eliminar mensaje"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                        <span>Eliminar</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-700 dark:text-zinc-300 leading-relaxed font-medium m-0 p-3 rounded-xl bg-slate-50 dark:bg-zinc-800/60">
                      "{comment.text}"
                    </p>
                  </article>
                ))
              )}
            </div>

          </div>
        )}

      </main>

      {/* ========================================================================= */}
      {/* MODAL 1: CREAR / EDITAR TUTOR Y ESTUDIANTE */}
      {/* ========================================================================= */}
      {userModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl font-sans max-h-[90vh] overflow-y-auto animate-in fade-in">
            <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white m-0">
                {editingUser ? '✏️ Editar Perfil Tutor/Estudiante' : '👤 Crear Nuevo Perfil Tutor/Estudiante'}
              </h3>
              <button
                onClick={() => setUserModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="flex flex-col gap-4">
              <div className="font-bold text-xs text-pink-700 dark:text-pink-400 uppercase tracking-wider">DATOS DEL PADRE / TUTOR</div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">Nombre Completo Tutor:</label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    placeholder="Ej: Laura Ramírez"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">Correo Electrónico:</label>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">Contraseña de Acceso:</label>
                <input
                  type="text"
                  value={userPassword}
                  onChange={e => setUserPassword(e.target.value)}
                  placeholder="Contraseña (por defecto: montekids123)"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div className="font-bold text-xs text-pink-700 dark:text-pink-400 uppercase tracking-wider pt-2 border-t border-slate-100 dark:border-zinc-800">DATOS DEL NIÑO / ESTUDIANTE</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">Nombre Hijo/a:</label>
                  <input
                    type="text"
                    required
                    value={childFirstName}
                    onChange={e => setChildFirstName(e.target.value)}
                    placeholder="Ej: Mateo"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">Apellidos:</label>
                  <input
                    type="text"
                    value={childLastName}
                    onChange={e => setChildLastName(e.target.value)}
                    placeholder="Ej: Ramírez"
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">Edad (años):</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={childAge}
                    onChange={e => setChildAge(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">Género:</label>
                  <select
                    value={childGender}
                    onChange={e => setChildGender(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-bold text-slate-800 dark:text-zinc-200 outline-none"
                  >
                    <option value="Niña">Niña 👧</option>
                    <option value="Niño">Niño 👦</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">Aula Asignada:</label>
                <select
                  value={childClassroom}
                  onChange={e => setChildClassroom(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-bold text-slate-800 dark:text-zinc-200 outline-none"
                >
                  {classrooms.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              {userSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <span>✓</span>
                  <span>{userSuccessMsg}</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setUserModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-pink-700 hover:bg-pink-800 text-white font-extrabold text-xs shadow-sm cursor-pointer"
                >
                  {editingUser ? 'Guardar Cambios' : 'Crear Perfil'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL 2: CREAR / EDITAR DOCENTE */}
      {/* ========================================================================= */}
      {teacherModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 max-w-md w-full shadow-2xl font-sans animate-in fade-in">
            <div className="flex justify-between items-center pb-3 mb-4 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white m-0">
                {editingTeacher ? '✏️ Editar Perfil Docente' : '👩‍🏫 Crear Nuevo Docente'}
              </h3>
              <button
                onClick={() => setTeacherModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-zinc-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTeacher} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">Nombre Completo del Docente:</label>
                <input
                  type="text"
                  required
                  value={tName}
                  onChange={e => setTName(e.target.value)}
                  placeholder="Ej: Docente Sofía V."
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">Correo Electrónico:</label>
                <input
                  type="email"
                  required
                  value={tEmail}
                  onChange={e => setTEmail(e.target.value)}
                  placeholder="docente@montekids.com"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">Aula pedagógica a cargo:</label>
                <select
                  value={tClassroom}
                  onChange={e => setTClassroom(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs font-bold text-slate-800 dark:text-zinc-200 outline-none"
                >
                  {classrooms.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">Contraseña de Acceso:</label>
                <input
                  type="text"
                  value={tPassword}
                  onChange={e => setTPassword(e.target.value)}
                  placeholder="Contraseña (por defecto: teacher123)"
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-zinc-700 text-xs text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500 font-medium"
                />
              </div>

              {teacherSuccessMsg && (
                <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <span>✓</span>
                  <span>{teacherSuccessMsg}</span>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setTeacherModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-zinc-400 hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-extrabold text-xs shadow-sm cursor-pointer"
                >
                  {editingTeacher ? 'Guardar Cambios' : 'Crear Docente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
