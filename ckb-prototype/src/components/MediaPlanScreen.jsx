import { useState } from 'react';
import {
  Sparkles, Send, BookOpen, Globe, MapPin, Building2, Tag,
  ChevronDown, ArrowLeft, Info
} from 'lucide-react';
import { COPILOT_MESSAGES } from '../data/mockData';

const LEVEL_ICONS = {
  'globe': Globe,
  'map-pin': MapPin,
  'building-2': Building2,
  'tag': Tag,
};

function SourceTooltip({ sources }) {
  return (
    <div className="absolute bottom-full left-0 mb-2 w-96 bg-[#1E2232] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
      {/* Note header */}
      <div className="px-4 py-3 bg-white/5 border-b border-white/10">
        <p className="text-xs text-white/50 italic">
          Global and Market insights are managed externally and cannot be edited from Client Knowledge Bank.
        </p>
      </div>
      {sources.map((src, i) => {
        const Icon = LEVEL_ICONS[src.icon] || Globe;
        return (
          <div key={i} className={`px-4 py-3 ${i < sources.length - 1 ? 'border-b border-white/8' : ''} hover:bg-white/5 transition-colors`}>
            <div className="flex items-start gap-3">
              <Icon size={14} className={`mt-0.5 shrink-0 ${src.external ? 'text-white/50' : 'text-[#0057FF]'}`} />
              <div>
                <p className="text-xs font-semibold text-white/90 mb-0.5">{src.level}</p>
                <p className="text-xs text-white/60 mb-1">{src.title}</p>
                {src.external ? (
                  <p className="text-xs text-white/40 italic">Stored in: {src.storage}</p>
                ) : (
                  <div className="flex gap-1 flex-wrap">
                    <span className="text-xs text-white/40">Stored in: CKB</span>
                    {src.file && (
                      <>
                        <span className="text-white/25">·</span>
                        <span className={`text-xs ${src.file === 'Manual input' ? 'text-white/40 italic' : 'text-[#0057FF]/80'}`}>
                          {src.file === 'Manual input' ? 'Manual input' : `File: ${src.file}`}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function MediaPlanScreen({ onBack }) {
  const [messages, setMessages] = useState(COPILOT_MESSAGES);
  const [input, setInput] = useState('');
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      { id: Date.now(), role: 'user', text: input },
      {
        id: Date.now() + 1,
        role: 'copilot',
        text: "I'm analyzing your request based on the client knowledge base and current media plan context. I'll have a recommendation ready shortly.",
        sources: null,
      },
    ]);
    setInput('');
  };

  return (
    <div className="flex-1 flex overflow-hidden bg-[#F8F9FC]">
      {/* Main form area */}
      <div className="flex-1 overflow-auto p-8">
        <div className="max-w-2xl mx-auto">
          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Media Plans
          </button>

          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">New Media Plan</h1>
              <p className="text-sm text-gray-500 mt-0.5">Step 1 of 4 — Media Plan Details</p>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className={`w-8 h-1.5 rounded-full ${s === 1 ? 'bg-[#0057FF]' : 'bg-gray-200'}`} />
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
            {/* Campaign Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Campaign Name</label>
              <input
                type="text"
                placeholder="e.g. Q2 2025 — Spring Clean Campaign"
                className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0057FF] focus:border-transparent"
              />
            </div>

            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Brand</label>
              <div className="relative">
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#0057FF] focus:border-transparent bg-white">
                  <option>Soft Scrub Gel</option>
                  <option>Soft Scrub Bleach Cleanser</option>
                  <option>Soft Scrub Bathroom</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Date</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0057FF] focus:border-transparent" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">End Date</label>
                <input type="date" className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0057FF] focus:border-transparent" />
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Total Budget</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">$</span>
                <input
                  type="text"
                  placeholder="0.00"
                  className="w-full border border-gray-300 rounded-lg pl-7 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0057FF] focus:border-transparent"
                />
              </div>
            </div>

            {/* Objective */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Campaign Objective</label>
              <div className="relative">
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#0057FF] focus:border-transparent bg-white">
                  <option>Brand Awareness</option>
                  <option>Performance / Conversion</option>
                  <option>Consideration</option>
                  <option>Retention</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Market */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Market</label>
              <div className="relative">
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#0057FF] focus:border-transparent bg-white">
                  <option>United States</option>
                  <option>United Kingdom</option>
                  <option>Canada</option>
                  <option>Germany</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-6 py-2.5 bg-[#0057FF] text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
              Continue to Audience →
            </button>
          </div>
        </div>
      </div>

      {/* Copilot panel */}
      <div className="w-[380px] bg-[#1A1D2E] flex flex-col shrink-0 border-l border-white/10">
        {/* Header */}
        <div className="px-5 py-4 border-b border-white/10 flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#FF3366]/20 flex items-center justify-center">
            <Sparkles size={13} className="text-[#FF3366]" />
          </div>
          <span className="text-white font-semibold text-sm">Copilot</span>
          <span className="ml-auto text-xs text-white/30 font-medium">AI · Beta</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {messages.map(msg => (
            <div key={msg.id}>
              {msg.role === 'user' ? (
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-[#0057FF] rounded-2xl rounded-br-sm px-4 py-2.5">
                    <p className="text-sm text-white leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#FF3366]/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Sparkles size={11} className="text-[#FF3366]" />
                    </div>
                    <div className="flex-1 bg-white/8 rounded-2xl rounded-tl-sm px-4 py-3">
                      <p className="text-sm text-white/90 leading-relaxed">{msg.text}</p>
                    </div>
                  </div>

                  {/* Source chip */}
                  {msg.sources && (
                    <div className="ml-8 relative">
                      <button
                        onClick={() => setTooltipOpen(v => !v)}
                        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors
                          ${tooltipOpen
                            ? 'bg-white/15 border-white/20 text-white'
                            : 'bg-white/8 border-white/15 text-white/60 hover:bg-white/12 hover:text-white/80'}`}
                      >
                        <BookOpen size={11} />
                        Based on {msg.sources.length} facts
                      </button>

                      {tooltipOpen && <SourceTooltip sources={msg.sources} />}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-end gap-2 bg-white/8 rounded-xl border border-white/10 px-3 py-2">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Ask Copilot..."
              rows={1}
              className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none resize-none"
              style={{ maxHeight: 120 }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-8 h-8 rounded-lg bg-[#0057FF] flex items-center justify-center hover:bg-blue-600 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
            >
              <Send size={13} className="text-white" />
            </button>
          </div>
          <p className="text-xs text-white/25 text-center mt-2">Copilot uses your knowledge base and plan context</p>
        </div>
      </div>
    </div>
  );
}
