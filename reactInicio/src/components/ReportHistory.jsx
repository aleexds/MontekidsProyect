

const INITIAL_THREADS = [
  {
    id: 1,
    category: 'salud',
    categoryLabel: 'Consulta de Salud',
    categoryIcon: 'medical_services',
    time: 'Enviado ayer, 08:10 AM',
    title: 'Medicamento Matutino - Jarabe Antialérgico',
    status: 'Atendido ✓',
    statusBg: 'bg-primary-container text-on-primary-container',
    badgeBg: 'bg-primary-fixed text-on-primary-fixed-variant',
    sender: 'Valeria Quirós',
    senderRole: 'Mamá de Mateo',
    message: 'Hola Docente Karina, Mateo tiene una ligera congestión nasal. Dejamos el jarabe pediátrico antialérgico en recepción con la enfermera Andrea, con indicación médica de administrar 5ml tras la merienda de las 10:00 AM. Adjunto la receta extendida por su pediatra.',
    attachment: 'Receta_Medica_Octubre.pdf',
    reply: {
      author: 'Docente Karina S.',
      role: 'Guía AMI',
      time: 'Ayer, 10:15 AM',
      statusTag: 'Dosis completada',
      text: 'Recibido Valeria. Se le administró exactamente los 5ml a las 10:00 AM después de la fruta. Mateo estuvo muy alegre y colaborativo durante todo el circuito sensorial matutino. No presentó somnolencia.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOuZwmKBRi0ufoi6Bn554hyzW0RhwKJxvSmm85F3R-lEZeSnhTb9s-HFbFbd-AnpETJ0hYd3Q6e19hTk56FW87ylxSzScwTlurf7E_ivDg-iMyyVHz-0dwETXHOZTEFBdxJP6IfAzvTgTX4BzWSdC50iA4khSiUnDS5mIVsTUn2swsVtLNAGTiTlLTkM-miB6EUmPl4-JnFkcnQlKHRhGdCY6QwevkVVdxDefl1GiM9LUdIPWDAdDeYg'
    }
  },
  {
    id: 2,
    category: 'horario',
    categoryLabel: 'Aviso de Horario / Retiro',
    categoryIcon: 'schedule',
    time: '22 Octubre, 14:20 PM',
    title: 'Aviso de Retiro Anticipado por Consulta Dental',
    status: 'Confirmado ✓',
    statusBg: 'bg-surface-container-highest text-tertiary',
    badgeBg: 'bg-secondary-fixed text-on-secondary-fixed',
    message: 'El próximo viernes 27 retiraremos a Mateo a las 12:00 PM después del periodo de merienda por consulta odontopediátrica de rutina. Vendrá su padre, Roberto Quirós.',
    reply: {
      author: 'Docente Karina',
      time: '22 Oct, 15:05',
      text: 'Confirmado y anotado en bitácora de portería para retiro seguro a las 12:00 PM.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcVtH-hYEA44-ytTJ4mvU7map-JOoUcSBRq58ojCv2ZhAaNt9QuTkIn4q23_-XUStJZGvm5l0b2IJ7DnV2YNbnePghWevL8LlviHg7uTHuKtBSQhWhpOiGN3F-opmOm4pwl8XOQvBZ5VpXHH-qABXERxU5ru9B6H8fWM6ha39wwovfJBJ0a2EN61AZNphAROYGH6-FQv52mnKUpca1dkWRzRO2PkWYSoEW5yQzXBoC4TjfAHwI8_EI6w'
    }
  },
  {
    id: 3,
    category: 'pedagogica',
    categoryLabel: 'Observación Pedagógica',
    categoryIcon: 'psychology',
    time: '18 Octubre, 17:45 PM',
    title: 'Avance en Lenguaje y Canción de Fonemas',
    status: 'Leído y Agradecido',
    statusBg: 'bg-secondary-fixed text-on-secondary-fixed',
    badgeBg: 'bg-tertiary-fixed text-on-tertiary-fixed',
    message: 'Nos encantó la canción de la letra M que practicaron en clase sensorial. Mateo estuvo cantándola todo el camino a casa y señalando objetos que empezaban por "Ma". Muchas gracias por estimularlo con tanto cariño.',
    reply: {
      author: 'Docente Karina',
      time: '19 Oct, 08:30',
      text: '¡Qué alegría saberlo Valeria! Mateo lideró el coro hoy con las campanillas afinadas.',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB2IgsvPU8NuIhV2YWGJSGnJHAVApirUeRkJPJa_C6wplH90KdA9ttDDeWehU-aSePd6RLUfpCv4hqHv2qmR22ah-16BLac3ZTnsN2aMEmJQwUEDn3uCwHfUE8MokMFuZnhX_FExdbbmZbLRQBsKYqE4qqIZOt5Q42GHkq0tB13zrWE6G9WsRTt-cq7kkQWgLnIEUW-ELj7Y44a0AbDKkaaFnrVPsep_Mcp2j7l8RZNIh703GfWGZGzvQ'
    }
  }
];

export function ReportHistory({ activeFilter }) {
  const filteredThreads = activeFilter === 'all' 
    ? INITIAL_THREADS 
    : INITIAL_THREADS.filter(t => t.category === activeFilter);

  return (
    <div className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-headline-md text-headline-md text-on-surface">Historial de Notas Recientes</h2>
          <span className="w-6 h-6 rounded-full bg-surface-container-high flex items-center justify-center font-label-sm text-label-sm text-on-surface">
            {filteredThreads.length}
          </span>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm">
          <span className="material-symbols-outlined text-[16px]">swap_vert</span>
          <select className="bg-transparent font-label-sm text-label-sm text-on-surface focus:outline-none cursor-pointer">
            <option>Más recientes primero</option>
            <option>Pendientes de respuesta</option>
            <option>Por categoría</option>
          </select>
        </div>
      </div>

      {filteredThreads.map((thread) => (
        <article key={thread.id} className="bg-surface-container-lowest rounded-lg p-space-md lg:p-space-lg shadow-[0_4px_16px_-2px_rgba(30,18,74,0.05)] hover:shadow-[0_12px_32px_-4px_rgba(0,219,235,0.20)] transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-space-sm">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-label-sm text-label-sm font-bold ${thread.badgeBg}`}>
                  <span className="material-symbols-outlined text-[14px]">{thread.categoryIcon}</span>
                  {thread.categoryLabel}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">{thread.time}</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mt-1">{thread.title}</h3>
            </div>
            <span className={`self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-label-md text-label-md font-bold ${thread.statusBg}`}>
              {thread.status}
            </span>
          </div>

          <div className="mt-2 bg-surface-container-low/40 rounded-2xl p-space-md">
            {thread.sender && (
              <div className="flex items-center gap-2 mb-2">
                <div className="relative p-0.5 rounded-full bg-gradient-to-tr from-primary to-tertiary shrink-0">
                  <img alt={thread.sender} className="w-6 h-6 rounded-full object-cover" src="https://lh3.googleusercontent.com/aida/AEtjO1VxlpcPG1YtvefdKnMtWCP0lpLB-uynRJAofk9zFYYv-zopPoJjIpjUyER9xC2wR9FQ0U1SI9krJ99JUelsYSdknA9KW27rw2Jyy_gEVboFlZBMvoIRu0EPrBiwW-I7dgMH7Pja_lvPAeACcITUXcyxv27f3XPr5IPtAkNf_-zM5uyIcEPrKyXCyKi-QTy9Qn8OCidJ2mOccmL3kXy-W3FqWPbL84-NEJrsscw7-c9-KpYh9x_Bb2xPCION" />
                </div>
                <span className="font-label-md text-label-md text-on-surface font-bold">{thread.sender}</span>
                <span className="text-on-surface-variant font-label-sm text-label-sm">• {thread.senderRole}</span>
              </div>
            )}
            <p className="font-body-md text-body-md text-on-surface leading-relaxed">{thread.message}</p>
            {thread.attachment && (
              <div className="mt-3 flex items-center gap-2">
                <a href="#" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container-lowest shadow-sm hover:bg-surface-container transition-colors text-on-surface font-label-sm text-label-sm group">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">picture_as_pdf</span>
                  <span className="font-semibold group-hover:text-primary transition-colors">{thread.attachment}</span>
                  <span className="material-symbols-outlined text-[14px] text-on-surface-variant group-hover:translate-x-0.5 transition-transform">download</span>
                </a>
              </div>
            )}
          </div>

          {thread.reply && (
            <div className="mt-space-sm pl-4 sm:pl-8">
              <div className="rounded-2xl p-space-md bg-surface-container-high/60 shadow-sm relative">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <img src={thread.reply.avatar} alt={thread.reply.author} className="w-8 h-8 rounded-full object-cover shrink-0 shadow-sm" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-label-md text-label-md text-on-surface font-bold">{thread.reply.author}</span>
                        {thread.reply.role && <span className="px-1.5 py-0.2 rounded bg-surface-container-highest text-primary font-label-sm text-[10px] font-bold">{thread.reply.role}</span>}
                      </div>
                      <span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">{thread.reply.time}</span>
                    </div>
                  </div>
                  {thread.reply.statusTag && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-[11px] font-bold">
                      <span className="material-symbols-outlined text-[13px]">done_all</span>
                      {thread.reply.statusTag}
                    </span>
                  )}
                </div>
                <p className="font-body-md text-body-md text-on-surface mt-2.5 leading-relaxed">{thread.reply.text}</p>
              </div>
            </div>
          )}
        </article>
      ))}
    </div>
  );
}