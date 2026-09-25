import React from 'react';
import { useApp } from '../../context/AppContext';
import { RubElHizbIcon } from '../common/IslamicIcons';
import { MASJID_INFO } from '../../data/mockData';

export const SplashScreen: React.FC = () => {
  const { setOverlayScreen, hasSeenOnboarding } = useApp();

  const handleEnter = () => {
    if (!hasSeenOnboarding) {
      setOverlayScreen('onboarding');
    } else {
      setOverlayScreen(null);
    }
  };

  return (
    <div 
      onClick={handleEnter}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 sm:p-8 text-white islamic-pattern bg-gradient-to-b from-[#07543F] via-[#087F5B] to-[#053D2E] cursor-pointer select-none overflow-hidden"
    >
      {/* Top subtle geometric watermark ornament */}
      <div className="pt-6 sm:pt-8 opacity-40">
        <RubElHizbIcon className="w-10 h-10 sm:w-12 sm:h-12 text-[#D4A72C]" />
      </div>

      {/* Main Center Logo & Brand Identity */}
      <div className="flex flex-col items-center text-center max-w-xs -mt-6 sm:-mt-8 px-2">
        {/* Arabic Calligraphy header */}
        <p className="text-sm sm:text-base font-arabic text-amber-200/90 mb-4 tracking-wide animate-splash-content">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>

        {/* Official Madina Masjid Logo with Soft Ambient Glow */}
        <div className="relative flex items-center justify-center mb-5 animate-splash-logo">
          {/* Subtle soft golden/emerald ambient backlight glow */}
          <div className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-amber-400/15 blur-2xl pointer-events-none" />

          {/* Official Logo loaded directly from Cloudinary URL */}
          <img
            src="https://res.cloudinary.com/dv16a8l1l/image/upload/v1790234824/MKB_Masjid_Logo_aj0mi3.png"
            alt="Madina Masjid MKB Nagar Logo"
            className="w-36 h-36 sm:w-44 sm:h-44 max-w-[176px] max-h-[176px] object-contain relative z-10 drop-shadow-2xl"
            loading="eager"
          />
        </div>

        {/* Masjid Branding Typography */}
        <div className="animate-splash-content flex flex-col items-center">
          <h1 className="text-2xl sm:text-[26px] font-extrabold tracking-tight text-white mb-1 leading-tight">
            Madina Masjid MKB Nagar
          </h1>

          <p className="text-xs sm:text-sm font-semibold text-amber-300 tracking-wide mt-0.5">
            M.K.B. Nagar, Chennai
          </p>

          <p className="text-[11px] sm:text-xs text-emerald-100/80 leading-relaxed font-normal mt-2 max-w-[260px]">
            {MASJID_INFO.tagline}
          </p>

          {/* Established Trust Tag */}
          <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/20 border border-amber-400/25 text-[10px] text-amber-200/90 font-medium tracking-wider">
            <span>EST. {MASJID_INFO.establishedYear}</span>
            <span>·</span>
            <span>{MASJID_INFO.city}</span>
          </div>
        </div>
      </div>

      {/* Bottom Loading / Tap to Enter Indicator */}
      <div className="flex flex-col items-center gap-2.5 pb-6">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#D4A72C] animate-ping"></span>
          <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        </div>
        <p className="text-[11px] sm:text-[12px] text-emerald-100/70 font-medium">
          Tap anywhere to continue
        </p>
      </div>
    </div>
  );
};
