import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  ChevronLeft, 
  User, 
  Share2, 
  X,
  Compass,
  Heart,
  SlidersHorizontal,
  Info
} from 'lucide-react';
import { MosqueIcon, RubElHizbIcon } from '../common/IslamicIcons';
import { MASJID_INFO } from '../../data/mockData';
import { useTranslation } from '../../utils/translations';

interface MobileTopBarProps {
  title?: string;
  onBack?: () => void;
  showBack?: boolean;
  rightAction?: React.ReactNode;
}

export const MobileTopBar: React.FC<MobileTopBarProps> = ({
  title,
  onBack,
  showBack = false,
  rightAction
}) => {
  const { 
    activeTab, 
    setActiveTab, 
    overlayScreen, 
    setOverlayScreen, 
    unreadNotifCount, 
    settings,
    toggleSeniorMode
  } = useApp();

  const t = useTranslation(settings.language);

  // If inside an overlay screen, render the sub-navigation header
  if (overlayScreen && overlayScreen !== 'splash' && overlayScreen !== 'onboarding') {
    const getScreenTitle = () => {
      switch (overlayScreen) {
        case 'qibla': return 'Qibla Compass';
        case 'tasbeeh': return 'Digital Tasbeeh';
        case 'locator': return 'Masjid Locator';
        case 'connect_muslim': return 'Connect Muslim Services';
        case 'notifications': return 'Notifications';
        case 'donation': return 'Masjid Donation';
        case 'registration': return 'Masjid Registration';
        case 'quran': return 'Quran & Reminders';
        case 'duas': return 'Daily Supplications';
        case 'settings': return 'App Settings';
        case 'about_masjid': return 'About Al-Noor Masjid';
        case 'lost_found': return 'Lost & Found';
        case 'event_detail': return 'Event Details';
        case 'service_detail': return 'Service Details';
        case 'monthly_timetable': return 'Monthly Prayer Timetable';
        default: return title || 'Al-Noor Masjid';
      }
    };

    return (
      <header className="sticky top-0 z-30 w-full h-14 bg-white/95 backdrop-blur-md border-b border-slate-100 px-3 flex items-center justify-between shadow-xs">
        <button
          onClick={() => {
            if (onBack) {
              onBack();
            } else {
              setOverlayScreen(null);
            }
          }}
          className="min-w-[44px] min-h-[44px] flex items-center justify-center -ml-1 text-slate-700 hover:text-emerald-800 active:scale-95 transition-transform"
          aria-label="Go Back"
        >
          <ChevronLeft className="w-6 h-6 stroke-[2.2]" />
        </button>

        <h1 className="text-base font-bold text-slate-900 tracking-tight truncate max-w-[240px]">
          {title || getScreenTitle()}
        </h1>

        <div className="flex items-center gap-1">
          {rightAction ? (
            rightAction
          ) : (
            <button
              onClick={() => setOverlayScreen(null)}
              className="min-w-[44px] min-h-[44px] flex items-center justify-center text-slate-500 hover:text-slate-800"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </header>
    );
  }

  // Standard Main Screen Header (Home, Prayers, Events, Services, Masjid, Profile)
  return (
    <header className="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-100 px-4 py-2.5 flex items-center justify-between shadow-xs">
      {/* Zone 1: Masjid Brand & Location */}
      <div 
        onClick={() => setOverlayScreen('about_masjid')}
        className="flex items-center gap-2.5 cursor-pointer active:opacity-85 transition-opacity"
      >
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#087F5B] to-[#07543F] flex items-center justify-center text-white shadow-xs">
          <MosqueIcon className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-[15px] font-bold text-[#17221D] tracking-tight leading-tight">
              {MASJID_INFO.shortName}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#087F5B]"></span>
          </div>
          <span className="text-[11px] font-medium text-slate-500 truncate max-w-[170px]">
            {MASJID_INFO.city}
          </span>
        </div>
      </div>

      {/* Zone 3: Actions (Senior Text Toggle, Notifications, Profile) */}
      <div className="flex items-center gap-1">
        {/* Quick Accessibility Toggle */}
        <button
          onClick={toggleSeniorMode}
          className={`min-w-[36px] h-8 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
            settings.seniorMode 
              ? 'bg-[#D4A72C] text-slate-900 shadow-xs' 
              : 'text-slate-600 hover:bg-slate-100'
          }`}
          title="Toggle Large Text for Elderly"
        >
          Aa
        </button>

        {/* Notifications Icon with Badge */}
        <button
          onClick={() => setOverlayScreen('notifications')}
          className="relative min-w-[40px] min-h-[40px] flex items-center justify-center text-slate-700 hover:text-emerald-800 transition-colors"
          aria-label="Masjid Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadNotifCount > 0 && (
            <span className="absolute top-2 right-2 min-w-[17px] h-[17px] px-1 bg-[#D64545] text-white text-[10px] font-bold rounded-full flex items-center justify-center leading-none shadow-xs">
              {unreadNotifCount}
            </span>
          )}
        </button>

        {/* Profile Avatar / Trigger */}
        <button
          onClick={() => setActiveTab('profile')}
          className="min-w-[40px] min-h-[40px] flex items-center justify-center -mr-1"
          aria-label="User Profile"
        >
          <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-center text-xs font-bold">
            AR
          </div>
        </button>
      </div>
    </header>
  );
};
