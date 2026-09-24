

export default function CtaBanner() {
  return (
    <section class="w-full px-4 sm:px-6 lg:px-8 py-12" id="visita">
      <div class="max-w-7xl mx-auto">
        <div class="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#4E00DE] to-[#A323D1] text-white p-8 sm:p-12 lg:p-16 shadow-2xl">
          
          {/* Elementos decorativos de fondo */}
          <div class="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none"></div>
          <div class="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-amber-400/20 blur-3xl pointer-events-none"></div>

          <div class="relative z-10 max-w-3xl flex flex-col items-start">
            <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-white font-bold text-xs uppercase tracking-wider mb-4">
              <span class="material-symbols-outlined text-[18px]">stars</span>
              <span>Admisiones 2027</span>
            </div>

            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              ¿Listo para impulsar el futuro de tu pequeño?
            </h2>

            <p class="mt-4 text-sm sm:text-base lg:text-lg text-white/90 max-w-2xl leading-relaxed">
              Cupos limitados para el ciclo escolar 2027. Agenda hoy mismo tu visita guiada presencial o virtual y descubre cómo hacemos de cada descubrimiento una experiencia inolvidable.
            </p>

            <div class="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
              <a 
                href="https://wa.me/" 
                target="_blank" 
                rel="noreferrer"
                class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-on-surface font-bold text-sm shadow-lg hover:bg-slate-100 transition-all text-center"
              >
                <span class="material-symbols-outlined text-emerald-600 text-[22px]">chat</span>
                <span>Chatear por WhatsApp</span>
              </a>
            </div>

            <div class="mt-6 flex flex-wrap items-center gap-4 text-white/80 text-xs sm:text-sm font-medium">
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">schedule</span> Respuesta inmediata
              </span>
              <span>•</span>
              <span class="flex items-center gap-1">
                <span class="material-symbols-outlined text-[16px]">location_on</span> Recorrido personalizado de 40 min
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}