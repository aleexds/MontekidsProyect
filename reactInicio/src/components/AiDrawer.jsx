import { useState } from 'react';

export default function AiDrawer({ isOpen, onClose }) {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '¡Hola! Soy el asistente de IA de Montekids. ¿En qué puedo ayudarte hoy? (ej. Horarios, ubicación, o contactar por WhatsApp)' }
  ]);
  const [input, setInput] = useState('');

  if (!isOpen) return null;

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: '¡Excelente consulta! Nuestro equipo pedagógico y las vacantes están disponibles. ¿Deseas coordinar un llamado directo por WhatsApp?' }
      ]);
    }, 500);
  };

  return (
    <div class="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm">
      <div class="w-full max-w-md h-full bg-white shadow-2xl flex flex-col justify-between relative">
        
        {/* Header */}
        <div class="p-4 bg-surface-container-high border-b flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">🤖</div>
            <div>
              <h3 class="font-bold text-on-surface text-base leading-tight">Asistente Virtual IA 🤖</h3>
              <span class="text-xs text-primary font-semibold">En línea para responder</span>
            </div>
          </div>
          <button type="button" onClick={onClose} class="w-8 h-8 rounded-full bg-surface-container-low flex items-center justify-center">
            <span class="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Feed de Chat */}
        <div class="flex-1 p-4 overflow-y-auto space-y-3">
          {messages.map((msg, idx) => (
            <div key={idx} class={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div class={`p-3 rounded-2xl max-w-[85%] text-sm ${
                msg.sender === 'user' 
                  ? 'bg-primary text-white rounded-tr-none' 
                  : 'bg-surface-container-low text-on-surface rounded-tl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Form Input */}
        <div class="p-4 bg-surface-container-low border-t">
          <form onSubmit={handleSend} class="flex items-center gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu consulta aquí..."
              class="flex-1 px-4 py-2.5 rounded-full bg-white text-sm border focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button type="submit" class="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
              <span class="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}