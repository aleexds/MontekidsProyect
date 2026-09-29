import { useState } from 'react';
import { ParentHeader } from '../components/ParentHeader';
import ParentFooter from '../components/ParentFooter';
import { ReportComposer } from '../components/ReportComposer';
import { ReportHistory } from '../components/ReportHistory';
import { ReportSidebar } from '../components/ReportSidebar';
import AnimatedInteractiveWord from '../components/AnimatedInteractiveWord';

const INITIAL_THREADS = [
  {
    id: 1,
    category: 'salud',
    categoryLabel: 'Consulta de Salud',
    categoryIcon: 'medical_services',
    time: 'Enviado ayer, 08:10 AM',
    title: 'Medicamento Matutino - Jarabe Antialérgico',
    sender: 'Valeria Quirós',
    senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
    message: 'Hola Docente Karina, Mateo tiene una ligera congestión nasal. Dejamos el jarabe pediátrico antialérgico en recepción con la enfermera Andrea, con indicación médica de administrar 5ml tras la merienda de las 10:00 AM. Adjunto la receta extendida por su pediatra.',
    attachment: 'Receta_Medica_Octubre.pdf',
    attachmentSize: '240 KB',
    reply: {
      author: 'Docente Karina S.',
      role: 'Guía AMI',
      time: 'Ayer, 10:15 AM',
      statusTag: 'Dosis completada',
      text: 'Recibido Valeria. Se le administró exactamente los 5ml a las 10:00 AM después de la fruta. Mateo estuvo muy alegre y colaborativo durante todo el circuito sensorial matutino. No presentó somnolencia.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
      signed: true
    }
  },
  {
    id: 2,
    category: 'horario',
    categoryLabel: 'Aviso de Horario / Retiro',
    categoryIcon: 'schedule',
    time: '22 Octubre, 14:20 PM',
    title: 'Aviso de Retiro Anticipado por Consulta Dental',
    sender: 'Valeria Quirós',
    senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
    message: 'El próximo viernes 27 retiraremos a Mateo a las 12:00 PM después del periodo de merienda por consulta odontopediátrica de rutina. Vendrá su padre, Roberto Quirós.',
    reply: {
      author: 'Docente Karina',
      time: '22 Oct, 15:05',
      text: 'Confirmado y anotado en bitácora de portería para retiro seguro a las 12:00 PM.',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120'
    }
  }
];

export function ReportsPage() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [threads, setThreads] = useState(INITIAL_THREADS);

  const handleAddThread = (newThread) => {
    setThreads((prevThreads) => [newThread, ...prevThreads]);
  };

  const handleDeleteThread = (id) => {
    setThreads((prevThreads) => prevThreads.filter((t) => t.id !== id));
  };

  const scrollToComposer = () => {
    const el = document.getElementById('composer-card');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col transition-colors duration-300 relative overflow-x-hidden">
      <ParentHeader />

      {/* Aplicada la clase .animate-page-bounce proveniente de tu index.css */}
      <main className="w-full pt-28 pb-16 bg-surface flex-grow relative z-10 animate-page-bounce">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative">
          
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
          <div className="absolute top-60 right-10 w-80 h-80 bg-tertiary-container/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            <div className="lg:col-span-8 flex flex-col gap-6 w-full min-w-0">
              
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/30 text-on-primary-fixed-variant font-label-md text-label-md mb-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                    Sincronizado con Aula Semillitas
                  </div>
                  <h1 className="font-['Nunito'] text-3xl md:text-4xl font-extrabold tracking-tight leading-none mb-1 flex flex-wrap gap-x-3">
                    <AnimatedInteractiveWord 
                      word="Bandeja" 
                      baseColorClass="text-on-surface transition-colors duration-300 cursor-default" 
                    />
                    <AnimatedInteractiveWord 
                      word="de" 
                      baseColorClass="text-on-surface transition-colors duration-300 cursor-default" 
                    />
                    <AnimatedInteractiveWord 
                      word="Comunicación" 
                      baseColorClass="text-on-surface transition-colors duration-300 cursor-default" 
                    />
                    <AnimatedInteractiveWord 
                      word="y" 
                      baseColorClass="text-on-surface transition-colors duration-300 cursor-default" 
                    />
                    <AnimatedInteractiveWord 
                      word="Reportes" 
                      baseColorClass="text-on-surface transition-colors duration-300 cursor-default" 
                    />
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Historial de notas enviadas y respuestas de la docente Karina S. • Aula Semillitas
                  </p>
                </div>
                <button
                  type="button"
                  onClick={scrollToComposer}
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-tertiary text-[#ffffff] font-label-lg text-label-lg shadow-[0_12px_32px_-4px_rgba(183,0,114,0.35)] hover:shadow-[0_16px_36px_-4px_rgba(183,0,114,0.45)] hover:scale-[1.02] active:translate-y-0.5 transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px] text-[#ffffff]">add_circle</span>
                  <span className="text-[#ffffff]">Redactar Nuevo Mensaje</span>
                </button>
              </div>

              {/* Filtros */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', label: 'Todos', count: threads.length, dot: null },
                  { id: 'salud', label: 'Consultas de Salud', count: threads.filter(t => t.category === 'salud').length, dot: 'bg-primary', badge: 'bg-primary-fixed text-on-primary-fixed' },
                  { id: 'horario', label: 'Avisos de Retiro/Horario', count: threads.filter(t => t.category === 'horario').length, dot: 'bg-secondary-container', badge: 'bg-secondary-fixed text-on-secondary-fixed' },
                  { id: 'pedagogica', label: 'Observaciones Pedagógicas', count: threads.filter(t => t.category === 'pedagogica').length, dot: 'bg-tertiary', badge: 'bg-tertiary-fixed text-on-tertiary-fixed' }
                ].map((chip) => (
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
                    <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${chip.badge || 'bg-white/20 text-white'}`}>
                      {chip.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Formulario Redactor */}
              <div id="composer-card">
                <ReportComposer onAddThread={handleAddThread} />
              </div>

              {/* Historial de Hilos con eliminación */}
              <ReportHistory 
                activeFilter={activeFilter} 
                threads={threads} 
                onDeleteThread={handleDeleteThread} 
              />

            </div>

            <div className="lg:col-span-4 w-full min-w-0">
              <ReportSidebar />
            </div>

          </div>
        </div>
      </main>

      <ParentFooter />
    </div>
  );
}