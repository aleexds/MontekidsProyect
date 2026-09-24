

export default function LocationMap() {
  return (
    <section class="w-full px-4 sm:px-6 lg:px-8 py-16 bg-surface-container-low" id="ubicacion">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-2xl mx-auto mb-10">
          <span class="inline-block px-4 py-1 rounded-full bg-primary-container text-on-primary-container font-bold text-xs uppercase tracking-wider mb-2">Ubicación & Contacto Directo</span>
          <h2 class="text-3xl font-extrabold text-on-surface">Visítanos y Ponte en Contacto</h2>
          <p class="text-on-surface-variant mt-2 text-sm sm:text-base">¿Quieres conocer nuestras instalaciones o consultar sobre cupos? Escríbenos directamente o visítanos.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Tarjeta de Información */}
          <div class="lg:col-span-5 bg-surface-container-lowest p-6 rounded-2xl shadow-md flex flex-col justify-between">
            <div class="space-y-4">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Abierto Hoy • 7:00 AM - 5:00 PM</span>
              </div>
              
              <h3 class="text-xl font-bold text-on-surface">Sede Central Montekids</h3>
              <p class="text-sm text-on-surface-variant flex items-start gap-2">
                <span class="material-symbols-outlined text-primary text-[20px]">location_on</span>
                <span>San José, Costa Rica (Cerca de parque principal)</span>
              </p>

              <div class="p-4 rounded-xl bg-surface-container-low space-y-2 text-sm">
                <div class="flex justify-between"><span class="text-on-surface-variant">Horario:</span><span class="font-bold">Lun - Vie: 7:00 - 17:00</span></div>
                <div class="flex justify-between"><span class="text-on-surface-variant">Teléfono:</span><a href="tel:+50622000000" class="font-bold text-primary hover:underline">+506 2200-0000</a></div>
                <div class="flex justify-between"><span class="text-on-surface-variant">Correo:</span><a href="mailto:info@montekids.com" class="font-bold text-primary hover:underline">info@montekids.com</a></div>
              </div>
            </div>

            <div class="mt-6 pt-4 border-t">
              <a 
                href="https://wa.me/" 
                target="_blank" 
                rel="noreferrer"
                class="w-full py-3 rounded-full bg-[#25D366] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-md hover:brightness-105 transition-all"
              >
                <span class="material-symbols-outlined text-[20px]">chat</span>
                <span>Iniciar Chat por WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Mapa Incrustado (Google Maps API Embed Simulation) */}
          <div class="lg:col-span-7 bg-surface-container-lowest p-2 rounded-2xl shadow-md min-h-[350px]">
            <iframe 
              title="Google Maps Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15718.369871146603!2d-84.09072465000001!3d9.9356284!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa0e3668022f2db%3A0xdbe099d8d57d079d!2sSan%20Jos%C3%A9!5e0!3m2!1ses!2scr!4v1710000000000!5m2!1ses!2scr" 
              class="w-full h-full min-h-[350px] rounded-xl border-0" 
              allowfullscreen="" 
              loading="lazy" 
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}