

export default function Testimonials() {
  return (
    <section class="w-full px-4 sm:px-6 lg:px-8 py-16 bg-surface-container-low/80" id="opiniones">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-2xl mx-auto mb-12">
          <span class="inline-block px-4 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs uppercase tracking-wide mb-2">
            Comunidad y Confianza
          </span>
          <h2 class="text-3xl font-extrabold text-on-surface">Familias Felices en Montekids</h2>
          <p class="text-on-surface-variant mt-1 text-sm sm:text-base">Testimonios reales de familias que confían en nuestro acompañamiento.</p>
        </div>

        {/* Testimonials Grid */}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          
          <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <div class="flex text-amber-500 mb-3">★★★★★</div>
            <p class="text-sm sm:text-base text-on-surface italic mb-6 leading-relaxed">
              “Excelente atención y metodología. Mateo ha avanzado muchísimo en su lenguaje, autonomía y motricidad. Además la plataforma web nos mantiene al tanto de cada hito diario.”
            </p>
            <div class="flex items-center gap-4 border-t pt-4">
              <div class="w-12 h-12 rounded-full bg-pink-100 text-tertiary flex items-center justify-center font-bold text-lg">VQ</div>
              <div>
                <h4 class="font-bold text-sm text-on-surface">Valeria Quirós</h4>
                <p class="text-xs text-on-surface-variant">Mamá de Mateo (Aula Exploradores)</p>
              </div>
            </div>
          </div>

          <div class="bg-surface-container-lowest p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <div class="flex text-amber-500 mb-3">★★★★★</div>
            <p class="text-sm sm:text-base text-on-surface italic mb-6 leading-relaxed">
              “El ambiente es cariñoso y estimulante. Las maestras están altamente capacitadas y el enfoque en ritmo individual marca una gran diferencia en la seguridad de Sofi.”
            </p>
            <div class="flex items-center gap-4 border-t pt-4">
              <div class="w-12 h-12 rounded-full bg-cyan-100 text-primary flex items-center justify-center font-bold text-lg">CM</div>
              <div>
                <h4 class="font-bold text-sm text-on-surface">Carlos Mendoza</h4>
                <p class="text-xs text-on-surface-variant">Papá de Sofía (Aula Creadores)</p>
              </div>
            </div>
          </div>

        </div>

        {/* Counter Pillows */}
        <div class="bg-surface-container-lowest rounded-2xl p-6 shadow-md grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <span class="text-3xl sm:text-4xl font-extrabold text-primary">+150</span>
            <p class="font-bold text-xs text-on-surface mt-1">Niños Felices</p>
            <span class="text-[11px] text-on-surface-variant">Acompañados activamente</span>
          </div>
          <div>
            <span class="text-3xl sm:text-4xl font-extrabold text-secondary-container">12</span>
            <p class="font-bold text-xs text-on-surface mt-1">Años de Trayectoria</p>
            <span class="text-[11px] text-on-surface-variant">Educación de vanguardia</span>
          </div>
          <div>
            <span class="text-3xl sm:text-4xl font-extrabold text-tertiary">100%</span>
            <p class="font-bold text-xs text-on-surface mt-1">Familias Conectadas</p>
            <span class="text-[11px] text-on-surface-variant">Monitoreo en app</span>
          </div>
          <div>
            <span class="text-3xl sm:text-4xl font-extrabold text-on-surface">5/5 ★</span>
            <p class="font-bold text-xs text-on-surface mt-1">Valoración Promedio</p>
            <span class="text-[11px] text-on-surface-variant">Satisfacción verificada</span>
          </div>
        </div>

      </div>
    </section>
  );
}