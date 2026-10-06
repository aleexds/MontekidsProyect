import { useState, useEffect, useCallback, useRef } from 'react';
import { ParentHeader } from '../components/ParentHeader';
import { Link } from 'react-router-dom';
import { useAwardStars } from '../context/useAwardStars';
import Footer from '../components/Footer';
import duckImg from '../img/duck.jpeg';
import frogImg from '../img/frog.jpg';
import catImg from '../img/cat.jpg';
import chickImg from '../img/chicken.jpg';

/* ─────────────────────────────────────────────
   IMÁGENES REALES DE ANIMALES (Unsplash)
───────────────────────────────────────────── */
const ANIMAL_IMGS = {
  Perro:   'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80&auto=format&fit=crop',
  Vaca:    'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?w=400&q=80&auto=format&fit=crop',
  Pato:    duckImg,
  Gato:    catImg,
  León:    'https://images.unsplash.com/photo-1546182990-dffeafbe841d?w=400&q=80&auto=format&fit=crop',
  Rana:    frogImg,
  Oveja:   'https://images.unsplash.com/photo-1484557985045-edf25e08da73?w=400&q=80&auto=format&fit=crop',
  Cerdo:   'https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=400&q=80&auto=format&fit=crop',
  Pollito: chickImg,
};

/* ─────────────────────────────────────────────
   DATOS DE LAS RONDAS
───────────────────────────────────────────── */
const ROUNDS = [
  {
    id: 1,
    title: 'Animales de Granja y Hogar',
    wagons: [
      { id: 'w1', animal: 'Perro',   sound: 'Guau',  letra: 'G', color: 'from-amber-400 to-orange-500',   accent: '#f97316' },
      { id: 'w2', animal: 'Vaca',    sound: 'Muu',   letra: 'M', color: 'from-emerald-400 to-teal-600',   accent: '#0d9488' },
      { id: 'w3', animal: 'Pato',    sound: 'Cuac',  letra: 'C', color: 'from-sky-400 to-blue-600',       accent: '#2563eb' },
    ],
  },
  {
    id: 2,
    title: 'Amigos de la Naturaleza',
    wagons: [
      { id: 'w1', animal: 'Gato',    sound: 'Miau',  letra: 'M', color: 'from-violet-400 to-purple-600',  accent: '#9333ea' },
      { id: 'w2', animal: 'León',    sound: 'Roar',  letra: 'R', color: 'from-yellow-400 to-amber-600',   accent: '#d97706' },
      { id: 'w3', animal: 'Rana',    sound: 'Croac', letra: 'C', color: 'from-lime-400 to-emerald-600',   accent: '#16a34a' },
    ],
  },
  {
    id: 3,
    title: 'Pequeños del Campo',
    wagons: [
      { id: 'w1', animal: 'Oveja',   sound: 'Bee',   letra: 'B', color: 'from-pink-400 to-rose-600',      accent: '#e11d48' },
      { id: 'w2', animal: 'Cerdo',   sound: 'Oink',  letra: 'O', color: 'from-fuchsia-400 to-pink-500',   accent: '#db2777' },
      { id: 'w3', animal: 'Pollito', sound: 'Pío',   letra: 'P', color: 'from-amber-300 to-yellow-500',   accent: '#ca8a04' },
    ],
  },
];

/* ─────────────────────────────────────────────
   VALORES ALEATORIOS PRE-GENERADOS PARA ESTRELLAS
───────────────────────────────────────────── */
const CELEBRATION_STARS = Array.from({ length: 10 }, (_, i) => ({
  id: i,
  top:      `${8  + ((i * 37) % 78)}%`,
  left:     `${4  + ((i * 59) % 92)}%`,
  size:     `${18 + ((i * 7)  % 26)}px`,
  delay:    `${((i * 13) % 8) / 10}s`,
  duration: `${0.6 + ((i * 19) % 7) / 10}s`,
  color:    i % 3 === 0 ? '#ffa71a' : i % 3 === 1 ? '#00dbeb' : '#f5009b',
}));

/* Barajar determinísticamente */
function shuffleDeterministic(arr, seed) {
  return [...arr].sort((a, b) => {
    const ha = (a.id.charCodeAt(1) * (seed + 1) * 31) % 17;
    const hb = (b.id.charCodeAt(1) * (seed + 2) * 31) % 17;
    return ha - hb;
  });
}

/* ─────────────────────────────────────────────
   HELPER DE SÍNTESIS DE VOZ
───────────────────────────────────────────── */
function speak(text, rate = 0.88, pitch = 1.25) {
  if (!('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utt = new SpeechSynthesisUtterance(text);
    utt.lang = 'es-ES';
    utt.rate = rate;
    utt.pitch = pitch;
    window.speechSynthesis.speak(utt);
  } catch {
    // Si no está disponible no interrumpir
  }
}

/* ─────────────────────────────────────────────
   HELPER DE AUDIO: SILBATO Y SONIDO DE TREN
───────────────────────────────────────────── */
function playTrainWhistle() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();

    // Acorde armónico de silbato de vapor clásico (3 notas: Re5, Fa#5, La5)
    const frequencies = [587.33, 739.99, 880.0];

    const playWhistleBlast = (startTime, duration, gainLevel) => {
      frequencies.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sawtooth';
        // Detune leve para sonido orgánico de metal y vapor
        const detuneVal = idx === 0 ? 0 : idx === 1 ? 4 : -4;
        osc.frequency.setValueAtTime(freq, startTime);
        osc.detune.setValueAtTime(detuneVal, startTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.985, startTime + duration);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1600, startTime);

        gain.gain.setValueAtTime(0.0001, startTime);
        gain.gain.linearRampToValueAtTime(gainLevel, startTime + 0.05);
        gain.gain.setValueAtTime(gainLevel * 0.9, startTime + duration - 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration + 0.05);
      });
    };

    const now = ctx.currentTime + 0.05;
    // Toque 1: corto (¡Chu!)
    playWhistleBlast(now, 0.3, 0.12);
    // Toque 2: largo y sonoro (¡Chuuu!)
    playWhistleBlast(now + 0.38, 0.65, 0.15);
  } catch (err) {
    console.warn('AudioContext prevented', err);
  }
}

/* ─────────────────────────────────────────────
   COMPONENTE: VIAS / CARRILES DE TREN (TRACKS)
───────────────────────────────────────────── */
function TrainTracks() {
  return (
    <div className="w-full relative h-16 pointer-events-none select-none overflow-hidden">
      {/* Cama de balasto / gravilla */}
      <div className="absolute inset-x-0 bottom-2 h-10 bg-gradient-to-b from-stone-300 via-stone-400 to-stone-500 dark:from-stone-700 dark:via-stone-800 dark:to-stone-900 rounded-lg shadow-inner opacity-80" />

      {/* Durmientes de madera transversales repetidos */}
      <div
        className="absolute inset-x-0 bottom-3 h-8 flex justify-between items-center px-1"
        style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #78350f 0px, #78350f 14px, #451a03 14px, #451a03 18px, transparent 18px, transparent 38px)',
        }}
      />

      {/* Riel Superior (Metal brillante) */}
      <div className="absolute inset-x-0 bottom-8 h-2.5 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 dark:from-slate-500 dark:via-slate-300 dark:to-slate-500 shadow-[0_2px_4px_rgba(0,0,0,0.35)] rounded-full border-t border-white/60">
        <div className="w-full h-0.5 bg-white/80" />
      </div>

      {/* Riel Inferior */}
      <div className="absolute inset-x-0 bottom-3 h-2 bg-gradient-to-r from-slate-500 via-slate-300 to-slate-500 dark:from-slate-600 dark:via-slate-400 dark:to-slate-600 shadow-[0_2px_3px_rgba(0,0,0,0.4)] rounded-full border-t border-white/40" />

      {/* Grava inferior decorativa */}
      <div className="absolute inset-x-0 bottom-0 h-2 bg-stone-500/40 dark:bg-stone-900/60 rounded-b-lg" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE: LOCOMOTORA AL FRENTE DEL TREN (Mirando hacia el frente / izquierda)
───────────────────────────────────────────── */
function Locomotive({ isMoving, onWhistle }) {
  return (
    <div
      onClick={onWhistle}
      role="button"
      tabIndex={0}
      title="¡Toca la locomotora para hacer sonar el silbato! ■"
      className="relative flex flex-col items-center shrink-0 w-44 sm:w-52 select-none cursor-pointer group"
    >
      {/* Chimenea con humo animado — ubicada sobre la caldera a la izquierda */}
      <div className="absolute -top-12 left-10 flex flex-col items-center pointer-events-none">
        <div className="relative w-8 h-8">
          <span className={`smoke-puff smoke-puff-1 ${isMoving ? 'smoke-fast' : ''}`} />
          <span className={`smoke-puff smoke-puff-2 ${isMoving ? 'smoke-fast' : ''}`} />
          <span className={`smoke-puff smoke-puff-3 ${isMoving ? 'smoke-fast' : ''}`} />
        </div>
      </div>

      {/* Carrocería de la Locomotora */}
      <div className="relative w-full h-56 flex flex-col justify-end">
        {/* Estructura: Caldera y Farol a la izquierda (adelante), Cabina a la derecha (atrás) */}
        <div className="relative w-full flex items-end">

          {/* Caldera frontal, chimenea y farol (delante) */}
          <div className="flex-1 flex flex-col justify-end items-end -mr-1">
            {/* Silbato dorado */}
            <div className="w-4 h-6 mr-14 -mb-1 bg-amber-400 rounded-t-full border border-amber-600 shadow-xs" />

            {/* Chimenea metálica */}
            <div className="w-8 h-12 mr-6 bg-gradient-to-r from-stone-800 via-stone-600 to-stone-800 rounded-t-lg border-2 border-stone-900 shadow-md relative">
              <div className="absolute -top-1.5 -left-1 -right-1 h-2.5 bg-secondary-container rounded-full border border-secondary shadow-xs" />
            </div>

            {/* Caldera cilíndrica */}
            <div className="w-full h-24 bg-gradient-to-b from-primary-container via-primary to-primary rounded-tl-2xl border-4 border-r-0 border-primary/90 shadow-md relative flex items-center justify-start pl-2 overflow-hidden">
              {/* Farol delantero (Luz del tren que apunta hacia la izquierda adelante) */}
              <div className="relative w-8 h-8 rounded-full bg-amber-200 border-2 border-secondary-container shadow-[-8px_0_18px_rgba(255,200,0,0.9)] flex items-center justify-center">
                <div className="w-4 h-4 rounded-full bg-yellow-300 animate-pulse" />
              </div>

              {/* Bandas doradas decorativas */}
              <div className="absolute right-12 inset-y-0 w-2 bg-secondary-container/90 border-x border-amber-600" />
              <div className="absolute right-5 inset-y-0 w-2 bg-secondary-container/90 border-x border-amber-600" />
            </div>
          </div>

          {/* Cabina trasera (a la derecha, con el maquinista sonriente hacia adelante) */}
          <div className="w-24 sm:w-28 h-36 bg-gradient-to-b from-primary to-primary-container rounded-t-3xl border-4 border-primary/80 shadow-lg relative flex flex-col items-center pt-2 overflow-hidden">
            {/* Ventana de cabina */}
            <div className="w-14 h-14 bg-gradient-to-b from-sky-200 to-sky-400 rounded-2xl border-2 border-white/80 shadow-inner flex items-center justify-center relative overflow-hidden">
              {/* Reflejo de vidrio */}
              <div className="absolute -top-4 -left-4 w-8 h-20 bg-white/40 -rotate-45 transform pointer-events-none" />
              {/* Maquinista sonriente */}
              <span className="text-2xl animate-bounce" role="img" aria-label="Maquinista">
                ♠
              </span>
            </div>
            {/* Placa decorativa */}
            <div className="mt-2 px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-black uppercase tracking-wider shadow-xs">
              MonteKids
            </div>
          </div>

        </div>

        {/* Chasis inferior con paragolpes hacia el frente */}
        <div className="w-full h-6 bg-stone-900 rounded-lg flex items-center justify-between px-2 shadow-md relative z-10">
          <div className="w-5 h-3 bg-secondary-container rounded-sm border border-secondary" />
          <div className="text-[9px] font-black text-white/80 tracking-widest">Nº 1</div>
          <div className="w-4 h-2 bg-red-600 rounded-sm" />
        </div>

        {/* Ruedas de la locomotora (animadas durante el movimiento) */}
        <div className="flex justify-around items-center px-1 -mt-2 relative z-20">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-stone-800 via-stone-700 to-stone-900 border-4 border-slate-300 shadow-md flex items-center justify-center ${isMoving ? 'animate-wheel-spin' : ''}`}>
            <div className="w-4 h-4 rounded-full bg-secondary-container border-2 border-stone-800" />
          </div>
          <div className={`w-14 h-14 rounded-full bg-gradient-to-br from-stone-800 via-stone-700 to-stone-900 border-4 border-slate-300 shadow-lg flex items-center justify-center ${isMoving ? 'animate-wheel-spin' : ''}`}>
            <div className="w-5 h-5 rounded-full bg-secondary-container border-2 border-stone-800" />
          </div>
          <div className={`w-12 h-12 rounded-full bg-gradient-to-br from-stone-800 via-stone-700 to-stone-900 border-4 border-slate-300 shadow-md flex items-center justify-center ${isMoving ? 'animate-wheel-spin' : ''}`}>
            <div className="w-4 h-4 rounded-full bg-secondary-container border-2 border-stone-800" />
          </div>
        </div>
      </div>

      {/* Indicador interactivo */}
      <span className="mt-1 text-[10px] font-extrabold text-primary dark:text-primary-container bg-primary/10 px-2 py-0.5 rounded-full opacity-70 group-hover:opacity-100 transition-opacity">
        ♪ Toca para pitar
      </span>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE: VAGÓN CON ESPACIO PARA ANIMAL
───────────────────────────────────────────── */
function TrainWagon({
  wagon,
  index,
  matched,
  isOver,
  wrongFlash,
  isMoving,
  onDrop,
  onDragOver,
  onDragLeave,
  onClick,
}) {
  const imgSrc = ANIMAL_IMGS[wagon.animal];

  return (
    <div className="flex items-center shrink-0">
      {/* Enganche metálico con el vagón anterior */}
      <div className="w-5 sm:w-7 h-4 bg-gradient-to-r from-stone-700 via-stone-500 to-stone-700 rounded-sm shadow-md flex items-center justify-center -mx-1 z-0">
        <div className="w-2.5 h-1.5 rounded-full bg-stone-900" />
      </div>

      {/* Cuerpo del Vagón */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          onDragOver(wagon.id);
        }}
        onDragLeave={onDragLeave}
        onDrop={() => onDrop(wagon.id)}
        onClick={() => onClick(wagon.id)}
        role="button"
        tabIndex={0}
        aria-label={`Vagón ${index + 1}: ${wagon.animal}`}
        className={`
          relative w-48 sm:w-56 h-60 rounded-3xl border-4 transition-all duration-300 cursor-pointer
          flex flex-col justify-between p-2.5 z-10 select-none
          ${wrongFlash
            ? 'border-red-500 bg-red-100 dark:bg-red-950/40 scale-95 shadow-xl animate-shake'
            : matched
              ? 'border-emerald-500 bg-gradient-to-b from-emerald-50 via-white to-emerald-100 dark:from-emerald-950/30 dark:via-surface-container dark:to-emerald-900/30 shadow-2xl scale-102 ring-4 ring-emerald-300'
              : isOver
                ? 'border-primary bg-primary/10 shadow-2xl scale-105 ring-4 ring-primary/40'
                : 'border-surface-container-high bg-surface-container-lowest hover:border-primary/50 hover:shadow-xl hover:scale-102'
          }
        `}
      >
        {/* Barra superior del vagón con etiqueta */}
        <div className="flex items-center px-2 pt-1 pb-1.5 border-b border-surface-container-high/60">
          <span className="flex items-center gap-1.5 text-xs font-black text-on-surface">
            <span className="w-5 h-5 rounded-full bg-primary/20 text-primary dark:text-primary-container flex items-center justify-center text-[11px] font-black">
              {index + 1}
            </span>
            Vagón {index + 1}
          </span>
        </div>

        {/* Marco con la foto del animal */}
        <div className="relative w-full h-28 rounded-2xl overflow-hidden shadow-inner bg-surface-container border-2 border-surface-container-high">
          <img
            src={imgSrc}
            alt={wagon.animal}
            className={`w-full h-full object-cover transition-transform duration-500 ${
              matched ? 'scale-105' : 'grayscale-[15%]'
            }`}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />

          {/* Overlay de acierto */}
          {matched && (
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 via-emerald-600/20 to-transparent flex items-end justify-center pb-1">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-500 text-white font-extrabold text-xs shadow-md animate-bounce">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                ¡Correcto!
              </span>
            </div>
          )}

          {/* Overlay de hover al arrastrar */}
          {isOver && !matched && (
            <div className="absolute inset-0 bg-primary/30 backdrop-blur-[1px] flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-4xl animate-bounce">
                arrow_downward
              </span>
            </div>
          )}

          {/* Overlay de error */}
          {wrongFlash && (
            <div className="absolute inset-0 bg-red-500/40 backdrop-blur-[1px] flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-4xl animate-ping" style={{ fontVariationSettings: "'FILL' 1" }}>
                cancel
              </span>
            </div>
          )}
        </div>

        {/* Espacio inferior: Nombre y ranura de sonido */}
        <div className="w-full flex flex-col items-center gap-1 pt-1">
          <div className="text-center">
            <span className="text-sm font-black text-on-surface tracking-wide">
              {wagon.animal}
            </span>
          </div>

          {/* Ranura interactiva del sonido */}
          {matched ? (
            <div className="w-full py-1.5 px-3 rounded-xl bg-emerald-500 text-white font-black text-xs text-center shadow-xs flex items-center justify-center gap-1.5">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                music_note
              </span>
              <span>¡Dice "{wagon.sound}"!</span>
            </div>
          ) : (
            <div className={`w-full py-1 px-2 rounded-xl border-2 border-dashed flex items-center justify-center gap-1.5 transition-colors ${
              isOver
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-surface-container-high text-on-surface-variant/80 bg-surface-container-low'
            }`}>
              <span className="material-symbols-outlined text-xs animate-pulse">
                sound_detection_loud_sound
              </span>
              <span className="text-[11px] font-bold">
                ¿Qué sonido hace?
              </span>
            </div>
          )}
        </div>

        {/* Ruedas dobles del vagón sobre las vías */}
        <div className="flex justify-around items-center px-4 -mb-5 relative z-20">
          <div className={`w-9 h-9 rounded-full bg-gradient-to-br from-stone-800 to-stone-900 border-3 border-slate-300 shadow-md flex items-center justify-center ${isMoving ? 'animate-wheel-spin' : ''}`}>
            <div className="w-3 h-3 rounded-full bg-amber-400" />
          </div>
          <div className={`w-9 h-9 rounded-full bg-gradient-to-br from-stone-800 to-stone-900 border-3 border-slate-300 shadow-md flex items-center justify-center ${isMoving ? 'animate-wheel-spin' : ''}`}>
            <div className="w-3 h-3 rounded-full bg-amber-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   COMPONENTE: CUADRO DE SONIDO (PARTE INFERIOR)
───────────────────────────────────────────── */
function SoundCard({
  wagon,
  matched,
  selected,
  onDragStart,
  onClick,
}) {
  if (matched) {
    return (
      <div className="w-44 sm:w-52 h-36 rounded-3xl border-2 border-dashed border-emerald-400/40 bg-emerald-50/20 dark:bg-emerald-950/10 flex flex-col items-center justify-center gap-1 opacity-50 select-none">
        <span className="material-symbols-outlined text-emerald-500 text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          check_circle
        </span>
        <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
          {wagon.sound} ✓
        </span>
        <span className="text-[10px] font-bold text-on-surface-variant">En el vagón</span>
      </div>
    );
  }

  return (
    <div
      draggable
      onDragStart={() => onDragStart(wagon.id)}
      onClick={() => onClick(wagon.id)}
      role="button"
      tabIndex={0}
      aria-label={`Sonido ${wagon.sound}`}
      className={`
        relative w-44 sm:w-52 h-36 rounded-3xl border-3 transition-all duration-200 cursor-grab active:cursor-grabbing
        flex flex-col items-center justify-between p-4 shadow-lg select-none
        bg-surface-container-lowest
        ${selected
          ? 'border-secondary ring-4 ring-secondary/40 shadow-2xl scale-105 -translate-y-2 bg-secondary-container/10'
          : 'border-surface-container-high hover:border-primary/60 hover:shadow-2xl hover:-translate-y-2 hover:scale-103'
        }
      `}
    >
      {/* Botón superior de altavoz para escuchar */}
      <div className="w-full flex items-center justify-between">
        <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary dark:text-primary-container text-[11px] font-extrabold tracking-wide">
          Empieza con "{wagon.animal[0]}"
        </span>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            speak(wagon.sound);
          }}
          className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-sm hover:scale-110 active:scale-95 transition-transform"
          aria-label={`Escuchar ${wagon.sound}`}
        >
          <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
            volume_up
          </span>
        </button>
      </div>

      {/* Onomatopeya protagonista */}
      <div className="my-auto flex flex-col items-center">
        <span className="text-3xl sm:text-4xl font-black text-on-surface tracking-wider drop-shadow-xs">
          "{wagon.sound}"
        </span>
      </div>

      {/* Indicador de acción inferior */}
      <div className="w-full flex items-center justify-center gap-1 text-[11px] font-bold text-on-surface-variant/80">
        <span className="material-symbols-outlined text-sm">
          drag_pan
        </span>
        <span>Arrastra o toca</span>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PÁGINA PRINCIPAL
───────────────────────────────────────────── */
export function TrencitoSonoroPge() {
  const [roundIndex, setRoundIndex]         = useState(0);
  const [matched, setMatched]               = useState({});
  const [dragging, setDragging]             = useState(null);
  const [hoverTarget, setHoverTarget]       = useState(null);
  const [selectedBubble, setSelectedBubble] = useState(null);
  const [trainPhase, setTrainPhase]         = useState('entering'); // 'entering' | 'idle' | 'departing'
  const [wrongFlash, setWrongFlash]         = useState(null);
  const [completed, setCompleted]           = useState(false);
  const [bubbles, setBubbles]               = useState(() =>
    shuffleDeterministic(ROUNDS[0].wagons, 17)
  );

  const { awardStars } = useAwardStars();
  const [errorsCount, setErrorsCount] = useState(0);
  const trainTrackRef = useRef(null);
  const awardedRef   = useRef(false); // guard: evita doble llamada a awardStars
  const round = ROUNDS[roundIndex];

  // Entrada animada del tren al cambiar de ronda o al montar
  useEffect(() => {
    // 1. Sonido característico del tren al entrar
    playTrainWhistle();

    // 2. Transición de animación a reposo en la estación
    const timer = setTimeout(() => {
      setTrainPhase('idle');
    }, 1300);

    // 3. Dar las instrucciones DESPUÉS del sonido del tren y una vez detenido
    const speechTimer = setTimeout(() => {
      speak(`¡Llegó el trencito! Ronda ${round.id}. Arrastra cada sonido a su animal.`, 0.88, 1.2);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearTimeout(speechTimer);
    };
  }, [roundIndex, round.id]);

  // Manejo de acierto
  const handleSuccess = useCallback((wagonId) => {
    const wagon = round.wagons.find((w) => w.id === wagonId);
    speak(`¡Muy bien! El ${wagon?.animal} dice ${wagon?.sound}.`, 0.9, 1.3);

    setMatched((prev) => {
      const next = { ...prev, [wagonId]: true };
      const matchedAll = Object.keys(next).length === round.wagons.length;

      if (matchedAll) {
        // Desencadenar animación de tren saliendo
        setTimeout(() => {
          setTrainPhase('departing');
          playTrainWhistle();
          speak('¡Chu chu! ¡Completaste todos los vagones! ¡Excelente trabajo!', 0.9, 1.25);
        }, 600);

        // Transición a la siguiente ronda o pantalla final
        setTimeout(() => {
          const nextIndex = roundIndex + 1;
          if (nextIndex < ROUNDS.length) {
            setTrainPhase('entering');
            setRoundIndex(nextIndex);
            setBubbles(shuffleDeterministic(ROUNDS[nextIndex].wagons, (nextIndex + 1) * 23));
            setMatched({});
            setSelectedBubble(null);
            setHoverTarget(null);
            setDragging(null);
          } else {
            // Guard: solo llamar una vez aunque StrictMode re-ejecute el updater
            if (!awardedRef.current) {
              awardedRef.current = true;
              awardStars('trencito-sonoro', 'El Trencito Sonoro', 10, '🚂', errorsCount);
            }
            setCompleted(true);
          }
        }, 3200);
      }
      return next;
    });
  }, [round.wagons, roundIndex, awardStars, errorsCount]);

  // Intento de emparejamiento
  const tryMatch = useCallback((bubbleId, wagonId) => {
    if (matched[wagonId]) return;

    if (bubbleId === wagonId) {
      handleSuccess(wagonId);
    } else {
      setErrorsCount(e => e + 1);
      speak('¡Casi! Escucha el sonido con atención y prueba con otro animal.', 0.85, 1.1);
      setWrongFlash(wagonId);
      setTimeout(() => setWrongFlash(null), 700);
    }

    setSelectedBubble(null);
    setDragging(null);
    setHoverTarget(null);
  }, [matched, handleSuccess]);

  // Drag and Drop
  const handleDragStart = (id) => setDragging(id);
  const handleDragOver  = (id) => setHoverTarget(id);
  const handleDragLeave = ()   => setHoverTarget(null);
  const handleDrop      = (wId) => {
    if (dragging) tryMatch(dragging, wId);
  };

  // Click / Tap interacción
  const handleSoundCardClick = (id) => {
    const w = round.wagons.find((x) => x.id === id);
    if (w) speak(w.sound);
    setSelectedBubble((prev) => (prev === id ? null : id));
  };

  const handleWagonClick = (wId) => {
    if (selectedBubble) {
      tryMatch(selectedBubble, wId);
    } else {
      const w = round.wagons.find((x) => x.id === wId);
      if (w) {
        if (matched[wId]) {
          speak(`Este es el ${w.animal} y hace ${w.sound}`);
        } else {
          speak(`Este es el ${w.animal}. ¿Qué sonido hace?`);
        }
      }
    }
  };

  const resetGame = () => {
    setTrainPhase('entering');
    setRoundIndex(0);
    setCompleted(false);
    setMatched({});
    setSelectedBubble(null);
    setBubbles(shuffleDeterministic(ROUNDS[0].wagons, 17));
  };

  /* ─────────────────────────────────────────────
     PANTALLA FINAL DE CELEBRACIÓN
  ───────────────────────────────────────────── */
  if (completed) {
    return (
      <div className="bg-background font-sans text-on-surface antialiased min-h-screen flex flex-col">
        <ParentHeader customNavItems={[]} />
        <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-4 text-center">
          <div className="relative w-36 h-36 mx-auto mb-6 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-secondary-container/40 animate-ping" />
            <div className="relative w-32 h-32 rounded-full bg-secondary-container flex items-center justify-center shadow-2xl text-6xl">
              ■
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-on-surface mb-3">
            ¡Misión Cumplida!
          </h1>
          <p className="text-lg text-on-surface-variant font-bold mb-2 max-w-md">
            El Trencito Sonoro completó todas sus estaciones con éxito.
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

  const matchedCount = Object.keys(matched).length;
  const totalWagons  = round.wagons.length;
  const isTrainMoving = trainPhase === 'entering' || trainPhase === 'departing';

  return (
    <div className="bg-background font-sans text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      <ParentHeader customNavItems={[]} />

      {/* Overlay de celebración al salir el tren */}
      {trainPhase === 'departing' && (
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
            <h2 className="text-3xl font-black text-on-surface">¡Chu Chu! ★</h2>
            <p className="text-sm font-bold text-on-surface-variant mt-1">¡Tren completo! Viajando a la siguiente estación...</p>
          </div>
        </div>
      )}

      <main className="w-full pt-20 bg-background flex-1 max-w-[1240px] mx-auto px-3 sm:px-6 lg:px-8 transition-colors duration-300 animate-page-bounce">
        <div className="flex flex-col w-full pb-16">

          {/* Orbes de fondo decorativos */}
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-24 left-10 w-72 h-72 rounded-full bg-primary-container/20 blur-3xl" />
            <div className="absolute top-0 right-16 w-80 h-80 rounded-full bg-tertiary-container/30 blur-3xl" />
            <div className="absolute top-80 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl" />
          </div>

          {/* ── HEADER SUPERIOR ── */}
          <section className="mt-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center shadow-md text-3xl">
                ■
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-on-surface leading-tight">
                  El Trencito Sonoro
                </h1>
                <p className="text-xs sm:text-sm text-on-surface-variant font-semibold">
                  {round.title} — Arrastra el sonido a su animal
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container text-on-surface font-extrabold text-sm shadow-sm border border-surface-container-high">
                <span className="material-symbols-outlined text-lg">
                  train
                </span>
                Estación {roundIndex + 1}/{ROUNDS.length}
              </div>
              <Link
                to="/juegos"
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-surface-container-high text-on-surface-variant hover:text-on-surface font-bold text-sm transition-all hover:bg-surface-container shadow-sm"
              >
                <span className="material-symbols-outlined text-lg">arrow_back</span>
                <span className="hidden sm:inline">Volver</span>
              </Link>
            </div>
          </section>

          {/* ── BARRA DE PROGRESO DE LA ESTACIÓN ── */}
          <div className="mb-4">
            <div className="flex justify-between text-xs font-bold text-on-surface-variant mb-1">
              <span>Animales en el tren: {matchedCount} de {totalWagons}</span>
              <span>{Math.round((matchedCount / totalWagons) * 100)}% completado</span>
            </div>
            <div className="w-full h-3 bg-surface-container rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full bg-gradient-to-r from-primary via-secondary to-tertiary rounded-full transition-all duration-700"
                style={{ width: `${(matchedCount / totalWagons) * 100}%` }}
              />
            </div>
          </div>

          {/* ── BANNER GUÍA CONTEXTUAL ── */}
          <div className={`mb-6 flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 ${
            selectedBubble
              ? 'bg-secondary-container/20 border-secondary/50 shadow-md ring-2 ring-secondary/20'
              : 'bg-surface-container-lowest border-surface-container-high'
          }`}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                selectedBubble
                  ? 'bg-secondary-container text-on-secondary-container'
                  : 'bg-primary-container text-on-primary-container'
              }`}>
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  {selectedBubble ? 'touch_app' : 'campaign'}
                </span>
              </div>
              <p className="text-xs sm:text-sm font-extrabold text-on-surface">
                {selectedBubble
                  ? `¡Genial! Ahora toca el animal que dice "${round.wagons.find((w) => w.id === selectedBubble)?.sound}" para subirlo al vagón.`
                  : 'Toca una tarjeta de sonido abajo para escucharla y arrástrala hacia el animal correcto en el tren.'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => speak(`Hay ${totalWagons} animales en el tren. Escucha los sonidos de abajo y colócalos en el vagón correspondiente.`)}
              className="shrink-0 hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-container-high hover:bg-surface-container text-on-surface text-xs font-bold transition-transform active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">volume_up</span>
              Ayuda
            </button>
          </div>

          {/* ════════════════════════════════════════════════════════════
              PARTE SUPERIOR: EL TREN CON LOS CARRILES DETRÁS
              Locomotora al frente + Vagones atrás con espacios para animales
             ════════════════════════════════════════════════════════════ */}
          <section className="relative w-full mb-10">
            {/* Contenedor escénico de la estación de tren */}
            <div className="relative w-full rounded-3xl bg-gradient-to-b from-sky-50 via-sky-100/60 to-surface-container-low dark:from-sky-950/20 dark:via-surface-container dark:to-surface-container-lowest border-2 border-surface-container-high shadow-lg pt-6 pb-2 px-2 sm:px-6 overflow-hidden">

              {/* Decoración de fondo: cielo y nubes */}
              <div className="absolute top-2 left-6 text-2xl opacity-40 select-none pointer-events-none">∞</div>
              <div className="absolute top-4 right-12 text-3xl opacity-30 select-none pointer-events-none">∞</div>
              <div className="absolute top-1 left-1/3 text-lg opacity-30 select-none pointer-events-none">~</div>

              {/* Título de la sección del tren */}
              <div className="flex items-center justify-between mb-3 px-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    train
                  </span>
                  <h2 className="text-base font-black text-on-surface">
                    El Tren en la Estación
                  </h2>
                  <span className="text-xs text-on-surface-variant font-bold hidden sm:inline">
                    — Suelta aquí el sonido
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-extrabold text-primary">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>En Vía</span>
                </div>
              </div>

              {/* Escena del Tren y sus Vagones (Deslizamiento horizontal) */}
              <div
                ref={trainTrackRef}
                className="w-full overflow-x-auto pb-4 pt-2 no-scrollbar"
              >
                <div
                  className={`
                    relative inline-flex items-end min-w-full justify-center px-4
                    ${trainPhase === 'entering' ? 'animate-train-enter' : ''}
                    ${trainPhase === 'departing' ? 'animate-train-depart' : ''}
                    ${trainPhase === 'idle' ? 'animate-train-idle' : ''}
                  `}
                >
                  {/* Locomotora al frente (adelante, mirando a la izquierda) */}
                  <Locomotive isMoving={isTrainMoving} onWhistle={playTrainWhistle} />

                  {/* Vagones acoplados atrás con las fotos de los animales */}
                  {round.wagons.map((wagon, index) => (
                    <TrainWagon
                      key={wagon.id}
                      wagon={wagon}
                      index={index}
                      matched={!!matched[wagon.id]}
                      isOver={hoverTarget === wagon.id}
                      wrongFlash={wrongFlash === wagon.id}
                      isMoving={isTrainMoving}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onClick={handleWagonClick}
                    />
                  ))}
                </div>

                {/* VÍAS / CARRILES DE TREN DETRÁS Y DEBAJO DE LAS RUEDAS */}
                <div className="-mt-3">
                  <TrainTracks />
                </div>
              </div>
            </div>
          </section>

          {/* ════════════════════════════════════════════════════════════
              PARTE INFERIOR: LOS CUADROS CON LOS SONIDOS
             ════════════════════════════════════════════════════════════ */}
          <section className="w-full">
            <div className="bg-surface-container-lowest rounded-3xl border-2 border-surface-container-high p-5 sm:p-7 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-3 border-b border-surface-container-high">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shadow-xs">
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      volume_up
                    </span>
                  </div>
                  <div>
                    <h2 className="text-lg font-black text-on-surface">
                      Cuadros de Sonidos Mágicos
                    </h2>
                    <p className="text-xs text-on-surface-variant font-bold">
                      Toca para escuchar la onomatopeya y arrástrala hacia el vagón de su animal
                    </p>
                  </div>
                </div>

                <div className="text-xs font-black px-3 py-1.5 rounded-full bg-surface-container text-on-surface self-start sm:self-auto">
                  {round.wagons.length - matchedCount} sonidos restantes
                </div>
              </div>

              {/* Fila horizontal centrada con los cuadros de sonidos */}
              <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 py-3">
                {bubbles.map((wagon) => (
                  <SoundCard
                    key={wagon.id}
                    wagon={wagon}
                    matched={!!matched[wagon.id]}
                    selected={selectedBubble === wagon.id}
                    onDragStart={handleDragStart}
                    onClick={handleSoundCardClick}
                  />
                ))}
              </div>

              {/* Pie de controles: botón de audio de instrucción */}
              <div className="mt-6 pt-4 border-t border-surface-container-high flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-on-surface-variant font-semibold flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-base text-secondary">
                    tips_and_updates
                  </span>
                  <span>Consejo: Puedes arrastrar con el mouse/dedo o tocar un sonido y luego su vagón.</span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const remainingSounds = round.wagons.filter((w) => !matched[w.id]).map((w) => w.sound).join(', ');
                    if (remainingSounds) {
                      speak(`Faltan los sonidos: ${remainingSounds}. ¿Cuál reconoces?`);
                    } else {
                      speak('¡Excelente! Ya colocaste todos los sonidos.');
                    }
                  }}
                  className="px-4 py-2 rounded-full bg-primary-container text-on-primary-container font-extrabold text-xs hover:opacity-90 active:scale-95 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                    record_voice_over
                  </span>
                  Recordar sonidos faltantes
                </button>
              </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />

      {/* ESTILOS Y ANIMACIONES CSS PERSONALIZADAS */}
      <style>{`
        /* Animación de entrada simulando el tren entrando a la estación */
        @keyframes trainEnterStation {
          0% {
            transform: translateX(100vw);
            opacity: 0.6;
          }
          65% {
            transform: translateX(-35px);
            opacity: 1;
          }
          82% {
            transform: translateX(12px);
          }
          100% {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-train-enter {
          animation: trainEnterStation 1.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        /* Animación de salida victoriosa al completar la ronda */
        @keyframes trainDepartStation {
          0% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(20px);
          }
          100% {
            transform: translateX(-120vw);
          }
        }

        .animate-train-depart {
          animation: trainDepartStation 2.6s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards;
        }

        /* Movimiento sutil de reposo en la estación */
        @keyframes trainIdleSway {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-2px);
          }
        }

        .animate-train-idle {
          animation: trainIdleSway 3s ease-in-out infinite;
        }

        /* Giro de las ruedas durante el avance */
        @keyframes wheelSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-720deg);
          }
        }

        .animate-wheel-spin {
          animation: wheelSpin 1.4s linear infinite;
        }

        /* Puffs de humo saliendo de la chimenea */
        .smoke-puff {
          position: absolute;
          width: 14px;
          height: 14px;
          background-color: rgba(255, 255, 255, 0.85);
          border-radius: 9999px;
          opacity: 0;
          pointer-events: none;
        }

        .smoke-puff-1 {
          animation: puffSmoke 2.2s infinite ease-out;
        }

        .smoke-puff-2 {
          animation: puffSmoke 2.2s infinite ease-out 0.7s;
        }

        .smoke-puff-3 {
          animation: puffSmoke 2.2s infinite ease-out 1.4s;
        }

        .smoke-fast {
          animation-duration: 1.1s !important;
        }

        @keyframes puffSmoke {
          0% {
            transform: translate(0, 0) scale(0.6);
            opacity: 0.8;
          }
          50% {
            transform: translate(16px, -20px) scale(1.3);
            opacity: 0.6;
          }
          100% {
            transform: translate(38px, -45px) scale(2.2);
            opacity: 0;
          }
        }

        /* Sacudida al cometer error */
        @keyframes shakeError {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px) rotate(-2deg); }
          40% { transform: translateX(8px) rotate(2deg); }
          60% { transform: translateX(-5px); }
          80% { transform: translateX(5px); }
        }

        .animate-shake {
          animation: shakeError 0.5s ease-in-out;
        }

        /* Ocultar barra de desplazamiento nativa */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
