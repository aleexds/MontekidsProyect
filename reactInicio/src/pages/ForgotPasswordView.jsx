import AuthNavbar from '../components/AuthNavbar';
import Footer from '../components/Footer';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import SecurityPanel from '../components/SecutiryPanel';
import { useLanguage } from '../context/LanguageContext';

export default function ForgotPasswordView() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between transition-colors duration-300 font-sans">
      
      {/* 1. Navbar */}
      <AuthNavbar />

      {/* 2. Contenido Central */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center animate-page-bounce">
        <div className="w-full max-w-[1180px] mx-auto">
          
          {/* Header Superior: Certificaciones (Idéntico a AuthView) */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-container text-on-primary-container text-xs font-bold">
                ✓
              </span>
              <span className="text-xs text-on-surface-variant font-medium">
                {t('auth.certBar', 'Plataforma Certificada AMI • Encriptación Biométrica de Grado Escolar')}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-tertiary">favorite</span>
              <span className="text-xs text-tertiary font-bold tracking-wide uppercase font-sans">
                {t('auth.communityBar', 'Comunidad Montekids • +1,400 Familias Conectadas')}
              </span>
            </div>
          </div>

          {/* Tarjeta Split Principal */}
          <div className="relative w-full bg-surface-container-lowest rounded-3xl shadow-[0_20px_60px_-15px_rgba(30,18,74,0.12),0_4px_20px_0_rgba(0,219,235,0.08)] overflow-hidden flex flex-col min-h-[680px]">
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
              
              {/* LADO IZQUIERDO: Formulario de Recuperación */}
              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-surface-container-lowest relative">
                <ForgotPasswordForm />
              </div>

              {/* LADO DERECHO: Panel Lateral Decorativo / Seguridad */}
              <SecurityPanel />

            </div>
          </div>

          {/* FOOTNOTE DE CONFIANZA */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
            
            <div className="group flex items-center gap-3 p-4 bg-surface-container-lowest rounded-2xl shadow-sm border border-transparent hover:border-surface-container-high transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default">
              <div className="w-9 h-9 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined text-[20px]">lock_clock</span>
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface font-heading">
                  {t('auth.trust1Title', 'Privacidad Blindada')}
                </div>
                <div className="text-[11px] text-on-surface-variant font-sans">
                  {t('auth.trust1Desc', 'Cumplimiento estricto COPPA y GDPR-K')}
                </div>
              </div>
            </div>

            <div className="group flex items-center gap-3 p-4 bg-surface-container-lowest rounded-2xl shadow-sm border border-transparent hover:border-surface-container-high transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default">
              <div className="w-9 h-9 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface font-heading">
                  {t('auth.trust2Title', 'Asociación AMI')}
                </div>
                <div className="text-[11px] text-on-surface-variant font-sans">
                  {t('auth.trust2Desc', 'Metodología Montessori verificada')}
                </div>
              </div>
            </div>

            <div className="group flex items-center gap-3 p-4 bg-surface-container-lowest rounded-2xl shadow-sm border border-transparent hover:border-surface-container-high transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default">
              <div className="w-9 h-9 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface font-heading">
                  {t('auth.trust3Title', 'Soporte a Familias')}
                </div>
                <div className="text-[11px] text-on-surface-variant font-sans">
                  {t('auth.trust3Desc', 'Mesa de ayuda pedagógica 24/7')}
                </div>
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* 3. Footer */}
      <Footer />

    </div>
  );
}