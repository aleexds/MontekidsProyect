
import AnimatedInteractiveWord from './AnimatedInteractiveWord';

export function GamesHero() {
  const handleNarrator = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance("¡Hola Mateo! Bienvenido a Montekids. Toca tu juego favorito para ganar estrellas doradas hoy.");
      utterance.lang = 'es-ES';
      utterance.rate = 0.9;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section className="relative z-10 w-full pt-4 lg:pt-6 mb-8">
      <div className="bg-surface-container-lowest rounded-3xl p-6 lg:p-10 shadow-[0_12px_40px_-8px_rgba(78,0,222,0.12)] border-4 border-surface-container-high">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-center lg:text-left space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container text-xs text-primary font-bold shadow-sm">

              <span>¡Mundo de Juegos Montessori!</span>
              <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>magic_button</span>
            </div>
            
            {/* Título unificado con el mismo color base y animación interactiva por palabra/letra */}
            <h1 className="text-3xl lg:text-5xl font-extrabold tracking-tight leading-none flex flex-wrap justify-center lg:justify-start gap-x-3 gap-y-1">
              <AnimatedInteractiveWord 
                word="¡Aprende" 
                baseColorClass="text-slate-900 dark:text-white transition-colors duration-300" 
              />
              <AnimatedInteractiveWord 
                word="Jugando" 
                baseColorClass="text-slate-900 dark:text-white transition-colors duration-300" 
              />
              <AnimatedInteractiveWord 
                word="en" 
                baseColorClass="text-slate-900 dark:text-white transition-colors duration-300" 
              />
              <AnimatedInteractiveWord 
                word="Montekids!" 
                baseColorClass="text-slate-900 dark:text-white transition-colors duration-300" 
                autoAnimateOnMount={true}
              />
              <span className="inline-block">✨</span>
            </h1>

            <p className="text-lg text-on-surface-variant max-w-2xl leading-relaxed font-medium">
              Selecciona tu misión divertida de hoy, toca la pantalla y gana <strong className="text-secondary font-bold">estrellitas doradas</strong> <span className="material-symbols-outlined text-secondary text-base inline-block align-middle" style={{ fontVariationSettings: "'FILL' 1" }}>star</span> en cada paso.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <button 
                onClick={handleNarrator}
                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-tertiary text-on-tertiary font-bold shadow-[0_8px_0_#8c0056,0_16px_28px_rgba(183,0,114,0.35)] hover:shadow-[0_4px_0_#8c0056,0_8px_16px_rgba(183,0,114,0.35)] active:translate-y-1 transition-all cursor-pointer"
                type="button"
              >
                <span className="material-symbols-outlined text-xl group-hover:scale-125 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>volume_up</span>
                <span>¡Escuchar Audio!</span>
                <span className="inline-flex w-3 h-3 rounded-full bg-primary-container animate-ping"></span>
              </button>
              <div className="inline-flex items-center gap-2 px-4 py-3 rounded-full bg-secondary-fixed text-on-secondary-fixed shadow-[0_6px_0_#ffb95d,0_10px_20px_rgba(254,166,24,0.22)] font-bold">
                <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                <span className="flex items-center gap-1">
                  <span>3 Estrellas ganadas hoy</span>
                  <span className="inline-flex gap-0.5 text-secondary">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  </span>
                </span>
              </div>
            </div>
          </div>
          <div className="w-full sm:w-auto flex flex-col items-center justify-center p-6 bg-gradient-to-b from-surface-container to-surface-container-high rounded-2xl text-center shadow-inner">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-primary-container/40 animate-pulse"></div>
              <img className="w-28 h-28 object-contain rounded-full relative z-10 drop-shadow-[0_8px_12px_rgba(0,105,113,0.2)]" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCYsdOE06w7BVfWd4vWzKW5-MSY2DvSBT79BbanTNkK8eyKr87i_JXjX1kW3RslGil8yTyHBhnWxB5InpS4ILUlvp19TTnf1LXcWmRGt1VzIqrA-585t_MkS8B-lxTigxXgc7Ts-QPmrRymzjrSNMZlZqEWvxCXJTxlBzTK8IHlXQTq3OSugqCm2my1ejlUKUP3qB7H5Ug4eQDDOGVx23seb6qI0tEh3NN4vtMqRwsPsuZldTLGYLVWqw" alt="Mascota Chispa" />
            </div>
            <span className="mt-2 font-bold text-lg text-on-surface">Mascota Chispa</span>
            <span className="text-xs uppercase tracking-widest text-primary font-bold">¡Tu Guía Amigo!</span>
          </div>
        </div>
      </div>
    </section>
  );
}