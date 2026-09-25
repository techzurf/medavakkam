import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft, 
  ShieldCheck, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar,
  Sparkles,
  QrCode
} from 'lucide-react';
import { useTranslation } from '../../utils/translations';

export const RegistrationScreen: React.FC = () => {
  const { 
    activeRegistrationType, 
    setActiveRegistrationType, 
    setOverlayScreen, 
    addRegistration,
    settings 
  } = useApp();

  const t = useTranslation(settings.language);

  // Form State
  const [fullName, setFullName] = useState('Rayyan Mansoor');
  const [mobile, setMobile] = useState('+1 (555) 392-8172');
  const [email, setEmail] = useState('rayyan.m@example.com');
  const [gender, setGender] = useState<'Brother' | 'Sister'>('Brother');
  const [dob, setDob] = useState('1994-06-15');
  const [address, setAddress] = useState('742 Evergreen Terrace, Green Valley, CA');
  const [volunteerInterest, setVolunteerInterest] = useState('Jummah Logistics & Parking');
  const [additionalNotes, setAdditionalNotes] = useState('');
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedRefId, setSubmittedRefId] = useState('');

  const registrationTypes: Array<'New Member' | 'Volunteer' | 'Event' | 'Service'> = [
    'New Member',
    'Volunteer',
    'Event',
    'Service'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refCode = `ALN-${Math.floor(1000 + Math.random() * 9000)}`;
    setSubmittedRefId(refCode);

    addRegistration({
      type: activeRegistrationType,
      title: activeRegistrationType === 'New Member' 
        ? `Membership Card #${refCode}` 
        : `${activeRegistrationType} Registration (${refCode})`,
      status: activeRegistrationType === 'Volunteer' ? 'Active' : 'Confirmed'
    });

    setIsSubmitted(true);
  };

  // Success Confirmation View
  if (isSubmitted) {
    return (
      <div className="w-full min-h-[80vh] flex flex-col justify-between p-6 bg-[#F7F9F7] animate-in fade-in">
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          {/* Animated Success Badge */}
          <div className="w-20 h-20 rounded-full bg-emerald-100 border-4 border-emerald-200 text-[#087F5B] flex items-center justify-center mb-5 shadow-lg shadow-emerald-900/10">
            <CheckCircle2 className="w-10 h-10 stroke-[2.2]" />
          </div>

          <span className="text-xs font-bold text-[#D4A72C] uppercase tracking-widest mb-1">
            Alhamdulillah
          </span>

          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
            Registration Confirmed!
          </h2>

          <p className="text-xs text-slate-600 max-w-xs mb-6 leading-relaxed">
            Your application for <strong>{activeRegistrationType}</strong> has been successfully submitted and recorded with Madina Masjid MKB Nagar administration.
          </p>

          {/* Reference Card with QR Mockup */}
          <div className="w-full max-w-xs bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
              <span className="text-slate-500">Reference Number</span>
              <span className="font-mono font-bold text-[#087F5B]">{submittedRefId}</span>
            </div>

            <div className="py-3 space-y-1.5 text-xs text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Applicant:</span>
                <span className="font-bold">{fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Registered Type:</span>
                <span className="font-semibold">{activeRegistrationType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status:</span>
                <span className="text-emerald-700 font-bold">Active & Verified</span>
              </div>
            </div>

            <div className="mt-2 pt-3 border-t border-slate-100 flex items-center justify-center gap-2 text-slate-500 text-[11px]">
              <ShieldCheck className="w-4 h-4 text-[#087F5B]" />
              <span>Official Masjid Record</span>
            </div>
          </div>
        </div>

        {/* Bottom Done Button */}
        <div className="pt-6">
          <button
            onClick={() => setOverlayScreen(null)}
            className="w-full h-13 rounded-2xl bg-gradient-to-r from-[#087F5B] to-[#07543F] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/15"
          >
            <span>Return to Masjid Dashboard</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // Registration Input Form View
  return (
    <div className="w-full flex flex-col gap-4 px-4 pt-3 pb-8">
      <div>
        <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4A72C]">
          Community Gateway
        </span>
        <h1 className="text-xl font-bold text-slate-900 tracking-tight">
          Masjid Registration
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Join our membership, sign up as a volunteer, or register for upcoming activities.
        </p>
      </div>

      {/* Segmented Type Switcher */}
      <div className="grid grid-cols-4 gap-1 p-1 bg-slate-200/70 rounded-2xl">
        {registrationTypes.map(type => {
          const isActive = activeRegistrationType === type;
          return (
            <button
              key={type}
              type="button"
              onClick={() => setActiveRegistrationType(type)}
              className={`py-2 text-[11px] font-bold rounded-xl transition-all ${
                isActive 
                  ? 'bg-white text-slate-900 shadow-xs border border-amber-200/60' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {type}
            </button>
          );
        })}
      </div>

      {/* Interactive Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-2xs">
        {/* Full Name */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Full Name *
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              placeholder="e.g. Rayyan Mansoor"
              className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#087F5B]"
            />
          </div>
        </div>

        {/* Mobile & Email 2-column on mobile */}
        <div className="grid grid-cols-1 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Mobile Phone Number *
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                required
                value={mobile}
                onChange={e => setMobile(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#087F5B]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#087F5B]"
              />
            </div>
          </div>
        </div>

        {/* Gender Selection & Date of Birth */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Gender
            </label>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setGender('Brother')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  gender === 'Brother' ? 'bg-[#087F5B] text-white' : 'text-slate-600'
                }`}
              >
                Brother
              </button>
              <button
                type="button"
                onClick={() => setGender('Sister')}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  gender === 'Sister' ? 'bg-[#087F5B] text-white' : 'text-slate-600'
                }`}
              >
                Sister
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Date of Birth
            </label>
            <input
              type="date"
              value={dob}
              onChange={e => setDob(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-[#087F5B]"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Residential Address & City *
          </label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={address}
              onChange={e => setAddress(e.target.value)}
              placeholder="Street, City, Postal Code"
              className="w-full h-11 pl-10 pr-3.5 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#087F5B]"
            />
          </div>
        </div>

        {/* Dynamic section depending on activeRegistrationType */}
        {activeRegistrationType === 'Volunteer' && (
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Volunteer Interest Area
            </label>
            <select
              value={volunteerInterest}
              onChange={e => setVolunteerInterest(e.target.value)}
              className="w-full h-11 px-3 rounded-xl border border-slate-200 text-xs text-slate-800 bg-white"
            >
              <option>Jummah Logistics & Parking</option>
              <option>Community Food Pantry & Packaging</option>
              <option>Youth Mentorship & Halaqahs</option>
              <option>Event Setup & Audio/Video</option>
              <option>Sisters Committee & Hospitality</option>
            </select>
          </div>
        )}

        {/* Additional Details */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1">
            Special Notes or Family Members (Optional)
          </label>
          <textarea
            rows={2}
            value={additionalNotes}
            onChange={e => setAdditionalNotes(e.target.value)}
            placeholder="Any specific requests, dietary preferences, or accessibility needs..."
            className="w-full p-3 rounded-xl border border-slate-200 text-xs text-slate-900 focus:outline-hidden focus:border-[#087F5B]"
          />
        </div>

        {/* Privacy & Trust Affirmation */}
        <div className="flex items-start gap-2 pt-1 text-[11px] text-slate-500">
          <ShieldCheck className="w-4 h-4 text-[#087F5B] shrink-0 mt-0.5" />
          <span>
            Your information is stored strictly for Masjid community purposes and will never be shared with third parties.
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-2 w-full h-13 rounded-2xl bg-gradient-to-r from-[#087F5B] to-[#07543F] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-emerald-900/10 active:scale-[0.98] transition-all"
        >
          <span>Submit {activeRegistrationType} Registration</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
