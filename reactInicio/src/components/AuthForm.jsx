import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import AnimatedInteractiveWord from './AnimatedInteractiveWord';

export default function AuthForm({ activeTab, setActiveTab }) {
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Estados para el Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Estados para el Registro
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [childFirstName, setChildFirstName] = useState('');
  const [childLastName, setChildLastName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const calculateClassroom = (age) => {
    const numAge = parseInt(age, 10);
    if (isNaN(numAge)) return 'Pendiente de asignar';
    if (numAge >= 2 && numAge <= 4) return 'Aula Semillitas (2 a 4 años)';
    if (numAge > 4 && numAge <= 6) return 'Aula Exploradores (4 a 6 años)';
    if (numAge > 6 && numAge <= 8) return 'Aula Creadores (6 a 8 años)';
    return 'Fuera de rango';
  };

  const getPasswordStrengthLevel = (pass) => {
    if (!pass) return 0;
    const hasLength8 = pass.length >= 8;
    const hasNumbers = /[0-9]/.test(pass);
    const hasUpper = /[A-Z]/.test(pass);
    const hasSpecial = /[@$!%*?&._-]/.test(pass);
    if (hasLength8 && hasNumbers && hasUpper && hasSpecial) return 3;
    if (hasLength8 && hasNumbers) return 2;
    return 1;
  };

  const strengthLevel = getPasswordStrengthLevel(registerPassword);

  const getStrengthInfo = () => {
    if (!registerPassword) return { text: '', color: 'text-gray-400' };
    if (strengthLevel === 1) return { text: t('auth.passWeak', 'Débil'), color: 'text-red-500' };
    if (strengthLevel === 2) return { text: 'Media', color: 'text-amber-500' };
    if (strengthLevel === 3) return { text: t('auth.passStrong', 'Fuerte y Segura'), color: 'text-emerald-600' };
    return { text: '', color: 'text-gray-400' };
  };

  const strengthInfo = getStrengthInfo();

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!acceptedTerms) {
      setErrorMessage('Debes aceptar los Términos de Servicio y la Política AMI.');
      return;
    }

    const numAge = parseInt(childAge, 10);
    if (isNaN(numAge) || numAge < 2 || numAge > 8) {
      setErrorMessage('Edad no permitida. El rango regular es de 2 a 8 años.');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    const assignedClassroom = calculateClassroom(childAge);
    const newUser = {
      name: registerName,
      email: registerEmail,
      role: 'tutor',
      child: { firstName: childFirstName, lastName: childLastName, age: childAge, classroom: assignedClassroom },
      password: registerPassword,
      createdAt: new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        setSuccessMessage(`¡Cuenta creada con éxito! Asignado a: ${assignedClassroom}`);
        setRegisterName(''); setRegisterEmail(''); setChildFirstName('');
        setChildLastName(''); setChildAge(''); setRegisterPassword(''); setAcceptedTerms(false);
        setTimeout(() => setActiveTab('login'), 2000);
      } else {
        setErrorMessage('Hubo un problema al registrar la cuenta en el servidor.');
      }
    } catch (error) {
      console.error('Error de conexión:', error);
      setErrorMessage('No se pudo conectar con el servidor (json-server).');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setTimeout(() => {
      setIsLoading(false);
      if (loginEmail && loginPassword) {
        setSuccessMessage('¡Inicio de sesión exitoso!');
      } else {
        setErrorMessage('Por favor completa todos los campos.');
      }
    }, 800);
  };

  return (
    <div className="w-full flex flex-col justify-center animate-fadeIn">
      {errorMessage && (
        <div className="mb-4 p-3 rounded-xl bg-red-50 text-red-700 text-xs font-bold border border-red-200">{errorMessage}</div>
      )}
      {successMessage && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">{successMessage}</div>
      )}

      {activeTab === 'login' ? (
        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
          <div className="mb-2">
            <div className="flex items-center gap-2 text-xs text-amber-700 font-bold mb-1">
              <span>● {t('auth.schoolCycle', 'Ciclo Escolar 2025 • Trimestre de Primavera')}</span>
            </div>
            
            {/* TÍTULO DE LOGIN DINÁMICO */}
            <h1 className="text-[28px] sm:text-[32px] leading-[1.15] tracking-tight mb-2 font-extrabold text-[#1e1035] flex items-center gap-2 flex-wrap">
              {t('auth.loginWord1') && <AnimatedInteractiveWord word={t('auth.loginWord1')} baseColorClass="text-[#1e1035] transition-colors duration-300 cursor-default" />}
              {t('auth.loginWord2') && <AnimatedInteractiveWord word={t('auth.loginWord2')} baseColorClass="text-[#1e1035] transition-colors duration-300 cursor-default" />}
              {t('auth.loginWord3') && <AnimatedInteractiveWord word={t('auth.loginWord3')} baseColorClass="text-[#1e1035] transition-colors duration-300 cursor-default" />}
              <span className="inline-block animate-bounce origin-bottom cursor-default">👋</span>
            </h1>

            <p className="text-xs sm:text-sm text-gray-600">
              {t('auth.loginSubtitle', 'Ingresa a tu cuenta para continuar con el seguimiento en vivo de tu pequeño explorador y revisar sus bitácoras sensoriales.')}
            </p>
          </div>

          <button
            type="button"
            className="w-full h-12 rounded-2xl border border-gray-200 bg-white flex items-center justify-center gap-3 font-semibold text-xs text-gray-700 hover:bg-gray-50 transition-all cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-red-500 text-lg">g_translate</span>
            <span>{t('auth.googleAuth', 'Continuar con Google Workspace Escolar')}</span>
          </button>

          <div className="flex items-center my-2">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="px-3 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
              {t('auth.orDivider', 'o con tus credenciales')}
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-[#1e1035]">{t('auth.emailLabel', 'Correo Electrónico Registrado')}</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400 material-symbols-outlined text-lg">mail</span>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder={t('auth.emailPlaceholder', 'valeria.quiros@gmail.com')}
                className="w-full h-12 pl-11 pr-4 bg-gray-50 text-gray-800 rounded-2xl text-xs outline-none border border-gray-200 focus:border-pink-500 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#1e1035]">{t('auth.passwordLabel', 'Contraseña')}</label>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-xs font-bold text-[#F5009B] hover:underline cursor-pointer bg-transparent border-none p-0"
              >
                {t('auth.forgotPassword', '¿Olvidaste tu contraseña?')}
              </button>
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400 material-symbols-outlined text-lg">lock</span>
              <input
                type={showLoginPassword ? "text" : "password"}
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-12 pl-11 pr-12 bg-gray-50 text-gray-800 rounded-2xl text-xs outline-none border border-gray-200 focus:border-pink-500 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
                className="absolute right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">{showLoginPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs my-1">
            <label className="flex items-center gap-2 cursor-pointer text-gray-600">
              <input type="checkbox" defaultChecked className="rounded text-pink-600 focus:ring-pink-500" />
              <span>{t('auth.rememberMe', 'Recordar en este dispositivo por 30 días')}</span>
            </label>
            <span className="text-[10px] font-bold text-gray-500 flex items-center gap-1">
              <span className="material-symbols-outlined text-xs text-amber-600">lock</span> SSL 256-bit
            </span>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-13 rounded-2xl bg-gradient-to-r from-[#d90479] to-[#F5009B] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-[0_8px_20px_rgba(245,0,155,0.3)] hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer"
          >
            {isLoading ? '...' : <><span>{t('auth.submitLogin', 'Ingresar al Aula Virtual')}</span> <span className="material-symbols-outlined text-base">arrow_forward</span></>}
          </button>

          <div className="text-center mt-2 text-xs text-gray-600">
            {t('auth.noAccountText', '¿Aún no tienes cuenta registrada para tu hijo?')}{' '}
            <button
              type="button"
              onClick={() => setActiveTab('register')}
              className="text-[#F5009B] font-bold hover:underline cursor-pointer"
            >
              {t('auth.registerLink', 'Registrarse Aquí ✨')}
            </button>
          </div>
        </form>
      ) : (
        /* FORMULARIO DE REGISTRO */
        <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3">
          <div className="mb-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-[10px] font-extrabold mb-1 tracking-wider uppercase">
              <span className="material-symbols-outlined text-xs">school</span>
              <span>{t('auth.regSchoolCycle', 'Inscripción Familiar • Ciclo 2025')}</span>
            </div>
            
            <h1 className="text-[26px] sm:text-[28px] leading-[1.15] tracking-tight mb-1 font-extrabold text-[#1e1035] flex items-center gap-2 flex-wrap">
              {t('auth.regWord1') && <AnimatedInteractiveWord word={t('auth.regWord1')} baseColorClass="text-[#1e1035] transition-colors duration-300 cursor-default" />}
              {t('auth.regWord2') && <AnimatedInteractiveWord word={t('auth.regWord2')} baseColorClass="text-[#1e1035] transition-colors duration-300 cursor-default" />}
              {t('auth.regWord3') && <AnimatedInteractiveWord word={t('auth.regWord3')} baseColorClass="text-[#1e1035] transition-colors duration-300 cursor-default" />}
              {t('auth.regWord4') && <AnimatedInteractiveWord word={t('auth.regWord4')} baseColorClass="text-[#1e1035] transition-colors duration-300 cursor-default" />}
              {t('auth.regWord5') && <AnimatedInteractiveWord word={t('auth.regWord5')} baseColorClass="text-[#1e1035] transition-colors duration-300 cursor-default" />}
              <span className="inline-block animate-bounce origin-bottom cursor-default">🌱</span>
            </h1>

            <p className="text-xs text-gray-600">
              {t('auth.regSubtitle', 'Vincula de forma segura el acceso directo al aula y a la bitácora personalizada de tu hijo en Montekids.')}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-[#1e1035]">{t('auth.regNameLabel', 'Nombre Completo del Apoderado o Tutor')}</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400 material-symbols-outlined text-lg">person</span>
              <input
                type="text"
                required
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                placeholder={t('auth.regNamePlaceholder', 'ej. Valeria Quirós Fernández')}
                className="w-full h-11 pl-11 pr-4 bg-gray-50 text-gray-800 rounded-2xl text-xs outline-none border border-gray-200 focus:border-teal-600 focus:bg-white transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-[#1e1035]">{t('auth.regEmailLabel', 'Correo Electrónico de Contacto')}</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400 material-symbols-outlined text-lg">mail</span>
              <input
                type="email"
                required
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                placeholder={t('auth.regEmailPlaceholder', 'tu.correo@ejemplo.com')}
                className="w-full h-11 pl-11 pr-4 bg-gray-50 text-gray-800 rounded-2xl text-xs outline-none border border-gray-200 focus:border-teal-600 focus:bg-white transition-all placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#1e1035]">Nombre del Hijo/a</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-400 material-symbols-outlined text-base">child_care</span>
                <input
                  type="text"
                  required
                  value={childFirstName}
                  onChange={(e) => setChildFirstName(e.target.value)}
                  placeholder="ej. Mateo"
                  className="w-full h-11 pl-9 pr-3 bg-gray-50 text-gray-800 rounded-2xl text-xs outline-none border border-gray-200 focus:border-teal-600 focus:bg-white transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#1e1035]">Apellido del Hijo/a</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-400 material-symbols-outlined text-base">badge</span>
                <input
                  type="text"
                  required
                  value={childLastName}
                  onChange={(e) => setChildLastName(e.target.value)}
                  placeholder="ej. Cubero"
                  className="w-full h-11 pl-9 pr-3 bg-gray-50 text-gray-800 rounded-2xl text-xs outline-none border border-gray-200 focus:border-teal-600 focus:bg-white transition-all placeholder:text-gray-400"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 items-center">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-[#1e1035]">Edad del Niño/a (2 a 8 años)</label>
              <div className="relative flex items-center">
                <span className="absolute left-3 text-gray-400 material-symbols-outlined text-base">cake</span>
                <input
                  type="number"
                  min="1"
                  max="15"
                  required
                  value={childAge}
                  onChange={(e) => setChildAge(e.target.value)}
                  placeholder="ej. 5"
                  className="w-full h-11 pl-9 pr-3 bg-gray-50 text-gray-800 rounded-2xl text-xs outline-none border border-gray-200 focus:border-teal-600 focus:bg-white transition-all placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-[11px] font-bold text-teal-800">Aula Asignada</label>
              <div className={`h-11 px-3 border rounded-2xl flex items-center text-[11px] font-bold truncate ${
                childAge && (parseInt(childAge) < 2 || parseInt(childAge) > 8)
                  ? 'bg-red-50 border-red-200 text-red-600'
                  : 'bg-teal-50/80 border-teal-200 text-teal-900'
              }`}>
                {childAge ? calculateClassroom(childAge) : 'Indique la edad'}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[11px] font-bold text-[#1e1035]">{t('auth.createPassLabel', 'Crear Contraseña Segura')}</label>
            <div className="relative flex items-center">
              <span className="absolute left-4 text-gray-400 material-symbols-outlined text-lg">lock</span>
              <input
                type={showRegisterPassword ? "text" : "password"}
                required
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder={t('auth.createPassPlaceholder', '••••••••••••')}
                className="w-full h-11 pl-11 pr-12 bg-gray-50 text-gray-800 rounded-2xl text-xs outline-none border border-gray-200 focus:border-teal-600 focus:bg-white transition-all"
              />
              <button
                type="button"
                onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                className="absolute right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">{showRegisterPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-1">
              <div className={`h-1 rounded-full transition-all ${strengthLevel >= 1 ? 'bg-red-500' : 'bg-gray-200'}`}></div>
              <div className={`h-1 rounded-full transition-all ${strengthLevel >= 2 ? 'bg-amber-500' : 'bg-gray-200'}`}></div>
              <div className={`h-1 rounded-full transition-all ${strengthLevel >= 3 ? 'bg-emerald-500' : 'bg-gray-200'}`}></div>
            </div>

            <div className="flex justify-end mt-0.5">
              <span className={`text-[10px] font-bold ${strengthInfo.color}`}>{strengthInfo.text}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 my-0.5">
            <input
              type="checkbox"
              id="terms"
              required
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="rounded text-teal-600 focus:ring-teal-500 w-4 h-4"
            />
            <label htmlFor="terms" className="text-[11px] text-gray-600">
              {t('auth.termsText1', 'Acepto los')} <a href="#terms" className="text-teal-700 font-bold hover:underline">{t('auth.termsLink', 'Términos de Servicio')}</a> {t('auth.termsText2', 'y la')} <a href="#privacy" className="text-teal-700 font-bold hover:underline">{t('auth.privacyLink', 'Política AMI')}</a>.
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 rounded-2xl bg-[#006256] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-[0_6px_16px_rgba(0,98,86,0.25)] hover:bg-[#005248] active:scale-[0.98] transition-all cursor-pointer mt-0.5"
          >
            {isLoading ? '...' : <><span>{t('auth.submitRegister', 'Crear Cuenta de Familia ✨')}</span> <span className="material-symbols-outlined text-base">task_alt</span></>}
          </button>

          <div className="text-center mt-2 text-xs text-gray-600">
            {t('auth.haveAccountText', '¿Ya tienes una cuenta de tutor activa?')}{' '}
            <button
              type="button"
              onClick={() => setActiveTab('login')}
              className="text-teal-700 font-bold hover:underline cursor-pointer"
            >
              {t('auth.loginLink', 'Iniciar Sesión Aquí 🔒')}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}