import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  Search, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Building2, 
  KeyRound, 
  UserPlus,
  Send
} from 'lucide-react';
import { BrokerLead } from '../types/realestate';
import { BROKER_LEADS } from '../data/mockData';

export const BrokerAttributionPortal: React.FC = () => {
  const [leads, setLeads] = useState<BrokerLead[]>(BROKER_LEADS);
  const [testPhone, setTestPhone] = useState('');
  const [testResult, setTestResult] = useState<{
    status: 'clean' | 'duplicate';
    message: string;
    details?: string;
  } | null>(null);

  const handleTestDuplicateCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testPhone.trim()) return;

    // Check if phone matches any existing lead
    const matched = leads.find(l => 
      l.leadPhone.replace(/\s+/g, '').includes(testPhone.replace(/\s+/g, '')) ||
      testPhone.replace(/\s+/g, '').includes(l.leadPhone.replace(/\s+/g, ''))
    );

    if (matched) {
      setTestResult({
        status: 'duplicate',
        message: `⚠️ Duplicate Claim Flagged! Client phone is already actively protected.`,
        details: `Registered by ${matched.brokerName} (${matched.agencyName}) under 60-day exclusivity window expiring on ${matched.protectionExpiryDate}. Developer anti-circumvention rules prohibit double commission claims.`,
      });
    } else {
      setTestResult({
        status: 'clean',
        message: `✅ Lead Clear for Attribution Lock.`,
        details: `No active registrations found in developer CRM for ${testPhone}. If registered today, the broker will receive an official 60-day exclusivity lock and 2.5% commission eligibility token.`,
      });
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-purple-700 mb-1">
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            ANTI-CIRCUMVENTION & LEAD PROTECTION
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Broker Network & Client Attribution Registry
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Eliminates broker dispute claims through WhatsApp-based instant lead registration, 60-day client exclusivity locks, and verified RERA commission tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('Daily live availability PDF sent to 142 authorized Dubai agencies via WhatsApp broadcast!')}
            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Send className="w-3.5 h-3.5 text-emerald-400" />
            Broadcast Daily Stock to Brokers
          </button>
        </div>
      </div>

      {/* Interactive Duplicate Check Testing Box */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 rounded-2xl p-6 text-white shadow-md border border-purple-800">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs font-mono text-purple-300 mb-1">
            <KeyRound className="w-4 h-4" />
            LIVE SIMULATION TOOL
          </div>
          <h3 className="text-base font-bold font-display text-white">
            Test WhatsApp Anti-Poaching Duplicate Lead Check
          </h3>
          <p className="text-xs text-purple-200 mt-1 leading-relaxed">
            Try entering a registered client number (e.g. <span className="font-mono text-white underline cursor-pointer" onClick={() => setTestPhone('+971 52 981 7722')}>+971 52 981 7722</span>) or a new number to see how the WhatsApp AI instantly enforces developer rules.
          </p>

          <form onSubmit={handleTestDuplicateCheck} className="mt-4 flex gap-2">
            <input
              type="text"
              value={testPhone}
              onChange={(e) => setTestPhone(e.target.value)}
              placeholder="Enter client phone (+971 ...)"
              className="flex-1 px-3.5 py-2 text-xs bg-white/10 border border-purple-400/30 rounded-lg text-white placeholder-purple-300 focus:outline-none focus:ring-1 focus:ring-emerald-400 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-lg transition-colors shrink-0 shadow-xs"
            >
              Verify Attribution Status
            </button>
          </form>

          {testResult && (
            <div className={`mt-4 p-3.5 rounded-xl border text-xs leading-relaxed animate-fadeIn ${
              testResult.status === 'duplicate'
                ? 'bg-amber-950/80 border-amber-500/50 text-amber-200'
                : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200'
            }`}>
              <div className="font-bold flex items-center gap-1.5 mb-1">
                {testResult.message}
              </div>
              <p className="text-[11px] opacity-90">{testResult.details}</p>
            </div>
          )}
        </div>
      </div>

      {/* Attribution Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 font-display">
            Active Client Attribution Registry (60-Day Protection Window)
          </h3>
          <span className="text-xs font-mono text-purple-800 bg-purple-50 px-2.5 py-1 rounded border border-purple-200">
            {leads.length} Records Locked
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider text-[11px] font-mono">
              <tr>
                <th className="py-3 px-4">Client Name & Phone</th>
                <th className="py-3 px-4">Registering Broker</th>
                <th className="py-3 px-4">Agency (RERA)</th>
                <th className="py-3 px-4">Project of Interest</th>
                <th className="py-3 px-4 text-right">Budget (AED)</th>
                <th className="py-3 px-4">Protection Expiry</th>
                <th className="py-3 px-4">Commission</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {leads.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">{l.leadName}</div>
                    <div className="text-[11px] text-slate-500 font-mono">{l.leadPhone}</div>
                  </td>

                  <td className="py-3 px-4 font-medium text-slate-900">
                    {l.brokerName}
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-semibold text-slate-800">{l.agencyName}</span>
                  </td>

                  <td className="py-3 px-4 text-slate-700">
                    {l.projectInterest}
                  </td>

                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 tabular-nums">
                    AED {l.budgetAed.toLocaleString()}
                  </td>

                  <td className="py-3 px-4 font-mono text-slate-600">
                    {l.protectionExpiryDate}
                  </td>

                  <td className="py-3 px-4 font-mono font-bold text-emerald-700">
                    {l.commissionRate}%
                  </td>

                  <td className="py-3 px-4">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      l.status === 'Attributed'
                        ? 'bg-purple-100 text-purple-800'
                        : l.status === 'Converted'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
