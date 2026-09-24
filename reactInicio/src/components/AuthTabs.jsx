export default function AuthTabs({ activeTab, setActiveTab }) {
  return (
    <div className="w-full bg-surface-container-low px-6 py-3 flex items-center justify-center">
      <div className="inline-flex p-1 rounded-full bg-surface-container shadow-[inset_0_2px_4px_rgba(30,18,74,0.06)] max-w-md w-full">
        <button
          type="button"
          onClick={() => setActiveTab('login')}
          className={`flex-1 py-2.5 px-4 rounded-full text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === 'login'
              ? 'bg-surface-container-lowest text-on-surface shadow-[0_4px_12px_rgba(30,18,74,0.08)]'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[18px] text-primary">key</span>
          <span>Iniciar Sesión</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('register')}
          className={`flex-1 py-2.5 px-4 rounded-full text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
            activeTab === 'register'
              ? 'bg-surface-container-lowest text-on-surface shadow-[0_4px_12px_rgba(30,18,74,0.08)]'
              : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <span className="material-symbols-outlined text-[18px] text-tertiary">celebration</span>
          <span>Registrar Familia</span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-tertiary-container text-on-tertiary-container tracking-wider">NUEVO</span>
        </button>
      </div>
    </div>
  );
}