import { useState } from 'react';
import AnimatedInteractiveWord from './AnimatedInteractiveWord';

export default function AuthForm({ activeTab, setActiveTab }) {
  // Estado para mostrar / ocultar contraseña
  const [showPassword, setShowPassword] = useState(false);

  // Campos para Formulario de Login
  const [loginEmail, setLoginEmail] = useState('valeria.quiros@gmail.com');
  const [loginPassword, setLoginPassword] = useState('Montekids2025');

  // Campos para Formulario de Registro
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regCode, setRegCode] = useState('');
  const [regPassword, setRegPassword] = useState('');

  // Medidor de fuerza de contraseña
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, text: 'Sin contraseña', class: 'text-on-surface-variant' };
    if (pass.length < 6) return { score: 1, text: 'Débil', class: 'text-error' };
    if (pass.length < 10) return { score: 2, text: 'Buena', class: 'text-secondary-container' };
    return { score: 3, text: 'Fuerte y Segura', class: 'text-primary' };
  };

  const strength = getPasswordStrength(regPassword);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'login') {
      console.log('Iniciando sesión con:', { loginEmail, loginPassword });
    } else {
      console.log('Registrando familia con:', { regName, regEmail, regCode, regPassword });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col justify-center">
      {activeTab === 'login' ? (
        /* ================= VISTA LOGIN ================= */
        <div className="animate-fadeIn">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container text-on-surface-variant text-xs mb-2">
              <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
              <span>Ciclo Escolar 2025 • Trimestre de Primavera</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              <AnimatedInteractiveWord word="¡Hola" baseColorClass="text-on-surface" />{' '}
              <AnimatedInteractiveWord word="de" baseColorClass="text-on-surface" />{' '}
              <AnimatedInteractiveWord word="Nuevo!" baseColorClass="text-on-surface" />{' '}
              <span className="inline-block animate-bounce">👋</span>
            </h1>
            <p className="text-sm text-on-surface-variant mt-1">
              Ingresa a tu cuenta para continuar con el seguimiento en vivo de tu pequeño explorador y revisar sus bitácoras sensoriales.
            </p>
          </div>

          {/* Botón Google Workspace */}
          <button
            type="button"
            className="w-full mb-6 py-3 px-4 rounded-2xl bg-surface-container-lowest hover:bg-surface-container text-on-surface font-bold text-sm shadow-[0_2px_8px_rgba(30,18,74,0.06)] transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.8 5 12 5z" fill="#EA4335" />
              <path d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z" fill="#4285F4" />
              <path d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.4 0-.8.2-1.6.4-2.4L1.6 7c-.8 1.6-1.3 3.4-1.3 5.3s.5 3.7 1.3 5.3l3.7-2.9z" fill="#FBBC05" />
              <path d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.2 0-5.8-2.3-6.7-5.3L1.6 15.9C3.5 19.7 7.4 23 12 23z" fill="#34A853" />
            </svg>
            <span>Continuar con Google Workspace Escolar</span>
          </button>

          {/* Divisor */}
          <div className="relative flex items-center justify-center mb-6">
            <div className="w-full h-[1px] bg-surface-container-high"></div>
            <span className="absolute px-3 bg-surface-container-lowest text-[10px] font-bold text-outline uppercase tracking-wider">
              o con tus credenciales
            </span>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1.5">
                Correo Electrónico Registrado
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-on-surface-variant text-[20px] pointer-events-none">
                  mail
                </span>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="ej. mama.mateo@email.com"
                  className="w-full h-[52px] pl-12 pr-4 bg-surface-container-lowest rounded-2xl text-on-surface text-sm shadow-[0_2px_6px_rgba(30,18,74,0.04)] focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold text-on-surface">Contraseña</label>
                <a href="#forgot" className="text-xs font-bold text-primary hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-on-surface-variant text-[20px] pointer-events-none">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-[52px] pl-12 pr-12 bg-surface-container-lowest rounded-2xl text-on-surface text-sm shadow-[0_2px_6px_rgba(30,18,74,0.04)] focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-on-surface-variant hover:text-on-surface transition-colors p-1"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Checkbox & Badge de Seguridad */}
            <div className="flex items-center justify-between py-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-primary cursor-pointer" />
                <span className="text-xs text-on-surface-variant">Recordar en este dispositivo por 30 días</span>
              </label>
              <div className="flex items-center gap-1 text-[11px] font-bold text-secondary px-2.5 py-0.5 rounded-full bg-secondary-fixed">
                <span className="material-symbols-outlined text-[14px]">shield</span>
                <span>SSL 256-bit</span>
              </div>
            </div>

            {/* Botón submit */}
            <button
              type="submit"
              className="mt-2 w-full h-[54px] rounded-full bg-tertiary hover:brightness-110 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(183,0,114,0.30)] active:scale-95 transition-all cursor-pointer"
            >
              <span>Ingresar al Aula Virtual</span>
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </button>
          </form>

          {/* Footer Callout */}
          <div className="mt-6 p-3 rounded-2xl bg-surface-container-low text-center text-xs text-on-surface-variant">
            <span>¿Aún no tienes cuenta registrada para tu hijo? </span>
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className="font-bold text-primary hover:underline inline-flex items-center gap-0.5 ml-1"
            >
              Registrarse Aquí ✨
            </button>
          </div>
        </div>
      ) : (
        /* ================= VISTA REGISTRO ================= */
        <div className="animate-fadeIn">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-xs font-bold mb-2">
              <span className="material-symbols-outlined text-[14px]">school</span>
              <span>Inscripción Familiar • Ciclo 2025</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
              <AnimatedInteractiveWord word="Crea" baseColorClass="text-on-surface" />{' '}
              <AnimatedInteractiveWord word="tu" baseColorClass="text-on-surface" />{' '}
              <AnimatedInteractiveWord word="Cuenta" baseColorClass="text-on-surface" />{' '}
              <AnimatedInteractiveWord word="de" baseColorClass="text-on-surface" />{' '}
              <AnimatedInteractiveWord word="Familia" baseColorClass="text-on-surface" />{' '}
              🌱
            </h2>
            <p className="text-sm text-on-surface-variant mt-1">
              Vincula de forma segura el acceso directo al aula y a la bitácora personalizada de tu hijo en Montekids.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">
                Nombre Completo del Apoderado o Tutor
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-on-surface-variant text-[20px] pointer-events-none">
                  person
                </span>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="ej. Valeria Quirós Fernández"
                  className="w-full h-[50px] pl-12 pr-4 bg-surface-container-lowest rounded-2xl text-on-surface text-sm shadow-[0_2px_6px_rgba(30,18,74,0.04)] focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">
                Correo Electrónico de Contacto
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-on-surface-variant text-[20px] pointer-events-none">
                  mail
                </span>
                <input
                  type="email"
                  required
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="tu.correo@ejemplo.com"
                  className="w-full h-[50px] pl-12 pr-4 bg-surface-container-lowest rounded-2xl text-on-surface text-sm shadow-[0_2px_6px_rgba(30,18,74,0.04)] focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-bold text-on-surface">Código de Aula / Alumno</label>
                <span className="text-[10px] font-bold text-secondary bg-secondary-fixed px-2 py-0.5 rounded-full">
                  Proporcionado en Recepción
                </span>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-on-surface-variant text-[20px] pointer-events-none">
                  qr_code
                </span>
                <input
                  type="text"
                  required
                  value={regCode}
                  onChange={(e) => setRegCode(e.target.value)}
                  placeholder="ej. MK-2025-EXPLO-88"
                  className="w-full h-[50px] pl-12 pr-4 bg-surface-container-lowest rounded-2xl text-on-surface text-sm uppercase tracking-wider shadow-[0_2px_6px_rgba(30,18,74,0.04)] focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-on-surface mb-1">
                Crear Contraseña Segura
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-on-surface-variant text-[20px] pointer-events-none">
                  lock
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Mínimo 8 caracteres"
                  className="w-full h-[50px] pl-12 pr-12 bg-surface-container-lowest rounded-2xl text-on-surface text-sm shadow-[0_2px_6px_rgba(30,18,74,0.04)] focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 text-on-surface-variant hover:text-on-surface transition-colors p-1"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>

              {/* Indicadores de fortaleza de clave */}
              <div className="flex items-center gap-1.5 mt-2">
                <div className="flex-1 h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                  <div className={`h-full bg-error transition-all duration-300 ${strength.score >= 1 ? 'w-full' : 'w-0'}`}></div>
                </div>
                <div className="flex-1 h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                  <div className={`h-full bg-secondary-container transition-all duration-300 ${strength.score >= 2 ? 'w-full' : 'w-0'}`}></div>
                </div>
                <div className="flex-1 h-1.5 rounded-full bg-surface-container-high overflow-hidden">
                  <div className={`h-full bg-primary transition-all duration-300 ${strength.score >= 3 ? 'w-full' : 'w-0'}`}></div>
                </div>
                <span className={`text-xs font-bold ml-1 ${strength.class}`}>{strength.text}</span>
              </div>
            </div>

            <div className="py-1">
              <label className="flex items-start gap-2 cursor-pointer select-none">
                <input type="checkbox" required className="w-4 h-4 mt-0.5 rounded accent-primary cursor-pointer" />
                <span className="text-xs text-on-surface-variant leading-snug">
                  Acepto los <a href="#terms" className="text-primary font-bold hover:underline">Términos de Servicio</a> y autorizo el tratamiento bajo la <a href="#privacy" className="text-primary font-bold hover:underline">Política AMI</a>.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="mt-1 w-full h-[54px] rounded-full bg-primary hover:brightness-110 text-white font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-[0_8px_24px_rgba(0,105,113,0.30)] active:scale-95 transition-all cursor-pointer"
            >
              <span>Crear Cuenta de Familia ✨</span>
              <span className="material-symbols-outlined text-[20px]">assignment_turned_in</span>
            </button>
          </form>

          <div className="mt-6 p-3 rounded-2xl bg-surface-container-low text-center text-xs text-on-surface-variant">
            <span>¿Ya tienes una cuenta de tutor activa? </span>
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className="font-bold text-primary hover:underline inline-flex items-center gap-0.5 ml-1"
            >
              Iniciar Sesión Aquí 🔒
            </button>
          </div>
        </div>
      )}
    </div>
  );
}