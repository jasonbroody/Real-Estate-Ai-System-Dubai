import React, { useState } from 'react';
import { Header } from './components/Header';
import { DashboardOverview } from './components/DashboardOverview';
import { WhatsAppSimulator } from './components/WhatsAppSimulator';
import { SharedInbox } from './components/SharedInbox';
import { AutomationEngine } from './components/AutomationEngine';
import { InventoryManager } from './components/InventoryManager';
import { BrokerAttributionPortal } from './components/BrokerAttributionPortal';
import { OwnerServiceDesk } from './components/OwnerServiceDesk';
import { PartnerFigmaSpecModal } from './components/PartnerFigmaSpecModal';
import { ProjectUnit } from './types/realestate';
import { 
  Smartphone, 
  FileText, 
  ShieldCheck, 
  Sparkles, 
  MessageSquare,
  Building2,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isSpecModalOpen, setIsSpecModalOpen] = useState<boolean>(false);
  const [syncedUnit, setSyncedUnit] = useState<ProjectUnit | null>(null);

  const handleSendToWhatsApp = (unit: ProjectUnit) => {
    setSyncedUnit(unit);
    setActiveTab('simulator');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenSpecModal={() => setIsSpecModalOpen(true)}
        onOpenSimulator={() => setActiveTab('simulator')}
      />

      {/* Main Workspace Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Workspace Toolbar / Quick Context Strip */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-slate-700">Dubai Developer Portal:</span>
            <span className="font-mono text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Apex Developments LLC (RERA Reg #1042)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span className="font-mono">Meta Cloud API: Connected</span>
            </div>
            <span>·</span>
            <button
              onClick={() => setIsSpecModalOpen(true)}
              className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1"
            >
              <FileText className="w-3.5 h-3.5 text-amber-500" />
              Partner Brief & Figma Spec
            </button>
          </div>
        </div>

        {/* Tab Content Panes */}
        {activeTab === 'dashboard' && (
          <DashboardOverview
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenSimulator={() => setActiveTab('simulator')}
          />
        )}

        {activeTab === 'simulator' && (
          <WhatsAppSimulator
            onOfferGenerated={(unitCode) => {
              console.log('Offer generated for:', unitCode);
            }}
          />
        )}

        {activeTab === 'inbox' && <SharedInbox />}

        {activeTab === 'automations' && <AutomationEngine />}

        {activeTab === 'inventory' && (
          <InventoryManager onSendToWhatsApp={handleSendToWhatsApp} />
        )}

        {activeTab === 'brokers' && <BrokerAttributionPortal />}

        {activeTab === 'owners' && <OwnerServiceDesk />}
      </main>

      {/* Minimalist Professional Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 font-display">AcrePulse AI</span>
            <span>—</span>
            <span>WhatsApp Operating System for Dubai Real Estate Developers</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-600">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              DLD Escrow Compliant
            </span>
            <span>·</span>
            <button
              onClick={() => setIsSpecModalOpen(true)}
              className="hover:text-slate-900 transition-colors font-medium text-emerald-800"
            >
              Figma Designer Guidelines
            </button>
          </div>
        </div>
      </footer>

      {/* Partner & Figma Specification Modal */}
      <PartnerFigmaSpecModal
        isOpen={isSpecModalOpen}
        onClose={() => setIsSpecModalOpen(false)}
      />
    </div>
  );
}
