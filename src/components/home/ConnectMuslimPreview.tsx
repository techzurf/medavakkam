import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  Store, 
  Heart, 
  GraduationCap, 
  ChevronRight, 
  Sparkles,
  ExternalLink,
  Users
} from 'lucide-react';
import { CONNECT_MUSLIM_ITEMS } from '../../data/mockData';
import { useTranslation } from '../../utils/translations';

export const ConnectMuslimPreview: React.FC = () => {
  const { setOverlayScreen, settings } = useApp();
  const t = useTranslation(settings.language);

  const previewItems = CONNECT_MUSLIM_ITEMS.slice(0, 4);

  return (
    <div className="w-full bg-gradient-to-br from-[#07543F] to-[#043326] rounded-3xl p-4 text-white relative overflow-hidden shadow-sm">
      {/* Background star pattern */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-[#D4A72C]/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="flex items-start justify-between mb-3 relative z-10">
        <div>
          <div className="flex items-center gap-1.5 mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-[#D4A72C]" />
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest">
              Community Ecosystem
            </span>
          </div>
          <h3 className="text-base font-bold text-white tracking-tight">
            Connect Muslim Services
          </h3>
          <p className="text-xs text-emerald-100/80 mt-0.5 max-w-xs">
            A wider ethical network connecting jobs, halal trade, matrimony & care.
          </p>
        </div>

        <button
          onClick={() => setOverlayScreen('connect_muslim')}
          className="text-xs font-bold text-amber-300 hover:text-white flex items-center gap-0.5 min-h-[44px] -mr-1"
        >
          <span>Explore All</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Grid of 4 ecosystem cards */}
      <div className="grid grid-cols-2 gap-2 relative z-10">
        {previewItems.map(item => (
          <div
            key={item.id}
            onClick={() => setOverlayScreen('connect_muslim')}
            className="p-3 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 backdrop-blur-xs cursor-pointer active:scale-98 transition-all"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-amber-200">
                {item.tag}
              </span>
              <span className="text-[10px] text-emerald-200 font-mono">
                {item.stats.split(' ')[0]}
              </span>
            </div>
            <h4 className="text-xs font-bold text-white leading-tight">
              {item.title}
            </h4>
            <p className="text-[10px] text-emerald-100/70 truncate mt-0.5">
              {item.subtitle}
            </p>
          </div>
        ))}
      </div>

      {/* Trust Guarantee Note */}
      <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px] text-emerald-100/80">
        <span>Verified by Al-Noor Masjid Board</span>
        <span className="text-amber-300 font-semibold">100% Non-Profit</span>
      </div>
    </div>
  );
};
