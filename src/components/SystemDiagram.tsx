import { ArrowRight, Check, MessageCircle, Building2, Users, KeyRound, BriefcaseBusiness, ShieldCheck, Database, FileText, CalendarDays, Wallet, Headphones, Sparkles, ChevronRight } from 'lucide-react';
import { personas } from '../data/presentation';
const icons = [Users, BriefcaseBusiness, KeyRound, Building2];
export function SystemDiagram() {
  return <div className="system-diagram" aria-label="Four audiences connect through your company WhatsApp number to an AI workflow engine, approved systems and human employees">
    <div className="diagram-topline"><span><span className="status-dot"/> YOUR BUSINESS, CONNECTED</span><span>01 — 04</span></div>
    <div className="audience-nodes">{personas.map((p,i) => { const Icon = icons[i]; return <div key={p}><Icon size={19}/><span>{p}</span><span className="node-port"/></div>; })}</div>
    <div className="connector-tree"><i/><i/><i/><i/><span/></div>
    <div className="whatsapp-node"><span className="wa-icon"><MessageCircle size={24}/></span><div><small>ONE OFFICIAL CHANNEL</small><p>Your company WhatsApp number</p></div><ShieldCheck size={19}/></div>
    <div className="signal-line"/>
    <div className="engine-node"><div><Sparkles size={19}/><span>AI Conversation & Workflow Engine</span><span className="engine-status">READY</span></div><div className="engine-stages">{['Understand','Verify','Retrieve','Act'].map((x,i)=><span key={x}><span className="stage-number">0{i+1}</span>{x}{i<3&&<ChevronRight size={13}/>}</span>)}</div></div>
    <div className="signal-line"/>
    <div className="systems-label">YOUR APPROVED SYSTEMS</div>
    <div className="systems">{[[Database,'Inventory'],[Users,'CRM'],[FileText,'Knowledge'],[CalendarDays,'Calendars'],[Wallet,'Finance'],[Headphones,'Service desk']].map(([Icon, name])=>{const I=Icon as typeof Database;return <div key={name as string}><I size={16}/><span>{name as string}</span></div>;})}</div>
    <div className="human-branch"><span className="human-avatar">M</span><div><span>Human takeover <ArrowRight size={12}/> Assigned employee</span><small>Full context attached. People always in control.</small></div><Check size={17}/></div>
    <div className="diagram-caption"><span className="status-dot"/> Illustrative architecture · integrations simulated</div>
  </div>;
}
