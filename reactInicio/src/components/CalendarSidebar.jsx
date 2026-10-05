import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { useLanguage } from '../context/LanguageContext';
import { getTeacherForUser } from '../utils/teacherHelper';

export function CalendarSidebar({ onOpenIAModal }) {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { activeUser } = useAuth();
  const teacher = getTeacherForUser(activeUser);
  const classroom = activeUser?.child?.classroom || 'Aula Semillitas';

  const API = 'http://localhost:3000';

  const defaultItems = [
    { id: 'act1', text: 'Muda de ropa adicional para estimulación con agua y tierra', subtitle: 'Entregado en casillero #14', checked: true, icon: 'done_all' },
    { id: 'act2', text: 'Materiales reciclados para el Sombrero Loco', subtitle: 'Pendiente para el Mar 31 Oct', checked: false, icon: 'alarm', isPending: true },
    { id: 'act3', text: '1 fruta picada para la merienda compartida', subtitle: 'Uvas sin semillas asignadas', checked: true, icon: 'eco' },
    { id: 'act4', text: 'Botella de agua identificada con nombre térmico', subtitle: 'Revisar antes del lunes', checked: false, icon: 'alarm', isPending: true }
  ];

  const [items, setItems] = useState(defaultItems);

  useEffect(() => {
    fetch(`${API}/assignedActivities`)
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const userActivities = data.filter(a => !activeUser?.id || a.studentId === activeUser.id || activeUser.role === 'teacher');
          if (userActivities.length > 0) {
            setItems(userActivities);
          }
        }
      })
      .catch(e => console.error(e));
  }, [activeUser]);

  const toggleCheck = (id) => {
    const updated = items.map(item => item.id === id ? { ...item, checked: !item.checked } : item);
    setItems(updated);

    const targetItem = updated.find(i => i.id === id);
    if (targetItem) {
      fetch(`${API}/assignedActivities/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checked: targetItem.checked })
      }).catch(e => console.error(e));
    }
  };

  const checkedCount = items.filter(i => i.checked).length;
  const progressPercent = items.length > 0 ? Math.round((checkedCount / items.length) * 100) : 0;

  return (
    <aside className="lg:col-span-4 flex flex-col gap-6 font-sans">
      {/* CARD 1: Checklist de Materiales */}
      <div className="bg-surface-container-lowest rounded-3xl p-5 shadow-[0_4px_24px_-2px_rgba(29,17,73,0.06)] flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
              <span className="material-symbols-outlined text-[20px]">checklist</span>
            </div>
            <h3 className="font-['Nunito'] text-lg text-on-surface font-extrabold">
              {t('calendarPage.materialsTitle', 'Materiales Pendientes')}
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-fixed font-label-sm text-label-sm font-extrabold">
            {checkedCount} {t('calendarPage.ofCount', 'de')} {items.length}
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          {t('calendarPage.materialsSubtitle', 'Elementos necesarios para el {classroom} y actividades sensoriales de la semana:').replace('{classroom}', classroom)}
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
                className={`mt-0.5 w-5 h-5 rounded-lg cursor-pointer ${item.isPending ? 'accent-secondary' : 'accent-primary'
                  }`}
              />
              <div className="flex-1">
                <span className={`font-label-md text-label-md ${item.checked
                    ? 'line-through text-on-surface-variant group-hover:text-on-surface'
                    : 'text-on-surface group-hover:text-secondary font-bold'
                  }`}>
                  {item.text || (item.textKey ? t(`calendarPage.${item.textKey}`, item.defaultText) : '')}
                </span>
                <div className={`flex items-center gap-1 text-[11px] font-label-sm mt-0.5 ${item.checked ? 'text-primary font-bold' : item.isPending ? 'text-secondary font-semibold' : 'text-on-surface-variant font-medium'
                  }`}>
                  {item.icon && <span className="material-symbols-outlined text-[14px]">{item.icon}</span>}
                  <span>{item.subtitle || (item.subKey ? t(`calendarPage.${item.subKey}`, item.defaultSub) : '')}</span>
                </div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* CARD 2: Asistente IA (NeuroPed™) */}
      <div className="bg-primary-fixed rounded-3xl p-5 shadow-[0_8px_28px_-4px_rgba(0,219,235,0.35)] relative overflow-hidden flex flex-col gap-3 group">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl group-hover:scale-125 transition-transform duration-500"></div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-on-primary-fixed text-primary-fixed flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[18px]">auto_awesome</span>
            </div>
            <span className="font-label-sm text-label-sm text-on-primary-fixed-variant uppercase tracking-wider font-extrabold">
              {t('calendarPage.aiAssistantBadge', 'Asistente')}
            </span>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-tertiary text-on-tertiary font-label-sm text-label-sm font-bold flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-[12px]">arrow_back_ios_new</span>
            {t('calendarPage.aiTipBadge', 'Tip Educativo')}
          </span>
        </div>

        <div>
          <h4 className="font-['Nunito'] text-base text-on-primary-fixed font-black leading-tight">
            {t('calendarPage.aiCardTitle', '¿Cómo armar el Sombrero en 15 min?')}
          </h4>
          <p className="font-body-sm text-body-sm text-on-primary-fixed-variant mt-1.5 leading-relaxed">
            {t('calendarPage.aiCardDesc', 'Utiliza un plato de cartón o caja de cereales. Fomenta que tu hijo/a rasgue papel crepé y pegue tapitas: esta actividad estimula el reflejo de pinza trípode y su autonomía.')}
          </p>
        </div>

        <div className="pt-1">
          <button
            type="button"
            onClick={onOpenIAModal}
            className="w-full py-3 px-4 rounded-full bg-inverse-surface hover:bg-on-background text-inverse-on-surface font-label-md text-label-md font-bold flex items-center justify-center gap-2 shadow-lg transition-all transform active:scale-98 cursor-pointer"
          >
            <span>{t('calendarPage.aiCardBtn', 'Ver Paso a Paso')}</span>
            <span className="material-symbols-outlined text-[18px] text-primary-container">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* CARD 3: Horario Escolar Habitual */}
      <div className="bg-surface-container-lowest rounded-3xl p-5 shadow-[0_4px_24px_-2px_rgba(29,17,73,0.06)] flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-surface-container-high flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[22px]">schedule</span>
          </div>
          <div>
            <h3 className="font-['Nunito'] text-base text-on-surface font-extrabold">
              {t('calendarPage.scheduleTitle', 'Horario Habitual')}
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {classroom} • {t('calendarPage.scheduleRoutine', 'Rutina Diaria')}
            </p>
          </div>
        </div>

        <div className="divide-y divide-surface-container-high/60 mt-1">
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[18px]">sunny</span>
              <span className="font-label-md text-label-md text-on-surface">
                {t('calendarPage.scheduleEntry', 'Entrada habitual')}
              </span>
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant font-bold">
              {t('calendarPage.scheduleEntryHours', '06:00 - 06:30 AM')}
            </span>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-[18px]">restaurant</span>
              <span className="font-label-md text-label-md text-on-surface">
                {t('calendarPage.scheduleSnack', 'Merienda Sensorial')}
              </span>
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant font-bold">
              {t('calendarPage.scheduleSnackHours', '10:00 - 10:30 AM')}
            </span>
          </div>
          <div className="py-2.5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[18px]">door_front</span>
              <span className="font-label-md text-label-md text-on-surface">
                {t('calendarPage.scheduleExit', 'Salida ordinaria')}
              </span>
            </div>
            <span className="font-label-md text-label-md text-on-surface-variant font-bold">
              {t('calendarPage.scheduleExitHours', '5:00 - 5:30 PM')}
            </span>
          </div>
        </div>
      </div>

      {/* CARD 4: Botón Estilizado para Enviar Comentario/Reporte */}
      <div className="p-5 rounded-3xl bg-surface-container-lowest shadow-[0_4px_24px_-2px_rgba(29,17,73,0.06)] flex flex-col gap-4 border border-outline-variant/30">
        <span className="font-label-sm text-label-sm text-on-surface-variant font-semibold">
          {t('calendarPage.delayQuestion', '¿Retraso imprevisto en la recogida?')}
        </span>
        <div className="flex items-center gap-3">
          <div className="relative shrink-0">
            <img
              className="w-12 h-12 rounded-full object-cover shadow-sm ring-2 ring-primary-container"
              src={teacher.avatarUrl}
              alt={teacher.name}
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-2 ring-surface-container-lowest" title={t('calendarPage.onlineTooltip', 'En línea')}></span>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-['Nunito'] text-sm font-extrabold text-on-surface truncate">{teacher.name}</h4>
            <p className="font-body-sm text-xs text-on-surface-variant truncate">
              {t('calendarPage.guidePrefix', 'Guía')} {classroom}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/mis-comentarios-reportes')}
          className="w-full py-3 px-4 rounded-2xl bg-tertiary hover:bg-tertiary/90 text-white font-label-lg text-xs font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
        >
          <span className="material-symbols-outlined text-[18px]">rate_review</span>
          <span>{t('calendarPage.sendNoteBtn', 'Enviar Comentario al Docente')}</span>
        </button>
      </div>
    </aside>
  );
}