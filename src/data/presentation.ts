export const brand = { name: 'EstateFlow', suffix: 'AI', developer: 'Palm & Grove Developments', region: 'Built for developers in Dubai & the UAE' };
export type Persona = 'Buyer' | 'Broker' | 'Owner' | 'Internal Team';
export type Step = { text: string; action: string; detail: string; sender?: 'customer' | 'ai'; card?: 'property' | 'offer' | 'statement'; state?: string };
export const personas: Persona[] = ['Buyer', 'Broker', 'Owner', 'Internal Team'];
export const scenarios: Record<Persona, { title: string; description: string; team: string; steps: Step[] }> = {
  Buyer: { title: 'From first hello to a viewing.', description: 'Watch an investment enquiry become a qualified opportunity, with the right property and a confirmed next step.', team: 'Maya · Sales consultant', steps: [
    { sender: 'customer', text: 'Hi! I’m looking for a two-bedroom investment property under AED 2 million. I have about AED 400,000 upfront.', action: 'Enquiry received', detail: 'Buyer conversation opened in the shared inbox.' },
    { text: 'Happy to help. Is rental income your main goal, and when would you like to purchase?', action: 'Requirements clarified', detail: 'Purpose and purchase timing requested.' },
    { sender: 'customer', text: 'Yes, rental income. I’d like to buy in the next three months, preferably near the waterfront.', action: 'Buyer profile captured', detail: '2 bedrooms · Investment · AED 2m budget · AED 400k upfront · 3 months.' },
    { text: 'I’ll check our approved inventory and payment plans against your budget.', action: 'Authorised inventory searched', detail: 'Project permissions and latest availability checked.' },
    { text: 'Two options fit your budget: Grove Residences 1204 at AED 1.65m, and Canal House 803 at AED 1.8m. Grove has a garden view; Canal has a water view.', action: 'Suitable options matched', detail: 'Approved prices and layouts compared. Fees must also fit the upfront budget.' },
    { text: 'Here is Grove Residences. Its approved plan is 20% upfront, 40% during construction and 40% at handover. Fees are additional and require a full cost review.', action: 'Property and payment plan shared', detail: 'AED 330,000 initial instalment; remaining upfront funds must cover applicable fees.', card: 'property' },
    { sender: 'customer', text: 'I like Grove. Can I visit the sales gallery on Monday?', action: 'Viewing requested', detail: 'Request recorded. No appointment confirmed yet.' },
    { text: 'The sample calendar has Monday, 26 October at 11:00 or 15:00 GST. Which works for you?', action: 'Calendar availability checked', detail: 'Available slots returned by the simulated calendar.' },
    { sender: 'customer', text: '11:00 works for me, thank you.', action: 'Selected slot submitted', detail: 'Awaiting simulated calendar confirmation.', state: 'Awaiting Approval' },
    { text: 'Your viewing is confirmed for Monday, 26 October at 11:00 GST. Reference: VIEW-1024.', action: 'Appointment confirmed', detail: 'Simulated calendar response accepted the booking.' },
    { text: 'Maya will meet you at the gallery. I’ve shared your requirements and the units you liked with her.', action: 'Consultant assigned', detail: 'Maya receives conversation history, budget, preferred unit and viewing details.' },
  ] },
  Broker: { title: 'Your network. Working in sync.', description: 'Give approved agents the information they need, while protecting project access and client attribution.', team: 'Omar · Broker relations', steps: [
    { sender: 'customer', text: 'Hi, I’m Sara from Cedar Agency. What two-bedroom units can I share with my client?', action: 'Agent enquiry received', detail: 'Agency identity is not assumed from a message.' },
    { text: 'Please complete the secure agent verification before I share restricted inventory.', action: 'Secure verification requested', detail: 'Private project data stays hidden until verification.', state: 'Awaiting Verification' },
    { text: 'Verification completed in this simulation. Your agency is approved and you have access to Grove Residences.', action: 'Project permissions checked', detail: 'Agent identity, agency approval and project access confirmed in sample records.' },
    { text: 'Grove 1204 is available at AED 1.65m. Inventory snapshot: 23 October 2026, 10:30 GST.', action: 'Timestamped inventory shared', detail: 'Only permitted project inventory is returned.' },
    { sender: 'customer', text: 'Please prepare an offer for Grove 1204 for my registered client.', action: 'Offer requested', detail: 'Approved commercial rules will be used.' },
    { text: 'I’m checking the latest availability before preparing the offer.', action: 'Availability checked again', detail: 'Sample inventory confirms availability; this does not hold the unit.' },
    { text: 'The sample client record matches your registration. No competing claim was found.', action: 'Client attribution checked', detail: 'Conflicting claims are routed to broker relations for human review.' },
    { text: 'Your approved offer is ready. Reference OF-2048; expires 25 October 2026 at 10:30 GST.', action: 'Approved offer generated', detail: 'Approved price and payment plan attached with reference and expiry.', card: 'offer' },
    { text: 'Offer issued. Unit not reserved. A reservation needs a fresh availability check and the approved booking process.', action: 'Reservation boundary explained', detail: 'No hold or booking has been created.' },
  ] },
  Owner: { title: 'Care that continues after the sale.', description: 'Connect private account enquiries and service requests to the people who can resolve them.', team: 'Leila · After-sales', steps: [
    { sender: 'customer', text: 'Can I get my instalment statement for Grove 706? I also need to report a balcony door defect.', action: 'Owner request received', detail: 'Finance enquiry and defect report identified.' },
    { text: 'Please verify your identity through the secure owner link so we can check your property entitlement.', action: 'Owner entitlement verified', detail: 'Simulated secure verification completed before private records appear.', state: 'Awaiting Verification' },
    { text: 'Your sample account is verified for Grove 706. I’m retrieving the authorised statement.', action: 'Finance record retrieved', detail: 'Access limited to the verified property.' },
    { text: 'Your statement is ready through a secure, expiring document link. Payment guidance uses approved channels only.', action: 'Secure statement prepared', detail: 'Sample document; no real finance system is connected.', card: 'statement' },
    { sender: 'customer', text: 'I’ve submitted the door photos through the secure evidence form.', action: 'Issue evidence submitted', detail: 'Sample evidence attached to the defect report.' },
    { text: 'I’ve created service request SR-0318 for the balcony door.', action: 'Service ticket created', detail: 'Category: snagging · Property: Grove 706.' },
    { text: 'Reference SR-0318 is assigned to the after-sales team. Status: awaiting inspection scheduling.', action: 'Team and status shared', detail: 'After-sales owns the request. No repair date promised.' },
    { sender: 'customer', text: 'Could someone call me to discuss the inspection?', action: 'Callback requested', detail: 'Callback request added; timing awaits the team.' },
    { text: 'Leila from after-sales will take it from here, with your statement request, issue evidence and ticket history.', action: 'After-sales handover prepared', detail: 'Context is attached to the shared inbox; select Human Takeover to pause AI.' },
  ] },
  'Internal Team': { title: 'A clearer day for your team.', description: 'Bring appointments, approvals and assignments into one controlled conversation.', team: 'Nadia · Sales manager', steps: [
    { sender: 'customer', text: 'What needs my attention at Grove today?', action: 'Manager request received', detail: 'Staff identity requires verification.' },
    { text: 'Your sample manager role is verified for Grove. I’ll show only items within your permissions.', action: 'Staff permissions checked', detail: 'Role-based project access applied.' },
    { text: 'One offer exception needs approval, two viewings are upcoming, and one payment query needs finance review.', action: 'Attention items retrieved', detail: 'No commercial exception approved automatically.' },
    { sender: 'customer', text: 'Assign the 11:00 viewing to Maya.', action: 'Viewing assigned', detail: 'Simulated team calendar updated; Maya receives the context.' },
    { text: 'The payment query is routed to finance. A screenshot alone does not confirm payment.', action: 'Finance query routed', detail: 'Finance confirmation is still required.' },
    { text: 'The assignment and routing decisions have been added to the sample audit history.', action: 'Actions logged', detail: 'Actor, time, project and action recorded.' },
    { sender: 'customer', text: 'I’ll take over the buyer conversation personally.', action: 'Takeover requested', detail: 'Manager accepts conversation ownership.' },
    { text: 'AI paused. Nadia now owns this conversation.', action: 'AI paused', detail: 'Automated replies stop while the manager is in control.' },
    { text: 'Handover: two-bedroom investment buyer, AED 2m budget, Grove 1204 preferred. Next task: discuss viewing requirements.', action: 'Shared inbox context attached', detail: 'Full history, requirements and next task are available to Nadia.' },
  ] },
};
export const capabilities: Record<Persona, { headline: string; copy: string; groups: { title: string; text: string }[] }> = {
  Buyer: { headline: 'A better first conversation.\nA more informed next step.', copy: 'Meet buyers where they already are. Turn natural conversations into useful context for your sales team.', groups: [
    { title: 'Understand the buyer', text: 'English and Arabic text, with voice notes where enabled. Capture budget, down payment, instalment capacity, location, bedrooms, purpose and timing.' },
    { title: 'Find the right fit', text: 'Compare authorised inventory, views, layouts, prices and payment plans. Share approved brochures, floor plans, videos and tour links.' },
    { title: 'Move the conversation forward', text: 'Generate approved offers with expiry, coordinate viewings, recheck availability for hold requests and guide approved reservation routes. Follow up with permission.' },
  ] },
  Broker: { headline: 'One developer.\nA connected broker network.', copy: 'A controlled extension of your sales operation, built around approved agencies and verified agents.', groups: [
    { title: 'Onboard and verify', text: 'Secure agency applications, approval and agent verification, with project-specific permissions.' },
    { title: 'Equip your partners', text: 'Timestamped inventory, client-ready offers, opt-in launch updates, broker briefings, group visits and buyer viewing coordination.' },
    { title: 'Protect attribution', text: 'Client registration, duplicate-claim review, and permitted deal and commission visibility where integrated.' },
  ] },
  Owner: { headline: 'Every owner deserves\na clear answer.', copy: 'Keep account information private and service requests moving, well beyond the handover.', groups: [
    { title: 'Verify before sharing', text: 'Identity and property-entitlement checks before statements, instalments, invoices, receipts or approved payment guidance.' },
    { title: 'Keep owners informed', text: 'Approved construction updates, handover appointments, snagging reports and inspection requests.' },
    { title: 'Give every issue an owner', text: 'Complaint references, assigned teams, status updates and escalation. Community requests through authorised operators where integrated.' },
  ] },
  'Internal Team': { headline: 'Automation with\nyour team at the centre.', copy: 'Give employees a shared view, clear responsibilities and control over every important decision.', groups: [
    { title: 'Coordinate the work', text: 'Shared inbox, human takeover, assignments, internal notes, pipeline, team calendars, agency administration and service desk.' },
    { title: 'Set the rules', text: 'Inventory and commercial controls, approved promotions, exception approvals and managed knowledge. Consent-based campaigns with opt-outs.' },
    { title: 'Stay accountable', text: 'Role-based access, performance reporting and an audit history of important actions.' },
  ] },
};
export const dashboardData = {
  Inbox: { columns: ['Contact', 'Relationship', 'Assigned to', 'Ownership', 'Next action'], rows: [['Adam Wilson', 'Buyer', 'Maya Hassan', 'AI active', 'Confirm viewing details'], ['Sara Mansour', 'Broker', 'Omar Ali', 'Human review', 'Review client claim'], ['Rami Nasser', 'Owner', 'Leila Ahmed', 'Human control', 'Schedule inspection'], ['Nadia Karim', 'Internal team', 'Sales operations', 'AI active', 'Review offer exception']] },
  Pipeline: { columns: ['Stage', 'Sample record', 'Assigned to', 'Status', 'Next action'], rows: [['New enquiry', 'Adam · 2-bedroom', 'Sales inbox', 'Received', 'Qualify requirements'], ['Qualified buyer', 'Lina · Grove 1204', 'Maya', 'Qualified', 'Compare payment plans'], ['Offer', 'OF-2048', 'Omar', 'Issued', 'Not a reservation'], ['Appointment', 'VIEW-1024', 'Maya', 'Confirmed', '26 Oct · 11:00 GST'], ['Hold request', 'Grove 908', 'Sales manager', 'Pending', 'Recheck availability'], ['Confirmed booking', 'BOOK-0102', 'Sales operations', 'Confirmed', 'Sample system confirmation']] },
  Inventory: { columns: ['Project / unit', 'Price', 'Availability', 'Last sync', 'Permitted access'], rows: [['Grove Residences · 1204', 'AED 1,650,000', 'Available', '23 Oct · 10:30 GST', 'Sales + approved brokers'], ['Canal House · 803', 'AED 1,800,000', 'Available', '23 Oct · 10:30 GST', 'Sales only'], ['Grove Residences · 908', 'AED 1,540,000', 'Recheck required', '22 Oct · 09:00 GST', 'Sales + approved brokers']] },
  'Service desk': { columns: ['Ticket / category', 'Property', 'Responsible team', 'Stage', 'Escalation'], rows: [['SR-0318 · Snagging', 'Grove 706', 'After-sales', 'Awaiting inspection', 'Not escalated'], ['SR-0316 · Statement', 'Canal 402', 'Finance', 'In review', 'Team lead notified'], ['SR-0310 · Handover', 'Grove 1103', 'Handover team', 'Scheduled', 'Not escalated']] },
};
export const faqs = [
  ['Is this a working WhatsApp integration?', 'This is an interactive frontend prototype. All conversations, inventory, documents and system responses are fictional. No real WhatsApp, AI, CRM, finance or booking systems are connected.'],
  ['Can our team take over a conversation?', 'Yes. Human takeover pauses automated replies and preserves the full conversation. The assigned employee receives requirements, history and the next task. Returning control to AI leaves the demonstration paused until you resume.'],
  ['Can the AI reserve a unit or confirm payment?', 'Only through approved workflows with the required verification, permissions and system confirmation. An offer is not a reservation, and a payment screenshot is not confirmed payment. Commercial exceptions go to authorised employees.'],
  ['How does access work for brokers and owners?', 'Brokers are verified against approved agencies and permitted projects. Owners verify identity and property entitlement before private records are shared. Staff use role-based access, and different developers’ private data stays separate.'],
  ['When does the free month begin?', 'One month free for every new developer company. The trial begins after the agreed setup is ready and activated. Pilot scope, limits and subsequent commercial terms are agreed beforehand. Third-party operating costs still apply.'],
];
