import { useState, useMemo } from 'react';
import {
  ChevronDown, ChevronRight, Sparkles, Pencil, Trash2, Plus,
  FileText, Search, Filter, Target, Users, BarChart2, Swords,
  Check, X
} from 'lucide-react';
import { TOPICS, CLIENT } from '../data/mockData';
import BrandScopeTag from './BrandScopeTag';
import DeleteModal from './DeleteModal';
import AddFactForm from './AddFactForm';

const TOPIC_ICONS = {
  target: Target,
  users: Users,
  'bar-chart-2': BarChart2,
  sword: Swords,
};

function matchesBrandFilter(scope, filter) {
  if (filter === 'all') return true;
  if (filter === 'client') return scope.type === 'client';
  if (filter === 'all-brands') return scope.type === 'all-brands';
  // specific brand name
  if (scope.type === 'brands') return scope.brands.includes(filter);
  if (scope.type === 'all-brands') return true;
  return false;
}

export default function CKBFacts({ adminMode }) {
  const [topics, setTopics] = useState(TOPICS);
  const [expanded, setExpanded] = useState({ 'brand-strategy': true });
  const [brandFilter, setBrandFilter] = useState('all');
  const [topicFilter, setTopicFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null); // { topicId, factId }
  const [addingTo, setAddingTo] = useState(null); // topicId
  const [editingFact, setEditingFact] = useState(null); // { topicId, factId }
  const [editText, setEditText] = useState('');
  const [editingSummary, setEditingSummary] = useState(null);
  const [summaryText, setSummaryText] = useState('');
  const [brandFilterOpen, setBrandFilterOpen] = useState(false);
  const [topicFilterOpen, setTopicFilterOpen] = useState(false);

  const brandOptions = [
    { value: 'all', label: 'All scopes' },
    { value: 'client', label: `Client level (${CLIENT.name})` },
    { value: 'all-brands', label: 'All Brands' },
    ...CLIENT.brands.map(b => ({ value: b, label: b })),
  ];

  const filteredTopics = useMemo(() => {
    return topics
      .filter(t => topicFilter === 'all' || t.id === topicFilter)
      .map(t => ({
        ...t,
        facts: t.facts.filter(f => {
          const brandMatch = matchesBrandFilter(f.scope, brandFilter);
          const searchMatch = !search || f.text.toLowerCase().includes(search.toLowerCase());
          return brandMatch && searchMatch;
        }),
      }))
      .filter(t => t.facts.length > 0 || topicFilter === t.id);
  }, [topics, brandFilter, topicFilter, search]);

  const handleDeleteFact = () => {
    if (!deleteTarget) return;
    setTopics(prev => prev.map(t => {
      if (t.id !== deleteTarget.topicId) return t;
      return { ...t, facts: t.facts.filter(f => f.id !== deleteTarget.factId) };
    }));
    setDeleteTarget(null);
  };

  const handleAddFact = (topicId, newFact) => {
    setTopics(prev => prev.map(t => {
      if (t.id !== topicId) return t;
      return {
        ...t,
        facts: [...t.facts, { ...newFact, id: `new-${Date.now()}` }],
      };
    }));
    setAddingTo(null);
  };

  const handleEditSave = (topicId, factId) => {
    setTopics(prev => prev.map(t => {
      if (t.id !== topicId) return t;
      return {
        ...t,
        facts: t.facts.map(f => f.id === factId ? { ...f, text: editText } : f),
      };
    }));
    setEditingFact(null);
  };

  const handleSummarySave = (topicId) => {
    setTopics(prev => prev.map(t =>
      t.id === topicId ? { ...t, aiSummary: summaryText } : t
    ));
    setEditingSummary(null);
  };

  return (
    <div className="flex-1 overflow-auto bg-[#F8F9FC] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Filter bar */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {/* Brand scope filter */}
          <div className="relative">
            <button
              onClick={() => { setBrandFilterOpen(o => !o); setTopicFilterOpen(false); }}
              className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg text-sm hover:border-gray-300 transition-colors"
            >
              <Filter size={14} className="text-gray-500" />
              <span className="text-gray-700 font-medium">
                {brandOptions.find(o => o.value === brandFilter)?.label || 'Brand scope'}
              </span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>
            {brandFilterOpen && (
              <div className="absolute top-full left-0 mt-1 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden">
                {brandOptions.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => { setBrandFilter(opt.value); setBrandFilterOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between
                      ${brandFilter === opt.value ? 'bg-blue-50 text-[#2563EB] font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    {opt.label}
                    {brandFilter === opt.value && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Topic filter */}
          <div className="relative">
            <button
              onClick={() => { setTopicFilterOpen(o => !o); setBrandFilterOpen(false); }}
              className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg text-sm hover:border-gray-300 transition-colors"
            >
              <span className="text-gray-700 font-medium">
                {topicFilter === 'all' ? 'All topics' : topics.find(t => t.id === topicFilter)?.name}
              </span>
              <ChevronDown size={14} className="text-gray-400" />
            </button>
            {topicFilterOpen && (
              <div className="absolute top-full left-0 mt-1 w-52 bg-white border border-gray-200 rounded-lg shadow-xl z-20 overflow-hidden">
                <button
                  onClick={() => { setTopicFilter('all'); setTopicFilterOpen(false); }}
                  className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between
                    ${topicFilter === 'all' ? 'bg-blue-50 text-[#2563EB] font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  All topics
                  {topicFilter === 'all' && <Check size={14} />}
                </button>
                {topics.map(t => (
                  <button
                    key={t.id}
                    onClick={() => { setTopicFilter(t.id); setTopicFilterOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between
                      ${topicFilter === t.id ? 'bg-blue-50 text-[#2563EB] font-medium' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    {t.name}
                    {topicFilter === t.id && <Check size={14} />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg flex-1 min-w-48">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search facts..."
              className="text-sm flex-1 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Empty state */}
        {filteredTopics.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <Search size={32} className="mx-auto mb-3 opacity-50" />
            <p className="font-medium text-gray-500">No facts found for the selected brand or topic.</p>
            <p className="text-sm mt-1">Try adjusting your filters.</p>
          </div>
        )}

        {/* Topic accordions */}
        <div className="flex flex-col gap-3">
          {filteredTopics.map(topic => {
            const Icon = TOPIC_ICONS[topic.icon] || Target;
            const isOpen = !!expanded[topic.id];

            return (
              <div
                key={topic.id}
                className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
              >
                {/* Accordion header */}
                <button
                  onClick={() => setExpanded(prev => ({ ...prev, [topic.id]: !prev[topic.id] }))}
                  className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-[#2563EB]" />
                    </div>
                    <div>
                      <span className="font-semibold text-gray-900 text-sm">{topic.name}</span>
                      <p className="text-xs text-gray-500 mt-0.5">{topic.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">
                      {topic.facts.length} fact{topic.facts.length !== 1 ? 's' : ''}
                    </span>
                    {isOpen ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
                  </div>
                </button>

                {/* Accordion body */}
                {isOpen && (
                  <div className="border-t border-gray-100">
                    {/* AI Summary */}
                    <div className="mx-5 mt-4 mb-3 bg-amber-50 border border-amber-100 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                          <Sparkles size={13} className="text-amber-600" />
                          <span className="text-xs font-semibold text-amber-700 uppercase tracking-wide">AI Summary</span>
                        </div>
                        {adminMode && editingSummary !== topic.id && (
                          <button
                            onClick={() => { setEditingSummary(topic.id); setSummaryText(topic.aiSummary); }}
                            className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 px-2 py-1 rounded hover:bg-amber-100 transition-colors"
                          >
                            <Pencil size={11} />
                            Edit
                          </button>
                        )}
                      </div>
                      {editingSummary === topic.id ? (
                        <div>
                          <textarea
                            value={summaryText}
                            onChange={e => setSummaryText(e.target.value)}
                            className="w-full border border-amber-200 rounded-lg p-2 text-sm bg-white resize-none focus:outline-none focus:ring-2 focus:ring-amber-400"
                            rows={3}
                          />
                          <div className="flex gap-2 mt-2 justify-end">
                            <button onClick={() => setEditingSummary(null)} className="text-xs text-gray-500 px-3 py-1 rounded hover:bg-amber-100">Cancel</button>
                            <button onClick={() => handleSummarySave(topic.id)} className="text-xs font-medium text-white bg-[#2563EB] px-3 py-1 rounded-lg">Save</button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-amber-900 leading-relaxed">{topic.aiSummary}</p>
                      )}
                    </div>

                    {/* Fact cards */}
                    <div className="px-5 pb-2 flex flex-col gap-2">
                      {topic.facts.map(fact => (
                        <div
                          key={fact.id}
                          className="border border-gray-100 rounded-xl p-4 bg-white hover:border-gray-200 transition-colors"
                        >
                          {editingFact?.topicId === topic.id && editingFact?.factId === fact.id ? (
                            <div>
                              <textarea
                                value={editText}
                                onChange={e => setEditText(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
                                rows={3}
                              />
                              <div className="flex gap-2 mt-2 justify-end">
                                <button onClick={() => setEditingFact(null)} className="text-xs text-gray-500 px-3 py-1 rounded hover:bg-gray-100">Cancel</button>
                                <button
                                  onClick={() => handleEditSave(topic.id, fact.id)}
                                  className="text-xs font-medium text-white bg-[#2563EB] px-3 py-1 rounded-lg"
                                >
                                  Save
                                </button>
                              </div>
                            </div>
                          ) : (
                            <>
                              <p className="text-sm text-gray-800 leading-relaxed mb-3">{fact.text}</p>
                              <div className="flex items-start justify-between gap-3 flex-wrap">
                                <div className="flex flex-col gap-2">
                                  <BrandScopeTag scope={fact.scope} />
                                  <div>
                                    {fact.source.type === 'manual' ? (
                                      <span className="text-xs text-gray-400 italic">Manual input</span>
                                    ) : (
                                      <button className="text-xs text-[#2563EB] underline underline-offset-2 hover:text-blue-800">
                                        {fact.source.name}
                                      </button>
                                    )}
                                  </div>
                                </div>
                                {adminMode && (
                                  <div className="flex gap-1.5 shrink-0">
                                    <button
                                      onClick={() => { setEditingFact({ topicId: topic.id, factId: fact.id }); setEditText(fact.text); }}
                                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 px-2.5 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                                    >
                                      <Pencil size={12} />
                                      Edit
                                    </button>
                                    <button
                                      onClick={() => setDeleteTarget({ topicId: topic.id, factId: fact.id })}
                                      className="flex items-center gap-1 text-xs text-red-500 hover:text-red-700 px-2.5 py-1.5 rounded-lg border border-red-100 hover:bg-red-50 transition-colors"
                                    >
                                      <Trash2 size={12} />
                                      Delete
                                    </button>
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Add fact */}
                    <div className="px-5 pb-4 mt-1">
                      {adminMode && (
                        addingTo === topic.id ? (
                          <AddFactForm
                            onSave={fact => handleAddFact(topic.id, fact)}
                            onCancel={() => setAddingTo(null)}
                          />
                        ) : (
                          <button
                            onClick={() => setAddingTo(topic.id)}
                            className="flex items-center gap-1.5 text-xs font-medium text-[#2563EB] hover:text-blue-800 px-3 py-2 rounded-lg hover:bg-blue-50 transition-colors border border-dashed border-[#2563EB]/30 w-full justify-center"
                          >
                            <Plus size={13} />
                            Add fact to this topic
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {deleteTarget && (
        <DeleteModal
          onConfirm={handleDeleteFact}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
