import { useLanguage } from '../context/LanguageContext';

export default function SecurityPanel() {
  const { t } = useLanguage();

  return (
    <div className="lg:col-span-5 relative bg-gradient-to-br from-[#1b0b38] via-[#3c096c] to-[#005B60] p-8 sm:p-10 md:p-12 text-white flex flex-col justify-between overflow-hidden">
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-[#00dbeb]/25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-12 w-72 h-72 rounded-full bg-[#F5009B]/25 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        <div className="relative z-10 flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold shadow-inner transition-transform duration-300 hover:scale-105">
            <span className="material-symbols-outlined text-[16px] text-secondary-fixed">award_star</span>
            <span className="font-sans">{t('forgotPassword.panelBadge')}</span>
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

          <h2 className="text-2xl sm:text-[28px] leading-tight font-black mb-3.5 tracking-tight text-white font-headline-lg">
            {t('forgotPassword.panelTitle')}
          </h2>
          <p className="font-body-md text-body-md text-purple-100/90 leading-relaxed mb-8">
            {t('forgotPassword.panelDesc')}
          </p>

          <div className="flex flex-col gap-3.5">
            {/* Tarjeta 1 */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md shadow-xs hover:translate-x-2 transition-transform duration-200">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#00dbeb]/20 text-[#00dbeb] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">lock</span>
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-white mb-0.5">{t('forgotPassword.card1Title')}</h4>
                  <p className="text-xs text-purple-200 leading-normal font-body-sm">
                    {t('forgotPassword.card1Desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md shadow-xs hover:translate-x-2 transition-transform duration-200">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">shield</span>
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-white mb-0.5">{t('forgotPassword.card2Title')}</h4>
                  <p className="text-xs text-purple-200 leading-normal font-body-sm">
                    {t('forgotPassword.card2Desc')}
                  </p>
                </div>
              </div>
            </div>

            {/* Tarjeta 3 */}
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md shadow-xs hover:translate-x-2 transition-transform duration-200">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F5009B]/20 text-[#ff80cb] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[22px]">key</span>
                </div>
                <div>
                  <h4 className="text-[15px] font-bold text-white mb-0.5">{t('forgotPassword.card3Title')}</h4>
                  <p className="text-xs text-purple-200 leading-normal font-body-sm">
                    {t('forgotPassword.card3Desc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-8 pt-6">
        <div className="flex items-center gap-3">
          <div className="text-xs text-purple-200">
            <p>Montekids Early Childhood &amp; Stimulation Center</p>
          </div>
        </div>
      </div>
    </div>
  );
}