import { useState, useEffect, useCallback } from 'react';
import { ParentHeader } from '../components/ParentHeader';
import { Link } from 'react-router-dom';
import { useAwardStars } from '../context/useAwardStars';
import Footer from '../components/Footer';

/* ─────────────────────────────────────────────
   HELPER DE SÍNTESIS DE VOZ INFANTIL
───────────────────────────────────────────── */
function speak(text, rate = 0.88, pitch = 1.3) {
  if (!('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'es-ES';
    utt.rate = rate;
    utt.pitch = pitch;
    window.speechSynthesis.speak(utt);
  } catch {
    // Si no está disponible no interrumpir el flujo
  }
}

/* ─────────────────────────────────────────────
   HELPERS DE AUDIO: EFECTOS SINTETIZADOS (WEB AUDIO API)
───────────────────────────────────────────── */
function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  return new AudioContextClass();
}

// Salpicadura de agua al zambullirse un patito
function playSplashSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Tono burbujeante rápido
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(580, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.22);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.26);
  } catch (err) {
    console.warn('Splash sound error', err);
  }
}

// Graznido simpático de patito ¡Cuac!
function playQuackSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.linearRampToValueAtTime(440, now + 0.08);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.22);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(950, now);
    filter.Q.setValueAtTime(3.5, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  } catch (err) {
    console.warn('Quack sound error', err);
  }
}

// Arpegio de victoria y campanas
function playCheerSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // Do, Mi, Sol, Do

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = now + idx * 0.1;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.22, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.38);
    });
  } catch (err) {
    console.warn('Cheer sound error', err);
  }
}

// Pop al interactuar
function playPopSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(380, now);
    osc.frequency.exponentialRampToValueAtTime(760, now + 0.07);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  } catch (err) {
    console.warn('Pop sound error', err);
  }
}

/* ───────�/* ─────────────────────────────────────────────
   GENERADOR DE RONDAS ALEATORIAS (límite 8)
───────────────────────────────────────────── */
const ROUND_TEMPLATES = [
  {
    id: 1,
    nivel: 1,
    nivelNombre: 'Nivel 1: Primeros Pasos',
    buildVoz: (n) => `Soy Mamá Pato. ¿Me ayudas? ¡Necesito ${n} ${n === 1 ? 'patito' : 'patitos'} en el agua!`,
    buildPista: (n) => `Lleva ${n} ${n === 1 ? 'patito' : 'patitos'} al estanque`,
  },
  {
    id: 2,
    nivel: 1,
    nivelNombre: 'Nivel 1: Primeros Pasos',
    buildVoz: (n) => `¡Muy bien! Ahora quiero ver a ${n} ${n === 1 ? 'patito' : 'patitos'} nadando juntos.`,
    buildPista: (n) => `Lleva ${n} ${n === 1 ? 'patito' : 'patitos'} al estanque`,
  },
  {
    id: 3,
    nivel: 2,
    nivelNombre: 'Nivel 2: Explorando el Estanque',
    buildVoz: (n) => `¡El agua está fresquita! Llevemos a ${n} ${n === 1 ? 'patito' : 'patitos'} al estanque.`,
    buildPista: (n) => `Lleva ${n} ${n === 1 ? 'patito' : 'patitos'} al estanque`,
  },
  {
    id: 4,
    nivel: 2,
    nivelNombre: 'Nivel 2: Explorando el Estanque',
    buildVoz: (n) => `¡A nadar! Busquemos a ${n} ${n === 1 ? 'patito' : 'patitos'} juguetones.`,
    buildPista: (n) => `Lleva ${n} ${n === 1 ? 'patito' : 'patitos'} al estanque`,
  },
  {
    id: 5,
    nivel: 3,
    nivelNombre: 'Nivel 3: El Gran Reto de la Granja',
    buildVoz: (n) => `¡El gran chap uzón final! ¡Llevemos a ${n} ${n === 1 ? 'patito' : 'patitos'} a nadar con Mamá Pato!`,
    buildPista: (n) => `Lleva ${n} ${n === 1 ? 'patito' : 'patitos'} al estanque`,
  },
  {
    id: 6,
    nivel: 3,
    nivelNombre: 'Nivel 3: El Gran Reto de la Granja',
    buildVoz: (n) => `¡Solo queda una ronda! ¡Pon ${n} ${n === 1 ? 'patito' : 'patitos'} en el estanque!`,
    buildPista: (n) => `Lleva ${n} ${n === 1 ? 'patito' : 'patitos'} al estanque`,
  },
];

function generateDuckRounds() {
  return ROUND_TEMPLATES.map((tpl) => {
    const target = Math.floor(Math.random() * 8) + 1; // 1 a 8
    return {
      id: tpl.id,
      nivel: tpl.nivel,
      nivelNombre: tpl.nivelNombre,
      target,
      totalDucks: target + 2, // siempre hay distractores de sobra
      instruccionVoz: tpl.buildVoz(target),
      pistas: tpl.buildPista(target),
    };
  });
}

/* Estrellas decorativas para el overlay de celebración */
const CELEBRATION_STARS = [
  { id: 1, top: '15%', left: '15%', size: '38px', color: '#ffa71a', delay: '0s', duration: '0.9s' },
  { id: 2, top: '22%', left: '78%', size: '44px', color: '#00dbeb', delay: '0.15s', duration: '1.1s' },
  { id: 3, top: '70%', left: '18%', size: '32px', color: '#f5009b', delay: '0.3s', duration: '0.8s' },
  { id: 4, top: '65%', left: '80%', size: '46px', color: '#ffb703', delay: '0.05s', duration: '1s' },
  { id: 5, top: '40%', left: '10%', size: '28px', color: '#006971', delay: '0.2s', duration: '1.2s' },
  { id: 6, top: '35%', left: '88%', size: '36px', color: '#a323d1', delay: '0.25s', duration: '0.95s' },
];

/* ─────────────────────────────────────────────
   ILUSTRACIÓN SVG: PATITO TIERNO
───────────────────────────────────────────── */
function LittleDuck({ isSwimming = false, isJumping = false, size = 68, duckNumber = null }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none transition-all duration-300 ${
        isJumping ? 'animate-duck-jump' : isSwimming ? 'animate-duck-swim' : 'hover:scale-110 active:scale-95'
      }`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="drop-shadow-md overflow-visible"
      >
        <defs>
          <linearGradient id="duckGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
          <linearGradient id="beakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>

        {/* Onditas bajo el pato si está nadando */}
        {isSwimming && (
          <ellipse
            cx="50"
            cy="84"
            rx="40"
            ry="9"
            fill="#38bdf8"
            opacity="0.5"
            className="animate-pulse"
          />
        )}

        {/* Colita del patito */}
        <path
          d="M 18 64 Q 6 56 12 44 Q 22 52 26 58"
          fill="url(#duckGrad)"
          stroke="#ca8a04"
          strokeWidth="2.5"
        />

        {/* Cuerpo gordito y suave */}
        <ellipse
          cx="48"
          cy="66"
          rx="32"
          ry="22"
          fill="url(#duckGrad)"
          stroke="#ca8a04"
          strokeWidth="2.5"
        />

        {/* Alita suave */}
        <path
          d="M 32 62 Q 44 54 56 64 Q 44 76 32 62 Z"
          fill="#fef08a"
          stroke="#ca8a04"
          strokeWidth="2"
        />

        {/* Cabeza redonda */}
        <circle
          cx="68"
          cy="42"
          r="20"
          fill="url(#duckGrad)"
          stroke="#ca8a04"
          strokeWidth="2.5"
        />

        {/* Mechón esponjoso de plumitas */}
        <path
          d="M 64 22 Q 68 14 74 22 Q 78 16 80 24"
          fill="none"
          stroke="#ca8a04"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Ojo grande y tierno */}
        <circle cx="73" cy="38" r="5" fill="#1e124a" />
        <circle cx="71.5" cy="36.5" r="1.8" fill="#ffffff" />

        {/* Mejilla sonrosada */}
        <ellipse cx="64" cy="46" rx="4.5" ry="3" fill="#f43f5e" opacity="0.5" />

        {/* Pico de pato simpático */}
        <path
          d="M 85 41 Q 99 44 86 50 Q 82 46 85 41 Z"
          fill="url(#beakGrad)"
          stroke="#c2410c"
          strokeWidth="2"
        />
      </svg>

      {/* Insignia con el número asignado en el conteo */}
      {duckNumber !== null && (
        <span className="absolute -top-2 -right-1 w-6 h-6 rounded-full bg-primary text-white font-black text-xs flex items-center justify-center shadow-md border-2 border-white animate-pop-bounce">
          {duckNumber}
        </span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   ILUSTRACIÓN SVG: MAMÁ PATO
───────────────────────────────────────────── */
function MamaDuck({ isHappy = false }) {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none transition-transform duration-300 ${
        isHappy ? 'animate-duck-jump' : 'hover:scale-105'
      }`}
    >
      <svg
        width="135"
        height="135"
        viewBox="0 0 100 100"
        className="drop-shadow-lg overflow-visible"
      >
        <defs>
          <linearGradient id="mamaDuckGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#eab308" />
          </linearGradient>
          <linearGradient id="mamaBeakGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
        </defs>

        {/* Onditas suaves de agua en la base */}
        <ellipse cx="48" cy="88" rx="42" ry="8" fill="#38bdf8" opacity="0.45" />

        {/* Colita tierna y levantada */}
        <path
          d="M 14 62 Q 2 52 10 42 Q 20 50 24 56"
          fill="url(#mamaDuckGrad)"
          stroke="#ca8a04"
          strokeWidth="2.5"
        />

        {/* Cuerpo gordito y suave */}
        <ellipse
          cx="46"
          cy="66"
          rx="34"
          ry="24"
          fill="url(#mamaDuckGrad)"
          stroke="#ca8a04"
          strokeWidth="2.5"
        />

        {/* Alita suave */}
        <path
          d="M 28 62 Q 42 52 56 64 Q 42 78 28 62 Z"
          fill="#fef08a"
          stroke="#ca8a04"
          strokeWidth="2"
        />

        {/* Cabeza redonda y limpia */}
        <circle
          cx="68"
          cy="38"
          r="22"
          fill="url(#mamaDuckGrad)"
          stroke="#ca8a04"
          strokeWidth="2.5"
        />

        {/* Mechón tierno en la coronilla */}
        <path
          d="M 64 18 Q 68 10 72 18 Q 76 12 78 20"
          fill="none"
          stroke="#ca8a04"
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Ojo grande, limpio y tierno */}
        <circle cx="73" cy="36" r="5" fill="#1e124a" />
        <circle cx="71.5" cy="34.5" r="1.8" fill="#ffffff" />

        {/* Mejilla sonrosada suave */}
        <ellipse cx="64" cy="44" rx="4.5" ry="3" fill="#f43f5e" opacity="0.5" />

        {/* Pico de pato limpio, redondeado y sonriente */}
        <path
          d="M 85 39 Q 99 42 86 48 Q 82 44 85 39 Z"
          fill="url(#mamaBeakGrad)"
          stroke="#c2410c"
          strokeWidth="2"
        />

        {/* Florcita tierna en la cabeza para Mamá Pato */}
        <g transform="translate(56, 19)">
          <circle cx="-3" cy="0" r="3" fill="#f43f5e" />
          <circle cx="3" cy="0" r="3" fill="#f43f5e" />
          <circle cx="0" cy="-3" r="3" fill="#f43f5e" />
          <circle cx="0" cy="3" r="3" fill="#f43f5e" />
          <circle cx="0" cy="0" r="2.2" fill="#fef08a" />
        </g>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONSTANTES
───────────────────────────────────────────── */
const NUMBER_WORDS = {
  1: '¡Uno!', 2: '¡Dos!', 3: '¡Tres!', 4: '¡Cuatro!', 5: '¡Cinco!',
  6: '¡Seis!', 7: '¡Siete!', 8: '¡Ocho!', 9: '¡Nueve!', 10: '¡Diez!'
};

/* ─────────────────────────────────────────────
   PÁGINA PRINCIPAL: LA GRANJA DE PATITOS
───────────────────────────────────────────── */
export function GranjaPatitosPage() {
  const [duckRounds]                    = useState(() => generateDuckRounds());
  const [roundIndex, setRoundIndex]     = useState(0);
  const [inWaterDucks, setInWaterDucks] = useState([]); // IDs de patitos que están en el agua
  const [isHoveringPond, setIsHoveringPond] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [isWaterSplashing, setIsWaterSplashing] = useState(false);
  const { awardStars } = useAwardStars();

  const [errorsCount, setErrorsCount] = useState(0);
  const [feedbackMessage, setFeedbackMessage] = useState(null);

  const round = duckRounds[roundIndex];
  const waterCount = inWaterDucks.length;

  // Generar lista fija de patitos para la ronda
  const shoreDucks = Array.from({ length: round.totalDucks }).map((_, i) => `duck-${round.id}-${i}`);

  // Reproducir audio de instrucción al iniciar ronda (solo speak, sin setState)
  useEffect(() => {
    const timer = setTimeout(() => {
      speak(round.instruccionVoz, 0.88, 1.25);
    }, 600);
    return () => clearTimeout(timer);
  }, [roundIndex, round.instruccionVoz]);

  // Manejador cuando un patito salta al agua (sin pasar de nivel automáticamente)
  const sendDuckToWater = useCallback(
    (duckId) => {
      if (inWaterDucks.includes(duckId) || showCelebration) return;

      const nextWater = [...inWaterDucks, duckId];
      const count = nextWater.length;

      // Sonido de chapuzón y graznido
      playSplashSound();
      setTimeout(playQuackSound, 120);

      setIsWaterSplashing(true);
      setTimeout(() => setIsWaterSplashing(false), 500);

      // Contar en voz alta y clara: "¡Uno!", "¡Dos!", etc.
      const word = NUMBER_WORDS[count] || `¡${count}!`;
      speak(word, 0.95, 1.35);

      setInWaterDucks(nextWater);
      setFeedbackMessage(null);
    },
    [inWaterDucks, showCelebration]
  );

  // Validación y envío de respuesta por medio del botón
  const handleSubmitAnswer = () => {
    if (showCelebration) return;

    if (waterCount === round.target) {
      setFeedbackMessage(null);
      playCheerSound();
      setShowCelebration(true);
      speak('¡Excelente trabajo!', 0.9, 1.25);

      const nextIndex = roundIndex + 1;
      setTimeout(() => {
        // Resetear estado de ronda antes de avanzar
        setShowCelebration(false);
        setInWaterDucks([]);
        setIsWaterSplashing(false);
        setFeedbackMessage(null);
        if (nextIndex < duckRounds.length) {
          setRoundIndex(nextIndex);
        } else {
          awardStars('granja-patitos', 'La Granja de Patitos', 10, '🐥', errorsCount);
          setGameFinished(true);
        }
      }, 3400);
    } else {
      setErrorsCount(e => e + 1);
      playQuackSound();
      if (waterCount === 0) {
        const msg = `¡El estanque está vacío! Lleva ${round.target} ${round.target === 1 ? 'patito' : 'patitos'} al agua antes de enviar tu respuesta.`;
        setFeedbackMessage(msg);
        speak(msg, 0.88, 1.2);
      } else if (waterCount < round.target) {
        const faltan = round.target - waterCount;
        const msg = `¡Aún faltan patitos! Pusiste ${waterCount} y necesitamos ${round.target}. Agrega ${faltan} ${faltan === 1 ? 'más' : 'más'}.`;
        setFeedbackMessage(msg);
        speak(msg, 0.88, 1.2);
      } else {
        const sobran = waterCount - round.target;
        const msg = `¡Hay demasiados patitos! Pusiste ${waterCount} y solo necesitábamos ${round.target}. Devuelve ${sobran} ${sobran === 1 ? 'patito' : 'patitos'} al estanque.`;
        setFeedbackMessage(msg);
        speak(msg, 0.88, 1.2);
      }
    }
  };

  // Sacar un patito del estanque de vuelta a la orilla
  const removeDuckFromWater = useCallback(
    (duckId) => {
      if (showCelebration) return;
      playPopSound();
      playQuackSound();

      const nextWater = inWaterDucks.filter((id) => id !== duckId);
      setInWaterDucks(nextWater);

      if (nextWater.length > 0) {
        const word = NUMBER_WORDS[nextWater.length] || `¡${nextWater.length}!`;
        speak(`Ahora quedan ${word}`, 0.9, 1.25);
      } else {
        speak('El estanque quedó vacío. ¡Agrega patitos!', 0.9, 1.25);
      }
    },
    [inWaterDucks, showCelebration]
  );

  // Drag and Drop
  const handleDragStart = (e, duckId) => {
    e.dataTransfer.setData('text/plain', duckId);
    playPopSound();
  };

  const handlePondDrop = (e) => {
    e.preventDefault();
    setIsHoveringPond(false);
    const duckId = e.dataTransfer.getData('text/plain');
    if (duckId) sendDuckToWater(duckId);
  };

  // Reiniciar juego completo
  const resetGame = () => {
    setRoundIndex(0);
    setInWaterDucks([]);
    setShowCelebration(false);
    setIsWaterSplashing(false);
    setFeedbackMessage(null);
    setGameFinished(false);
  };

  /* ─────────────────────────────────────────────
     PANTALLA FINAL DE CELEBRACIÓN (+10 ESTRELLAS)
  ───────────────────────────────────────────── */
  if (gameFinished) {
    return (
      <div className="bg-background font-sans text-on-surface antialiased min-h-screen flex flex-col">
        <ParentHeader customNavItems={[]} />
        <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-4 text-center">
          <div className="relative w-40 h-40 mx-auto mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-secondary-container/40 animate-ping" />
            <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-500 flex items-center justify-center shadow-2xl text-7xl">
              ♦
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-on-surface mb-3">
            ¡Misión Cumplida!
          </h1>
          <p className="text-lg text-on-surface-variant font-bold mb-2 max-w-md">
            ¡Todos los patitos aprendieron a nadar y Mamá Pato está muy feliz!
          </p>
          <p className="text-4xl font-black text-secondary mb-8">
            +10 Estrellas ⭐
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button
              onClick={resetGame}
              type="button"
              className="px-8 py-4 rounded-full bg-primary text-white font-extrabold text-base shadow-[0_6px_0_#004f55,0_12px_24px_rgba(0,105,113,0.35)] hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                replay
              </span>
              Jugar otra vez
            </button>
            <Link
              to="/juegos"
              className="px-8 py-4 rounded-full bg-surface-container text-on-surface font-extrabold text-base shadow-sm hover:bg-surface-container-high active:scale-95 transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-xl">
                arrow_back
              </span>
              Volver a Juegos
            </Link>
          </div>
        </main>
      </div>
    );
  }

  /* ─────────────────────────────────────────────
     INTERFAZ PRINCIPAL DEL JUEGO
  ───────────────────────────────────────────── */
  return (
    <div className="bg-background font-sans text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      <ParentHeader customNavItems={[]} />

      {/* Cartel flotante de felicitación entre rondas con fondo blanco */}
      {showCelebration && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden flex flex-col items-center justify-center bg-black/20 backdrop-blur-xs">
          {CELEBRATION_STARS.map((s) => (
            <span
              key={s.id}
              className="absolute material-symbols-outlined animate-ping"
              style={{
                top: s.top,
                left: s.left,
                fontSize: s.size,
                color: s.color,
                animationDelay: s.delay,
                animationDuration: s.duration,
                fontVariationSettings: "'FILL' 1",
              }}
            >
              star
            </span>
          ))}
          <div className="bg-white dark:bg-zinc-900 px-8 py-5 rounded-3xl shadow-2xl border-4 border-secondary-container text-center animate-pop-bounce">
            <h2 className="text-3xl font-black text-on-surface">¡Cuac Cuac! ★</h2>
            <p className="text-sm font-bold text-on-surface-variant mt-1">
              ¡Excelente trabajo!
            </p>
          </div>
        </div>
      )}

      <main className="w-full pt-20 bg-background flex-1 max-w-[1240px] mx-auto px-3 sm:px-6 lg:px-8 transition-colors duration-300 animate-page-bounce">
        <div className="flex flex-col w-full pb-16">

          {/* Orbes de fondo decorativos */}
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-24 left-10 w-72 h-72 rounded-full bg-primary-container/20 blur-3xl" />
            <div className="absolute top-0 right-16 w-80 h-80 rounded-full bg-amber-300/20 blur-3xl" />
            <div className="absolute top-80 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-emerald-200/20 blur-3xl" />
          </div>

          {/* ── HEADER SUPERIOR DEL JUEGO ── */}
          <section className="mt-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 flex items-center justify-center shadow-md text-3xl">
                ♦
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-on-surface leading-tight">
                  La Granja de Contar Patitos
                </h1>
                <p className="text-xs sm:text-sm font-bold text-on-surface-variant flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-tertiary-container/30 text-tertiary font-black">
                    2 a 4 años
                  </span>
                  <span>• Conteo oral y correspondencia uno a uno</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/juegos"
                className="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-sm"
              >
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Menú de Juegos
              </Link>
            </div>
          </section>

          {/* ── BARRA DE PROGRESO DE RONDAS ── */}
          <div className="w-full bg-white dark:bg-zinc-800/80 rounded-2xl p-4 shadow-sm border border-surface-container-high mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-tertiary text-white font-extrabold text-xs">
                Ronda {roundIndex + 1} de {duckRounds.length}
              </span>
              <span className="text-sm font-extrabold text-on-surface">
                {round.nivelNombre}
              </span>
            </div>

            {/* Pasos de progreso */}
            <div className="flex items-center gap-2">
              {duckRounds.map((r, i) => (
                <div
                  key={r.id}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    i === roundIndex
                      ? 'w-8 bg-amber-400'
                      : i < roundIndex
                      ? 'w-3 bg-tertiary'
                      : 'w-3 bg-surface-container-high'
                  }`}
                  title={`Ronda ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ── SECCIÓN DE MAMÁ PATO Y SU CONSIGNAS ── */}
          <div className="bg-white dark:bg-zinc-800 rounded-3xl p-5 sm:p-6 shadow-md border-2 border-amber-300/80 mb-6 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <MamaDuck isHappy={showCelebration} />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-extrabold text-xs">
                    Mamá Pato pide:
                  </span>
                  <button
                    onClick={() => speak(round.instruccionVoz, 0.88, 1.25)}
                    type="button"
                    className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container hover:scale-110 active:scale-95 flex items-center justify-center shadow-xs cursor-pointer"
                    title="Escuchar instrucción"
                  >
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                      volume_up
                    </span>
                  </button>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-on-surface">
                  ¡A nadar con {round.target} {round.target === 1 ? 'patito' : 'patitos'}! ♦
                </h2>
                <p className="text-xs sm:text-sm font-bold text-on-surface-variant mt-1">
                  Toca o arrastra los patitos de la orilla hacia el agua uno por uno.
                </p>
              </div>
            </div>

            {/* Ficha concreta de conteo (Siluetas y puntos) */}
            <div className="bg-surface-container-low dark:bg-zinc-900 rounded-2xl p-4 border border-surface-container-high flex flex-col items-center min-w-[200px]">
              <span className="text-xs font-bold text-on-surface-variant mb-2">
                Conteo en el agua:
              </span>
              <div className="flex items-center gap-2 mb-1">
                {Array.from({ length: round.target }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm border-2 transition-all duration-300 ${
                      idx < waterCount
                        ? 'bg-amber-400 border-amber-500 text-amber-950 shadow-md scale-110 animate-bounce'
                        : 'bg-white dark:bg-zinc-800 border-dashed border-slate-300 dark:border-zinc-700 text-slate-400'
                    }`}
                  >
                    {idx + 1}
                  </div>
                ))}
              </div>
              <span className="text-xs font-black text-primary dark:text-primary-container">
                {waterCount} de {round.target} patitos
              </span>
            </div>
          </div>

          {/* ── EL ESTANQUE INTERACTIVO (ZONA DE AGUA) ── */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsHoveringPond(true);
            }}
            onDragLeave={() => setIsHoveringPond(false)}
            onDrop={handlePondDrop}
            className={`relative w-full rounded-3xl min-h-[300px] sm:min-h-[360px] p-6 shadow-xl transition-all duration-300 overflow-hidden border-4 flex flex-col justify-between ${
              isHoveringPond
                ? 'border-amber-400 bg-sky-200/90 dark:bg-sky-950/70 scale-[1.01]'
                : 'border-sky-300 dark:border-sky-800 bg-gradient-to-b from-sky-100 via-sky-200 to-cyan-300 dark:from-sky-950/80 dark:via-sky-900/60 dark:to-cyan-950/80'
            }`}
          >
            {/* Elementos decorativos del estanque (Nenúfares, juncos y ondas) */}
            <div className="absolute top-4 left-6 pointer-events-none opacity-80 select-none">
              <span className="text-3xl">✿</span>
            </div>
            <div className="absolute bottom-4 right-8 pointer-events-none opacity-80 select-none">
              <span className="text-3xl">¥</span>
            </div>
            <div className="absolute top-8 right-16 pointer-events-none opacity-60 select-none">
              <span className="text-2xl">○</span>
            </div>

            {/* Efecto de salpicadura visual */}
            {isWaterSplashing && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-6xl animate-ping">∴</span>
              </div>
            )}

            {/* Barra informativa superior del estanque */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm text-sky-800 dark:text-sky-200 font-black text-xs shadow-sm">
                <span className="material-symbols-outlined text-sm text-sky-500">waves</span>
                El Estanque de los Patitos
              </span>

              {waterCount > 0 && (
                <span className="text-xs font-bold text-sky-900 dark:text-sky-200 bg-white/70 dark:bg-zinc-900/70 px-3 py-1 rounded-full backdrop-blur-xs">
                  Toca un patito en el agua para devolverlo a la orilla
                </span>
              )}
            </div>

            {/* Zona central donde flotan los patitos nadando */}
            <div className="relative z-10 flex-1 flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-6">
              {waterCount === 0 ? (
                <div className="flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-sky-400/50 rounded-2xl bg-white/30 dark:bg-zinc-900/30">
                  <span className="text-4xl mb-2 animate-bounce">≈</span>
                  <p className="text-sm font-black text-sky-900 dark:text-sky-100">
                    ¡El estanque está tranquilo y esperando a los patitos!
                  </p>
                  <p className="text-xs font-bold text-sky-700 dark:text-sky-300 mt-0.5">
                    Toca un patito de la orilla para que salte al agua.
                  </p>
                </div>
              ) : (
                inWaterDucks.map((duckId, index) => (
                  <button
                    key={duckId}
                    type="button"
                    onClick={() => removeDuckFromWater(duckId)}
                    className="cursor-pointer group focus:outline-none"
                    title="Toca para sacar del estanque"
                  >
                    <LittleDuck
                      isSwimming={true}
                      isJumping={showCelebration}
                      duckNumber={index + 1}
                      size={82}
                    />
                  </button>
                ))
              )}
            </div>

            {/* Fondo arenoso inferior del estanque */}
            <div className="relative z-10 text-center flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-sky-400/30">
              <span className="text-[11px] font-black tracking-wide text-sky-900/80 dark:text-sky-200/80 uppercase">
                Meta: {round.target} {round.target === 1 ? 'patito' : 'patitos'} en el agua
              </span>
              <button
                type="button"
                onClick={handleSubmitAnswer}
                className="px-4 py-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs shadow-sm hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">task_alt</span>
                Enviar respuesta
              </button>
            </div>
          </div>

          {/* ── BOTÓN PRINCIPAL ENVIAR RESPUESTA ── */}
          <div className="my-5 flex flex-col items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleSubmitAnswer}
              className="px-10 py-4 rounded-full font-black text-base sm:text-lg flex items-center gap-3 shadow-xl transition-all cursor-pointer active:scale-95 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-[0_6px_0_#065f46,0_12px_24px_rgba(16,185,129,0.35)]"
            >
              <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                task_alt
              </span>
              <span>Enviar respuesta</span>
              <span className="px-3 py-0.5 rounded-full bg-white/20 text-white text-xs font-black shadow-xs">
                {waterCount} de {round.target}
              </span>
            </button>

            {/* Mensaje de retroalimentación amigable si la cantidad no coincide al enviar */}
            {feedbackMessage && (
              <div className="bg-amber-100 dark:bg-amber-950/80 border-2 border-amber-300 dark:border-amber-700 text-amber-900 dark:text-amber-200 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-md animate-pop-bounce">
                <span className="material-symbols-outlined text-base text-amber-600 dark:text-amber-400">
                  info
                </span>
                <span>{feedbackMessage}</span>
              </div>
            )}
          </div>

          {/* ── LA ORILLA (ZONA CON LOS PATITOS LISTOS PARA NADAR) ── */}
          <section className="mt-2 bg-white dark:bg-zinc-800 rounded-3xl p-5 sm:p-7 shadow-md border-2 border-emerald-400/60">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-lg font-black text-on-surface flex items-center gap-2">
                  <span>¥ La Orilla Verde</span>
                </h3>
                <p className="text-xs font-bold text-on-surface-variant">
                  ¡Toca cualquier patito o arrástralo hacia el estanque para que comience a nadar!
                </p>
              </div>

              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 self-start sm:self-auto">
                Patitos en la orilla: {shoreDucks.length - waterCount}
              </span>
            </div>

            {/* Grid de patitos disponibles en la orilla */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
              {shoreDucks.map((duckId) => {
                const isInWater = inWaterDucks.includes(duckId);

                if (isInWater) {
                  return (
                    <div
                      key={duckId}
                      className="h-28 rounded-2xl border-2 border-dashed border-emerald-200 dark:border-zinc-700 flex flex-col items-center justify-center opacity-40 select-none"
                    >
                      <span className="text-xl">≈</span>
                      <span className="text-[10px] font-bold text-slate-400 mt-1">¡Nadando!</span>
                    </div>
                  );
                }

                return (
                  <button
                    key={duckId}
                    type="button"
                    draggable
                    onDragStart={(e) => handleDragStart(e, duckId)}
                    onClick={() => sendDuckToWater(duckId)}
                    className="h-28 rounded-2xl p-2 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 hover:scale-105 active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md border border-emerald-200 dark:border-emerald-800/50 flex flex-col items-center justify-center cursor-pointer group"
                    title="Toca para llevar al estanque"
                  >
                    <LittleDuck isSwimming={false} size={68} />
                    <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-300 mt-1 group-hover:underline">
                      ¡Al agua! ∴
                    </span>
                  </button>
                );
              })}
            </div>
          </section>

        </div>
      </main>

      <Footer />

      {/* ESTILOS Y ANIMACIONES PERSONALIZADAS */}
      <style>{`
        @keyframes duckSwim {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }

        .animate-duck-swim {
          animation: duckSwim 2.2s ease-in-out infinite;
        }

        @keyframes duckJump {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.15) translateY(-18px) rotate(-4deg); }
        }

        .animate-duck-jump {
          animation: duckJump 0.6s ease-in-out infinite;
        }

        @keyframes popBounce {
          0% { transform: scale(0.7); opacity: 0; }
          70% { transform: scale(1.08); }
          100% { transform: scale(1); opacity: 1; }
        }

        .animate-pop-bounce {
          animation: popBounce 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
}
