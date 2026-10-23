import React, { useState } from 'react';
import { 
  Wrench, 
  Camera, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Building2, 
  FileText, 
  ShieldCheck, 
  Calendar,
  Plus
} from 'lucide-react';
import { SnaggingTicket } from '../types/realestate';
import { SNAGGING_TICKETS, PROJECTS } from '../data/mockData';

export const OwnerServiceDesk: React.FC = () => {
  const [tickets, setTickets] = useState<SnaggingTicket[]>(SNAGGING_TICKETS);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showAddTicket, setShowAddTicket] = useState(false);

  // New ticket state
  const [unitNo, setUnitNo] = useState('Tower B - 1402');
  const [ownerName, setOwnerName] = useState('Marcus Vance');
  const [desc, setDesc] = useState('Master bathroom tile grout discolored near vanity counter.');
  const [cat, setCat] = useState<SnaggingTicket['category']>('Civil & Painting');
  const [sev, setSev] = useState<SnaggingTicket['severity']>('Minor');

  const filteredTickets = tickets.filter(t => {
    if (selectedCategory === 'all') return true;
    return t.category === selectedCategory;
  });

  const handleStatusChange = (id: string, newStatus: SnaggingTicket['status']) => {
    setTickets(prev =>
      prev.map(t => t.id === id ? { ...t, status: newStatus } : t)
    );
  };

  const handleAddTicket = (e: React.FormEvent) => {
    e.preventDefault();
    const newT: SnaggingTicket = {
      id: 'SNAG-' + (Math.floor(Math.random() * 900) + 100),
      unitNumber: unitNo,
      ownerName: ownerName,
      ownerPhone: '+971 50 491 8820',
      category: cat,
      severity: sev,
      description: desc,
      status: 'Inspection Scheduled',
      loggedDate: 'Just now',
      responseDue: 'Within 48h',
    };
    setTickets([newT, ...tickets]);
    setShowAddTicket(false);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-amber-700 mb-1">
            <Wrench className="w-4 h-4 text-amber-600" />
            POST-HANDOVER & ONGOING SERVICE
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Owner Handover, Construction Feeds & Snagging Desk
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Existing buyers interact via WhatsApp to track project construction, receive verified DLD Escrow payment notices, and submit defect photo tickets directly to site engineers.
          </p>
        </div>

        <button
          onClick={() => setShowAddTicket(true)}
          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          Simulate WhatsApp Snagging Defect
        </button>
      </div>

      {/* Construction Milestone Progress Tracker */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 font-display">
            Official Construction Milestone Broadcasts
          </h3>
          <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            DLD Audited Escrow
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROJECTS.map((proj) => (
            <div key={proj.id} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
              <img
                src={proj.image}
                alt={proj.name}
                className="w-full h-36 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-4 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-slate-900 font-display text-sm">
                    {proj.name}
                  </h4>
                  <span className="font-mono font-bold text-emerald-700 text-sm">
                    {proj.constructionProgress}%
                  </span>
                </div>
                <p className="text-slate-500 text-[11px]">{proj.location}</p>

                {/* Progress bar */}
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all"
                    style={{ width: `${proj.constructionProgress}%` }}
                  />
                </div>

                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Escrow Code:</span>
                    <span className="font-mono font-semibold text-slate-900">{proj.dldEscrowNo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Next Handover:</span>
                    <span className="font-semibold text-slate-800">{proj.completionDate}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Photo progress update for ${proj.name} broadcast to registered unit owners!`)}
                  className="w-full mt-2 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-xs rounded transition-colors text-center"
                >
                  Send Milestone Photos to Owners →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Snagging Defects Ticket Board */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Handover Snagging & Defect Inspection Board
            </h3>
            <p className="text-xs text-slate-500">
              Tickets generated automatically when an owner sends photo or voice evidence to WhatsApp.
            </p>
          </div>

          <div className="inline-flex p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Defects ({tickets.length})
            </button>
            <button
              onClick={() => setSelectedCategory('Civil & Painting')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === 'Civil & Painting'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Civil & Painting
            </button>
            <button
              onClick={() => setSelectedCategory('HVAC / AC')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === 'HVAC / AC'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              HVAC / AC
            </button>
            <button
              onClick={() => setSelectedCategory('Balcony & Glass')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === 'Balcony & Glass'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Balcony & Glass
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredTickets.map((t) => (
            <div key={t.id} className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-xs text-slate-900">
                  {t.id}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  t.severity === 'Urgent'
                    ? 'bg-red-100 text-red-800'
                    : t.severity === 'Moderate'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {t.severity}
                </span>
              </div>

              <div>
                <span className="font-bold text-slate-900 text-xs block">
                  {t.unitNumber}
                </span>
                <span className="text-[11px] text-slate-500">
                  {t.ownerName} ({t.ownerPhone})
                </span>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700 leading-snug">
                "{t.description}"
              </div>

              <div className="text-[11px] text-slate-500 flex items-center justify-between">
                <span>Category: {t.category}</span>
                <span className="font-mono text-emerald-800 font-medium">WhatsApp Logged</span>
              </div>

              {/* Status updater */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Status:</span>
                <select
                  value={t.status}
                  onChange={(e) => handleStatusChange(t.id, e.target.value as SnaggingTicket['status'])}
                  className="text-xs font-semibold px-2 py-1 rounded border border-slate-200 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600"
                >
                  <option value="Logged via WhatsApp">Logged via WhatsApp</option>
                  <option value="Inspection Scheduled">Inspection Scheduled</option>
                  <option value="Contractor In Progress">Contractor In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add New Snagging Ticket Modal */}
      {showAddTicket && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Simulate Owner WhatsApp Defect Ticket
              </h3>
              <button onClick={() => setShowAddTicket(false)} className="text-slate-400">✕</button>
            </div>

            <form onSubmit={handleAddTicket} className="mt-4 space-y-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Unit Number</label>
                <input
                  type="text"
                  required
                  value={unitNo}
                  onChange={e => setUnitNo(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Owner Name</label>
                <input
                  type="text"
                  required
                  value={ownerName}
                  onChange={e => setOwnerName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={cat}
                  onChange={e => setCat(e.target.value as any)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Civil & Painting">Civil & Painting</option>
                  <option value="HVAC / AC">HVAC / AC</option>
                  <option value="MEP & Plumbing">MEP & Plumbing</option>
                  <option value="Balcony & Glass">Balcony & Glass</option>
                  <option value="Carpentry & Joinery">Carpentry & Joinery</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Defect Description</label>
                <textarea
                  rows={3}
                  required
                  value={desc}
                  onChange={e => setDesc(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddTicket(false)}
                  className="px-3 py-1.5 text-slate-600 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded"
                >
                  Submit to Engineering Desk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
