import { useState, useEffect } from 'react';
import { ParentHeader } from '../components/ParentHeader';
import ParentFooter from '../components/ParentFooter';
import { ReportComposer } from '../components/ReportComposer';
import { ReportHistory } from '../components/ReportHistory';
import { ReportSidebar } from '../components/ReportSidebar';
import AnimatedInteractiveWord from '../components/AnimatedInteractiveWord';
import { useAuth } from '../context/useAuth';
import { getTeacherForUser } from '../utils/teacherHelper';
import { useLanguage } from '../context/LanguageContext';

const INITIAL_THREADS = [
  {
    id: '1',
    category: 'salud',
    categoryLabel: 'Consulta de Salud',
    categoryIcon: 'medical_services',
    time: 'Enviado ayer, 08:10 AM',
    title: 'Medicamento Matutino - Jarabe Antialérgico',
    sender: 'Tutor Montekids',
    senderAvatar:
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
    message:
      'Hola Docente, nuestro hijo/a tiene una ligera congestión nasal. Dejamos el jarabe pediátrico en recepción con indicación médica de administrar 5ml tras la merienda. Adjunto la receta.',
    attachment: 'Receta_Medica_Octubre.pdf',
    attachmentSize: '240 KB',
    reply: {
      author: 'Docente de Aula',
      role: 'Guía AMI',
      time: 'Ayer, 10:15 AM',
      statusTag: 'Dosis completada',
      text:
        'Recibido. Se le administró la dosis en el horario indicado. Estuvo muy alegre y colaborativo durante la jornada.',
      avatar:
        'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
      signed: true
    }
  }
];

export function ReportsPage() {
  const { activeUser } = useAuth();
  const { t } = useLanguage();
  const teacher = getTeacherForUser(activeUser);
  const classroom = activeUser?.child?.classroom || 'Aula Semillitas';

  const [activeFilter, setActiveFilter] = useState('all');
  const [threads, setThreads] = useState(INITIAL_THREADS);
  const [templateData, setTemplateData] = useState(null);

  // Cargar reportes almacenados en db.json a través de json-server
  useEffect(() => {
    fetch('http://localhost:3000/reports')
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener reportes');
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setThreads(data);
        }
      })
      .catch((err) => {
        console.warn('Servidor json-server no disponible o vacío, usando datos locales:', err);
      });
  }, []);

  const handleAddThread = async (newThread) => {
    // Actualización optimista del estado local
    setThreads((prevThreads) => [newThread, ...prevThreads]);

    try {
      const response = await fetch('http://localhost:3000/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newThread)
      });
      if (response.ok) {
        const savedReport = await response.json();
        setThreads((prevThreads) =>
          prevThreads.map((t) => (t.id === newThread.id ? savedReport : t))
        );
      }
    } catch (err) {
      console.warn('Error al guardar reporte en db.json:', err);
    }
  };

  const handleDeleteThread = async (id) => {
    // Actualización optimista del estado local
    setThreads((prevThreads) => prevThreads.filter((t) => String(t.id) !== String(id)));

    try {
      await fetch(`http://localhost:3000/reports/${id}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.warn('Error al eliminar reporte de db.json:', err);
    }
  };

  const scrollToComposer = () => {
    const el = document.getElementById('composer-card');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Carga de la plantilla rápida de salud
  const handleUseHealthTemplate = () => {
    const healthTemplate = {
      id: Date.now(),
      category: 'salud',
      title: 'Autorización de Medicamento y Dosis en Aula',
      message: 
`Estimada/o ${teacher.name},

Por medio de la presente solicito su colaboración para la administración del siguiente medicamento durante la jornada escolar:

• Nombre del Medicamento: [Nombre del jarabe / gotas]
• Dosis Exacta: [Ej. 5 ml / 3 gotas]
• Horario Fijo de Aplicación: [Ej. 10:00 AM tras la merienda]
• Requiere Refrigeración: [Sí / No - Dejado en recepción]
• Indicaciones Adicionales / Observaciones: [Tomar con bastante agua / Administrar después de alimentos]

Adjunto la receta médica correspondiente.

Muchas gracias por el cuidado y atención.
Atentamente,
${activeUser?.name || 'Tutor'}`
    };

    setTemplateData(healthTemplate);
    scrollToComposer();
  };

  // Filtrar solo los reportes pertenecientes al usuario activo
  const userThreads = threads.filter((thread) => {
    if (!activeUser) return true;
    if (thread.userId) {
      return String(thread.userId) === String(activeUser.id);
    }
    if (thread.sender && activeUser.name) {
      return thread.sender.toLowerCase().trim() === activeUser.name.toLowerCase().trim();
    }
    return false;
  });

  const filters = [
    { id: 'all', label: t('reportsPage.filterAll'), count: userThreads.length, dot: null },
    { id: 'salud', label: t('reportsPage.filterHealth'), count: userThreads.filter((th) => th.category === 'salud').length, dot: 'bg-primary' },
    { id: 'horario', label: t('reportsPage.filterSchedule'), count: userThreads.filter((th) => th.category === 'horario').length, dot: 'bg-secondary-container' },
    { id: 'pedagogica', label: t('reportsPage.filterPedagogical'), count: userThreads.filter((th) => th.category === 'pedagogica').length, dot: 'bg-tertiary' }
  ];

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col transition-colors duration-300 relative overflow-x-hidden">
      <ParentHeader />

      <main className="w-full pt-28 pb-16 bg-surface flex-grow relative z-10 animate-page-bounce">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            <div className="lg:col-span-8 flex flex-col gap-6 w-full min-w-0">
              
              {/* Header de la sección */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 font-bold text-xs mb-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span>
                    {t('reportsPage.syncedWith')} {classroom}
                  </div>
                  <h1 className="font-['Nunito'] text-3xl md:text-4xl font-extrabold tracking-tight leading-none mb-1 flex flex-wrap gap-x-3">
                    <AnimatedInteractiveWord word={t('reportsPage.pageTitle1')} baseColorClass="text-on-surface cursor-default" />
                    <AnimatedInteractiveWord word={t('reportsPage.pageTitle2')} baseColorClass="text-on-surface cursor-default" />
                    <AnimatedInteractiveWord word={t('reportsPage.pageTitle3')} baseColorClass="text-on-surface cursor-default" />
                    {t('reportsPage.pageTitle4') && <AnimatedInteractiveWord word={t('reportsPage.pageTitle4')} baseColorClass="text-on-surface cursor-default" />}
                    {t('reportsPage.pageTitle5') && <AnimatedInteractiveWord word={t('reportsPage.pageTitle5')} baseColorClass="text-on-surface cursor-default" />}
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    {t('reportsPage.pageSubtitle')} {teacher.name} {t('reportsPage.pageSubtitleMid')} {classroom}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={scrollToComposer}
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-tertiary text-[#ffffff] font-label-lg text-label-lg shadow-lg hover:scale-[1.02] active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] text-[#ffffff]">add_circle</span>
                  <span className="text-[#ffffff]">{t('reportsPage.composeBtn')}</span>
                </button>
              </div>

              {/* Filtros */}
              <div className="flex flex-wrap items-center gap-2">
                {filters.map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setActiveFilter(chip.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-label-md text-label-md transition-all cursor-pointer ${
                      activeFilter === chip.id
                        ? 'bg-inverse-surface text-inverse-on-surface shadow-sm font-bold'
                        : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
                    }`}
                  >
                    {chip.dot && <span className={`w-2 h-2 rounded-full ${chip.dot}`}></span>}
                    <span>{chip.label}</span>
                  </button>
                ))}
              </div>

              {/* Formulario Redactor con 'key' dinámico */}
              <div id="composer-card">
                <ReportComposer
                  key={templateData ? templateData.id : 'default'}
                  onAddThread={handleAddThread}
                  initialData={templateData}
                />
              </div>

              {/* Historial de Hilos */}
              <ReportHistory
                activeFilter={activeFilter}
                threads={userThreads}
                onDeleteThread={handleDeleteThread}
              />
            </div>

            {/* Sidebar con el disparador de plantilla */}
            <div className="lg:col-span-4 w-full min-w-0">
              <ReportSidebar onUseTemplate={handleUseHealthTemplate} />
            </div>
          </div>
        </div>
      </main>

      <ParentFooter />
    </div>
  );
}