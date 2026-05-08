import { useState } from 'react';
import { Building2, ToggleLeft, ToggleRight, ChevronLeft } from 'lucide-react';
import CKBFacts from './CKBFacts';
import CKBFiles from './CKBFiles';

export default function CKBScreen({ onBack }) {
  const [activeTab, setActiveTab] = useState('facts');
  const [adminMode, setAdminMode] = useState(false);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F1F6FE]">

      {/* Header — sits on the blue background */}
      <div className="px-8 pt-5 pb-6">
        <div className="max-w-5xl mx-auto">
          {/* Back link */}
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors"
          >
            <ChevronLeft size={15} />
            Back to Media Plan list
          </button>

          {/* Title row */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Client Knowledge Bank</h1>
              <p className="text-sm text-gray-500 max-w-xl">
                Upload and manage files for your client's knowledge bank.
                These files can be used to provide context for the Planning Agent.
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
                <span className="text-xs font-semibold text-[#2563EB] bg-white px-2 py-0.5 rounded-full border border-blue-200">
                  ON
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* White card — constrained to same width as header */}
      <div className="flex-1 flex flex-col overflow-hidden px-8 pb-8 min-h-0">
      <div className="flex-1 flex flex-col overflow-hidden max-w-5xl w-full mx-auto bg-white rounded-2xl border border-gray-200" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-gray-200 px-6 shrink-0">
          {[
            { key: 'files', label: 'Files' },
            { key: 'facts', label: 'Facts & Insights' },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors -mb-px
                ${activeTab === tab.key
                  ? 'border-[#2563EB] text-[#2563EB]'
                  : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              {tab.label}
            </button>
          ))}

          {/* Client badge pushed to right */}
          <div className="ml-auto flex items-center py-2">
            <span
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border"
              style={{ background: '#F0FDF4', color: '#16A34A', borderColor: '#BBF7D0' }}
            >
              <Building2 size={11} />
              Soft Scrub
            </span>
          </div>
        </div>

        {/* Tab content — scrolls inside the card */}
        <div className="flex-1 overflow-auto">
          {activeTab === 'facts'
            ? <CKBFacts adminMode={adminMode} />
            : <CKBFiles adminMode={adminMode} />}
        </div>
      </div>
      </div>
    </div>
  );
}
