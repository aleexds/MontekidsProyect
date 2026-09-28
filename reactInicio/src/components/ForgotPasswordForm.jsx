import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPasswordForm() {
  const [viewState, setViewState] = useState('form'); // 'form' | 'success'
  const [email, setEmail] = useState('valeria.quiros@gmail.com');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  const [isLoading, setIsLoading] = useState(false);

  // Derivamos canResend directamente del valor del timer
  const canResend = timer === 0;

  const inputRefs = useRef([]);

  // Temporizador simplificado sin setState síncronos
  useEffect(() => {
    if (viewState !== 'success' || timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [viewState, timer]);

  const handleSubmitEmail = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setViewState('success');
      setTimer(59);
    }, 600);
  };

  const handleResendCode = () => {
    if (!canResend) return;
    setTimer(59);
    setOtp(['', '', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 flex flex-col justify-between bg-surface-container-lowest relative z-10">
      <div>
        {/* Navegación y Control Simulador */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-on-surface-variant hover:text-primary transition-all font-body-md text-body-md font-bold group"
          >
            <span className="material-symbols-outlined text-[20px] transition-transform group-hover:-translate-x-1">
              arrow_back
            </span>
            <span>Volver al Login</span>
          </Link>

          {/* Toggle manual de prueba visual */}
          <div className="flex items-center gap-1.5 bg-surface-container px-2 py-1 rounded-full text-[11px] font-bold text-on-surface-variant">
            <span>Vista:</span>
            <button
              type="button"
              onClick={() => setViewState('form')}
              className={`px-2.5 py-0.5 rounded-full transition-all ${
                viewState === 'form' ? 'bg-surface-container-lowest text-on-surface shadow-xs font-bold' : ''
              }`}
            >
              Formulario
            </button>
            <button
              type="button"
              onClick={() => setViewState('success')}
              className={`px-2.5 py-0.5 rounded-full transition-all ${
                viewState === 'success' ? 'bg-surface-container-lowest text-on-surface shadow-xs font-bold' : ''
              }`}
            >
              Enviado ✓
            </button>
          </div>
        </div>

        {/* CABECERA */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md mb-3.5">
            <span className="material-symbols-outlined text-[16px]">lock_reset</span>
            <span>Recuperación Segura de Credenciales</span>
          </div>
          <h1 className="text-[32px] sm:text-[38px] leading-[1.15] text-[#1e1035] tracking-tight mb-3 font-headline-xl font-extrabold">
            ¿Olvidaste tu Contraseña? 🔑
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Ingresa el correo electrónico asociado a tu cuenta de familiar o tutor y te enviaremos las instrucciones de restablecimiento de forma inmediata.
          </p>
        </div>

        {/* ESTADO 1: FORMULARIO */}
        {viewState === 'form' ? (
          <form onSubmit={handleSubmitEmail} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label htmlFor="email" className="font-label-lg text-label-lg text-[#1e1035] font-bold flex items-center gap-1">
                  <span>Correo Electrónico Registrado</span>
                  <span className="text-tertiary">*</span>
                </label>
                <span className="font-body-sm text-body-sm text-outline">Apoderado o Docente</span>
              </div>
              <div className="relative flex items-center">
                <div className="absolute left-4 flex items-center pointer-events-none text-outline">
                  <span className="material-symbols-outlined text-[22px]">mail</span>
                </div>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@montekids.com"
                  className="w-full h-14 pl-12 pr-4 bg-surface-container-lowest text-on-surface rounded-2xl font-body-md text-body-md outline-none transition-all placeholder:text-outline-variant focus:ring-4 focus:ring-tertiary/20"
                  style={{ boxShadow: 'inset 0 0 0 1.5px #ede8f5' }}
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#effbfd] text-[#005c63] flex items-start gap-3 shadow-xs">
              <div className="w-8 h-8 rounded-full bg-[#00dbeb]/30 flex items-center justify-center shrink-0 mt-0.5">
                <span className="material-symbols-outlined text-[19px] text-[#005c63]">info</span>
              </div>
              <div className="text-xs sm:text-[13px] leading-relaxed font-body-sm font-semibold text-[#005c63]">
                El enlace de verificación expirará en <span className="font-extrabold underline underline-offset-2">15 minutos</span> por razones de estricta seguridad escolar y resguardo integral infantil bajo protocolo COPPA.
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full h-14 rounded-2xl bg-[#F5009B] text-on-primary font-label-lg text-label-lg font-extrabold flex items-center justify-center gap-2 overflow-hidden shadow-[0_10px_28px_rgba(245,0,155,0.32)] transition-all duration-200 active:scale-[0.98] hover:bg-[#e0008d] cursor-pointer"
            >
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-[shimmer_2.5s_infinite] pointer-events-none" />
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                  <span>Enviando enlace seguro...</span>
                </span>
              ) : (
                <span className="relative z-10 flex items-center gap-2">
                  <span>Enviar Enlace de Recuperación</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </span>
              )}
            </button>
          </form>
        ) : (
          /* ESTADO 2: CÓDIGO/CONFIRMACIÓN */
          <div className="flex flex-col gap-5">
            <div className="p-6 sm:p-7 rounded-3xl bg-[#ecfdf5] shadow-xs flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#10b981] text-white flex items-center justify-center mb-4 shadow-[0_8px_20px_rgba(16,185,129,0.35)] animate-bounce">
                <span className="material-symbols-outlined text-[34px] font-black">check</span>
              </div>
              <h3 className="text-xl sm:text-2xl text-[#064e3b] font-black mb-2">
                ¡Correo de recuperación enviado!
              </h3>
              <p className="font-body-md text-body-md text-[#065f46] max-w-md mb-4 leading-relaxed">
                Hemos enviado las instrucciones a <strong className="underline decoration-wavy decoration-[#10b981]">{email}</strong>.
              </p>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#065f46] font-body-sm text-body-sm font-bold shadow-xs">
                <span className="material-symbols-outlined text-[18px] text-[#10b981]">timer</span>
                <span>
                  {!canResend ? (
                    `Reenviar correo disponible en 00:${timer < 10 ? `0${timer}` : timer}`
                  ) : (
                    <button
                      type="button"
                      onClick={handleResendCode}
                      className="text-tertiary font-bold underline cursor-pointer hover:text-primary"
                    >
                      ¡Reenviar correo de verificación!
                    </button>
                  )}
                </span>
              </div>
            </div>

            {/* OTP Inputs para simulación de validación */}
            <div className="flex justify-between gap-2 my-2">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  placeholder="•"
                  className="w-10 h-12 text-center text-xl font-bold bg-surface-container rounded-xl outline-none focus:ring-2 focus:ring-[#F5009B]"
                />
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setViewState('form')}
                className="w-full sm:w-auto px-6 h-12 rounded-full bg-surface-container-high text-on-surface font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 hover:bg-surface-container transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">edit</span>
                <span>Verificar otra dirección</span>
              </button>
              <Link
                to="/login"
                className="w-full sm:w-auto px-6 h-12 rounded-full bg-[#F5009B] text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-2 hover:bg-[#e0008d] transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-[18px]">login</span>
                <span>Ir a Iniciar Sesión</span>
              </Link>
            </div>
          </div>
        )}

        <div className="mt-4 pt-4 flex flex-wrap items-center justify-between gap-3 text-on-surface-variant font-body-sm text-body-sm">
          <span className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[16px] text-secondary">contact_support</span>
            <span>¿Ya no tienes acceso a este buzón?</span>
          </span>
          <a href="#secretaria" className="font-bold text-tertiary hover:underline">Contactar a Secretaría Escolar</a>
        </div>
      </div>

      <div className="mt-8 pt-4 flex items-center justify-between text-outline text-[12px] font-body-sm">
        <span className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[15px] text-[#005B60]">shield</span>
          <span>Encriptación AES-256 Bit</span>
        </span>
        <span>ID de Sesión: MTK-SEC-8942-AUTH</span>
      </div>
    </div>
  );
}