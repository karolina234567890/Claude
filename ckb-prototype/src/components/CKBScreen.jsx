import { useState } from 'react';
import { Building2, ToggleLeft, ToggleRight, ChevronRight, ArrowLeft } from 'lucide-react';
import CKBFacts from './CKBFacts';
import CKBFiles from './CKBFiles';

export default function CKBScreen({ onBack }) {
  const [activeTab, setActiveTab] = useState('facts');
  const [adminMode, setAdminMode] = useState(false);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F9FC]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100 px-6 py-2 flex items-center gap-1.5 text-xs text-gray-500">
        <button onClick={onBack} className="flex items-center gap-1 hover:text-gray-700 transition-colors">
          <ArrowLeft size={11} /> Back
        </button>
        <ChevronRight size={11} />
        <span>Planning Console</span>
        <ChevronRight size={11} />
        <span className="text-gray-800 font-medium">Client Knowledge Bank</span>
      </div>

      {/* CKB header */}
      <div className="bg-white border-b border-gray-200 px-8 pt-5 pb-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-xl font-bold text-gray-900">Client Knowledge Bank</h1>
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-0.5 rounded-full border"
                  style={{ background: '#F0FDF4', color: '#16A34A', borderColor: '#BBF7D0' }}
                >
                  <Building2 size={11} />
                  Soft Scrub
                </span>
              </div>
              <p className="text-sm text-gray-500">
                Manage files and insights for this client and its brands.
                Facts are used by Copilot when generating media plan recommendations.
              </p>
            </div>

            {/* Admin mode toggle */}
            <div className="flex items-center gap-2 pt-1 shrink-0">
              <span className="text-xs font-medium text-gray-500">Admin mode</span>
              <button
                onClick={() => setAdminMode(v => !v)}
                className={`flex items-center transition-colors ${adminMode ? 'text-[#2563EB]' : 'text-gray-300'}`}
              >
                {adminMode ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
              </button>
              {adminMode && (
                <span className="text-xs font-semibold text-[#2563EB] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                  ON
                </span>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-0">
            {[
              { key: 'files', label: 'Files' },
              { key: 'facts', label: 'Facts & Insights' },
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-5 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px
                  ${activeTab === tab.key
                    ? 'border-[#2563EB] text-[#2563EB]'
                    : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab content */}
      {activeTab === 'facts'
        ? <CKBFacts adminMode={adminMode} />
        : <CKBFiles adminMode={adminMode} />}
    </div>
  );
}
