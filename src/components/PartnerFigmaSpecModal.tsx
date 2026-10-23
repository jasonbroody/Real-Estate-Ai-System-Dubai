import React, { useState } from 'react';
import { 
  FileText, 
  Copy, 
  Check, 
  Sparkles, 
  CheckCircle2, 
  Building2, 
  Users, 
  Wrench, 
  Palette,
  ShieldCheck,
  Search,
  ExternalLink
} from 'lucide-react';

interface PartnerFigmaSpecModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PartnerFigmaSpecModal: React.FC<PartnerFigmaSpecModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'brief' | 'developer-35' | 'broker-22'>('brief');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const developerFeatures = [
    { id: 1, name: 'AI Enquiry Handling', cat: 'Buyer Sales', desc: 'Answer enquiries around the clock using approved project and company information, with staff escalation when needed.', done: true },
    { id: 2, name: 'Language & Voice Support', cat: 'Buyer Sales', desc: 'Start with English and Arabic text and voice-note understanding; expand languages after quality testing.', done: true },
    { id: 3, name: 'Buyer Qualification', cat: 'Buyer Sales', desc: 'Understand budget, down payment, instalment capacity, property type, bedrooms, location, purpose and timing.', done: true },
    { id: 4, name: 'Property Matching', cat: 'Buyer Sales', desc: 'Search authorised inventory and recommend suitable available units, explaining why each matches.', done: true },
    { id: 5, name: 'Unit Comparison', cat: 'Buyer Sales', desc: 'Compare price, size, floor, view, layout, location, handover information and payment terms.', done: true },
    { id: 6, name: 'Brochures & Media', cat: 'Buyer Sales', desc: 'Share current floor plans, brochures, images, videos, maps and virtual-tour links.', done: true },
    { id: 7, name: 'Payment-Plan Explanation', cat: 'Buyer Sales', desc: 'Show booking amounts, instalments, handover balances and applicable approved fees.', done: true },
    { id: 8, name: 'Approved Sales Offers', cat: 'Buyer Sales', desc: 'Generate branded unit-specific PDFs or links with current terms, offer reference and expiry.', done: true },
    { id: 9, name: 'Viewings & Meetings', cat: 'Buyer Sales', desc: 'Check customer, consultant and venue availability; book show-apartment visits, briefings and virtual meetings.', done: true },
    { id: 10, name: 'Booking Assistance', cat: 'Buyer Sales', desc: 'Recheck availability, request authorised holds and guide buyers through the developer reservation process.', done: true },
    { id: 11, name: 'Payment Guidance', cat: 'Buyer Sales', desc: 'Share approved secure payment pages and verified beneficiary instructions (DLD Escrow accounts).', done: true },
    { id: 12, name: 'Follow-up & Human Support', cat: 'Buyer Sales', desc: 'Send permitted reminders and matching-property updates; hand over to assigned consultant with conversation context.', done: true },
    { id: 13, name: 'Agency Onboarding', cat: 'Broker Network', desc: 'Provide a registration link, collect required documents securely and route the application for approval.', done: true },
    { id: 14, name: 'Agent Verification & Access', cat: 'Broker Network', desc: 'Link each agent to an approved agency; control project access and revoke permissions when required.', done: true },
    { id: 15, name: 'Broker Inventory & Offer Service', cat: 'Broker Network', desc: 'Let authorised brokers search availability and generate client-ready offers without waiting for routine sales assistance.', done: true },
    { id: 16, name: 'Daily Inventory Distribution', cat: 'Broker Network', desc: 'Send opt-in, filtered availability sheets and project updates with a clear generation time.', done: true },
    { id: 17, name: 'Client Attribution', cat: 'Broker Network', desc: 'Register introduced clients, detect duplicate claims and apply the developer lead-protection rules.', done: true },
    { id: 18, name: 'Broker Briefings', cat: 'Broker Network', desc: 'Arrange individual or agency group briefings with the internal team, presenter and venue.', done: true },
    { id: 19, name: 'Deal & Commission Visibility', cat: 'Broker Network', desc: 'Provide permitted booking progress, missing-document requests, commission eligibility and payment status.', done: true },
    { id: 20, name: 'Verified Owner Access', cat: 'Owner Care', desc: 'Confirm identity and property entitlement before revealing private records.', done: true },
    { id: 21, name: 'Statements & Payments', cat: 'Owner Care', desc: 'Retrieve statements, instalment schedules, invoices and receipts; assist with approved payment routes.', done: true },
    { id: 22, name: 'Construction & Handover', cat: 'Owner Care', desc: 'Share approved progress updates, required documents and available handover appointments.', done: true },
    { id: 23, name: 'Snagging & Defects', cat: 'Owner Care', desc: 'Capture issues and photos via WhatsApp, arrange inspections and track repair requests.', done: true },
    { id: 24, name: 'Complaint Tickets', cat: 'Owner Care', desc: 'Provide a reference, responsible team, response target, status updates and escalation for delayed cases.', done: true },
    { id: 25, name: 'Community Services', cat: 'Owner Care', desc: 'Support service-charge enquiries, permits, access cards, amenities and NOC requests through authorized operator.', done: true },
    { id: 26, name: 'Shared Team Inbox', cat: 'Developer Console', desc: 'View conversations, assign staff, add internal notes and pause the AI for human takeover.', done: true },
    { id: 27, name: 'Sales Pipeline', cat: 'Developer Console', desc: 'Track enquiries, qualified leads, offers, confirmed appointments, holds and bookings.', done: true },
    { id: 28, name: 'Inventory & Commercial Controls', cat: 'Developer Console', desc: 'Monitor data freshness, manage approved offers and promotions, and route exceptions for approval.', done: true },
    { id: 29, name: 'Marketing Campaigns', cat: 'Developer Console', desc: 'Segment eligible contacts, manage consent and approved templates, schedule messages and track replies.', done: true },
    { id: 30, name: 'Team Calendars', cat: 'Developer Console', desc: 'Manage consultant availability, show-unit capacity, meeting reminders, attendance and cancellations.', done: true },
    { id: 31, name: 'Agency Administration', cat: 'Developer Console', desc: 'Manage applications, agreements, agents, renewal dates and attribution disputes.', done: true },
    { id: 32, name: 'Service Desk', cat: 'Developer Console', desc: 'Assign tickets, track response targets, escalate delays and record closure feedback.', done: true },
    { id: 33, name: 'Knowledge Management', cat: 'Developer Console', desc: 'Approve FAQs, documents and media; review unanswered questions and correct outdated content.', done: true },
    { id: 34, name: 'Performance Reporting', cat: 'Developer Console', desc: 'Measure response time, offer turnaround, appointments, broker activity, service outcomes and operating cost.', done: true },
    { id: 35, name: 'Access & Audit History', cat: 'Developer Console', desc: 'Separate developer data, restrict access by role and record sensitive changes and completed actions.', done: true },
  ];

  const brokerFeatures = [
    { id: 1, name: 'Agency Registration', desc: 'Receive a secure application link, submit credentials and track approval.', done: true },
    { id: 2, name: 'Agent Verification', desc: 'Verify through registered contact OTP and link agent to approved agency.', done: true },
    { id: 3, name: 'Agency Administration', desc: 'Allow agency administrator to manage agents and revoke departing staff access.', done: true },
    { id: 4, name: 'Role-Based Information', desc: 'Show only authorized projects and records; keep confidential details restricted.', done: true },
    { id: 5, name: 'Natural-Language Inventory Search', desc: 'Ask for available units by budget, project, bedrooms, handover or payment plan.', done: true },
    { id: 6, name: 'Client Requirement Matching', desc: 'Find suitable options based on client down payment and ROI criteria.', done: true },
    { id: 7, name: 'Latest Availability Sheets', desc: 'Request filtered PDF showing when information was generated.', done: true },
    { id: 8, name: 'Daily Inventory Updates', desc: 'Subscribe to project-specific daily digests and newly released units.', done: true },
    { id: 9, name: 'Approved Sales Offers', desc: 'Generate client-ready unit offers with approved prices, payment plans and validity.', done: true },
    { id: 10, name: 'Project Information & Media', desc: 'Access approved brochures, layouts, images, videos, maps and launch material.', done: true },
    { id: 11, name: 'Unit & Payment-Plan Comparison', desc: 'Compare shortlisted options and explain payment timing and fees.', done: true },
    { id: 12, name: 'Multilingual Assistance', desc: 'Ask questions in English, Arabic, and use voice notes.', done: true },
    { id: 13, name: 'Client Registration', desc: 'Register introduced clients, receive reference and check attribution status.', done: true },
    { id: 14, name: 'Duplicate Lead Handling', desc: 'Route conflicting client registrations for review without revealing confidential records.', done: true },
    { id: 15, name: 'Briefings & Group Visits', desc: 'Arrange project briefing for agent or agency team using confirmed internal availability.', done: true },
    { id: 16, name: 'Client Viewing Bookings', desc: 'Coordinate buyer, agent, developer consultant and sales gallery.', done: true },
    { id: 17, name: 'Reminders & Rescheduling', desc: 'Receive confirmations, directions and reminders; change or cancel appointments.', done: true },
    { id: 18, name: 'Reservation Requests', desc: 'Request permitted unit holds, see expiry times and follow booking steps.', done: true },
    { id: 19, name: 'Secure Document Submission', desc: 'Receive approved upload link and track outstanding booking documents.', done: true },
    { id: 20, name: 'Deal & Commission Tracking', desc: 'Check booking stages, commission eligibility, invoices and payment status.', done: true },
    { id: 21, name: 'Agency Support Tickets', desc: 'Raise registration, offer, attribution or commission queries.', done: true },
    { id: 22, name: 'Agency Dashboard', desc: 'View agency own team access, registered clients, appointments and deal statuses.', done: true },
  ];

  const fullMarkdownExport = `# AcrePulse AI — Dubai Real Estate Developer WhatsApp Operating System
## Complete 35 Developer Features & 22 Broker Features Specification

${developerFeatures.map(f => `[${f.done ? 'x' : ' '}] Dev Feat #${f.id} (${f.cat}): ${f.name} — ${f.desc}`).join('\n')}

---

### Broker Features (22 Items)
${brokerFeatures.map(b => `[${b.done ? 'x' : ' '}] Broker Feat #${b.id}: ${b.name} — ${b.desc}`).join('\n')}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullMarkdownExport);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative my-8 max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center">
              <FileText className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 font-display">
                Partner Pitch & Figma Designer Master Spec
              </h2>
              <p className="text-xs text-slate-500">
                Grounded in the 35 Developer Features and 22 Broker Features specifications.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 border border-slate-200"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied Full Spec!' : 'Copy Complete Markdown'}
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 p-1 rounded-lg text-lg"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 pt-4 pb-2 border-b border-slate-100 shrink-0 text-xs">
          <button
            onClick={() => setActiveTab('brief')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors ${
              activeTab === 'brief'
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            1. Executive Brief & Figma Guidelines
          </button>
          <button
            onClick={() => setActiveTab('developer-35')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'developer-35'
                ? 'bg-emerald-700 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>2. 35 Developer Features List</span>
            <span className="px-1.5 py-0.2 bg-emerald-800 text-white rounded text-[10px] font-mono">
              35/35 Built
            </span>
          </button>
          <button
            onClick={() => setActiveTab('broker-22')}
            className={`px-3 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1.5 ${
              activeTab === 'broker-22'
                ? 'bg-purple-700 text-white'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>3. 22 Broker Features List</span>
            <span className="px-1.5 py-0.2 bg-purple-800 text-white rounded text-[10px] font-mono">
              22/22 Built
            </span>
          </button>
        </div>

        {/* Tab 1: Brief */}
        {activeTab === 'brief' && (
          <div className="flex-1 overflow-y-auto py-5 space-y-6 text-xs text-slate-700">
            {/* Executive Summary Card */}
            <div className="p-5 bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 rounded-xl text-white space-y-2 border border-emerald-900/50">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Sparkles className="w-4 h-4" />
                THE CORE BUSINESS PROPOSITION
              </div>
              <h3 className="text-base font-bold text-white font-display">
                Why Dubai Real Estate Developers Need This
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Dubai property developers receive thousands of WhatsApp messages every day from international buyers, hundreds of local brokerage agencies, and existing owners awaiting handover. Currently, developers lose 40% of qualified deals because sales teams respond hours late, brokers argue over commission attribution without lead timestamps, and existing owners flood sales staff with construction and snagging queries.
              </p>
              <p className="text-xs text-emerald-300 font-semibold pt-1">
                → AcrePulse AI solves this with ONE company WhatsApp number running 3 automated pipelines with instant human copilot takeover.
              </p>
            </div>

            {/* 3 Core Operational Pipelines */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wider">
                1. The 3 Core Operational Pipelines
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-900 block text-xs">A. Prospective Buyer Sales</span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Budget qualification, instant unit recommendations with floor plans, 60/40 payment-plan breakdown, branded PDF sales offers with 48h holds, and viewing appointment bookings.
                  </p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-900 block text-xs">B. Broker Network Management</span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    RERA agent verification, live daily inventory sheets via WhatsApp, 60-day client attribution locks to eliminate disputes, and client-ready offer generation.
                  </p>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                  <span className="font-bold text-slate-900 block text-xs">C. Owner Care & Snagging</span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">
                    Identity-verified access, construction milestone photo updates, DLD Escrow payment notices, and WhatsApp photo defect ticketing for site engineers.
                  </p>
                </div>
              </div>
            </div>

            {/* Deliverables for Figma Designer */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wider">
                2. Deliverables for Your Figma Designer
              </h3>
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div>
                    <strong className="text-slate-900">WhatsApp Simulator Viewport:</strong> Create a realistic WhatsApp chat frame with custom rich messages: Unit cards, PDF download pills, voice note waveforms, and interactive quick-reply buttons.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div>
                    <strong className="text-slate-900">Developer Control Dashboard:</strong> Clean, high-density SaaS console showing KPIs, live activity feed, and project construction milestone cards.
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div>
                    <strong className="text-slate-900">Shared Team Inbox with Copilot:</strong> 3-column desktop layout (Threads list, Message history, Customer CRM sidebar with internal consultant notes and Takeover toggle).
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    4
                  </div>
                  <div>
                    <strong className="text-slate-900">Automation Rule Builder:</strong> Visual 3-node flowchart: [1. Trigger from WhatsApp] → [2. Commercial Condition] → [3. Automated Action / Notification].
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                    5
                  </div>
                  <div>
                    <strong className="text-slate-900">Broker Attribution & Anti-Circumvention Desk:</strong> Table displaying client phone hashes, registering agency, 60-day expiry date, and duplicate claim alerts.
                  </div>
                </div>
              </div>
            </div>

            {/* Design Tokens */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900 font-display uppercase tracking-wider">
                3. Design System Color Tokens
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="w-full h-8 rounded bg-[#075E54] mb-2"></div>
                  <span className="font-semibold text-slate-900 block">WhatsApp Deep</span>
                  <span className="font-mono text-slate-500 text-[11px]">#075E54</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="w-full h-8 rounded bg-[#00A884] mb-2"></div>
                  <span className="font-semibold text-slate-900 block">WhatsApp Green</span>
                  <span className="font-mono text-slate-500 text-[11px]">#00A884</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="w-full h-8 rounded bg-[#0F172A] mb-2"></div>
                  <span className="font-semibold text-slate-900 block">Dubai Luxury Slate</span>
                  <span className="font-mono text-slate-500 text-[11px]">#0F172A</span>
                </div>
                <div className="p-3 bg-white rounded-lg border border-slate-200">
                  <div className="w-full h-8 rounded bg-[#D97706] mb-2"></div>
                  <span className="font-semibold text-slate-900 block">DLD Escrow Gold</span>
                  <span className="font-mono text-slate-500 text-[11px]">#D97706</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: 35 Developer Features */}
        {activeTab === 'developer-35' && (
          <div className="flex-1 overflow-y-auto py-4 space-y-3 text-xs">
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-emerald-950">WhatsApp AI Features for Developers</span>
                <p className="text-[11px] text-emerald-800">
                  All 35 numbered features from your uploaded developer feature list document.
                </p>
              </div>
              <span className="font-mono font-bold text-emerald-700 bg-white px-2 py-1 rounded border border-emerald-300">
                100% Prototyped
              </span>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
              {developerFeatures.map((f) => (
                <div key={f.id} className="p-3 hover:bg-slate-50 transition-colors flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                    {f.id}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{f.name}</span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                        {f.cat}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: 22 Broker Features */}
        {activeTab === 'broker-22' && (
          <div className="flex-1 overflow-y-auto py-4 space-y-3 text-xs">
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-purple-950">WhatsApp AI Features for Broker Companies</span>
                <p className="text-[11px] text-purple-800">
                  All 22 numbered features from your broker network specification document.
                </p>
              </div>
              <span className="font-mono font-bold text-purple-700 bg-white px-2 py-1 rounded border border-purple-300">
                100% Prototyped
              </span>
            </div>

            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden bg-white">
              {brokerFeatures.map((b) => (
                <div key={b.id} className="p-3 hover:bg-slate-50 transition-colors flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-purple-100 text-purple-800 font-bold font-mono flex items-center justify-center shrink-0 mt-0.5 text-[11px]">
                    {b.id}
                  </div>
                  <div className="flex-1">
                    <span className="font-bold text-slate-900">{b.name}</span>
                    <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Footer */}
        <div className="pt-4 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500 font-mono">
            Dubai Developer OS · One Company Number
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors shadow-xs"
            >
              {copied ? 'Copied!' : 'Copy Full Specification'}
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-xs font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
