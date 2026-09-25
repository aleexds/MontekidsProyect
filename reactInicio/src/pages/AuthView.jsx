import { useState } from 'react';
import AuthNavbar from '../components/AuthNavbar';
import AuthTabs from '../components/AuthTabs';
import AuthForm from '../components/AuthForm';
import Footer from '../components/Footer';

export default function AuthView() {
  const [activeTab, setActiveTab] = useState('login');

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-between transition-colors duration-300 font-sans">
      
      {/* 1. Navbar */}
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
              <span className="text-xs text-tertiary font-bold tracking-wide uppercase font-sans">
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
                
                {/* EFECTO GLASSMORPHISM & LUCES AMBIENTALES DE FONDO */}
                <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-primary-container blur-3xl pointer-events-none animate-glow-slow"></div>
                <div className="absolute -bottom-12 -left-12 w-52 h-52 rounded-full bg-tertiary-container blur-3xl pointer-events-none animate-glow-reverse"></div>
                <div className="absolute inset-0 bg-white/[0.03] backdrop-blur-[1px] pointer-events-none"></div>

                {/* CONTENIDO PRINCIPAL */}
                <div className="relative z-10 flex items-center justify-between">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold shadow-inner transition-transform duration-300 hover:scale-105">
                    <span className="material-symbols-outlined text-[16px] text-secondary-fixed">award_star</span>
                    <span className="font-sans">Montessori Digital AMI</span>
                  </div>
                  
                  <div className="flex items-center gap-0.5 text-secondary-container">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="material-symbols-outlined text-[18px] transition-transform duration-200 hover:scale-125 cursor-pointer">star</span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 my-8">
                  <div className="inline-block mb-3 p-2.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 shadow-sm transition-transform duration-300 hover:rotate-6">
                    <span className="material-symbols-outlined text-[32px] text-primary-fixed">child_care</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-snug font-heading">
                    Acompañando el Crecimiento de tu Hijo 🌟
                  </h2>

                  <p className="text-sm text-white/85 mt-3 leading-relaxed font-sans">
                    Accede al reporte de actividades diarias, bitácora fotográfica de estimulación sensorial, canciones infantiles del aula y canal de comunicación directa con las maestras guías.
                  </p>

                  {/* CONTENEDORES CON HOVER (Desplazamiento horizontal e iluminación) */}
                  <div className="mt-6 flex flex-col gap-3 font-sans">
                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-2xl transition-all duration-300 hover:bg-white/20 hover:translate-x-2 hover:border-white/25 cursor-default">
                      <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold shrink-0">
                        <span className="material-symbols-outlined text-[18px]">phone_iphone</span>
                      </div>
                      <span className="text-xs font-bold">Monitoreo y bitácora en tiempo real</span>
                    </div>

                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-2xl transition-all duration-300 hover:bg-white/20 hover:translate-x-2 hover:border-white/25 cursor-default">
                      <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold shrink-0">
                        <span className="material-symbols-outlined text-[18px]">palette</span>
                      </div>
                      <span className="text-xs font-bold">Registro de hitos motrices y fonéticos</span>
                    </div>

                    <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 p-3 rounded-2xl transition-all duration-300 hover:bg-white/20 hover:translate-x-2 hover:border-white/25 cursor-default">
                      <div className="w-8 h-8 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-bold shrink-0">
                        <span className="material-symbols-outlined text-[18px]">military_tech</span>
                      </div>
                      <span className="text-xs font-bold">Portal seguro de logros y micro-premios</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 text-[11px] opacity-70 font-sans">
                  Montekids Early Childhood & Stimulation Center
                </div>
              </div>

            </div>
          </div>

          {/* FOOTNOTE DE CONFIANZA: TARJETAS CON ELEVACIÓN EN HOVER (-translate-y-1 + shadow-lg) */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans">
            
            <div className="group flex items-center gap-3 p-4 bg-surface-container-lowest rounded-2xl shadow-sm border border-transparent hover:border-surface-container-high transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default">
              <div className="w-9 h-9 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined text-[20px]">lock_clock</span>
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface font-heading">Privacidad Blindada</div>
                <div className="text-[11px] text-on-surface-variant font-sans">Cumplimiento estricto COPPA y GDPR-K</div>
              </div>
            </div>

            <div className="group flex items-center gap-3 p-4 bg-surface-container-lowest rounded-2xl shadow-sm border border-transparent hover:border-surface-container-high transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default">
              <div className="w-9 h-9 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface font-heading">Asociación AMI</div>
                <div className="text-[11px] text-on-surface-variant font-sans">Metodología Montessori verificada</div>
              </div>
            </div>

            <div className="group flex items-center gap-3 p-4 bg-surface-container-lowest rounded-2xl shadow-sm border border-transparent hover:border-surface-container-high transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-default">
              <div className="w-9 h-9 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                <span className="material-symbols-outlined text-[20px]">support_agent</span>
              </div>
              <div>
                <div className="text-xs font-bold text-on-surface font-heading">Soporte a Familias</div>
                <div className="text-[11px] text-on-surface-variant font-sans">Mesa de ayuda pedagógica 24/7</div>
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