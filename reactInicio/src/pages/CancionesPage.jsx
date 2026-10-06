import { useState, useEffect, useRef } from 'react';
import { ParentHeader } from '../components/ParentHeader';
import Footer from '../components/Footer';
import { useAuth } from '../context/useAuth';
import { useLanguage } from '../context/LanguageContext';

// Image Asset imports
import gallinitaHero from '../img/gallinitaPintaditaHero.jpg';
import pollitoThumb from '../img/pollitoAmarillitoThumb.jpg';
import maripositaThumb from '../img/maripositaThumb.jpg';
import frogThumb from '../img/frog.jpg';

// Video Asset imports desde src/mp4/
import gallinaPintaditaVideo from '../mp4/Gallina Pintadita.mp4';
import pollitoAmarillitoVideo from '../mp4/Pollito Amarillito.mp4';
import maripositaVideo from '../mp4/Mariposita.mp4';
import elSapoVideo from '../mp4/El Sapo.mp4';
import cucarachitaVideo from '../mp4/Cucarachita.mp4';
import alecrinDoradoVideo from '../mp4/Alecrin Dorado.mp4';
import marianaVideo from '../mp4/Mariana.mp4';
import losPollitosDicenVideo from '../mp4/Los Pollitos Dicen.mp4';

// Helper para extraer ID de YouTube como respaldo
const extractYouTubeId = (input) => {
  if (!input) return '';
  let videoId = input;
  if (input.includes('youtu.be/')) {
    videoId = input.split('youtu.be/')[1]?.split('?')[0] || input;
  } else if (input.includes('watch?v=')) {
    videoId = input.split('watch?v=')[1]?.split('&')[0] || input;
  } else if (input.includes('embed/')) {
    videoId = input.split('embed/')[1]?.split('?')[0] || input;
  }
  return videoId.trim();
};

// ============================================================================
// BASE DE CANCIONES (REPRODUCTOR DE VIDEOS MP4 EDUCATIVOS)
// ============================================================================
const SONGS_DATA = [
  {
    id: 'gallinita-pintadita',
    title: 'La Gallinita Pintadita',
    subtitle: 'GRANJA INFANTIL',
    badgeBg: 'bg-pink-600 text-white',
    duration: '1:54 min',
    youtubeId: 'https://youtu.be/ixlHKpnkkiA?si=Cid8QEJzqPwb1v3U',
    localMediaUrl: gallinaPintaditaVideo,
    thumbnail: gallinitaHero,
    phonetics: {
      title: 'Pedagogía Fonética',
      description: 'Estimula fonemas /G/, /L/ y rimas vocálicas para enriquecer la dicción y la conciencia fonológica en la primera infancia.'
    }
  },
  {
    id: 'pollito-amarillito',
    title: 'El Pollito Amarillito',
    subtitle: 'GRANJA INFANTIL • VOLUMEN 1',
    badgeBg: 'bg-amber-500 text-white',
    duration: '1:55 min',
    youtubeId: 'https://youtu.be/z1gFMujtH-o?si=wF3GsOs_SACROp9t',
    localMediaUrl: pollitoAmarillitoVideo,
    thumbnail: pollitoThumb,
    phonetics: {
      title: 'Pedagogía Fonética & Motricidad',
      description: 'Estimula la coordinación bimanual y patrones rítmicos motores acompañando el compás con las manos.'
    }
  },
  {
    id: 'mariposita-cocina',
    title: 'Mariposita en la Cocina',
    subtitle: 'GRANJA INFANTIL • VOLUMEN 2',
    badgeBg: 'bg-cyan-500 text-white',
    duration: '2:10 min',
    youtubeId: 'https://youtu.be/QRa9On5_grA?si=3hUczriibL1Cvxeu',
    localMediaUrl: maripositaVideo,
    thumbnail: maripositaThumb,
    phonetics: {
      title: 'Pedagogía Fonética & Vocabulario',
      description: 'Enriquece rimas asonantes y asociación de elementos cotidianos de la cocina a través del canto visual.'
    }
  },
  {
    id: 'el-sapo-no-se-lava',
    title: 'El Sapo no se lava el pie',
    subtitle: 'CANCIÓN DE VOCALES',
    badgeBg: 'bg-purple-600 text-white',
    duration: '2:30 min',
    youtubeId: 'https://youtu.be/6rbX0JT98ms?si=d7Hlz7vmG9ujDKtm',
    localMediaUrl: elSapoVideo,
    thumbnail: frogThumb,
    phonetics: {
      title: 'Pedagogía Fonética Vocalica',
      description: 'Ejercicio de sustitución vocálica consciente para ejercitar articulación de mandíbula y labios.'
    }
  },
  {
    id: 'cucarachita',
    title: 'Cucarachita',
    subtitle: 'GRANJA INFANTIL • VOLUMEN 3',
    badgeBg: 'bg-orange-500 text-white',
    duration: '2:05 min',
    youtubeId: 'https://youtu.be/EWmvCS0pT9k?si=tIZbwkXt8sYmXYjB',
    localMediaUrl: cucarachitaVideo,
    thumbnail: gallinitaHero,
    phonetics: {
      title: 'Pedagogía Fonética & Cadencia',
      description: 'Ejercita la cadencia rítmica corporal y la articulación limpia mediante la repetición de rimas vivaces y marcha.'
    }
  },
  {
    id: 'alecrin-dorado',
    title: 'Alecrin Dorado',
    subtitle: 'GRANJA INFANTIL • VOLUMEN 3',
    badgeBg: 'bg-emerald-600 text-white',
    duration: '2:16 min',
    youtubeId: 'https://youtu.be/LbcVZvHH9is?si=mU3izyG-QN7k553r',
    localMediaUrl: alecrinDoradoVideo,
    thumbnail: pollitoThumb,
    phonetics: {
      title: 'Pedagogía Fonética Onomatopéyica',
      description: 'Fomenta la imitación de onomatopeyas animales (/Guau/) y la discriminación de timbres sonoros en la infancia.'
    }
  },
  {
    id: 'mariana-cuenta',
    title: 'Mariana Cuenta 1, 2, 3',
    subtitle: 'CONTEO Y NÚMEROS',
    badgeBg: 'bg-indigo-600 text-white',
    duration: '3:08 min',
    youtubeId: 'https://youtu.be/LMJLfZH_xWU?si=WFzD7P3gbw_l1Sci',
    localMediaUrl: marianaVideo,
    thumbnail: maripositaThumb,
    phonetics: {
      title: 'Pedagogía Fonética & Matemáticas',
      description: 'Favorece la memoria secuencial auditiva y la asociación símbolo-cantidad del 1 al 10 en forma cantada.'
    }
  },
  {
    id: 'los-pollitos-dicen',
    title: 'Los Pollitos Dicen',
    subtitle: 'CANCIÓN TRADICIONAL',
    badgeBg: 'bg-yellow-500 text-slate-900',
    duration: '1:38 min',
    youtubeId: 'https://youtu.be/qcOiqtMsjes?si=t03NYxf8HAxSSAvF',
    localMediaUrl: losPollitosDicenVideo,
    thumbnail: frogThumb,
    phonetics: {
      title: 'Pedagogía Fonética Vocal',
      description: 'Refuerza la entonación afectiva y la fluidez verbal mediante rimas tradicionales de vocalización suave.'
    }
  }
];

export function CancionesPage() {
  const { activeUser } = useAuth();
  const { t } = useLanguage();
  const userId = activeUser?.id || 'guest';
  const todayStr = new Date().toISOString().split('T')[0];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0); // Velocidad 0.8x, 1.0x, 1.2x
  const [songsListenedCount, setSongsListenedCount] = useState(() => {
    const savedCountKey = `mk_songs_listened_count_${userId}_${todayStr}`;
    return parseInt(localStorage.getItem(savedCountKey) || '1', 10);
  });

  const mediaRef = useRef(null); // Ref directo para el elemento <video>

  const currentSong = SONGS_DATA[currentSongIndex];
  const ytVideoId = extractYouTubeId(currentSong.youtubeId);

  // Configuración de navegación traducida
  const gameNav = [
    { path: '/juegos', label: t('parentDashboard.nav.games', 'Juegos') },
    { path: '/canciones', label: t('cancionesPage.badgeSection', 'Canciones') },
    { path: '/juegos/puntuaciones', label: t('starAdmin.title', 'Mis Estrellas') },
    { path: '/premios', label: t('premios.title', 'Premios') },
  ];

  // Aplicar velocidad de reproducción al cambiar el elemento <video>
  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.playbackRate = playbackRate;
    }
  }, [currentSongIndex, playbackRate]);

  // Cambiar velocidad de video en tiempo real
  const handleSpeedChange = (rate) => {
    setPlaybackRate(rate);
    if (mediaRef.current) {
      mediaRef.current.playbackRate = rate;
    }
  };

  // Control total de Reproducción / Pausa para el video MP4
  const handleTogglePlay = () => {
    if (mediaRef.current) {
      if (mediaRef.current.paused) {
        mediaRef.current.play().catch(console.error);
        setIsPlaying(true);
      } else {
        mediaRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(prev => !prev);
    }
  };

  // Control total para Reiniciar la canción desde 0s
  const handleRestart = () => {
    if (mediaRef.current) {
      mediaRef.current.currentTime = 0;
      mediaRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
    setCurrentTime(0);
  };

  // Registrar audición de canción al cargar / reproducir para cumplir la misión diaria "Oyente Atento"
  useEffect(() => {
    localStorage.setItem(`mk_audio_listened_${userId}_${todayStr}`, 'true');
    window.dispatchEvent(new Event('mkAudioListened'));
  }, [userId, todayStr]);

  const handleSelectSong = (index) => {
    setCurrentSongIndex(index);
    setCurrentTime(0);
    setIsPlaying(true);
    setSongsListenedCount(prev => {
      const nextCount = Math.min(5, Math.max(prev, index + 1));
      const savedCountKey = `mk_songs_listened_count_${userId}_${todayStr}`;
      localStorage.setItem(savedCountKey, nextCount.toString());
      return nextCount;
    });

    setTimeout(() => {
      if (mediaRef.current) {
        mediaRef.current.currentTime = 0;
        mediaRef.current.playbackRate = playbackRate;
        mediaRef.current.play().catch(console.error);
      }
    }, 100);
  };

  return (
    <div className="bg-[#FAF8FC] dark:bg-slate-950 font-sans text-on-surface dark:text-slate-100 antialiased min-h-screen flex flex-col selection:bg-pink-100 selection:text-pink-900 transition-colors duration-300">
      <ParentHeader customNavItems={gameNav} />

      {/* Main Container */}
      <main className="w-full pt-20 flex-1 max-w-[1280px] mx-auto px-4 lg:px-8 pb-16 animate-page-bounce">
        
        {/* Header section / Breadcrumbs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 my-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-pink-100 dark:bg-pink-950/60 flex items-center justify-center text-pink-600 dark:text-pink-400 text-2xl shadow-sm">
              🎵
            </div>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-pink-600 dark:text-pink-400 uppercase">
                <span className="bg-pink-100 dark:bg-pink-900/40 text-pink-700 dark:text-pink-300 px-2.5 py-0.5 rounded-full font-bold">
                  {t('cancionesPage.badgeSection', 'RINCÓN RÍTMICO')}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight mt-0.5">
                {t('cancionesPage.title', 'Canciones Infantiles Animadas')}
              </h1>
            </div>
          </div>
        </div>

        {/* Reproductor de Video Principal (Amplio y Cinematográfico) */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-xl border border-purple-100/60 dark:border-purple-900/40 relative overflow-hidden transition-colors duration-300">
            
            {/* Contenedor del Video MP4 */}
            <div className="relative aspect-video w-full bg-slate-950 rounded-2xl overflow-hidden group shadow-inner">
              
              {currentSong.localMediaUrl ? (
                /* Reproductor Nativo MP4 Local */
                <video
                  ref={mediaRef}
                  key={currentSong.id}
                  src={currentSong.localMediaUrl}
                  controls
                  autoPlay
                  playsInline
                  onTimeUpdate={(e) => setCurrentTime(e.target.currentTime)}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onEnded={() => {
                    setIsPlaying(false);
                    setCurrentTime(0);
                  }}
                  className="w-full h-full object-cover"
                />
              ) : (
                /* Respaldo Iframe YouTube */
                <iframe
                  className="w-full h-full object-cover"
                  src={`https://www.youtube-nocookie.com/embed/${ytVideoId}?autoplay=1&enablejsapi=1&rel=0&modestbranding=1`}
                  title={currentSong.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              )}

              {/* Overlays Superiores sobre Video */}
              <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none">
                <span className="bg-pink-600/90 backdrop-blur-md text-white font-black text-xs px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
                  {t('cancionesPage.playingBadge', 'REPRODUCIENDO VIDEO')}
                </span>
                <span className="bg-slate-900/80 backdrop-blur-md text-slate-200 font-bold text-xs px-2.5 py-1 rounded-full">
                  HD 1080p
                </span>
              </div>

              <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md text-white font-mono text-xs px-3 py-1 rounded-full shadow-lg">
                {Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')} / {currentSong.duration}
              </div>
            </div>

            {/* Información del Video */}
            <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-widest block mb-0.5">
                  {currentSong.subtitle}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-800 dark:text-white tracking-tight flex items-center gap-3">
                  {currentSong.title}
                </h2>
              </div>
            </div>

            {/* Barra de Controles de Reproducción, Reinicio y VELOCIDAD */}
            <div className="mt-5 pt-5 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {/* Botón de Reproducir / Pausa 100% Funcional */}
                <button
                  onClick={handleTogglePlay}
                  className="px-5 py-3 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-extrabold text-sm flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
                  title={isPlaying ? t('cancionesPage.pauseVideo', 'Pausar Video') : t('cancionesPage.playVideo', 'Reproducir Video')}
                >
                  <span className="text-lg">{isPlaying ? '⏸' : '▶'}</span>
                  <span>{isPlaying ? t('cancionesPage.pauseVideo', 'Pausar Video') : t('cancionesPage.playVideo', 'Reproducir Video')}</span>
                </button>

                {/* Botón de Reiniciar Canción 100% Funcional */}
                <button
                  onClick={handleRestart}
                  className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-extrabold text-sm flex items-center gap-2 transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
                  title={t('cancionesPage.restartVideo', 'Reiniciar')}
                >
                  <span className="text-lg">🔄</span>
                  <span>{t('cancionesPage.restartVideo', 'Reiniciar')}</span>
                </button>
              </div>

              {/* Selector de Velocidad de Video */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {t('cancionesPage.speedLabel', 'VELOCIDAD:')}
                </span>
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <button
                    onClick={() => handleSpeedChange(0.8)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      playbackRate === 0.8
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-purple-600'
                    }`}
                  >
                    {t('cancionesPage.speedSlow', '0.8x Lento')}
                  </button>
                  <button
                    onClick={() => handleSpeedChange(1.0)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      playbackRate === 1.0
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-teal-600'
                    }`}
                  >
                    {t('cancionesPage.speedNormal', '1.0x Normal')}
                  </button>
                  <button
                    onClick={() => handleSpeedChange(1.2)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      playbackRate === 1.2
                        ? 'bg-pink-600 text-white shadow-sm'
                        : 'text-slate-600 dark:text-slate-300 hover:text-pink-600'
                    }`}
                  >
                    {t('cancionesPage.speedFast', '1.2x Rápido')}
                  </button>
                </div>
              </div>
            </div>

            {/* Caja de Pedagogía Fonética */}
            <div className="mt-5 bg-purple-50/80 dark:bg-purple-950/40 rounded-2xl p-4 border border-purple-100 dark:border-purple-900/50">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-800 dark:text-purple-300 mb-1 flex items-center gap-1.5">
                <span>💡</span> {currentSong.phonetics.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                {currentSong.phonetics.description}
              </p>
            </div>

          </div>
        </div>

        {/* Sección: ¡Elige tu Canción Favorita! (Catálogo) */}
        <div className="mt-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white flex items-center gap-2">
              <span className="text-amber-500">●</span> {t('cancionesPage.catalogTitle', '¡Elige tu Canción Favorita!')}
            </h2>
            <span className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline cursor-pointer">
              {t('cancionesPage.seeAll', 'Ver todas')} ({SONGS_DATA.length}) →
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SONGS_DATA.map((song, idx) => {
              const isCurrent = idx === currentSongIndex;
              return (
                <div
                  key={song.id}
                  onClick={() => handleSelectSong(idx)}
                  className={`cursor-pointer group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-1.5 shadow-lg ${
                    isCurrent
                      ? 'border-2 border-pink-500 ring-4 ring-pink-100 dark:ring-pink-950'
                      : 'border-slate-200/80 dark:border-slate-800 hover:border-pink-300'
                  }`}
                >
                  {/* Thumbnail container */}
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-900">
                    <img
                      src={song.thumbnail}
                      alt={song.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className={`${song.badgeBg} font-black text-[10px] px-2.5 py-0.5 rounded-full tracking-wider uppercase shadow-md`}>
                        {song.badge}
                      </span>
                    </div>

                    <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/90 text-pink-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        {isCurrent ? (
                          <div className="flex items-center gap-1">
                            <span className="w-1 h-3 bg-pink-600 animate-pulse"></span>
                            <span className="w-1 h-4 bg-pink-600 animate-pulse delay-75"></span>
                            <span className="w-1 h-2 bg-pink-600 animate-pulse delay-150"></span>
                          </div>
                        ) : (
                          <svg className="w-6 h-6 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <h3 className="font-extrabold text-slate-800 dark:text-white text-base leading-tight group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors">
                      {song.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-1">
                      {song.category}
                    </p>

                    <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1">
                        ⏱ {song.duration}
                      </span>
                      <span className="bg-pink-50 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 font-bold px-2 py-0.5 rounded-full text-[10px]">
                        {song.tag}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Banner Misión Diaria ("Oyente Atento") */}
        <div className="mt-12 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-400 rounded-3xl p-6 sm:p-8 text-amber-950 shadow-xl relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5">
              <div className="w-16 h-16 rounded-2xl bg-amber-300/80 border-2 border-amber-200 flex items-center justify-center text-4xl shadow-inner shrink-0">
                🐣
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-900/80 mb-1">
                  <span>{t('cancionesPage.dailyMissionTitle', 'MISIÓN DIARIA • OYENTE ATENTO')}</span>
                  <span>•</span>
                  <span>{t('cancionesPage.dailyMissionLevel', 'Nivel Explorador')}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-amber-950">
                  {t('cancionesPage.dailyMissionBannerTitle', '¡Canta y escucha canciones para ganar más estrellitas doradas!')}
                </h3>
                <p className="text-xs sm:text-sm font-medium text-amber-900/90 mt-1 max-w-xl">
                  {t('cancionesPage.dailyMissionBannerDesc', 'Cada canción reproducida ayuda al explorador a asociar sonidos mientras se divierte con los videos de La Gallinita Pintadita.')}
                </p>
              </div>
            </div>

            {/* Progress widget */}
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 border border-amber-200 dark:border-amber-700 min-w-[280px] w-full lg:w-auto shadow-lg text-slate-800 dark:text-slate-100">
              <div className="flex items-center justify-between text-xs font-extrabold mb-2">
                <span>{t('cancionesPage.goalOfDay', 'Meta del Día')}</span>
                <span className="text-amber-600 dark:text-amber-400">{songsListenedCount} / 5 ({songsListenedCount * 20}%)</span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3 bg-amber-100 dark:bg-amber-950 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                  style={{ width: `${songsListenedCount * 20}%` }}
                ></div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-bold mt-2 text-slate-500 dark:text-slate-400">
                <span>{t('cancionesPage.remainingSongs', '¡Faltan canciones!')} ({Math.max(0, 5 - songsListenedCount)})</span>
                <span className="bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 px-2 py-0.5 rounded-full font-black">
                  {t('cancionesPage.bonusReward', '+10 ★ Bonus')}
                </span>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}
