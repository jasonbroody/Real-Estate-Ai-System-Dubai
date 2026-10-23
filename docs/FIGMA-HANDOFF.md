# EstateFlow AI — design and behaviour reference

This is a fictional developer-focused presentation prototype. No WhatsApp, AI, CRM, calendar, finance, document or booking service is connected. The existing legacy dashboard source is retained but is not mounted in the new Next.js page.

## Reference frames

The browser suite produces full-page PNGs in `docs/screenshots/`:

| Frame | Reference | Layout |
| --- | --- | --- |
| Desktop, 1440px | `estateflow-1440.png` | Two-column hero; three-column demo; sidebar dashboard |
| Tablet, 768px | `estateflow-768.png` | Two-column hero; demo action history below conversation; compact dashboard |
| Mobile, 390px | `estateflow-390.png` | Vertical page; 2×2 audience nodes; stacked demo; dashboard records as cards |
| Stress check, 320px | `estateflow-320.png` | Compact horizontal gutters and controls; no page overflow |

Use these as behavioural references, not flattened substitutes for the components. They show the buyer demo at its first step. The browser prototype contains all other states.

## Visual system

- Canvas: `#F8F9F4`; white surfaces; forest ink `#173C30`; action green `#204E3A`; lime `#D7EEAE`; sage `#EDF1E8`; border `#DCE2D7`.
- DM Sans for interface and headings. Body 400, headings 450, small emphasis 500. No heavy/bold headings. Instrument Serif italic provides the editorial accent.
- Maximum section width: 1320px, including 48px desktop gutters. Mobile gutters: 22px, reducing to 16px at 320px.
- Typical section spacing: 94px desktop, 58px mobile. Surfaces use 7–20px radii and restrained borders/shadows.
- CSS motion: 200ms interaction transitions, 300ms message entry, subtle travelling connector signals. All decorative motion and smooth scrolling stop under reduced-motion preference.
- Fonts use Google Fonts CSS with system/Georgia fallbacks. Network access is needed to display the exact branded font pair.

## Components and variants

| Component | Variants and behaviour |
| --- | --- |
| Header | Sticky desktop navigation; mobile disclosure with expanded state; accessible anchors; pilot action |
| Scenario tabs | Buyer / Broker / Owner / Internal Team. Active and inactive styles; Arrow Left/Right, Home/End; roving tab focus |
| Conversation bubble | Incoming approved response, outgoing customer message; timestamp; sample delivery marks |
| Verification notice | Amber notice within relevant message; explicit simulated verification |
| Property card | Illustrative image, fictional unit, bedrooms, view, price, 20/40/40 plan, fees and availability caveats |
| Document card | Offer reference and expiry / owner statement. Clearly marked preview, no fake working download |
| Workflow step | Pending numbered node, current lime node with detail, completed checkmark |
| Playback | Play, Pause, Continue, Next Step, Reset; numeric progress and native progress element |
| Ownership | AI active / Human in Control; takeover banner with team, current context and next task |
| Dashboard | Inbox, Pipeline, Inventory, Service desk; sample records, role boundaries and AI/human statuses |
| FAQ | Native disclosure; visible focus; expanded/collapsed chevron |
| Pilot dialog | Native modal with focus containment, Escape dismissal, return focus, close button and useful scope overview |

## State contract

| State | How to reach it | Expected behaviour |
| --- | --- | --- |
| Idle | Initial load, reset, or scenario switch | No messages; Play and Next Step enabled |
| Playing | Play or Continue; hero Watch the Automation link | Adds one scripted message and matching action approximately every 2.1 seconds |
| Paused | Pause or Next Step | Timer cancelled; conversation and workflow progress retained |
| Completed | Last scenario step | Automatic playback stops; Play/Continue and Next Step disabled; Reset available |
| Awaiting Verification | Expand Explore exception states; select state | Progression blocked; no private information confirmed; simulated resolution leaves playback stopped |
| Awaiting Approval | Exception selector | Authorised approval required; progression blocked |
| Stale Data | Exception selector | Fresh inventory check required; no offer confirmed |
| Integration Failure | Exception selector | No action confirmed; simulated resolution/retry or employee takeover |
| Human in Control | Human Takeover at any step | Timer stops; AI progression disabled; context/history retained; assigned employee displayed |
| Duplicate client claim | Broker → exception selector | Broker relations must review competing registrations before attribution/offer proceeds |

Returning control to AI removes human ownership but never starts playback. The visitor must explicitly choose Continue (or Play before the first message). The internal manager scenario automatically enters human ownership after its takeover request, attaching the final shared-inbox summary atomically. Reset and switching personas clear ownership and all exception states.

## Source map

- `src/data/presentation.ts`: central brand name, developer identity, all four scenario scripts, capabilities, dashboard data and FAQs.
- `src/App.tsx`: page composition and marketing sections.
- `src/components/PresentationUI.tsx`: shared logo and accessible tabs.
- `src/components/SystemDiagram.tsx`: animated architecture illustration.
- `src/components/WorkflowDemo.tsx`: playback, exceptions and ownership state.
- `src/components/DeveloperPreview.tsx`: interactive dashboard.
- `src/components/PilotDialog.tsx`: modal lifecycle and pilot scope.
- `src/index.css`: tokens, type, responsive layouts and reduced motion.
- `src/app/layout.tsx` and `src/app/icon.svg`: document metadata and brand icon.

## Content boundaries

One month free begins only after the agreed setup is ready and activated. Scope, usage limits and subsequent commercial terms are agreed beforehand; third-party operating costs still apply. No unlimited usage, invented performance claims, client endorsements or real compliance certifications are presented. Offers are not reservations. Payment screenshots are not cleared payments. Private data is gated by identity and entitlement, and exceptions go to people.
