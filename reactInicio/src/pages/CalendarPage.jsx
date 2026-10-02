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
  
  // Usamos un objeto Date real en lugar de un índice numérico estático.
  // Esto inicializa el calendario en el mes y año actual de forma automática.
  const [currentDate, setCurrentDate] = useState(new Date());

  // Estados de Modales
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showIAModal, setShowIAModal] = useState(false);

  // Funciones de navegación con objetos Date reales
  const handlePrevMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const handleSync = () => {
    // sync action
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

      <main className="w-full pt-28 pb-16 bg-surface flex-grow relative z-10 animate-page-bounce">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 relative">
          
          <CalendarHeader
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            activeView={activeView}
            setActiveView={setActiveView}
            onSync={handleSync}
            currentDate={currentDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            <section className="lg:col-span-8 flex flex-col gap-8 w-full min-w-0">
              <CalendarGrid
                currentDate={currentDate}
                activeView={activeView}
                activeCategory={activeCategory}
                onSelectEvent={handleSelectEvent}
              />
              <UpcomingEvents
                activeCategory={activeCategory}
                onOpenOrderModal={() => setShowOrderModal(true)}
              />
            </section>

            <CalendarSidebar
              onOpenIAModal={() => setShowIAModal(true)}
            />
          </div>

        </div>
      </main>

      <ParentFooter />

      <CalendarModals
        showOrderModal={showOrderModal}
        setShowOrderModal={setShowOrderModal}
        showIAModal={showIAModal}
        setShowIAModal={setShowIAModal}
      />
    </div>
  );
}