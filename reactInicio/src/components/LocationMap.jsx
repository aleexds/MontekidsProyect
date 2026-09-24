

export default function LocationMap() {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 py-16 bg-surface-container-low" id="ubicacion">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="inline-block px-4 py-1 rounded-full bg-primary-container text-on-primary-container font-bold text-xs uppercase tracking-wider mb-2">
            Ubicación & Contacto Directo
          </span>
          <h2 className="text-3xl font-extrabold text-on-surface">Visítanos y Ponte en Contacto</h2>
          <p className="text-on-surface-variant mt-2 text-sm sm:text-base">
            ¿Quieres conocer nuestras instalaciones o consultar sobre cupos? Escríbenos directamente o visítanos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Tarjeta de Información */}
          <div className="lg:col-span-5 bg-surface-container-lowest p-6 rounded-2xl shadow-md flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Atención de 6:00 AM - 6:00 PM</span>
              </div>
              
              <h3 className="text-xl font-bold text-on-surface">Sede Central Montekids</h3>
              <p className="text-sm text-on-surface-variant flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
                <span>Av. 5A, Provincia de Puntarenas, El Roble, El Roble 2, 60101</span>
              </p>

              <div className="p-4 rounded-xl bg-surface-container-low space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Horario:</span>
                  <span className="font-bold">Lun - Vie: 6:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Teléfono:</span>
                  <a href="tel:+50687909556" className="font-bold text-primary hover:underline">+506 8790 9556</a>
                </div>
                <div className="flex justify-between">
                  <span className="text-on-surface-variant">Correo:</span>
                  <a href="mailto:direccion@montekidsacademy.com" className="font-bold text-primary hover:underline">direccion@montekidsacademy.com</a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t">
              <a 
                href="https://wa.me/50687909556" 
                target="_blank" 
                rel="noreferrer"
                className="w-full py-3 rounded-full bg-[#25D366] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:brightness-105 transition-all"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span>Iniciar Chat por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Mapa Incrustado con el marcador oficial de MonteKids */}
          <div className="lg:col-span-7 bg-surface-container-lowest p-2 rounded-2xl shadow-md min-h-[350px] overflow-hidden">
            <iframe 
              title="Ubicación oficial de MonteKids"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d881.9356611944406!2d-84.73457448694616!3d9.98269833279619!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa031001bf261d1%3A0x680836ba770a34a6!2sMonteKids!5e0!3m2!1ses-419!2scr!4v1790267581472!5m2!1ses-419!2scr" 
              className="w-full h-full min-h-[350px] rounded-xl border-0" 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="strict-origin-when-cross-origin"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}