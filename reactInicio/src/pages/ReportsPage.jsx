import { useState } from 'react';
import { ParentHeader } from '../components/ParentHeader';
import { ParentFooter } from '../components/ParentFooter';
import { ReportComposer } from '../components/ReportComposer';
import { ReportHistory } from '../components/ReportHistory';
import { ReportSidebar } from '../components/ReportSidebar';

export function ReportsPage() {
  const [activeFilter, setActiveFilter] = useState('all');

  const scrollToComposer = () => {
    const el = document.getElementById('composer-card');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col transition-colors duration-300">
      {/* Navbar que recicla la navegación */}
      <ParentHeader />

      <main className="w-full pt-20 bg-surface flex-grow">
        <div className="relative w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin py-space-lg">
          
          {/* Ambient Glow Orbs */}
          <div className="absolute top-12 left-1/4 w-96 h-96 bg-primary-container/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
          <div className="absolute top-80 right-10 w-80 h-80 bg-tertiary-container/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
            
            {/* Columna Izquierda / Principal (8 cols) */}
            <div className="lg:col-span-8 flex flex-col gap-space-lg">
              
              {/* Encabezado y Acción */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-container/30 text-on-primary-fixed-variant font-label-md text-label-md mb-2">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                    Sincronizado con Aula Semillitas
                  </div>
                  <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                    Bandeja de Comunicación y Reportes
                  </h1>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                    Historial de notas enviadas y respuestas de la docente Karina S. • Aula Semillitas
                  </p>
                </div>
                <button
                  type="button"
                  onClick={scrollToComposer}
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-tertiary text-on-tertiary font-label-lg text-label-lg shadow-[0_12px_32px_-4px_rgba(183,0,114,0.35)] hover:shadow-[0_16px_36px_-4px_rgba(183,0,114,0.45)] hover:scale-[1.02] active:translate-y-0.5 transition-all"
                >
                  <span className="material-symbols-outlined text-[20px]">add_circle</span>
                  Redactar Nuevo Mensaje
                </button>
              </div>

              {/* Filtros rápidos */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', label: 'Todos', count: 6, dot: null },
                  { id: 'salud', label: 'Consultas de Salud', count: 2, dot: 'bg-primary', badge: 'bg-primary-fixed text-on-primary-fixed' },
                  { id: 'horario', label: 'Avisos de Retiro/Horario', count: 2, dot: 'bg-secondary-container', badge: 'bg-secondary-fixed text-on-secondary-fixed' },
                  { id: 'pedagogica', label: 'Observaciones Pedagógicas', count: 2, dot: 'bg-tertiary', badge: 'bg-tertiary-fixed text-on-tertiary-fixed' }
                ].map((chip) => (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => setActiveFilter(chip.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-label-md text-label-md transition-all ${
                      activeFilter === chip.id
                        ? 'bg-inverse-surface text-inverse-on-surface shadow-sm'
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
              <ReportComposer />

              {/* Historial de Hilos */}
              <ReportHistory activeFilter={activeFilter} setActiveFilter={setActiveFilter} />

            </div>

            {/* Sidebar (4 cols) */}
            <ReportSidebar />

          </div>
        </div>
      </main>

      {/* Footer reusable */}
      <ParentFooter />
    </div>
  );
}