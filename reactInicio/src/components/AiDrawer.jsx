import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/useAuth';

export default function AiDrawer({ isOpen, onClose }) {
  const { t } = useLanguage();
  const { activeUser } = useAuth();

  // Only store messages that the user/bot generated AFTER the welcome message
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Clear conversation history each time the drawer opens
  const wasOpen = useRef(false);
  useEffect(() => {
    if (isOpen && !wasOpen.current) {
      setHistory([]);
    }
    wasOpen.current = isOpen;
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = input;
    setHistory((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5678/webhook/montekids-ai-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          message: userMsg,
          sessionId: activeUser?.id ? `session_${activeUser.id}` : 'guest_session',
          user: {
            id: activeUser?.id || null,
            name: activeUser?.name || 'Visitante',
            role: activeUser?.role || 'guest',
            email: activeUser?.email || '',
            studentId: activeUser?.studentId || '',
            child: activeUser?.child || null,
            estrellas: activeUser?.estrellas ?? 0,
            classroom: activeUser?.classroom || ''
          }
        })
      });

      const data = await response.json();
      const botReply = data.reply || data.output || t('ai.reply');

      setHistory((prev) => [
        ...prev,
        { sender: 'bot', text: botReply }
      ]);
    } catch (err) {
      console.error('Error comunicándose con el agente de n8n:', err);
      setHistory((prev) => [
        ...prev,
        { sender: 'bot', text: '¡Ups! Ocurrió un inconveniente al conectar con MonteBot. Por favor verifica que n8n esté activo o intenta de nuevo.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md h-full bg-white dark:bg-zinc-900 shadow-2xl flex flex-col justify-between relative">

        {/* Header */}
        <div className="p-4 bg-surface-container-high border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">🤖</div>
            <div>
              <h3 className="font-bold text-on-surface text-base leading-tight">{t('ai.title')}</h3>
              <span className="text-xs text-primary font-semibold">
                {loading ? 'MonteBot está pensando...' : t('ai.online')}
              </span>
            </div>
          </div>
          <button type="button" onClick={onClose} className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Chat feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">

          {/* Welcome message is derived directly from t() — never stored in state */}
          <div className="flex justify-start">
            <div className="p-3 rounded-2xl max-w-[85%] text-sm bg-surface-container-low text-on-surface rounded-tl-none shadow-sm whitespace-pre-line">
              {t('ai.welcome')}
            </div>
          </div>

          {/* User / bot message history */}
          {history.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-2xl max-w-[85%] text-sm whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-primary text-white rounded-tr-none'
                  : 'bg-surface-container-low text-on-surface rounded-tl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}

          {/* Loading indicator */}
          {loading && (
            <div className="flex justify-start">
              <div className="p-3 rounded-2xl text-xs bg-surface-container-low text-on-surface-variant rounded-tl-none shadow-sm animate-pulse flex items-center gap-2">
                <span>🤖 MonteBot respondiendo...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input form */}
        <div className="p-4 bg-surface-container-low border-t">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              disabled={loading}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('ai.placeholder')}
              className="flex-1 px-4 py-2.5 rounded-full bg-white dark:bg-zinc-800 text-sm border focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold disabled:opacity-50 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}