import kidsHero from '../img/kidsHero.jpg';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-12 lg:py-20 bg-slate-50 dark:bg-zinc-950 transition-colors duration-300" id="inicio">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Columna Texto */}
        <div className="lg:col-span-7 flex flex-col items-start">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-200/60 dark:bg-zinc-800/80 shadow-sm mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-bold text-xs text-primary uppercase tracking-wider">Centro de Estimulación Temprana</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            El Lugar Donde <span className="text-tertiary">Aprender</span> y <span className="text-primary-container">Crecer</span> es una{' '}
            <span className="text-secondary-container">Aventura</span>{' '}
            <span className="relative inline-block text-secondary-container pb-1">
              Mágica
              <svg
                className="absolute -left-[7.5%] -bottom-4 w-[115%] h-5 text-secondary-container pointer-events-none overflow-visible"
                viewBox="0 0 200 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 6,10 Q 100,6 194,10"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span> ✨
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
            Estimulación temprana, desarrollo psicomotor y aprendizaje activo para niños de 2 a 5 años en un entorno seguro, afectivo y guiado por la curiosidad natural.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <a 
              href="https://wa.me/" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-bold shadow-md hover:brightness-105 transition-all text-center"
            >
              <span className="material-symbols-outlined">chat</span>
              <span>Hablar por WhatsApp</span>
            </a>
            <a 
              href="#ubicacion" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-slate-200/70 dark:bg-zinc-800 text-slate-800 dark:text-zinc-100 font-bold hover:bg-slate-300 dark:hover:bg-zinc-700 transition-all text-center"
            >
              <span className="material-symbols-outlined">location_on</span>
              <span>Ver Ubicación</span>
            </a>
          </div>
        </div>

        {/* Columna Imagen Canvas */}
        <div className="lg:col-span-5 relative mt-6 lg:mt-0">
          <div className="bg-white dark:bg-zinc-900 rounded-2xl p-3 shadow-xl transition-colors duration-300">
            <div className="relative w-full h-[300px] sm:h-[380px] rounded-xl overflow-hidden">
              <img 
                className="w-full h-full object-cover" 
                alt="Niños en salón Montessori" 
                src={kidsHero} 
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-3 rounded-xl flex items-center justify-between shadow-md transition-colors duration-300">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                    <span className="material-symbols-outlined">auto_stories</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">Sesión Sensorial Activa</h4>
                    <p className="text-xs text-slate-500 dark:text-zinc-400">Motricidad Fina & Coordinación</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs">En Vivo</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}