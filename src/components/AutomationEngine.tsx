import React, { useState } from 'react';
import { 
  GitBranch, 
  Plus, 
  Play, 
  CheckCircle2, 
  Sliders, 
  Zap, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  ArrowRight,
  Filter,
  AlertCircle
} from 'lucide-react';
import { AutomationRule, AudienceType } from '../types/realestate';
import { AUTOMATION_RULES } from '../data/mockData';

export const AutomationEngine: React.FC = () => {
  const [rules, setRules] = useState<AutomationRule[]>(AUTOMATION_RULES);
  const [filterAudience, setFilterAudience] = useState<string>('all');
  const [testingRuleId, setTestingRuleId] = useState<string | null>(null);
  const [testLog, setTestLog] = useState<{ id: string; message: string } | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  // New rule form state
  const [newRuleName, setNewRuleName] = useState('');
  const [newRuleAudience, setNewRuleAudience] = useState<AudienceType>('buyer');
  const [newRuleTrigger, setNewRuleTrigger] = useState('Buyer requests 70/30 payment plan comparison');
  const [newRuleCondition, setNewRuleCondition] = useState('Unit status is Available and price > 2.5M AED');
  const [newRuleAction, setNewRuleAction] = useState('Generate comparative PDF schedule and send directly to customer WhatsApp');

  const filteredRules = rules.filter(r => {
    if (filterAudience === 'all') return true;
    return r.audience === filterAudience || r.audience === 'all';
  });

  const handleToggle = (id: string) => {
    setRules(prev =>
      prev.map(r => r.id === id ? { ...r, active: !r.active } : r)
    );
  };

  const handleTestRun = (rule: AutomationRule) => {
    setTestingRuleId(rule.id);
    setTestLog(null);

    setTimeout(() => {
      setTestingRuleId(null);
      setTestLog({
        id: rule.id,
        message: `✓ Simulation Successful: Event payload evaluated against rules engine. Action dispatched to WhatsApp Cloud API in 42ms. Executions count incremented.`,
      });

      setRules(prev =>
        prev.map(r => r.id === rule.id ? { ...r, executionsCount: r.executionsCount + 1 } : r)
      );
    }, 600);
  };

  const handleCreateRule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName.trim()) return;

    const newRule: AutomationRule = {
      id: 'auto-' + Date.now(),
      name: newRuleName,
      audience: newRuleAudience,
      trigger: newRuleTrigger,
      condition: newRuleCondition,
      action: newRuleAction,
      active: true,
      executionsCount: 1,
    };

    setRules(prev => [newRule, ...prev]);
    setShowAddModal(false);
    setNewRuleName('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header and stats */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 mb-1">
              <Zap className="w-4 h-4 text-emerald-600" />
              DEVELOPER LOGIC ENGINE
            </div>
            <h2 className="text-xl font-bold font-display text-slate-900">
              WhatsApp Event Automations & Business Rules
            </h2>
            <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
              Program how your developer AI handles inventory distribution, buyer holds, broker lead attribution locks, and DLD escrow payment alerts autonomously.
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 self-start md:self-auto shrink-0 shadow-xs"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            Create Developer Rule
          </button>
        </div>

        {/* Metric indicators */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100 text-xs">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <span className="text-slate-500 block text-[11px]">Total Rule Executions</span>
            <span className="text-lg font-bold font-mono text-slate-900 tabular-nums">1,683</span>
            <span className="text-[10px] text-emerald-700 block mt-0.5">This billing cycle</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <span className="text-slate-500 block text-[11px]">Avg. Automation Latency</span>
            <span className="text-lg font-bold font-mono text-slate-900 tabular-nums">48 ms</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Meta Cloud Webhook</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <span className="text-slate-500 block text-[11px]">Lead Attribution Locks</span>
            <span className="text-lg font-bold font-mono text-purple-700 tabular-nums">318 Active</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">60-Day RERA Window</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100">
            <span className="text-slate-500 block text-[11px]">DLD Escrow Safeguard</span>
            <span className="text-lg font-bold font-mono text-emerald-700 tabular-nums">100% Enforced</span>
            <span className="text-[10px] text-slate-500 block mt-0.5">Zero unverified links</span>
          </div>
        </div>
      </div>

      {/* Filter and Rules Grid */}
      <div className="space-y-4">
        {/* Filter bar */}
        <div className="flex items-center justify-between gap-4">
          <div className="inline-flex p-1 bg-slate-100 rounded-lg text-xs font-medium">
            <button
              onClick={() => setFilterAudience('all')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                filterAudience === 'all'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Rules ({rules.length})
            </button>
            <button
              onClick={() => setFilterAudience('buyer')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                filterAudience === 'buyer'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Buyer Sales ({rules.filter(r => r.audience === 'buyer').length})
            </button>
            <button
              onClick={() => setFilterAudience('broker')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                filterAudience === 'broker'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Broker Network ({rules.filter(r => r.audience === 'broker').length})
            </button>
            <button
              onClick={() => setFilterAudience('owner')}
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                filterAudience === 'owner'
                  ? 'bg-white text-slate-900 shadow-xs font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Owner Care ({rules.filter(r => r.audience === 'owner').length})
            </button>
          </div>

          <span className="text-xs text-slate-500 font-mono">
            {filteredRules.filter(r => r.active).length} Rules Active
          </span>
        </div>

        {/* Rules Cards */}
        <div className="space-y-4">
          {filteredRules.map((rule) => {
            const isTesting = testingRuleId === rule.id;
            const hasLog = testLog?.id === rule.id;

            return (
              <div
                key={rule.id}
                className={`bg-white rounded-xl border transition-all p-5 shadow-xs ${
                  rule.active ? 'border-slate-200' : 'border-slate-200 bg-slate-50/50 opacity-75'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                      rule.active ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-400'
                    }`}>
                      <GitBranch className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 font-display">
                        {rule.name}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] text-slate-500">
                        <span className="uppercase font-semibold tracking-wider font-mono">
                          {rule.audience === 'all' ? 'Universal' : rule.audience}
                        </span>
                        <span>·</span>
                        <span className="font-mono tabular-nums">
                          {rule.executionsCount} executions logged
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 self-end sm:self-auto">
                    {/* Live Test Dry-Run Button */}
                    <button
                      onClick={() => handleTestRun(rule)}
                      disabled={isTesting || !rule.active}
                      className="px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-md border border-slate-200 transition-colors flex items-center gap-1 disabled:opacity-40"
                    >
                      <Play className="w-3.5 h-3.5 text-emerald-600" />
                      {isTesting ? 'Simulating...' : 'Test Dry Run'}
                    </button>

                    {/* Active toggle switch */}
                    <button
                      onClick={() => handleToggle(rule.id)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        rule.active ? 'bg-emerald-600' : 'bg-slate-300'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          rule.active ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* 3-Step Trigger -> Condition -> Action Visual Chain */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 text-xs">
                  {/* Step 1: Trigger */}
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono">
                      1. Trigger Event (WhatsApp)
                    </span>
                    <p className="font-medium text-slate-900 leading-snug">
                      {rule.trigger}
                    </p>
                  </div>

                  {/* Step 2: Condition */}
                  <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block font-mono">
                      2. Rule Evaluation
                    </span>
                    <p className="font-medium text-slate-800 leading-snug">
                      {rule.condition}
                    </p>
                  </div>

                  {/* Step 3: Action */}
                  <div className="p-3 bg-emerald-50/60 rounded-lg border border-emerald-200 space-y-1">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider block font-mono">
                      3. Automated Action
                    </span>
                    <p className="font-medium text-emerald-950 leading-snug">
                      {rule.action}
                    </p>
                  </div>
                </div>

                {/* Simulation dry-run result log */}
                {hasLog && (
                  <div className="mt-3 p-3 bg-emerald-50 text-emerald-900 rounded-lg text-xs font-mono border border-emerald-200 animate-fadeIn">
                    {testLog?.message}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Add New Developer Rule Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900 font-display">
                Create New Developer Automation Rule
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateRule} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Rule Name
                </label>
                <input
                  type="text"
                  required
                  value={newRuleName}
                  onChange={(e) => setNewRuleName(e.target.value)}
                  placeholder="e.g. VIP Russian Investor Fast-Track Assignment"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Stakeholder Audience
                </label>
                <select
                  value={newRuleAudience}
                  onChange={(e) => setNewRuleAudience(e.target.value as AudienceType)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 bg-white"
                >
                  <option value="buyer">Prospective Buyer (Sales & Inquiries)</option>
                  <option value="broker">Broker Network (Agencies & Agents)</option>
                  <option value="owner">Existing Owner (Handover & Snagging)</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Trigger Event (WhatsApp Webhook)
                </label>
                <input
                  type="text"
                  required
                  value={newRuleTrigger}
                  onChange={(e) => setNewRuleTrigger(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Evaluation Condition
                </label>
                <input
                  type="text"
                  required
                  value={newRuleCondition}
                  onChange={(e) => setNewRuleCondition(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Automated Action Dispatch
                </label>
                <input
                  type="text"
                  required
                  value={newRuleAction}
                  onChange={(e) => setNewRuleAction(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600 font-mono text-[11px]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3.5 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg shadow-xs"
                >
                  Save & Deploy Automation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
