import { ParentHeader } from '../components/ParentHeader';
import { FamilyHeroBanner } from '../components/FamilyHeroBanner';
import { DailyTimeline } from '../components/DailyTimeline';
import { ParentSidebar } from '../components/ParentSidebar';
import ParentFooter from '../components/ParentFooter';
import AnimatedInteractiveWord from '../components/AnimatedInteractiveWord';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/useAuth';


export function ParentDashboard() {
  const { t } = useLanguage();
  const { activeUser } = useAuth();

  const classroom = activeUser?.child?.classroom || 'Aula Semillitas (2 a 4 años)';
  const childName = activeUser?.child?.firstName || 'Mateo';

  return (
    /* Se agregaron transition-colors duration-300 en la raíz */
    <div className="bg-surface font-body-md text-on-surface min-h-screen transition-colors duration-300">
      {/* Navbar fija */}
      <ParentHeader />

      {/* Contenido principal con transición suave y animación de entrada */}
      <main className="w-full pt-28 pb-16 bg-surface transition-colors duration-300 animate-page-bounce">
        <div className="flex flex-col w-full">
          <div className="max-w-[1440px] w-full mx-auto px-margin-mobile md:px-margin flex flex-col gap-6">
            
            {/* Header de la sección estilo ReportsPage con AnimatedInteractiveWord */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-100 dark:bg-cyan-950/60 text-cyan-800 dark:text-cyan-300 font-bold text-xs mb-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-500 animate-ping"></span>
                  {t('parentDashboard.header.badge', 'Panel de Seguimiento Integral')} • {classroom}
                </div>
                <h1 className="font-['Nunito'] text-3xl md:text-4xl font-extrabold tracking-tight leading-none mb-1 flex flex-wrap gap-x-3">
                  <AnimatedInteractiveWord 
                    word={t('parentDashboard.header.title1', 'Bitácora')} 
                    baseColorClass="text-on-surface cursor-default" 
                  />
                  <AnimatedInteractiveWord 
                    word={t('parentDashboard.header.title2', 'y')} 
                    baseColorClass="text-on-surface cursor-default" 
                  />
                  <AnimatedInteractiveWord 
                    word={t('parentDashboard.header.title3', 'Progreso')} 
                    baseColorClass="text-on-surface cursor-default" 
                  />
                  <AnimatedInteractiveWord 
                    word={t('parentDashboard.header.title4', 'Familiar')} 
                    baseColorClass="text-on-surface cursor-default" 
                  />
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  {t('parentDashboard.header.subtitle', 'Supervisión en tiempo real del desarrollo sensorial, cognitivo y actividades de')} <strong className="text-on-surface font-bold">{childName}</strong>
                </p>
              </div>

              
            </div>

            {/* 1. Hero Banner */}
            <FamilyHeroBanner />

            {/* 2. Layout en 2 columnas (Bitácora del día y Sidebar) */}

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