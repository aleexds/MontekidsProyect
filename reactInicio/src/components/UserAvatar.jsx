import { useState } from 'react';

export function UserAvatar({ avatar, name, className = "w-8 h-8 rounded-full object-cover" }) {
  const [failed, setFailed] = useState(false);

  const cleanAvatar = avatar ? String(avatar).trim() : '';

  const isUrl = cleanAvatar.startsWith('http') || cleanAvatar.startsWith('data:') || cleanAvatar.startsWith('/');

  if (isUrl && !failed) {
    return (
      <img
        src={cleanAvatar}
        alt={name || 'Avatar'}
        className={className}
        onError={() => setFailed(true)}
      />
    );
  }

  // Si es un emoji (ej. 👨‍🏫, 👩‍🏫)
  if (cleanAvatar && !isUrl) {
    return (
      <div className={`${className} bg-pink-100 dark:bg-pink-950/60 text-pink-700 dark:text-pink-300 flex items-center justify-center font-bold text-sm shrink-0 border border-pink-200 dark:border-pink-800`}>
        {cleanAvatar}
      </div>
    );
  }

  // Iniciales como fallback si no hay foto o falla la imagen
  const initials = (name || 'U')
    .trim()
    .split(' ')
    .filter(Boolean)
    .map(n => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className={`${className} bg-slate-200 dark:bg-zinc-800 text-slate-700 dark:text-zinc-200 flex items-center justify-center font-black text-xs shrink-0 border border-slate-300 dark:border-zinc-700`}>
      {initials}
    </div>
  );
}
