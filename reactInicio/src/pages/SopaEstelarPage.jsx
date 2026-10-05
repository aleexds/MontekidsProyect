import { useState, useCallback, useEffect, useMemo } from 'react';
import { ParentHeader } from '../components/ParentHeader';
import { Link } from 'react-router-dom';

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
function playTone(freq, dur = 0.18, type = 'sine') {
  try {
    const ctx = getCtx(); if (!ctx) return;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    osc.type = type; osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.22, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start(now); osc.stop(now + dur + 0.02);
  } catch { /* noop */ }
}
function playWordFound() {
  [587.33, 739.99, 880.00].forEach((f, i) => setTimeout(() => playTone(f, 0.2, 'triangle'), i * 80));
}
function playLevelComplete() {
  [523.25, 659.25, 783.99, 1046.50, 1318.51].forEach((f, i) => setTimeout(() => playTone(f, 0.3, 'sine'), i * 90));
}
function playSelect() { playTone(660, 0.08, 'sine'); }

/* ─────────────────────────────────────────────
   BANCO DE TEMAS — palabras de ≤6 letras para
   que quepan bien en la cuadrícula 9×9
───────────────────────────────────────────── */
const THEME_BANK = [
  {
    theme: '✧ Planetas',
    emoji: '✧',
    color: { from: '#6d28d9', to: '#4338ca', border: '#7c3aed', bg: '#ede9fe' },
    words: ['SOL', 'LUNA', 'MARTE', 'VENUS', 'TIERRA', 'JUPIT', 'ORION', 'COMETA', 'ASTRO'],
  },
  {
    theme: '♌ Animales',
    emoji: '♌',
    color: { from: '#d97706', to: '#b45309', border: '#f59e0b', bg: '#fef3c7' },
    words: ['LEON', 'TIGRE', 'OSO', 'LOBO', 'ZORRO', 'PUMA', 'LINCE', 'JAGUAR', 'COYOTE'],
  },
  {
    theme: '≈ El Mar',
    emoji: '≈',
    color: { from: '#0891b2', to: '#0e7490', border: '#06b6d4', bg: '#cffafe' },
    words: ['OLA', 'TIBURON', 'CORAL', 'FOCA', 'BALLENA', 'PULPO', 'ATUN', 'MEDUSA', 'DELFIN'],
  },
  {
    theme: '† Naturaleza',
    emoji: '†',
    color: { from: '#16a34a', to: '#15803d', border: '#22c55e', bg: '#dcfce7' },
    words: ['ARBOL', 'FLOR', 'HOJA', 'RIO', 'MONTE', 'SELVA', 'PRADO', 'RAIZ', 'BOSQUE'],
  },
  {
    theme: '● Frutas',
    emoji: '●',
    color: { from: '#dc2626', to: '#b91c1c', border: '#ef4444', bg: '#fee2e2' },
    words: ['MANGO', 'PERA', 'UVA', 'KIWI', 'MELON', 'LIMON', 'CEREZA', 'DURAZNO', 'FRESA'],
  },
  {
    theme: '◉ Deportes',
    emoji: '◉',
    color: { from: '#2563eb', to: '#1d4ed8', border: '#3b82f6', bg: '#dbeafe' },
    words: ['FUTBOL', 'TENIS', 'GOLF', 'BOXEO', 'NATACION', 'CICLISMO', 'ARCO', 'POLO', 'REMO'],
  },
  {
    theme: '✦ Colores',
    emoji: '✦',
    color: { from: '#9333ea', to: '#7e22ce', border: '#a855f7', bg: '#f3e8ff' },
    words: ['ROJO', 'AZUL', 'VERDE', 'NEGRO', 'BLANCO', 'GRIS', 'ROSA', 'MORADO', 'MARRON'],
  },
  {
    theme: '⌂ La Casa',
    emoji: '⌂',
    color: { from: '#b45309', to: '#92400e', border: '#d97706', bg: '#fef3c7' },
    words: ['MESA', 'SILLA', 'CAMA', 'SOFA', 'PUERTA', 'TECHO', 'PARED', 'COCINA', 'JARDIN'],
  },
  {
    theme: '► Vehículos',
    emoji: '►',
    color: { from: '#0f766e', to: '#115e59', border: '#14b8a6', bg: '#ccfbf1' },
    words: ['AUTO', 'TREN', 'BARCO', 'AVION', 'MOTO', 'BUS', 'COHETE', 'BICI', 'CAMION'],
  },
  {
    theme: '≡ La Escuela',
    emoji: '≡',
    color: { from: '#7c3aed', to: '#6d28d9', border: '#8b5cf6', bg: '#ede9fe' },
    words: ['LIBRO', 'LAPIZ', 'BORRAR', 'REGLA', 'MAPA', 'AULA', 'RECREO', 'EXAMEN', 'NOTA'],
  },
];

/* ─────────────────────────────────────────────
   GENERADOR DE SOPA DE LETRAS
───────────────────────────────────────────── */
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const DIRECTIONS = [
  [0, 1], [1, 0], [1, 1], [0, -1],
  [-1, 0], [-1, -1], [1, -1], [-1, 1],
];

function buildGrid(size, words) {
  const grid = Array.from({ length: size }, () => Array(size).fill(''));
  const placements = [];

  for (const word of words) {
    let placed = false;
    let attempts = 0;
    while (!placed && attempts < 600) {
      attempts++;
      const [dr, dc] = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
      const r0 = Math.floor(Math.random() * size);
      const c0 = Math.floor(Math.random() * size);
      const cells = [];
      let ok = true;
      for (let i = 0; i < word.length; i++) {
        const r = r0 + dr * i;
        const c = c0 + dc * i;
        if (r < 0 || r >= size || c < 0 || c >= size) { ok = false; break; }
        if (grid[r][c] !== '' && grid[r][c] !== word[i]) { ok = false; break; }
        cells.push({ r, c });
      }
      if (ok) {
        cells.forEach(({ r, c }, i) => { grid[r][c] = word[i]; });
        placements.push({ word, cells });
        placed = true;
      }
    }
    // Fallback horizontal forzado si no se pudo colocar
    if (!placed) {
      for (let r = 0; r < size && !placed; r++) {
        if (word.length <= size) {
          let ok2 = true;
          const cells2 = [];
          for (let i = 0; i < word.length; i++) {
            const c = i;
            if (grid[r][c] !== '' && grid[r][c] !== word[i]) { ok2 = false; break; }
            cells2.push({ r, c });
          }
          if (ok2) {
            cells2.forEach(({ r: rr, c: cc }, i) => { grid[rr][cc] = word[i]; });
            placements.push({ word, cells: cells2 });
            placed = true;
          }
        }
      }
    }
  }

  // Relleno aleatorio
  for (let r = 0; r < size; r++)
    for (let c = 0; c < size; c++)
      if (!grid[r][c]) grid[r][c] = ALPHABET[Math.floor(Math.random() * ALPHABET.length)];

  return { grid, placements };
}

/* ─────────────────────────────────────────────
   GENERA 2 NIVELES ALEATORIOS SIN REPETIR TEMA
───────────────────────────────────────────── */
function generateLevels() {
  // Barajamos el banco y tomamos 2 temas distintos
  const shuffled = [...THEME_BANK].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 2).map((theme, idx) => {
    // Barajamos las palabras del tema y tomamos 5
    const wordPool = [...theme.words].sort(() => Math.random() - 0.5);
    const words = wordPool.slice(0, 5);
    return { id: idx + 1, theme: theme.theme, emoji: theme.emoji, words, gridSize: 9, color: theme.color };
  });
}

/* ─────────────────────────────────────────────
   UTILIDAD: Key de celda
───────────────────────────────────────────── */
const cellKey = (r, c) => `${r},${c}`;

/* ─────────────────────────────────────────────
   PÁGINA PRINCIPAL: SOPA ESTELAR
───────────────────────────────────────────── */
export function SopaEstelarPage() {
  // Niveles aleatorios generados una sola vez al montar
  const [levels] = useState(() => generateLevels());
  const [levelIdx, setLevelIdx] = useState(0);
  const [foundWords, setFoundWords] = useState(new Set());
  const [selecting, setSelecting] = useState(false);
  const [selCells, setSelCells] = useState([]);
  const [flashCells, setFlashCells] = useState(new Set());
  const [foundCells, setFoundCells] = useState(new Set());
  const [gameFinished, setGameFinished] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Animación de entrada
  useEffect(() => { const t = setTimeout(() => setMounted(true), 60); return () => clearTimeout(t); }, []);

  const level = levels[levelIdx];

  // Instrucción de voz inicial
  useEffect(() => {
    if (!mounted) return;
    const themeName = level.theme.slice(level.theme.indexOf(' ') + 1);
    const timer = setTimeout(() => {
      speak(`Tema: ${themeName}. Encuentra todas las palabras.`, 0.88, 1.25);
    }, 600);
    return () => clearTimeout(timer);
  }, [levelIdx, level.theme, mounted]);

  // Construir el grid sólo cuando cambia el nivel (memoizado con useMemo)
  const { grid, placements } = useMemo(() => {
    return buildGrid(level.gridSize, level.words);
  }, [level.gridSize, level.words]);

  /* Registrar palabra encontrada */
  const registerFound = useCallback((word, cells) => {
    playWordFound();
    speak(word, 0.9, 1.3);
    const keys = new Set(cells.map(c => cellKey(c.r, c.c)));
    setFoundCells(prev => new Set([...prev, ...keys]));
    setFlashCells(keys);
    setTimeout(() => setFlashCells(new Set()), 700);

    setFoundWords(prev => {
      const next = new Set([...prev, word]);
      if (next.size === level.words.length) {
        setTimeout(() => {
          playLevelComplete();
          const nextLvl = levelIdx + 1;
          if (nextLvl >= levels.length) {
            speak('¡Completaste toda la Sopa Estelar! ¡Eres brillante!', 0.9, 1.25);
            setGameFinished(true);
          } else {
            setLevelIdx(nextLvl);
            setFoundWords(new Set());
            setFoundCells(new Set());
            setSelCells([]);
          }
        }, 600);
      }
      return next;
    });
  }, [level.words.length, levelIdx, levels.length]);

  /* Drag / Touch select */
  const startSelect = useCallback((r, c) => {
    playSelect();
    setSelecting(true);
    setSelCells([{ r, c }]);
  }, []);

  const continueSelect = useCallback((r, c) => {
    if (!selecting) return;
    setSelCells(prev => {
      if (prev.length === 0) return [{ r, c }];
      const last = prev[prev.length - 1];
      if (prev.length >= 2 && prev[prev.length - 2].r === r && prev[prev.length - 2].c === c) {
        return prev.slice(0, -1);
      }
      const first = prev[0];
      const dr = last.r - first.r;
      const dc = last.c - first.c;
      const len = Math.max(Math.abs(dr), Math.abs(dc));
      const unitDr = len === 0 ? 0 : dr / len;
      const unitDc = len === 0 ? 0 : dc / len;
      const expectedR = last.r + unitDr;
      const expectedC = last.c + unitDc;
      if (prev.length === 1) {
        if (!prev.some(p => p.r === r && p.c === c)) return [...prev, { r, c }];
        return prev;
      }
      if (Math.round(expectedR) === r && Math.round(expectedC) === c) return [...prev, { r, c }];
      return prev;
    });
  }, [selecting]);

  const endSelect = useCallback(() => {
    setSelecting(false);
    const word = selCells.map(({ r, c }) => grid[r][c]).join('');
    const wordRev = [...word].reverse().join('');
    const placement = placements.find(p => p.word === word || p.word === wordRev);
    if (placement && !foundWords.has(placement.word)) {
      registerFound(placement.word, selCells);
    }
    setSelCells([]);
  }, [selCells, grid, placements, foundWords, registerFound]);

  const resetGame = () => {
    // Forzar nuevos niveles aleatorios al reiniciar
    window.location.reload();
  };

  const selKeys = new Set(selCells.map(c => cellKey(c.r, c.c)));
  const cellSize = 36;

  /* ── PANTALLA FINAL ── */
  if (gameFinished) {
    return (
      <div className="bg-background font-sans text-on-surface antialiased min-h-screen flex flex-col">
        <ParentHeader customNavItems={[]} />
        <main className="flex-1 flex flex-col items-center justify-center pt-24 pb-12 px-4 text-center">
          <div className="relative w-40 h-40 mx-auto mb-6 animate-bounce-in">
            <div className="absolute inset-0 rounded-full bg-violet-400/30 animate-ping" />
            <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-indigo-400 to-violet-600 flex items-center justify-center shadow-2xl text-7xl">⭐</div>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-on-surface mb-3 animate-slide-up">¡Sopa Estelar Completada!</h1>
          <p className="text-lg text-on-surface-variant font-bold mb-2 max-w-md animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Encontraste todas las palabras en ambos temas. ¡Eres un buscador de palabras estelar!
          </p>
          <p className="text-4xl font-black text-amber-500 mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>+13 Estrellas ⭐</p>
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <button onClick={resetGame} type="button"
              className="px-8 py-4 rounded-full bg-primary text-white font-extrabold text-base shadow-[0_6px_0_#004f55] hover:opacity-90 active:scale-95 transition-all flex items-center gap-2 cursor-pointer">
              <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>replay</span>
              Jugar otra vez
            </button>
            <Link to="/juegos" className="px-8 py-4 rounded-full bg-surface-container text-on-surface font-extrabold text-base shadow-sm hover:bg-surface-container-high active:scale-95 transition-all flex items-center gap-2">
              <span className="material-symbols-outlined text-xl">arrow_back</span>
              Volver a Juegos
            </Link>
          </div>
        </main>
        <style>{ANIM_STYLES}</style>
      </div>
    );
  }

  return (
    <div className="bg-background font-sans text-on-surface antialiased min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
      <ParentHeader customNavItems={[]} />

      <main className={`w-full pt-20 bg-background flex-1 max-w-[1240px] mx-auto px-3 sm:px-6 lg:px-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
        <div className="flex flex-col w-full pb-16">

          {/* Orbes decorativos */}
          <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
            <div className="absolute -top-24 left-10 w-72 h-72 rounded-full bg-indigo-300/20 blur-3xl" />
            <div className="absolute top-0 right-16 w-80 h-80 rounded-full bg-violet-300/20 blur-3xl" />
            <div className="absolute top-80 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-cyan-200/20 blur-3xl" />
          </div>

          {/* Header */}
          <section className="mt-4 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-slide-down">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-md text-3xl"
                style={{ background: `linear-gradient(135deg, ${level.color.from}, ${level.color.to})` }}>A</div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-on-surface leading-tight">Sopa Estelar</h1>
                <p className="text-xs sm:text-sm font-bold text-on-surface-variant flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full font-black"
                    style={{ background: level.color.bg, color: level.color.from }}>7 a 11 años</span>
                  <span>• Fluidez lectora y vocabulario</span>
                </p>
              </div>
            </div>
            <Link to="/juegos" className="px-4 py-2 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface font-extrabold text-xs transition-all flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Menú de Juegos
            </Link>
          </section>

          {/* Progreso */}
          <div className="w-full bg-white dark:bg-zinc-800/80 rounded-2xl p-4 shadow-sm border border-surface-container-high mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-slide-down" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl text-white font-extrabold text-xs"
                style={{ background: level.color.from }}>Nivel {levelIdx + 1} de {levels.length}</span>
              <span className="text-sm font-extrabold text-on-surface">{level.theme}</span>
            </div>
            <div className="flex items-center gap-1.5">
              {levels.map((_, i) => (
                <div key={i} className={`h-3 rounded-full transition-all duration-300 ${i === levelIdx ? 'w-8' : i < levelIdx ? 'w-3' : 'w-3 bg-surface-container-high'}`}
                  style={{ background: i <= levelIdx ? level.color.from : undefined }} />
              ))}
            </div>
          </div>

          {/* Tema actual — badge llamativo */}
          <div className="mb-4 animate-slide-down" style={{ animationDelay: '0.15s' }}>
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl shadow-md font-black text-lg border-2"
              style={{ background: level.color.bg, color: level.color.from, borderColor: level.color.border }}>
              <span className="text-3xl">{level.emoji}</span>
              <span>Tema: {level.theme.slice(level.theme.indexOf(' ') + 1)}</span>
            </div>
          </div>

          {/* Grid + Lista de palabras */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-6">

            {/* Cuadrícula */}
            <div className="bg-white dark:bg-zinc-800 rounded-3xl p-4 sm:p-6 shadow-lg border-2 overflow-x-auto animate-slide-up" style={{ borderColor: level.color.border, animationDelay: '0.2s' }}>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">{level.emoji}</span>
                <h2 className="text-lg font-black text-on-surface">Encuentra las palabras</h2>
                <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: level.color.bg, color: level.color.from }}>
                  {foundWords.size} / {level.words.length} palabras
                </span>
              </div>

              <div
                className="select-none mx-auto"
                style={{ display: 'grid', gridTemplateColumns: `repeat(${level.gridSize}, ${cellSize}px)`, gap: '2px', width: 'fit-content' }}
                onMouseLeave={endSelect}
              >
                {grid.map((row, r) =>
                  row.map((letter, c) => {
                    const key = cellKey(r, c);
                    const isSel = selKeys.has(key);
                    const isFound = foundCells.has(key);
                    const isFlash = flashCells.has(key);
                    return (
                      <div
                        key={key}
                        onMouseDown={() => startSelect(r, c)}
                        onMouseEnter={() => continueSelect(r, c)}
                        onMouseUp={endSelect}
                        onTouchStart={(e) => { e.preventDefault(); startSelect(r, c); }}
                        onTouchMove={(e) => {
                          e.preventDefault();
                          const touch = e.touches[0];
                          const el = document.elementFromPoint(touch.clientX, touch.clientY);
                          if (el?.dataset?.r && el?.dataset?.c) continueSelect(+el.dataset.r, +el.dataset.c);
                        }}
                        onTouchEnd={endSelect}
                        data-r={r}
                        data-c={c}
                        className={`flex items-center justify-center font-black text-sm rounded-lg cursor-pointer transition-all duration-150 ${
                          isFlash ? 'text-white scale-110'
                          : isFound ? 'text-white'
                          : isSel ? 'text-white scale-105'
                          : 'text-on-surface hover:scale-105'
                        }`}
                        style={{
                          width: cellSize, height: cellSize,
                          background: isFlash ? level.color.from
                            : isFound ? `${level.color.from}cc`
                            : isSel ? level.color.from
                            : 'transparent',
                          border: isSel || isFound ? `2px solid ${level.color.border}` : '2px solid transparent',
                          userSelect: 'none', WebkitUserSelect: 'none',
                        }}
                      >
                        {letter}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Lista de palabras */}
            <div className="bg-white dark:bg-zinc-800 rounded-3xl p-5 shadow-lg border-2 flex flex-col gap-3 animate-slide-up" style={{ borderColor: level.color.border, animationDelay: '0.3s' }}>
              <h3 className="font-black text-on-surface text-base flex items-center gap-2">
                <span className="material-symbols-outlined text-lg" style={{ color: level.color.from, fontVariationSettings: "'FILL' 1" }}>search</span>
                Palabras del tema
              </h3>
              <div className="flex flex-col gap-2">
                {level.words.map(word => (
                  <div key={word}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl font-extrabold text-sm transition-all duration-300 ${foundWords.has(word) ? 'line-through opacity-50' : ''}`}
                    style={{ background: foundWords.has(word) ? level.color.bg : 'rgba(0,0,0,0.03)', color: foundWords.has(word) ? level.color.from : 'inherit' }}>
                    <span className="material-symbols-outlined text-sm"
                      style={{ color: level.color.from, fontVariationSettings: foundWords.has(word) ? "'FILL' 1" : "'FILL' 0" }}>
                      {foundWords.has(word) ? 'check_circle' : 'circle'}
                    </span>
                    {word}
                  </div>
                ))}
              </div>

              {/* Barra de progreso */}
              <div className="mt-auto pt-4 border-t border-surface-container-high">
                <div className="h-3 rounded-full bg-surface-container overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${(foundWords.size / level.words.length) * 100}%`, background: `linear-gradient(90deg, ${level.color.from}, ${level.color.to})` }} />
                </div>
                <p className="text-xs font-bold text-on-surface-variant mt-1 text-center">{foundWords.size} de {level.words.length} encontradas</p>
              </div>

              {/* Instrucción */}
              <p className="text-[11px] font-bold text-on-surface-variant text-center mt-1">
                ◈ Desliza el mouse o el dedo en cualquier dirección sobre las letras.
              </p>
            </div>
          </div>
        </div>
      </main>

      <style>{ANIM_STYLES}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ANIMACIONES COMPARTIDAS
───────────────────────────────────────────── */
const ANIM_STYLES = `
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes bounceIn {
    0%   { opacity: 0; transform: scale(0.5); }
    60%  { transform: scale(1.1); }
    100% { opacity: 1; transform: scale(1); }
  }
  .animate-slide-down {
    animation: slideDown 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }
  .animate-slide-up {
    animation: slideUp 0.5s cubic-bezier(0.16,1,0.3,1) both;
  }
  .animate-bounce-in {
    animation: bounceIn 0.6s cubic-bezier(0.34,1.56,0.64,1) both;
  }
`;
