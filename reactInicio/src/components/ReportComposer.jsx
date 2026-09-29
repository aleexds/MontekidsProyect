import { useState } from 'react';

export function ReportComposer() {
  const [selectedCat, setSelectedCat] = useState('salud');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleClear = () => {
    setSubject('');
    setBody('');
    setIsUrgent(false);
    setFileName('');
  };

  return (
    <section id="composer-card" className="bg-surface-container-lowest rounded-lg p-space-md lg:p-space-lg shadow-[0_8px_30px_rgb(29,17,73,0.06)] relative overflow-hidden transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary-container to-tertiary"></div>
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-space-sm">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">rate_review</span>
          </div>
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Enviar una nueva nota a la sala</h2>
            <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px] text-primary">account_circle</span>
              <span>Dirigido a: <strong class="text-on-surface">Docente Karina S. (Guía Titular)</strong></span>
            </div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          Respuesta en horario lectivo
        </span>
      </div>

      {/* Categorías */}
      <div className="mt-space-sm">
        <label className="block font-label-md text-label-md text-on-surface-variant mb-2">Selecciona la categoría del reporte:</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { id: 'salud', label: 'Consulta de Salud', icon: 'medical_services', color: 'text-primary' },
            { id: 'horario', label: 'Horario / Retiro', icon: 'schedule', color: 'text-secondary' },
            { id: 'pedagogica', label: 'Pedagógica', icon: 'psychology', color: 'text-tertiary' },
            { id: 'otro', label: 'Autorización / Otro', icon: 'assignment', color: 'text-on-surface-variant' }
          ].map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCat(cat.id)}
              className={`flex items-center gap-2 p-2.5 rounded-xl text-left font-label-md text-label-md transition-all ${
                selectedCat === cat.id
                  ? 'bg-primary-container text-on-primary-container shadow-sm'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface'
              }`}
            >
              <span className={`material-symbols-outlined text-[18px] ${selectedCat === cat.id ? '' : cat.color}`}>{cat.icon}</span>
              <span className="truncate">{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Inputs */}
      <div className="mt-space-md">
        <label className="block font-label-lg text-label-lg text-on-surface mb-1.5" htmlFor="report-subject">Asunto o título de la nota</label>
        <input
          id="report-subject"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Ej: Medicación para las 10:00 AM / Cita médica pediatra..."
          className="w-full h-12 px-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all"
        />
      </div>

      <div className="mt-space-sm">
        <label className="block font-label-lg text-label-lg text-on-surface mb-1.5" htmlFor="report-body">Detalle del mensaje</label>
        <textarea
          id="report-body"
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Ej: Mañana Mateo saldrá a las 11:30 AM por cita médica con el pediatra..."
          className="w-full p-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all resize-none"
        />
      </div>

      {/* Adjunto & Prioridad */}
      <div className="mt-space-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-sm pt-space-sm bg-surface-container-low/50 p-space-sm rounded-xl">
        <div className="flex flex-wrap items-center gap-3">
          <label className="cursor-pointer inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-md text-label-md shadow-sm transition-all">
            <span className="material-symbols-outlined text-[18px] text-primary">attach_file</span>
            <span>Adjuntar justificante o receta</span>
            <input type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={handleFileChange} />
          </label>
          {fileName && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[14px]">description</span>
              <span>{fileName}</span>
              <button type="button" onClick={() => setFileName('')} className="ml-1 hover:text-error">×</button>
            </span>
          )}
          <span className="text-on-surface-variant font-label-sm text-label-sm">Opcional, máx 10MB</span>
        </div>

        <label className="flex items-center gap-2 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isUrgent}
            onChange={(e) => setIsUrgent(e.target.checked)}
            className="w-4 h-4 rounded text-tertiary focus:ring-tertiary"
          />
          <span className="font-label-md text-label-md text-tertiary flex items-center gap-1">
            <span className="material-symbols-outlined text-[16px]">priority_high</span>
            Marcar como prioritario para la mañana
          </span>
        </label>
      </div>

      {/* Acciones */}
      <div className="mt-space-md flex items-center justify-end gap-3">
        <button type="button" onClick={handleClear} className="px-5 py-2.5 rounded-full font-label-md text-label-md text-on-surface-variant hover:bg-surface-container transition-all">
          Limpiar
        </button>
        <button type="button" className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-tertiary text-on-tertiary font-label-lg text-label-lg shadow-[0_8px_24px_rgba(183,0,114,0.3)] hover:shadow-[0_12px_28px_rgba(183,0,114,0.4)] hover:scale-[1.02] active:translate-y-0.5 transition-all">
          <span className="material-symbols-outlined text-[20px]">send</span>
          Enviar Reporte a Docente
        </button>
      </div>
    </section>
  );
}