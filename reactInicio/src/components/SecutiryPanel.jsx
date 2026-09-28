
export default function SecurityPanel() {
  return (
    <div className="lg:col-span-5 relative bg-gradient-to-br from-[#1b0b38] via-[#3c096c] to-[#005B60] p-8 sm:p-10 md:p-12 text-white flex flex-col justify-between overflow-hidden">
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#00dbeb]/25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-12 w-72 h-72 rounded-full bg-[#F5009B]/25 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-amber-300 font-label-md text-label-md font-bold mb-6">
          <span className="material-symbols-outlined text-[18px] text-amber-300" style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </span>
          <span>Seguridad y Soporte a Familias</span>
        </div>

        <h2 className="text-2xl sm:text-[28px] leading-tight font-black mb-3.5 tracking-tight text-white font-headline-lg">
          Protegiendo el Acceso a la Información de tu Pequeño 🛡️
        </h2>
        <p className="font-body-md text-body-md text-purple-100/90 leading-relaxed mb-8">
          En Montekids resguardamos con los más altos estándares pedagógicos la bitácora sensorial, fotografías y evaluaciones del desarrollo de tu hijo.
        </p>

        <div className="flex flex-col gap-3.5">
          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md shadow-xs hover:translate-x-2 transition-transform duration-200">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#00dbeb]/20 text-[#00dbeb] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">lock</span>
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-white mb-0.5">Verificación de dos pasos activada</h4>
                <p className="text-xs text-purple-200 leading-normal font-body-sm">
                  Notificación inmediata al apoderado titular ante cualquier cambio de credenciales de acceso.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md shadow-xs hover:translate-x-2 transition-transform duration-200">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">shield</span>
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-white mb-0.5">Soporte directo con secretaría</h4>
                <p className="text-xs text-purple-200 leading-normal font-body-sm">
                  Si perdiste acceso a tu correo, nuestro equipo valida tu identidad de manera presencial y segura.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md shadow-xs hover:translate-x-2 transition-transform duration-200">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-[#F5009B]/20 text-[#ff80cb] flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[22px]">key</span>
              </div>
              <div>
                <h4 className="text-[15px] font-bold text-white mb-0.5">Token encriptado de un solo uso</h4>
                <p className="text-xs text-purple-200 leading-normal font-body-sm">
                  El enlace caduca automáticamente y queda invalidado de forma permanente tras el primer uso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 pt-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#00dbeb] text-[#1e1035] flex items-center justify-center font-bold text-sm shrink-0 shadow-md">
            MK
          </div>
          <div className="text-xs text-purple-200">
            <p className="text-white font-bold">Dirección de Ciberseguridad Educativa</p>
            <p>Auditoría AMI &amp; Sistema Integral Montekids Cloud</p>
          </div>
        </div>
      </div>
    </div>
  );
}