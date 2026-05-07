import { useState } from 'react';
import { ChevronRight, Calendar, Plus, Search, ChevronDown, Trash2 } from 'lucide-react';
import { MEDIA_PLANS, MULTIMARKET_PLANS } from '../data/mockData';

const STATUS_STYLES = {
  Draft: 'bg-amber-50 text-amber-700 border border-amber-200',
  'In Review': 'bg-blue-50 text-blue-700 border border-blue-200',
  Approved: 'bg-green-50 text-green-700 border border-green-200',
};

function PlanRow({ plan, onOpen, multimarket }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <tr
        className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
        onClick={() => multimarket ? setExpanded(e => !e) : onOpen()}
      >
        <td className="py-3 pl-4 pr-2 w-6">
          {multimarket && (
            <ChevronRight size={14} className={`text-gray-400 transition-transform ${expanded ? 'rotate-90' : ''}`} />
          )}
        </td>
        <td className="py-3 pr-4">
          <span
            className="text-sm text-gray-800 hover:text-[#2563EB] font-medium transition-colors"
            onClick={e => { if (multimarket) { e.stopPropagation(); onOpen(); } }}
          >
            {plan.name}
          </span>
        </td>
        {multimarket && (
          <td className="py-3 pr-4 text-sm text-gray-600 whitespace-nowrap">
            {plan.markets?.length} Markets
          </td>
        )}
        <td className="py-3 pr-4 text-sm text-gray-600 max-w-[120px] truncate">{plan.brand}</td>
        <td className="py-3 pr-4 text-sm text-gray-500 whitespace-nowrap">{plan.dateRange}</td>
        <td className="py-3 pr-4 text-sm text-gray-400 whitespace-nowrap">{plan.date || 'May 7, 2026'}</td>
        {!multimarket && (
          <td className="py-3 pr-4">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[plan.status]}`}>
              {plan.status}
            </span>
          </td>
        )}
        <td className="py-3 pr-4">
          <button className="w-7 h-7 flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 rounded transition-colors"
            onClick={e => e.stopPropagation()}>
            <Trash2 size={14} />
          </button>
        </td>
      </tr>
      {multimarket && expanded && (
        <tr className="bg-blue-50/40">
          <td />
          <td colSpan={6} className="py-2 pr-4 pl-2">
            <div className="flex flex-wrap gap-1.5">
              {plan.markets?.map(m => (
                <span key={m} className="text-xs bg-white text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full">{m}</span>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function HomeScreen({ market, onOpenMediaPlan }) {
  const [search, setSearch] = useState('');
  const isGlobal = market === 'Global';
  const plans = isGlobal ? MULTIMARKET_PLANS : MEDIA_PLANS;

  return (
    <div className="flex-1 bg-[#F8F9FC] overflow-auto">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-6 py-2 flex items-center gap-1.5 text-xs text-gray-500">
        <span>Home</span>
        <ChevronRight size={12} />
        <span>Planning Console</span>
        <ChevronRight size={12} />
        <span className="text-gray-800 font-medium">Planning Agent</span>
      </div>

      <div className="p-6">
        <div className="max-w-5xl mx-auto">
          {/* Page header */}
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-xl font-bold text-gray-900">
              {isGlobal ? 'Multimarket Media Plan List' : 'Media Plan List'}
            </h1>
            <button
              onClick={onOpenMediaPlan}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
            >
              <Plus size={15} />
              New Plan
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-lg w-56">
              <Search size={14} className="text-gray-400 shrink-0" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search"
                className="text-sm flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
              />
            </div>
            <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer">
              <input type="checkbox" className="rounded border-gray-300 accent-[#2563EB]" />
              Created By Me
            </label>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span>Brand:</span>
              <button className="flex items-center gap-1 font-medium text-gray-800 hover:text-[#2563EB] transition-colors">
                All <ChevronDown size={13} />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="py-2.5 pl-4 pr-2 w-6" />
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Name</th>
                  {isGlobal && <th className="py-2.5 pr-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Markets</th>}
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Brand</th>
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Planning Period</th>
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Creation Date</th>
                  {!isGlobal && <th className="py-2.5 pr-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>}
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {plans
                  .filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase()))
                  .map(plan => (
                    <PlanRow
                      key={plan.id}
                      plan={plan}
                      onOpen={onOpenMediaPlan}
                      multimarket={isGlobal}
                    />
                  ))}
              </tbody>
            </table>

            {plans.length === 0 && (
              <div className="py-16 text-center text-gray-400">
                <p className="text-sm">No plans found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
