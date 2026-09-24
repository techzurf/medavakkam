import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Compass, 
  MapPin, 
  RotateCw, 
  Sparkles, 
  CheckCircle2, 
  ChevronDown, 
  Info,
  ShieldCheck 
} from 'lucide-react';
import { KaabaIcon, RubElHizbIcon } from '../common/IslamicIcons';

export const QiblaScreen: React.FC = () => {
  // Mock current compass heading (simulated rotation)
  const [currentHeading, setCurrentHeading] = useState(285);
  const qiblaAngle = 294; // Qibla angle from San Francisco Bay Area towards Makkah (North-West)
  const [selectedCity, setSelectedCity] = useState('San Francisco Bay Area');
  const [isCalibrated, setIsCalibrated] = useState(true);

  const angleDiff = Math.abs(currentHeading - qiblaAngle);
  const isFacingQibla = angleDiff <= 3; // within 3 degrees accuracy

  const cities = [
    { name: 'San Francisco Bay Area', angle: 294, dist: '8,095 miles' },
    { name: 'New York / New Jersey', angle: 58, dist: '6,380 miles' },
    { name: 'London, United Kingdom', angle: 119, dist: '2,980 miles' },
    { name: 'Toronto, Canada', angle: 55, dist: '6,470 miles' },
    { name: 'Sydney, Australia', angle: 277, dist: '8,190 miles' },
    { name: 'Kuala Lumpur, Malaysia', angle: 292, dist: '4,380 miles' },
    { name: 'Chennai / Madurai, India', angle: 293, dist: '2,680 miles' }
  ];

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    const found = cities.find(c => c.name === cityName);
    if (found) {
      setCurrentHeading(found.angle - 5); // position slightly off so user can rotate
    }
  };

  const handleAlign = () => {
    const found = cities.find(c => c.name === selectedCity);
    setCurrentHeading(found ? found.angle : 294);
  };

  return (
    <div className="w-full min-h-[82vh] flex flex-col items-center justify-between px-4 pt-2 pb-8 text-center select-none">
      {/* Top Location Selector */}
      <div className="w-full flex flex-col items-center">
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-2xs text-xs font-semibold text-slate-700">
          <MapPin className="w-3.5 h-3.5 text-[#087F5B]" />
          <select
            value={selectedCity}
            onChange={(e) => handleCityChange(e.target.value)}
            className="bg-transparent text-slate-800 text-xs font-bold focus:outline-hidden cursor-pointer"
          >
            {cities.map(c => (
              <option key={c.name} value={c.name}>
                {c.name} ({c.angle}°)
              </option>
            ))}
          </select>
        </div>

        {/* Qibla Alignment Status Banner */}
        <div className="mt-3">
          {isFacingQibla ? (
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-100 text-[#087F5B] text-xs font-bold border border-emerald-300 animate-pulse">
              <CheckCircle2 className="w-4 h-4" />
              <span>You're facing the Kaaba!</span>
            </div>
          ) : (
            <span className="text-xs font-medium text-slate-500">
              Rotate your phone until the needle points straight up
            </span>
          )}
        </div>
      </div>

      {/* Main Circular Compass Dial */}
      <div className="relative my-4 flex items-center justify-center">
        {/* Outer Halo with Glow when Aligned */}
        <div className={`w-72 h-72 rounded-full transition-all duration-500 flex items-center justify-center p-3 relative ${
          isFacingQibla 
            ? 'bg-emerald-500/10 shadow-[0_0_50px_rgba(8,127,91,0.25)] border-2 border-[#087F5B]' 
            : 'bg-white shadow-lg border border-slate-200'
        }`}>
          {/* Compass Degree Tick Marks */}
          <div className="absolute inset-2 rounded-full border border-dashed border-slate-200"></div>

          {/* Cardinal Directions */}
          <span className="absolute top-4 text-xs font-bold text-slate-700">N</span>
          <span className="absolute right-4 text-xs font-bold text-slate-400">E</span>
          <span className="absolute bottom-4 text-xs font-bold text-slate-400">S</span>
          <span className="absolute left-4 text-xs font-bold text-slate-400">W</span>

          {/* Center Degree & Kaaba indicator */}
          <div 
            className="w-56 h-56 rounded-full flex flex-col items-center justify-center transition-transform duration-300 ease-out"
            style={{ transform: `rotate(${qiblaAngle - currentHeading}deg)` }}
          >
            {/* Kaaba Target Icon at the top of the rotating dial */}
            <div className="absolute top-1 flex flex-col items-center">
              <div className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${
                isFacingQibla ? 'bg-[#D4A72C] text-slate-950 scale-110 shadow-md' : 'bg-slate-900 text-[#D4A72C]'
              }`}>
                <KaabaIcon className="w-6 h-6" />
              </div>
              <div className="w-1.5 h-6 bg-[#087F5B] rounded-full mt-1"></div>
            </div>

            {/* Center Hub */}
            <div className="w-20 h-20 rounded-full bg-slate-50 border border-slate-200 flex flex-col items-center justify-center shadow-inner mt-4">
              <span className="text-xl font-extrabold text-slate-900 font-mono tracking-tight tabular-nums">
                {currentHeading}°
              </span>
              <span className="text-[10px] font-bold text-[#087F5B] uppercase">
                {qiblaAngle}° Qibla
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Manual Compass Heading slider for interactive testing */}
      <div className="w-full max-w-xs px-4">
        <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
          <span>Simulate Phone Rotation:</span>
          <button 
            onClick={handleAlign}
            className="text-xs font-bold text-[#087F5B] hover:underline"
          >
            Snap to Qibla
          </button>
        </div>
        <input
          type="range"
          min="0"
          max="360"
          value={currentHeading}
          onChange={(e) => setCurrentHeading(Number(e.target.value))}
          className="w-full accent-[#087F5B] cursor-pointer"
        />
      </div>

      {/* Calibration Guidance Card */}
      <div className="w-full max-w-xs bg-slate-50 rounded-2xl p-3 border border-slate-200/80 text-left flex items-start gap-2.5 mt-2">
        <div className="w-7 h-7 rounded-lg bg-emerald-100/70 text-[#087F5B] flex items-center justify-center shrink-0 mt-0.5">
          <RotateCw className="w-4 h-4" />
        </div>
        <div className="text-[11px] text-slate-600 leading-relaxed">
          <strong className="text-slate-800 block">Sensor Calibration:</strong>
          Keep your phone away from magnetic cases or metal tables. Move device in a smooth figure-8 motion for optimal precision.
        </div>
      </div>
    </div>
  );
};
