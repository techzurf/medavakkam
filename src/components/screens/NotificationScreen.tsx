import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Bell, 
  CheckCheck, 
  AlertCircle, 
  Calendar, 
  Clock, 
  HeartHandshake, 
  Info,
  ChevronRight
} from 'lucide-react';
import { NotificationItem } from '../../types';

export const NotificationScreen: React.FC = () => {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    unreadNotifCount, 
    settings, 
    setOverlayScreen,
    triggerTestPrayerAlert
  } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Important Notices',
    'Prayer Alerts',
    'Masjid Announcements',
    'Events',
    'Community Services'
  ];

  const filtered = notifications.filter(n => {
    return activeCategory === 'All' || n.category === activeCategory;
  });

  const getCategoryIcon = (category: string, urgent?: boolean) => {
    if (urgent) return <AlertCircle className="w-4 h-4 text-amber-700" />;
    switch (category) {
      case 'Prayer Alerts': return <Clock className="w-4 h-4 text-[#087F5B]" />;
      case 'Events': return <Calendar className="w-4 h-4 text-teal-700" />;
      case 'Community Services': return <HeartHandshake className="w-4 h-4 text-rose-700" />;
      default: return <Bell className="w-4 h-4 text-slate-700" />;
    }
  };

  return (
    <div className="w-full flex flex-col gap-4 px-4 pt-3 pb-8">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#087F5B]">
            Inbox & Alerts
          </span>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Masjid Notifications
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            {unreadNotifCount} unread announcements
          </p>
        </div>

        {unreadNotifCount > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5 text-[#087F5B]" />
            <span>Mark All Read</span>
          </button>
        )}
      </div>

      {/* Prayer Audio Reminder Status Banner */}
      <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#087F5B] shrink-0" />
          <div>
            <span className="font-bold text-emerald-950 block text-[11px]">
              Prayer Tone: {settings.athanSound} ({settings.reminderMinutesBefore === 0 ? 'At Adhan' : `${settings.reminderMinutesBefore}m before`})
            </span>
            <span className="text-[10px] text-emerald-700">
              Audio notifications active for configured prayers
            </span>
          </div>
        </div>
        <button
          onClick={() => setOverlayScreen('settings')}
          className="px-2.5 py-1 rounded-xl bg-[#087F5B] text-white text-[10px] font-bold shrink-0 hover:bg-[#07543F] transition-colors"
        >
          Sound Settings
        </button>
      </div>

      {/* Categories Filter Horizontal Scroller */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
        {categories.map(cat => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`min-h-[36px] px-3.5 py-1 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                isActive 
                  ? 'bg-[#087F5B] text-white shadow-2xs' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/60'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Notifications List */}
      <div className="flex flex-col gap-2.5">
        {filtered.length === 0 ? (
          <div className="py-12 text-center bg-white rounded-3xl p-6 border border-slate-200/80">
            <Bell className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-slate-700">No notifications here</h3>
            <p className="text-xs text-slate-400 mt-1">You are all caught up!</p>
          </div>
        ) : (
          filtered.map(item => (
            <div
              key={item.id}
              onClick={() => markAsRead(item.id)}
              className={`w-full p-4 rounded-3xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                !item.isRead 
                  ? 'bg-white border-[#087F5B]/30 shadow-xs' 
                  : 'bg-slate-50/70 border-slate-200/60 opacity-90'
              }`}
            >
              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 mt-0.5 ${
                item.urgent ? 'bg-amber-100' : 'bg-emerald-50'
              }`}>
                {getCategoryIcon(item.category, item.urgent)}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    item.urgent ? 'text-amber-800' : 'text-slate-500'
                  }`}>
                    {item.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">
                    {item.timeAgo}
                  </span>
                </div>

                <h3 className={`text-xs font-bold leading-snug mb-1 ${
                  !item.isRead ? 'text-slate-900 font-extrabold' : 'text-slate-800'
                }`}>
                  {item.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.message}
                </p>

                {!item.isRead && (
                  <div className="mt-2 flex items-center gap-1 text-[11px] font-bold text-[#087F5B]">
                    <span>Tap to mark read</span>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
