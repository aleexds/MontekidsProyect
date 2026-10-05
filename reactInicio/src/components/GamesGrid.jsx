import { Link } from 'react-router-dom';

export function GamesGrid() {
  const handleCardAudio = (title, desc) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(`¡Vamos a jugar a ${title}! ${desc}`);
      utterance.lang = 'es-ES';
      utterance.rate = 0.95;
      utterance.pitch = 1.1;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Sección 1: Niñas y Niños de 2 a 4 Años
  const toddlerCards = [
    {
      title: "El trencito sonoro",
      tag: "Lectura Inicial",
      tagIcon: "menu_book",
      desc: "¡A llenar el trencito! Escucha el sonido y arrastra el dibujo con su pareja correcta.",
      badgeColor: "bg-primary-container/20 hover:bg-primary-container/30",
      btnBg: "bg-primary text-white shadow-[0_6px_0_#004f55,0_12px_24px_rgba(0,105,113,0.35)]",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5izjU_WrXFf7_vVRC39xOKdSRNqezjZGY3KaXAWS46sEzcvVVfzF7eGhiLGUVpA5ZJgib8QCwCCwqAi7ZKCM2U2q7ErmfCDT2hDmvXxXOjpUsT0DwhbEeVUMgdxuuEwwLazF1T0Pnfj7StEtM3pA5eH7esIK25I6JZfrFCMzO6vgNm2E_KeSfbxU7lmOCbSppTGATe0goU4AmK1FQNUcGUjENWUTLt-q_A79UUQP-fiQagZiUIrOsVg",
      actionText: "¡Jugar Ahora!",
      actionIcon: "rocket_launch",
      route: "/juegos/trencito-sonoro"
    },
    {
      title: "El Monstruo Glotón",
      tag: "Lógica y Coordinación",
      tagIcon: "category",
      desc: "¡Alimenta al monstruo! Toca y arrastra la figura de su color favorito a su boca.",
      badgeColor: "bg-secondary-container/40 hover:bg-secondary-container/40",
      btnBg: "bg-[#e67e00] hover:bg-[#cf7100] text-white shadow-[0_6px_0_#a85200,0_12px_24px_rgba(230,126,0,0.35)]",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzDXSzA7Lalu7kAzG_IwtQl4e8i9XCXtWezlsouBL5sa2s7xziZVLKaHphxqLR9hsxjDOG94GT7uRz9k8uL2nhtrwM2egVI0EgDeW4P0aYdtC1L9OEOX57367Rr4uzDSMlEKyJMS42twPLpBRkW4_Da9DAzYArDYT07IXJMIqvNNlm8naDIQMet8VM-kMMxCS942OLkanEzKio_E8DjjFF2yBEYdYc0HUIszTR33lMVVGf-uTc0akDpg",
      actionText: "¡Jugar Ahora!",
      actionIcon: "palette",
      route: "/juegos/monstruo-gloton"
    },
    {
      title: "La granja de patitos",
      tag: "Conteo y Matemáticas",
      tagIcon: "calculate",
      desc: "¡A nadar! Toca los patitos y llévalos al estanque uno por uno.",
      badgeColor: "bg-tertiary-container/30 hover:bg-tertiary-container/40",
      btnBg: "bg-tertiary text-white shadow-[0_6px_0_#8c0056,0_12px_24px_rgba(183,0,114,0.35)]",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMPw3vuotkqwsSgv30widDROEqcdEKUD04hzeAZ72nGSKj7vrhO26mhMUknFGj_GVO67h0MHYu2XxWaj1Ahwu63rvOmcKe8xUPRRd4qz5vchDuEclZAtWUq-XVexzzmzOev3IMxWnhjYMFkl6Hi7tFGBPesdtdxiFdC2qpEo0i7MSLJ3w2uF-Icx6Tk1Af69Dxt_AUGlCii0LoHW5ObhpZIsql-gUahASGXieLCu2K8gV7seBTHOUoJA",
      actionText: "¡Jugar Ahora!",
      actionIcon: "extension",
      route: "/juegos/granja-patitos"
    }
  ];

  // Sección 2: Grandes Desafíos (7 a 11 Años)
  const challengeCards = [
    {
      title: "Secuencia Maestra",
      tag: "Lógica y Patrones",
      tagIcon: "pattern",
      desc: "¡Memoriza el patrón completo de colores y formas, y repítelo en orden exacto! Desafía tu memoria visual.",
      badgeColor: "bg-violet-50 dark:bg-violet-950/20 hover:bg-violet-100/60 dark:hover:bg-violet-950/30",
      btnBg: "bg-gradient-to-r from-violet-500 to-indigo-600 text-white shadow-[0_6px_0_#3730a3,0_12px_24px_rgba(139,92,246,0.35)]",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuB5izjU_WrXFf7_vVRC39xOKdSRNqezjZGY3KaXAWS46sEzcvVVfzF7eGhiLGUVpA5ZJgib8QCwCCwqAi7ZKCM2U2q7ErmfCDT2hDmvXxXOjpUsT0DwhbEeVUMgdxuuEwwLazF1T0Pnfj7StEtM3pA5eH7esIK25I6JZfrFCMzO6vgNm2E_KeSfbxU7lmOCbSppTGATe0goU4AmK1FQNUcGUjENWUTLt-q_A79UUQP-fiQagZiUIrOsVg",
      actionText: "¡Jugar Ahora!",
      actionIcon: "extension",
      route: "/juegos/secuencia-maestra"
    },
    {
      title: "Sopa Estelar",
      tag: "Lectura y Vocabulario",
      tagIcon: "menu_book",
      desc: "¡Desliza el dedo para encontrar todas las palabras ocultas en la cuadrícula! Temas de planetas, naturaleza y más.",
      badgeColor: "bg-indigo-50 dark:bg-indigo-950/20 hover:bg-indigo-100/60 dark:hover:bg-indigo-950/30",
      btnBg: "bg-gradient-to-r from-indigo-500 to-cyan-600 text-white shadow-[0_6px_0_#1e3a8a,0_12px_24px_rgba(99,102,241,0.35)]",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzDXSzA7Lalu7kAzG_IwtQl4e8i9XCXtWezlsouBL5sa2s7xziZVLKaHphxqLR9hsxjDOG94GT7uRz9k8uL2nhtrwM2egVI0EgDeW4P0aYdtC1L9OEOX57367Rr4uzDSMlEKyJMS42twPLpBRkW4_Da9DAzYArDYT07IXJMIqvNNlm8naDIQMet8VM-kMMxCS942OLkanEzKio_E8DjjFF2yBEYdYc0HUIszTR33lMVVGf-uTc0akDpg",
      actionText: "¡Jugar Ahora!",
      actionIcon: "search",
      route: "/juegos/sopa-estelar"
    },
    {
      title: "El Mercado Numérico",
      tag: "Matemáticas Aplicadas",
      tagIcon: "calculate",
      desc: "¡Calcula el total de la compra multiplicando y sumando los precios para cobrarle al cliente correctamente!",
      badgeColor: "bg-emerald-50 dark:bg-emerald-950/20 hover:bg-emerald-100/60 dark:hover:bg-emerald-950/30",
      btnBg: "bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-[0_6px_0_#065f46,0_12px_24px_rgba(16,185,129,0.35)]",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMPw3vuotkqwsSgv30widDROEqcdEKUD04hzeAZ72nGSKj7vrhO26mhMUknFGj_GVO67h0MHYu2XxWaj1Ahwu63rvOmcKe8xUPRRd4qz5vchDuEclZAtWUq-XVexzzmzOev3IMxWnhjYMFkl6Hi7tFGBPesdtdxiFdC2qpEo0i7MSLJ3w2uF-Icx6Tk1Af69Dxt_AUGlCii0LoHW5ObhpZIsql-gUahASGXieLCu2K8gV7seBTHOUoJA",
      actionText: "¡Jugar Ahora!",
      actionIcon: "store",
      route: "/juegos/mercado-numerico"
    }
  ];

  const renderCardGrid = (cardList) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cardList.map((card, idx) => (
        <article
          key={idx}
          className={`group relative flex flex-col justify-between ${card.badgeColor} rounded-3xl p-6 shadow-md transition-all hover:-translate-y-2 duration-300 border border-surface-container-high/40`}
        >
          <div className="w-full flex items-center justify-between gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface font-bold text-xs shadow-sm">
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                {card.tagIcon}
              </span>
              <span>{card.tag}</span>
            </span>
          </div>

          <div className="relative w-full h-56 bg-surface-container-lowest rounded-2xl p-4 flex items-center justify-center overflow-hidden shadow-inner group-hover:scale-[1.02] transition-transform">
            <img src={card.img} alt={card.title} className="w-full h-full object-contain relative z-10" />
            <button
              onClick={() => handleCardAudio(card.title, card.desc)}
              className="absolute bottom-2 right-2 w-12 h-12 rounded-full bg-primary-container text-on-primary-container hover:scale-110 active:scale-95 flex items-center justify-center shadow-md z-20 cursor-pointer transition-transform"
              type="button"
              title="Escuchar descripción"
            >
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                volume_up
              </span>
            </button>
          </div>

          <div className="mt-4 mb-6">
            <h3 className="text-xl font-extrabold text-on-surface flex items-center gap-2">
              <span>{card.title}</span>
            </h3>
            <p className="text-sm font-medium text-on-surface-variant mt-1 leading-relaxed">{card.desc}</p>
          </div>

          {card.route ? (
            <Link
              to={card.route}
              className={`w-full py-3 px-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all ${card.btnBg} hover:opacity-95 active:scale-95`}
            >
              <span className="material-symbols-outlined text-lg">{card.actionIcon}</span>
              <span>{card.actionText}</span>
              <span className="material-symbols-outlined text-lg">play_arrow</span>
            </Link>
          ) : (
            <button
              className={`w-full py-3 px-4 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${card.btnBg} hover:opacity-95 active:scale-95`}
              type="button"
            >
              <span className="material-symbols-outlined text-lg">{card.actionIcon}</span>
              <span>{card.actionText}</span>
              <span className="material-symbols-outlined text-lg">play_arrow</span>
            </button>
          )}
        </article>
      ))}
    </div>
  );

  return (
    <div className="w-full flex flex-col gap-12 mb-10">
      {/* SECCIÓN 1: EDADES 2 A 4 AÑOS */}
      <section className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-2xl">child_care</span>
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-on-surface tracking-tight leading-tight">
                Primeros Pasos & Exploración Sensorial
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant font-medium">
                Misiones diseñadas para el desarrollo psicomotriz, auditivo y lenguaje temprano.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-primary/10 text-primary dark:text-primary-container rounded-full font-bold text-xs sm:text-sm border border-primary/20 w-fit shrink-0">
            <span className="material-symbols-outlined text-base">toys</span>
            <span>Para 2 a 4 Años</span>
          </span>
        </div>

        {renderCardGrid(toddlerCards)}
      </section>

      {/* SECCIÓN 2: GRANDES DESAFÍOS (7 A 11 AÑOS) */}
      <section className="w-full">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-2xl">psychology</span>
            </div>
            <div>
              <h2 className="text-2xl lg:text-3xl font-extrabold text-on-surface tracking-tight leading-tight">
                Grandes Desafíos & Lógica Divertida
              </h2>
              <p className="text-xs sm:text-sm text-on-surface-variant font-medium">
                Retos interactivos para fomentar el pensamiento lógico, conteo y lectoescritura.
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-violet-500/10 text-violet-700 dark:text-violet-300 rounded-full font-bold text-xs sm:text-sm border border-violet-500/20 w-fit shrink-0">
            <span className="material-symbols-outlined text-base">psychology</span>
            <span>Para 7 a 11 Años</span>
          </span>
        </div>

        {renderCardGrid(challengeCards)}
      </section>
    </div>
  );
}