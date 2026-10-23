import type { Metadata } from 'next';
import '../index.css';
export const metadata: Metadata = { title: 'EstateFlow AI — Every property conversation, connected.', description: 'An interactive presentation of WhatsApp AI workflows for real estate developers in Dubai and the UAE. Buyers, brokers, owners and your team. One connected flow.' };
export default function RootLayout({children}: {children: React.ReactNode}) { return <html lang="en"><body>{children}</body></html>; }
