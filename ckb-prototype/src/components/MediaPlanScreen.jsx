import { useState, useRef, useEffect } from 'react';
import {
  Sparkles, Send, BookOpen, Globe, MapPin, Building2, Tag,
  ChevronDown, ArrowLeft, FileText, BarChart2, Layers, PieChart, Maximize2
} from 'lucide-react';
import { COPILOT_MESSAGES } from '../data/mockData';

const LEVEL_ICONS = {
  'globe': Globe,
  'map-pin': MapPin,
  'building-2': Building2,
  'tag': Tag,
};

const STEPS = [
  { key: 'details', label: 'DETAILS', icon: FileText },
  { key: 'channel', label: 'CHANNEL STRATEGY', icon: BarChart2 },
  { key: 'in-channel', label: 'IN-CHANNEL STRATEGY', icon: Layers },
  { key: 'summary', label: 'SUMMARY', icon: PieChart },
];

function SourceTooltipContent({ sources }) {
  return (
    <>
      <div className="px-4 py-2.5 bg-gray-50 border-b border-gray-100">
        <p className="text-xs text-gray-400 italic">
          Global and Market insights are managed externally and cannot be edited from Client Knowledge Bank.
        </p>
      </div>
      {sources.map((src, i) => {
        const Icon = LEVEL_ICONS[src.icon] || Globe;
        return (
          <div key={i} className={`px-4 py-4 ${i < sources.length - 1 ? 'border-b border-gray-100' : ''} hover:bg-gray-50 transition-colors`}>
            <p className="text-sm text-gray-800 leading-relaxed mb-3">
              "{src.fact}"
            </p>
            <div className="flex items-center gap-1.5 mb-2">
              <Icon size={12} className={`shrink-0 ${src.external ? 'text-gray-400' : 'text-[#2563EB]'}`} />
              <span className={`text-xs font-semibold ${src.external ? 'text-gray-500' : 'text-[#2563EB]'}`}>{src.level}</span>
              <span className="text-gray-300 text-xs">·</span>
              <span className="text-xs text-gray-500">{src.title}</span>
            </div>
            {src.external ? (
              <p className="text-xs text-gray-400 italic">Stored in: {src.storage}</p>
            ) : (
              <div className="flex gap-1 items-center flex-wrap">
                <span className="text-xs text-gray-400">Stored in: CKB</span>
                {src.file && (
                  <>
                    <span className="text-gray-300">·</span>
                    <span className={`text-xs ${src.file === 'Manual input' ? 'text-gray-400 italic' : 'text-[#2563EB]'}`}>
                      {src.file === 'Manual input' ? 'Manual input' : `File: ${src.file}`}
                    </span>
                  </>
                )}
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}

export default function MediaPlanScreen({ onBack }) {
  const [messages, setMessages] = useState(COPILOT_MESSAGES);
  const [input, setInput] = useState('');
  const [tooltip, setTooltip] = useState(null);
  const tooltipRef = useRef(null);
  const [activeStep, setActiveStep] = useState('details');

  useEffect(() => {
    if (!tooltip) return;
    const handler = (e) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
        setTooltip(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [tooltip]);

  const handleTooltipToggle = (e, sources) => {
    if (tooltip) { setTooltip(null); return; }
    const rect = e.currentTarget.getBoundingClientRect();
    const MARGIN = 8;
    const W = Math.min(420, window.innerWidth - MARGIN * 2);

    // Horizontal: right-align with button, clamp so left edge never goes off-screen
    const right = Math.max(MARGIN, window.innerWidth - rect.right);
    const leftEdge = window.innerWidth - right - W;
    const clampedRight = leftEdge < MARGIN ? window.innerWidth - W - MARGIN : right;

    // Vertical: show below if enough room, otherwise above
    const spaceBelow = window.innerHeight - rect.bottom - MARGIN;
    const spaceAbove = rect.top - MARGIN;
    const pos = spaceBelow >= spaceAbove || spaceBelow >= 220
      ? { top: rect.bottom + MARGIN, maxH: Math.max(spaceBelow, 120) }
      : { bottom: window.innerHeight - rect.top + MARGIN, maxH: Math.max(spaceAbove, 120) };

    setTooltip({ sources, right: clampedRight, width: W, ...pos });
  };

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
      {/* Left step sidebar */}
      <div className="w-16 bg-white border-r border-gray-200 flex flex-col items-center py-4 gap-1 shrink-0">
        <button
          onClick={onBack}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors mb-3"
        >
          <ArrowLeft size={16} />
        </button>
        {STEPS.map(step => {
          const Icon = step.icon;
          const active = activeStep === step.key;
          return (
            <button
              key={step.key}
              onClick={() => setActiveStep(step.key)}
              title={step.label}
              className={`w-12 flex flex-col items-center gap-1 py-2 rounded-lg transition-colors group
                ${active ? 'bg-blue-50 text-[#2563EB]' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'}`}
            >
              <Icon size={18} />
              <span className="text-[9px] font-semibold tracking-wide leading-tight text-center" style={{ fontSize: '8px' }}>
                {step.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Main form area */}
      <div className="flex-1 overflow-auto">
        {/* Breadcrumb + action */}
        <div className="bg-white border-b border-gray-100 px-6 py-2 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={13} />
            Back to Media Plan list
          </button>
          <button className="flex items-center gap-2 px-5 py-1.5 bg-[#2563EB] text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors">
            Next Step
            <ChevronDown size={14} className="rotate-[-90deg]" />
          </button>
        </div>

        <div className="p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Media Plan Details</h1>

          {/* Client Brief */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="font-semibold text-gray-800">Client Brief</h2>
              <span className="text-xs text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full">Client brief cannot be changed after plan creation</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 w-fit">
              <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
                <FileText size={14} className="text-red-500" />
              </div>
              <span className="text-sm font-medium text-gray-700">brief-3.pdf</span>
              <button className="text-xs text-[#2563EB] hover:underline ml-4 flex items-center gap-1">
                <BookOpen size={11} /> Download
              </button>
            </div>
          </div>

          {/* Client Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <h2 className="font-semibold text-gray-800 mb-4">Client Details</h2>
            <div>
              <label className="block text-sm text-gray-600 mb-1.5">Brand</label>
              <div className="relative">
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent bg-white text-gray-700">
                  <option>Soft Scrub Gel</option>
                  <option>Soft Scrub Bleach Cleanser</option>
                  <option>Soft Scrub Bathroom</option>
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Plan Details */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-4" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <h2 className="font-semibold text-gray-800 mb-4">Plan Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Media Plan Name</label>
                  <input
                    defaultValue="Soft Scrub — Spring Campaign 2025"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Budget</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 py-2.5 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50 text-sm text-gray-500">USD</span>
                    <input
                      placeholder="0.00"
                      className="flex-1 border border-gray-300 rounded-r-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Planning Period</label>
                  <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2.5">
                    <span className="text-sm text-gray-600">Jan 1, 2026 – Dec 31, 2026</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1.5">Time periods</label>
                  <div className="relative">
                    <select className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent bg-white text-gray-700">
                      <option>Monthly</option>
                      <option>Weekly</option>
                      <option>Quarterly</option>
                    </select>
                    <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1.5">Optimization KPIs</label>
                <p className="text-xs text-gray-400 mb-2">Select at least one optimization metric for your media plan</p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" /> Revenue
                  </label>
                  <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 accent-[#2563EB]" /> Reach
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Target Audience */}
          <div className="bg-white rounded-xl border border-gray-200 p-6" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
            <h2 className="font-semibold text-gray-800 mb-4">Target Audience</h2>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-[#FF3366]" />
                <span className="text-sm font-semibold text-gray-800">Millennials Runners</span>
              </div>
              <span className="text-xs text-gray-500">Audience size: <strong>7.25M</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Planning Agent panel — light theme */}
      <div className="w-[360px] bg-white flex flex-col shrink-0 border-l border-gray-200">
        {/* Header */}
        <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-[#FF3366]" />
            <span className="font-semibold text-gray-900 text-sm">Planning Agent</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors">
              <Maximize2 size={13} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-auto p-4 space-y-4 bg-gray-50/50">
          {messages.map(msg => (
            <div key={msg.id}>
              {msg.role === 'user' ? (
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-[#2563EB] rounded-2xl rounded-br-sm px-4 py-2.5">
                    <p className="text-sm text-white leading-relaxed">{msg.text}</p>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#2563EB] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-white font-bold" style={{ fontSize: '8px' }}>AI</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="text-xs font-semibold text-gray-500">Planning Agent</span>
                        <ChevronDown size={11} className="text-gray-400" />
                      </div>
                      <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 border border-gray-100 shadow-sm">
                        <p className="text-sm text-gray-800 leading-relaxed">{msg.text}</p>
                      </div>
                    </div>
                  </div>

                  {/* Source chip */}
                  {msg.sources && (
                    <div className="ml-8">
                      <button
                        onClick={(e) => handleTooltipToggle(e, msg.sources)}
                        className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border transition-colors
                          ${tooltip
                            ? 'bg-blue-50 border-blue-200 text-[#2563EB] font-medium'
                            : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'}`}
                      >
                        <BookOpen size={11} />
                        Based on {msg.sources.length} facts
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-gray-100">
          <div className="flex items-end gap-2 bg-white rounded-xl border border-gray-200 px-3 py-2 shadow-sm">
            <textarea
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Ask Planning Agent..."
              rows={1}
              className="flex-1 bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none resize-none"
              style={{ maxHeight: 120 }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="w-7 h-7 rounded-lg bg-[#2563EB] flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed shrink-0"
            >
              <Send size={12} className="text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Fixed-position tooltip — smart placement based on available viewport space */}
      {tooltip && (
        <div
          ref={tooltipRef}
          style={{
            position: 'fixed',
            ...(tooltip.top !== undefined ? { top: tooltip.top } : { bottom: tooltip.bottom }),
            right: tooltip.right,
            width: tooltip.width,
            maxHeight: tooltip.maxH,
            zIndex: 9999,
          }}
          className="bg-white border border-gray-200 rounded-xl shadow-2xl overflow-y-auto"
        >
          <SourceTooltipContent sources={tooltip.sources} />
        </div>
      )}
    </div>
  );
}
