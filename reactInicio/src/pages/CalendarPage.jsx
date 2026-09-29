import { useState } from 'react';
import { ParentHeader } from '../components/ParentHeader';
import ParentFooter from '../components/ParentFooter';
import { CalendarHeader } from '../components/CalendarHeader';
import { CalendarGrid } from '../components/CalendarGrid';
import { UpcomingEvents } from '../components/UpcomingEvents';
import { CalendarSidebar } from '../components/CalendarSidebar';
import { CalendarModals } from '../components/CalendarModals';

export function CalendarPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeView, setActiveView] = useState('mes');

  // Estados de Modales y Toast
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showIAModal, setShowIAModal] = useState(false);
  const [toastState, setToastState] = useState({ visible: false, message: '', icon: '' });

  const showToast = (message, icon = 'check_circle') => {
    setToastState({ visible: true, message, icon });
    setTimeout(() => {
      setToastState({ visible: false, message: '', icon: '' });
    }, 3200);
  };

  const handleSync = () => {
    showToast('Sincronizando 5 eventos con tu calendario iCal/Google...', 'sync');
  };

  const handleSelectEvent = (elementId) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      el.classList.add('scale-[1.02]');
      setTimeout(() => el.classList.remove('scale-[1.02]'), 700);
    }
  };

  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen flex flex-col transition-colors duration-300 relative overflow-x-hidden">
      <ParentHeader />

      {/* Aplicamos animate-page-bounce de tu index.css */}
      <main className="w-full pt-28 pb-16 bg-surface flex-grow relative z-10 animate-page-bounce">
        <div className="w-full max-w-7xl mx-auto px-margin-mobile lg:px-margin relative">
          
          {/* Luces decorativas de fondo */}
          <div
            className="absolute top-12 left-1/4 w-96 h-96 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse"
            style={{ animationDuration: '8s' }}
          ></div>
          <div className="absolute top-48 right-12 w-80 h-80 bg-tertiary-container/30 rounded-full blur-3xl pointer-events-none -z-10"></div>

          {/* Encabezado y Barra de Filtros */}
          <CalendarHeader
            activeCategory={activeCategory}
            setActiveCategory={(cat) => {
              setActiveCategory(cat);
              showToast(`Filtrando actividades`, 'filter_alt');
            }}
            activeView={activeView}
            setActiveView={(view) => {
              setActiveView(view);
              showToast(`Vista cambiada a modo: ${view.toUpperCase()}`, 'view_module');
            }}
            onSync={handleSync}
          />

          {/* Grid Principal de Trabajo */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start relative z-10">
            {/* Columna Principal */}
            <section className="lg:col-span-8 flex flex-col gap-space-lg w-full min-w-0">
              <CalendarGrid
                onSelectEvent={handleSelectEvent}
                onAgendaQuickPeek={() => showToast('Recordatorio agendado para el 5 de Noviembre', 'event')}
              />
              <UpcomingEvents
                onOpenOrderModal={() => setShowOrderModal(true)}
                showToast={showToast}
              />
            </section>

            {/* Sidebar Derecho */}
            <CalendarSidebar
              onOpenIAModal={() => setShowIAModal(true)}
              showToast={showToast}
            />
          </div>

        </div>
      </main>

      <ParentFooter />

      {/* Modales y Notificaciones */}
      <CalendarModals
        showOrderModal={showOrderModal}
        setShowOrderModal={setShowOrderModal}
        showIAModal={showIAModal}
        setShowIAModal={setShowIAModal}
        toastState={toastState}
      />
    </div>
  );
}