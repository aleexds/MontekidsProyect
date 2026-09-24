

export default function Programs() {
  return (
    <section class="w-full px-4 sm:px-6 lg:px-8 py-16" id="aulas">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-100 text-cyan-900 font-bold text-xs uppercase tracking-wider mb-2">
              <span class="material-symbols-outlined text-[14px]">school</span>
              <span>Programas Educativos</span>
            </div>
            <h2 class="text-3xl font-extrabold text-on-surface">Nuestras Aulas y Niveles de Desarrollo</h2>
            <p class="text-on-surface-variant mt-1 text-sm sm:text-base max-w-xl">
              Espacios especialmente preparados con mobiliario ergonómico a escala infantil y materiales autocorrectivos.
            </p>
          </div>
          <div class="hidden sm:flex items-center gap-2 text-sm font-bold">
            <span class="text-on-surface-variant">Ciclo Escolar 2027</span>
            <span class="w-2 h-2 rounded-full bg-amber-500"></span>
            <span class="text-amber-600">Matrículas Abiertas</span>
          </div>
        </div>

        {/* 3 Program Cards */}
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Aula 1: Semillitas */}
          <div class="bg-surface-container-lowest rounded-2xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden border-t-4 border-primary-container">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 rounded-full bg-cyan-100 text-primary font-bold text-xs">2 a 3 Años</span>
                <span class="material-symbols-outlined text-primary text-[28px]">spa</span>
              </div>
              <h3 class="text-2xl font-bold text-on-surface">Aula Semillitas</h3>
              <p class="text-xs text-on-surface-variant mt-2 mb-4">
                Estimulación sensorial profunda, primeras estructuras de comunicación, motricidad gruesa exploratoria y desapego seguro.
              </p>
              <div class="space-y-2 text-xs font-semibold text-on-surface border-t pt-3">
                <p><strong>Ratio:</strong> 1 Educadora por 5 niños</p>
                <p><strong>Capacidad:</strong> 10 niños máximo por sala</p>
                <p><strong>Jornada:</strong> Mañana (8:30 a 12:30)</p>
              </div>
            </div>
            <div class="mt-6 pt-4 border-t">
              <div class="w-full bg-surface-container-high rounded-full h-2.5 mb-2 overflow-hidden">
                <div class="bg-primary-container h-full rounded-full" style={{ width: '80%' }}></div>
              </div>
              <div class="flex justify-between text-xs font-bold mb-3">
                <span class="text-on-surface-variant">80% Cupos Asignados</span>
                <span class="text-primary">2 Lugares Libres</span>
              </div>
              <a href="#ubicacion" class="w-full py-2.5 rounded-full bg-surface-container-low text-primary font-bold text-xs flex items-center justify-center gap-1 hover:bg-primary-container hover:text-white transition-colors">
                <span>Consultar Cupo</span>
                <span class="material-symbols-outlined text-[16px]">chevron_right</span>
              </a>
            </div>
          </div>

          {/* Aula 2: Exploradores */}
          <div class="bg-surface-container-lowest rounded-2xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden border-t-4 border-tertiary">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 rounded-full bg-pink-100 text-tertiary font-bold text-xs">3 a 4 Años</span>
                <span class="material-symbols-outlined text-tertiary text-[28px]">explore</span>
              </div>
              <h3 class="text-2xl font-bold text-on-surface">Aula Exploradores</h3>
              <p class="text-xs text-on-surface-variant mt-2 mb-4">
                Desarrollo de lenguaje activo, socialización cooperativa, pensamiento prelógico y conquista de la autonomía cotidiana.
              </p>
              <div class="space-y-2 text-xs font-semibold text-on-surface border-t pt-3">
                <p><strong>Ratio:</strong> 1 Educadora por 7 niños</p>
                <p><strong>Capacidad:</strong> 14 niños máximo por sala</p>
                <p><strong>Jornada:</strong> Completa o Media Jornada</p>
              </div>
            </div>
            <div class="mt-6 pt-4 border-t">
              <div class="w-full bg-surface-container-high rounded-full h-2.5 mb-2 overflow-hidden">
                <div class="bg-tertiary h-full rounded-full" style={{ width: '65%' }}></div>
              </div>
              <div class="flex justify-between text-xs font-bold mb-3">
                <span class="text-on-surface-variant">65% Cupos Asignados</span>
                <span class="text-tertiary">5 Lugares Libres</span>
              </div>
              <a href="#ubicacion" class="w-full py-2.5 rounded-full bg-surface-container-low text-tertiary font-bold text-xs flex items-center justify-center gap-1 hover:bg-tertiary hover:text-white transition-colors">
                <span>Consultar Cupo</span>
                <span class="material-symbols-outlined text-[16px]">chevron_right</span>
              </a>
            </div>
          </div>

          {/* Aula 3: Creadores */}
          <div class="bg-surface-container-lowest rounded-2xl p-6 shadow-md flex flex-col justify-between relative overflow-hidden border-t-4 border-secondary-container">
            <div>
              <div class="flex items-center justify-between mb-4">
                <span class="px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold text-xs">4 a 5 Años</span>
                <span class="material-symbols-outlined text-secondary text-[28px]">brush</span>
              </div>
              <h3 class="text-2xl font-bold text-on-surface">Aula Creadores</h3>
              <p class="text-xs text-on-surface-variant mt-2 mb-4">
                Iniciación a la pre-lectoescritura fonética sensorial, motricidad fina refinada, proyectos científicos y retos lúdicos.
              </p>
              <div class="space-y-2 text-xs font-semibold text-on-surface border-t pt-3">
                <p><strong>Ratio:</strong> 1 Educadora por 8 niños</p>
                <p><strong>Capacidad:</strong> 16 niños máximo por sala</p>
                <p><strong>Jornada:</strong> Completa (8:30 a 16:30)</p>
              </div>
            </div>
            <div class="mt-6 pt-4 border-t">
              <div class="w-full bg-surface-container-high rounded-full h-2.5 mb-2 overflow-hidden">
                <div class="bg-secondary-container h-full rounded-full" style={{ width: '88%' }}></div>
              </div>
              <div class="flex justify-between text-xs font-bold mb-3">
                <span class="text-on-surface-variant">88% Cupos Asignados</span>
                <span class="text-amber-600">Últimos Cupos</span>
              </div>
              <a href="#ubicacion" class="w-full py-2.5 rounded-full bg-surface-container-low text-secondary font-bold text-xs flex items-center justify-center gap-1 hover:bg-secondary-container hover:text-white transition-colors">
                <span>Consultar Cupo</span>
                <span class="material-symbols-outlined text-[16px]">chevron_right</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}