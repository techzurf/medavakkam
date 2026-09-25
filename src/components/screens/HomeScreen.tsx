import React from 'react';
import { useApp } from '../../context/AppContext';
import { PrayerCard } from '../home/PrayerCard';
import { RamadanCountdownCard } from '../home/RamadanCountdownCard';
import { QuickActions } from '../home/QuickActions';
import { AnnouncementBanner } from '../home/AnnouncementBanner';
import { ConnectMuslimPreview } from '../home/ConnectMuslimPreview';
import { UpcomingEventsPreview } from '../home/UpcomingEventsPreview';
import { LatestVideosSection } from '../home/LatestVideosSection';
import { DailyReminderCard } from '../home/DailyReminderCard';
import { AnimatedGreeting } from '../home/AnimatedGreeting';
import { GreetingLottie } from '../home/GreetingLottie';
import { 
  Bell, 
  MapPin, 
  Sparkles, 
  Calendar, 
  ChevronRight, 
  PhoneCall, 
  HeartHandshake,
  Search,
  ShieldAlert,
  Moon
} from 'lucide-react';
import { MosqueIcon, RubElHizbIcon, RamadanLanternIcon } from '../common/IslamicIcons';
import { MASJID_INFO, MOCK_NOTIFICATIONS } from '../../data/mockData';
import { useTranslation } from '../../utils/translations';

export const HomeScreen: React.FC = () => {
  const { setOverlayScreen, setActiveTab, settings } = useApp();
  const t = useTranslation(settings.language);

  // Today's Date info
  const gregorianDate = 'Wednesday, Sep 23, 2026';
  const hijriDate = settings.ramadanMode ? '14 Ramadan 1448 AH' : '11 Rabi\' al-Awwal 1448 AH';

  return (
    <div className="w-full flex flex-col gap-4 px-4 pt-3 pb-6">
      {/* Top Greeting & Date Block */}
      <div className="flex items-start justify-between">
        <div className="flex flex-col">
          {/* Zepto-Style Animated Greeting (Smooth vertical transitions) */}
          <AnimatedGreeting />

          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Brother Rayyan
          </h1>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
            {settings.ramadanMode ? (
              <span className="font-bold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded-md border border-amber-300">
                {hijriDate}
              </span>
            ) : (
              <span className="font-semibold text-slate-700">{hijriDate}</span>
            )}
            <span>·</span>
            <span>{gregorianDate}</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
            <MapPin className={`w-3 h-3 ${settings.ramadanMode ? 'text-amber-600' : 'text-[#087F5B]'}`} />
            <span>M.K.B. Nagar, Chennai</span>
          </div>
        </div>

        {/* Right side: Quick Masjid Location Pin + Greeting Lottie Animation directly underneath */}
        <div className="flex flex-col items-end shrink-0">
          <button
            onClick={() => setOverlayScreen('about_masjid')}
            className={`flex items-center gap-1 py-1 px-2.5 rounded-full text-[11px] font-semibold transition-colors shrink-0 mt-0.5 ${
              settings.ramadanMode 
                ? 'bg-amber-100/80 border border-amber-300 text-amber-900 hover:bg-amber-200' 
                : 'bg-[#E8F7F1] border border-emerald-100 text-[#087F5B] hover:bg-emerald-100'
            }`}
          >
            <MapPin className={`w-3 h-3 ${settings.ramadanMode ? 'text-amber-700' : 'text-[#087F5B]'}`} />
            <span>M.K.B. Nagar</span>
          </button>

          {/* Lottie Animation directly underneath location pill, vertically aligned with Brother Rayyan */}
          <div className="flex items-center justify-center pt-1 pr-0.5">
            <GreetingLottie className="w-10 h-10 max-w-[42px] max-h-[42px]" />
          </div>
        </div>
      </div>

      {/* 0. Ramadan Mode Dedicated Countdown Card (Iftar & Suhoor live timers) */}
      {settings.ramadanMode && <RamadanCountdownCard />}

      {/* 1. Main Prayer Time Hero Card */}
      <PrayerCard />

      {/* 2. Quick Actions Grid (8 shortcuts: Qibla, Tasbeeh, Events, Services, Locator, Register, Donate, Duas) */}
      <QuickActions />

      {/* 3. Important Masjid Announcement / Urgent Notice */}
      <AnnouncementBanner />

      {/* 4. Upcoming Events Carousel */}
      <UpcomingEventsPreview />

      {/* 5. Latest Videos Horizontal YouTube Scroller */}
      <LatestVideosSection />

      {/* 6. Connect Muslim Services Ecosystem Card */}
      <ConnectMuslimPreview />

      {/* 7. Today's Spiritual Reminder (Ayah & Hadith) */}
      <DailyReminderCard />

      {/* 7. Community Emergency & Help Assistance Strip */}
      <div className="w-full p-3.5 bg-slate-100 rounded-2xl flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center">
            <PhoneCall className="w-4 h-4 text-emerald-800" />
          </div>
          <div>
            <div className="font-bold text-slate-900">Masjid Helplines</div>
            <div className="text-[11px] text-slate-500">Janazah 24/7 & Imams</div>
          </div>
        </div>

        <button
          onClick={() => setOverlayScreen('about_masjid')}
          className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 hover:text-emerald-800 transition-colors"
        >
          View Contacts
        </button>
      </div>
    </div>
  );
};
