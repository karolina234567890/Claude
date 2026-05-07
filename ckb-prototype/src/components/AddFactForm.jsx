import { useState } from 'react';
import { X } from 'lucide-react';
import { CLIENT } from '../data/mockData';

export default function AddFactForm({ onSave, onCancel }) {
  const [text, setText] = useState('');
  const [scopeType, setScopeType] = useState('client');
  const [selectedBrands, setSelectedBrands] = useState([]);

  const toggleBrand = brand => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleSave = () => {
    if (!text.trim()) return;
    let scope;
    if (scopeType === 'client') scope = { type: 'client' };
    else if (scopeType === 'all-brands') scope = { type: 'all-brands' };
    else scope = { type: 'brands', brands: selectedBrands };
    onSave({ text, scope, source: { type: 'manual' } });
  };

  return (
    <div className="mt-3 bg-blue-50 border border-blue-100 rounded-xl p-4">
      <p className="text-xs font-semibold text-gray-700 mb-2">Add a new fact</p>
      <textarea
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Enter fact or contextual information..."
        className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent"
        rows={3}
      />

      <div className="mt-3">
        <p className="text-xs font-medium text-gray-600 mb-2">Apply to:</p>
        <div className="flex flex-col gap-2">
          {[
            { value: 'client', label: `Whole client (${CLIENT.name})` },
            { value: 'all-brands', label: 'All Brands' },
            { value: 'brands', label: 'Specific brand(s)' },
          ].map(opt => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="scope"
                value={opt.value}
                checked={scopeType === opt.value}
                onChange={() => setScopeType(opt.value)}
                className="accent-[#2563EB]"
              />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>

        {scopeType === 'brands' && (
          <div className="mt-2 flex flex-wrap gap-2 pl-5">
            {CLIENT.brands.map(brand => (
              <button
                key={brand}
                onClick={() => toggleBrand(brand)}
                className={`text-xs px-3 py-1 rounded-full border transition-colors ${
                  selectedBrands.includes(brand)
                    ? 'bg-[#F5F3FF] text-[#8B5CF6] border-[#DDD6FE] font-medium'
                    : 'bg-white text-gray-600 border-gray-300 hover:border-gray-400'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-2 mt-4 justify-end">
        <button
          onClick={onCancel}
          className="px-4 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          disabled={!text.trim()}
          className="px-4 py-1.5 text-sm font-medium text-white bg-[#2563EB] rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Save Fact
        </button>
      </div>
    </div>
  );
}
