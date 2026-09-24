

export default function Hero() {
  return (
    <section class="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-12 lg:py-20" id="inicio">
      <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Columna Texto */}
        <div class="lg:col-span-7 flex flex-col items-start">
          <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high shadow-sm mb-4">
            <span class="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
            <span class="font-bold text-xs text-primary uppercase tracking-wider">Centro de Estimulación Temprana</span>
          </div>

          <h1 class="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight leading-tight">
            El Lugar Donde <span class="text-tertiary">Aprender</span> y <span class="text-primary-container">Crecer</span> es una <span class="text-secondary-container">Aventura Mágica</span> ✨
          </h1>

          <p class="mt-4 text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Estimulación temprana, desarrollo psicomotor y aprendizaje activo para niños de 2 a 5 años en un entorno seguro, afectivo y guiado por la curiosidad natural.
          </p>

          <div class="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <a 
              href="https://wa.me/" 
              target="_blank" 
              rel="noreferrer"
              class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-bold shadow-md hover:brightness-105 transition-all text-center"
            >
              <span class="material-symbols-outlined">chat</span>
              <span>Hablar por WhatsApp</span>
            </a>
            <a 
              href="#ubicacion" 
              class="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-surface-container-high text-on-surface font-bold hover:bg-surface-container transition-all text-center"
            >
              <span class="material-symbols-outlined">location_on</span>
              <span>Ver Ubicación</span>
            </a>
          </div>
        </div>

        {/* Columna Imagen Canvas */}
        <div class="lg:col-span-5 relative mt-6 lg:mt-0">
          <div class="bg-surface-container-lowest rounded-2xl p-3 shadow-xl">
            <div class="relative w-full h-[300px] sm:h-[380px] rounded-xl overflow-hidden">
              <img 
                class="w-full h-full object-cover" 
                alt="Niños en salón Montessori" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFiZg0YoqUiKhrUk4PcNt58V1-83MKmUWZQBBzcSg24ZPxJWc7AYN2ZEGoEVdDQrnFk2m-c5cGRA3-vuz-QdgdQ5-ollTyVHy4PgjL0zPluqcAm0oIzsV2R_6h1lg0oJssyUMgwP8ztaKIYJu6dKeKPVoufwa52j7Z0x19Raxjzb3tu9oyPuCKnT_m5wqRyFPenKADXHS67tNmiuQxPYAD8a7EqYXE2D6EO7QBgmu2FjYpHaBB4-6R3w" 
              />
              <div class="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3 rounded-xl flex items-center justify-between shadow-md">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                    <span class="material-symbols-outlined">auto_stories</span>
                  </div>
                  <div>
                    <h4 class="font-bold text-sm text-on-surface">Sesión Sensorial Activa</h4>
                    <p class="text-xs text-on-surface-variant">Motricidad Fina & Coordinación</p>
                  </div>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs">En Vivo</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}