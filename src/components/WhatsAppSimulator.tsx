import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  CheckCheck, 
  User, 
  Building2, 
  FileText, 
  Calendar, 
  ShieldCheck, 
  Volume2, 
  Play, 
  Pause, 
  Sparkles, 
  RotateCcw,
  Download,
  Eye,
  ExternalLink,
  Lock,
  ArrowRight
} from 'lucide-react';
import { WhatsAppMessage, AudienceType } from '../types/realestate';
import { IMAGES } from '../data/mockData';

interface WhatsAppSimulatorProps {
  onOfferGenerated?: (unit: string) => void;
}

export const WhatsAppSimulator: React.FC<WhatsAppSimulatorProps> = ({ onOfferGenerated }) => {
  const [selectedPersona, setSelectedPersona] = useState<AudienceType>('buyer');
  const [inputText, setInputText] = useState('');
  const [isAiAutopilot, setIsAiAutopilot] = useState(true);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [showOfferPreview, setShowOfferPreview] = useState(false);
  const [activeOfferUnit, setActiveOfferUnit] = useState<any>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Scenarios per persona
  const initialBuyerMessages: WhatsAppMessage[] = [
    {
      id: 'b1',
      sender: 'user',
      text: 'Hello, I saw your new waterfront launch in Dubai Harbour. Do you have 2-bedroom units available with sea or marina view?',
      timestamp: '10:35 AM',
      type: 'text',
    },
    {
      id: 'b2',
      sender: 'ai',
      text: 'Marhaba & Welcome to Apex Dubai Developments! 🌊 Yes, Skyline Bay Residences at Dubai Harbour features signature 2-bedroom units directly overlooking the mega-yacht marina and Palm Jumeirah.\n\nCould you kindly confirm your preferred budget range and whether this is for high-yield rental investment or private holiday use?',
      timestamp: '10:36 AM',
      type: 'text',
    },
    {
      id: 'b3',
      sender: 'user',
      text: 'Budget is around 2.8M to 3.2M AED. Looking for investment with personal holiday use. What is the down payment?',
      timestamp: '10:37 AM',
      type: 'text',
    },
    {
      id: 'b4',
      sender: 'ai',
      text: 'Unit 1804 (Tower B) is an exact match for your investment thesis! Here is the unit breakdown and floor specification:',
      timestamp: '10:38 AM',
      type: 'unit_card',
      unitData: {
        project: 'Skyline Bay Residences',
        unitNo: 'Tower B - 1804',
        beds: 2,
        sizeSqFt: 1420,
        priceAed: 2850000,
        paymentPlan: '60/40 Construction-linked (20% Down = AED 570,000)',
        handover: 'Q4 2027',
        image: IMAGES.waterfrontTower,
      },
    },
    {
      id: 'b5',
      sender: 'ai',
      text: 'Here is your official approved brochure & floor plan layout document directly from our engineering team:',
      timestamp: '10:39 AM',
      type: 'document',
      documentTitle: 'Skyline_Bay_Unit1804_Executive_Brochure.pdf',
      documentSize: '4.2 MB',
    },
    {
      id: 'b6',
      sender: 'user',
      text: 'Looks fantastic! Can you place a hold on Unit 1804 and send me the official developer sales offer? I can visit your sales gallery this Friday.',
      timestamp: '10:41 AM',
      type: 'text',
    },
    {
      id: 'b7',
      sender: 'ai',
      text: '✅ Unit 1804 is now on an authorised 48-hour temporary hold. I have generated your branded developer sales offer with offer ref #SB-OFFER-9912.\n\n📅 Your VIP viewing with Senior Consultant Zayed Al-Hashimi is confirmed for Friday at 4:00 PM at our Dubai Harbour Sales Pavilion.',
      timestamp: '10:42 AM',
      type: 'interactive_buttons',
      buttons: ['View Official Offer PDF', 'Confirm Friday 4:00 PM Viewing', 'Escrow Payment Guidance'],
    },
  ];

  const initialBrokerMessages: WhatsAppMessage[] = [
    {
      id: 'br1',
      sender: 'user',
      text: 'Hi Developer team, Elena from Driven Properties. I have a buyer looking for a 5-bed villa in Dubai Hills under 9M AED. Can I register him and get the current live availability sheet?',
      timestamp: '09:10 AM',
      type: 'text',
    },
    {
      id: 'br2',
      sender: 'ai',
      text: 'Marhaba Elena! 🤝 Driven Properties (RERA BRN #48291) is an approved Agency Partner. Let us verify your client and protect your commission attribution under developer rules.',
      timestamp: '09:11 AM',
      type: 'text',
    },
    {
      id: 'br3',
      sender: 'ai',
      text: 'Here is the timestamped Live Inventory Snapshot generated today at 09:12 AM GST:',
      timestamp: '09:12 AM',
      type: 'document',
      documentTitle: 'The_Sanctuary_DubaiHills_LiveInventory_21OCT.pdf',
      documentSize: '1.8 MB',
    },
    {
      id: 'br4',
      sender: 'user',
      text: 'Client name: Dr. Mikhail Volkov, phone: +971 52 981 7722. He loved Lot #14 facing the lake. Please confirm attribution.',
      timestamp: '09:14 AM',
      type: 'text',
    },
    {
      id: 'br5',
      sender: 'ai',
      text: '🛡️ Duplicate check passed! Client registration confirmed for Dr. Mikhail Volkov.\n\n• Attribution Reference: REG-DP-2026-904\n• Exclusivity Lock: 60 Days (Protected until 20 Dec 2026)\n• Commission Eligibility: 2.5% upon 10% booking clearance\n\nNo other agency can claim this buyer during this window.',
      timestamp: '09:15 AM',
      type: 'interactive_buttons',
      buttons: ['Generate Client-Ready Offer', 'Book Joint Broker Briefing', 'Download RERA Form B'],
    },
  ];

  const initialOwnerMessages: WhatsAppMessage[] = [
    {
      id: 'ow1',
      sender: 'user',
      text: 'مرحباً، أنا مالك الوحدة 1402 في مشروع سكاي لاين باي. أود معرفة نسبة إنجاز البناء وموعد سداد الدفعة القادمة.',
      timestamp: 'Yesterday 2:15 PM',
      type: 'text',
    },
    {
      id: 'ow2',
      sender: 'ai',
      text: 'أهلاً وسهلاً بك سيد ناصر! 🏢 تم التحقق من ملكيتك للوحدة 1402.\n\n📊 نسبة الإنجاز الحالية للمشروع: 38% (تم الانتهاء من الهيكل الخرساني والبدء بأعمال الواجهات الزجاجية).\n\n💳 إشعار الدفعة القادمة: استحقاق دفعة الـ 10% بمبلغ 245,000 درهم بحلول 15 نوفمبر 2026 عبر حساب الضمان العقاري المعتمد لدى دائرة الأراضي والأملاك (Escrow No: DLD-ESC-2024-8841).',
      timestamp: 'Yesterday 2:16 PM',
      type: 'text',
    },
    {
      id: 'ow3',
      sender: 'user',
      text: 'هل يمكنني حجز موعد لمعاينة الوحدة وتسليم ملاحظات الفحص (Snagging)؟ قمت بتصوير بعض الملاحظات على شرفة غرفة النوم.',
      timestamp: 'Yesterday 2:20 PM',
      type: 'voice',
      voiceDuration: '0:24',
      voiceTranscript: 'السلام عليكم، أرسلت صوراً للملاحظات الخاصة بدهان باب الشرفة، وأريد معرفة متى يزور المهندس الموقع للإصلاح.',
    },
    {
      id: 'ow4',
      sender: 'agent',
      senderName: 'Fatima Al-Nuaimi (Handover Officer)',
      text: 'مرحباً سيد ناصر، قمت بتولي المحادثة لمساعدتك شخصياً. تم فتح تذكرة الفحص رقم #SNAG-442 وحجز موعد المهندس المختص يوم الأحد القادم الساعة 11:00 صباحاً.',
      timestamp: 'Yesterday 2:24 PM',
      type: 'text',
    },
  ];

  const [buyerMessages, setBuyerMessages] = useState<WhatsAppMessage[]>(initialBuyerMessages);
  const [brokerMessages, setBrokerMessages] = useState<WhatsAppMessage[]>(initialBrokerMessages);
  const [ownerMessages, setOwnerMessages] = useState<WhatsAppMessage[]>(initialOwnerMessages);

  const currentMessages = 
    selectedPersona === 'buyer' ? buyerMessages :
    selectedPersona === 'broker' ? brokerMessages : ownerMessages;

  const setCurrentMessages = (updater: (prev: WhatsAppMessage[]) => WhatsAppMessage[]) => {
    if (selectedPersona === 'buyer') setBuyerMessages(updater);
    else if (selectedPersona === 'broker') setBrokerMessages(updater);
    else setOwnerMessages(updater);
  };

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMsg: WhatsAppMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text',
    };

    setCurrentMessages(prev => [...prev, userMsg]);
    const query = inputText.toLowerCase();
    setInputText('');

    if (!isAiAutopilot) {
      // In human takeover, no automatic response unless user toggles AI back on
      return;
    }

    // Dynamic AI response simulation based on domain rules
    setTimeout(() => {
      let aiResponse: WhatsAppMessage;

      if (query.includes('offer') || query.includes('pdf') || query.includes('sales offer')) {
        aiResponse = {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: 'Here is your official Branded Developer Sales Offer. Generated with current pricing, approved payment terms, and 48h validity guarantee:',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'interactive_buttons',
          buttons: ['View Branded Offer PDF', 'Share with Client', 'Request Escrow Payment Link'],
        };
      } else if (query.includes('payment') || query.includes('escrow') || query.includes('dld')) {
        aiResponse = {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: 'All developer payments are strictly processed via Dubai Land Department (DLD) approved Escrow accounts:\n\n• Bank: Emirates NBD\n• Beneficiary: Apex Developments Escrow\n• Escrow Account: DLD-ESC-2024-8841\n• Validated by Dubai RERA regulatory portal.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text',
        };
      } else if (query.includes('snag') || query.includes('defect') || query.includes('repair')) {
        aiResponse = {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: '✅ Snagging ticket #SNAG-445 has been created directly in our Quality & Handover ERP. Our QA inspection engineer will arrive within 48 hours. You will receive real-time photo confirmation once rectified.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text',
        };
      } else if (query.includes('compare')) {
        aiResponse = {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: 'Comparative Breakdown:\n\n• Unit 1804 (2-Bed): AED 2,850,000 | 1,420 sqft | Marina View | AED 2,007/sqft | Expected Net ROI: 7.9%\n• Unit 2402 (3-Bed): AED 4,600,000 | 2,150 sqft | Palm View | AED 2,139/sqft | Expected Net ROI: 8.2%\n\nBoth include 2 covered parking bays and 60/40 payment terms.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text',
        };
      } else {
        aiResponse = {
          id: 'ai-' + Date.now(),
          sender: 'ai',
          text: `Thank you for your inquiry. Our AI has recorded this in the developer system. Would you like me to connect you directly to our lead project consultant, or send the latest availability schedule?`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'interactive_buttons',
          buttons: ['Speak to Project Consultant', 'Send WhatsApp Inventory Sheet', 'Book Sales Gallery Visit'],
        };
      }

      setCurrentMessages(prev => [...prev, aiResponse]);
    }, 900);
  };

  const handleReset = () => {
    if (selectedPersona === 'buyer') setBuyerMessages(initialBuyerMessages);
    else if (selectedPersona === 'broker') setBrokerMessages(initialBrokerMessages);
    else setOwnerMessages(initialOwnerMessages);
  };

  const handleOpenOffer = (unitData?: any) => {
    setActiveOfferUnit(unitData || {
      project: 'Skyline Bay Residences',
      unitNo: 'Tower B - 1804',
      beds: 2,
      sizeSqFt: 1420,
      priceAed: 2850000,
      paymentPlan: '60/40 Construction-linked',
      handover: 'Q4 2027',
      image: IMAGES.waterfrontTower,
    });
    setShowOfferPreview(true);
    onOfferGenerated?.('Tower B - 1804');
  };

  return (
    <div className="space-y-6">
      {/* Control Strip & Persona Selector */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              Live WhatsApp Automation Simulator
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Experience the developer's official WhatsApp number serving 3 core audiences 24/7.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Persona Switcher */}
            <div className="inline-flex p-1 bg-slate-100 rounded-lg text-xs font-medium">
              <button
                onClick={() => setSelectedPersona('buyer')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  selectedPersona === 'buyer'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                1. Buyer (Sales & Qualification)
              </button>
              <button
                onClick={() => setSelectedPersona('broker')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  selectedPersona === 'broker'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                2. Broker (Attribution & Offers)
              </button>
              <button
                onClick={() => setSelectedPersona('owner')}
                className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  selectedPersona === 'owner'
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                3. Owner (Construction & Snagging)
              </button>
            </div>

            {/* Reset button */}
            <button
              onClick={handleReset}
              title="Reset conversation flow"
              className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Simulator Feature Banner */}
        <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">Official Number:</span>
            <span className="font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              +971 4 800 2739 (Apex Developer Verified)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">Control Mode:</span>
            <button
              onClick={() => setIsAiAutopilot(!isAiAutopilot)}
              className={`px-2.5 py-0.5 rounded font-medium transition-colors ${
                isAiAutopilot 
                  ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200' 
                  : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
              }`}
            >
              {isAiAutopilot ? 'AI Autopilot Active (94% containment)' : 'Human Takeover Paused AI'}
            </button>
          </div>

          <div className="flex items-center gap-2 sm:justify-end">
            <span className="text-slate-500">Escrow Security:</span>
            <span className="text-slate-700 font-medium">Dubai RERA Compliant</span>
          </div>
        </div>
      </div>

      {/* Main Simulator Viewport */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: WhatsApp Mobile / Web Interface (7 cols) */}
        <div className="lg:col-span-7 bg-[#EFEAE2] border border-slate-300 rounded-2xl shadow-md overflow-hidden flex flex-col h-[700px]">
          {/* WhatsApp Header */}
          <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-800 border-2 border-emerald-400/40 flex items-center justify-center font-bold text-sm text-white">
                AP
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-sm tracking-wide">
                    Apex Developments Dubai
                  </h3>
                  <ShieldCheck className="w-4 h-4 text-emerald-300 fill-emerald-300/30" />
                </div>
                <div className="text-[11px] text-emerald-100 flex items-center gap-1.5">
                  <span>Official Business Account</span>
                  <span>·</span>
                  <span className="text-emerald-200 font-mono">
                    {isAiAutopilot ? 'AI 24/7 Agent Online' : 'Human Consultant Active'}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAiAutopilot(!isAiAutopilot)}
                className={`text-xs px-2.5 py-1 rounded transition-colors font-medium ${
                  isAiAutopilot
                    ? 'bg-emerald-800/80 hover:bg-emerald-800 text-emerald-100'
                    : 'bg-amber-500 text-slate-900 hover:bg-amber-400 font-bold'
                }`}
              >
                {isAiAutopilot ? 'Take Over Chat' : 'Resume AI'}
              </button>
            </div>
          </div>

          {/* Persona Context Kicker */}
          <div className="bg-amber-50/90 border-b border-amber-200 px-4 py-1.5 text-xs text-amber-900 flex items-center justify-between">
            <span className="font-medium">
              Active Simulation:{' '}
              {selectedPersona === 'buyer' && 'Prospective International Investor (Dr. Tariq Al-Mansoor)'}
              {selectedPersona === 'broker' && 'Approved RERA Broker (Elena Rostova - Driven Properties)'}
              {selectedPersona === 'owner' && 'Verified Property Owner (Nasser Al-Qasimi - Unit 1402)'}
            </span>
            <span className="text-[11px] text-amber-800/80 font-mono">
              WhatsApp Cloud API Webhook v20.0
            </span>
          </div>

          {/* Chat Messages Canvas */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm">
            {/* Encryption notice */}
            <div className="flex justify-center">
              <div className="bg-amber-100/90 text-amber-900 text-[11px] px-3 py-1 rounded-md shadow-2xs max-w-sm text-center leading-relaxed">
                <Lock className="w-3 h-3 inline mr-1 text-amber-800" />
                Messages and calls are end-to-end encrypted. One verified official number for all buyer sales, broker attribution, and owner handover.
              </div>
            </div>

            {currentMessages.map((msg) => {
              const isUser = msg.sender === 'user';
              const isAgent = msg.sender === 'agent';

              return (
                <div
                  key={msg.id}
                  className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-lg px-3.5 py-2 shadow-2xs relative ${
                      isUser
                        ? 'bg-[#E7FFDB] text-slate-900 rounded-tr-none'
                        : isAgent
                        ? 'bg-blue-50 border border-blue-200 text-slate-900 rounded-tl-none'
                        : 'bg-white text-slate-900 rounded-tl-none'
                    }`}
                  >
                    {/* Agent Takeover badge */}
                    {isAgent && (
                      <div className="text-[11px] font-semibold text-blue-700 mb-1 flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {msg.senderName || 'Human Sales Consultant'}
                      </div>
                    )}

                    {/* AI badge */}
                    {msg.sender === 'ai' && (
                      <div className="text-[11px] font-semibold text-emerald-800 mb-1 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-emerald-600" />
                        Apex Developer AI Engine
                      </div>
                    )}

                    {/* Message Body text */}
                    <div className="whitespace-pre-line leading-relaxed text-[13px] text-slate-800">
                      {msg.text}
                    </div>

                    {/* Unit Card attachment */}
                    {msg.type === 'unit_card' && msg.unitData && (
                      <div className="mt-2.5 bg-slate-50 border border-slate-200 rounded-lg overflow-hidden">
                        <img
                          src={msg.unitData.image}
                          alt={msg.unitData.unitNo}
                          className="w-full h-32 object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="p-3 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900 text-xs">
                              {msg.unitData.unitNo} · {msg.unitData.beds} Bedroom
                            </span>
                            <span className="font-mono text-emerald-700 font-bold text-xs tabular-nums">
                              AED {msg.unitData.priceAed.toLocaleString()}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-600">
                            {msg.unitData.project} · {msg.unitData.sizeSqFt} sq.ft · Handover {msg.unitData.handover}
                          </p>
                          <div className="text-[11px] text-slate-500 font-mono">
                            Plan: {msg.unitData.paymentPlan}
                          </div>
                          <div className="pt-2 flex gap-2">
                            <button
                              onClick={() => handleOpenOffer(msg.unitData)}
                              className="w-full py-1.5 px-3 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded transition-colors flex items-center justify-center gap-1"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              View Branded Offer PDF
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Document attachment */}
                    {msg.type === 'document' && (
                      <div className="mt-2 bg-slate-100/90 border border-slate-200 rounded-md p-2.5 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <div className="w-8 h-8 rounded bg-red-100 text-red-700 flex items-center justify-center shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <p className="text-xs font-semibold text-slate-900 truncate">
                              {msg.documentTitle}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {msg.documentSize} · Official Developer Spec
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleOpenOffer()}
                          className="shrink-0 p-1.5 hover:bg-white rounded text-slate-700 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    )}

                    {/* Voice note simulation */}
                    {msg.type === 'voice' && (
                      <div className="mt-2 bg-slate-50 border border-slate-200 rounded-lg p-2.5 space-y-2">
                        <div className="flex items-center gap-2.5">
                          <button
                            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                            className="w-8 h-8 rounded-full bg-emerald-700 hover:bg-emerald-800 text-white flex items-center justify-center transition-colors shrink-0"
                          >
                            {isPlayingAudio ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                          </button>
                          <div className="flex-1">
                            <div className="flex items-center gap-1 h-4">
                              {[40, 70, 30, 90, 60, 45, 80, 50, 75, 95, 30, 60, 85, 40, 65, 35].map((h, i) => (
                                <span
                                  key={i}
                                  style={{ height: `${h}%` }}
                                  className={`w-1 rounded-full ${
                                    isPlayingAudio && i < 8 ? 'bg-emerald-600' : 'bg-slate-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                              <span>Voice Note ({msg.voiceDuration || '0:24'})</span>
                              <span className="text-emerald-700 font-medium">Bilingual Arabic/English AI</span>
                            </div>
                          </div>
                        </div>
                        {msg.voiceTranscript && (
                          <div className="text-[11px] text-slate-600 bg-white p-2 rounded border border-slate-200 italic">
                            <span className="font-semibold text-slate-700 not-italic">Transcript: </span>
                            "{msg.voiceTranscript}"
                          </div>
                        )}
                      </div>
                    )}

                    {/* Interactive buttons */}
                    {msg.buttons && (
                      <div className="mt-2.5 pt-2 border-t border-slate-200/80 space-y-1.5">
                        {msg.buttons.map((btnText, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              if (btnText.includes('PDF') || btnText.includes('Offer')) {
                                handleOpenOffer();
                              } else {
                                setInputText(btnText);
                              }
                            }}
                            className="w-full text-center py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded border border-emerald-200 transition-colors"
                          >
                            {btnText}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Timestamp & read receipts */}
                    <div className="flex items-center justify-end gap-1 mt-1 text-[10px] text-slate-400">
                      <span>{msg.timestamp}</span>
                      {isUser && <CheckCheck className="w-3.5 h-3.5 text-blue-500" />}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={chatBottomRef} />
          </div>

          {/* Quick preset suggestions for presentation */}
          <div className="bg-[#F0F2F5] px-3 py-1.5 border-t border-slate-200 overflow-x-auto flex items-center gap-1.5 text-xs shrink-0">
            <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap">
              Test Prompts:
            </span>
            {selectedPersona === 'buyer' && (
              <>
                <button
                  onClick={() => setInputText('Compare Unit 1804 and Unit 2402')}
                  className="px-2 py-0.5 bg-white hover:bg-slate-100 text-slate-700 rounded border border-slate-300 whitespace-nowrap"
                >
                  Compare Units
                </button>
                <button
                  onClick={() => setInputText('What is the DLD Escrow payment procedure?')}
                  className="px-2 py-0.5 bg-white hover:bg-slate-100 text-slate-700 rounded border border-slate-300 whitespace-nowrap"
                >
                  Escrow Info
                </button>
                <button
                  onClick={() => handleOpenOffer()}
                  className="px-2 py-0.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded border border-emerald-300 whitespace-nowrap font-medium"
                >
                  Generate Offer PDF
                </button>
              </>
            )}

            {selectedPersona === 'broker' && (
              <>
                <button
                  onClick={() => setInputText('Send live stock sheet for The Sanctuary')}
                  className="px-2 py-0.5 bg-white hover:bg-slate-100 text-slate-700 rounded border border-slate-300 whitespace-nowrap"
                >
                  Stock Sheet PDF
                </button>
                <button
                  onClick={() => setInputText('Register client Dr. Mikhail Volkov (+971 52 981 7722)')}
                  className="px-2 py-0.5 bg-white hover:bg-slate-100 text-slate-700 rounded border border-slate-300 whitespace-nowrap"
                >
                  Lead Attribution Lock
                </button>
              </>
            )}

            {selectedPersona === 'owner' && (
              <>
                <button
                  onClick={() => setInputText('What is the latest construction percentage for Unit 1402?')}
                  className="px-2 py-0.5 bg-white hover:bg-slate-100 text-slate-700 rounded border border-slate-300 whitespace-nowrap"
                >
                  Construction Status
                </button>
                <button
                  onClick={() => setInputText('Submit snagging defect for master balcony')}
                  className="px-2 py-0.5 bg-white hover:bg-slate-100 text-slate-700 rounded border border-slate-300 whitespace-nowrap"
                >
                  Log Snagging Ticket
                </button>
              </>
            )}
          </div>

          {/* Chat Input Bar */}
          <div className="bg-[#F0F2F5] px-3 py-2.5 flex items-center gap-2 shrink-0">
            <button className="p-1.5 text-slate-500 hover:text-slate-700 rounded-full hover:bg-slate-200">
              <Paperclip className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={
                isAiAutopilot
                  ? 'Type as client/broker/owner (e.g. "Send payment plan")...'
                  : 'Type as Human Consultant Zayed Al-Hashimi...'
              }
              className="flex-1 bg-white rounded-lg px-3.5 py-2 text-sm text-slate-900 border border-slate-300 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
            <button
              onClick={handleSend}
              className="w-10 h-10 rounded-full bg-[#00A884] hover:bg-[#008f70] text-white flex items-center justify-center transition-colors shrink-0"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>

        {/* Right: Developer Automation & Backend Intelligence Panel (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Real-time AI Lead Qualification Box */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-bold text-slate-900 font-display flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                Live Conversation Intelligence
              </h3>
              <span className="text-[11px] font-mono text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                AI Tagged
              </span>
            </div>

            <div className="mt-3.5 space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">Stakeholder Type</span>
                  <span className="font-semibold text-slate-900 capitalize">
                    {selectedPersona} {selectedPersona === 'broker' && '(Driven Properties)'}
                  </span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <span className="text-slate-500 block text-[11px]">Intent Score</span>
                  <span className="font-mono font-bold text-emerald-700">96 / 100 (Hot Lead)</span>
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1">
                <span className="text-slate-500 block text-[11px]">Qualified Parameters</span>
                <div className="flex flex-wrap gap-1.5 pt-1 text-[11px]">
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700 font-mono">
                    Budget: AED 2.8M - 3.2M
                  </span>
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700">
                    2 Bedrooms
                  </span>
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700">
                    Marina View
                  </span>
                  <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-700">
                    Cash + Construction Plan
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <span className="text-slate-500 block text-[11px]">Assigned Internal Sales Executive</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-semibold text-slate-900">Zayed Al-Hashimi</span>
                  <span className="text-[11px] text-slate-500 font-mono">Senior Luxury Broker</span>
                </div>
              </div>
            </div>

            {/* Quick Actions for Consultant */}
            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-semibold text-slate-500 block">
                Consultant Quick Copilot Actions
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleOpenOffer()}
                  className="p-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200 transition-colors text-left flex items-center justify-between"
                >
                  <span>Send Offer PDF</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    const msg: WhatsAppMessage = {
                      id: 'ag-' + Date.now(),
                      sender: 'agent',
                      senderName: 'Zayed Al-Hashimi (Sales)',
                      text: 'I have reserved our VIP show suite for you this Friday at 4:00 PM. Our chauffeur can also pick you up from Downtown or the airport.',
                      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                      type: 'text',
                    };
                    setCurrentMessages(prev => [...prev, msg]);
                  }}
                  className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-lg border border-slate-200 transition-colors text-left flex items-center justify-between"
                >
                  <span>VIP Chauffeur Slot</span>
                  <Calendar className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Triggered Automation Audit Trail */}
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 font-display mb-3">
              Triggered Developer Automations
            </h3>
            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 bg-emerald-50/70 rounded-lg border border-emerald-200 flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-emerald-950">
                    Rule #1: Auto-Hold & Branded PDF Offer Generation
                  </p>
                  <p className="text-[11px] text-emerald-800/80 mt-0.5">
                    Triggered when buyer requested hold on Unit 1804. Locked in inventory database for 48 hours.
                  </p>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    Rule #2: 60-Day Anti-Circumvention Attribution
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Lead hash matched to Driven Properties. Lead protected from broker duplicate claims.
                  </p>
                </div>
              </div>

              <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5 text-[10px] font-bold">
                  ✓
                </div>
                <div>
                  <p className="font-semibold text-slate-900">
                    Rule #3: DLD Escrow Bank Routing Verification
                  </p>
                  <p className="text-[11px] text-slate-600 mt-0.5">
                    Payment links restricted to verified Emirates NBD Trust Account (DLD-ESC-2024-8841).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Branded Offer PDF Preview Modal */}
      {showOfferPreview && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-800 text-white flex items-center justify-center font-bold text-xs">
                  AP
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    Official Branded Sales Offer Document
                  </h3>
                  <p className="text-xs text-slate-500">
                    Generated via WhatsApp AI Engine · Ref #SB-OFFER-9912
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowOfferPreview(false)}
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 space-y-6">
              {/* Developer Header Banner */}
              <div className="bg-slate-900 text-white p-5 rounded-xl flex items-center justify-between">
                <div>
                  <span className="text-xs text-amber-400 uppercase tracking-widest font-mono">
                    APEX DEVELOPMENTS DUBAI
                  </span>
                  <h4 className="text-xl font-bold font-display mt-0.5">
                    {activeOfferUnit.project || 'Skyline Bay Residences'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    Dubai Harbour Waterfront Marina · Handover {activeOfferUnit.handover || 'Q4 2027'}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-mono">Valid Until</span>
                  <span className="text-xs font-bold text-emerald-400 font-mono">
                    23 Oct 2026, 10:42 AM GST
                  </span>
                </div>
              </div>

              {/* Unit Specifications */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Unit Code</span>
                  <span className="font-bold text-slate-900 text-sm font-mono">
                    {activeOfferUnit.unitNo || 'Tower B - 1804'}
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Bedrooms</span>
                  <span className="font-bold text-slate-900 text-sm">
                    {activeOfferUnit.beds || 2} Bed + Maid
                  </span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-slate-500 block text-[11px]">Total Area</span>
                  <span className="font-bold text-slate-900 text-sm font-mono">
                    {activeOfferUnit.sizeSqFt || 1420} Sq. Ft.
                  </span>
                </div>
                <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <span className="text-emerald-800 block text-[11px]">Official Price</span>
                  <span className="font-bold text-emerald-950 text-sm font-mono tabular-nums">
                    AED {(activeOfferUnit.priceAed || 2850000).toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Payment Schedule breakdown */}
              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <div className="bg-slate-100 px-4 py-2 text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                  Approved Payment Milestones (60 / 40 Scheme)
                </div>
                <div className="divide-y divide-slate-100 text-xs">
                  <div className="px-4 py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-900">20% Down Payment + 4% DLD Fee</span>
                      <span className="block text-[11px] text-slate-500">Upon Sales & Purchase Agreement (SPA) Signing</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900 tabular-nums">
                      AED 570,000 + AED 114,000
                    </span>
                  </div>
                  <div className="px-4 py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-slate-900">40% Construction Milestones (4 x 10%)</span>
                      <span className="block text-[11px] text-slate-500">Linked to DLD engineer inspection sign-off</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900 tabular-nums">
                      AED 1,140,000
                    </span>
                  </div>
                  <div className="px-4 py-2.5 flex items-center justify-between bg-emerald-50/50">
                    <div>
                      <span className="font-semibold text-emerald-950">40% Upon Key Handover & Deed</span>
                      <span className="block text-[11px] text-emerald-800/80">Scheduled for Q4 2027</span>
                    </div>
                    <span className="font-mono font-bold text-emerald-900 tabular-nums">
                      AED 1,140,000
                    </span>
                  </div>
                </div>
              </div>

              {/* Regulatory Escrow Lock */}
              <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Dubai Land Department Verified Escrow Account
                </div>
                <p className="text-[11px]">
                  All remittances must be directed to Emirates NBD Escrow No: <strong className="font-mono text-slate-900">DLD-ESC-2024-8841</strong>. This document does not constitute a title transfer until SPA execution and full initial deposit clearance.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowOfferPreview(false)}
                  className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Close Preview
                </button>
                <button
                  onClick={() => {
                    alert('Official Offer PDF dispatched to customer WhatsApp (+44 7700 900412)!');
                    setShowOfferPreview(false);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  Dispatch PDF to WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
