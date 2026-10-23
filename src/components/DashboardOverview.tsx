import React from 'react';
import { 
  MessageSquare, 
  TrendingUp, 
  Users, 
  Building2, 
  ShieldCheck, 
  ArrowUpRight, 
  Smartphone,
  GitBranch,
  Wrench,
  CheckCircle2
} from 'lucide-react';
import { PROJECTS } from '../data/mockData';

interface DashboardOverviewProps {
  onNavigate: (tab: string) => void;
  onOpenSimulator: () => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  onNavigate,
  onOpenSimulator,
}) => {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Developer Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden border border-slate-800">
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            ONE VERIFIED WHATSAPP NUMBER · DUBAI DEVELOPER OS
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display tracking-tight text-white">
            Apex Real Estate Developments
          </h1>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            Your single official company WhatsApp number (+971 4 800 2739) autonomously qualifies prospective buyers, distributes live inventory to verified broker agencies with lead protection, and services existing unit owners around the clock.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenSimulator}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs flex items-center gap-2"
            >
              <Smartphone className="w-4 h-4" />
              Launch Live WhatsApp Simulator
            </button>
            <button
              onClick={() => onNavigate('automations')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors border border-slate-700 flex items-center gap-2"
            >
              <GitBranch className="w-4 h-4 text-emerald-400" />
              View Active Automations (5 Rules)
            </button>
            <button
              onClick={() => onNavigate('inbox')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg transition-colors border border-slate-700 flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4 text-blue-400" />
              Shared Team Inbox (3 Active)
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Metrics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Total Inquiries This Month
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-slate-900 tabular-nums">
              1,842
            </span>
            <span className="text-xs font-semibold text-emerald-700 flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5" /> +24.8%
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
            <span className="font-semibold text-emerald-700">94.2% AI Autonomous</span>
            <span>·</span>
            <span>5.8% Human Escalation</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Qualified Buyer Pipeline
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-slate-900 font-mono tabular-nums">
              AED 42.8M
            </span>
            <span className="text-xs font-semibold text-blue-700 flex items-center">
              18 Holds Active
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            Average qualification turnaround: <span className="font-semibold text-slate-700">42 seconds</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Broker Network Deals
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-700 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-slate-900 tabular-nums">
              318 Leads Locked
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1.5">
            <span className="text-purple-700 font-semibold">60-Day Anti-Circumvention</span>
            <span>·</span>
            <span>0 Disputes</span>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">
              Owner Post-Handover Care
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold font-display text-slate-900 tabular-nums">
              89 Tickets
            </span>
            <span className="text-xs text-slate-500">
              Avg 1.8 Days to Fix
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500">
            DLD Escrow verified payments & snagging photos
          </div>
        </div>
      </div>

      {/* 3-Stakeholder Architecture Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-display">
              One Official WhatsApp Number — Three Unified Stakeholder Channels
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              The AI dynamically detects who is messaging and routes actions based on developer commercial rules.
            </p>
          </div>
          <span className="hidden sm:inline-block text-xs font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200">
            Developer Controlled Workflows
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Channel 1: Prospective Buyers */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                1. Buyer Enquiries & Sales
              </span>
              <span className="text-[11px] text-slate-500 font-mono">58% Inbound</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 mb-4">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>24/7 Budget, down payment & ROI qualification</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Instant floor plans, media & payment-plan explanation</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Branded unit-specific offer PDF generation & 48h holds</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Show-apartment visits booked directly into consultant calendars</span>
              </li>
            </ul>
            <button
              onClick={() => onNavigate('simulator')}
              className="w-full py-1.5 px-3 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded border border-slate-200 transition-colors text-center"
            >
              Test Buyer Flow in WhatsApp →
            </button>
          </div>

          {/* Channel 2: Broker Network */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                2. Broker Network Management
              </span>
              <span className="text-[11px] text-slate-500 font-mono">26% Inbound</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 mb-4">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Agency onboarding link & RERA broker OTP verification</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Daily timestamped live inventory sheets via WhatsApp</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Client attribution registration & duplicate claim detection</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Client-ready white-labeled sales offers & briefing bookings</span>
              </li>
            </ul>
            <button
              onClick={() => onNavigate('brokers')}
              className="w-full py-1.5 px-3 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded border border-slate-200 transition-colors text-center"
            >
              Manage Broker Attribution →
            </button>
          </div>

          {/* Channel 3: Existing Owners */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                3. Owner Service & Handover
              </span>
              <span className="text-[11px] text-slate-500 font-mono">16% Inbound</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-600 mb-4">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Verified identity check before revealing private deed data</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Construction progress photos & DLD Escrow payment notices</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Snagging defect photo capture with automatic QA tickets</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Service charge enquiries, move-in permits & NOC requests</span>
              </li>
            </ul>
            <button
              onClick={() => onNavigate('owners')}
              className="w-full py-1.5 px-3 bg-white hover:bg-slate-100 text-slate-800 text-xs font-semibold rounded border border-slate-200 transition-colors text-center"
            >
              Open Owner Service Desk →
            </button>
          </div>
        </div>
      </div>

      {/* Grid: Active Projects + Live Automation Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Active Developer Projects (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Connected Developer Projects
              </h3>
              <p className="text-xs text-slate-500">
                Live inventory synced to WhatsApp AI bot and broker distribution channels.
              </p>
            </div>
            <button
              onClick={() => onNavigate('inventory')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800"
            >
              View All Inventory →
            </button>
          </div>

          <div className="space-y-4">
            {PROJECTS.map((proj) => (
              <div
                key={proj.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center"
              >
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="w-full sm:w-28 h-20 rounded-lg object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {proj.name}
                    </h4>
                    <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 shrink-0">
                      {proj.availableUnits} Available
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 truncate mt-0.5">
                    {proj.location} · Completion {proj.completionDate}
                  </p>

                  {/* Progress bar */}
                  <div className="mt-2.5">
                    <div className="flex justify-between text-[11px] text-slate-500 mb-1">
                      <span>Construction Progress</span>
                      <span className="font-mono font-bold text-slate-700">{proj.constructionProgress}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${proj.constructionProgress}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Stream (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 font-display">
                Real-Time WhatsApp Stream
              </h3>
              <p className="text-xs text-slate-500">
                Automated events executing across Dubai time.
              </p>
            </div>
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="font-semibold text-emerald-700">Buyer Sales Offer</span>
                <span className="font-mono text-[11px]">10:42 AM</span>
              </div>
              <p className="text-slate-900 font-medium">
                Unit 1804 (Skyline Bay) placed on 48h hold for Dr. Tariq Al-Mansoor. Branded offer PDF generated.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="font-semibold text-purple-700">Broker Attribution Lock</span>
                <span className="font-mono text-[11px]">09:15 AM</span>
              </div>
              <p className="text-slate-900 font-medium">
                Driven Properties locked Dr. Mikhail Volkov for 60 days on Sanctuary Lot #14. Duplicate check cleared.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="font-semibold text-amber-700">Owner Snagging Ticket</span>
                <span className="font-mono text-[11px]">Yesterday</span>
              </div>
              <p className="text-slate-900 font-medium">
                Unit 1402 logged photo ticket #SNAG-442 for balcony paint. Inspection booked for Sunday 11 AM.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 space-y-1">
              <div className="flex items-center justify-between text-slate-500">
                <span className="font-semibold text-blue-700">Viewing Confirmed</span>
                <span className="font-mono text-[11px]">Yesterday</span>
              </div>
              <p className="text-slate-900 font-medium">
                Sales gallery appointment confirmed for Sophia Lindqvist (Penthouse 42) with chauffeur service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
