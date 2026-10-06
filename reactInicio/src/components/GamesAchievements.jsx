import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/useAuth';
import { useAwardStars } from '../context/useAwardStars';

const API = 'http://localhost:3000';

const isToday = (dateString) => {
  if (!dateString) return false;
  const d = new Date(dateString);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
};

// Efecto de sonido de victoria sintetizado (C5, E5, G5, C6 Fanfarria)
const playVictorySound = () => {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // Frecuencias de notas musicales de victoria
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.3, ctx.currentTime + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.4);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.12);
      osc.stop(ctx.currentTime + idx * 0.12 + 0.45);
    });
  } catch (err) {
    console.error('Error al reproducir sonido de victoria:', err);
  }
};

export function GamesAchievements() {
  const { activeUser } = useAuth();
  const { awardStars } = useAwardStars();

  const [gamesTodayCount, setGamesTodayCount] = useState(0);
  const [audioListened, setAudioListened] = useState(false);
  const [perfectGameCount, setPerfectGameCount] = useState(0);
  const [bonusClaimed, setBonusClaimed] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const userId = activeUser?.id || localStorage.getItem('currentUserId');
  const todayStr = new Date().toISOString().slice(0, 10);

  const loadProgress = useCallback(() => {
    if (!userId) return;

    // Audio listened today check
    const isAudioDone = localStorage.getItem(`mk_audio_listened_${userId}_${todayStr}`) === 'true';
    setAudioListened(isAudioDone);

    // Bonus claimed check
    const isClaimed = localStorage.getItem(`mk_bonus_claimed_${userId}_${todayStr}`) === 'true';
    setBonusClaimed(isClaimed);

    // Fetch game history
    fetch(`${API}/gameHistory?userId=${userId}`)
      .then(r => r.ok ? r.json() : [])
      .then(history => {
        if (Array.isArray(history)) {
          const todayEntries = history.filter(item => isToday(item.playedAt));
          setGamesTodayCount(todayEntries.length);

          const perfects = todayEntries.filter(
            item => item.errorsCount === 0 || item.flawless === true
          ).length;
          setPerfectGameCount(perfects);
        }
      })
      .catch(err => console.error('Error cargando historial de logros:', err));
  }, [userId, todayStr]);

  useEffect(() => {
    loadProgress();

    // Listen to custom audio event
    const handleAudioEvent = () => loadProgress();
    window.addEventListener('mkAudioListened', handleAudioEvent);

    return () => {
      window.removeEventListener('mkAudioListened', handleAudioEvent);
    };
  }, [loadProgress]);

  // Task Completion Logic
  const task1Done = gamesTodayCount >= 3;
  const task2Done = audioListened;
  const task3Done = perfectGameCount > 0;

  const completedCount = (task1Done ? 1 : 0) + (task2Done ? 1 : 0) + (task3Done ? 1 : 0);
  const progressPercent = Math.round((completedCount / 3) * 100);
  const allTasksCompleted = completedCount === 3;

  const handleClaimBonus = async () => {
    if (!allTasksCompleted || bonusClaimed) return;

    await awardStars('misiones-diarias', 'Misiones Diarias Completadas', 10, '🎁', 0);
    localStorage.setItem(`mk_bonus_claimed_${userId}_${todayStr}`, 'true');
    setBonusClaimed(true);
    setShowModal(true);

    // Reproducir sonido de victoria en lugar de voz hablada
    playVictorySound();
  };

  return (
    <section className="w-full mt-6">
      <div className="bg-surface-container-lowest rounded-3xl p-6 lg:p-8 shadow-sm flex flex-col justify-between border-2 border-surface-container-high relative overflow-hidden">
        
        {/* Header row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shadow-xs">
              <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                emoji_events
              </span>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-on-surface leading-tight m-0">Mis Logros y Misiones de Hoy</h3>
              <p className="text-xs sm:text-sm text-on-surface-variant font-medium mt-0.5">
                {allTasksCompleted 
                  ? '¡Excelente! Has completado todas las tareas del día 🎉' 
                  : `Completa las 3 tareas diarias para reclamar tu cofre con +10 Estrellas ⭐`}
              </p>
            </div>
          </div>
          <span className="px-5 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-black text-sm shadow-sm self-start sm:self-center">
            {progressPercent}%
          </span>
        </div>

        {/* Progress bar */}
        <div className="relative w-full py-2 mb-6">
          <div className="w-full h-6 bg-surface-container rounded-full overflow-hidden p-1 shadow-inner flex items-center">
            <div
              className="h-full bg-gradient-to-r from-primary-container via-secondary-container to-tertiary rounded-full relative transition-all duration-700 shadow-md"
              style={{ width: `${progressPercent}%` }}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse rounded-full"></div>
            </div>
          </div>
          <div className="flex justify-between items-center px-1 mt-2 font-bold text-xs">
            <span className="text-primary flex items-center gap-1">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              Inicio (0/3)
            </span>
            <span className="text-secondary flex items-center gap-1">
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>checklist</span>
              Progreso ({completedCount}/3)
            </span>
            <span className={`flex items-center gap-1 font-black ${allTasksCompleted ? 'text-amber-500 animate-bounce' : 'text-tertiary'}`}>
              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>redeem</span>
              {bonusClaimed ? '¡Cofre Reclamado! 🎁' : '¡Cofre Regalo (+10 ⭐)!'}
            </span>
          </div>
        </div>

        {/* COFRE DE REGALO BANNER SI COMPLETO LAS TAREAS */}
        {allTasksCompleted && (
          <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg animate-pop-bounce">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/30 backdrop-blur-md flex items-center justify-center text-3xl shrink-0">
                🎁
              </div>
              <div>
                <h4 className="font-black text-lg m-0">¡Misiones Diarias Completadas!</h4>
                <p className="text-xs font-bold text-slate-950/80 m-0">
                  {bonusClaimed 
                    ? '¡Ya has reclamado tu recompensa de hoy (+10 Estrellas)! Vuelve mañana por más.'
                    : '¡Tienes un cofre de regalo esperándote! Haz clic para reclamar tus 10 estrellas.'}
                </p>
              </div>
            </div>

            {!bonusClaimed ? (
              <button
                onClick={handleClaimBonus}
                className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-amber-300 font-black text-sm shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-2 cursor-pointer shrink-0"
                type="button"
              >
                <span className="material-symbols-outlined text-amber-400" style={{ fontVariationSettings: "'FILL' 1" }}>stars</span>
                <span>¡Reclamar Regalo (+10 ⭐)!</span>
              </button>
            ) : (
              <span className="px-4 py-2 rounded-full bg-white/30 text-slate-900 font-extrabold text-xs shrink-0">
                ✓ Recompensado Hoy
              </span>
            )}
          </div>
        )}

        {/* MISIONES DIARIAS CARDS */}
        <div className="mb-4">
          <span className="text-xs uppercase tracking-wider text-on-surface-variant font-extrabold block mb-3">
            Tus Tareas Diarias
          </span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Tarea 1 */}
            <div className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
              task1Done 
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800' 
                : 'bg-surface-container-low border-surface-container-high'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl shrink-0 ${
                  task1Done ? 'bg-emerald-500 text-white' : 'bg-surface-container text-on-surface-variant'
                }`}>
                  🎮
                </div>
                <div>
                  <h4 className="font-bold text-sm text-on-surface m-0">Explorador de Juegos</h4>
                  <p className="text-xs text-on-surface-variant font-medium m-0">Juega a 3 partidas hoy</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-black ${
                task1Done ? 'bg-emerald-200 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200' : 'bg-surface-container text-on-surface-variant'
              }`}>
                {gamesTodayCount}/3 {task1Done ? '✓' : ''}
              </span>
            </div>

            {/* Tarea 2 */}
            <div className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
              task2Done 
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800' 
                : 'bg-surface-container-low border-surface-container-high'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl shrink-0 ${
                  task2Done ? 'bg-emerald-500 text-white' : 'bg-surface-container text-on-surface-variant'
                }`}>
                  🎵
                </div>
                <div>
                  <h4 className="font-bold text-sm text-on-surface m-0">Oyente Atento</h4>
                  <p className="text-xs text-on-surface-variant font-medium m-0">Escucha una canción</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-black ${
                task2Done ? 'bg-emerald-200 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200' : 'bg-surface-container text-on-surface-variant'
              }`}>
                {task2Done ? '¡Listo! ✓' : '0/1'}
              </span>
            </div>

            {/* Tarea 3 */}
            <div className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
              task3Done 
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800' 
                : 'bg-surface-container-low border-surface-container-high'
            }`}>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xl shrink-0 ${
                  task3Done ? 'bg-emerald-500 text-white' : 'bg-surface-container text-on-surface-variant'
                }`}>
                  ⭐
                </div>
                <div>
                  <h4 className="font-bold text-sm text-on-surface m-0">Juego Perfecto</h4>
                  <p className="text-xs text-on-surface-variant font-medium m-0">Completa 1 juego sin fallar</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-black ${
                task3Done ? 'bg-emerald-200 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200' : 'bg-surface-container text-on-surface-variant'
              }`}>
                {task3Done ? '¡Logrado! ✓' : '0/1'}
              </span>
            </div>

          </div>
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between bg-surface-container rounded-2xl px-4 py-3">
          <div className="flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-primary text-lg">psychology</span>
            <span className="text-xs font-bold">Misiones pedagógicas adaptadas al ritmo Montessori de {activeUser?.name || 'tu hijo'}</span>
          </div>
        </div>
      </div>

      {/* MODAL DE CELEBRACIÓN AL RECLAMAR EL COFRE (PERFECTAMENTE CENTRADO EN LA VISTA DEL USUARIO) */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-zinc-900 border-4 border-amber-400 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center flex flex-col items-center gap-4 animate-pop-bounce relative my-auto">
            <div className="w-20 h-20 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center text-5xl shadow-inner animate-bounce">
              🎁
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white m-0">
              ¡Cofre de Regalo Abierto!
            </h3>
            <p className="text-sm text-slate-600 dark:text-zinc-300 font-medium leading-relaxed m-0">
              ¡Felicidades! Has completado con éxito tus 3 misiones diarias de hoy. Se agregaron <strong className="text-amber-500 font-black">+10 Estrellas doradas</strong> a tu cuenta.
            </p>
            <div className="text-4xl font-black text-amber-500 py-2">
              +10 ⭐
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="px-8 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-sm shadow-md transition-all hover:scale-105 cursor-pointer"
              type="button"
            >
              ¡Fantástico!
            </button>
          </div>
        </div>
      )}
    </section>
  );
}