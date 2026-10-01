import { ParentHeader } from '../components/ParentHeader';
import { FamilyHeroBanner } from '../components/FamilyHeroBanner';
import { DevelopmentalMetrics } from '../components/DevelopmentalMetrics';
import { DailyTimeline } from '../components/DailyTimeline';
import { ParentSidebar } from '../components/ParentSidebar';
import  ParentFooter  from '../components/ParentFooter';

export function ParentDashboard() {
  return (
    /* Se agregaron transition-colors duration-300 en la raíz */
    <div className="bg-surface font-body-md text-on-surface min-h-screen transition-colors duration-300">
      {/* Navbar fija */}
      <ParentHeader />

      {/* Contenido principal con transición suave y animación de entrada */}
      <main className="w-full pt-20 bg-surface transition-colors duration-300 animate-page-bounce">
        <div className="flex flex-col w-full">
          <div className="max-w-[1440px] w-full mx-auto px-margin-mobile md:px-margin py-space-lg flex flex-col gap-6">
            
            {/* 1. Hero Banner */}
            <FamilyHeroBanner />

            {/* 2. Métricas de Desarrollo */}
            <DevelopmentalMetrics />

            {/* 3 & 4. Layout en 2 columnas */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              <DailyTimeline />
              <ParentSidebar />
            </div>

          </div>
        </div>
      </main>

      <ParentFooter />
    </div>
  );
}