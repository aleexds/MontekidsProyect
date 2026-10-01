import { useState } from 'react';
import { useAuth } from '../context/useAuth';
import { getTeacherForUser } from '../utils/teacherHelper';

export const DailyLog = () => {
  const { activeUser } = useAuth();
  const teacher = getTeacherForUser(activeUser);
  const [selectedCategory, setSelectedCategory] = useState('Consulta de Salud');
  const [message, setMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const categories = ['Consulta de Salud', 'Aviso de Horario / Retiro', 'Consulta Pedagógica'];

  const handleSend = () => {
    const finalMessage = message.trim() || 'Mañana Mateo saldrá a las 11:30 AM por cita médica con el pediatra.';
    setMessage(finalMessage);
    setShowConfirmation(true);
    setTimeout(() => {
      setShowConfirmation(false);
      setMessage('');
    }, 5000);
  };

  return (
    <div className="lg:col-span-8 flex flex-col gap-space-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs bg-surface-container-low p-space-sm sm:px-space-md rounded-lg">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
            <h2 className="font-headline-md text-headline-md text-on-surface">Bitácora del Día de Mateo</h2>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Hoy, 28 de Octubre, 2024</p>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container/30 text-primary font-label-sm text-label-sm uppercase tracking-wider self-start sm:self-center">
          <span className="material-symbols-outlined text-[16px]">sensors</span>
          En Jornada Matutina
        </span>
      </div>

      <div className="flex flex-col gap-space-sm">
        {/* Actividad 1 */}
        <article className="bg-surface-container-lowest rounded-lg p-space-md shadow-[0_4px_16px_-2px_rgba(29,17,73,0.05)] hover:shadow-[0_8px_24px_-4px_rgba(78,0,222,0.1)] transition-all">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-xs mb-space-xs">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-tertiary-fixed/50 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">record_voice_over</span>
              </span>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Taller de Fonemas y Canciones</h4>
                <span className="font-label-sm text-label-sm text-tertiary uppercase font-bold tracking-wide">Área de Lenguaje</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">nest_clock_farsight_analog</span>
                09:15 AM - 10:00 AM
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary-fixed/40 text-primary font-label-sm text-label-sm">
                Completado con Éxito
              </span>
            </div>
          </div>
          <div className="mt-space-sm p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-sm">
            <img alt={teacher.name} className="w-10 h-10 rounded-full object-cover shrink-0 shadow-sm" src={teacher.avatarUrl} />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-label-md text-label-md text-on-surface font-bold">{teacher.name}</span>
                <span className="text-outline-variant font-label-sm text-label-sm">• hace 2 hrs</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface italic">
                “Mateo participó muy contento identificando la letra M en el vagón de rimas. Mostró mucho entusiasmo al cantar junto a Sofía y Lucas.”
              </p>
            </div>
          </div>
          <div className="mt-space-sm pt-space-xs flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container font-label-md text-label-md text-on-surface">
              <span className="material-symbols-outlined text-primary text-[18px]">photo_library</span>
              <span>📸 2 Fotos agregadas a la Galería</span>
            </div>
            <button className="font-label-md text-label-md text-primary hover:text-on-primary-container transition-colors flex items-center gap-1" type="button">
              <span>Ver fotos</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </article>

        {/* Actividad 2 */}
        <article className="bg-surface-container-lowest rounded-lg p-space-md shadow-[0_4px_16px_-2px_rgba(29,17,73,0.05)] hover:shadow-[0_8px_24px_-4px_rgba(78,0,222,0.1)] transition-all">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-space-xs mb-space-xs">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-secondary-fixed/50 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">spa</span>
              </span>
              <div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">Circuito de Texturas y Estimulación Olfativa</h4>
                <span className="font-label-sm text-label-sm text-secondary uppercase font-bold tracking-wide">Área Sensorial</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">nest_clock_farsight_analog</span>
                10:30 AM - 11:15 AM
              </span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                Completado a las 11:15 AM
              </span>
            </div>
          </div>
          <div className="mt-space-sm p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-sm">
            <img alt="Docente Karina" className="w-10 h-10 rounded-full object-cover shrink-0 shadow-sm" src="https://lh3.googleusercontent.com/aida/AEtjO1VtC5s3KzQmDzSEOgUEoBq9f6Bf6pLl-kDIpqTGgxvP9BIoe-Qt1zofmkX4MXZC7Llcfhu3QeYkPfTQGjphM1quespU79rUks6zszdXoBPbivvR4pgYaLs_zjfVUQVWISHqNs5xsLH-njChuAWu2uzDTJKJ_TZQhYuxz3Od9Fu24dFEN58BRJOkf9wrKBwLbmcp5pNBh_FG_IYGrX2WCpebd0C8wYDmLyg9upvEdIpKsOfzDinKAhWRSB1_" />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="font-label-md text-label-md text-on-surface font-bold">Docente Karina S.</span>
                <span className="text-outline-variant font-label-sm text-label-sm">• hace 35 min</span>
              </div>
              <p className="font-body-md text-body-md text-on-surface italic">
                “Exploró bandejas con lavanda y semillas sin ninguna resistencia táctil. Su tolerancia y calma fueron excelentes.”
              </p>
            </div>
          </div>
        </article>

        {/* Actividad 3 En Curso */}
        <article className="bg-gradient-to-r from-primary-fixed/20 to-surface-container-lowest rounded-lg p-space-md shadow-[0_4px_16px_-2px_rgba(0,219,235,0.15)] flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-fixed animate-spin" style={{ animationDuration: '8s' }}>
              <span className="material-symbols-outlined text-[22px]">potted_plant</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-headline-sm text-on-surface">Huerto Colaborativo y Merienda Saludable</h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Horario: 11:45 AM - 12:30 PM • Cosecha guiada de tomates cherry y lavado de manos.
              </p>
            </div>
          </div>
          <div className="shrink-0">
            <span className="px-3 py-1.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm uppercase font-bold tracking-wider flex items-center gap-1.5 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-ping"></span>
              En curso actualmente 🌿
            </span>
          </div>
        </article>
      </div>

      {/* Formulario a la Docente */}
      <div className="mt-space-md rounded-lg bg-surface-container-low p-space-md sm:p-space-lg shadow-[0_4px_24px_-4px_rgba(50,40,95,0.08)]" id="parent-interaction-box">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-tertiary/10 text-tertiary flex items-center justify-center">
            <span className="material-symbols-outlined text-[24px]">forward_to_inbox</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Enviar reporte o consulta a la guardería</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Comunícate directamente con la Docente Karina o el equipo de recepción.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 my-space-sm">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md transition-all ${
                selectedCategory === cat
                  ? 'bg-inverse-surface text-inverse-on-surface shadow-sm'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative bg-surface-container-lowest rounded-lg p-space-sm shadow-inner">
          <textarea
            className="w-full bg-transparent resize-none outline-none font-body-md text-body-md text-on-surface placeholder:text-outline-variant"
            placeholder="Ej: Mañana Mateo saldrá a las 11:30 AM por cita médica con el pediatra..."
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <div className="flex items-center justify-between pt-2">
            <button className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors" title="Adjuntar comprobante" type="button">
              <span className="material-symbols-outlined text-[20px]">attach_file</span>
            </button>
            <button
              type="button"
              onClick={handleSend}
              className="px-5 py-2.5 rounded-full bg-primary-container text-on-primary-fixed font-label-lg text-label-lg shadow-[0_6px_20px_rgba(0,219,235,0.4)] hover:shadow-[0_8px_24px_rgba(0,219,235,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-1.5"
            >
              <span>Enviar Reporte a Sala</span>
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </div>
        </div>

        {showConfirmation && (
          <div className="mt-space-sm p-space-sm rounded-lg bg-primary-fixed/40 text-primary font-label-md text-label-md flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px]">check_circle</span>
            <span>¡Mensaje enviado a la Docente Karina! Se notificará su lectura en el receso.</span>
          </div>
        )}
      </div>
    </div>
  );
};