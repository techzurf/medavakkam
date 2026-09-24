import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveTab } from '../../types';
import { 
  Home, 
  Calendar, 
  Grid, 
  User, 
  Clock
} from 'lucide-react';
import { MosqueIcon } from '../common/IslamicIcons';
import { useTranslation } from '../../utils/translations';

export const MobileBottomNav: React.FC = () => {
  const { activeTab, setActiveTab, setOverlayScreen, settings } = useApp();
  const t = useTranslation(settings.language);

  interface TabConfig {
    id: ActiveTab;
    label: string;
    icon: React.ReactNode;
  }

  const tabs: TabConfig[] = [
    {
      id: 'home',
      label: t('navHome'),
      icon: <Home className="w-5 h-5" />
    },
    {
      id: 'prayers',
      label: t('navPrayers'),
      icon: <Clock className="w-5 h-5" />
    },
    {
      id: 'events',
      label: t('navEvents'),
      icon: <Calendar className="w-5 h-5" />
    },
    {
      id: 'services',
      label: t('navServices'),
      icon: <Grid className="w-5 h-5" />
    },
    {
      id: 'masjid',
      label: 'Masjid',
      icon: <MosqueIcon className="w-5 h-5" />
    }
  ];

  return (
    <nav 
      aria-label="Bottom Navigation"
      className="fixed bottom-0 left-0 right-0 z-40 max-w-[430px] mx-auto bg-white/95 backdrop-blur-lg border-t border-slate-200/80 px-2 py-1 shadow-lg"
    >
      <div className="grid grid-cols-5 items-center h-15">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setOverlayScreen(null);
              }}
              className={`min-h-[48px] flex flex-col items-center justify-center relative transition-all duration-150 ${
                isActive 
                  ? 'text-[#087F5B]' 
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {/* Icon Container with subtle active pill dot */}
              <div className="relative flex items-center justify-center">
                {tab.icon}
                {isActive && (
                  <span className="absolute -bottom-1 w-1 h-1 rounded-full bg-[#D4A72C]"></span>
                )}
              </div>
              
              <span className={`text-[10px] mt-1 tracking-tight truncate max-w-[64px] ${
                isActive ? 'font-bold text-[#087F5B]' : 'font-medium'
              }`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
