import { ParentHeader } from '../components/ParentHeader';
import { GamesHero } from '../components/GamesHero';
import { GamesGrid } from '../components/GamesGrid';
import { GamesAchievements } from '../components/GamesAchievements';
import { GamesFooter } from '../components/GamesFooter';

export function MundoJuegosPage() {
  const gameNav = [
    { path: '/juegos', label: 'Menú de Juegos' },
    { path: '/juegos/puntuaciones', label: 'Mis Puntos' }
  ];

  return (
    <div className="bg-background font-sans text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      <ParentHeader customNavItems={gameNav} />
      <main className="w-full pt-20 bg-background flex-1 max-w-[1440px] mx-auto px-4 lg:px-8 animate-page-bounce transition-colors duration-300">
        <div className="flex flex-col w-full pb-12">
          <div className="relative w-full overflow-hidden">
            <div className="absolute -top-12 left-10 w-72 h-72 rounded-full bg-primary-container/20 blur-3xl pointer-events-none"></div>
            <div className="absolute top-0 right-16 w-80 h-80 rounded-full bg-tertiary-container/30 blur-3xl pointer-events-none"></div>
            <div className="absolute top-48 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-secondary-fixed/40 blur-3xl pointer-events-none"></div>
            
            <GamesHero />
            <GamesGrid />
            <GamesAchievements />
          </div>
        </div>
      </main>
      <GamesFooter />
    </div>
  );
}