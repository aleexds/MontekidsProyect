import { useState, useEffect, useCallback, useRef } from 'react';
import { ParentHeader } from '../components/ParentHeader';
import { Link } from 'react-router-dom';
import { useAwardStars } from '../context/useAwardStars';
import Footer from '../components/Footer';

/* ──────────────────────────────────────────────
   HELPER DE SÍNTESIS DE VOZ INFANTIL
────────────────────────────────────────────── */
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
    // Si no está disponible no interrumpir
  }
}

/* ──────────────────────────────────────────────
   HELPERS DE AUDIO (WEB AUDIO API)
────────────────────────────────────────────── */
function getCtx() {
  const A = window.AudioContext || window.webkitAudioContext;
  return A ? new A() : null;
}
function playTone(freq, duration = 0.18, type = 'sine') {
  try {
    const ctx = getCtx(); if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.25, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(now); osc.stop(now + duration + 0.02);
  } catch { /* noop */ }
}
function playSuccess() {
  [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((f, i) => {
    setTimeout(() => playTone(f, 0.3, 'sine'), i * 90);
  });
}
function playError() {
  playTone(200, 0.35, 'sawtooth');
  setTimeout(() => playTone(150, 0.3, 'sawtooth'), 150);
}
function playPop() { playTone(700, 0.1, 'sine'); }
function playReveal() { playTone(880, 0.08, 'triangle'); }

/* ──────────────────────────────────────────────
   CONSTANTES DE DISEÑO
────────────────────────────────────────────── */
// Paleta reducida: 3 formas × 4 colores = 12 opciones (fácil para niños)
const SHAPE_DEFS = [
  { id: 'circle',   label: 'Círculo' },
  { id: 'square',   label: 'Cuadrado' },
  { id: 'triangle', label: 'Triángulo' },
];

const COLOR_DEFS = [
  { id: 'red',    hex: '#ef4444', name: 'Rojo' },
  { id: 'blue',   hex: '#3b82f6', name: 'Azul' },
  { id: 'green',  hex: '#22c55e', name: 'Verde' },
  { id: 'yellow', hex: '#eab308', name: 'Amarillo' },
];

function ShapeSVG({ shapeId, color, size = 44 }) {
  const fill = color;
  const s = size;
  if (shapeId === 'circle')   return <svg width={s} height={s} viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" fill={fill} /></svg>;
  if (shapeId === 'square')   return <svg width={s} height={s} viewBox="0 0 100 100"><rect x="10" y="10" width="80" height="80" rx="10" fill={fill} /></svg>;
  if (shapeId === 'triangle') return <svg width={s} height={s} viewBox="0 0 100 100"><polygon points="50,8 92,90 8,90" fill={fill} /></svg>;
  if (shapeId === 'star')     return <svg width={s} height={s} viewBox="0 0 100 100"><polygon points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35" fill={fill} /></svg>;
  if (shapeId === 'diamond')  return <svg width={s} height={s} viewBox="0 0 100 100"><polygon points="50,5 95,50 50,95 5,50" fill={fill} /></svg>;
  return null;
}

function randomBlock() {
  const shape = SHAPE_DEFS[Math.floor(Math.random() * SHAPE_DEFS.length)];
  const color = COLOR_DEFS[Math.floor(Math.random() * COLOR_DEFS.length)];
  return { shapeId: shape.id, colorId: color.id, hex: color.hex, uid: Math.random().toString(36).slice(2) };
}

// 5 rondas de dificultad gradual, secuencias cortas y tiempo generoso
const ROUNDS = [
  { round: 1, seqLen: 2, showMs: 4000, label: '2 bloques — ¡Muy fácil!' },
  { round: 2, seqLen: 2, showMs: 3500, label: '2 bloques — ¡Rápido!' },
  { round: 3, seqLen: 3, showMs: 4500, label: '3 bloques — ¡Tú puedes!' },
  { round: 4, seqLen: 3, showMs: 4000, label: '3 bloques — ¡A memorizar!' },
  { round: 5, seqLen: 4, showMs: 5000, label: '4 bloques — ¡El gran reto!' },
];

const PHASE = { IDLE: 'idle', SHOWING: 'showing', BUILDING: 'building', RESULT: 'result', FINISHED: 'finished' };

/* ──────────────────────────────────────────────
   BLOQUE VISUAL
────────────────────────────────────────────── */
function Block({ shapeId, hex, size = 72, onClick, pulse = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex-shrink-0 flex items-center justify-center rounded-2xl transition-all duration-200 focus:outline-none ${
        onClick ? 'cursor-pointer hover:scale-110 active:scale-95' : 'cursor-default'
      } ${pulse ? 'animate-pulse' : ''}`}
      style={{ width: size, height: size, background: `${hex}22`, border: `3px solid ${hex}` }}
    >
      <ShapeSVG shapeId={shapeId} color={hex} size={size * 0.55} />
    </button>
  );
}

/* ──────────────────────────────────────────────
   PÁGINA PRINCIPAL
────────────────────────────────────────────── */
export function SecuenciaMaestraPage() {
  const [phase, setPhase]               = useState(PHASE.IDLE);
  const { awardStars } = useAwardStars();
  const [errorsCount, setErrorsCount]     = useState(0);
  const [roundIdx, setRoundIdx]         = useState(0);
  const [sequence, setSequence]         = useState([]);
  const [answer, setAnswer]             = useState([]);
  const [result, setResult]             = useState(null);
  const [visibleCount, setVisibleCount] = useState(0);
  const [mounted, setMounted]           = useState(false);
  const timerRef = useRef(null);

  const round = ROUNDS[roundIdx];

  useEffect(() => () => clearTimeout(timerRef.current), []);
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  // Instrucción inicial
  useEffect(() => {
    if (mounted && roundIdx === 0 && phase === PHASE.IDLE) {
      speak('Memoriza el patrón de colores y formas, y repítelo en orden exacto.', 0.88, 1.25);
    }
  }, [mounted, roundIdx, phase]);

  const startRound = useCallback(() => {
    const seq = Array.from({ length: round.seqLen }, randomBlock);
    setSequence(seq);
    setAnswer([]);
    setResult(null);
    setVisibleCount(0);
    setPhase(PHASE.SHOWING);

    seq.forEach((_, i) => {
      setTimeout(() => { setVisibleCount(i + 1); playReveal(); }, i * 380);
    });

    timerRef.current = setTimeout(() => {
      setPhase(PHASE.BUILDING);
    }, round.showMs + seq.length * 380);
  }, [round]);

  const addToAnswer = useCallback((block) => {
    setAnswer(prev => {
      const next = [...prev, block];
      const idx = next.length - 1;
      const correct = sequence[idx];
      if (!correct || block.shapeId !== correct.shapeId || block.colorId !== correct.colorId) {
        setErrorsCount(e => e + 1);
        speak('¡Casi! Memoriza mejor para la próxima.', 0.88, 1.2);
        setTimeout(() => { playError(); setResult('wrong'); setPhase(PHASE.RESULT); }, 50);
        return next;
      }
      if (next.length === sequence.length) {
        speak('¡Fantástico! Recordaste todo.', 0.9, 1.3);
        setTimeout(() => { playSuccess(); setResult('correct'); setPhase(PHASE.RESULT); }, 50);
      }
      return next;
    });
  }, [sequence]);

  const nextRound = () => {
    const next = roundIdx + 1;
    if (next >= ROUNDS.length) { 
      speak('¡Genial! Has completado todas las secuencias.', 0.9, 1.3);
      awardStars('secuencia-maestra', 'Secuencia Maestra', 15, '⊞', errorsCount);
      setPhase(PHASE.FINISHED); 
      return; 
    }
    setRoundIdx(next);
    setPhase(PHASE.IDLE);
  };

  const resetGame = () => {
    setRoundIdx(0);
    setPhase(PHASE.IDLE);
    setSequence([]);
    setAnswer([]);
    setResult(null);
    setVisibleCount(0);
  };

  /* PANTALLA FINAL */
  if (phase === PHASE.FINISHED) {
    return (
      <div className="bg-background font-sans text-on-surface antialiased min-h-screen flex flex-col">
        <ParentHeader customNavItems={[]} />
        <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-4 text-center">
          <div className="relative w-40 h-40 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-violet-400/30 animate-ping" />
            <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center shadow-2xl text-7xl">♛</div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-on-surface mb-3">¡Maestro de Secuencias!</h1>
          <p className="text-lg text-on-surface-variant font-bold mb-2 max-w-md">Completaste las {ROUNDS.length} rondas. ¡Memoria de campeón!</p>
          <p className="text-4xl font-black text-secondary mb-8">+13 Estrellas ⭐</p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <button onClick={resetGame} type="button" className="px-8 py-4 rounded-full bg-primary text-white font-extrabold text-base shadow-[0_6px_0_#004f55] hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>replay</span>
              Jugar otra vez
            </button>
            <Link to="/juegos" className="px-8 py-4 rounded-full bg-surface-container text-on-surface font-extrabold text-base shadow-sm hover:bg-surface-container-high active:scale-95 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">arrow_back</span>
              Volver a Juegos
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-background font-sans text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      <ParentHeader customNavItems={[]} />

      <main className={`w-full pt-20 bg-background flex-1 max-w-[1240px] mx-auto px-3 sm:px-6 lg:px-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="flex flex-col w-full pb-16">

          {/* Orbes */}
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-24 left-10 w-72 h-72 rounded-full bg-violet-300/20 blur-3xl" />
            <div className="absolute top-0 right-16 w-80 h-80 rounded-full bg-indigo-300/20 blur-3xl" />
            <div className="absolute top-80 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-purple-200/20 blur-3xl" />
          </div>

          {/* Header */}
          <section className="mt-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-md text-3xl">⊞</div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-on-surface leading-tight">Secuencia Maestra</h1>
                <p className="text-xs sm:text-sm font-bold text-on-surface-variant flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950/60 text-violet-800 dark:text-violet-300 font-black">7 a 11 años</span>
                  <span>• Memoria visual y razonamiento lógico</span>
                </p>
              </div>
            </div>
            <Link to="/juegos" className="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Menú de Juegos
            </Link>
          </section>

          {/* Progreso */}
          <div className="w-full bg-white dark:bg-zinc-800/80 rounded-2xl p-4 shadow-sm border border-surface-container-high mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-violet-600 text-white font-extrabold text-xs">Ronda {roundIdx + 1} de {ROUNDS.length}</span>
              <span className="text-sm font-extrabold text-on-surface">{round.label}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {ROUNDS.map((_, i) => (
                <div key={i} className={`h-3 rounded-full transition-all duration-300 ${i === roundIdx ? 'w-8 bg-violet-500' : i < roundIdx ? 'w-3 bg-violet-700' : 'w-3 bg-surface-container-high'}`} />
              ))}
            </div>
          </div>

          {/* Zona principal del juego */}
          <div className="bg-white dark:bg-zinc-800 rounded-3xl p-5 sm:p-8 shadow-lg border-2 border-violet-300/60 mb-6">

            {/* ── FASE IDLE ── */}
            {phase === PHASE.IDLE && (
              <div className="flex flex-col items-center text-center gap-6 py-10">
                <span className="text-7xl select-none" style={{ animation: 'bounce 1s infinite' }}>⊞</span>
                <div>
                  <h2 className="text-2xl font-black text-on-surface mb-2">¡Memoriza el patrón!</h2>
                  <p className="text-sm text-on-surface-variant font-medium max-w-md">
                    Verás <span className="font-black text-violet-600">{round.seqLen} bloque{round.seqLen > 1 ? 's' : ''}</span> durante unos segundos. Memorízalos bien y luego repítelos en el mismo orden.
                  </p>
                  <p className="mt-2 text-xs font-black px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 inline-block">{round.label}</p>
                </div>
                <button onClick={startRound} type="button" className="px-10 py-4 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-black text-lg shadow-[0_6px_0_#3730a3,0_12px_24px_rgba(139,92,246,0.35)] hover:opacity-90 active:scale-95 transition-all flex items-center gap-3 cursor-pointer">
                  <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>visibility</span>
                  ¡Ver la Secuencia!
                </button>
              </div>
            )}

            {/* ── FASE SHOWING ── */}
            {phase === PHASE.SHOWING && (
              <div className="flex flex-col items-center gap-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl animate-pulse">◔</span>
                  <h2 className="text-xl font-black text-violet-700 dark:text-violet-300">¡Memoriza bien el orden!</h2>
                </div>
                <div className="w-full overflow-x-auto pb-2">
                  <div className="flex flex-wrap gap-3 justify-center py-4">
                    {sequence.map((b, i) => (
                      <div key={b.uid} className={`flex flex-col items-center gap-1 transition-all duration-300 ${i < visibleCount ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                        <Block shapeId={b.shapeId} hex={b.hex} size={76} />
                        <span className="text-[11px] font-black text-on-surface-variant">{i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-on-surface-variant font-bold animate-pulse">¡La secuencia desaparecerá pronto!</p>
              </div>
            )}

            {/* ── FASE BUILDING ── */}
            {phase === PHASE.BUILDING && (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <h2 className="text-xl font-black text-on-surface flex items-center gap-2">
                    <span className="text-2xl">#</span> Reconstruye la secuencia en orden
                  </h2>
                  <span className="text-xs font-bold bg-violet-100 dark:bg-violet-950/60 text-violet-700 dark:text-violet-300 px-3 py-1 rounded-full">
                    {answer.length} / {sequence.length}
                  </span>
                </div>

                {/* Slots de respuesta */}
                <div className="flex flex-wrap gap-3 justify-center p-4 bg-surface-container-low dark:bg-zinc-900 rounded-2xl border-2 border-dashed border-violet-300 min-h-[96px]">
                  {sequence.map((_, i) => (
                    answer[i]
                      ? <div key={i} className="flex flex-col items-center gap-1">
                          <Block shapeId={answer[i].shapeId} hex={answer[i].hex} size={70} />
                          <span className="text-[10px] font-black text-on-surface-variant">{i + 1}</span>
                        </div>
                      : <div key={i} className={`flex flex-col items-center justify-center gap-1 w-[70px] h-[70px] rounded-2xl border-2 border-dashed ${i === answer.length ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/30' : 'border-slate-300 dark:border-zinc-700'}`}>
                          <span className="font-black text-slate-400 dark:text-zinc-600 text-sm">{i + 1}</span>
                        </div>
                  ))}
                </div>

                {/* Borrar último */}
                {answer.length > 0 && (
                  <div className="flex justify-center">
                    <button type="button" onClick={() => { playPop(); setAnswer(prev => prev.slice(0, -1)); }}
                      className="px-4 py-2 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-700 dark:text-rose-300 font-extrabold text-xs flex items-center gap-1.5 hover:bg-rose-200 active:scale-95 transition-all cursor-pointer">
                      <span className="material-symbols-outlined text-sm">backspace</span>
                      Borrar último bloque
                    </button>
                  </div>
                )}

                {/* Paleta */}
                <div>
                  <p className="text-xs font-bold text-on-surface-variant mb-3 text-center">
                    Selecciona el bloque para la posición <span className="text-violet-600 font-black">{answer.length + 1}</span>:
                  </p>
                  <div className="grid grid-cols-4 gap-3 sm:gap-4">
                    {SHAPE_DEFS.map(shape =>
                      COLOR_DEFS.map(color => (
                        <Block
                          key={`${shape.id}-${color.id}`}
                          shapeId={shape.id}
                          hex={color.hex}
                          size={64}
                          onClick={() => {
                            playPop();
                            addToAnswer({ shapeId: shape.id, colorId: color.id, hex: color.hex, uid: Math.random().toString(36).slice(2) });
                          }}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ── FASE RESULT ── */}
            {phase === PHASE.RESULT && (
              <div className="flex flex-col items-center text-center gap-6 py-8">
                {result === 'correct' ? (
                  <>
                    <span className="text-7xl select-none" style={{ animation: 'bounce 0.8s infinite' }}>★</span>
                    <h2 className="text-3xl font-black text-emerald-600">¡Perfecto!</h2>
                    <p className="text-sm text-on-surface-variant font-medium max-w-sm">Repetiste la secuencia exacta. ¡Tu memoria es increíble!</p>
                    <div className="flex flex-wrap gap-2 justify-center py-2">
                      {sequence.map((b, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <Block shapeId={b.shapeId} hex={b.hex} size={60} />
                          <span className="text-[10px] font-black text-on-surface-variant">{i + 1}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={nextRound} type="button" className="px-10 py-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-black text-lg shadow-[0_6px_0_#065f46,0_12px_24px_rgba(16,185,129,0.35)] hover:opacity-90 active:scale-95 transition-all flex items-center gap-3 cursor-pointer">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>arrow_forward</span>
                      {roundIdx + 1 >= ROUNDS.length ? '¡Finalizar Juego!' : `Siguiente Ronda →`}
                    </button>
                  </>
                ) : (
                  <>
                    <span className="text-7xl select-none">~</span>
                    <h2 className="text-3xl font-black text-rose-500">¡Casi lo tienes!</h2>
                    <p className="text-sm text-on-surface-variant font-medium">La secuencia correcta era:</p>
                    <div className="flex flex-wrap gap-2 justify-center py-2">
                      {sequence.map((b, i) => (
                        <div key={i} className="flex flex-col items-center gap-1">
                          <Block shapeId={b.shapeId} hex={b.hex} size={60} />
                          <span className="text-[10px] font-black text-on-surface-variant">{i + 1}</span>
                        </div>
                      ))}
                    </div>
                    <button onClick={() => { setAnswer([]); setPhase(PHASE.IDLE); }} type="button" className="px-10 py-4 rounded-full bg-gradient-to-r from-violet-500 to-indigo-600 text-white font-black text-lg shadow-[0_6px_0_#3730a3] hover:opacity-90 active:scale-95 transition-all flex items-center gap-3 cursor-pointer">
                      <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>replay</span>
                      Intentar esta ronda de nuevo
                    </button>
                  </>
                )}
              </div>
            )}

          </div>
        </div>
      </main>
      <Footer />
      <style>{`
        @keyframes slideDown { from{opacity:0;transform:translateY(-20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes slideUp   { from{opacity:0;transform:translateY(24px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes bounceIn  { 0%{opacity:0;transform:scale(0.5)} 60%{transform:scale(1.12)} 100%{opacity:1;transform:scale(1)} }
        .anim-slide-down { animation: slideDown 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        .anim-slide-up   { animation: slideUp   0.5s cubic-bezier(0.16,1,0.3,1) both; }
        .anim-bounce-in  { animation: bounceIn  0.6s cubic-bezier(0.34,1.56,0.64,1) both; }
      `}</style>
    </div>
  );
}
