import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Compass, 
  Calendar, 
  Grid, 
  MapPin, 
  UserPlus, 
  Heart, 
  BookOpen, 
  Volume2
} from 'lucide-react';
import { KaabaIcon, TasbeehBeadsIcon, MosqueIcon } from '../common/IslamicIcons';
import { useTranslation } from '../../utils/translations';

export const QuickActions: React.FC = () => {
  const { 
    setOverlayScreen, 
    setActiveTab, 
    startRegistration, 
    settings 
  } = useApp();

  const t = useTranslation(settings.language);

  const actions = [
    {
      id: 'qibla',
      label: t('qibla'),
      icon: <Compass className="w-5 h-5 text-[#087F5B]" />,
      bg: 'bg-emerald-50/80 border-emerald-100',
      onClick: () => setOverlayScreen('qibla')
    },
    {
      id: 'tasbeeh',
      label: t('tasbeeh'),
      icon: <TasbeehBeadsIcon className="w-5 h-5 text-[#D4A72C]" />,
      bg: 'bg-amber-50/80 border-amber-100',
      onClick: () => setOverlayScreen('tasbeeh')
    },
    {
      id: 'events',
      label: t('events'),
      icon: <Calendar className="w-5 h-5 text-teal-700" />,
      bg: 'bg-teal-50/80 border-teal-100',
      onClick: () => setActiveTab('events')
    },
    {
      id: 'services',
      label: t('services'),
      icon: <Grid className="w-5 h-5 text-emerald-800" />,
      bg: 'bg-emerald-50/80 border-emerald-100',
      onClick: () => setActiveTab('services')
    },
    {
      id: 'locator',
      label: t('masjidLocator'),
      icon: <MapPin className="w-5 h-5 text-emerald-700" />,
      bg: 'bg-slate-50 border-slate-200/80',
      onClick: () => setOverlayScreen('locator')
    },
    {
      id: 'register',
      label: t('register'),
      icon: <UserPlus className="w-5 h-5 text-amber-700" />,
      bg: 'bg-amber-50/80 border-amber-100',
      onClick: () => startRegistration('New Member')
    },
    {
      id: 'donation',
      label: t('donation'),
      icon: <Heart className="w-5 h-5 text-rose-700" />,
      bg: 'bg-rose-50/70 border-rose-100',
      onClick: () => setOverlayScreen('donation')
    },
    {
      id: 'duas',
      label: t('dailyDua'),
      icon: <BookOpen className="w-5 h-5 text-teal-800" />,
      bg: 'bg-teal-50/80 border-teal-100',
      onClick: () => setOverlayScreen('duas')
    }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2.5 px-1">
        <h2 className="text-xs font-bold text-slate-800 tracking-wider uppercase">
          {t('quickActions')}
        </h2>
        <span className="text-[11px] text-slate-400 font-medium">8 Shortcuts</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {actions.map(action => (
          <button
            key={action.id}
            onClick={action.onClick}
            className={`min-h-[76px] p-2 rounded-2xl ${action.bg} border flex flex-col items-center justify-center text-center active:scale-95 transition-all shadow-2xs group`}
          >
            <div className="mb-1.5 transition-transform group-hover:scale-110">
              {action.icon}
            </div>
            <span className="text-[11px] font-bold text-slate-800 leading-tight tracking-tight line-clamp-1">
              {action.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
