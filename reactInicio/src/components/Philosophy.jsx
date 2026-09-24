

export default function Philosophy() {
  return (
    <section class="w-full px-4 sm:px-6 lg:px-8 py-16 bg-surface-container-low/60" id="filosofia">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-3xl mx-auto mb-12">
          <span class="inline-block px-4 py-1 rounded-full bg-tertiary-container/40 text-on-tertiary-container font-bold text-xs uppercase tracking-wide mb-2">
            Filosofía & Metodología AMI
          </span>
          <h2 class="text-3xl sm:text-4xl font-extrabold text-on-surface">
            Nuestra Filosofía y Metodología Pedagógica
          </h2>
          <p class="mt-2 text-sm sm:text-base text-on-surface-variant">
            Tres pilares diseñados para respetar los periodos sensitivos, la curiosidad innata y el neurodesarrollo integral.
          </p>
        </div>

        {/* 3 Bento Cards */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div class="group bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div class="w-14 h-14 rounded-2xl bg-pink-100 flex items-center justify-center text-tertiary mb-4">
                <span class="material-symbols-outlined text-[32px]">extension</span>
              </div>
              <span class="inline-block px-2.5 py-0.5 rounded bg-tertiary/10 text-tertiary font-bold text-xs mb-2">
                Desarrollo 360°
              </span>
              <h3 class="text-xl font-bold text-on-surface mb-2">Estimulación Temprana Integral 🧠</h3>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Integración de hitos cognitivos, motores, sensoriales y socio-lingüísticos mediante exploración con material concreto Montessori.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t flex items-center justify-between text-xs font-bold text-tertiary uppercase">
              <span>Circuitos Sensoriomotores</span>
              <span class="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>

          {/* Card 2 */}
          <div class="group bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div class="w-14 h-14 rounded-2xl bg-cyan-100 flex items-center justify-center text-primary mb-4">
                <span class="material-symbols-outlined text-[32px]">devices</span>
              </div>
              <span class="inline-block px-2.5 py-0.5 rounded bg-primary/10 text-primary font-bold text-xs mb-2">
                Conexión Continua
              </span>
              <h3 class="text-xl font-bold text-on-surface mb-2">Acompañamiento a Familias 📱</h3>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Acceso exclusivo para apoderados: bitácora diaria en tiempo real, registro fotográfico de logros y comunicación directa.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t flex items-center justify-between text-xs font-bold text-primary uppercase">
              <span>Montekids App Familiar</span>
              <span class="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>

          {/* Card 3 */}
          <div class="group bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
            <div>
              <div class="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center text-secondary mb-4">
                <span class="material-symbols-outlined text-[32px]">psychology_alt</span>
              </div>
              <span class="inline-block px-2.5 py-0.5 rounded bg-secondary/10 text-secondary font-bold text-xs mb-2">
                Innovación Pedagógica
              </span>
              <h3 class="text-xl font-bold text-on-surface mb-2">Seguimiento Continuo con IA 🌟</h3>
              <p class="text-sm text-on-surface-variant leading-relaxed">
                Sinergia entre educadoras de excelencia y análisis adaptativo para sugerir dinámicas personalizadas al ritmo de cada niño.
              </p>
            </div>
            <div class="mt-6 pt-4 border-t flex items-center justify-between text-xs font-bold text-secondary uppercase">
              <span>Planes Personalizados</span>
              <span class="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}