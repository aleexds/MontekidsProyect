import { useState } from 'react';

export function CalendarSidebar({ onOpenIAModal, showToast }) {
  const [items, setItems] = useState([
    { id: 1, text: 'Muda de ropa adicional para estimulación con agua y tierra', sub: 'Entregado en casillero #14', checked: true, icon: 'done_all' },
    { id: 2, text: 'Materiales reciclados para el Sombrero Loco', sub: 'Pendiente para el Mar 31 Oct', checked: false, icon: 'alarm', isPending: true },
    { id: 3, text: '1 fruta picada para la merienda compartida', sub: 'Uvas sin semillas asignadas', checked: true, icon: 'eco' },
    { id: 4, text: 'Botella de agua identificada con nombre térmico', sub: 'Revisar antes del lunes', checked: false, isPending: true }
  ]);

  const toggleCheck = (id) => {
    const updated = items.map(item => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(updated);

    const checkedCount = updated.filter(i => i.checked).length;
    if (checkedCount === updated.length) {
      showToast('¡Todos los materiales de la semana listos!', 'celebration');
    }
  };

  const checkedCount = items.filter(i => i.checked).length;
  const progressPercent = Math.round((checkedCount / items.length) * 100);

  return (
    <aside className="lg:col-span-4 flex flex-col gap-space-lg font-sans">
      {/* CARD 1: Checklist de Materiales */}
      <div className="bg-surface-container-lowest rounded-3xl p-space-md shadow-[0_4px_24px_-2px_rgba(29,17,73,0.06)] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
              <span className="material-symbols-outlined text-[20px]">checklist</span>
            </div>
            <h3 className="font-['Nunito'] text-lg text-on-surface font-extrabold">Materiales Pendientes</h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm font-extrabold">
            {checkedCount} de {items.length}
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Elementos necesarios para el Aula Semillitas y actividades sensoriales de la semana:
        </p>

        {/* Barra de progreso */}
        <div className="w-full bg-surface-container rounded-full h-2.5 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary via-secondary-container to-secondary transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>

        {/* Items */}
        <div className="flex flex-col gap-2.5 pt-1">
          {items.map(item => (
            <label
              key={item.id}
              className="flex items-start gap-3 p-2.5 rounded-2xl bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => toggleCheck(item.id)}
                className={`mt-0.5 w-5 h-5 rounded-lg cursor-pointer ${
                  item.isPending ? 'accent-secondary' : 'accent-primary'
                }`}
              />
              <div className="flex-1">
                <span className={`font-label-md text-label-md ${
                  item.checked 
                    ? 'line-through text-on-surface-variant group-hover:text-on-surface' 
                    : 'text-on-surface group-hover:text-secondary font-bold'
                }`}>
                  {item.text}
                </span>
                <div className={`flex items-center gap-1 text-[11px] font-label-sm mt-0.5 ${
                  item.checked ? 'text-primary font-bold' : item.isPending ? 'text-secondary font-semibold' : 'text-on-surface-variant font-medium'
                }`}>
                  {item.icon && <span className="material-symbols-outlined text-[14px]">{item.icon}</span>}
                  <span>{item.sub}</span>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* CARD 2: Asistente IA (NeuroPed™) */}
      <div className="bg-primary-fixed rounded-3xl p-space-md shadow-[0_8px_28px_-4px_rgba(0,219,235,0.35)] relative overflow-hidden flex flex-col gap-3 group">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-on-primary-fixed text-primary-fixed flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-primary-fixed-variant uppercase tracking-wider font-extrabold">
              Asistente IA • NeuroPed™
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-tertiary text-on-tertiary font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-[12px]">arrow_back_ios_new</span>
            Tip Educativo
          </span>
        </div>

        <div>
          <h4 className="font-['Nunito'] text-base text-on-primary-fixed font-black leading-tight">
            ¿Cómo armar el Sombrero en 15 min con Mateo?
          </h4>
          <p className="font-body-sm text-body-sm text-on-primary-fixed-variant mt-1.5 leading-relaxed">
            Utiliza un plato de cartón o caja de cereales. Fomenta que Mateo rasgue papel crepé y pegue tapitas: esta actividad estimula el reflejo de pinza trípode y su autonomía.
          </p>
        </div>

        <div className="pt-1">
          <button
            type="button"
            onClick={onOpenIAModal}
            className="w-full py-3 px-4 rounded-full bg-inverse-surface hover:bg-on-background text-inverse-on-surface font-label-md text-label-md font-bold flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-98 cursor-pointer"
          >
            <span>Ver Paso a Paso Lúdico</span>
            <span className="material-symbols-outlined text-[18px] text-primary-container">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* CARD 3: Horario Escolar Habitual */}
      <div className="bg-surface-container-lowest rounded-3xl p-space-md shadow-[0_4px_24px_-2px_rgba(29,17,73,0.06)] flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">schedule</span>
          </div>
          <div>
            <h3 className="font-['Nunito'] text-base text-on-surface font-extrabold">Horario Habitual</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Aula Semillitas • Rutina Diaria</p>
          </div>
        </div>

        <div className="divide-y divide-surface-container-high/60 mt-1">
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">sunny</span>
              <span className="font-label-md text-label-md text-on-surface">Entrada habitual</span>
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant font-bold">08:00 - 08:30 AM</span>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-[18px]">restaurant</span>
              <span className="font-label-md text-label-md text-on-surface">Merienda Sensorial</span>
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant font-bold">10:00 - 10:30 AM</span>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">door_front</span>
              <span className="font-label-md text-label-md text-on-surface">Salida ordinaria</span>
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant font-bold">13:30 - 14:00 PM</span>
          </div>
        </div>

        <div className="mt-2 p-3 rounded-2xl bg-surface-container-low flex flex-col gap-2">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">¿Retraso imprevisto en la recogida?</span>
          <button
            type="button"
            onClick={() => showToast('Notificación instantánea enviada a Docente Karina y Dirección Escolar.', 'chat')}
            className="w-full py-2.5 px-3 rounded-full bg-surface-container-highest hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-primary text-[18px]">chat</span>
            <span>Avisar a Docente Karina</span>
          </button>
        </div>
      </div>

      {/* Banner de Contacto Directo */}
      <div className="p-4 rounded-3xl bg-surface-container-low flex items-center gap-3">
        <img
          className="w-12 h-12 rounded-full object-cover shadow-sm shrink-0"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6_lg8l6AUB3QCTET-1vQNJJZHjxT-dzrlk1LjM1SU4y6INMEW2UpVBK0PTHqxw_bw7PcTsFWhDNqD1QhT7f-1j7dw4vrVSOGSdfXadK7QyQ-SQYbsfdy43wtgjs6ZZ1pkTbzKiDNWDdVF7yFDj04kVTCj39exW8mFos2yqZOKPxtR1RqNmVdPCwUfOT2Gj07jm40Wbj4qp2wlMX5naRUya3nOq0FxkaP_jEA6AAZjTLoFVqz1nXuppw"
          alt="Docente Karina Morales"
        />
        <div className="flex-1">
          <p className="font-label-md text-label-md text-on-surface font-bold">Karina Morales</p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">Guía AMI Titular • Aula Nido</p>
        </div>
        <button
          type="button"
          onClick={() => showToast('Iniciando llamada con recepción de sala...', 'phone')}
          className="w-9 h-9 rounded-full bg-surface-container-lowest text-primary hover:text-on-surface flex items-center justify-center shadow-sm cursor-pointer"
          title="Llamada Escolar"
        >
          <span className="material-symbols-outlined text-[18px]">phone</span>
        </button>
      </div>
    </aside>
  );
}