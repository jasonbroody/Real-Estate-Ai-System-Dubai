import React, { useState } from 'react';
import { 
  Building2, 
  Search, 
  Filter, 
  FileText, 
  Share2, 
  Check, 
  Layers, 
  Eye, 
  DollarSign, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { ProjectUnit, RealEstateProject } from '../types/realestate';
import { PROJECTS, UNITS } from '../data/mockData';

interface InventoryManagerProps {
  onSendToWhatsApp?: (unit: ProjectUnit) => void;
}

export const InventoryManager: React.FC<InventoryManagerProps> = ({ onSendToWhatsApp }) => {
  const [units, setUnits] = useState<ProjectUnit[]>(UNITS);
  const [selectedProject, setSelectedProject] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [bedroomFilter, setBedroomFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [comparingUnits, setComparingUnits] = useState<string[]>(['unit-101', 'unit-102']);
  const [showComparisonModal, setShowComparisonModal] = useState<boolean>(false);

  const filteredUnits = units.filter(u => {
    if (selectedProject !== 'all' && u.project !== selectedProject) return false;
    if (statusFilter !== 'all' && u.status !== statusFilter) return false;
    if (bedroomFilter !== 'all' && u.bedrooms !== parseInt(bedroomFilter)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        u.unitNumber.toLowerCase().includes(q) ||
        u.view.toLowerCase().includes(q) ||
        u.project.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleStatusChange = (unitId: string, newStatus: ProjectUnit['status']) => {
    setUnits(prev =>
      prev.map(u => u.id === unitId ? { ...u, status: newStatus } : u)
    );
  };

  const toggleCompare = (unitId: string) => {
    if (comparingUnits.includes(unitId)) {
      setComparingUnits(prev => prev.filter(id => id !== unitId));
    } else {
      if (comparingUnits.length >= 3) {
        alert('You can compare a maximum of 3 units at a time.');
        return;
      }
      setComparingUnits(prev => [...prev, unitId]);
    }
  };

  const unitsToCompare = units.filter(u => comparingUnits.includes(u.id));

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 mb-1">
            <Building2 className="w-4 h-4 text-emerald-600" />
            LIVE INVENTORY MATRIX
          </div>
          <h2 className="text-xl font-bold font-display text-slate-900">
            Real Estate Inventory & Commercial Pricing
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Real-time status changes instantly reflect across WhatsApp bot responses, broker distribution sheets, and sales offers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {comparingUnits.length >= 2 && (
            <button
              onClick={() => setShowComparisonModal(true)}
              className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-xs"
            >
              <Layers className="w-4 h-4" />
              Compare Shortlisted ({comparingUnits.length})
            </button>
          )}
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Project Filter */}
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              <option value="all">All Projects (3)</option>
              {PROJECTS.map(p => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              <option value="all">All Statuses</option>
              <option value="Available">Available</option>
              <option value="On Hold">On Hold (48h)</option>
              <option value="Reserved">Reserved</option>
              <option value="Sold">Sold</option>
            </select>

            {/* Bedrooms Filter */}
            <select
              value={bedroomFilter}
              onChange={(e) => setBedroomFilter(e.target.value)}
              className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-800 focus:outline-none focus:ring-1 focus:ring-emerald-600"
            >
              <option value="all">All Bedrooms</option>
              <option value="1">1 Bedroom</option>
              <option value="2">2 Bedrooms</option>
              <option value="3">3 Bedrooms</option>
              <option value="4">4 Bedrooms</option>
              <option value="5">5+ Bedrooms</option>
            </select>
          </div>

          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search unit #, view, or project..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-600"
            />
          </div>
        </div>
      </div>

      {/* Units Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs divide-y divide-slate-200">
            <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider text-[11px] font-mono">
              <tr>
                <th className="py-3 px-4">Compare</th>
                <th className="py-3 px-4">Unit # & Project</th>
                <th className="py-3 px-4">Specs</th>
                <th className="py-3 px-4">View & Floor</th>
                <th className="py-3 px-4 text-right">Price (AED)</th>
                <th className="py-3 px-4 text-right">Rate / Sq.Ft</th>
                <th className="py-3 px-4">Status & Action</th>
                <th className="py-3 px-4 text-right">WhatsApp Dispatch</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-800">
              {filteredUnits.map((u) => {
                const isComparing = comparingUnits.includes(u.id);
                const ratePerSqFt = Math.round(u.priceAed / u.sizeSqFt);

                return (
                  <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                    {/* Compare checkbox */}
                    <td className="py-3 px-4">
                      <input
                        type="checkbox"
                        checked={isComparing}
                        onChange={() => toggleCompare(u.id)}
                        className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
                      />
                    </td>

                    {/* Unit # & Project */}
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 font-mono text-xs">
                        {u.unitNumber}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        {u.project}
                      </div>
                    </td>

                    {/* Specs */}
                    <td className="py-3 px-4">
                      <div>
                        {u.bedrooms} Bed · {u.bathrooms} Bath
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono">
                        {u.sizeSqFt.toLocaleString()} sq.ft
                      </div>
                    </td>

                    {/* View & Floor */}
                    <td className="py-3 px-4">
                      <div className="font-medium text-slate-900 truncate max-w-[180px]">
                        {u.view}
                      </div>
                      <div className="text-[11px] text-slate-500">
                        Floor {u.floor} · Handover {u.handoverDate}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-4 text-right font-mono font-bold text-slate-900 tabular-nums">
                      AED {u.priceAed.toLocaleString()}
                    </td>

                    {/* Rate per sqft */}
                    <td className="py-3 px-4 text-right font-mono text-slate-500 tabular-nums">
                      AED {ratePerSqFt.toLocaleString()}
                    </td>

                    {/* Status selector */}
                    <td className="py-3 px-4">
                      <select
                        value={u.status}
                        onChange={(e) => handleStatusChange(u.id, e.target.value as ProjectUnit['status'])}
                        className={`text-[11px] font-semibold px-2 py-1 rounded border transition-colors ${
                          u.status === 'Available'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                            : u.status === 'On Hold'
                            ? 'bg-amber-50 text-amber-800 border-amber-200 font-bold'
                            : u.status === 'Reserved'
                            ? 'bg-blue-50 text-blue-800 border-blue-200'
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}
                      >
                        <option value="Available">Available</option>
                        <option value="On Hold">On Hold</option>
                        <option value="Reserved">Reserved</option>
                        <option value="Sold">Sold</option>
                      </select>
                    </td>

                    {/* WhatsApp Action */}
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          onSendToWhatsApp?.(u);
                          alert(`Unit ${u.unitNumber} synced! It will appear in WhatsApp bot recommendations.`);
                        }}
                        className="p-1.5 text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-md transition-colors inline-flex items-center gap-1 font-semibold"
                        title="Send unit to WhatsApp simulator"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Push to Bot</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Side-by-Side Unit Comparison Modal */}
      {showComparisonModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900 font-display flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-700" />
                Unit Comparison Sheet (WhatsApp Deliverable)
              </h3>
              <button
                onClick={() => setShowComparisonModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unitsToCompare.map((u) => (
                <div key={u.id} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50/50">
                  <img
                    src={u.image}
                    alt={u.unitNumber}
                    className="w-full h-32 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-4 space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 font-mono text-sm">
                        {u.unitNumber}
                      </span>
                      <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
                        {u.status}
                      </span>
                    </div>
                    <p className="text-slate-500 text-[11px]">{u.project}</p>

                    <div className="pt-2 border-t border-slate-200 space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Price:</span>
                        <span className="font-bold text-slate-900 font-mono">
                          AED {u.priceAed.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Area:</span>
                        <span className="font-mono text-slate-800">{u.sizeSqFt} sq.ft</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Rate / Sqft:</span>
                        <span className="font-mono text-slate-800">
                          AED {Math.round(u.priceAed / u.sizeSqFt)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">View:</span>
                        <span className="text-slate-800 truncate max-w-[120px]">{u.view}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Payment:</span>
                        <span className="text-slate-800 font-mono text-[10px]">{u.paymentPlan}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setShowComparisonModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert('Comparative layout card dispatched to client WhatsApp!');
                  setShowComparisonModal(false);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs"
              >
                Send Comparison to Client on WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
