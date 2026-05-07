import { ChevronDown, Globe, MapPin, Calendar, DollarSign } from 'lucide-react';
import { MEDIA_PLANS, MULTIMARKET_PLANS } from '../data/mockData';

const STATUS_STYLES = {
  Draft: 'bg-amber-50 text-amber-700 border border-amber-200',
  'In Review': 'bg-blue-50 text-blue-700 border border-blue-200',
  Approved: 'bg-green-50 text-green-700 border border-green-200',
};

export default function HomeScreen({ market, onOpenMediaPlan }) {
  const isGlobal = market === 'Global';

  return (
    <div className="flex-1 bg-[#F8F9FC] p-8 overflow-auto">
      <div className="max-w-5xl mx-auto">
        {/* Page header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Media Plans</h1>
          <button className="px-4 py-2 bg-[#0057FF] text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
            + New Media Plan
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-gray-200 mb-6">
          {['Single Market Plans', 'Multimarket Plans'].map(tab => {
            const active = (tab === 'Single Market Plans') !== isGlobal;
            return (
              <button
                key={tab}
                className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px
                  ${active
                    ? 'border-[#0057FF] text-[#0057FF]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Plan cards */}
        {!isGlobal ? (
          <div className="grid gap-3">
            {MEDIA_PLANS.map(plan => (
              <button
                key={plan.id}
                onClick={onOpenMediaPlan}
                className="bg-white rounded-xl border border-gray-200 p-5 text-left hover:border-[#0057FF] hover:shadow-md transition-all group"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#0057FF] transition-colors mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{plan.brand}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {plan.dateRange}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign size={12} />
                        {plan.budget}
                      </span>
                    </div>
                  </div>
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[plan.status]}`}>
                    {plan.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="grid gap-3">
            {MULTIMARKET_PLANS.map(plan => (
              <button
                key={plan.id}
                onClick={onOpenMediaPlan}
                className="bg-white rounded-xl border border-gray-200 p-5 text-left hover:border-[#0057FF] hover:shadow-md transition-all group"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#0057FF] transition-colors mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">{plan.brand}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} />
                        {plan.dateRange}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign size={12} />
                        {plan.budget}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2 ml-4">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${STATUS_STYLES[plan.status]}`}>
                      {plan.status}
                    </span>
                    <div className="flex items-center gap-1">
                      <Globe size={11} className="text-gray-400" />
                      <div className="flex gap-1 flex-wrap justify-end">
                        {plan.markets.map(m => (
                          <span key={m} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Info note for Global */}
        {isGlobal && (
          <div className="mt-4 flex items-start gap-2 bg-[#FF3366]/5 border border-[#FF3366]/20 rounded-lg px-4 py-3">
            <Globe size={14} className="text-[#FF3366] mt-0.5 shrink-0" />
            <p className="text-xs text-gray-600">
              You're viewing <span className="font-medium text-[#FF3366]">Global</span> multimarket plans. To view single-market plans, switch the market dropdown to a specific country.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
