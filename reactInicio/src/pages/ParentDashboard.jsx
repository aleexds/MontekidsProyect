import { ParentNavbar } from '../components/ParentNavbar';
import { ParentHero } from '../components/ParentHero';
import { DevelopmentMetrics } from '../components/DevelopmentMetrics';
import { DailyLog } from '../components/DailyLog';
import { ParentSidebar } from '../components/ParentSidebar';
import { ParentFooter } from '../components/ParentFooter';

export const ParentDashboard = () => {
  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen">
      <ParentNavbar />

      <main className="w-full pt-20 bg-surface">
        <div className="flex flex-col w-full">
          <div className="max-w-[1440px] w-full mx-auto px-margin-mobile md:px-margin py-space-lg flex flex-col gap-space-lg">
            {/* Banner de Bienvenida */}
            <ParentHero />

            {/* Tarjetas de Métricas de Desarrollo */}
            <DevelopmentMetrics />

            {/* Disposición a 2 Columnas (Bitácora + Sidebar) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
              <DailyLog />
              <ParentSidebar />
            </div>
          </div>
        </div>
      </main>

      <ParentFooter />
    </div>
  );
};

export default ParentDashboard;