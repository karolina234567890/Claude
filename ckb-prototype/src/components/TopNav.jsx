import { useState } from 'react';
import { ChevronDown, User, Settings, BookOpen } from 'lucide-react';

export default function TopNav({ market, onMarketChange, onOpenCKB }) {
  const [marketOpen, setMarketOpen] = useState(false);
  const [clientSettingOpen, setClientSettingOpen] = useState(false);

  const markets = ['United States', 'United Kingdom', 'Canada', 'Germany', 'Global'];

  return (
    <nav className="bg-[#0F1117] h-14 flex items-center px-6 gap-4 relative z-50 shrink-0">
      {/* Logo + App name */}
      <div className="flex items-center gap-2 mr-4">
        <div className="w-7 h-7 bg-[#0057FF] rounded-md flex items-center justify-center">
          <BookOpen size={14} className="text-white" />
        </div>
        <span className="text-white font-semibold text-sm tracking-wide">Planning Agent</span>
      </div>

      <div className="w-px h-5 bg-white/20" />

      {/* Client dropdown */}
      <button className="flex items-center gap-1.5 text-white text-sm hover:bg-white/10 px-3 py-1.5 rounded-md transition-colors">
        <span className="font-medium">Soft Scrub</span>
        <ChevronDown size={14} className="text-white/60" />
      </button>

      {/* Market dropdown */}
      <div className="relative">
        <button
          onClick={() => { setMarketOpen(o => !o); setClientSettingOpen(false); }}
          className="flex items-center gap-1.5 text-white text-sm hover:bg-white/10 px-3 py-1.5 rounded-md transition-colors"
        >
          <span className={`font-medium ${market === 'Global' ? 'text-[#FF3366]' : ''}`}>{market}</span>
          <ChevronDown size={14} className="text-white/60" />
        </button>
        {marketOpen && (
          <div className="absolute top-full left-0 mt-1 w-48 bg-[#1E2130] border border-white/10 rounded-lg shadow-xl overflow-hidden">
            {markets.map(m => (
              <button
                key={m}
                onClick={() => { onMarketChange(m); setMarketOpen(false); }}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors
                  ${market === m ? 'bg-white/10 text-white font-medium' : 'text-white/70 hover:bg-white/5 hover:text-white'}`}
              >
                {m}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Client Setting dropdown */}
      <div className="relative">
        <button
          onClick={() => { setClientSettingOpen(o => !o); setMarketOpen(false); }}
          className="flex items-center gap-1.5 text-white/80 text-sm hover:bg-white/10 px-3 py-1.5 rounded-md transition-colors border border-white/20"
        >
          <Settings size={14} />
          <span>Client Setting</span>
          <ChevronDown size={14} className="text-white/60" />
        </button>
        {clientSettingOpen && (
          <div className="absolute top-full right-0 mt-1 w-52 bg-[#1E2130] border border-white/10 rounded-lg shadow-xl overflow-hidden">
            <button
              onClick={() => { onOpenCKB(); setClientSettingOpen(false); }}
              className="w-full text-left px-4 py-2.5 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-2"
            >
              <BookOpen size={14} className="text-[#0057FF]" />
              Client Knowledge Bank
            </button>
          </div>
        )}
      </div>

      {/* User avatar */}
      <button className="w-8 h-8 rounded-full bg-[#0057FF] flex items-center justify-center text-white text-xs font-semibold ml-1">
        SM
      </button>
    </nav>
  );
}
