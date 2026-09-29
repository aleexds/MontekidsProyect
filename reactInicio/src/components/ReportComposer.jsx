import { useState } from 'react';

export function ReportComposer({ onAddThread }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('salud');
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !message.trim()) return;

    // Mapeo de categorías para estilos y etiquetas
    const categoryConfig = {
      salud: {
        label: 'Consulta de Salud',
        icon: 'medical_services',
        badgeBg: 'bg-primary/10 text-primary',
        statusBg: 'bg-primary-container text-on-primary-container'
      },
      horario: {
        label: 'Aviso de Horario / Retiro',
        icon: 'schedule',
        badgeBg: 'bg-secondary/10 text-secondary',
        statusBg: 'bg-surface-container-high text-tertiary'
      },
      pedagogica: {
        label: 'Observación Pedagógica',
        icon: 'school',
        badgeBg: 'bg-tertiary/10 text-tertiary',
        statusBg: 'bg-tertiary-container text-on-tertiary-container'
      }
    };

    const selectedCat = categoryConfig[category] || categoryConfig.salud;

    const newThread = {
      id: Date.now(),
      category,
      categoryLabel: selectedCat.label,
      categoryIcon: selectedCat.icon,
      time: 'Enviado ahora',
      title,
      status: 'Pendiente',
      statusIcon: 'schedule', // Ícono vectorial de Material Symbols
      statusBg: 'bg-surface-container-high text-on-surface-variant',
      badgeBg: selectedCat.badgeBg,
      sender: 'Valeria Quirós',
      senderAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=120',
      message,
      attachment: file ? file.name : null,
      attachmentSize: file ? `${Math.round(file.size / 1024)} KB` : null,
      reply: null
    };

    if (onAddThread) {
      onAddThread(newThread);
    }

    // Limpiar formulario
    setTitle('');
    setMessage('');
    setCategory('salud');
    setFile(null);
  };

  return (
    <div className="bg-surface-container-lowest rounded-3xl p-6 md:p-8 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.06)] border border-surface-container-low font-sans">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-tertiary/10 flex items-center justify-center text-tertiary">
          <span className="material-symbols-outlined text-[22px]">edit_note</span>
        </div>
        <div>
          <h2 className="font-heading font-bold text-xl text-on-surface">Redactar Nueva Nota</h2>
          <p className="text-xs text-on-surface-variant">Envía un comunicado directo a la docente Karina</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Selección de Categoría */}
          <div>
            <label className="block text-xs font-bold text-on-surface mb-1.5">Categoría de la nota</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface text-sm border border-transparent focus:border-primary focus:bg-surface-container-lowest focus:outline-none transition-all cursor-pointer font-medium"
            >
              <option value="salud">🩺 Consulta de Salud</option>
              <option value="horario">⏰ Aviso de Horario / Retiro</option>
              <option value="pedagogica">📚 Observación Pedagógica</option>
            </select>
          </div>

          {/* Asunto */}
          <div>
            <label className="block text-xs font-bold text-on-surface mb-1.5">Asunto / Título corto</label>
            <input
              type="text"
              required
              placeholder="Ej: Cambio en horario de salida..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface text-sm border border-transparent focus:border-primary focus:bg-surface-container-lowest focus:outline-none transition-all font-medium"
            />
          </div>
        </div>

        {/* Mensaje */}
        <div>
          <label className="block text-xs font-bold text-on-surface mb-1.5">Mensaje detallado</label>
          <textarea
            required
            rows={4}
            placeholder="Escribe aquí los detalles que la docente debe tomar en cuenta..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface text-sm border border-transparent focus:border-primary focus:bg-surface-container-lowest focus:outline-none transition-all font-medium resize-none"
          />
        </div>

        {/* Subir Adjunto y Botón de Enviar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <label className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-bold transition-colors cursor-pointer border border-dashed border-outline-variant">
            <span className="material-symbols-outlined text-[18px]">attach_file</span>
            <span>{file ? file.name : 'Adjuntar documento/receta'}</span>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0] || null)}
              className="hidden"
            />
          </label>

          <button
            type="submit"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full bg-primary text-white font-bold text-sm shadow-md hover:bg-primary/90 active:scale-95 transition-all cursor-pointer"
          >
            <span className="text-white">Enviar Nota</span>
            <span className="material-symbols-outlined text-[18px] text-white">send</span>
          </button>
        </div>
      </form>
    </div>
  );
}