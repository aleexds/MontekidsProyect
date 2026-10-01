import { useState } from 'react';
import { useAuth } from '../context/useAuth';

export function ReportComposer({ onAddThread, initialData }) {
  const { activeUser } = useAuth();
  // Inicializamos el estado directo desde 'initialData' (sin useEffect)
  const [category, setCategory] = useState(initialData?.category || 'salud');
  const [title, setTitle] = useState(initialData?.title || '');
  const [message, setMessage] = useState(initialData?.message || '');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    const newThread = {
      id: String(Date.now()),
      userId: activeUser?.id || null,
      category,
      categoryLabel:
        category === 'salud'
          ? 'Consulta de Salud'
          : category === 'horario'
          ? 'Aviso de Horario / Retiro'
          : 'Observación Pedagógica',
      categoryIcon:
        category === 'salud'
          ? 'medical_services'
          : category === 'horario'
          ? 'schedule'
          : 'school',
      time: 'Enviado justo ahora',
      title,
      sender: activeUser?.name || 'Tutor Montekids',
      senderAvatar:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
      message,
      attachment: file ? file.name : null,
      attachmentSize: file ? `${(file.size / 1024).toFixed(0)} KB` : null,
      reply: null
    };

    onAddThread(newThread);
    setTitle('');
    setMessage('');
    setFile(null);
  };

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-sm border border-outline-variant/60">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-cyan-100 dark:bg-cyan-950/60 flex items-center justify-center text-cyan-700 dark:text-cyan-300">
          <span className="material-symbols-outlined text-[24px]">edit_square</span>
        </div>
        <div>
          <h2 className="font-['Nunito'] text-xl font-bold text-on-surface">
            Redactar Nuevo Mensaje / Reporte
          </h2>
          <p className="text-body-sm text-on-surface-variant">
            Envía una notificación directa a la guía a cargo del aula.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Categoría */}
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-2">
            Categoría del reporte
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'salud', label: 'Consulta de Salud', icon: 'medical_services' },
              { id: 'horario', label: 'Aviso de Horario', icon: 'schedule' },
              { id: 'pedagogica', label: 'Observación Pedagógica', icon: 'school' }
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-label-md transition-all cursor-pointer ${
                  category === cat.id
                    ? 'border-cyan-600 bg-cyan-600 dark:bg-cyan-400 dark:border-cyan-400 text-white dark:text-slate-950 font-bold shadow-sm'
                    : 'border-outline-variant/50 bg-surface hover:bg-surface-container-high text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[20px]">{cat.icon}</span>
                <span className="truncate">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Asunto / Título */}
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-1">
            Asunto o Título
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Ej: Administración de medicamento matutino..."
            className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface outline-none transition-all"
            required
          />
        </div>

        {/* Mensaje */}
        <div>
          <label className="block text-label-md font-bold text-on-surface mb-1">
            Mensaje o Indicaciones
          </label>
          <textarea
            rows={7}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe los detalles aquí..."
            className="w-full px-4 py-3 rounded-2xl bg-surface border border-outline-variant/60 focus:border-primary focus:ring-2 focus:ring-primary/20 text-on-surface outline-none transition-all font-mono text-sm leading-relaxed"
            required
          />
        </div>

        {/* Adjunto y Botón de Envío */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-surface-container-high hover:bg-surface-container-highest text-on-surface text-label-md cursor-pointer border border-outline-variant/40 transition-all">
            <span className="material-symbols-outlined text-[20px]">attach_file</span>
            <span>{file ? file.name : 'Adjuntar Receta o Documento'}</span>
            <input
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0] || null)}
            />
          </label>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-primary text-on-primary font-label-lg font-bold shadow-md hover:bg-primary/90 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
            <span>Enviar Reporte</span>
          </button>
        </div>
      </form>
    </div>
  );
}