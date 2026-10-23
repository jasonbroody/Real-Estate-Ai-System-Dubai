import React, { useState } from 'react';
import { 
  Search, 
  User, 
  Building2, 
  ShieldCheck, 
  Send, 
  FileText, 
  Calendar, 
  CheckCheck, 
  Plus, 
  Sparkles, 
  UserCheck, 
  Phone,
  MessageSquare,
  Lock
} from 'lucide-react';
import { Conversation, WhatsAppMessage, AudienceType } from '../types/realestate';
import { INITIAL_CONVERSATIONS } from '../data/mockData';

export const SharedInbox: React.FC = () => {
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [selectedConvId, setSelectedConvId] = useState<string>(INITIAL_CONVERSATIONS[0].id);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [replyText, setReplyText] = useState<string>('');
  const [newNoteText, setNewNoteText] = useState<string>('');

  const activeConv = conversations.find(c => c.id === selectedConvId) || conversations[0];

  const filteredConversations = conversations.filter(c => {
    if (filterType === 'buyer' && c.contactType !== 'buyer') return false;
    if (filterType === 'broker' && c.contactType !== 'broker') return false;
    if (filterType === 'owner' && c.contactType !== 'owner') return false;
    if (filterType === 'human' && c.aiHandled) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.contactName.toLowerCase().includes(q) ||
        c.phoneNumber.includes(q) ||
        (c.projectInterest && c.projectInterest.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const handleToggleAi = (id: string) => {
    setConversations(prev =>
      prev.map(c => {
        if (c.id === id) {
          const newAi = !c.aiHandled;
          const statusMsg: WhatsAppMessage = {
            id: 'sys-' + Date.now(),
            sender: 'agent',
            senderName: newAi ? 'System AI Engine' : 'Zayed Al-Hashimi (Sales Consultant)',
            text: newAi 
              ? '🤖 AI Autopilot resumed by consultant.' 
              : '👤 Human Takeover: Zayed Al-Hashimi is now directly assisting this client.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            type: 'text',
          };
          return {
            ...c,
            aiHandled: newAi,
            messages: [...c.messages, statusMsg],
          };
        }
        return c;
      })
    );
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;

    const newMsg: WhatsAppMessage = {
      id: 'ag-' + Date.now(),
      sender: activeConv.aiHandled ? 'ai' : 'agent',
      senderName: activeConv.aiHandled ? 'Apex AI Bot' : 'Zayed Al-Hashimi (Sales Consultant)',
      text: replyText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    };

    setConversations(prev =>
      prev.map(c => {
        if (c.id === activeConv.id) {
          return {
            ...c,
            lastMessage: replyText,
            lastMessageTime: 'Just now',
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );
    setReplyText('');
  };

  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    setConversations(prev =>
      prev.map(c => {
        if (c.id === activeConv.id) {
          return {
            ...c,
            notes: [...c.notes, newNoteText.trim()],
          };
        }
        return c;
      })
    );
    setNewNoteText('');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden h-[740px] flex flex-col">
      {/* Top filter bar */}
      <div className="px-5 py-3 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-1.5 overflow-x-auto text-xs">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              filterType === 'all'
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            All Threads ({conversations.length})
          </button>
          <button
            onClick={() => setFilterType('buyer')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              filterType === 'buyer'
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Buyers ({conversations.filter(c => c.contactType === 'buyer').length})
          </button>
          <button
            onClick={() => setFilterType('broker')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              filterType === 'broker'
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Brokers ({conversations.filter(c => c.contactType === 'broker').length})
          </button>
          <button
            onClick={() => setFilterType('owner')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              filterType === 'owner'
                ? 'bg-slate-900 text-white font-semibold'
                : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
            }`}
          >
            Owners ({conversations.filter(c => c.contactType === 'owner').length})
          </button>
          <button
            onClick={() => setFilterType('human')}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap ${
              filterType === 'human'
                ? 'bg-amber-500 text-slate-900 font-bold'
                : 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200'
            }`}
          >
            Human Takeover ({conversations.filter(c => !c.aiHandled).length})
          </button>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search phone or name..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
          />
        </div>
      </div>

      {/* 3-Pane Inbox Layout */}
      <div className="grid grid-cols-12 flex-1 overflow-hidden divide-x divide-slate-200">
        {/* Left Pane: Conversation List (3.5 cols) */}
        <div className="col-span-12 sm:col-span-4 lg:col-span-3.5 overflow-y-auto divide-y divide-slate-100">
          {filteredConversations.map((conv) => {
            const isSelected = conv.id === activeConv.id;
            return (
              <button
                key={conv.id}
                onClick={() => setSelectedConvId(conv.id)}
                className={`w-full text-left p-3.5 transition-colors flex items-start gap-3 ${
                  isSelected ? 'bg-emerald-50/60' : 'hover:bg-slate-50'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  {conv.contactName.substring(0, 2).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-xs font-bold text-slate-900 truncate">
                      {conv.contactName}
                    </span>
                    <span className="text-[10px] text-slate-400 whitespace-nowrap">
                      {conv.lastMessageTime}
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 font-mono truncate">
                    {conv.phoneNumber}
                  </p>

                  <p className="text-xs text-slate-600 truncate mt-1">
                    {conv.lastMessage}
                  </p>

                  <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                      {conv.contactType}
                    </span>

                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                      conv.aiHandled
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800 font-bold'
                    }`}>
                      {conv.aiHandled ? 'AI Handling' : 'Human Active'}
                    </span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Center Pane: Active Message Thread (5.5 cols) */}
        <div className="hidden sm:flex col-span-8 lg:col-span-5.5 flex-col h-full bg-[#FAFBFB]">
          {/* Conversation Header */}
          <div className="p-3.5 border-b border-slate-200 bg-white flex items-center justify-between shrink-0">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  {activeConv.contactName}
                </h3>
                <span className="text-xs font-mono text-slate-500">
                  {activeConv.phoneNumber}
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                {activeConv.agencyName ? activeConv.agencyName + ' · ' : ''}
                {activeConv.projectInterest || 'General Developer Inquiry'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggleAi(activeConv.id)}
                className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-colors flex items-center gap-1.5 ${
                  activeConv.aiHandled
                    ? 'bg-amber-100 text-amber-900 hover:bg-amber-200'
                    : 'bg-emerald-700 text-white hover:bg-emerald-800'
                }`}
              >
                {activeConv.aiHandled ? (
                  <>
                    <UserCheck className="w-3.5 h-3.5" />
                    Take Over (Pause AI)
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Resume AI Autopilot
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Messages list */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {activeConv.messages.map((m) => {
              const isUser = m.sender === 'user';
              const isAgent = m.sender === 'agent';
              return (
                <div
                  key={m.id}
                  className={`flex ${isUser ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-xl px-3.5 py-2.5 shadow-2xs text-xs relative ${
                      isUser
                        ? 'bg-white border border-slate-200 text-slate-900'
                        : isAgent
                        ? 'bg-blue-600 text-white'
                        : 'bg-emerald-700 text-white'
                    }`}
                  >
                    {!isUser && (
                      <div className="text-[10px] font-mono text-slate-200 mb-1">
                        {isAgent ? (m.senderName || 'Internal Consultant') : 'Apex WhatsApp AI'}
                      </div>
                    )}
                    <div className="whitespace-pre-line leading-relaxed">
                      {m.text}
                    </div>
                    <div className="text-[9px] text-right mt-1 opacity-70">
                      {m.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Response Copilot Bar */}
          <div className="px-3 py-2 bg-slate-100 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs shrink-0">
            <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">
              Copilot:
            </span>
            <button
              onClick={() => setReplyText('I have locked your temporary hold for 48 hours. Let me know if you would like me to prepare the SPA documents.')}
              className="px-2 py-1 bg-white hover:bg-slate-200 rounded border border-slate-300 text-slate-700 whitespace-nowrap"
            >
              Confirm 48h Hold
            </button>
            <button
              onClick={() => setReplyText('Here is our verified DLD Escrow Account for Emirates NBD: DLD-ESC-2024-8841. All deposits are protected under RERA.')}
              className="px-2 py-1 bg-white hover:bg-slate-200 rounded border border-slate-300 text-slate-700 whitespace-nowrap"
            >
              Send Escrow Info
            </button>
            <button
              onClick={() => setReplyText('Our VIP showroom car can pick you up tomorrow at 3:00 PM. Please send your location pin.')}
              className="px-2 py-1 bg-white hover:bg-slate-200 rounded border border-slate-300 text-slate-700 whitespace-nowrap"
            >
              Book Chauffeur
            </button>
          </div>

          {/* Message input */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2 shrink-0">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendReply()}
              placeholder={
                activeConv.aiHandled
                  ? 'Send message via AI Bot channel...'
                  : 'Reply directly as Human Consultant...'
              }
              className="flex-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
            <button
              onClick={handleSendReply}
              className="p-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg transition-colors shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Pane: Contact Intelligence & Internal CRM Notes (3 cols) */}
        <div className="hidden lg:block col-span-3 p-4 overflow-y-auto space-y-4 bg-white">
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              Lead Intelligence & CRM
            </h4>
            <div className="mt-3 space-y-2 text-xs">
              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500 block text-[10px]">Current Pipeline Stage</span>
                <span className="font-bold text-emerald-800 text-xs">
                  {activeConv.stage}
                </span>
              </div>

              {activeConv.budgetAed && (
                <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-[10px]">Qualified Budget</span>
                  <span className="font-mono font-bold text-slate-900 text-xs tabular-nums">
                    AED {activeConv.budgetAed.toLocaleString()}
                  </span>
                </div>
              )}

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100">
                <span className="text-slate-500 block text-[10px]">Assigned Internal Officer</span>
                <span className="font-semibold text-slate-800 text-xs">
                  {activeConv.assignedAgent || 'Unassigned (AI Queue)'}
                </span>
              </div>
            </div>
          </div>

          {/* Lead Tags */}
          <div>
            <span className="text-xs font-bold text-slate-900 block mb-2">
              Behavioral Tags
            </span>
            <div className="flex flex-wrap gap-1">
              {activeConv.tags.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Internal Notes */}
          <div className="pt-3 border-t border-slate-200">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
              Internal Team Notes
            </h4>
            <div className="space-y-1.5 mb-3">
              {activeConv.notes.map((note, idx) => (
                <div
                  key={idx}
                  className="p-2 bg-amber-50 rounded border border-amber-200/80 text-[11px] text-amber-950"
                >
                  {note}
                </div>
              ))}
            </div>

            <div className="flex gap-1.5">
              <input
                type="text"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
                placeholder="Add private note..."
                className="flex-1 px-2.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded focus:outline-none focus:ring-1 focus:ring-emerald-600"
              />
              <button
                onClick={handleAddNote}
                className="p-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
