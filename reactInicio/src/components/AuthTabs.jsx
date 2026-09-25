export default function AuthTabs({ activeTab, setActiveTab }) {
  return (
    <div className="w-full bg-surface-container-low border-b border-surface-container-high p-2 flex items-center justify-center font-sans">
      <div className="relative flex w-full max-w-md bg-surface-container-lowest p-1 rounded-2xl shadow-inner border border-surface-container-high/60">
        
        {/* Fondo animado desglizable con el tono oscuro/original */}
        <div
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#005B60] rounded-xl shadow-sm transition-all duration-300 ease-out ${
            activeTab === 'login' ? 'left-1' : 'left-[calc(50%+2px)]'
          }`}
        />

        {/* Botón 1: Iniciar Sesión */}
        <button
          onClick={() => setActiveTab('login')}
          className={`relative z-10 flex-1 py-2.5 text-xs font-bold font-heading rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
            activeTab === 'login'
              ? 'text-white'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/40'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">login</span>
          <span>Iniciar Sesión</span>
        </button>

        {/* Botón 2: Registrarse */}
        <button
          onClick={() => setActiveTab('register')}
          className={`relative z-10 flex-1 py-2.5 text-xs font-bold font-heading rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-95 ${
            activeTab === 'register'
              ? 'text-white'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/40'
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">person_add</span>
          <span>Registrarse</span>
        </button>

      </div>
    </div>
  );
}