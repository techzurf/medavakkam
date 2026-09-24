import React from 'react';
import { useApp } from '../../context/AppContext';
import { MosqueIcon, RubElHizbIcon } from '../common/IslamicIcons';
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
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-8 text-white islamic-pattern bg-[#07543F] cursor-pointer select-none"
    >
      {/* Top subtle geometric watermark ornament */}
      <div className="pt-8 opacity-40">
        <RubElHizbIcon className="w-12 h-12 text-[#D4A72C]" />
      </div>

      {/* Main Center Logo & Brand Identity */}
      <div className="flex flex-col items-center text-center max-w-xs -mt-10">
        {/* Emblem */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#087F5B] to-[#053d2d] border border-amber-400/30 flex items-center justify-center shadow-2xl">
            <MosqueIcon className="w-13 h-13 text-[#D4A72C]" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-[#D4A72C] flex items-center justify-center text-slate-950 font-bold shadow-md">
            <span className="text-xs">☪</span>
          </div>
        </div>

        {/* Arabic Calligraphy header */}
        <p className="text-sm font-arabic text-amber-200/90 mb-1 tracking-wide">
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </p>

        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
          {MASJID_INFO.name}
        </h1>

        <p className="text-xs text-emerald-100/90 leading-relaxed font-normal px-2">
          {MASJID_INFO.tagline}
        </p>

        {/* Established Trust Tag */}
        <div className="mt-4 text-[11px] text-amber-300 font-medium tracking-wider">
          EST. {MASJID_INFO.establishedYear} · {MASJID_INFO.city}
        </div>
      </div>

      {/* Bottom Loading / Tap to Enter Indicator */}
      <div className="flex flex-col items-center gap-3 pb-6">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#D4A72C] animate-ping"></span>
          <span className="w-2 h-2 rounded-full bg-emerald-300"></span>
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
        </div>
        <p className="text-[12px] text-emerald-100/80 font-medium">
          Tap anywhere to continue
        </p>
      </div>
    </div>
  );
};
