import { useState } from 'react';
import { ChevronDown, Bell, HelpCircle, Menu } from 'lucide-react';

export default function TopNav({ market, onMarketChange }) {
  const [marketOpen, setMarketOpen] = useState(false);
  const [clientOpen, setClientOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);

  const markets = ['United States', 'United Kingdom', 'Canada', 'Germany', 'Global'];

  return (
    <nav className="bg-white border-b border-gray-200 h-12 flex items-center px-4 gap-0 relative z-50 shrink-0">
      {/* Hamburger */}
      <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded transition-colors mr-2">
        <Menu size={18} />
      </button>

      {/* App name */}
      <div className="flex items-center mr-5">
        <span className="text-[#2563EB] font-semibold text-sm">Planning Console</span>
      </div>

      {/* Client dropdown */}
      <div className="relative">
        <button
          onClick={() => { setClientOpen(o => !o); setMarketOpen(false); setProjectOpen(false); }}
          className="flex items-center gap-1 text-sm px-2 py-1.5 rounded hover:bg-gray-50 transition-colors"
        >
          <span className="text-gray-500 text-xs">Client:</span>
          <span className="font-medium text-gray-800 ml-0.5">Default Client</span>
          <ChevronDown size={13} className="text-gray-400 ml-0.5" />
        </button>
        {clientOpen && (
          <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
            {['Soft Scrub', 'Kotex', 'Default Client'].map(c => (
              <button key={c} onClick={() => setClientOpen(false)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Market dropdown */}
      <div className="relative">
        <button
          onClick={() => { setMarketOpen(o => !o); setClientOpen(false); setProjectOpen(false); }}
          className="flex items-center gap-1 text-sm px-2 py-1.5 rounded hover:bg-gray-50 transition-colors"
        >
          <span className="text-gray-500 text-xs">Market:</span>
          <span className={`font-medium ml-0.5 ${market === 'Global' ? 'text-[#2563EB]' : 'text-gray-800'}`}>{market}</span>
          <ChevronDown size={13} className="text-gray-400 ml-0.5" />
        </button>
        {marketOpen && (
          <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
            {markets.map(m => (
              <button
                key={m}
                onClick={() => { onMarketChange(m); setMarketOpen(false); }}
                className={`w-full text-left px-3 py-2 text-sm transition-colors
                  ${market === m ? 'bg-blue-50 text-[#2563EB] font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                {m}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Project dropdown */}
      <div className="relative">
        <button
          onClick={() => { setProjectOpen(o => !o); setClientOpen(false); setMarketOpen(false); }}
          className="flex items-center gap-1 text-sm px-2 py-1.5 rounded hover:bg-gray-50 transition-colors"
        >
          <span className="text-gray-500 text-xs">Project:</span>
          <span className="text-gray-400 font-medium ml-0.5">Select Project</span>
          <ChevronDown size={13} className="text-gray-400 ml-0.5" />
        </button>
        {projectOpen && (
          <div className="absolute top-full left-0 mt-1 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
            {['Q1 2025 Campaign', 'Brand Refresh', 'Annual Planning'].map(p => (
              <button key={p} onClick={() => setProjectOpen(false)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                {p}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1" />

      {/* Right icons */}
      <div className="flex items-center gap-1">
        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
          <Bell size={16} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
          <HelpCircle size={16} />
        </button>
        <div className="w-px h-5 bg-gray-200 mx-1" />
        {/* User avatar with flag */}
        <div className="flex items-center gap-1">
          <div className="w-7 h-7 rounded-full bg-[#1e3a5f] flex items-center justify-center text-white text-xs font-bold">
            KL
          </div>
          <ChevronDown size={13} className="text-gray-400" />
        </div>
      </div>
    </nav>
  );
}
