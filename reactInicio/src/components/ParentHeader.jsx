import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import logoMontekids from '../img/logoMontekids.png';
import logoDark from '../img/logoDarkMontekids.png';
import ColorblindToggle from './ColorblindToggle';
import LanguageToggle from './LanguageToggle';
import AiDrawer from './AiDrawer';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/useAuth';

const DEFAULT_AVATARS = [
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150'
];

export function ParentHeader({ customNavItems, hideLanguage = false }) {
  const { t } = useLanguage();
  const { activeUser, setActiveUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isDark, setIsDark] = useState(false);
  const [fontSizeIndex, setFontSizeIndex] = useState(0);
  const [isAiOpen, setIsAiOpen] = useState(false);

  // Estados de configuración de perfil
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editAvatar, setEditAvatar] = useState('');
  const [failedAvatar, setFailedAvatar] = useState(null);
  const [failedPreview, setFailedPreview] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [saveError, setSaveError] = useState('');
  const settingsRef = useRef(null);
  const fileInputRef = useRef(null);

  // Extraer nombre del tutor y del hijo/a dinámicamente desde activeUser (o localStorage como respaldo)
  const getProfileData = () => {
    let user = activeUser;
    if (!user) {
      try {
        const saved = localStorage.getItem('activeUser');
        if (saved) user = JSON.parse(saved);
      } catch {
        user = null;
      }
    }

    if (user) {
      const rawName = user.name || user.nombre || user.fullName || 'Tutor Montekids';
      const nameParts = typeof rawName === 'string' ? rawName.trim().split(/\s+/) : ['Tutor'];
      const parentName = nameParts.length >= 2 ? `${nameParts[0]} ${nameParts[1]}` : (nameParts[0] || 'Tutor');
      const childFirstName = user.child?.firstName || user.child?.name || user.hijo || 'Explorador/a';

      let initials = 'TU';
      if (nameParts.length >= 2 && nameParts[0] && nameParts[1]) {
        initials = `${nameParts[0][0]}${nameParts[1][0]}`.toUpperCase();
      } else if (parentName && parentName.length >= 2) {
        initials = parentName.substring(0, 2).toUpperCase();
      } else if (parentName && parentName.length === 1) {
        initials = parentName.toUpperCase();
      }

      return {
        isLoggedIn: true,
        id: user.id,
        name: parentName,
        fullName: rawName,
        email: user.email || '',
        avatar: user.avatar || user.avatarUrl || user.photo || '',
        role: `Padre de ${childFirstName}`,
        initials: initials
      };
    }

    return {
      isLoggedIn: false,
      name: 'Invitado',
      role: 'Sin sesión activa',
      initials: 'IN',
      avatar: ''
    };
  };

  const userProfile = getProfileData();

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setSaveError(t('parentDashboard.profileSettings.errorInvalidImage', 'Por favor selecciona un archivo de imagen válido (JPG, PNG, WEBP, etc.).'));
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setSaveError(t('parentDashboard.profileSettings.errorImageSize', 'La imagen seleccionada no debe superar los 5MB.'));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setEditAvatar(reader.result);
        setFailedPreview(null);
        setSaveError('');
      }
    };
    reader.onerror = () => {
      setSaveError(t('parentDashboard.profileSettings.errorInvalidImage', 'Error al leer la imagen del dispositivo.'));
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleToggleSettings = () => {
    if (!isSettingsOpen) {
      const currentSource = activeUser || userProfile;
      setEditName(currentSource.name || currentSource.fullName || currentSource.nombre || '');
      setEditEmail(currentSource.email || '');
      setEditAvatar(currentSource.avatar || currentSource.avatarUrl || currentSource.photo || '');
      setSaveMessage('');
      setSaveError('');
      setFailedPreview(null);
      setIsSettingsOpen(true);
    } else {
      setIsSettingsOpen(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setIsSettingsOpen(false);
      }
    };

    if (isSettingsOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSettingsOpen]);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    const targetUserId = activeUser?.id || userProfile?.id;
    if (!targetUserId) return;

    if (!editName.trim()) {
      setSaveError(t('parentDashboard.profileSettings.errorNameRequired', 'El nombre no puede estar vacío.'));
      return;
    }
    if (!editEmail.trim()) {
      setSaveError(t('parentDashboard.profileSettings.errorEmailRequired', 'El correo electrónico no puede estar vacío.'));
      return;
    }

    setSaving(true);
    setSaveError('');
    setSaveMessage('');

    const updatedFields = {
      name: editName.trim(),
      email: editEmail.trim(),
      avatar: editAvatar.trim()
    };

    try {
      const response = await fetch(`http://localhost:3000/users/${targetUserId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFields)
      });

      if (!response.ok) throw new Error('Error al actualizar en la base de datos');

      const updatedUser = await response.json();
      if (typeof setActiveUser === 'function') setActiveUser(updatedUser);
      localStorage.setItem('activeUser', JSON.stringify(updatedUser));
      setSaveMessage(t('parentDashboard.profileSettings.successMessage', '¡Perfil actualizado con éxito!'));

      setTimeout(() => {
        setIsSettingsOpen(false);
        setSaveMessage('');
      }, 1000);
    } catch (err) {
      console.warn('Fallo al guardar en db.json, guardando en localStorage:', err);
      const baseObj = activeUser || (userProfile.isLoggedIn ? { id: targetUserId, ...userProfile } : {});
      const localUpdated = { ...baseObj, ...updatedFields };
      if (typeof setActiveUser === 'function') setActiveUser(localUpdated);
      localStorage.setItem('activeUser', JSON.stringify(localUpdated));
      setSaveMessage(t('parentDashboard.profileSettings.localSuccessMessage', '¡Perfil guardado localmente!'));

      setTimeout(() => {
        setIsSettingsOpen(false);
        setSaveMessage('');
      }, 1000);
    } finally {
      setSaving(false);
    }
  };

  const fontClasses = ['text-sm-size', 'text-md-size', 'text-lg-size'];
  const fontLabels = ['A', 'A+', 'A++'];

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleFontSize = () => {
    const nextIndex = (fontSizeIndex + 1) % fontClasses.length;
    fontClasses.forEach(cls => document.documentElement.classList.remove(cls));
    if (nextIndex !== 0) {
      document.documentElement.classList.add(fontClasses[nextIndex]);
    }
    setFontSizeIndex(nextIndex);
  };

  // Enlaces por defecto (Padres) o personalizados (Juegos u otras vistas)
  const defaultNavItems = [
    { path: '/mi-hijo-a', label: t('parentDashboard.nav.myChild', 'Mi Hijo/a') },
    { path: '/mis-comentarios-reportes', label: t('parentDashboard.nav.reports', 'Mis Comentarios/Reportes') },
    { path: '/calendario-de-actividades', label: t('parentDashboard.nav.calendar', 'Calendario de Actividades') }
  ];

  const isAdminView = location.pathname.startsWith('/admin') || location.pathname.startsWith('/owner') || location.pathname.startsWith('/dueno');
  const isGameView = Boolean(customNavItems) || location.pathname.startsWith('/juegos');
  const navItems = customNavItems || defaultNavItems;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-md border-b border-surface-container-high transition-colors duration-300">
        <div className="h-20 max-w-[1440px] mx-auto px-4 md:px-8 flex items-center justify-between gap-4">

          <Link to="/" className="flex items-center gap-2 shrink-0">
            <img src={logoMontekids} alt="Logo MonteKids" className="h-9 sm:h-14 w-auto block dark:hidden transition-opacity duration-300" />
            <img src={logoDark} alt="Logo MonteKids Dark" className="h-9 sm:h-14 w-auto hidden dark:block transition-opacity duration-300" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1.5 p-1.5 bg-surface-container-high/40 rounded-full border border-surface-container-high">
            {navItems.map((item) => {
              const currentFullPath = location.pathname + location.hash;
              const isActive =
                location.pathname === item.path ||
                currentFullPath === item.path ||
                (item.path === '/admin#dashboard' && location.pathname === '/admin' && (!location.hash || location.hash === '#dashboard' || location.hash === '')) ||
                (item.path === '/admin' && location.pathname === '/admin' && (!location.hash || location.hash === '#dashboard' || location.hash === '')) ||
                (item.path === '/owner-dashboard#dashboard' && (location.pathname === '/owner-dashboard' || location.pathname === '/owner' || location.pathname === '/dueno-dashboard') && (!location.hash || location.hash === '#dashboard' || location.hash === '')) ||
                (item.path === '/mi-hijo-a' && (location.pathname === '/' || location.pathname === '/parent-dashboard'));

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-full text-xs transition-all ${
                    isActive
                      ? 'font-bold bg-tertiary-container text-on-tertiary-container shadow-xs'
                      : 'font-semibold text-on-surface-variant hover:text-primary hover:bg-surface-container-highest'
                  }`}
                >
                  {item.label}
                </NavLink>
              );
            })}

            {/* Botón contextual en la barra de navegación */}
            {!isAdminView && (
              isGameView ? (
                <NavLink
                  to="/mi-hijo-a"
                  className="ml-1 px-3.5 py-2 rounded-full text-xs font-bold text-primary dark:text-primary-container hover:bg-surface-container-highest flex items-center gap-1.5 transition-all"
                  title={t('parentDashboard.nav.backToDashboard', 'Volver al Panel de Padres')}
                >
                  <span className="material-symbols-outlined text-[16px]">dashboard</span>
                  <span>{t('parentDashboard.nav.backToDashboard', 'Panel de Padres')}</span>
                </NavLink>
              ) : (
                <NavLink
                  to="/juegos"
                  className="ml-1 px-3.5 py-2 rounded-full text-xs font-bold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 flex items-center gap-1.5 transition-all"
                  title={t('parentDashboard.nav.goToGames', 'Ir a Juegos')}
                >
                  <span className="material-symbols-outlined text-[16px]">sports_esports</span>
                  <span>{t('parentDashboard.nav.games', 'Juegos')}</span>
                </NavLink>
              )
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={toggleFontSize}
              title={t('nav.changeTextSize', 'Cambiar tamaño de texto')}
              type="button"
              className="px-3 py-1.5 rounded-full bg-surface-container-high text-on-surface font-extrabold text-xs hover:bg-surface-container-low transition-all flex items-center justify-center shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px] mr-1">text_fields</span>
              {fontLabels[fontSizeIndex]}
            </button>

            <ColorblindToggle />
            {!hideLanguage && <LanguageToggle />}

            <button
              onClick={() => setIsDark(!isDark)}
              aria-label={t('nav.changeTheme', 'Cambiar tema')}
              type="button"
              className="p-2 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-low transition-all flex items-center justify-center shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* SECCIÓN PERFIL */}
            <div className="relative" ref={settingsRef}>
              <div className="flex items-center gap-2 pl-1.5 py-1 pr-2.5 bg-surface-container-low border border-surface-container-high rounded-full shadow-2xs">
                <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container font-bold flex items-center justify-center text-xs shrink-0 overflow-hidden ring-1 ring-primary/20">
                  {userProfile.avatar && failedAvatar !== userProfile.avatar ? (
                    <img
                      key={userProfile.avatar}
                      src={userProfile.avatar}
                      alt={userProfile.name}
                      className="w-full h-full object-cover"
                      onError={() => setFailedAvatar(userProfile.avatar)}
                    />
                  ) : (
                    <span>{userProfile.initials}</span>
                  )}
                </div>

                <div className="hidden sm:flex flex-col text-left">
                  <span className="text-xs font-bold text-on-surface leading-tight truncate max-w-[130px]">
                    {userProfile.name}
                  </span>
                </div>

                {userProfile.isLoggedIn && (
                  <div className="flex items-center gap-0.5 ml-1">
                    <button
                      onClick={handleToggleSettings}
                      title={t('parentDashboard.profileSettings.settingsTooltip', 'Configuración de perfil')}
                      type="button"
                      className={`p-1.5 flex items-center justify-center rounded-full transition-all cursor-pointer ${
                        isSettingsOpen
                          ? 'bg-primary text-white rotate-90 shadow-sm'
                          : 'text-on-surface-variant hover:text-primary hover:bg-surface-container-highest'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[17px] transition-transform duration-300">
                        settings
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        logout();
                        navigate('/LOGIN');
                      }}
                      title={t('auth.logout', 'Cerrar sesión')}
                      type="button"
                      className="text-on-surface-variant hover:text-red-500 transition-colors p-1.5 flex items-center justify-center rounded-full hover:bg-surface-container-highest cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[17px]">logout</span>
                    </button>
                  </div>
                )}
              </div>

              {/* PANEL DESPLEGABLE */}
              <div
                className={`absolute right-0 top-full mt-3 w-80 sm:w-96 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 shadow-2xl shadow-slate-900/20 dark:shadow-black/60 rounded-3xl p-5 z-50 font-sans transition-all duration-200 ease-out origin-top-right ${
                  isSettingsOpen
                    ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto visible'
                    : 'opacity-0 scale-95 -translate-y-2 pointer-events-none invisible'
                }`}
              >
                <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-zinc-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-xs">
                      <span className="material-symbols-outlined text-[19px]">manage_accounts</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-tight">
                        {t('parentDashboard.profileSettings.title', 'Configuración de Perfil')}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-zinc-400 font-medium">
                        {t('parentDashboard.profileSettings.subtitle', 'Actualiza tus datos y foto')}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsSettingsOpen(false)}
                    className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-500 hover:text-slate-800 dark:text-zinc-400 dark:hover:text-zinc-100 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>

                <form onSubmit={handleSaveProfile} className="flex flex-col gap-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1.5">
                      {t('parentDashboard.profileSettings.photoLabel', 'Foto de Perfil')}
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                    />

                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-14 h-14 rounded-2xl bg-primary-container text-on-primary-container font-black flex items-center justify-center text-lg overflow-hidden shrink-0 border-2 border-primary/20 shadow-xs relative group">
                        {editAvatar && failedPreview !== editAvatar ? (
                          <img
                            key={editAvatar}
                            src={editAvatar}
                            alt="Vista previa"
                            className="w-full h-full object-cover"
                            onError={() => setFailedPreview(editAvatar)}
                          />
                        ) : (
                          <span>{userProfile.initials}</span>
                        )}
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          title={t('parentDashboard.profileSettings.changePhotoHover', 'Cambiar foto desde el dispositivo')}
                          className="absolute inset-0 bg-black/40 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[20px]">photo_camera</span>
                        </button>
                      </div>

                      <div className="flex-1 flex flex-col gap-1 min-w-0">
                        <span className="text-[11px] font-semibold text-slate-600 dark:text-zinc-400">
                          {t('parentDashboard.profileSettings.quickOptions', 'Opciones rápidas o iniciales:')}
                        </span>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          {DEFAULT_AVATARS.map((avUrl, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => {
                                setEditAvatar(avUrl);
                                setFailedPreview(null);
                              }}
                              title={`Avatar sugerido ${idx + 1}`}
                              className={`w-7 h-7 rounded-xl overflow-hidden border transition-all cursor-pointer hover:scale-105 ${
                                editAvatar === avUrl
                                  ? 'border-primary ring-2 ring-primary/40'
                                  : 'border-slate-200 dark:border-zinc-700 opacity-80 hover:opacity-100'
                              }`}
                            >
                              <img src={avUrl} alt={`Avatar ${idx + 1}`} className="w-full h-full object-cover" />
                            </button>
                          ))}
                          {editAvatar && (
                            <button
                              type="button"
                              onClick={() => {
                                setEditAvatar('');
                                setFailedPreview(null);
                              }}
                              title={t('parentDashboard.profileSettings.initialsBtn', 'Iniciales')}
                              className="px-2 py-1 rounded-lg text-[10px] font-bold bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 transition-colors cursor-pointer"
                            >
                              {t('parentDashboard.profileSettings.initialsBtn', 'Iniciales')}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-slate-800 dark:text-zinc-200 text-xs font-bold border border-slate-200 dark:border-zinc-700 transition-all cursor-pointer active:scale-[0.99] mb-2 shadow-2xs hover:shadow-xs"
                    >
                      <span className="material-symbols-outlined text-[18px] text-primary">
                        add_photo_alternate
                      </span>
                      <span>{t('parentDashboard.profileSettings.uploadDeviceBtn', 'Seleccionar foto del dispositivo')}</span>
                    </button>

                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 text-[16px]">
                        link
                      </span>
                      <input
                        type="url"
                        value={editAvatar.startsWith('data:') ? '' : editAvatar}
                        onChange={(e) => {
                          setEditAvatar(e.target.value);
                          setFailedPreview(null);
                        }}
                        placeholder={t('parentDashboard.profileSettings.urlPlaceholder', 'O pega una URL de foto web (https://...)')}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 focus:border-primary focus:bg-white dark:focus:bg-zinc-800 focus:ring-1 focus:ring-primary outline-none text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">
                      {t('parentDashboard.profileSettings.nameLabel', 'Nombre Completo')}
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 text-[16px]">
                        person
                      </span>
                      <input
                        type="text"
                        required
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        placeholder={t('parentDashboard.profileSettings.namePlaceholder', 'Tu nombre completo...')}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 focus:border-primary focus:bg-white dark:focus:bg-zinc-800 focus:ring-1 focus:ring-primary outline-none text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 transition-all font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 dark:text-zinc-200 mb-1">
                      {t('parentDashboard.profileSettings.emailLabel', 'Correo Electrónico')}
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500 text-[16px]">
                        mail
                      </span>
                      <input
                        type="email"
                        required
                        value={editEmail}
                        onChange={(e) => setEditEmail(e.target.value)}
                        placeholder={t('parentDashboard.profileSettings.emailPlaceholder', 'ejemplo@correo.com')}
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-zinc-800/80 border border-slate-200 dark:border-zinc-700 focus:border-primary focus:bg-white dark:focus:bg-zinc-800 focus:ring-1 focus:ring-primary outline-none text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-zinc-500 transition-all font-medium"
                      />
                    </div>
                  </div>

                  {saveError && (
                    <div className="p-2.5 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800/50 text-red-700 dark:text-red-400 text-xs flex items-center gap-1.5 animate-in fade-in">
                      <span className="material-symbols-outlined text-[16px]">error</span>
                      <span>{saveError}</span>
                    </div>
                  )}

                  {saveMessage && (
                    <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-1.5 animate-in fade-in">
                      <span className="material-symbols-outlined text-[16px]">check_circle</span>
                      <span>{saveMessage}</span>
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-zinc-800 mt-1">
                    <button
                      type="button"
                      onClick={() => setIsSettingsOpen(false)}
                      className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
                    >
                      {t('parentDashboard.profileSettings.cancelBtn', 'Cancelar')}
                    </button>

                    <button
                      type="submit"
                      disabled={saving}
                      className="px-4 py-2 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
                    >
                      {saving ? (
                        <>
                          <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
                          <span>{t('parentDashboard.profileSettings.savingBtn', 'Guardando...')}</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[16px]">save</span>
                          <span>{t('parentDashboard.profileSettings.saveBtn', 'Guardar Cambios')}</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </header>

      {/* BOTÓN FLOTANTE ASISTENTE IA (Fijo en esquina inferior derecha) */}
      <button
        onClick={() => setIsAiOpen(true)}
        type="button"
        aria-label={t('nav.aiAssistant', 'Asistente IA')}
        title={t('nav.aiAssistant', 'Asistente IA')}
        className="fixed bottom-6 right-6 z-40 group flex items-center gap-2.5 px-4 py-3 bg-primary-container text-slate-900 rounded-full shadow-[0_8px_25px_rgba(0,219,235,0.45)] dark:shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:shadow-2xl hover:scale-105 hover:brightness-95 active:scale-95 transition-all duration-300 border border-white/40 dark:border-cyan-300/30 cursor-pointer"
      >
        <span className="material-symbols-outlined text-[22px] text-slate-900 group-hover:rotate-12 group-hover:scale-110 transition-transform duration-300">
          smart_toy
        </span>
        <span className="text-xs font-black tracking-wide pr-0.5 text-slate-900">
          {t('nav.aiAssistant', 'Asistente IA')}
        </span>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-600 opacity-80"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-700"></span>
        </span>
      </button>

      <AiDrawer isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
    </>
  );
}