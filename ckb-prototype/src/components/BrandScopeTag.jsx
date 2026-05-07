import { Building2, Tag } from 'lucide-react';
import { CLIENT } from '../data/mockData';

export default function BrandScopeTag({ scope }) {
  const clientTag = (
    <span
      key="client"
      className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full border"
      style={{ background: '#F0FDF4', color: '#16A34A', borderColor: '#BBF7D0' }}
    >
      <Building2 size={10} />
      {CLIENT.name}
    </span>
  );

  if (scope.type === 'client') {
    return <div className="flex flex-wrap gap-1">{clientTag}</div>;
  }

  if (scope.type === 'all-brands') {
    return (
      <div className="flex flex-wrap gap-1">
        {clientTag}
        <span
          className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full border"
          style={{ background: '#F3F4F6', color: '#6B7280', borderColor: '#D1D5DB' }}
        >
          All Brands
        </span>
      </div>
    );
  }

  if (scope.type === 'brands') {
    return (
      <div className="flex flex-wrap gap-1">
        {clientTag}
        {scope.brands.map(b => (
          <span
            key={b}
            className="inline-flex items-center gap-1 text-xs font-medium px-2.5 py-0.5 rounded-full border"
            style={{ background: '#F5F3FF', color: '#8B5CF6', borderColor: '#DDD6FE' }}
          >
            <Tag size={10} />
            {b}
          </span>
        ))}
      </div>
    );
  }

  return null;
}
