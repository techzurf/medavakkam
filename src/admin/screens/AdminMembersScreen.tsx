import React, { useState } from 'react';
import { Users, Search, Filter, Phone, Mail, MapPin, Calendar, CheckCircle2, XCircle, X } from 'lucide-react';
import { AdminMember, INITIAL_MEMBERS } from '../mockAdminData';

export const AdminMembersScreen: React.FC = () => {
  const [members, setMembers] = useState<AdminMember[]>(INITIAL_MEMBERS);
  const [filter, setFilter] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [search, setSearch] = useState('');
  const [selectedMember, setSelectedMember] = useState<AdminMember | null>(null);

  const filtered = members.filter(m => {
    const matchesFilter = filter === 'All' ? true : m.status === filter;
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || 
                          m.mobile.includes(search) || 
                          m.id.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#087F5B]">
            Community Directory
          </span>
          <h1 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            Members Management
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Registered Muslim families, contact details, and active community participation records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#087F5B] bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200">
            Total: 1,248 Registered
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3 sm:p-4 rounded-3xl border border-slate-200/90 shadow-2xs">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, mobile or ID..."
            className="w-full h-10 pl-9 pr-3 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:outline-hidden focus:border-[#087F5B]"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
          {(['All', 'Active', 'Inactive'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filter === tab ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Members Grid / List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((m) => (
          <div
            key={m.id}
            onClick={() => setSelectedMember(m)}
            className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:border-[#087F5B]/50 hover:shadow-xs transition-all cursor-pointer flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-[#087F5B] font-bold text-xs flex items-center justify-center shrink-0">
                {m.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {m.name}
                  </h3>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                    m.status === 'Active' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                  }`}>
                    {m.status}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium mt-0.5">
                  <span>{m.mobile}</span>
                  <span>•</span>
                  <span>{m.id}</span>
                </div>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="text-[10px] text-slate-400 block font-medium">Registered</span>
              <span className="text-xs font-bold text-slate-700">{m.registrationDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Member Details Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-5 sm:p-6 shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-[#087F5B] font-bold text-sm flex items-center justify-center">
                  {selectedMember.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{selectedMember.name}</h3>
                  <span className="text-[11px] font-mono text-slate-400">{selectedMember.id}</span>
                </div>
              </div>

              <button onClick={() => setSelectedMember(null)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Member Info Cards */}
            <div className="space-y-2.5 text-xs text-slate-700 divide-y divide-slate-100">
              <div className="flex justify-between items-center pt-1">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  Mobile Number:
                </span>
                <span className="font-bold text-slate-900">{selectedMember.mobile}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  Email Address:
                </span>
                <span className="font-medium text-slate-900">{selectedMember.email}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  Residential Address:
                </span>
                <span className="font-medium text-slate-900 text-right max-w-[200px]">{selectedMember.address}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-slate-400" />
                  Family Size:
                </span>
                <span className="font-bold text-slate-900">{selectedMember.familyMembers} Persons</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  Joined Date:
                </span>
                <span className="font-bold text-slate-900">{selectedMember.registrationDate}</span>
              </div>

              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-500">Membership Status:</span>
                <span className="font-bold text-emerald-700">{selectedMember.status}</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedMember(null)}
              className="mt-2 w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 font-bold text-xs text-slate-800"
            >
              Close Record
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
