import kidsHero from '../img/kidsHero.jpg';
import AnimatedInteractiveWord from './AnimatedInteractiveWord';

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-8 py-12 lg:py-20 transition-colors duration-300" id="inicio">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Columna Texto */}
        <div className="lg:col-span-7 flex flex-col items-start">
          
          {/* Badge Superior */}
          <div className="animate-pop-bounce inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-high shadow-sm mb-4 transition-colors">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
            <span className="font-bold text-xs text-primary uppercase tracking-wider">Centro de Estimulación Temprana</span>
          </div>

          {/* Título Principal con Letras Interactivas (Hover Color Aleatorio) */}
          <h1 className="animate-pop-bounce delay-100 text-3xl sm:text-5xl lg:text-6xl font-extrabold text-on-surface tracking-tight leading-tight transition-colors">
            El Lugar Donde{' '}
            <AnimatedInteractiveWord 
              word="Aprender" 
              baseColorClass="text-tertiary" 
            />
            {' '}y{' '}
            <AnimatedInteractiveWord 
              word="Crecer" 
              baseColorClass="text-primary-container" 
            />
            {' '}es una{' '}
            <AnimatedInteractiveWord 
              word="Aventura" 
              baseColorClass="text-secondary-container" 
            />
            {' '}
            <span className="relative inline-block pb-1">
              <AnimatedInteractiveWord 
                word="Mágica" 
                baseColorClass="text-secondary-container" 
              />
              <svg
                className="absolute -left-[7.5%] -bottom-4 w-[115%] h-5 text-secondary-container pointer-events-none overflow-visible"
                viewBox="0 0 200 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="animate-draw-underline"
                  d="M 6,10 Q 100,6 194,10"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span> <span className="inline-block animate-float">✨</span>
          </h1>

          {/* Descripción */}
          <p className="animate-pop-bounce delay-200 mt-4 text-base sm:text-lg text-on-surface-variant max-w-2xl leading-relaxed transition-colors">
            Estimulación temprana, desarrollo psicomotor y aprendizaje activo para niños de 2 a 5 años en un entorno seguro, afectivo y guiado por la curiosidad natural.
          </p>

          {/* Botones */}
          <div className="animate-pop-bounce delay-300 mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
            <a 
              href="https://wa.me/" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-white font-bold shadow-md hover:scale-105 active:scale-95 transition-all duration-200 text-center"
            >
              <span className="material-symbols-outlined">chat</span>
              <span>Hablar por WhatsApp</span>
            </a>
            <a 
              href="#ubicacion" 
              className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-surface-container-high text-on-surface font-bold hover:bg-surface-container-low hover:scale-105 active:scale-95 transition-all duration-200 text-center"
            >
              <span className="material-symbols-outlined">location_on</span>
              <span>Ver Ubicación</span>
            </a>
          </div>
        </div>

        {/* Columna Imagen Canvas */}
        <div className="animate-pop-bounce delay-200 lg:col-span-5 relative mt-6 lg:mt-0">
          <div className="bg-surface-container-lowest dark:bg-zinc-900 rounded-2xl p-3 shadow-xl transition-colors hover:shadow-2xl duration-300">
            <div className="relative w-full h-[300px] sm:h-[380px] rounded-xl overflow-hidden group">
              <img 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                alt="Niños en salón Montessori" 
                src={kidsHero} 
              />
              
              {/* Tarjeta flotante inferior opaca */}
              <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest dark:bg-zinc-900 p-3.5 rounded-xl flex items-center justify-between shadow-lg border border-surface-container-high/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold animate-bounce">
                    <span className="material-symbols-outlined">auto_stories</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-on-surface">Sesión Sensorial Activa</h4>
                    <p className="text-xs text-on-surface-variant">Motricidad Fina & Coordinación</p>
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