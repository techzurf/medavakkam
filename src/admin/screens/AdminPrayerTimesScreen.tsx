import React, { useState } from 'react';
import { Clock, Check, Edit2, X, Save, AlertCircle, Sparkles } from 'lucide-react';
import { AdminPrayerItem } from '../mockAdminData';

interface AdminPrayerTimesScreenProps {
  prayers: AdminPrayerItem[];
  onSavePrayers: (updated: AdminPrayerItem[]) => void;
  onShowToast: (msg: string) => void;
}

export const AdminPrayerTimesScreen: React.FC<AdminPrayerTimesScreenProps> = ({
  prayers,
  onSavePrayers,
  onShowToast
}) => {
  const [list, setList] = useState<AdminPrayerItem[]>(prayers);
  const [editingPrayer, setEditingPrayer] = useState<AdminPrayerItem | null>(null);

  const handleToggle = (id: string) => {
    setList(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  const handleEditClick = (p: AdminPrayerItem) => {
    setEditingPrayer({ ...p });
  };

  const handleModalSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPrayer) return;
    setList(prev => prev.map(p => p.id === editingPrayer.id ? editingPrayer : p));
    setEditingPrayer(null);
    onShowToast(`Updated times for ${editingPrayer.name}`);
  };

  const handleGlobalSave = () => {
    onSavePrayers(list);
    onShowToast('Prayer times saved and published to Masjid App successfully!');
  };

  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F5B]">
            Daily Schedule Management
          </span>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Prayer Times Management
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Configure Adhan and Jama'ah prayer times displayed to worshippers in the Masjid App.
          </p>
        </div>

        <button
          type="button"
          onClick={handleGlobalSave}
          className="h-11 px-5 rounded-2xl bg-[#087F5B] hover:bg-[#066347] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all cursor-pointer self-start sm:self-auto shrink-0"
        >
          <Save className="w-4 h-4" />
          <span>Save Prayer Times</span>
        </button>
      </div>

      {/* Prayer Table / List */}
      <div className="bg-white rounded-3xl p-3 sm:p-5 border border-slate-200/90 shadow-2xs divide-y divide-slate-100">
        {list.map((prayer) => (
          <div 
            key={prayer.id}
            className="py-3 sm:py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 rounded-2xl px-2 transition-colors"
          >
            {/* Prayer Name & Status */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                prayer.enabled ? 'bg-emerald-50 text-[#087F5B]' : 'bg-slate-100 text-slate-400'
              }`}>
                <Clock className="w-5 h-5" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-slate-900">
                    {prayer.name}
                  </h3>
                  <span className="text-xs font-serif text-slate-400 font-medium">
                    {prayer.arabicName}
                  </span>
                  {!prayer.enabled && (
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-600">
                      Disabled
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  {prayer.id === 'sunrise' ? 'Astronomical Sunrise' : 'Daily Congregational Salah'}
                </div>
              </div>
            </div>

            {/* Timings & Edit Controls */}
            <div className="flex items-center justify-between sm:justify-end gap-3 sm:gap-6 pl-13 sm:pl-0">
              <div className="flex items-center gap-4 text-xs">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 block uppercase">
                    Adhan / Call
                  </span>
                  <span className="font-extrabold font-mono text-slate-900 text-sm">
                    {prayer.adhanTime}
                  </span>
                </div>

                {prayer.id !== 'sunrise' && (
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 block uppercase">
                      Jama'ah Time
                    </span>
                    <span className="font-extrabold font-mono text-[#087F5B] text-sm">
                      {prayer.jamaahTime}
                    </span>
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                {/* Toggle Enable/Disable */}
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prayer.enabled}
                    onChange={() => handleToggle(prayer.id)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#087F5B]"></div>
                </label>

                {/* Edit Button */}
                <button
                  type="button"
                  onClick={() => handleEditClick(prayer)}
                  className="h-8 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 transition-colors"
                >
                  <Edit2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Prayer Modal Sheet */}
      {editingPrayer && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Edit {editingPrayer.name} Timings
                </h3>
                <span className="text-[11px] text-slate-500">
                  Adjust Adhan and congregational Jama'ah start times
                </span>
              </div>
              <button
                type="button"
                onClick={() => setEditingPrayer(null)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleModalSave} className="flex flex-col gap-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Adhan / Call Time
                </label>
                <input
                  type="text"
                  required
                  value={editingPrayer.adhanTime}
                  onChange={(e) => setEditingPrayer({ ...editingPrayer, adhanTime: e.target.value })}
                  placeholder="e.g. 05:12 AM"
                  className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-hidden focus:border-[#087F5B]"
                />
              </div>

              {editingPrayer.id !== 'sunrise' && (
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    Jama'ah Congregation Time
                  </label>
                  <input
                    type="text"
                    required
                    value={editingPrayer.jamaahTime}
                    onChange={(e) => setEditingPrayer({ ...editingPrayer, jamaahTime: e.target.value })}
                    placeholder="e.g. 05:35 AM"
                    className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-hidden focus:border-[#087F5B]"
                  />
                </div>
              )}

              <label className="flex items-center gap-2 text-xs text-slate-700 font-medium pt-1">
                <input
                  type="checkbox"
                  checked={editingPrayer.enabled}
                  onChange={(e) => setEditingPrayer({ ...editingPrayer, enabled: e.target.checked })}
                  className="w-4 h-4 rounded-sm text-[#087F5B] accent-[#087F5B]"
                />
                <span>Enable prayer alert & display on app</span>
              </label>

              <div className="grid grid-cols-2 gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setEditingPrayer(null)}
                  className="py-2.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 rounded-xl bg-[#087F5B] text-white text-xs font-bold shadow-sm"
                >
                  Update Times
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
