import { useState } from 'react';
import AuthNavbar from '../components/AuthNavbar';
import AuthTabs from '../components/AuthTabs';
import AuthForm from '../components/AuthForm';
import Footer from '../components/Footer';

export default function AuthView() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between transition-colors duration-300">
      
      {/* 1. Navbar adaptado con la misma lógica de accesibilidad y logos */}
      <AuthNavbar />

      {/* 2. Contenido Central de Login / Registro */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-[1180px] mx-auto">
          
          {/* Header Superior: Certificaciones */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-container text-on-primary-container text-xs font-bold">
                ✓
              </span>
              <span className="text-xs text-on-surface-variant font-medium">
                Plataforma Certificada AMI • Encriptación Biométrica de Grado Escolar
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px] text-tertiary">favorite</span>
              <span className="text-xs text-tertiary font-bold tracking-wide uppercase">
                Comunidad Montekids • +1,400 Familias Conectadas
              </span>
            </div>
          </div>

          {/* Tarjeta Split Principal */}
          <div className="relative w-full bg-surface-container-lowest rounded-3xl shadow-[0_20px_60px_-15px_rgba(30,18,74,0.12),0_4px_20px_0_rgba(0,219,235,0.08)] overflow-hidden flex flex-col min-h-[680px]">
            
            {/* Componente AuthTabs */}
            <AuthTabs activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Grid Dual Split */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 min-h-[600px]">
              
              {/* LADO IZQUIERDO: Formulario */}
              <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center bg-surface-container-lowest relative">
                <AuthForm activeTab={activeTab} setActiveTab={setActiveTab} />
              </div>

              {/* LADO DERECHO: Panel Lateral Decorativo */}
              <div className="lg:col-span-5 relative bg-gradient-to-br from-primary via-inverse-surface to-tertiary p-8 sm:p-10 lg:p-12 flex flex-col justify-between text-white overflow-hidden">
                <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary-container/20 blur-2xl pointer-events-none"></div>
                <div className="absolute bottom-10 -left-10 w-44 h-44 rounded-full bg-tertiary-container/20 blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-semibold">
                    <span className="material-symbols-outlined text-[16px] text-secondary-fixed">award_star</span>
                    <span>Montessori Digital AMI</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-secondary-container">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[18px]">star</span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 my-8">
                  <div className="inline-block mb-3 p-2 rounded-2xl bg-white/20 backdrop-blur-sm">
                    <span className="material-symbols-outlined text-[32px] text-primary-fixed">child_care</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug">
                    Acompañando el Crecimiento de tu Hijo 🌟
                  </h2>
                  <p className="text-sm text-white/85 mt-3 leading-relaxed">
                    Accede al reporte de actividades diarias, bitácora fotográfica de estimulación sensorial, canciones infantiles del aula y canal de comunicación directa con las maestras guías.
                  </p>

                  <div className="mt-6 flex flex-col gap-3">
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-2xl transition hover:bg-white/20">
                      <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold shrink-0">
                        <span className="material-symbols-outlined text-[18px]">phone_iphone</span>
                      </div>
                      <span className="text-xs font-bold">Monitoreo y bitácora en tiempo real</span>
                    </div>

                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-2xl transition hover:bg-white/20">
                      <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold shrink-0">
                        <span className="material-symbols-outlined text-[18px]">palette</span>
                      </div>
                      <span className="text-xs font-bold">Registro de hitos motrices y fonéticos</span>
                    </div>

                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-2xl transition hover:bg-white/20">
                      <div className="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-bold shrink-0">
                        <span className="material-symbols-outlined text-[18px]">military_tech</span>
                      </div>
                      <span className="text-xs font-bold">Portal seguro de logros y micro-premios</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 text-[11px] opacity-70">
                  Montekids Early Childhood & Stimulation Center
                </div>
              </div>

            </div>
          </div>

          {/* Footnote de Confianza */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3 p-4 bg-surface-container-lowest rounded-2xl shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">lock_clock</span>
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface">Privacidad Blindada</div>
                <div className="text-[11px] text-on-surface-variant">Cumplimiento estricto COPPA y GDPR-K</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-surface-container-lowest rounded-2xl shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface">Asociación AMI</div>
                <div className="text-[11px] text-on-surface-variant">Metodología Montessori verificada</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-surface-container-lowest rounded-2xl shadow-sm">
              <div className="w-9 h-9 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface">Soporte a Familias</div>
                <div className="text-[11px] text-on-surface-variant">Mesa de ayuda pedagógica 24/7</div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* 3. Tu Footer original importado */}
      <Footer />

    </div>
  );
}