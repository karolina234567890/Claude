import { useState } from 'react';
import { Building2, ToggleLeft, ToggleRight } from 'lucide-react';
import CKBFacts from './CKBFacts';
import CKBFiles from './CKBFiles';

export default function CKBScreen() {
  const [activeTab, setActiveTab] = useState('facts');
  const [adminMode, setAdminMode] = useState(false);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F9FC]">
      {/* CKB header */}
      <div className="bg-white border-b border-gray-200 px-8 pt-6 pb-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">Client Knowledge Bank</h1>
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="inline-flex items-center gap-1.5 text-sm font-semibold px-3 py-1 rounded-full border"
                  style={{ background: '#F0FDF4', color: '#16A34A', borderColor: '#BBF7D0' }}
                >
                  <Building2 size={13} />
                  Soft Scrub
                </span>
              </div>
              <p className="text-sm text-gray-500 max-w-xl">
                Manage files and insights for this client and its brands.
                Facts are used by Copilot when generating media plan recommendations.
              </p>
            </div>

            {/* Admin mode toggle */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs font-medium text-gray-600">Admin mode</span>
              <button
                onClick={() => setAdminMode(v => !v)}
                className={`flex items-center transition-colors ${adminMode ? 'text-[#0057FF]' : 'text-gray-300'}`}
              >
                {adminMode
                  ? <ToggleRight size={32} />
                  : <ToggleLeft size={32} />}
              </button>
              {adminMode && (
                <span className="text-xs font-semibold text-[#0057FF] bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
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
                    ? 'border-[#0057FF] text-[#0057FF]'
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
