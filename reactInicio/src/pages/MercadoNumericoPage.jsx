import { useState, useCallback, useEffect } from 'react';
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
    // Si no está disponible no interrumpir
  }
}

/* ─────────────────────────────────────────────
   AUDIO
───────────────────────────────────────────── */
function getCtx() {
  const A = window.AudioContext || window.webkitAudioContext;
  return A ? new A() : null;
}
function playTone(freq, dur = 0.15, type = 'sine') {
  try {
    const ctx = getCtx(); if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    osc.type = type; osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(now); osc.stop(now + dur + 0.02);
  } catch { /* noop */ }
}
function playKey() { playTone(700, 0.08, 'sine'); }
function playCorrect() {
  [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((f, i) => setTimeout(() => playTone(f, 0.28, 'sine'), i * 85));
}
function playWrong() {
  playTone(200, 0.3, 'sawtooth');
  setTimeout(() => playTone(150, 0.25, 'sawtooth'), 140);
}
function playDelete() { playTone(400, 0.08, 'sawtooth'); }

/* ─────────────────────────────────────────────
   CLIENTES / RONDAS
───────────────────────────────────────────── */
const EMOJI_ITEMS = {
  manzana: '🍎', naranja: '🍊', pera: '🍐', uva: '🍇',
  pan: '🍞', leche: '🥛', queso: '🧀', huevo: '🥚',
  libro: '📚', lapiz: '✏️', cuaderno: '📓', regla: '📏',
  tomate: '🍅', zanahoria: '🥕', papa: '🥔', maiz: '🌽',
};

const CLIENTS = [
  // Sumas simples (1 artículo)
  {
    id: 1,
    name: 'Ana',
    emoji: '👧',
    items: [{ name: 'manzana', qty: 3, price: 5 }],
    get total() { return this.items.reduce((s, i) => s + i.qty * i.price, 0); },
    hint: '3 × 5 = ?',
    difficulty: 'fácil',
  },
  {
    id: 2,
    name: 'Carlos',
    emoji: '👦',
    items: [{ name: 'pan', qty: 4, price: 3 }],
    get total() { return this.items.reduce((s, i) => s + i.qty * i.price, 0); },
    hint: '4 × 3 = ?',
    difficulty: 'fácil',
  },
  {
    id: 3,
    name: 'Lucía',
    emoji: '👩',
    items: [{ name: 'leche', qty: 2, price: 8 }, { name: 'pan', qty: 3, price: 3 }],
    get total() { return this.items.reduce((s, i) => s + i.qty * i.price, 0); },
    hint: '(2×8) + (3×3) = ?',
    difficulty: 'medio',
  },
  {
    id: 4,
    name: 'Pedro',
    emoji: '👴',
    items: [{ name: 'naranja', qty: 5, price: 4 }, { name: 'zanahoria', qty: 3, price: 2 }],
    get total() { return this.items.reduce((s, i) => s + i.qty * i.price, 0); },
    hint: '(5×4) + (3×2) = ?',
    difficulty: 'medio',
  },
  {
    id: 5,
    name: 'Sofía',
    emoji: '👩🦱',
    items: [{ name: 'libro', qty: 2, price: 15 }, { name: 'lapiz', qty: 6, price: 2 }],
    get total() { return this.items.reduce((s, i) => s + i.qty * i.price, 0); },
    hint: '(2×15) + (6×2) = ?',
    difficulty: 'medio',
  },
  {
    id: 6,
    name: 'Miguel',
    emoji: '👨',
    items: [{ name: 'queso', qty: 3, price: 12 }, { name: 'huevo', qty: 4, price: 5 }, { name: 'leche', qty: 2, price: 8 }],
    get total() { return this.items.reduce((s, i) => s + i.qty * i.price, 0); },
    hint: '(3×12) + (4×5) + (2×8) = ?',
    difficulty: 'difícil',
  },
  {
    id: 7,
    name: 'Marta',
    emoji: '👵',
    items: [{ name: 'cuaderno', qty: 4, price: 7 }, { name: 'lapiz', qty: 8, price: 2 }, { name: 'regla', qty: 2, price: 5 }],
    get total() { return this.items.reduce((s, i) => s + i.qty * i.price, 0); },
    hint: '(4×7) + (8×2) + (2×5) = ?',
    difficulty: 'difícil',
  },
  {
    id: 8,
    name: 'Roberto',
    emoji: '👨🦳',
    items: [{ name: 'manzana', qty: 6, price: 5 }, { name: 'pera', qty: 4, price: 6 }, { name: 'uva', qty: 3, price: 8 }],
    get total() { return this.items.reduce((s, i) => s + i.qty * i.price, 0); },
    hint: '(6×5) + (4×6) + (3×8) = ?',
    difficulty: 'difícil',
  },
];

/* Mezcla aleatoria del arreglo de clientes */
function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const DIFFICULTY_COLOR = {
  fácil:   { bg: 'bg-emerald-100 dark:bg-emerald-950/40', text: 'text-emerald-700 dark:text-emerald-300' },
  medio:   { bg: 'bg-amber-100 dark:bg-amber-950/40',   text: 'text-amber-700 dark:text-amber-300' },
  difícil: { bg: 'bg-rose-100 dark:bg-rose-950/40',     text: 'text-rose-700 dark:text-rose-300' },
};

/* ─────────────────────────────────────────────
   TECLADO NUMÉRICO
───────────────────────────────────────────── */
function NumPad({ onDigit, onDelete, onSubmit, value, disabled }) {
  const keys = ['7','8','9','4','5','6','1','2','3','0'];
  return (
    <div className="flex flex-col gap-2 w-full max-w-[280px] mx-auto">
      {/* Display */}
      <div className="bg-surface-container-low dark:bg-zinc-900 rounded-2xl h-16 flex items-center justify-center border-2 border-surface-container-high text-4xl font-black text-on-surface tracking-widest select-none">
        {value || <span className="text-on-surface-variant text-2xl font-bold">$  ?</span>}
      </div>
      {/* Grid de dígitos */}
      <div className="grid grid-cols-3 gap-2">
        {keys.map(k => (
          <button
            key={k}
            type="button"
            disabled={disabled}
            onClick={() => { playKey(); onDigit(k); }}
            className="h-14 rounded-2xl bg-white dark:bg-zinc-800 hover:bg-primary-container dark:hover:bg-zinc-700 border border-surface-container-high font-black text-xl text-on-surface shadow-sm active:scale-95 transition-all cursor-pointer disabled:opacity-40"
          >
            {k}
          </button>
        ))}
        {/* Borrar */}
        <button type="button" disabled={disabled} onClick={() => { playDelete(); onDelete(); }}
          className="h-14 rounded-2xl bg-rose-100 dark:bg-rose-950/50 hover:bg-rose-200 border border-rose-200 font-black text-sm text-rose-700 dark:text-rose-300 shadow-sm active:scale-95 transition-all cursor-pointer disabled:opacity-40 flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-base">backspace</span>
        </button>
        {/* Confirmar */}
        <button type="button" disabled={disabled || !value} onClick={() => { onSubmit(); }}
          className="col-span-2 h-14 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-sm shadow-[0_4px_0_#065f46] active:scale-95 transition-all cursor-pointer disabled:opacity-40 flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
          ¡Cobrar!
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PÁGINA PRINCIPAL
───────────────────────────────────────────── */
export function MercadoNumericoPage() {
  // Clientes en orden aleatorio al montar el componente
  const [clients] = useState(() => shuffleArray(CLIENTS));
  const [clientIdx, setClientIdx]   = useState(0);
  const [inputVal, setInputVal]     = useState('');
  const [feedback, setFeedback]     = useState(null);
  const [showHint, setShowHint]     = useState(false);
  const [mounted, setMounted]       = useState(false);

  // Animación de entrada
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);
  const { awardStars } = useAwardStars();
  const [totalErrors, setTotalErrors]   = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [wrongCount, setWrongCount] = useState(0);

  // Instrucción inicial
  useEffect(() => {
    if (mounted && clientIdx === 0 && !gameFinished) {
      speak('¡Bienvenidos al Mercado Numérico! Resuelve la operación para cobrarle al cliente.', 0.88, 1.25);
    }
  }, [mounted, clientIdx, gameFinished]);

  const client = clients[clientIdx];

  const addDigit = useCallback((d) => {
    if (feedback) return;
    setInputVal(prev => (prev.length >= 4 ? prev : prev + d));
  }, [feedback]);

  const deleteDigit = useCallback(() => {
    if (feedback) return;
    setInputVal(prev => prev.slice(0, -1));
  }, [feedback]);

  const submitAnswer = useCallback(() => {
    if (!inputVal || feedback) return;
    const answer = parseInt(inputVal, 10);
    if (answer === client.total) {
      speak('¡Excelente! Cambio exacto.', 0.9, 1.3);
      playCorrect();
      setFeedback('correct');
      setTimeout(() => {
        const next = clientIdx + 1;
        setFeedback(null);
        setInputVal('');
        setShowHint(false);
        setWrongCount(0);
        if (next >= clients.length) { 
          speak('¡Gran trabajo! Has atendido a todos los clientes del mercado.', 0.9, 1.3);
          awardStars('mercado-numerico', 'El Mercado Numérico', 15, '⌂', totalErrors);
          setGameFinished(true); 
        }
        else { setClientIdx(next); }
      }, 1800);
    } else {
      setTotalErrors(t => t + 1);
      speak('Ese no es el total correcto. ¡Vuelve a intentarlo!', 0.88, 1.2);
      playWrong();
      setFeedback('wrong');
      setWrongCount(w => w + 1);
      setTimeout(() => {
        setFeedback(null);
        setInputVal('');
        if (wrongCount + 1 >= 2) setShowHint(true);
      }, 1200);
    }
  }, [inputVal, feedback, client.total, clientIdx, clients.length, wrongCount, awardStars, totalErrors]);

  const resetGame = () => {
    setClientIdx(0);
    setInputVal('');
    setFeedback(null);
    setShowHint(false);
    setGameFinished(false);
    setWrongCount(0);
  };

  /* PANTALLA FINAL */
  if (gameFinished) {
    return (
      <div className="bg-background font-sans text-on-surface antialiased min-h-screen flex flex-col">
        <ParentHeader customNavItems={[]} />
        <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-4 text-center">
          <div className="relative w-40 h-40 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-emerald-400/30 animate-ping" />
            <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center shadow-2xl text-7xl">⌂</div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-on-surface mb-3">¡Mercado Cerrado!</h1>
          <p className="text-lg text-on-surface-variant font-bold mb-2 max-w-md">¡Atendiste a todos los clientes y calculaste todos los totales correctamente!</p>
          <p className="text-5xl font-black text-amber-500 mb-2">+15 Estrellas ⭐</p>
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

  const diffStyle = DIFFICULTY_COLOR[client.difficulty];

  return (
    <div className="bg-background font-sans text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      <ParentHeader customNavItems={[]} />

      <main className={`w-full pt-20 bg-background flex-1 max-w-[1240px] mx-auto px-3 sm:px-6 lg:px-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="flex flex-col w-full pb-16">

          {/* Orbes */}
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-24 left-10 w-72 h-72 rounded-full bg-emerald-300/20 blur-3xl" />
            <div className="absolute top-0 right-16 w-80 h-80 rounded-full bg-teal-300/20 blur-3xl" />
            <div className="absolute top-80 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-green-200/20 blur-3xl" />
          </div>

          {/* Header */}
          <section className="mt-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-md text-3xl">⌂</div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-on-surface leading-tight">El Mercado Numérico</h1>
                <p className="text-xs sm:text-sm font-bold text-on-surface-variant flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-black">7 a 11 años</span>
                  <span>• Aritmética mental y operaciones combinadas</span>
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/juegos" className="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-sm">
                <span className="material-symbols-outlined text-base">arrow_back</span>
                Menú de Juegos
              </Link>
            </div>
          </section>

          {/* Progreso de clientes */}
          <div className="w-full bg-white dark:bg-zinc-800/80 rounded-2xl p-4 shadow-sm border border-surface-container-high mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-emerald-600 text-white font-extrabold text-xs">Cliente {clientIdx + 1} de {clients.length}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs font-extrabold ${diffStyle.bg} ${diffStyle.text}`}>{client.difficulty}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {clients.map((_, i) => (
                <div key={i} className={`h-3 rounded-full transition-all duration-300 ${i === clientIdx ? 'w-8 bg-emerald-500' : i < clientIdx ? 'w-3 bg-emerald-700' : 'w-3 bg-surface-container-high'}`} />
              ))}
            </div>
          </div>

          {/* Zona principal */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Panel del cliente */}
            <div className={`bg-white dark:bg-zinc-800 rounded-3xl p-5 sm:p-7 shadow-lg border-2 border-emerald-300/70 flex flex-col gap-5 transition-all duration-300 ${
              feedback === 'correct' ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30' :
              feedback === 'wrong'   ? 'border-rose-400 bg-rose-50 dark:bg-rose-950/30' : ''
            }`}>
              {/* Cliente */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-amber-100 to-orange-200 dark:from-amber-950/60 dark:to-orange-950/60 flex items-center justify-center text-5xl shadow-md border-2 border-amber-300/60">
                  {client.emoji}
                </div>
                <div>
                  <p className="text-xs font-bold text-on-surface-variant">Cliente en la caja:</p>
                  <h2 className="text-2xl font-black text-on-surface">{client.name}</h2>
                  <p className="text-xs font-medium text-on-surface-variant mt-0.5">¡Calcula el total de su compra!</p>
                </div>
              </div>

              {/* Artículos */}
              <div className="bg-surface-container-low dark:bg-zinc-900 rounded-2xl p-4 border border-surface-container-high">
                <p className="text-xs font-bold text-on-surface-variant mb-3 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>shopping_cart</span>
                  Artículos del cliente:
                </p>
                <div className="flex flex-col gap-2">
                  {client.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white dark:bg-zinc-800 rounded-xl px-4 py-2.5 shadow-sm border border-surface-container-high">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{EMOJI_ITEMS[item.name] || '□'}</span>
                        <div>
                          <p className="font-extrabold text-on-surface text-sm capitalize">{item.name}</p>
                          <p className="text-xs text-on-surface-variant font-medium">${item.price} c/u</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-black text-xs">
                          ×{item.qty}
                        </span>
                        <p className="text-xs font-extrabold text-on-surface mt-0.5">${item.qty * item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total oculto */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-surface-container-high">
                  <span className="font-extrabold text-sm text-on-surface">TOTAL A COBRAR:</span>
                  <span className="font-black text-xl text-on-surface bg-surface-container px-3 py-1 rounded-xl">$???</span>
                </div>
              </div>

              {/* Pista */}
              {showHint ? (
                <div className="bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-700 rounded-2xl p-3 flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-500 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                  <div>
                    <p className="text-xs font-black text-amber-800 dark:text-amber-200">Pista: {client.hint}</p>
                    <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">¡Úsala si la necesitas!</p>
                  </div>
                </div>
              ) : wrongCount >= 1 && (
                <button type="button" onClick={() => setShowHint(true)}
                  className="px-4 py-2 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 font-extrabold text-xs flex items-center gap-1.5 hover:bg-amber-200 active:scale-95 transition-all cursor-pointer self-start">
                  <span className="material-symbols-outlined text-sm">lightbulb</span>
                  Ver pista
                </button>
              )}

              {/* Feedback overlay */}
              {feedback && (
                <div className={`rounded-2xl p-4 text-center font-black text-lg ${
                  feedback === 'correct'
                    ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300'
                    : 'bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300'
                }`}>
                  {feedback === 'correct' ? (
                    <span className="flex items-center justify-center gap-2">✓ ¡Correcto! Total: ${client.total}</span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">✗ Incorrecto, intenta de nuevo</span>
                  )}
                </div>
              )}
            </div>

            {/* Panel del teclado numérico */}
            <div className="bg-white dark:bg-zinc-800 rounded-3xl p-5 sm:p-7 shadow-lg border-2 border-emerald-300/70 flex flex-col items-center justify-center gap-6">
              <div className="text-center">
                <h3 className="text-xl font-black text-on-surface mb-1">Tu cálculo:</h3>
                <p className="text-xs text-on-surface-variant font-medium">Escribe el total exacto y presiona ¡Cobrar!</p>
              </div>
              <NumPad
                value={inputVal}
                onDigit={addDigit}
                onDelete={deleteDigit}
                onSubmit={submitAnswer}
                disabled={!!feedback}
              />

              {/* Instrucción visual de la operación */}
              <div className="w-full bg-surface-container-low dark:bg-zinc-900 rounded-2xl p-3 border border-surface-container-high">
                <p className="text-[11px] font-bold text-on-surface-variant text-center mb-2">Operación a resolver:</p>
                <p className="text-center font-black text-on-surface text-sm">
                  {client.items.map((item, i) => (
                    <span key={i}>
                      {i > 0 && <span className="text-on-surface-variant"> + </span>}
                      <span className="text-emerald-600">{item.qty}</span>
                      <span className="text-on-surface-variant"> × </span>
                      <span className="text-teal-600">${item.price}</span>
                    </span>
                  ))}
                  <span className="text-on-surface-variant"> = </span>
                  <span className="text-2xl">$???</span>
                </p>
              </div>
            </div>

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
