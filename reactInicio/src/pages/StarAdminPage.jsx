import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { ParentHeader } from '../components/ParentHeader';
import Footer from '../components/Footer';

/* ════════════════════════════════════════════════
   CONSTANTES DE NIVELES
════════════════════════════════════════════════ */
const LEVELS = [
  { level: 1, name: 'Semilla', emoji: '🌱', min: 0, max: 49, color: '#10b981' },
  { level: 2, name: 'Curioso', emoji: '🔍', min: 50, max: 99, color: '#3b82f6' },
  { level: 3, name: 'Explorador', emoji: '🚀', min: 100, max: 149, color: '#8b5cf6' },
  { level: 4, name: 'Lector', emoji: '✨', min: 150, max: 999, color: '#f59e0b' },
];

function getLevel(n) {
  return LEVELS.find(l => n >= l.min && n <= l.max) || LEVELS[0];
}
function getNextLevel(n) {
  const idx = LEVELS.findIndex(l => n >= l.min && n <= l.max);
  return LEVELS[idx + 1] || null;
}


/* ════════════════════════════════════════════════
   DATOS FICTICIOS DE ACTIVIDADES DEL DÍA
   (en producción vendrían del historial real)
════════════════════════════════════════════════ */
/* Paleta de color/ícono por gameId (fallback incluido) */
const GAME_STYLES = {
  'monstruo-gloton': { icon: '🎮', color: '#f59e0b', bg: 'linear-gradient(135deg,#f59e0b,#fbbf24)', path: '/juegos/monstruo-gloton' },
  'trencito-sonoro': { icon: '🚂', color: '#7c3aed', bg: 'linear-gradient(135deg,#7c3aed,#a78bfa)', path: '/juegos/trencito-sonoro' },
  'sopa-estelar': { icon: '⭐', color: '#0891b2', bg: 'linear-gradient(135deg,#0891b2,#67e8f9)', path: '/juegos/sopa-estelar' },
  'granja-patitos': { icon: '🐥', color: '#16a34a', bg: 'linear-gradient(135deg,#16a34a,#4ade80)', path: '/juegos/granja-patitos' },
  'mercado-numerico': { icon: '🛒', color: '#ec4899', bg: 'linear-gradient(135deg,#ec4899,#f9a8d4)', path: '/juegos/mercado-numerico' },
  'secuencia-maestra': { icon: '🎯', color: '#e11d48', bg: 'linear-gradient(135deg,#e11d48,#fb7185)', path: '/juegos/secuencia-maestra' },
};
const GAME_DEFAULT = { icon: '🕹️', color: '#7c3aed', bg: 'linear-gradient(135deg,#7c3aed,#a78bfa)', path: '/juegos' };

function formatRelativeDate(iso) {
  const d = new Date(iso);
  const now = new Date();
  const diffMs = now - d;
  const diffH = Math.floor(diffMs / 3600000);
  const diffD = Math.floor(diffMs / 86400000);
  if (diffH < 1) return 'Hace unos minutos';
  if (diffH < 24) return `Hace ${diffH} hora${diffH !== 1 ? 's' : ''}`;
  if (diffD === 1) return 'Ayer';
  return `Hace ${diffD} días`;
}

/* ════════════════════════════════════════════════
   TROFEOS
════════════════════════════════════════════════ */
const TROPHIES = [
  {
    id: 'pinza',
    name: 'Pinza de Oro',
    desc: 'Maestría en encaje y motricidad fina mediante rompecabezas táctiles.',
    unlocked: true,
    icon: '🥇',
    iconBg: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
    border: '#f59e0b',
    tag: 'Premio Montekids',
  },
  {
    id: 'lector',
    name: 'Lector Estrella',
    desc: 'Reconoces con éxito todas las vocales mágicas y sus sonidos fonéticos.',
    unlocked: true,
    icon: '📖',
    iconBg: 'linear-gradient(135deg, #06b6d4, #67e8f9)',
    border: '#06b6d4',
    tag: 'Premio Montekids',
  },
  {
    id: 'melodia',
    name: 'Melodía Mágica',
    desc: 'Escucha 10 canciones.',
    unlocked: true,
    icon: '🎵',
    iconBg: 'linear-gradient(135deg, #ec4899, #f9a8d4)',
    border: '#ec4899',
    tag: 'Premio Montekids',
  },
  {
    id: 'formas',
    name: 'Maestro de Formas',
    desc: 'Juega "Formas y Colores" en el módulo de Juegos para desbloquear este trofeo.',
    unlocked: false,
    icon: '🔒',
    iconBg: 'linear-gradient(135deg, #374151, #4b5563)',
    border: '#374151',
    tag: 'Faltan 5 estrellas más',
    action: 'Ir a Juegos',
    actionHref: '/juegos',
  },
];

/* ════════════════════════════════════════════════
   COMPONENTE ESTRELLA ANIMADA (mascota hero)
════════════════════════════════════════════════ */
function StarMascot() {
  return (
    <div style={{
      width: 130, height: 130, flexShrink: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'mkFloat 3s ease-in-out infinite',
      filter: 'drop-shadow(0 10px 30px rgba(251,191,36,0.5))',
    }}>
      {/* SVG estrella con cara */}
      <svg viewBox="0 0 100 100" width="130" height="130">
        <defs>
          <radialGradient id="starGrad" cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="60%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>
        </defs>
        {/* Cuerpo estrella */}
        <polygon
          points="50,5 61,35 95,35 68,57 79,91 50,70 21,91 32,57 5,35 39,35"
          fill="url(#starGrad)"
          stroke="#f59e0b"
          strokeWidth="1.5"
        />
        {/* Rubor mejillas */}
        <ellipse cx="33" cy="58" rx="7" ry="5" fill="#fca5a5" opacity="0.7" />
        <ellipse cx="67" cy="58" rx="7" ry="5" fill="#fca5a5" opacity="0.7" />
        {/* Ojos */}
        <ellipse cx="41" cy="50" rx="5" ry="6" fill="#1e1b4b" />
        <ellipse cx="59" cy="50" rx="5" ry="6" fill="#1e1b4b" />
        <circle cx="43" cy="48" r="1.8" fill="#fff" />
        <circle cx="61" cy="48" r="1.8" fill="#fff" />
        {/* Boca sonriente */}
        <path d="M42 60 Q50 68 58 60" stroke="#1e1b4b" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        {/* Brillos */}
        <circle cx="22" cy="18" r="3" fill="#fff" opacity="0.6" />
        <circle cx="78" cy="22" r="2" fill="#fff" opacity="0.4" />
      </svg>
    </div>
  );
}

/* ════════════════════════════════════════════════
   BARRA DE NIVEL (hero)
════════════════════════════════════════════════ */
function LevelBar({ estrellas }) {
  const currentLvl = getLevel(estrellas);

  return (
    <div style={{
      background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)',
      borderRadius: 18, padding: '18px 24px',
      border: '1px solid rgba(255,255,255,0.2)',
    }}>
      {/* Stars count + meta */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 13, color: '#fde68a',
        }}>
          ⭐ {estrellas} Estrellas conseguidas
        </span>
        <span style={{
          fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 12,
          color: 'rgba(255,255,255,0.7)',
        }}>
          Meta Nivel 4: 150 ⭐
        </span>
      </div>

      {/* Track */}
      <div style={{
        width: '100%', height: 14, borderRadius: 99,
        background: 'rgba(0,0,0,0.3)', position: 'relative', overflow: 'visible',
        marginBottom: 10,
      }}>
        {/* Progress fill */}
        <div style={{
          position: 'absolute', left: 0, top: 0,
          height: '100%', borderRadius: 99,
          background: 'linear-gradient(90deg, #34d399, #fbbf24, #f59e0b)',
          width: `${Math.max(4, (estrellas / 150) * 100)}%`,
          transition: 'width 1.4s cubic-bezier(0.34,1.56,0.64,1)',
          boxShadow: '0 0 12px #fbbf2488',
        }}>
          {/* Thumb dot */}
          <div style={{
            position: 'absolute', right: -6, top: '50%', transform: 'translateY(-50%)',
            width: 18, height: 18, borderRadius: '50%',
            background: '#fff', border: '3px solid #f59e0b',
            boxShadow: '0 0 10px #f59e0b88',
          }} />
        </div>
      </div>

      {/* Level steps */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {LEVELS.map((l) => {
          const isActive = currentLvl.level === l.level;
          return (
            <div key={l.level} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
              <div style={{
                width: 12, height: 12, borderRadius: '50%',
                background: isActive ? '#fbbf24' : (l.level < currentLvl.level ? '#34d399' : 'rgba(255,255,255,0.25)'),
                border: isActive ? '3px solid #fff' : '2px solid rgba(255,255,255,0.3)',
                boxShadow: isActive ? '0 0 10px #fbbf24' : 'none',
              }} />
              <span style={{
                fontFamily: "'Nunito', sans-serif", fontWeight: isActive ? 900 : 600,
                fontSize: 10,
                color: isActive ? '#fbbf24' : 'rgba(255,255,255,0.55)',
              }}>
                Nivel {l.level}
              </span>
              <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.4)', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                {l.name} {l.emoji}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   TARJETA DE ACTIVIDAD DIARIA
════════════════════════════════════════════════ */
function GameHistoryCard({ game, index }) {
  const navigate = useNavigate();
  const style = GAME_STYLES[game.gameId] || { ...GAME_DEFAULT, icon: game.gameIcon || '🕹️' };
  const icon = game.gameIcon || style.icon;

  return (
    <div style={{
      background: '#fff',
      borderRadius: 20, padding: '22px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
      border: '1px solid rgba(0,0,0,0.06)',
      position: 'relative', overflow: 'hidden',
      opacity: 0,
      animation: `mkBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards`,
      animationDelay: `${400 + index * 120}ms`,
      transition: 'transform 0.2s, box-shadow 0.2s',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = `0 12px 36px ${style.color}22`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)';
      }}
    >
      {/* Stars badge */}
      <div style={{
        position: 'absolute', top: 16, right: 16,
        background: `${style.color}18`,
        border: `1px solid ${style.color}44`,
        borderRadius: 50, padding: '4px 10px',
        fontSize: 11, fontWeight: 900,
        fontFamily: "'Nunito', sans-serif",
        color: style.color,
      }}>
        +{game.starsEarned} ⭐
      </div>

      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 16,
        background: style.bg,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 26, marginBottom: 14,
        boxShadow: `0 4px 14px ${style.color}44`,
      }}>
        {icon}
      </div>

      {/* Area label */}
      <p style={{
        margin: '0 0 4px', fontSize: 10, fontWeight: 800,
        color: style.color, textTransform: 'uppercase',
        letterSpacing: 0.5, fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        Juego completado
      </p>

      {/* Game name */}
      <h3 style={{
        margin: '0 0 6px', fontFamily: "'Nunito', sans-serif",
        fontWeight: 900, fontSize: 17, color: '#1e1b4b',
      }}>
        {game.gameName}
      </h3>

      {/* Total after */}
      <p style={{
        margin: '0 0 16px', fontSize: 12, color: '#64748b',
        fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.5,
      }}>
        Total acumulado tras esta partida:{' '}
        <strong style={{ color: '#f59e0b' }}>{game.totalAfter} ⭐</strong>
      </p>

      {/* Footer: fecha + volver a jugar */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderTop: '1px solid #f1f5f9', paddingTop: 12,
      }}>
        <span style={{ fontSize: 11, color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600 }}>
          🕐 {formatRelativeDate(game.playedAt)}
        </span>
        <button
          onClick={() => navigate(style.path)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: style.color, fontWeight: 800, fontSize: 12,
            fontFamily: "'Nunito', sans-serif",
            display: 'flex', alignItems: 'center', gap: 4,
            padding: 0,
          }}
        >
          Jugar de nuevo →
        </button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════
   TARJETA DE TROFEO
════════════════════════════════════════════════ */
function TrophyCard({ trophy, index }) {
  const navigate = useNavigate();
  return (
    <div style={{
      background: '#fff', borderRadius: 22, padding: '28px 22px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.07)',
      border: `2px solid ${trophy.unlocked ? trophy.border + '44' : '#e2e8f0'}`,
      position: 'relative', overflow: 'hidden',
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      textAlign: 'center',
      opacity: 0,
      animation: `mkBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) forwards`,
      animationDelay: `${600 + index * 120}ms`,
      transition: 'transform 0.22s, box-shadow 0.22s',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = `0 14px 40px ${trophy.border}33`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.07)';
      }}
    >
      {/* Locked overlay */}
      {!trophy.unlocked && (
        <div style={{
          position: 'absolute', top: 12, right: 12,
          color: '#94a3b8', fontSize: 18,
        }}>🔒</div>
      )}

      {/* Icon circle */}
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: trophy.unlocked ? trophy.iconBg : 'linear-gradient(135deg, #e2e8f0, #cbd5e1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 34, marginBottom: 14,
        boxShadow: trophy.unlocked ? `0 6px 20px ${trophy.border}44` : '0 2px 8px rgba(0,0,0,0.1)',
        filter: trophy.unlocked ? 'none' : 'grayscale(0.6)',
      }}>
        {trophy.icon}
      </div>

      {/* Unlocked badge */}
      {trophy.unlocked ? (
        <div style={{
          background: 'linear-gradient(135deg, #34d399, #059669)',
          borderRadius: 50, padding: '3px 12px', marginBottom: 10,
          fontSize: 10, fontWeight: 900, color: '#fff',
          fontFamily: "'Nunito', sans-serif",
          boxShadow: '0 2px 8px #34d39944',
        }}>
          ¡DESBLOQUEADO! 🌟
        </div>
      ) : (
        <div style={{
          background: '#f1f5f9',
          borderRadius: 50, padding: '3px 12px', marginBottom: 10,
          fontSize: 10, fontWeight: 800, color: '#94a3b8',
          fontFamily: "'Nunito', sans-serif",
        }}>
          {trophy.tag}
        </div>
      )}

      {/* Name */}
      <h4 style={{
        margin: '0 0 8px', fontFamily: "'Nunito', sans-serif",
        fontWeight: 900, fontSize: 16,
        color: trophy.unlocked ? '#1e1b4b' : '#94a3b8',
      }}>
        {trophy.name}
      </h4>

      {/* Desc */}
      <p style={{
        margin: '0 0 12px', fontSize: 12, color: '#94a3b8',
        fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.5, flex: 1,
      }}>
        {trophy.desc}
      </p>

      {/* Footer tag / CTA */}
      {trophy.unlocked ? (
        <span style={{
          fontSize: 11, color: trophy.border, fontWeight: 800,
          fontFamily: "'Nunito', sans-serif",
        }}>
          🏅 {trophy.tag}
        </span>
      ) : trophy.action ? (
        <button
          onClick={() => navigate(trophy.actionHref)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#7c3aed', fontWeight: 800, fontSize: 12,
            fontFamily: "'Nunito', sans-serif",
            display: 'flex', alignItems: 'center', gap: 4,
          }}
        >
          {trophy.action} →
        </button>
      ) : null}
    </div>
  );
}

/* ════════════════════════════════════════════════
   PÁGINA PRINCIPAL
════════════════════════════════════════════════ */
export function StarAdminPage() {
  const { activeUser } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentGames, setRecentGames] = useState([]);

  const starsNav = [
    { path: '/juegos',              label: 'Menú de Juegos' },
    { path: '/juegos/puntuaciones', label: 'Mis Puntos'     },
    { path: '/premios',             label: 'Premios 🎁'     },
  ];

  /* Cargar datos frescos del servidor */
  useEffect(() => {
    const id = activeUser?.id || localStorage.getItem('currentUserId');
    if (!id) {
      // Diferir el setState para evitar el warning de set-state-in-effect
      const t = setTimeout(() => setLoading(false), 0);
      return () => clearTimeout(t);
    }

    // Fetch user + historial en paralelo
    // NOTA: json-server v1 no soporta _sort/_order → ordenamos en JS
    const userId = id; // captura estable para el closure
    Promise.all([
      fetch(`http://localhost:3000/users/${userId}`)
        .then(r => r.ok ? r.json() : null)
        .catch(() => null),
      fetch(`http://localhost:3000/gameHistory?userId=${userId}`)
        .then(r => r.ok ? r.json() : [])
        .catch(() => []),
    ])
      .then(([userData, historyData]) => {
        setUser(userData || activeUser);
        const sorted = (historyData || [])
          .sort((a, b) => new Date(b.playedAt) - new Date(a.playedAt))
          .slice(0, 3);
        setRecentGames(sorted);
        setLoading(false);
      })
      .catch(() => {
        setUser(activeUser);
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUser?.id]);

  const estrellas = user?.estrellas ?? 0;
  const childName = user?.child?.firstName || user?.name?.split(' ')[0] || 'Explorador';
  const currentLvl = getLevel(estrellas);
  const nextLvl = getNextLevel(estrellas);
  const starsToNext = nextLvl ? nextLvl.min - estrellas : 0;
  // Suma de estrellas ganadas en las partidas recientes
  const recentStars = recentGames.reduce((sum, g) => sum + (g.starsEarned ?? 0), 0);

  return (
    <>
      <style>{`
        @keyframes mkBounce {
          0%   { opacity:0; transform:translateY(30px) scale(0.93); }
          60%  { opacity:1; transform:translateY(-7px) scale(1.02); }
          80%  { transform:translateY(2px) scale(0.99); }
          100% { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes mkFloat {
          0%,100% { transform:translateY(0px) rotate(-2deg); }
          50%     { transform:translateY(-14px) rotate(2deg); }
        }
        @keyframes mkPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(251,191,36,0.5); }
          50%     { box-shadow: 0 0 0 12px rgba(251,191,36,0); }
        }
        @keyframes mkSpin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        .mk-hero-btn {
          display:inline-flex; align-items:center; gap:8px;
          background:linear-gradient(135deg,#fbbf24,#f59e0b);
          color:#1c0f00; font-family:"Nunito",sans-serif;
          font-weight:900; font-size:15px;
          padding:13px 28px; border-radius:50px;
          border:none; cursor:pointer;
          box-shadow:0 6px 24px rgba(245,158,11,0.45);
          transition:transform 0.2s, box-shadow 0.2s;
          animation:mkPulse 2s ease-in-out infinite;
        }
        .mk-hero-btn:hover {
          transform:translateY(-3px) scale(1.04);
          box-shadow:0 10px 32px rgba(245,158,11,0.55);
          animation:none;
        }
        .mk-section-label {
          display:inline-flex; align-items:center; gap:7px;
          font-family:"Nunito",sans-serif; font-weight:800; font-size:11px;
          text-transform:uppercase; letter-spacing:0.8px;
          color:#7c3aed;
          background:rgba(124,58,237,0.08);
          border:1px solid rgba(124,58,237,0.2);
          border-radius:50px; padding:4px 14px; margin-bottom:8px;
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'var(--bg-main, #fdf8ff)',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        <ParentHeader customNavItems={starsNav} />

        {/* ── LOADING ─────────────────────────────── */}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 52, animation: 'mkFloat 1.5s ease-in-out infinite', display: 'inline-block' }}>⭐</div>
              <p style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 700, color: '#7c3aed', marginTop: 16 }}>
                Cargando tus estrellas...
              </p>
            </div>
          </div>
        )}

        {/* ── NO SESSION ──────────────────────────── */}
        {!loading && !user && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: 24 }}>
            <div style={{ textAlign: 'center', maxWidth: 400 }}>
              <p style={{ fontSize: 50 }}>🔒</p>
              <h2 style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 900, color: '#1e1b4b' }}>
                Inicia sesión primero
              </h2>
              <p style={{ color: '#64748b', marginBottom: 24 }}>
                Para ver tus estrellas necesitas iniciar sesión en tu cuenta Montekids.
              </p>
              <Link to="/login" style={{
                display: 'inline-block', background: 'linear-gradient(135deg,#7c3aed,#a855f7)',
                color: '#fff', padding: '12px 28px', borderRadius: 50,
                fontFamily: "'Nunito',sans-serif", fontWeight: 800, textDecoration: 'none',
              }}>
                Iniciar Sesión
              </Link>
            </div>
          </div>
        )}

        {/* ── MAIN CONTENT ────────────────────────── */}
        {!loading && user && (
          <main style={{ paddingTop: 88, paddingBottom: 0 }}>

            {/* ══════════════════════════════════════
                HERO — Gradiente violeta/magenta
            ══════════════════════════════════════ */}
            <section style={{
              background: 'linear-gradient(135deg, #4c1d95 0%, #7c3aed 45%, #db2777 100%)',
              padding: '40px 24px 56px',
              position: 'relative', overflow: 'hidden',
              opacity: 0,
              animation: 'mkBounce 0.7s cubic-bezier(0.34,1.56,0.64,1) forwards',
            }}>
              {/* Orbs decorativos */}
              <div style={{
                position: 'absolute', width: 320, height: 320, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(251,191,36,0.18) 0%, transparent 70%)',
                top: -80, right: -60, pointerEvents: 'none',
              }} />
              <div style={{
                position: 'absolute', width: 200, height: 200, borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)',
                bottom: -60, left: 60, pointerEvents: 'none',
              }} />

              {/* Badge de MONTEKIDS */}
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <span style={{
                  background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.25)',
                  borderRadius: 50, padding: '4px 16px',
                  fontSize: 11, fontWeight: 800, color: '#fde68a',
                  fontFamily: "'Nunito',sans-serif", letterSpacing: 1,
                }}>
                  MONTEKIDS
                </span>
              </div>

              <div style={{ maxWidth: 900, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap', justifyContent: 'center' }}>

                  {/* Mascota estrella */}
                  <StarMascot />

                  {/* Texto + progress */}
                  <div style={{ flex: 1, minWidth: 280 }}>
                    <h1 style={{
                      margin: '0 0 8px', fontFamily: "'Nunito',sans-serif",
                      fontWeight: 900, lineHeight: 1.1,
                      fontSize: 'clamp(26px, 5vw, 44px)', color: '#fff',
                    }}>
                      ¡Tienes{' '}
                      <span style={{
                        color: '#fbbf24',
                        textShadow: '0 0 30px rgba(251,191,36,0.5)',
                      }}>
                        {estrellas} Estrellas Doradas
                      </span>
                      , {childName}!
                    </h1>

                    <p style={{
                      margin: '0 0 20px', color: 'rgba(255,255,255,0.8)',
                      fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, fontWeight: 500,
                    }}>
                      Nivel {currentLvl.level}: {currentLvl.name} {currentLvl.emoji}
                      {nextLvl && (
                        <>
                          {' • ¡Estás a solo '}
                          <span style={{
                            color: '#fbbf24', fontWeight: 800,
                            textDecoration: 'underline', textDecorationColor: 'rgba(251,191,36,0.5)',
                          }}>
                            {starsToNext} estrellas
                          </span>
                          {` del Nivel ${nextLvl.level} (${nextLvl.name})! 🚀`}
                        </>
                      )}
                      {!nextLvl && ' • ¡Has alcanzado el nivel máximo! 🏆'}
                    </p>

                    {/* Progress bar de niveles */}
                    <LevelBar estrellas={estrellas} />

                  </div>
                </div>
              </div>

            </section>

            {/* ══════════════════════════════════════
                SECCIÓN: PROGRESO DE HOY
            ══════════════════════════════════════ */}
            <section style={{
              background: 'var(--bg-main, #fdf8ff)',
              padding: '48px 24px',
            }}>
              <div style={{ maxWidth: 1100, margin: '0 auto' }}>

                {/* Header */}
                <div style={{
                  display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                  flexWrap: 'wrap', gap: 12, marginBottom: 28,
                  opacity: 0, animation: 'mkBounce 0.55s cubic-bezier(0.34,1.56,0.64,1) 300ms forwards',
                }}>
                  <div>
                    <div className="mk-section-label">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c3aed', display: 'inline-block' }} />
                      Progreso de Hoy
                    </div>
                    <h2 style={{
                      margin: 0, fontFamily: "'Nunito',sans-serif",
                      fontWeight: 900, fontSize: 'clamp(22px, 3vw, 30px)',
                      color: 'var(--text-main, #1d1149)',
                    }}>
                      ¿Cómo ganaste tus ultimas estrellas?
                    </h2>
                    <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 13 }}>
                      Cada actividad divertida te ayuda a crecer, descubrir y aprender jugando.
                    </p>
                  </div>

                  {/* Badge acumulado hoy */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)',
                    borderRadius: 50, padding: '6px 14px',
                    fontSize: 13, fontWeight: 800, color: '#7c3aed',
                    fontFamily: "'Nunito',sans-serif",
                    flexShrink: 0,
                  }}>
                    📅 Últimas partidas: <span style={{ color: '#f59e0b' }}>+{recentStars} ★</span>
                  </div>
                </div>

                {/* Cards de historial de juegos */}
                {recentGames.length === 0 ? (
                  <div style={{
                    textAlign: 'center', padding: '48px 24px',
                    background: 'rgba(124,58,237,0.04)', borderRadius: 20,
                    border: '1.5px dashed rgba(124,58,237,0.2)',
                  }}>
                    <p style={{ fontSize: 40, marginBottom: 12 }}>🎮</p>
                    <p style={{
                      fontFamily: "'Nunito',sans-serif", fontWeight: 800,
                      fontSize: 16, color: '#7c3aed', margin: '0 0 6px',
                    }}>
                      ¡Todavía no hay partidas registradas!
                    </p>
                    <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>
                      Juega cualquier juego Montekids y aparecerá aquí automáticamente.
                    </p>
                  </div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: 20,
                  }}>
                    {recentGames.map((game, i) => (
                      <GameHistoryCard key={game.id} game={game} index={i} />
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* ══════════════════════════════════════
                SECCIÓN: TROFEOS Y LOGROS
            ══════════════════════════════════════ */}
            <section style={{
              background: 'var(--bg-surface-low, #f7f1ff)',
              padding: '48px 24px',
            }}>
              <div style={{ maxWidth: 1100, margin: '0 auto' }}>

                {/* Header */}
                <div style={{
                  display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                  flexWrap: 'wrap', gap: 12, marginBottom: 28,
                  opacity: 0, animation: 'mkBounce 0.55s cubic-bezier(0.34,1.56,0.64,1) 500ms forwards',
                }}>
                  <div>
                    <div className="mk-section-label">
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#7c3aed', display: 'inline-block' }} />
                      Colección de Trofeos
                    </div>
                    <h2 style={{
                      margin: 0, fontFamily: "'Nunito',sans-serif",
                      fontWeight: 900, fontSize: 'clamp(22px, 3vw, 30px)',
                      color: 'var(--text-main, #1d1149)',
                    }}>
                      Tus Medallas y Logros Especiales
                    </h2>
                  </div>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    background: 'rgba(6,182,212,0.08)', border: '1px solid rgba(6,182,212,0.25)',
                    borderRadius: 50, padding: '6px 14px',
                    fontSize: 12, fontWeight: 800, color: '#0891b2',
                    fontFamily: "'Nunito',sans-serif", flexShrink: 0,
                  }}>
                    🏆 3 de 4 desbloqueadas
                  </div>
                </div>

                {/* Cards de trofeos */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
                  gap: 20,
                }}>
                  {TROPHIES.map((t, i) => (
                    <TrophyCard key={t.id} trophy={t} index={i} />
                  ))}
                </div>
              </div>
            </section>

            {/* ══════════════════════════════════════
                BANNER COFRE MÁGICO
            ══════════════════════════════════════ */}
            <section style={{ padding: '0 24px 0', background: 'var(--bg-surface-low, #f7f1ff)' }}>
              <div style={{ maxWidth: 1100, margin: '0 auto', paddingBottom: 40 }}>
                <div style={{
                  background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
                  borderRadius: 24, padding: '28px 32px',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  gap: 20, flexWrap: 'wrap',
                  boxShadow: '0 12px 40px rgba(124,58,237,0.35)',
                  opacity: 0,
                  animation: 'mkBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) 750ms forwards',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
                    {/* Cofre icon */}
                    <div style={{
                      width: 64, height: 64, borderRadius: 18,
                      background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 34, flexShrink: 0,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                    }}>
                      🎁
                    </div>
                    <div>
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4,
                      }}>
                        <span style={{
                          background: 'rgba(255,255,255,0.25)', borderRadius: 50,
                          padding: '2px 10px', fontSize: 10, fontWeight: 900,
                          fontFamily: "'Nunito',sans-serif", color: '#fff',
                        }}>
                          🔓 COFRE MÁGICO LISTO
                        </span>
                      </div>
                      <h3 style={{
                        margin: '0 0 4px', fontFamily: "'Nunito',sans-serif",
                        fontWeight: 900, fontSize: 'clamp(16px,2.5vw,22px)', color: '#fff',
                      }}>
                        ¡Tienes suficientes estrellas para un regalo!
                      </h3>
                      <p style={{
                        margin: 0, color: 'rgba(255,255,255,0.75)',
                        fontSize: 13, fontFamily: "'Plus Jakarta Sans',sans-serif",
                      }}>
                        Visita la sección de Premios para abrir tu cofre mágico y canjear tus estrellas por recompensas.
                      </p>
                    </div>
                  </div>

                  <Link
                    to="/premios"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      background: '#fff', color: '#7c3aed',
                      fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: 15,
                      padding: '13px 26px', borderRadius: 50,
                      textDecoration: 'none', flexShrink: 0,
                      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                      transition: 'transform 0.2s, box-shadow 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                    }}
                  >
                    Ir a Premios 🎁
                  </Link>
                </div>
              </div>
            </section>

            <Footer />
          </main>
        )}
      </div>
    </>
  );
}
