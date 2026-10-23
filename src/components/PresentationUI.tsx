import { Layers } from 'lucide-react';
import { brand } from '../data/presentation';
export function Logo() { return <span className="logo"><span className="logo-symbol"><Layers size={21}/></span>{brand.name}<span className="logo-ai">{brand.suffix}</span></span>; }
export function Tabs<T extends string>({ items, active, onChange, label, prefix }: { items: T[]; active: T; onChange: (item: T) => void; label: string; prefix: string }) {
  return <div className="tabs" role="tablist" aria-label={label}>{items.map((item, i) => <button key={item} role="tab" id={`${prefix}-tab-${i}`} aria-selected={active === item} aria-controls={`${prefix}-panel`} tabIndex={active === item ? 0 : -1} onClick={() => onChange(item)} onKeyDown={e => { let next = i; if(e.key === 'ArrowRight') next = (i+1)%items.length; else if(e.key === 'ArrowLeft') next = (i+items.length-1)%items.length; else if(e.key === 'Home') next = 0; else if(e.key === 'End') next = items.length-1; else return; e.preventDefault(); onChange(items[next]); document.getElementById(`${prefix}-tab-${next}`)?.focus(); }}>{item}</button>)}</div>;
}
