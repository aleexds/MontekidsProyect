import { useState, useEffect, useCallback } from 'react';
import { ParentHeader } from '../components/ParentHeader';
import { Link } from 'react-router-dom';
import { useAwardStars } from '../context/useAwardStars';

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

// Sonido divertido de masticar ¡Ñam ñam!
function playChompSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Tres pequeños mordiscos crujientes
    [0, 0.12, 0.24].forEach((t, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320 + i * 40, now + t);
      osc.frequency.exponentialRampToValueAtTime(120, now + t + 0.09);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now + t);

      gain.gain.setValueAtTime(0.001, now + t);
      gain.gain.linearRampToValueAtTime(0.18, now + t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.09);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + t);
      osc.stop(now + t + 0.1);
    });
  } catch (err) {
    console.warn('AudioContext chomp error', err);
  }
}

// Sonido gracioso de "¡Puaj!" / Resorte cómico al equivocarse
function playPuajSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    // Caída cómica de frecuencia
    osc.frequency.setValueAtTime(280, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.35);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.36);
  } catch (err) {
    console.warn('AudioContext puaj error', err);
  }
}

// Sonido alegre de campanas al completar ronda
function playCheerSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // Arpegio de victoria (Do - Mi - Sol - Do)
    const notes = [523.25, 659.25, 783.99, 1046.5];

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = now + idx * 0.1;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.2, t + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.38);
    });
  } catch (err) {
    console.warn('AudioContext cheer error', err);
  }
}

// Pop al seleccionar o tocar una figura
function playPopSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch (err) {
    console.warn('AudioContext pop error', err);
  }
}

/* ─────────────────────────────────────────────
   DEFINICIÓN DE FORMAS Y COLORES
───────────────────────────────────────────── */
const COLOR_CONFIG = {
  rojo: {
    nombre: 'Rojo',
    articulo: 'de color ROJO',
    bg: 'bg-red-500',
    border: 'border-red-600',
    text: 'text-red-600 dark:text-red-400',
    badge: 'bg-red-100 text-red-700 dark:bg-red-950/60 dark:text-red-300',
    hex: '#ef4444',
    emoji: '♥',
  },
  azul: {
    nombre: 'Azul',
    articulo: 'de color AZUL',
    bg: 'bg-blue-500',
    border: 'border-blue-600',
    text: 'text-blue-600 dark:text-blue-400',
    badge: 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300',
    hex: '#3b82f6',
    emoji: '≈',
  },
  amarillo: {
    nombre: 'Amarillo',
    articulo: 'de color AMARILLO',
    bg: 'bg-amber-400',
    border: 'border-amber-500',
    text: 'text-amber-600 dark:text-amber-300',
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
    hex: '#f59e0b',
    emoji: '◉',
  },
  verde: {
    nombre: 'Verde',
    articulo: 'de color VERDE',
    bg: 'bg-emerald-500',
    border: 'border-emerald-600',
    text: 'text-emerald-600 dark:text-emerald-400',
    badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300',
    hex: '#10b981',
    emoji: '◎',
  },
};

const SHAPE_CONFIG = {
  circulo: {
    nombre: 'Círculo',
    plural: 'CÍRCULOS',
    articulo: 'CÍRCULOS redonditos',
    emoji: '○',
  },
  cuadrado: {
    nombre: 'Cuadrado',
    plural: 'CUADRADOS',
    articulo: 'CUADRADOS de cuatro lados',
    emoji: '□',
  },
  triangulo: {
    nombre: 'Triángulo',
    plural: 'TRIÁNGULOS',
    articulo: 'TRIÁNGULOS de tres puntas',
    emoji: '△',
  },
  estrella: {
    nombre: 'Estrella',
    plural: 'ESTRELLAS',
    articulo: 'ESTRELLAS brillantes',
    emoji: '⭐',
  },
};

/* ─────────────────────────────────────────────
   NIVELES Y RONDAS EDUCATIVAS (2 A 4 AÑOS)
───────────────────────────────────────────── */
const GAME_ROUNDS = [
  // ── ETAPA 1: COLOR (Ideal para 2 años - Discriminación visual directa) ──
  {
    id: 1,
    nivel: 1,
    nivelNombre: 'Nivel 1: Descubriendo Colores',
    criterio: 'color',
    colorReq: 'rojo',
    formaReq: null,
    tituloPeticion: '¡Quiero comida de color ROJO!',
    descVoz: 'Soy el Monstruo Glotón. ¡Tengo mucha hambre de figuras rojas! Dame figuras de color rojo.',
    pistas: 'Busca todo lo que sea rojo como una fresa ♥',
    targetCount: 3,
    items: [
      { id: 'item-1-1', forma: 'circulo', color: 'rojo' },
      { id: 'item-1-2', forma: 'cuadrado', color: 'azul' },
      { id: 'item-1-3', forma: 'triangulo', color: 'rojo' },
      { id: 'item-1-4', forma: 'estrella', color: 'amarillo' },
      { id: 'item-1-5', forma: 'cuadrado', color: 'rojo' },
      { id: 'item-1-6', forma: 'circulo', color: 'verde' },
    ],
  },
  {
    id: 2,
    nivel: 1,
    nivelNombre: 'Nivel 1: Descubriendo Colores',
    criterio: 'color',
    colorReq: 'azul',
    formaReq: null,
    tituloPeticion: '¡Ahora se me antoja el color AZUL!',
    descVoz: '¡Mmm, qué rico! Ahora mi pancita quiere solo figuras de color azul.',
    pistas: 'Busca las figuras azules como el mar ≈',
    targetCount: 3,
    items: [
      { id: 'item-2-1', forma: 'estrella', color: 'azul' },
      { id: 'item-2-2', forma: 'circulo', color: 'rojo' },
      { id: 'item-2-3', forma: 'cuadrado', color: 'azul' },
      { id: 'item-2-4', forma: 'triangulo', color: 'amarillo' },
      { id: 'item-2-5', forma: 'triangulo', color: 'azul' },
      { id: 'item-2-6', forma: 'cuadrado', color: 'verde' },
    ],
  },

  // ── ETAPA 2: FORMA (2 a 3 años - Discriminación geométrica) ──
  {
    id: 3,
    nivel: 2,
    nivelNombre: 'Nivel 2: Explorando Formas',
    criterio: 'forma',
    colorReq: null,
    formaReq: 'circulo',
    tituloPeticion: '¡Hoy mi estómago solo quiere CÍRCULOS!',
    descVoz: '¡Delicioso! Ahora tengo antojo de círculos bien redonditos de cualquier color.',
    pistas: 'Busca cualquier círculo, sin esquinas ni puntitas ○',
    targetCount: 3,
    items: [
      { id: 'item-3-1', forma: 'circulo', color: 'amarillo' },
      { id: 'item-3-2', forma: 'cuadrado', color: 'amarillo' },
      { id: 'item-3-3', forma: 'circulo', color: 'verde' },
      { id: 'item-3-4', forma: 'triangulo', color: 'rojo' },
      { id: 'item-3-5', forma: 'circulo', color: 'azul' },
      { id: 'item-3-6', forma: 'estrella', color: 'rojo' },
    ],
  },
  {
    id: 4,
    nivel: 2,
    nivelNombre: 'Nivel 2: Explorando Formas',
    criterio: 'forma',
    colorReq: null,
    formaReq: 'triangulo',
    tituloPeticion: '¡Quiero TRIÁNGULOS con tres piquitos!',
    descVoz: '¡Genial! Ahora quiero comer triángulos crujientes de tres puntas.',
    pistas: 'Busca las figuras que tienen tres piquitos △',
    targetCount: 3,
    items: [
      { id: 'item-4-1', forma: 'triangulo', color: 'verde' },
      { id: 'item-4-2', forma: 'circulo', color: 'rojo' },
      { id: 'item-4-3', forma: 'triangulo', color: 'rojo' },
      { id: 'item-4-4', forma: 'cuadrado', color: 'azul' },
      { id: 'item-4-5', forma: 'triangulo', color: 'amarillo' },
      { id: 'item-4-6', forma: 'estrella', color: 'verde' },
    ],
  },

  // ── ETAPA 3: FORMA Y COLOR COMBINADOS (3 a 4 años - Doble atributo) ──
  {
    id: 5,
    nivel: 3,
    nivelNombre: 'Nivel 3: El Gran Reto Glotón',
    criterio: 'ambos',
    colorReq: 'amarillo',
    formaReq: 'cuadrado',
    tituloPeticion: '¡Quiero CUADRADOS AMARILLOS!',
    descVoz: '¡Atención, este es un gran reto! Solo quiero comer CUADRADOS que sean de color AMARILLO.',
    pistas: 'Debe ser cuadrado Y también amarillo como queso ◈',
    targetCount: 2,
    items: [
      { id: 'item-5-1', forma: 'cuadrado', color: 'amarillo' }, // Correcto
      { id: 'item-5-2', forma: 'cuadrado', color: 'azul' },     // Distractor forma
      { id: 'item-5-3', forma: 'circulo', color: 'amarillo' },   // Distractor color
      { id: 'item-5-4', forma: 'cuadrado', color: 'amarillo' }, // Correcto
      { id: 'item-5-5', forma: 'triangulo', color: 'rojo' },
      { id: 'item-5-6', forma: 'estrella', color: 'amarillo' },
    ],
  },
  {
    id: 6,
    nivel: 3,
    nivelNombre: 'Nivel 3: El Gran Reto Glotón',
    criterio: 'ambos',
    colorReq: 'verde',
    formaReq: 'circulo',
    tituloPeticion: '¡Último bocado: CÍRCULOS VERDES!',
    descVoz: '¡Para el postre final quiero CÍRCULOS VERDES como ricas manzanitas!',
    pistas: 'Debe ser redondito Y de color verde como manzana ◎',
    targetCount: 2,
    items: [
      { id: 'item-6-1', forma: 'circulo', color: 'verde' },   // Correcto
      { id: 'item-6-2', forma: 'triangulo', color: 'verde' },  // Distractor color
      { id: 'item-6-3', forma: 'circulo', color: 'rojo' },    // Distractor forma
      { id: 'item-6-4', forma: 'circulo', color: 'verde' },   // Correcto
      { id: 'item-6-5', forma: 'cuadrado', color: 'verde' },
      { id: 'item-6-6', forma: 'estrella', color: 'azul' },
    ],
  },
];

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
   COMPONENTE: FIGURA GEOMÉTRICA DIBUJADA CON CARITA
───────────────────────────────────────────── */
function ShapeSvg({ forma, color, size = 64 }) {
  const c = COLOR_CONFIG[color] || COLOR_CONFIG.rojo;
  const hex = c.hex;

  // Renderizado SVG con carita tierna (ojitos y sonrisa)
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-md select-none">
      {forma === 'circulo' && (
        <circle cx="50" cy="50" r="44" fill={hex} stroke="#ffffff" strokeWidth="4" />
      )}
      {forma === 'cuadrado' && (
        <rect x="8" y="8" width="84" height="84" rx="16" fill={hex} stroke="#ffffff" strokeWidth="4" />
      )}
      {forma === 'triangulo' && (
        <polygon
          points="50,8 92,86 8,86"
          fill={hex}
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      )}
      {forma === 'estrella' && (
        <polygon
          points="50,6 63,34 94,36 70,58 78,88 50,72 22,88 30,58 6,36 37,34"
          fill={hex}
          stroke="#ffffff"
          strokeWidth="4"
          strokeLinejoin="round"
        />
      )}

      {/* Carita tierna dentro de la figura */}
      <circle cx={forma === 'triangulo' ? 42 : 38} cy={forma === 'triangulo' ? 56 : 44} r="4.5" fill="#1e124a" />
      <circle cx={forma === 'triangulo' ? 58 : 62} cy={forma === 'triangulo' ? 56 : 44} r="4.5" fill="#1e124a" />
      <circle cx={forma === 'triangulo' ? 43 : 39} cy={forma === 'triangulo' ? 54 : 42} r="1.5" fill="#ffffff" />
      <circle cx={forma === 'triangulo' ? 59 : 63} cy={forma === 'triangulo' ? 54 : 42} r="1.5" fill="#ffffff" />

      {/* Sonrisa alegre */}
      <path
        d={forma === 'triangulo' ? 'M 44 64 Q 50 70 56 64' : 'M 40 54 Q 50 62 60 54'}
        stroke="#1e124a"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Mejillas sonrosadas */}
      <ellipse cx={forma === 'triangulo' ? 36 : 30} cy={forma === 'triangulo' ? 62 : 52} rx="4" ry="2.5" fill="#ffffff" opacity="0.6" />
      <ellipse cx={forma === 'triangulo' ? 64 : 70} cy={forma === 'triangulo' ? 62 : 52} rx="4" ry="2.5" fill="#ffffff" opacity="0.6" />
    </svg>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE: EL MONSTRUO GLOTÓN (MASCOTA INTERACTIVA)
───────────────────────────────────────────── */
function GlotonMonster({
  state, // 'idle' | 'hungry' | 'chewing' | 'puaj'
  isHovered,
  onDropItem,
  onTapMouth,
  targetCount,
  eatenCount,
}) {
  const isMouthOpen = state === 'hungry' || isHovered;

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Contenedor principal del Monstruo */}
      <div
        className={`relative transition-all duration-300 ${
          state === 'puaj'
            ? 'animate-shake-monster'
            : state === 'chewing'
            ? 'animate-bounce-chew'
            : isMouthOpen
            ? 'scale-105'
            : 'hover:scale-102'
        }`}
      >
        <svg
          width="280"
          height="290"
          viewBox="0 0 280 290"
          className="drop-shadow-2xl overflow-visible"
        >
          <defs>
            {/* Gradientes del Monstruo (Piel color turquesa / menta Montekids) */}
            <linearGradient id="monsterBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00dbeb" />
              <stop offset="100%" stopColor="#006971" />
            </linearGradient>
            <linearGradient id="monsterBelly" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#f3e8ff" />
            </linearGradient>
            <linearGradient id="hornGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffb703" />
              <stop offset="100%" stopColor="#fb8500" />
            </linearGradient>
            <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Patitas suaves */}
          <ellipse cx="90" cy="265" rx="26" ry="14" fill="#005c63" />
          <ellipse cx="190" cy="265" rx="26" ry="14" fill="#005c63" />
          <circle cx="80" cy="268" r="4" fill="#ffffff" opacity="0.6" />
          <circle cx="90" cy="270" r="4" fill="#ffffff" opacity="0.6" />
          <circle cx="100" cy="268" r="4" fill="#ffffff" opacity="0.6" />
          <circle cx="180" cy="268" r="4" fill="#ffffff" opacity="0.6" />
          <circle cx="190" cy="270" r="4" fill="#ffffff" opacity="0.6" />
          <circle cx="200" cy="268" r="4" fill="#ffffff" opacity="0.6" />

          {/* Brazos tiernos */}
          <path
            d={isMouthOpen ? 'M 35 155 Q 10 130 30 110' : 'M 35 160 Q 15 175 40 195'}
            stroke="#006971"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d={isMouthOpen ? 'M 245 155 Q 270 130 250 110' : 'M 245 160 Q 265 175 240 195'}
            stroke="#006971"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
          />

          {/* Cuernitos tiernos y esponjosos */}
          <path
            d="M 75 65 Q 55 20 85 22 Q 95 38 90 60"
            fill="url(#hornGrad)"
            stroke="#ffffff"
            strokeWidth="3"
          />
          <path
            d="M 205 65 Q 225 20 195 22 Q 185 38 190 60"
            fill="url(#hornGrad)"
            stroke="#ffffff"
            strokeWidth="3"
          />

          {/* Mechón de pelito en la coronilla */}
          <path
            d="M 130 45 Q 140 20 148 44 Q 155 25 158 48"
            fill="#00dbeb"
            stroke="#ffffff"
            strokeWidth="2.5"
          />

          {/* CUERPO DEL MONSTRUO (Forma suave y achuchable) */}
          <path
            d="M 60 120 C 50 60, 230 60, 220 120 C 235 190, 225 260, 140 260 C 55 260, 45 190, 60 120 Z"
            fill={state === 'puaj' ? '#a3e635' : 'url(#monsterBody)'}
            stroke="#ffffff"
            strokeWidth="4"
            className="transition-colors duration-300"
          />

          {/* Pancita clara con medidor */}
          <ellipse
            cx="140"
            cy="195"
            rx="62"
            ry="48"
            fill="url(#monsterBelly)"
            stroke="#e0f2fe"
            strokeWidth="3"
          />

          {/* Manchas decorativas en la piel */}
          <circle cx="75" cy="100" r="6" fill="#ffffff" opacity="0.4" />
          <circle cx="88" cy="92" r="4" fill="#ffffff" opacity="0.4" />
          <circle cx="205" cy="100" r="6" fill="#ffffff" opacity="0.4" />
          <circle cx="192" cy="92" r="4" fill="#ffffff" opacity="0.4" />

          {/* OJOS GRANDES Y EXPRESIVOS */}
          {state === 'puaj' ? (
            /* Ojos mareados / disgustados al equivocarse */
            <g>
              <circle cx="105" cy="92" r="22" fill="#ffffff" stroke="#1e124a" strokeWidth="4" />
              <path d="M 94 84 L 116 100 M 116 84 L 94 100" stroke="#1e124a" strokeWidth="4" strokeLinecap="round" />
              <circle cx="175" cy="92" r="22" fill="#ffffff" stroke="#1e124a" strokeWidth="4" />
              <path d="M 164 84 L 186 100 M 186 84 L 164 100" stroke="#1e124a" strokeWidth="4" strokeLinecap="round" />
            </g>
          ) : (
            /* Ojos normales / mirando con ilusión */
            <g>
              <circle cx="105" cy="92" r="22" fill="#ffffff" stroke="#1e124a" strokeWidth="4" />
              <circle
                cx={isMouthOpen ? 105 : 108}
                cy={isMouthOpen ? 98 : 94}
                r="11"
                fill="#1d1149"
                className="transition-all duration-200"
              />
              <circle cx="102" cy="90" r="4" fill="#ffffff" />
              <circle cx="110" cy="98" r="2" fill="#ffffff" />

              <circle cx="175" cy="92" r="22" fill="#ffffff" stroke="#1e124a" strokeWidth="4" />
              <circle
                cx={isMouthOpen ? 175 : 172}
                cy={isMouthOpen ? 98 : 94}
                r="11"
                fill="#1d1149"
                className="transition-all duration-200"
              />
              <circle cx="172" cy="90" r="4" fill="#ffffff" />
              <circle cx="180" cy="98" r="2" fill="#ffffff" />
            </g>
          )}

          {/* Pestañitas / cejas */}
          <path d="M 88 66 Q 105 60 120 68" stroke="#1d1149" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M 160 68 Q 175 60 192 66" stroke="#1d1149" strokeWidth="3.5" strokeLinecap="round" fill="none" />

          {/* Mejillas sonrosadas */}
          <circle cx="68" cy="120" r="10" fill="#f43f5e" opacity={state === 'puaj' ? 0.2 : 0.65} />
          <circle cx="212" cy="120" r="10" fill="#f43f5e" opacity={state === 'puaj' ? 0.2 : 0.65} />

          {/* ── BOCA INTERACTIVA DEL MONSTRUO ── */}
          {state === 'puaj' ? (
            /* Boca con mueca y lengua afuera "¡PUAJ!" */
            <g>
              <path
                d="M 105 148 Q 140 135 175 148"
                stroke="#1d1149"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Lengua rosada afuera con gotitas cómicas */}
              <path
                d="M 130 146 Q 140 178 150 146 Z"
                fill="#f43f5e"
                stroke="#1d1149"
                strokeWidth="3"
              />
              <circle cx="120" cy="165" r="3" fill="#a3e635" />
              <circle cx="160" cy="168" r="2.5" fill="#a3e635" />
            </g>
          ) : state === 'chewing' ? (
            /* Boca masticando con mejillas hinchadas */
            <g>
              <ellipse cx="140" cy="144" rx="28" ry="14" fill="#1d1149" />
              <ellipse cx="140" cy="146" rx="20" ry="8" fill="#f43f5e" />
              {/* Dientitos superiores e inferiores */}
              <polygon points="128,132 134,139 140,132" fill="#ffffff" />
              <polygon points="140,132 146,139 152,132" fill="#ffffff" />
            </g>
          ) : isMouthOpen ? (
            /* Boca ABIERTA DE PAR EN PAR para recibir comida */
            <g>
              {/* Cavidad bucal profunda */}
              <ellipse
                cx="140"
                cy="150"
                rx="42"
                ry="32"
                fill="#1d1149"
                stroke="#1d1149"
                strokeWidth="4"
              />
              {/* Lengua adentro */}
              <ellipse cx="140" cy="164" rx="26" ry="14" fill="#f43f5e" />
              {/* Dientecitos amigables */}
              <polygon points="120,122 126,132 132,122" fill="#ffffff" />
              <polygon points="134,122 140,132 146,122" fill="#ffffff" />
              <polygon points="148,122 154,132 160,122" fill="#ffffff" />
            </g>
          ) : (
            /* Boca sonriente normal en reposo */
            <g>
              <path
                d="M 112 135 Q 140 162 168 135"
                stroke="#1d1149"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Dientito travieso asomándose */}
              <polygon points="135,142 140,149 145,142" fill="#ffffff" stroke="#1d1149" strokeWidth="1.5" />
            </g>
          )}

          {/* Partículas / Migajas de comida al masticar */}
          {state === 'chewing' && (
            <g className="animate-ping">
              <circle cx="85" cy="135" r="4" fill="#f59e0b" />
              <circle cx="195" cy="140" r="5" fill="#ef4444" />
              <circle cx="95" cy="165" r="3.5" fill="#10b981" />
              <circle cx="185" cy="165" r="4" fill="#3b82f6" />
            </g>
          )}
        </svg>

        {/* Zona receptora Drop / Click para la boca */}
        <div
          onDragOver={(e) => {
            e.preventDefault();
          }}
          onDrop={(e) => {
            e.preventDefault();
            const itemId = e.dataTransfer.getData('text/plain');
            if (itemId) onDropItem(itemId);
          }}
          onClick={onTapMouth}
          className="absolute top-[115px] left-[90px] w-[100px] h-[75px] rounded-full flex items-center justify-center cursor-pointer transition-all duration-200"
          title="¡Alimenta al monstruo aquí!"
        >
          {isMouthOpen && (
            <span className="text-[11px] font-black text-amber-800 dark:text-amber-200 bg-white/95 dark:bg-zinc-900/95 px-2.5 py-1 rounded-full shadow-md animate-bounce pointer-events-none border border-amber-200 dark:border-amber-700/50">
              ¡Suelta aquí!
            </span>
          )}
        </div>
      </div>

      {/* Glotómetro en la pancita (Progreso de la ronda) */}
      <div className="mt-2 bg-white dark:bg-zinc-800/90 px-4 py-1.5 rounded-full border-2 border-primary/20 shadow-md flex items-center gap-2">
        <span className="text-xs font-black text-primary dark:text-primary-container">
          Pancita:
        </span>
        <div className="flex items-center gap-1.5">
          {Array.from({ length: targetCount }).map((_, idx) => (
            <span
              key={idx}
              className={`material-symbols-outlined text-lg transition-transform duration-300 ${
                idx < eatenCount
                  ? 'text-amber-400 scale-110 animate-bounce'
                  : 'text-slate-300 dark:text-zinc-600'
              }`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              cookie
            </span>
          ))}
        </div>
        <span className="text-xs font-bold text-on-surface-variant">
          ({eatenCount}/{targetCount})
        </span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PÁGINA PRINCIPAL: EL MONSTRUO GLOTÓN
───────────────────────────────────────────── */
export function MonstruoGlotonPage() {
  const [roundIndex, setRoundIndex]       = useState(0);
  const [eatenIds, setEatenIds]           = useState([]);
  const [selectedId, setSelectedId]       = useState(null);
  const [isDragging, setIsDragging]       = useState(false);
  const [monsterState, setMonsterState]   = useState('idle'); // 'idle' | 'hungry' | 'chewing' | 'puaj'
  const [wrongFlashId, setWrongFlashId]   = useState(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [gameFinished, setGameFinished]   = useState(false);
  const { awardStars } = useAwardStars();

  const round = GAME_ROUNDS[roundIndex];
  const eatenCount = eatenIds.length;

  // Audio de bienvenida y consigna de cada ronda
  useEffect(() => {
    // Hablar la consigna con voz animada después de un breve delay
    const timer = setTimeout(() => {
      speak(round.descVoz, 0.88, 1.25);
    }, 600);

    return () => clearTimeout(timer);
  }, [roundIndex, round.descVoz]);

  // Verificar si un item cumple con la consigna actual
  const checkItemMatch = useCallback(
    (item) => {
      if (!item) return false;
      if (round.criterio === 'color') {
        return item.color === round.colorReq;
      }
      if (round.criterio === 'forma') {
        return item.forma === round.formaReq;
      }
      if (round.criterio === 'ambos') {
        return item.color === round.colorReq && item.forma === round.formaReq;
      }
      return false;
    },
    [round]
  );

  // Acción de alimentar al monstruo con una figura
  const feedMonsterWithItem = useCallback(
    (itemId) => {
      if (monsterState === 'chewing' || eatenIds.includes(itemId)) return;

      const item = round.items.find((i) => i.id === itemId);
      if (!item) return;

      const isCorrect = checkItemMatch(item);

      if (isCorrect) {
        // ¡ACIERTO! El monstruo come alegremente
        playChompSound();
        setMonsterState('chewing');
        const nextEaten = [...eatenIds, itemId];
        setEatenIds(nextEaten);
        setSelectedId(null);

        const elogios = ['¡Ñam ñam! ¡Qué rico!', '¡Mmm, deliciosa figura!', '¡Delicioso, me encanta!', '¡Bravo! ¡Qué rica comida!'];
        const randomElogio = elogios[Math.floor(Math.random() * elogios.length)];
        speak(randomElogio, 0.92, 1.3);

        // Comprobar si completó la ronda
        if (nextEaten.length >= round.targetCount) {
          setTimeout(() => {
            playCheerSound();
            setShowCelebration(true);
            speak('¡Hurra! ¡Pancita llena! ¡Pasamos al siguiente reto!', 0.9, 1.25);
          }, 900);

          setTimeout(() => {
            const nextRound = roundIndex + 1;
            if (nextRound < GAME_ROUNDS.length) {
              setMonsterState('idle');
              setEatenIds([]);
              setSelectedId(null);
              setShowCelebration(false);
              setRoundIndex(nextRound);
            } else {
              awardStars('monstruo-gloton', 'El Monstruo Glotón', 10);
              setGameFinished(true);
            }
          }, 3200);
        } else {
          // Volver a estado normal después de masticar
          setTimeout(() => {
            setMonsterState('idle');
          }, 1100);
        }
      } else {
        // ERROR: Gesto gracioso de puaj y regreso de la figura
        playPuajSound();
        setMonsterState('puaj');
        setWrongFlashId(itemId);
        speak('¡Puaj! ¡Esa figura no me gusta! Recuerda lo que me gusta comer.', 0.88, 1.2);

        setTimeout(() => {
          setWrongFlashId(null);
          setMonsterState('idle');
          setSelectedId(null);
        }, 1100);
      }
    },
    [monsterState, eatenIds, round, checkItemMatch, roundIndex, awardStars]
  );

  // Manejo de Drag and Drop
  const handleDragStart = (e, item) => {
    setIsDragging(true);
    setMonsterState('hungry');
    setSelectedId(item.id);
    e.dataTransfer.setData('text/plain', item.id);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (monsterState !== 'chewing' && monsterState !== 'puaj') {
      setMonsterState('idle');
    }
  };

  // Manejo de Click / Tap (Para niños pequeños en móviles y tablets)
  const handleCardClick = (item) => {
    if (eatenIds.includes(item.id)) return;
    playPopSound();

    if (selectedId === item.id) {
      setSelectedId(null);
      setMonsterState('idle');
    } else {
      setSelectedId(item.id);
      setMonsterState('hungry');
      const nombreColor = COLOR_CONFIG[item.color]?.nombre || '';
      const nombreForma = SHAPE_CONFIG[item.forma]?.nombre || '';
      speak(`${nombreForma} ${nombreColor}`, 0.95, 1.2);
    }
  };

  // Tocar la boca cuando una figura está seleccionada
  const handleTapMouth = () => {
    if (selectedId) {
      feedMonsterWithItem(selectedId);
    } else {
      // Repetir pedido si tocan la boca sin comida
      speak(round.descVoz, 0.88, 1.25);
    }
  };

  // Reiniciar juego completo
  const resetGame = () => {
    setRoundIndex(0);
    setEatenIds([]);
    setSelectedId(null);
    setMonsterState('idle');
    setGameFinished(false);
    setShowCelebration(false);
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
            <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-secondary-container to-amber-500 flex items-center justify-center shadow-2xl text-7xl">
              ¤
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-on-surface mb-3">
            ¡Misión Cumplida!
          </h1>
          <p className="text-lg text-on-surface-variant font-bold mb-2 max-w-md">
            ¡El Monstruo Glotón quedó muy feliz y con su pancita llena de figuras!
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
     INTERFAZ PRINCIPAL DE JUEGO
  ───────────────────────────────────────────── */
  return (
    <div className="bg-background font-sans text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      <ParentHeader customNavItems={[]} />

      {/* Cartel flotante de felicitación entre rondas (con fondo blanco sólido) */}
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
            <h2 className="text-3xl font-black text-on-surface">¡Ñam Ñam! ★</h2>
            <p className="text-sm font-bold text-on-surface-variant mt-1">
              ¡Pancita llena! Pasando al siguiente reto...
            </p>
          </div>
        </div>
      )}

      <main className="w-full pt-20 bg-background flex-1 max-w-[1240px] mx-auto px-3 sm:px-6 lg:px-8 transition-colors duration-300">
        <div className="flex flex-col w-full pb-16">

          {/* Orbes de fondo decorativos */}
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-24 left-10 w-72 h-72 rounded-full bg-secondary-container/20 blur-3xl" />
            <div className="absolute top-0 right-16 w-80 h-80 rounded-full bg-primary-container/20 blur-3xl" />
            <div className="absolute top-80 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-amber-200/20 blur-3xl" />
          </div>

          {/* ── HEADER SUPERIOR DEL JUEGO ── */}
          <section className="mt-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md text-3xl">
                ¤
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-on-surface leading-tight">
                  El Monstruo Glotón de Formas
                </h1>
                <p className="text-xs sm:text-sm font-bold text-on-surface-variant flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-secondary-container/30 text-secondary font-black">
                    2 a 4 años
                  </span>
                  <span>• Clasificación por forma y color</span>
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

          {/* ── BARRA DE PROGRESO DE NIVELES ── */}
          <div className="w-full bg-white dark:bg-zinc-800/80 rounded-2xl p-4 shadow-sm border border-surface-container-high mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-primary text-white font-extrabold text-xs">
                Ronda {roundIndex + 1} de {GAME_ROUNDS.length}
              </span>
              <span className="text-sm font-extrabold text-on-surface">
                {round.nivelNombre}
              </span>
            </div>

            {/* Pasos / Puntos de progreso */}
            <div className="flex items-center gap-2">
              {GAME_ROUNDS.map((r, i) => (
                <div
                  key={r.id}
                  className={`h-3 rounded-full transition-all duration-300 ${
                    i === roundIndex
                      ? 'w-8 bg-amber-400'
                      : i < roundIndex
                      ? 'w-3 bg-primary'
                      : 'w-3 bg-surface-container-high'
                  }`}
                  title={`Ronda ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* ── SECCIÓN CENTRAL: EL MONSTRUO Y SU PEDIDO ── */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">

            {/* Columna Izquierda / Superior: Diálogo de Glotón */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-white dark:bg-zinc-800 rounded-3xl p-6 shadow-md border-2 border-secondary-container relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-container/30 text-secondary font-black text-xs">
                    <span className="material-symbols-outlined text-sm">restaurant</span>
                    ¡Alimenta a la mascota!
                  </span>

                  <button
                    onClick={() => speak(round.descVoz, 0.88, 1.25)}
                    type="button"
                    className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container hover:scale-110 active:scale-95 flex items-center justify-center shadow-sm cursor-pointer transition-transform"
                    title="Escuchar qué quiere comer"
                  >
                    <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                      volume_up
                    </span>
                  </button>
                </div>

                {/* Gran título de lo que busca */}
                <h2 className="text-2xl sm:text-3xl font-black text-on-surface mb-2 leading-tight">
                  {round.tituloPeticion}
                </h2>

                <p className="text-sm font-bold text-on-surface-variant mb-4">
                  {round.pistas}
                </p>

                {/* Muestra visual gigante del objetivo */}
                <div className="bg-surface-container-low rounded-2xl p-4 border border-surface-container-high flex items-center justify-around">
                  <div className="flex flex-col items-center">
                    <span className="text-xs font-bold text-on-surface-variant mb-1">
                      {round.criterio === 'color'
                        ? 'Color pedido:'
                        : round.criterio === 'forma'
                        ? 'Forma pedida:'
                        : 'Forma y Color:'}
                    </span>
                    <div className="flex items-center gap-2">
                      {round.colorReq && (
                        <span className={`px-3 py-1 rounded-full font-black text-xs ${COLOR_CONFIG[round.colorReq].badge}`}>
                          {COLOR_CONFIG[round.colorReq].nombre} {COLOR_CONFIG[round.colorReq].emoji}
                        </span>
                      )}
                      {round.formaReq && (
                        <span className="px-3 py-1 rounded-full font-black text-xs bg-primary/10 text-primary dark:text-primary-container">
                          {SHAPE_CONFIG[round.formaReq].nombre} {SHAPE_CONFIG[round.formaReq].emoji}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Ejemplo visual */}
                  <div className="p-2 bg-white dark:bg-zinc-900 rounded-xl shadow-inner">
                    <ShapeSvg
                      forma={round.formaReq || 'circulo'}
                      color={round.colorReq || 'rojo'}
                      size={48}
                    />
                  </div>
                </div>

                {/* Botón rápido de alimentar si hay una figura seleccionada */}
                {selectedId && (
                  <div className="mt-4 pt-4 border-t border-surface-container-high flex items-center justify-between animate-fade-in">
                    <span className="text-xs font-extrabold text-amber-600 dark:text-amber-400">
                      ¡Figura lista para comer!
                    </span>
                    <button
                      onClick={handleTapMouth}
                      type="button"
                      className="px-4 py-2 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-xs shadow-md active:scale-95 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">restaurant</span>
                      ¡Dar a Glotón!
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Columna Derecha / Central: El Monstruo Glotón */}
            <div className="lg:col-span-7 flex flex-col items-center justify-center py-4">
              <GlotonMonster
                state={monsterState}
                isHovered={isDragging}
                onDropItem={feedMonsterWithItem}
                onTapMouth={handleTapMouth}
                targetCount={round.targetCount}
                eatenCount={eatenCount}
              />
            </div>
          </div>

          {/* ── BANDEJA DE FIGURAS PARA ARRASTRAR O TOCAR ── */}
          <section className="mt-8 bg-white dark:bg-zinc-800 rounded-3xl p-5 sm:p-7 shadow-md border-2 border-surface-container-high">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
              <div>
                <h3 className="text-lg font-black text-on-surface flex items-center gap-2">
                  <span>╬ Bandeja de Figuras</span>
                </h3>
                <p className="text-xs font-bold text-on-surface-variant">
                  Arrastra la figura correcta hacia la boca del monstruo, o tócala y presiona "Dar a Glotón".
                </p>
              </div>

              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 self-start sm:self-auto">
                Quedan por comer: {round.targetCount - eatenCount}
              </span>
            </div>

            {/* Grid de Figuras Geométricas */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {round.items.map((item) => {
                const isEaten = eatenIds.includes(item.id);
                const isSelected = selectedId === item.id;
                const isFlashingWrong = wrongFlashId === item.id;
                const colorInfo = COLOR_CONFIG[item.color];
                const shapeInfo = SHAPE_CONFIG[item.forma];

                if (isEaten) {
                  // Espacio vacío con silueta transparente
                  return (
                    <div
                      key={item.id}
                      className="h-32 rounded-2xl border-2 border-dashed border-slate-200 dark:border-zinc-700 flex flex-col items-center justify-center opacity-30 select-none"
                    >
                      <span className="text-2xl">✦</span>
                      <span className="text-[10px] font-bold text-slate-400 mt-1">¡Comido!</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragEnd={handleDragEnd}
                    onClick={() => handleCardClick(item)}
                    className={`h-36 rounded-2xl p-3 flex flex-col items-center justify-between cursor-grab active:cursor-grabbing select-none transition-all duration-200 ${
                      isSelected
                        ? 'ring-4 ring-amber-400 scale-105 shadow-xl bg-amber-50 dark:bg-amber-950/30'
                        : isFlashingWrong
                        ? 'ring-4 ring-red-500 bg-red-100 dark:bg-red-950/40 animate-shake-monster'
                        : 'bg-surface-container-low hover:bg-surface-container hover:scale-105 shadow-sm hover:shadow-md border border-surface-container-high'
                    }`}
                  >
                    {/* Indicador superior de tipo */}
                    <span className="text-[10px] font-black uppercase tracking-wider text-on-surface-variant">
                      {shapeInfo.nombre}
                    </span>

                    {/* SVG de la figura */}
                    <div className="flex-1 flex items-center justify-center">
                      <ShapeSvg forma={item.forma} color={item.color} size={64} />
                    </div>

                    {/* Etiqueta inferior con el color */}
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${colorInfo.badge}`}>
                      {colorInfo.nombre}
                    </span>
                  </div>
                );
              })}
            </div>
          </section>

        </div>
      </main>

      {/* ESTILOS Y ANIMACIONES PERSONALIZADAS */}
      <style>{`
        @keyframes shakeMonster {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-10px) rotate(-3deg); }
          40% { transform: translateX(10px) rotate(3deg); }
          60% { transform: translateX(-8px) rotate(-2deg); }
          80% { transform: translateX(8px) rotate(2deg); }
        }

        .animate-shake-monster {
          animation: shakeMonster 0.6s ease-in-out;
        }

        @keyframes bounceChew {
          0%, 100% { transform: scale(1) translateY(0); }
          25% { transform: scale(1.06, 0.94) translateY(4px); }
          50% { transform: scale(0.96, 1.04) translateY(-6px); }
          75% { transform: scale(1.04, 0.97) translateY(2px); }
        }

        .animate-bounce-chew {
          animation: bounceChew 0.45s ease-in-out infinite;
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
