import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Compass, 
  LayoutGrid, 
  MapPin, 
  UserPlus, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { KaabaIcon, TasbeehBeadsIcon, MosqueIcon, RubElHizbIcon } from '../common/IslamicIcons';

export const QuickActions: React.FC = () => {
  const { 
    setOverlayScreen, 
    setActiveTab, 
    startRegistration, 
    triggerHapticFeedback 
  } = useApp();

  const handleRegisterClick = () => {
    triggerHapticFeedback('light');
    startRegistration('New Member');
  };

  const handleQiblaClick = () => {
    triggerHapticFeedback('light');
    setOverlayScreen('qibla');
  };

  const handleTasbeehClick = () => {
    triggerHapticFeedback('light');
    setOverlayScreen('tasbeeh');
  };

  const handleServicesClick = () => {
    triggerHapticFeedback('light');
    setActiveTab('services');
    setOverlayScreen(null);
  };

  const handleLocatorClick = () => {
    triggerHapticFeedback('light');
    setOverlayScreen('locator');
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-2.5 px-0.5">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-3.5 bg-teal-600 rounded-full" />
          <h2 className="text-xs font-extrabold text-slate-800 tracking-wider uppercase">
            Quick Services
          </h2>
        </div>
        <span className="text-[11px] text-slate-400 font-semibold tracking-tight">
          5 Key Services
        </span>
      </div>

      {/* Asymmetric 5-Service Grid inspired by quick-commerce reference */}
      <div className="grid grid-cols-5 gap-2.5 items-stretch">
        
        {/* 1. Large Featured Tile (Left): Masjid Locator */}
        <button
          onClick={handleLocatorClick}
          className="col-span-2 h-full min-h-[200px] rounded-2xl p-3 bg-gradient-to-b from-[#F0FDFA] via-[#F8FCFB] to-white border border-teal-500/25 shadow-[0_4px_16px_rgba(21,154,156,0.08)] flex flex-col justify-between text-left relative overflow-hidden active:scale-[0.98] transition-all group cursor-pointer"
        >
          {/* Subtle Decorative Islamic Geometry Watermark in Background */}
          <div className="absolute -right-6 -top-6 w-28 h-28 pointer-events-none opacity-[0.06] text-teal-800">
            <RubElHizbIcon className="w-full h-full" />
          </div>
          <div className="absolute -left-6 -bottom-6 w-24 h-24 pointer-events-none opacity-[0.04] text-emerald-800">
            <MosqueIcon className="w-full h-full" />
          </div>

          {/* Top Info */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-teal-100/80 border border-teal-200 text-[9px] font-bold text-teal-800 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
              NEARBY
            </div>
            <h3 className="text-sm font-extrabold text-slate-900 tracking-tight leading-snug group-hover:text-teal-700 transition-colors">
              Masjid Locator
            </h3>
            <p className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5 line-clamp-2">
              Find nearby Masjids
            </p>
          </div>

          {/* Center Graphic: Elegant Large Islamic Mosque & Location Illustration */}
          <div className="relative z-10 my-auto py-2 flex items-center justify-center">
            <div className="relative w-20 h-20 flex items-center justify-center">
              {/* Soft ambient radial aura */}
              <div className="absolute inset-0 rounded-full bg-teal-200/35 blur-md transform scale-90" />
              
              {/* Islamic Mosque Vector Art with Glowing Location Ripple */}
              <svg 
                viewBox="0 0 80 80" 
                className="w-full h-full relative z-10 transition-transform duration-300 group-hover:scale-105"
                fill="none"
              >
                {/* Background soft geometric crescent */}
                <circle cx="40" cy="40" r="34" stroke="#159A9C" strokeWidth="1" strokeDasharray="3 4" opacity="0.35" />
                <circle cx="40" cy="40" r="28" fill="#E6FFFA" opacity="0.7" />
                
                {/* Mosque Dome and Minarets */}
                <path 
                  d="M40 18 C33 24 31 33 31 43 L49 43 C49 33 47 24 40 18 Z" 
                  fill="#087F5B" 
                  opacity="0.85" 
                />
                {/* Crescent tip atop dome */}
                <circle cx="40" cy="15" r="2" fill="#D4A72C" />
                <path d="M40 13 L40 17" stroke="#D4A72C" strokeWidth="1.2" strokeLinecap="round" />

                {/* Left Minaret */}
                <rect x="23" y="27" width="5" height="23" rx="1.5" fill="#159A9C" />
                <polygon points="25.5,21 22,27 29,27" fill="#07543F" />
                <circle cx="25.5" cy="20" r="1" fill="#D4A72C" />

                {/* Right Minaret */}
                <rect x="52" y="27" width="5" height="23" rx="1.5" fill="#159A9C" />
                <polygon points="54.5,21 51,27 58,27" fill="#07543F" />
                <circle cx="54.5" cy="20" r="1" fill="#D4A72C" />

                {/* Mosque Arched Doorway */}
                <rect x="20" y="43" width="40" height="9" fill="#087F5B" rx="1" />
                <path d="M37 52 L37 45 C37 43.5 38.5 42.5 40 42.5 C41.5 42.5 43 43.5 43 45 L43 52 Z" fill="#FDFBF7" />

                {/* Foreground Location Pin Glow */}
                <g filter="drop-shadow(0 2px 4px rgba(21, 154, 156, 0.4))">
                  <path 
                    d="M40 48 C36.6 48 34 50.6 34 54 C34 58.5 40 65 40 65 C40 65 46 58.5 46 54 C46 50.6 43.4 48 40 48 Z" 
                    fill="#159A9C" 
                  />
                  <circle cx="40" cy="54" r="2.5" fill="#FFFFFF" />
                </g>
              </svg>
            </div>
          </div>

          {/* Bottom Styled Action Pill (Inspired by the Reference Banner) */}
          <div className="relative z-10 w-full pt-1">
            <div className="w-full py-1.5 px-2.5 rounded-xl bg-gradient-to-r from-teal-700 to-emerald-700 text-white text-[10px] font-bold flex items-center justify-between shadow-xs group-hover:from-teal-800 group-hover:to-emerald-800 transition-all">
              <span>View Map</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </button>

        {/* Right 2x2 Grid: 4 Smaller Tiles */}
        <div className="col-span-3 grid grid-cols-2 gap-2.5">

          {/* 1. Register Tile (Warm Gold Accent) */}
          <button
            onClick={handleRegisterClick}
            className="rounded-2xl p-2.5 bg-gradient-to-b from-[#FFFDF7] via-white to-[#FEFDF9] border border-amber-200/90 shadow-[0_2px_10px_rgba(212,167,44,0.06)] flex flex-col justify-between items-center text-center relative overflow-hidden active:scale-95 transition-all group cursor-pointer"
          >
            {/* Subtle decorative watermark */}
            <div className="absolute -right-3 -bottom-3 w-14 h-14 pointer-events-none opacity-[0.05] text-amber-700">
              <RubElHizbIcon className="w-full h-full" />
            </div>

            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/70 flex items-center justify-center text-[#D4A72C] group-hover:scale-108 group-hover:bg-amber-100/60 transition-all mt-0.5">
              <UserPlus className="w-5 h-5 text-[#D4A72C]" />
            </div>

            {/* Label */}
            <div className="my-1">
              <span className="text-xs font-bold text-slate-900 block leading-tight tracking-tight">
                Register
              </span>
            </div>

            {/* Bottom Accent Badge */}
            <span className="text-[9px] font-bold text-amber-900 bg-amber-100/80 border border-amber-200/80 px-2 py-0.5 rounded-full block w-full truncate">
              Join Us
            </span>
          </button>

          {/* 2. Qibla Tile (Deep Navy & Sky Blue Accent) */}
          <button
            onClick={handleQiblaClick}
            className="rounded-2xl p-2.5 bg-gradient-to-b from-[#F8FAFF] via-white to-[#F6F9FF] border border-sky-200/90 shadow-[0_2px_10px_rgba(59,111,216,0.06)] flex flex-col justify-between items-center text-center relative overflow-hidden active:scale-95 transition-all group cursor-pointer"
          >
            {/* Subtle decorative watermark */}
            <div className="absolute -right-3 -top-3 w-14 h-14 pointer-events-none opacity-[0.05] text-sky-700">
              <Compass className="w-full h-full" />
            </div>

            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200/70 flex items-center justify-center text-[#3B6FD8] group-hover:scale-108 group-hover:bg-sky-100/60 transition-all mt-0.5">
              <Compass className="w-5 h-5 text-[#3B6FD8]" />
            </div>

            {/* Label */}
            <div className="my-1">
              <span className="text-xs font-bold text-slate-900 block leading-tight tracking-tight">
                Qibla
              </span>
            </div>

            {/* Bottom Accent Badge */}
            <span className="text-[9px] font-bold text-sky-900 bg-sky-100/80 border border-sky-200/80 px-2 py-0.5 rounded-full block w-full truncate">
              Compass
            </span>
          </button>

          {/* 3. Tasbeeh Tile (Purple & Amethyst Accent) */}
          <button
            onClick={handleTasbeehClick}
            className="rounded-2xl p-2.5 bg-gradient-to-b from-[#FAF8FF] via-white to-[#F8F6FF] border border-purple-200/90 shadow-[0_2px_10px_rgba(118,87,200,0.06)] flex flex-col justify-between items-center text-center relative overflow-hidden active:scale-95 transition-all group cursor-pointer"
          >
            {/* Subtle decorative watermark */}
            <div className="absolute -left-3 -bottom-3 w-14 h-14 pointer-events-none opacity-[0.05] text-purple-700">
              <TasbeehBeadsIcon className="w-full h-full" />
            </div>

            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200/70 flex items-center justify-center text-[#7657C8] group-hover:scale-108 group-hover:bg-purple-100/60 transition-all mt-0.5">
              <TasbeehBeadsIcon className="w-5 h-5 text-[#7657C8]" />
            </div>

            {/* Label */}
            <div className="my-1">
              <span className="text-xs font-bold text-slate-900 block leading-tight tracking-tight">
                Tasbeeh
              </span>
            </div>

            {/* Bottom Accent Badge */}
            <span className="text-[9px] font-bold text-purple-900 bg-purple-100/80 border border-purple-200/80 px-2 py-0.5 rounded-full block w-full truncate">
              Dhikr
            </span>
          </button>

          {/* 4. Services Tile (Emerald Green & Mint Accent) */}
          <button
            onClick={handleServicesClick}
            className="rounded-2xl p-2.5 bg-gradient-to-b from-[#F0FDF4] via-white to-[#F2FBF6] border border-emerald-200/90 shadow-[0_2px_10px_rgba(8,127,91,0.06)] flex flex-col justify-between items-center text-center relative overflow-hidden active:scale-95 transition-all group cursor-pointer"
          >
            {/* Subtle decorative watermark */}
            <div className="absolute -right-3 -top-3 w-14 h-14 pointer-events-none opacity-[0.05] text-emerald-700">
              <LayoutGrid className="w-full h-full" />
            </div>

            {/* Icon */}
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/70 flex items-center justify-center text-[#087F5B] group-hover:scale-108 group-hover:bg-emerald-100/60 transition-all mt-0.5">
              <LayoutGrid className="w-5 h-5 text-[#087F5B]" />
            </div>

            {/* Label */}
            <div className="my-1">
              <span className="text-xs font-bold text-slate-900 block leading-tight tracking-tight">
                Services
              </span>
            </div>

            {/* Bottom Accent Badge */}
            <span className="text-[9px] font-bold text-emerald-900 bg-emerald-100/80 border border-emerald-200/80 px-2 py-0.5 rounded-full block w-full truncate">
              All 8+
            </span>
          </button>

        </div>

      </div>
    </div>
  );
};
