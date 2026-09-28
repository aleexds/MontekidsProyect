
import AuthNavbar from '../components/AuthNavbar';
import Footer from '../components/Footer';
import ForgotPasswordForm from '../components/ForgotPasswordForm';
import SecurityPanel from '../components/SecurityPanel';

export default function ForgotPasswordView() {
  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between font-body-md text-on-surface antialiased">
      {/* Navbar Superior Reutilizado */}
      <AuthNavbar />

      <main className="w-full pt-20 pb-16 flex-1 flex flex-col justify-between">
        {/* Ribbon Superior de Seguridad */}
        <div className="w-full bg-surface-container-low shadow-[0_1px_3px_rgba(30,18,74,0.03)] mb-6">
          <div className="w-full max-w-[1440px] mx-auto px-margin-mobile md:px-margin py-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 bg-[#e6f7f8] text-[#005B60] px-3.5 py-1 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-[17px] font-bold">verified</span>
              <span className="font-body-sm text-body-sm font-bold tracking-tight">
                Plataforma Certificada AMI • Encriptación Biométrica de Grado Escolar
              </span>
            </div>
            <div className="inline-flex items-center gap-2 bg-tertiary-fixed text-tertiary px-3.5 py-1 rounded-full shadow-sm">
              <span className="material-symbols-outlined text-[17px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                favorite
              </span>
              <span className="font-body-sm text-body-sm font-extrabold uppercase tracking-wider">
                COMUNIDAD MONTEKIDS • +1,400 FAMILIAS CONECTADAS
              </span>
            </div>
          </div>
        </div>

        {/* Tarjeta Contenedora Dividida */}
        <div className="w-full max-w-[1240px] mx-auto px-margin-mobile md:px-margin">
          <div className="relative bg-surface-container-lowest rounded-3xl shadow-[0_24px_50px_-12px_rgba(30,18,74,0.12)] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
              {/* Lado Izquierdo: Formulario */}
              <ForgotPasswordForm />
              
              {/* Lado Derecho: Panel Lateral */}
              <SecurityPanel />
            </div>
          </div>

          {/* Footnote Grid de Confianza */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <h3 className="text-base font-extrabold text-[#1e1035]">Privacidad Blindada 🔒</h3>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Cumplimiento riguroso de normativas internacionales COPPA y GDPR-K para el resguardo exclusivo de datos de menores.
              </p>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">verified</span>
                </div>
                <h3 className="text-base font-extrabold text-[#1e1035]">Asociación AMI 🛡️</h3>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Metodología Montessori oficial certificada con canales institucionales y protocolos de aula debidamente auditados.
              </p>
            </div>

            <div className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-9 h-9 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">headset_mic</span>
                </div>
                <h3 className="text-base font-extrabold text-[#1e1035]">Soporte a Familias 🎧</h3>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Mesa de ayuda pedagógica 24/7 y asistencia telefónica prioritaria para apoderados y docentes en todo momento.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Global Reutilizado */}
      <Footer />
    </div>
  );
}