import React from 'react';
import { 
  MessageSquare, 
  LayoutDashboard, 
  GitBranch, 
  Building2, 
  Users, 
  Wrench, 
  FileText,
  Smartphone
} from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenSpecModal: () => void;
  onOpenSimulator: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenSpecModal,
  onOpenSimulator,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="flex items-center gap-2 text-left group"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center text-white shadow-xs">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-lg font-bold tracking-tight text-slate-900 font-display">
                  AcrePulse AI
                </span>
                <span className="hidden sm:inline-block ml-2 text-xs font-mono text-emerald-800 font-medium">
                  Dubai Developer OS
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'dashboard'
                  ? 'text-emerald-800 bg-emerald-50 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'simulator'
                  ? 'text-emerald-800 bg-emerald-50 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Smartphone className="w-4 h-4" />
              WhatsApp Simulator
            </button>

            <button
              onClick={() => setActiveTab('inbox')}
              className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'inbox'
                  ? 'text-emerald-800 bg-emerald-50 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              Team Inbox
            </button>

            <button
              onClick={() => setActiveTab('automations')}
              className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'automations'
                  ? 'text-emerald-800 bg-emerald-50 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <GitBranch className="w-4 h-4" />
              Automations
            </button>

            <button
              onClick={() => setActiveTab('inventory')}
              className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'inventory'
                  ? 'text-emerald-800 bg-emerald-50 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Building2 className="w-4 h-4" />
              Inventory & Offers
            </button>

            <button
              onClick={() => setActiveTab('brokers')}
              className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'brokers'
                  ? 'text-emerald-800 bg-emerald-50 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Users className="w-4 h-4" />
              Broker Attribution
            </button>

            <button
              onClick={() => setActiveTab('owners')}
              className={`px-3 py-2 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'owners'
                  ? 'text-emerald-800 bg-emerald-50 font-semibold'
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Wrench className="w-4 h-4" />
              Owner Care
            </button>
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onOpenSimulator}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-md transition-colors whitespace-nowrap shrink-0 border border-emerald-200"
            >
              <Smartphone className="w-3.5 h-3.5" />
              Live WhatsApp Test
            </button>

            <button
              onClick={onOpenSpecModal}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              Partner & Figma Spec
            </button>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Navigation Strip */}
        <div className="lg:hidden flex items-center gap-1 py-2 overflow-x-auto border-t border-slate-100 text-xs font-medium no-scrollbar">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'dashboard'
                ? 'text-emerald-800 bg-emerald-50 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Dashboard
          </button>

          <button
            onClick={() => setActiveTab('simulator')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'simulator'
                ? 'text-emerald-800 bg-emerald-50 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            WhatsApp Simulator
          </button>

          <button
            onClick={() => setActiveTab('inbox')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'inbox'
                ? 'text-emerald-800 bg-emerald-50 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Inbox
          </button>

          <button
            onClick={() => setActiveTab('automations')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'automations'
                ? 'text-emerald-800 bg-emerald-50 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <GitBranch className="w-3.5 h-3.5" />
            Automations
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'inventory'
                ? 'text-emerald-800 bg-emerald-50 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            Inventory
          </button>

          <button
            onClick={() => setActiveTab('brokers')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'brokers'
                ? 'text-emerald-800 bg-emerald-50 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            Brokers
          </button>

          <button
            onClick={() => setActiveTab('owners')}
            className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'owners'
                ? 'text-emerald-800 bg-emerald-50 font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            Owners
          </button>
        </div>
      </div>
    </header>
  );
};
