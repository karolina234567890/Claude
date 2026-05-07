import { useState } from 'react';
import { ChevronRight, Plus, Search, ChevronDown, Trash2, Check } from 'lucide-react';
import { MEDIA_PLANS, MULTIMARKET_PLANS } from '../data/mockData';

const STATUS_COLORS = {
  Draft: 'bg-amber-500',
  'In Review': 'bg-blue-500',
  Approved: 'bg-green-500',
};

const AVATAR_COLORS = [
  'bg-[#374151]', 'bg-[#1e3a5f]', 'bg-[#4B5563]', 'bg-[#6B7280]',
  'bg-[#1d4ed8]', 'bg-[#065f46]', 'bg-[#7c3aed]', 'bg-[#b45309]',
];

function initials(name) {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
}

function avatarColor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

const PLAN_STEPS = ['Media Plan Details', 'Channel Selection', 'In-Channel Strategy', 'Summary'];

function PlanRow({ plan, onOpen, multimarket }) {
  const [expanded, setExpanded] = useState(false);
  const creator = plan.creator || 'PM';
  const date = plan.creationDate || '07 May 2026';

  return (
    <>
      <tr
        className="border-b border-gray-100 hover:bg-blue-50/30 transition-colors cursor-pointer group"
        onClick={() => setExpanded(e => !e)}
      >
        {/* Expand chevron */}
        <td className="py-3 pl-5 pr-2 w-8">
          <ChevronRight
            size={14}
            className={`text-gray-400 transition-transform duration-150 ${expanded ? 'rotate-90' : ''}`}
          />
        </td>

        {/* Name */}
        <td className="py-3 pr-4">
          <span
            className="text-sm text-gray-800 hover:text-[#2563EB] font-medium transition-colors"
            onClick={e => { e.stopPropagation(); onOpen(); }}
          >
            {plan.name}
          </span>
        </td>

        {/* Markets (multimarket only) */}
        {multimarket && (
          <td className="py-3 pr-4 text-sm text-gray-600 whitespace-nowrap">
            {plan.markets?.length} Markets
          </td>
        )}

        {/* Brand */}
        <td className="py-3 pr-4 text-sm text-gray-600 max-w-[160px] truncate">{plan.brand}</td>

        {/* Planning Period */}
        <td className="py-3 pr-4 text-sm text-gray-500 whitespace-nowrap">{plan.dateRange}</td>

        {/* Creation Date + avatar */}
        <td className="py-3 pr-4">
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white shrink-0 ${avatarColor(creator)}`}
              style={{ fontSize: '9px', fontWeight: 700 }}>
              {initials(creator)}
            </div>
            <span className="text-sm text-gray-500 whitespace-nowrap">{date}</span>
          </div>
        </td>

        {/* Actions */}
        <td className="py-3 pr-5">
          <button
            onClick={e => e.stopPropagation()}
            className="w-7 h-7 flex items-center justify-center text-gray-300 hover:text-red-400 hover:bg-red-50 rounded transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </td>
      </tr>

      {/* Expanded steps */}
      {expanded && (
        <>
          {PLAN_STEPS.map((step, i) => (
            <tr
              key={step}
              className="bg-white hover:bg-blue-50/20 transition-colors cursor-pointer border-b border-gray-50"
              onClick={e => { e.stopPropagation(); onOpen(); }}
            >
              <td className="pl-5 pr-2">
                <div className="flex items-center justify-center">
                  <div className="w-px h-full bg-gray-200 mx-auto" style={{ minHeight: 32 }} />
                </div>
              </td>
              <td colSpan={multimarket ? 5 : 4} className="py-2 pr-4">
                <div className="flex items-center gap-2 pl-4">
                  {/* Green check circle */}
                  <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                    <Check size={11} className="text-white" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-gray-700">{step}</span>
                </div>
              </td>
              <td className="py-2 pr-5">
                <ChevronRight size={14} className="text-gray-300" />
              </td>
            </tr>
          ))}
        </>
      )}
    </>
  );
}

export default function HomeScreen({ market, onOpenMediaPlan, onOpenCKB }) {
  const [search, setSearch] = useState('');
  const [clientSettingOpen, setClientSettingOpen] = useState(false);
  const isGlobal = market === 'Global';
  const plans = isGlobal ? MULTIMARKET_PLANS : MEDIA_PLANS;

  const clientSettingItems = [
    { label: 'Client Cost Setting', action: null },
    { label: 'Key Client Metrics', action: null },
    { label: 'Client Knowledge Bank', action: onOpenCKB, highlight: true },
    { label: 'Client Curves Library', action: null },
  ];

  return (
    <div className="flex-1 bg-[#F1F6FE] overflow-auto">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-6 py-2 flex items-center gap-1.5 text-xs text-gray-500">
        <span className="hover:text-gray-700 cursor-pointer">Home</span>
        <ChevronRight size={11} />
        <span className="hover:text-gray-700 cursor-pointer">Planning Console</span>
        <ChevronRight size={11} />
        <span className="text-gray-800 font-medium">Planning Agent</span>
      </div>

      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Page header */}
          <div className="flex items-center justify-between mb-5">
            <h1 className="text-2xl font-bold text-gray-900">
              {isGlobal ? 'Multimarket Media Plan List' : 'Media Plan List'}
            </h1>

            <div className="flex items-center gap-2">
              {/* Client Setting dropdown — single market only (but available in both per PRD) */}
              <div className="relative">
                <button
                  onClick={() => setClientSettingOpen(o => !o)}
                  className="flex items-center gap-1.5 px-4 py-2 bg-white text-gray-700 text-sm font-medium rounded-full border border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Client Setting
                  <ChevronDown size={14} className="text-gray-500" />
                </button>
                {clientSettingOpen && (
                  <div className="absolute top-full right-0 mt-1 w-52 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden py-1">
                    {clientSettingItems.map(item => (
                      <button
                        key={item.label}
                        onClick={() => { item.action?.(); setClientSettingOpen(false); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                          ${item.highlight
                            ? 'text-[#2563EB] font-medium hover:bg-blue-50'
                            : 'text-gray-700 hover:bg-gray-50'}`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* New Plan */}
              <button
                onClick={onOpenMediaPlan}
                className="flex items-center gap-1.5 px-4 py-2 bg-[#2563EB] text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
              >
                <div className="w-4 h-4 rounded-full border-2 border-white flex items-center justify-center">
                  <Plus size={10} strokeWidth={3} />
                </div>
                New Plan
              </button>
            </div>
          </div>

          {/* Filters row */}
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-1.5 rounded-lg w-52">
              <Search size={13} className="text-gray-400 shrink-0" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search"
                className="text-sm flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
              />
            </div>
            <label className="flex items-center gap-1.5 text-sm text-gray-600 cursor-pointer select-none">
              <input type="checkbox" className="rounded border-gray-300 accent-[#2563EB]" />
              Created By Me
            </label>
            <div className="flex items-center gap-1 text-sm text-gray-600">
              <span>Brand:</span>
              <button className="flex items-center gap-0.5 font-medium text-gray-800 hover:text-[#2563EB] transition-colors">
                All <ChevronDown size={13} />
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="py-2.5 pl-5 pr-2 w-8" />
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold text-gray-500">Name</th>
                  {isGlobal && <th className="py-2.5 pr-4 text-left text-xs font-semibold text-gray-500">Markets</th>}
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold text-gray-500">Brand</th>
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold text-gray-500">Planning Period</th>
                  <th className="py-2.5 pr-4 text-left text-xs font-semibold text-gray-500">Creation Date</th>
                  <th className="py-2.5 pr-5 text-left text-xs font-semibold text-gray-500">Actions</th>
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

            {plans.filter(p => !search || p.name.toLowerCase().includes(search.toLowerCase())).length === 0 && (
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
