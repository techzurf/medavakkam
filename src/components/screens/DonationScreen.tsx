import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Heart, 
  ShieldCheck, 
  Sparkles, 
  CreditCard, 
  CheckCircle2, 
  ChevronRight, 
  ArrowLeft,
  X,
  FileText
} from 'lucide-react';
import { DONATION_FUNDS } from '../../data/mockData';
import { RubElHizbIcon } from '../common/IslamicIcons';

export const DonationScreen: React.FC = () => {
  const { setOverlayScreen } = useApp();
  const [selectedFund, setSelectedFund] = useState(DONATION_FUNDS[0].id);
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(100);
  const [customAmount, setCustomAmount] = useState('');
  const [frequency, setFrequency] = useState<'One-time' | 'Monthly'>('One-time');
  const [coverFees, setCoverFees] = useState(true);
  const [receiptModal, setReceiptModal] = useState(false);

  const amounts = [25, 50, 100, 250, 500];

  const actualAmount = selectedAmount === 'custom' ? Number(customAmount) || 0 : selectedAmount;
  const processingFee = coverFees ? (actualAmount * 0.022 + 0.30).toFixed(2) : '0.00';
  const totalAmount = (actualAmount + Number(processingFee)).toFixed(2);

  const currentFund = DONATION_FUNDS.find(f => f.id === selectedFund) || DONATION_FUNDS[0];

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (actualAmount <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }
    setReceiptModal(true);
  };

  return (
    <div className="w-full flex flex-col gap-4 px-4 pt-3 pb-8">
      {/* Top Banner */}
      <div className="w-full bg-gradient-to-br from-[#087F5B] to-[#054432] rounded-3xl p-5 text-white shadow-sm relative overflow-hidden">
        <div className="absolute -top-4 -right-4 opacity-15">
          <RubElHizbIcon className="w-28 h-28 text-white" />
        </div>

        <div className="flex items-center gap-1.5 mb-1 text-amber-300 text-xs font-bold uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 fill-current" />
          <span>Sadaqah & Zakat</span>
        </div>

        <h1 className="text-xl font-extrabold tracking-tight text-white mb-1">
          Support Al-Noor Masjid
        </h1>

        <p className="text-xs text-emerald-100/90 leading-relaxed max-w-sm">
          "The believer's shade on the Day of Resurrection will be their charity." (Tirmidhi)
        </p>

        <div className="mt-3 pt-3 border-t border-white/15 flex items-center justify-between text-[11px] text-emerald-200">
          <span>501(c)(3) Tax-Exempt Status</span>
          <span className="text-amber-300 font-semibold">100% Tax Deductible</span>
        </div>
      </div>

      {/* Donation Form */}
      <form onSubmit={handleDonate} className="flex flex-col gap-4 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-2xs">
        {/* Frequency Tabs (One-time vs Monthly Sadaqah Jariyah) */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">
            Donation Frequency
          </label>
          <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-2xl">
            <button
              type="button"
              onClick={() => setFrequency('One-time')}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                frequency === 'One-time' 
                  ? 'bg-white text-slate-900 shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              One-Time Gift
            </button>
            <button
              type="button"
              onClick={() => setFrequency('Monthly')}
              className={`py-2 text-xs font-bold rounded-xl transition-all ${
                frequency === 'Monthly' 
                  ? 'bg-[#087F5B] text-white shadow-xs' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Sadaqah
            </button>
          </div>
        </div>

        {/* Cause / Fund Category Selection */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">
            Select Fund / Cause
          </label>
          <div className="space-y-1.5">
            {DONATION_FUNDS.map(fund => (
              <label
                key={fund.id}
                onClick={() => setSelectedFund(fund.id)}
                className={`flex items-start gap-2.5 p-3 rounded-2xl border transition-all cursor-pointer ${
                  selectedFund === fund.id 
                    ? 'bg-emerald-50/70 border-[#087F5B]' 
                    : 'bg-slate-50/60 border-slate-200/80 hover:bg-slate-50'
                }`}
              >
                <input
                  type="radio"
                  name="fund"
                  checked={selectedFund === fund.id}
                  onChange={() => setSelectedFund(fund.id)}
                  className="accent-[#087F5B] mt-0.5"
                />
                <div>
                  <div className="text-xs font-bold text-slate-900">
                    {fund.name}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {fund.desc}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Amount Presets */}
        <div>
          <label className="text-xs font-bold text-slate-700 block mb-1.5">
            Select Amount
          </label>
          <div className="grid grid-cols-3 gap-2 mb-2">
            {amounts.map(amt => (
              <button
                key={amt}
                type="button"
                onClick={() => setSelectedAmount(amt)}
                className={`py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                  selectedAmount === amt 
                    ? 'bg-[#087F5B] text-white shadow-2xs scale-102' 
                    : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                ${amt}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setSelectedAmount('custom')}
              className={`py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                selectedAmount === 'custom' 
                  ? 'bg-[#087F5B] text-white shadow-2xs' 
                  : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
              }`}
            >
              Other $
            </button>
          </div>

          {selectedAmount === 'custom' && (
            <div className="mt-2">
              <input
                type="number"
                min="5"
                required
                value={customAmount}
                onChange={e => setCustomAmount(e.target.value)}
                placeholder="Enter custom dollar amount (e.g. 150)"
                className="w-full h-11 px-3.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-900 focus:outline-hidden focus:border-[#087F5B]"
              />
            </div>
          )}
        </div>

        {/* Cover credit card processing fee checkbox */}
        <label className="flex items-center gap-2 text-xs text-slate-600 cursor-pointer pt-1">
          <input
            type="checkbox"
            checked={coverFees}
            onChange={e => setCoverFees(e.target.checked)}
            className="w-4 h-4 rounded-sm text-[#087F5B] accent-[#087F5B]"
          />
          <span>Add <strong>${processingFee}</strong> to cover credit card processing fee</span>
        </label>

        {/* Donation Total & Submit Button */}
        <button
          type="submit"
          className="mt-2 w-full h-13 rounded-2xl bg-gradient-to-r from-[#087F5B] to-[#07543F] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/15 active:scale-[0.98] transition-all"
        >
          <CreditCard className="w-4 h-4" />
          <span>Complete ${totalAmount} {frequency} Donation</span>
        </button>
      </form>

      {/* Instant Receipt Preview Modal */}
      {receiptModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 max-w-[430px] mx-auto animate-in zoom-in-95">
          <div className="w-full bg-white rounded-3xl p-5 shadow-2xl flex flex-col text-left">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-[#087F5B] flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">JazakAllah Khair!</h3>
                  <span className="text-[10px] text-slate-500">Official Donation Receipt</span>
                </div>
              </div>
              <button
                onClick={() => {
                  setReceiptModal(false);
                  setOverlayScreen(null);
                }}
                className="text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-2 text-xs border-b border-slate-100 text-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Receipt Ref:</span>
                <span className="font-mono font-bold">ALN-DON-{Math.floor(10000 + Math.random() * 90000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Allocated Fund:</span>
                <span className="font-semibold text-right max-w-[180px]">{currentFund.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Gift Amount:</span>
                <span className="font-bold text-slate-900">${totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Type:</span>
                <span>{frequency} Contribution</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Tax Exemption:</span>
                <span className="text-emerald-700 font-semibold">100% Deductible</span>
              </div>
            </div>

            <p className="py-3 text-[11px] text-slate-500 leading-relaxed">
              May Allah ﷻ accept your generosity and place continuous barakah in your wealth and family. A copy of this receipt has been emailed to you.
            </p>

            <button
              onClick={() => {
                setReceiptModal(false);
                setOverlayScreen(null);
              }}
              className="w-full py-3 bg-[#087F5B] text-white font-bold text-xs rounded-2xl text-center"
            >
              Done & Return Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
