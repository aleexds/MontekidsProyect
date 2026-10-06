import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/useAuth';
import { ParentHeader } from '../components/ParentHeader';
import Footer from '../components/Footer';

const API = 'http://localhost:3000';

function genCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return 'MK-' + Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

function nextFriday() {
  const d = new Date();
  const day = d.getDay();
  const diff = (5 - day + 7) % 7 || 7;
  d.setDate(d.getDate() + diff);
  return d.toLocaleDateString('es-CR', { weekday: 'long', day: '2-digit', month: 'long' });
}

/* ════ PRIZE CARD ════════════════════════════════════ */
function PrizeCard({ prize, userStars, onBuy, buying }) {
  const canAfford = userStars >= prize.cost;
  const surplus   = userStars - prize.cost;
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#fff', borderRadius: 20, overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        boxShadow: hovered ? `0 16px 48px ${prize.categoryColor}28` : '0 4px 20px rgba(0,0,0,0.08)',
        border: `1.5px solid ${hovered ? prize.categoryColor + '44' : 'rgba(0,0,0,0.06)'}`,
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        transition: 'all 0.25s ease',
      }}
    >
      {/* Badges row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px 0' }}>
        <span style={{
          background: prize.categoryColor + '18', color: prize.categoryColor,
          border: `1px solid ${prize.categoryColor}44`,
          borderRadius: 50, padding: '3px 10px',
          fontSize: 9, fontWeight: 900, letterSpacing: 0.5, textTransform: 'uppercase',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}>{prize.category}</span>
        <span style={{
          background: canAfford ? 'rgba(251,191,36,0.12)' : 'rgba(148,163,184,0.12)',
          color: canAfford ? '#d97706' : '#94a3b8',
          border: `1px solid ${canAfford ? 'rgba(251,191,36,0.3)' : 'rgba(148,163,184,0.2)'}`,
          borderRadius: 50, padding: '3px 10px',
          fontSize: 11, fontWeight: 900, fontFamily: "'Nunito', sans-serif",
        }}>★ {prize.cost}</span>
      </div>

      {/* Emoji area */}
      <div style={{
        background: `linear-gradient(135deg, ${prize.categoryColor}14, ${prize.categoryColor}06)`,
        margin: '12px 14px', borderRadius: 16, height: 140,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
      }}>
        <span style={{ fontSize: 72, filter: !canAfford ? 'grayscale(1)' : 'none' }}>{prize.emoji}</span>
        {prize.tag && (
          <div style={{
            position: 'absolute', bottom: 8, left: 8,
            background: canAfford ? prize.categoryColor : '#94a3b8',
            color: '#fff', borderRadius: 50, padding: '2px 10px',
            fontSize: 9, fontWeight: 800, fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>{prize.tag}</div>
        )}
        {!canAfford && (
          <div style={{
            position: 'absolute', inset: 0, background: 'rgba(248,250,252,0.45)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: 32 }}>🔒</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: '0 16px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{
          margin: '0 0 6px', fontFamily: "'Nunito', sans-serif",
          fontWeight: 900, fontSize: 15, color: '#1e1b4b', lineHeight: 1.3,
        }}>{prize.name}</h3>
        <p style={{
          margin: '0 0 12px', fontSize: 12, color: '#64748b',
          fontFamily: "'Plus Jakarta Sans', sans-serif", lineHeight: 1.5, flex: 1,
        }}>{prize.description}</p>

        {canAfford ? (
          <p style={{
            margin: '0 0 12px', fontSize: 11, color: '#10b981', fontWeight: 700,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            display: 'flex', alignItems: 'center', gap: 4,
          }}>✅ ¡Puedes canjearlo ya! Te sobran {surplus} ★</p>
        ) : (
          <p style={{
            margin: '0 0 12px', fontSize: 11, color: '#94a3b8', fontWeight: 700,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
          }}>Faltan {prize.cost - userStars} ★ para desbloquearlo</p>
        )}

        {canAfford ? (
          <button
            onClick={() => onBuy(prize)}
            disabled={buying === prize.id}
            style={{
              width: '100%',
              background: buying === prize.id ? '#94a3b8' : `linear-gradient(135deg, ${prize.categoryColor}, ${prize.categoryColor}cc)`,
              color: '#fff', border: 'none', borderRadius: 50,
              padding: '11px 0', cursor: buying === prize.id ? 'not-allowed' : 'pointer',
              fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 13,
              boxShadow: buying === prize.id ? 'none' : `0 6px 20px ${prize.categoryColor}44`,
              transition: 'all 0.2s',
            }}
          >{buying === prize.id ? '⏳ Procesando...' : '¡Canjear Premio! 🎁'}</button>
        ) : (
          <div style={{
            width: '100%', background: '#f1f5f9', borderRadius: 50, padding: '11px 0',
            textAlign: 'center', fontFamily: "'Nunito', sans-serif", fontWeight: 800,
            fontSize: 12, color: '#94a3b8',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>🔒 Bloqueado (Faltan {prize.cost - userStars} ★)</div>
        )}
      </div>
    </div>
  );
}

/* ════ VOUCHER CARD ══════════════════════════════════ */
function VoucherCard({ purchase, prizes, childName, teacherName }) {
  const prize = prizes.find(p => p.id === purchase.prizeId) || {};
  const teacher = teacherName || prize.teacher || 'la Docente';
  return (
    <div style={{
      background: '#fff', borderRadius: 18,
      border: '1.5px solid rgba(124,58,237,0.15)',
      padding: '20px 24px',
      display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap',
      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
    }}>
      <div style={{
        width: 60, height: 60, borderRadius: 16, flexShrink: 0,
        background: `linear-gradient(135deg, ${prize.categoryColor || '#7c3aed'}22, ${prize.categoryColor || '#7c3aed'}11)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 30, border: `1.5px solid ${prize.categoryColor || '#7c3aed'}33`,
      }}>{prize.emoji || '🎁'}</div>

      <div style={{ flex: 1, minWidth: 200 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, flexWrap: 'wrap' }}>
          <span style={{
            background: '#dcfce7', color: '#16a34a', borderRadius: 50, padding: '2px 10px',
            fontSize: 9, fontWeight: 900, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: 0.5,
          }}>CANJEADO · LISTO PARA RECLAMAR</span>
          <span style={{ color: '#94a3b8', fontSize: 10, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            CÓDIGO: {purchase.code}
          </span>
        </div>
        <p style={{ margin: '0 0 4px', fontFamily: "'Nunito', sans-serif", fontWeight: 900, fontSize: 15, color: '#1e1b4b' }}>
          Vale: {purchase.prizeName}
        </p>
        <p style={{ margin: 0, fontSize: 12, color: '#64748b', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Muestra este vale a la{' '}
          <strong style={{ color: '#7c3aed' }}>{teacher}</strong>{' '}
          durante la merienda de las 3:30 PM.
        </p>
        <p style={{ margin: '6px 0 0', fontSize: 11, color: '#94a3b8', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
          Asignado a: <strong style={{ color: '#1e1b4b' }}>{childName}</strong>
          {' · '}<span style={{ color: '#10b981' }}>Vigencia: hasta el {nextFriday()}</span>
        </p>
      </div>

      <button
        onClick={() => alert(`Vale ${purchase.code}\n\n${purchase.prizeName}\n\nMuéstralo a la maestra.`)}
        style={{
          display: 'flex', alignItems: 'center', gap: 6,
          background: 'linear-gradient(135deg, #7c3aed, #a855f7)',
          color: '#fff', border: 'none', borderRadius: 50,
          padding: '10px 20px', cursor: 'pointer', flexShrink: 0,
          fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 12,
          boxShadow: '0 4px 16px rgba(124,58,237,0.3)',
        }}
      >🖨️ Descargar Cupón</button>
    </div>
  );
}

/* ════ PÁGINA PRINCIPAL ══════════════════════════════ */
export function PremiosPage() {
  const { activeUser }  = useAuth();
  const [user, setUser]             = useState(null);
  const [prizes, setPrizes]         = useState([]);
  const [purchases, setPurchases]   = useState([]);
  const [teacher, setTeacher]       = useState(null);
  const [loading, setLoading]       = useState(true);
  const [buying, setBuying]         = useState(null);
  const [toast, setToast]           = useState(null);

  const premiosNav = [
    { path: '/juegos',        label: 'Juegos'       },
    { path: '/mis-estrellas', label: 'Mis Estrellas'},
    { path: '/premios',       label: 'Premios'      },
  ];

  const loadData = useCallback(async () => {
    const id = activeUser?.id || localStorage.getItem('currentUserId');
    if (!id) {
      const t = setTimeout(() => setLoading(false), 0);
      return () => clearTimeout(t);
    }

    const userId = id;
    const [userData, prizesData, purchasesData, teachersData] = await Promise.all([
      fetch(`${API}/users/${userId}`).then(r => r.ok ? r.json() : null).catch(() => null),
      fetch(`${API}/prizes`).then(r => r.ok ? r.json() : []).catch(() => []),
      fetch(`${API}/purchases?userId=${userId}`).then(r => r.ok ? r.json() : []).catch(() => []),
      fetch(`${API}/teachers`).then(r => r.ok ? r.json() : []).catch(() => []),
    ]);

    const resolvedUser = userData || activeUser;
    // Buscar el docente que corresponde al aula del hijo
    const classroom = resolvedUser?.child?.classroom;
    const assignedTeacher = (teachersData || []).find(t => t.classroom === classroom) || null;

    setUser(resolvedUser);
    setTeacher(assignedTeacher);
    setPrizes(prizesData || []);
    setPurchases((purchasesData || []).sort((a, b) => new Date(b.purchasedAt) - new Date(a.purchasedAt)));
    setLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUser?.id]);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { loadData(); }, [loadData]);

  const showToast = (msg, color = '#10b981') => {
    setToast({ msg, color });
    setTimeout(() => setToast(null), 3500);
  };

  const handleBuy = async (prize) => {
    if (!user || buying) return;
    if (user.estrellas < prize.cost) { showToast('¡No tienes suficientes estrellas!', '#ef4444'); return; }

    setBuying(prize.id);
    try {
      const newTotal = user.estrellas - prize.cost;
      await fetch(`${API}/users/${user.id}`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estrellas: newTotal }),
      });
      await fetch(`${API}/purchases`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id, prizeId: prize.id, prizeName: prize.name,
          cost: prize.cost, code: genCode(),
          purchasedAt: new Date().toISOString(), status: 'active',
        }),
      });
      setUser(prev => ({ ...prev, estrellas: newTotal }));
      await loadData();
      showToast(`¡Premio canjeado! Muestra el vale a la ${teacher?.name || 'Docente'} 🎉`);
    } catch {
      showToast('Ocurrió un error. Intenta de nuevo.', '#ef4444');
    } finally {
      setBuying(null);
    }
  };

  const estrellas    = user?.estrellas ?? 0;
  const childName    = user?.child?.firstName || user?.name?.split(' ')[0] || 'Explorador';
  const teacherName  = teacher?.name || 'la Docente';
  const affordable   = prizes.filter(p => p.available && estrellas >= p.cost).length;

  return (
    <>
      <style>{`
        @keyframes mkBounce {
          0%   { opacity:0; transform:translateY(30px) scale(0.93); }
          60%  { opacity:1; transform:translateY(-6px) scale(1.02); }
          80%  { transform:translateY(2px) scale(0.99); }
          100% { opacity:1; transform:translateY(0) scale(1); }
        }
        @keyframes mkFloat {
          0%,100% { transform:translateY(0px); }
          50%     { transform:translateY(-10px); }
        }
        @keyframes mkSlideIn {
          from { opacity:0; transform:translateY(-20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .mk-label {
          display:inline-flex; align-items:center; gap:7px;
          font-family:'Nunito',sans-serif; font-weight:800; font-size:11px;
          text-transform:uppercase; letter-spacing:0.8px; color:#7c3aed;
          background:rgba(124,58,237,0.08); border:1px solid rgba(124,58,237,0.2);
          border-radius:50px; padding:4px 14px; margin-bottom:8px;
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#fdf8ff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <ParentHeader customNavItems={premiosNav} />

        {/* Toast */}
        {toast && (
          <div style={{
            position: 'fixed', top: 80, left: '50%', transform: 'translateX(-50%)',
            background: toast.color, color: '#fff', borderRadius: 50, padding: '12px 28px',
            fontFamily: "'Nunito', sans-serif", fontWeight: 800, fontSize: 14,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)', zIndex: 9999, whiteSpace: 'nowrap',
            animation: 'mkSlideIn 0.3s ease forwards',
          }}>{toast.msg}</div>
        )}

        {/* Loading */}
        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 52, animation: 'mkFloat 1.5s ease-in-out infinite', display: 'inline-block' }}>🎁</div>
              <p style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, color: '#7c3aed', marginTop: 16 }}>Cargando premios...</p>
            </div>
          </div>
        )}

        {!loading && (
          <>
            {/* ══ HERO ══════════════════════════════════════════ */}
            <div style={{ background: '#f3f0ff', padding: '90px 20px 0' }}>
            <section style={{
              background: 'linear-gradient(135deg,#7c3aed 0%,#a855f7 50%,#db2777 100%)',
              padding: '52px 32px 52px',
              position: 'relative', overflow: 'hidden',
              borderRadius: 28,
            }}>
              <div style={{ position: 'absolute', width: 350, height: 350, borderRadius: '50%', background: 'radial-gradient(circle,rgba(251,191,36,0.15) 0%,transparent 70%)', top: -100, right: -60, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle,rgba(255,255,255,0.1) 0%,transparent 70%)', bottom: -60, left: 80, pointerEvents: 'none' }} />

              <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
                  <span style={{ background: '#fbbf24', color: '#1c0f00', borderRadius: 50, padding: '4px 14px', fontSize: 10, fontWeight: 900, fontFamily: "'Plus Jakarta Sans',sans-serif", letterSpacing: 0.5 }}>
                    🎀 ¡NUEVOS REGALOS!
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
                  <div style={{ flex: 1, minWidth: 260, opacity: 0, animation: 'mkBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) 100ms forwards' }}>
                    <div style={{ marginBottom: 18 }}>
                      <span style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255,255,255,0.3)', borderRadius: 50, padding: '8px 18px',
                        fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: 14, color: '#fff',
                      }}>
                        ★ Tienes <span style={{ color: '#fbbf24', fontSize: 16 }}>{estrellas} Estrellas</span> para Canjear
                      </span>
                    </div>
                    <h1 style={{ margin: '0 0 12px', fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: 'clamp(24px,4vw,38px)', color: '#fff', lineHeight: 1.15 }}>
                      ¡Tienda de Premios de Montekids! 🎀
                    </h1>
                    <p style={{ margin: 0, color: 'rgba(255,255,255,0.85)', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 14, lineHeight: 1.65, maxWidth: 440 }}>
                      ¡Usa tus estrellas doradas para ganar premios del mundo real en la guardería! Cada actividad completada te acerca a tu regalo favorito.
                    </p>
                  </div>
                  <div style={{
                    width: 160, height: 140, borderRadius: 24, flexShrink: 0,
                    background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
                    border: '1.5px solid rgba(255,255,255,0.25)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 72, animation: 'mkFloat 3s ease-in-out infinite',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.2)',
                  }}>🧸</div>
                </div>
              </div>
            </section>
            </div>

            {/* ══ CATÁLOGO ══════════════════════════════════════ */}
            <section style={{ padding: '40px 24px', background: '#fdf8ff' }}>
              <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 32, opacity: 0, animation: 'mkBounce 0.55s cubic-bezier(0.34,1.56,0.64,1) 250ms forwards' }}>
                  <div>
                    <div className="mk-label"><span>🌟</span> Catálogo de Sorpresas</div>
                    <h2 style={{ margin: 0, fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: 'clamp(22px,3vw,30px)', color: '#1e1b4b' }}>
                      Premios Disponibles en la Guardería
                    </h2>
                    <p style={{ margin: '4px 0 0', color: '#64748b', fontSize: 13 }}>
                    Toca tu premio favorito para canjearlo con la <strong>{teacherName}</strong> al momento del recreo.
                    </p>
                  </div>
                  {affordable > 0 && (
                    <div style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: 50, padding: '6px 16px', fontSize: 12, fontWeight: 800, color: '#059669', fontFamily: "'Nunito',sans-serif", flexShrink: 0 }}>
                      ✅ {affordable} Premio{affordable !== 1 ? 's' : ''} al alcance de {childName}
                    </div>
                  )}
                </div>

                {prizes.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '60px 24px', background: 'rgba(124,58,237,0.04)', borderRadius: 20, border: '1.5px dashed rgba(124,58,237,0.2)' }}>
                    <p style={{ fontSize: 48, marginBottom: 12 }}>🎁</p>
                    <p style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 800, fontSize: 16, color: '#7c3aed', margin: '0 0 6px' }}>No hay premios disponibles aún</p>
                    <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>Pronto habrá nuevas sorpresas esperándote.</p>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: 24 }}>
                    {prizes.map((prize, i) => (
                      <div key={prize.id} style={{ opacity: 0, animation: `mkBounce 0.6s cubic-bezier(0.34,1.56,0.64,1) ${350 + i * 100}ms forwards` }}>
                        <PrizeCard prize={prize} userStars={estrellas} onBuy={handleBuy} buying={buying} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* ══ VALES ACTIVOS ═════════════════════════════════ */}
            <section style={{ padding: '0 24px 60px', background: '#fdf8ff' }}>
              <div style={{ maxWidth: 1100, margin: '0 auto' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 8, opacity: 0, animation: 'mkBounce 0.55s cubic-bezier(0.34,1.56,0.64,1) 600ms forwards' }}>
                  <h2 style={{ margin: 0, fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: 'clamp(18px,2.5vw,24px)', color: '#1e1b4b', display: 'flex', alignItems: 'center', gap: 10 }}>
                    🎫 Tus Vales de Regalo Activos 🎁
                  </h2>
                  {purchases.length > 0 && (
                    <span style={{ color: '#94a3b8', fontSize: 12, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Historial de hoy</span>
                  )}
                </div>

                {purchases.length === 0 ? (
                  <div style={{ background: 'rgba(124,58,237,0.04)', borderRadius: 20, padding: '40px 24px', border: '1.5px dashed rgba(124,58,237,0.15)', textAlign: 'center' }}>
                    <p style={{ fontSize: 40, margin: '0 0 10px' }}>🎫</p>
                    <p style={{ fontFamily: "'Nunito',sans-serif", fontWeight: 800, fontSize: 15, color: '#7c3aed', margin: '0 0 4px' }}>Aún no has canjeado ningún premio</p>
                    <p style={{ color: '#94a3b8', fontSize: 13, margin: 0 }}>Cuando canjees un premio aparecerá aquí como vale digital.</p>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {purchases.map((p, i) => (
                      <div key={p.id} style={{ opacity: 0, animation: `mkBounce 0.55s cubic-bezier(0.34,1.56,0.64,1) ${700 + i * 80}ms forwards` }}>
                        <VoucherCard purchase={p} prizes={prizes} childName={childName} teacherName={teacherName} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* ══ FOOTER SEGURIDAD ══════════════════════════════ */}
            <section style={{ background: '#f8fafc', borderTop: '1px solid #e2e8f0', padding: '28px 24px' }}>
              <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'flex-start', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: 'linear-gradient(135deg,#7c3aed,#a855f7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>🛡️</div>
                <div>
                  <p style={{ margin: '0 0 4px', fontFamily: "'Nunito',sans-serif", fontWeight: 900, fontSize: 14, color: '#1e1b4b' }}>
                    Compromiso de Seguridad y Alimentación Saludable Montekids
                  </p>
                  <p style={{ margin: 0, fontSize: 12, color: '#64748b', fontFamily: "'Plus Jakarta Sans',sans-serif", lineHeight: 1.6, maxWidth: 700 }}>
                    🌱 Todos los cuerpos son supervisados, aprobados y entregados por las docentes en el aula durante los momentos de merienda y recreo. Si tu hijo tiene alergias alimentarias registradas, los postres son adaptados automáticamente.
                  </p>
                </div>
              </div>
            </section>

            <Footer />
          </>
        )}
      </div>
    </>
  );
}
