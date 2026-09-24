import React from 'react';
import { useApp } from '../../context/AppContext';
import { PrayerCard } from '../home/PrayerCard';
import { QuickActions } from '../home/QuickActions';
import { AnnouncementBanner } from '../home/AnnouncementBanner';
import { ConnectMuslimPreview } from '../home/ConnectMuslimPreview';
import { UpcomingEventsPreview } from '../home/UpcomingEventsPreview';
import { DailyReminderCard } from '../home/DailyReminderCard';
import { 
  Bell, 
  MapPin, 
  Sparkles, 
  Calendar, 
  ChevronRight, 
  PhoneCall, 
  HeartHandshake,
  Search,
  ShieldAlert
} from 'lucide-react';
import { MosqueIcon, RubElHizbIcon } from '../common/IslamicIcons';
import { MASJID_INFO, MOCK_NOTIFICATIONS } from '../../data/mockData';
import { useTranslation } from '../../utils/translations';

export const HomeScreen: React.FC = () => {
  const { setOverlayScreen, setActiveTab, settings } = useApp();
  const t = useTranslation(settings.language);

  // Today's Date info
  const gregorianDate = 'Wednesday, Sep 23, 2026';
  const hijriDate = '11 Rabi\' al-Awwal 1448 AH';

  return (
    <div className="w-full flex flex-col gap-4 px-4 pt-3 pb-6">
      {/* Top Greeting & Date Block */}
      <div className="flex items-start justify-between">
        <div>
          <span className="text-xs font-semibold text-[#087F5B] flex items-center gap-1">
            <span>✨</span> {t('assalamuAlaikum')},
          </span>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Brother Rayyan
          </h1>
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
            <span className="font-semibold text-slate-700">{hijriDate}</span>
            <span>·</span>
            <span>{gregorianDate}</span>
          </div>
        </div>

        {/* Quick Masjid Location Pin */}
        <button
          onClick={() => setOverlayScreen('about_masjid')}
          className="flex items-center gap-1 py-1 px-2.5 rounded-full bg-emerald-50 border border-emerald-100 text-[11px] font-semibold text-[#087F5B] hover:bg-emerald-100 transition-colors"
        >
          <MapPin className="w-3 h-3 text-[#087F5B]" />
          <span>Al-Noor</span>
        </button>
      </div>

      {/* 1. Main Prayer Time Hero Card */}
      <PrayerCard />

      {/* 2. Quick Actions Grid (8 shortcuts: Qibla, Tasbeeh, Events, Services, Locator, Register, Donate, Duas) */}
      <QuickActions />

      {/* 3. Important Masjid Announcement / Urgent Notice */}
      <AnnouncementBanner />

      {/* 4. Connect Muslim Services Ecosystem Card */}
      <ConnectMuslimPreview />

      {/* 5. Upcoming Events Carousel */}
      <UpcomingEventsPreview />

      {/* 6. Today's Spiritual Reminder (Ayah & Hadith) */}
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
