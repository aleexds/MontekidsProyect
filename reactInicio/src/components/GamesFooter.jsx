export function GamesFooter() {
  return (
    <footer className="w-full bg-surface-container-lowest shadow-sm py-12 mt-12">
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-2xl leading-none">verified_user</span>
          </div>
          <div>
            <p className="text-base font-bold text-on-surface">Entorno Educativo Seguro & Amigable</p>
            <p className="text-xs text-on-surface-variant font-medium">Acreditado bajo estándares KidSAFE+ y pedagogía sensorial.</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <a href="#" className="px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-bold text-xs hover:opacity-90 transition-opacity">Juegos Creativos</a>
          <a href="#" className="px-4 py-2 rounded-full bg-tertiary-container text-on-tertiary-container font-bold text-xs hover:opacity-90 transition-opacity">Música y Rimas</a>
          <a href="#" className="px-4 py-2 rounded-full bg-secondary-fixed text-on-secondary-fixed font-bold text-xs hover:opacity-90 transition-opacity">Zona de Trofeos</a>
          <a href="#" className="px-4 py-2 rounded-full bg-surface-container-highest text-on-surface font-bold text-xs hover:opacity-90 transition-opacity">Guía Familias</a>
        </div>
      </div>
      <div className="w-full max-w-[1440px] mx-auto px-6 lg:px-8 pt-6 mt-6 border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-on-surface-variant text-xs font-medium">
        <p>© 2025 Montekids Early Learning Labs. Exploración feliz e intuitiva.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-on-surface transition-colors">Seguridad Infantil</a>
          <a href="#" className="hover:text-on-surface transition-colors">Privacidad</a>
          <a href="#" className="hover:text-on-surface transition-colors">Accesibilidad</a>
        </div>
      </div>
    </footer>
  );
}