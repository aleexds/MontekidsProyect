import { useState } from 'react';

export function ReportHistory({ activeFilter, threads, onDeleteThread }) {
  const [sortBy, setSortBy] = useState('recent');

  // 1. Filtrar por categoría
  const filteredThreads = activeFilter === 'all' 
    ? threads 
    : threads.filter(t => t.category === activeFilter);

  // 2. Ordenar según la opción seleccionada
  const sortedThreads = [...filteredThreads].sort((a, b) => {
    if (sortBy === 'pending') {
      if (!a.reply && b.reply) return -1;
      if (a.reply && !b.reply) return 1;
      return 0;
    }
    
    if (sortBy === 'category') {
      return a.categoryLabel.localeCompare(b.categoryLabel);
    }

    return b.id - a.id;
  });

  return (
    <div className="flex flex-col gap-6 font-sans">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-heading font-bold text-xl text-on-surface">Historial de Notas Recientes</h2>
          <span className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center text-xs font-bold text-on-surface">
            {sortedThreads.length}
          </span>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant text-xs">
          <span className="material-symbols-outlined text-[16px]">swap_vert</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent text-xs font-medium text-on-surface focus:outline-none cursor-pointer"
          >
            <option value="recent">Más recientes primero</option>
            <option value="pending">Pendientes de respuesta</option>
            <option value="category">Por categoría</option>
          </select>
        </div>
      </div>

      {sortedThreads.map((thread) => {
        // Lógica consistente de estados (mismo orden: Ícono + Texto)
        const isAnswered = Boolean(thread.reply);
        const statusText = isAnswered ? 'Confirmado' : 'Pendiente';
        const statusIcon = isAnswered ? 'check_circle' : 'schedule';
        const statusStyle = isAnswered 
          ? 'bg-purple-100 text-purple-900' 
          : 'bg-purple-100 text-purple-900';

        return (
          <article key={thread.id} className="bg-surface-container-lowest rounded-2xl p-6 shadow-[0_4px_16px_-2px_rgba(30,18,74,0.05)] hover:shadow-[0_12px_32px_-4px_rgba(0,219,235,0.20)] transition-all">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-container-low">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${thread.badgeBg}`}>
                    <span className="material-symbols-outlined text-[14px]">{thread.categoryIcon}</span>
                    {thread.categoryLabel}
                  </span>
                  <span className="text-xs text-on-surface-variant">{thread.time}</span>
                </div>
                <h3 className="font-heading font-bold text-lg text-on-surface mt-2">{thread.title}</h3>
              </div>
              
              <div className="flex items-center gap-2 self-start sm:self-auto">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${statusStyle}`}>
                  <span className="material-symbols-outlined text-[16px]">
                    {statusIcon}
                  </span>
                  <span>{statusText}</span>
                </span>

                {/* Botón para eliminar notas pendientes (sin respuesta) */}
                {!isAnswered && onDeleteThread && (
                  <button
                    type="button"
                    onClick={() => onDeleteThread(thread.id)}
                    title="Eliminar nota antes de ser respondida"
                    className="p-1.5 rounded-full text-on-surface-variant hover:text-error hover:bg-error/10 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                )}
              </div>
            </div>

            <div className="mt-4 bg-surface-container-low/40 rounded-2xl p-4">
              <div className="flex items-center gap-2.5 mb-3">
                <img 
                  src={thread.senderAvatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120'} 
                  alt={thread.sender || 'Usuario'} 
                  className="w-7 h-7 rounded-full object-cover shrink-0 ring-2 ring-primary/20"
                />
                <span className="text-xs font-bold text-on-surface">{thread.sender || 'Valeria Quirós'}</span>
              </div>

              <p className="text-sm text-on-surface leading-relaxed font-sans">{thread.message}</p>
              
              {thread.attachment && (
                <div className="mt-3 flex items-center gap-2">
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface-container-lowest shadow-sm text-on-surface text-xs font-sans">
                    <span className="material-symbols-outlined text-[18px] text-tertiary">description</span>
                    <span className="font-semibold">{thread.attachment}</span>
                    {thread.attachmentSize && <span className="text-on-surface-variant text-[11px]">({thread.attachmentSize})</span>}
                  </div>
                </div>
              )}
            </div>

            {thread.reply && (
              <div className="mt-4 sm:pl-8 font-sans">
                <div className="rounded-2xl p-5 bg-surface-container-high/60 shadow-sm relative">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img src={thread.reply.avatar} alt={thread.reply.author} className="w-9 h-9 rounded-full object-cover shrink-0 shadow-sm" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-on-surface">{thread.reply.author}</span>
                          {thread.reply.role && <span className="px-2 py-0.5 rounded bg-surface-container-low text-primary text-[11px] font-bold">{thread.reply.role}</span>}
                        </div>
                        <span className="text-xs text-on-surface-variant">{thread.reply.time}</span>
                      </div>
                    </div>
                    {thread.reply.statusTag && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                        <span className="material-symbols-outlined text-[13px]">done_all</span>
                        {thread.reply.statusTag}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-on-surface mt-3 leading-relaxed">{thread.reply.text}</p>
                  {thread.reply.signed && (
                    <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-3 border-t border-surface-container-high">
                      <div className="flex items-center gap-1.5 text-on-surface-variant text-xs">
                        <span className="material-symbols-outlined text-[16px] text-primary">verified</span>
                        <span>Firmado digitalmente por Enfermería y Guía</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}