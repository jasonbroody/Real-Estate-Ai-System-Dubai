export type AudienceType = 'buyer' | 'broker' | 'owner';

export interface WhatsAppMessage {
  id: string;
  sender: 'user' | 'ai' | 'agent';
  senderName?: string;
  text: string;
  timestamp: string;
  type?: 'text' | 'image' | 'voice' | 'document' | 'interactive_buttons' | 'unit_card';
  mediaUrl?: string;
  voiceDuration?: string;
  voiceTranscript?: string;
  documentTitle?: string;
  documentSize?: string;
  buttons?: string[];
  unitData?: {
    project: string;
    unitNo: string;
    beds: number;
    sizeSqFt: number;
    priceAed: number;
    paymentPlan: string;
    handover: string;
    image: string;
  };
}

export interface Conversation {
  id: string;
  phoneNumber: string;
  contactName: string;
  contactType: AudienceType;
  agencyName?: string;
  projectInterest?: string;
  budgetAed?: number;
  stage: 'New Inquiry' | 'Qualified' | 'Offer Sent' | 'Viewing Booked' | 'Unit Hold' | 'Escrow Pending' | 'Owner Support';
  language: 'en' | 'ar';
  assignedAgent?: string;
  aiHandled: boolean; // true = AI in control, false = human taken over
  unreadCount: number;
  lastMessage: string;
  lastMessageTime: string;
  messages: WhatsAppMessage[];
  notes: string[];
  tags: string[];
}

export interface ProjectUnit {
  id: string;
  unitNumber: string;
  project: string;
  bedrooms: number;
  bathrooms: number;
  sizeSqFt: number;
  priceAed: number;
  floor: number;
  view: string;
  status: 'Available' | 'On Hold' | 'Reserved' | 'Sold';
  paymentPlan: string;
  handoverDate: string;
  image: string;
  brochureUrl?: string;
}

export interface RealEstateProject {
  id: string;
  name: string;
  location: string;
  type: 'Off-Plan' | 'Ready' | 'Under Construction';
  startingPriceAed: number;
  completionDate: string;
  image: string;
  totalUnits: number;
  availableUnits: number;
  paymentScheme: string;
  dldEscrowNo: string;
  description: string;
  constructionProgress: number; // 0-100
}

export interface BrokerLead {
  id: string;
  leadName: string;
  leadPhone: string;
  brokerName: string;
  agencyName: string;
  projectInterest: string;
  budgetAed: number;
  registrationDate: string;
  protectionExpiryDate: string;
  status: 'Attributed' | 'Disputed' | 'Converted' | 'Expired';
  attributionHash: string;
  commissionRate: number; // e.g. 2.5%
}

export interface SnaggingTicket {
  id: string;
  unitNumber: string;
  ownerName: string;
  ownerPhone: string;
  category: 'Civil & Painting' | 'MEP & Plumbing' | 'Carpentry & Joinery' | 'HVAC / AC' | 'Balcony & Glass';
  severity: 'Urgent' | 'Moderate' | 'Minor';
  description: string;
  photoUrl?: string;
  status: 'Logged via WhatsApp' | 'Inspection Scheduled' | 'Contractor In Progress' | 'Resolved';
  loggedDate: string;
  responseDue: string;
}

export interface AutomationRule {
  id: string;
  name: string;
  audience: AudienceType | 'all';
  trigger: string;
  condition: string;
  action: string;
  active: boolean;
  executionsCount: number;
}
