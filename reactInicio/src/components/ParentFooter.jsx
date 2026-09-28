
export const ParentFooter = () => {
  return (
    <footer className="w-full bg-surface-container-lowest py-space-xl mt-space-xl shadow-[0_-4px_24px_-4px_rgba(29,17,73,0.03)]">
      <div className="max-w-[1440px] mx-auto px-margin">
        <div className="flex flex-col md:flex-row items-center justify-between gap-space-md pb-space-lg">
          <div className="flex items-center gap-space-sm">
            <div className="w-9 h-9 rounded-full bg-secondary-container/20 flex items-center justify-center text-secondary">
              <span className="material-symbols-outlined text-[22px]">verified</span>
            </div>
            <div>
              <p className="font-label-lg text-label-lg text-on-surface">Acreditación Internacional AMI Montessori</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Entorno certificado de estimulación y desarrollo temprano para la primera infancia</p>
            </div>
          </div>
          <div className="flex items-center gap-space-md">
            <a href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[18px]">help_outline</span>Centro de Ayuda Familiar
            </a>
            <span className="text-outline-variant">•</span>
            <a href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[18px]">shield</span>Privacidad y Protección
            </a>
          </div>
        </div>
        <div className="pt-space-md flex flex-col sm:flex-row items-center justify-between gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
          <p>© 2025 Montekids Platform • Portal de Familias y Acompañamiento Temprano</p>
          <div className="flex items-center gap-space-sm">
            <span className="inline-flex items-center gap-1 text-primary font-label-sm text-label-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>Conexión Segura
            </span>
            <span>Sincronizado con Aula Nido</span>
          </div>
        </div>
      </div>
    </footer>
  );
};