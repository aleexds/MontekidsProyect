import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

export default function AiDrawer({ isOpen, onClose }) {
  const { t } = useLanguage();

  // Only store messages that the user/bot generated AFTER the welcome message
  const [history, setHistory] = useState([]);
  const [input, setInput] = useState('');

  // Clear conversation history each time the drawer opens
  const wasOpen = useRef(false);
  useEffect(() => {
    if (isOpen && !wasOpen.current) {
      setHistory([]);
    }
    wasOpen.current = isOpen;
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setHistory((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      setHistory((prev) => [
        ...prev,
        { sender: 'bot', text: t('ai.reply') }
      ]);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col justify-between relative">

        {/* Header */}
        <div className="p-4 bg-surface-container-high border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">🤖</div>
            <div>
              <h3 className="font-bold text-on-surface text-base leading-tight">{t('ai.title')}</h3>
              <span className="text-xs text-primary font-semibold">{t('ai.online')}</span>
            </div>
          </div>
          <button type="button" onClick={onClose} className="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Chat feed */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">

          {/* Welcome message is derived directly from t() — never stored in state */}
          <div className="flex justify-start">
            <div className="p-3 rounded-2xl max-w-[85%] text-sm bg-surface-container-low text-on-surface rounded-tl-none shadow-sm">
              {t('ai.welcome')}
            </div>
          </div>

          {/* User / bot message history */}
          {history.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`p-3 rounded-2xl max-w-[85%] text-sm ${
                msg.sender === 'user'
                  ? 'bg-primary text-white rounded-tr-none'
                  : 'bg-surface-container-low text-on-surface rounded-tl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input form */}
        <div className="p-4 bg-surface-container-low border-t">
          <form onSubmit={handleSend} className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t('ai.placeholder')}
              className="flex-1 px-4 py-2.5 rounded-full bg-white text-sm border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}