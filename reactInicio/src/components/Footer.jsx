
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low mt-12 border-t border-surface-container-high/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="space-y-3">
            <Logo width={180} height={45} />
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Centro de Desarrollo Temprano y Estimulación Integral Montessori. Fomentando el asombro y la autonomía natural desde los primeros pasos.
            </p>
            <div className="flex items-center gap-1.5 text-amber-600 font-bold text-xs pt-1">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Certificación AMI Internacional</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm text-on-surface mb-4">Explora</h4>
            <ul className="space-y-2 text-xs text-on-surface-variant font-medium">
              <li><a href="#filosofia" className="hover:text-primary transition-colors">Nuestra filosofía</a></li>
              <li><a href="#aulas" className="hover:text-primary transition-colors">Aulas</a></li>
              <li><a href="#opiniones" className="hover:text-primary transition-colors">Opiniones</a></li>
              <li><a href="#ubicacion" className="hover:text-primary transition-colors">Ubicación y contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm text-on-surface mb-4">Contacto</h4>
            <div className="space-y-2 text-xs text-on-surface-variant font-medium">
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">location_on</span>
                San José, Costa Rica
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">call</span>
                +506 2200-0000
              </p>
              <p className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px] text-primary">mail</span>
                hola@montekids.com
              </p>
            </div>
            <div className="mt-4 p-2.5 rounded-xl bg-surface-container-high/60 flex items-center gap-2 text-xs font-bold text-on-surface">
              <span className="material-symbols-outlined text-tertiary text-[18px]">schedule</span>
              <span>Horario: Lun a Vie 07:00 - 17:00 hrs</span>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-surface-container-high/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <p>© 2026 Montekids Early Childhood & Stimulation Center. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-on-surface transition-colors">Política de Privacidad</a>
            <a href="#" className="hover:text-on-surface transition-colors">Protocolo de Bienestar Infantil</a>
          </div>
        </div>
      </div>
    </footer>
  );
}