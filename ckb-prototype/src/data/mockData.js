export const CLIENT = {
  name: 'Soft Scrub',
  brands: ['Soft Scrub Gel', 'Soft Scrub Bleach Cleanser', 'Soft Scrub Bathroom'],
};

export const TOPICS = [
  {
    id: 'brand-strategy',
    name: 'Brand Strategy',
    icon: 'target',
    description: 'Brand positioning, identity, and product differentiation',
    aiSummary:
      'Soft Scrub is positioned as a trusted, efficacy-focused household cleaning brand targeting homeowners aged 25–55. Brand strategy centers on demonstrating deep clean results with surface-safe formulas. Gel and Bleach Cleanser sub-brands serve distinct cleaning needs with separate targeting approaches.',
    facts: [
      {
        id: 'bs-1',
        text: 'Soft Scrub is a premium cleaning brand focused on deep clean results with surface-safe formulas for bathrooms and kitchens.',
        scope: { type: 'client' },
        source: { type: 'file', name: 'soft-scrub-brand-guide.pdf' },
      },
      {
        id: 'bs-2',
        text: 'Soft Scrub Gel targets bathroom cleaning with focus on mold and mildew removal for tile and grout surfaces.',
        scope: { type: 'brands', brands: ['Soft Scrub Gel'] },
        source: { type: 'file', name: 'product-strategy-2024.pdf' },
      },
      {
        id: 'bs-3',
        text: 'Soft Scrub Bleach Cleanser focuses on kitchen and bathroom disinfection, competing directly with Clorox in the bleach sub-category.',
        scope: { type: 'brands', brands: ['Soft Scrub Bleach Cleanser'] },
        source: { type: 'file', name: 'product-strategy-2024.pdf' },
      },
      {
        id: 'bs-4',
        text: "All Soft Scrub products carry a 'surface safe, deep clean' brand promise that must be present in all advertising executions.",
        scope: { type: 'all-brands' },
        source: { type: 'file', name: 'soft-scrub-brand-guide.pdf' },
      },
    ],
  },
  {
    id: 'audience-strategy',
    name: 'Audience Strategy',
    icon: 'users',
    description: 'Target audience profiles, demographics, and segmentation',
    aiSummary:
      'Primary target is homeowners aged 25–55, skewing female, with Gel skewing younger (25–44) and Bleach Cleanser skewing older (45–65). Digital-first media approach with Pinterest and YouTube as primary platforms. Professional cleaners are a secondary audience across all sub-brands.',
    facts: [
      {
        id: 'as-1',
        text: 'Primary target: homeowners aged 25–55, HHI $50K+, skewing female 60/40, who prioritize cleanliness and home pride.',
        scope: { type: 'client' },
        source: { type: 'file', name: 'audience-research-2024.pdf' },
      },
      {
        id: 'as-2',
        text: 'Soft Scrub Gel skews younger female 25–44 who prefer gel-format products and are active on Pinterest and Instagram.',
        scope: { type: 'brands', brands: ['Soft Scrub Gel'] },
        source: { type: 'file', name: 'audience-research-2024.pdf' },
      },
      {
        id: 'as-3',
        text: 'Soft Scrub Bleach Cleanser skews toward older demographic (45–65) who associate bleach with professional-grade cleaning and high efficacy.',
        scope: { type: 'brands', brands: ['Soft Scrub Bleach Cleanser'] },
        source: { type: 'file', name: 'brand-tracking-Q3-2024.pdf' },
      },
      {
        id: 'as-4',
        text: 'Secondary audience: professional house cleaners and janitorial staff — relevant for both Gel and Bleach formats.',
        scope: { type: 'brands', brands: ['Soft Scrub Gel', 'Soft Scrub Bleach Cleanser'] },
        source: { type: 'manual' },
      },
    ],
  },
  {
    id: 'channel-strategy',
    name: 'Channel Strategy',
    icon: 'bar-chart-2',
    description: 'Media channel allocation, budget split, and platform priorities',
    aiSummary:
      'Digital channels account for 60% of Soft Scrub media budget. YouTube and Pinterest are primary for demonstration content. Bleach Cleanser benefits from retail media at Walmart and Target. Traditional TV retained for older Bleach Cleanser audience in Q4.',
    facts: [
      {
        id: 'cs-1',
        text: 'Soft Scrub allocates 60% of media budget to digital channels, with YouTube and Pinterest as primary for demonstration content.',
        scope: { type: 'client' },
        source: { type: 'file', name: 'media-strategy-2024.pdf' },
      },
      {
        id: 'cs-2',
        text: 'Soft Scrub Bleach Cleanser benefits from retail media investment at Walmart and Target given strong in-store purchase intent.',
        scope: { type: 'brands', brands: ['Soft Scrub Bleach Cleanser'] },
        source: { type: 'file', name: 'retail-media-brief-2024.pdf' },
      },
      {
        id: 'cs-3',
        text: 'Q4 2024: Brand team confirmed 70% digital / 30% traditional. TV reserved for November holiday burst only.',
        scope: { type: 'all-brands' },
        source: { type: 'manual' },
      },
    ],
  },
  {
    id: 'competitors',
    name: 'Competitors',
    icon: 'sword',
    description: 'Competitive landscape, share of voice, and differentiation',
    aiSummary:
      'Main competitors are Clorox, Mr. Clean, and Method. Clorox is the primary threat for Bleach Cleanser. Method targets eco-conscious premium consumers. Soft Scrub differentiates through the surface-safe + efficacy combination.',
    facts: [
      {
        id: 'comp-1',
        text: 'Main competitors: Clorox (bleach trust leader), Mr. Clean (multi-surface versatility), Method (eco premium millennial).',
        scope: { type: 'client' },
        source: { type: 'file', name: 'competitor-analysis-2024.pdf' },
      },
      {
        id: 'comp-2',
        text: 'Clorox increased media spend by 22% in H1 2024, primarily in digital video and retail media, pressuring Bleach Cleanser.',
        scope: { type: 'brands', brands: ['Soft Scrub Bleach Cleanser'] },
        source: { type: 'file', name: 'competitor-analysis-2024.pdf' },
      },
    ],
  },
];

export const FILES = [
  {
    id: 'f1',
    name: 'soft-scrub-brand-guide.pdf',
    uploadedBy: 'Sarah Mitchell',
    date: '2024-10-15',
    category: 'Brand Strategy',
    language: 'English',
    scope: { type: 'client' },
  },
  {
    id: 'f2',
    name: 'product-strategy-2024.pdf',
    uploadedBy: 'James Okonkwo',
    date: '2024-11-03',
    category: 'Product',
    language: 'English',
    scope: { type: 'brands', brands: ['Soft Scrub Gel', 'Soft Scrub Bleach Cleanser'] },
  },
  {
    id: 'f3',
    name: 'audience-research-2024.pdf',
    uploadedBy: 'Sarah Mitchell',
    date: '2024-11-18',
    category: 'Audience',
    language: 'English',
    scope: { type: 'all-brands' },
  },
  {
    id: 'f4',
    name: 'media-strategy-2024.pdf',
    uploadedBy: 'David Chen',
    date: '2024-12-01',
    category: 'Media Planning',
    language: 'English',
    scope: { type: 'client' },
  },
  {
    id: 'f5',
    name: 'retail-media-brief-2024.pdf',
    uploadedBy: 'James Okonkwo',
    date: '2025-01-10',
    category: 'Retail Media',
    language: 'English',
    scope: { type: 'brands', brands: ['Soft Scrub Bleach Cleanser'] },
  },
];

export const MEDIA_PLANS = [
  { id: 'mp1', name: 'Q1 2025 — Digital Refresh', brand: 'Soft Scrub Gel', dateRange: '31 Dec 2025 – 30 Dec 2026', creator: 'PM', creationDate: '07 May 2026' },
  { id: 'mp2', name: 'Spring Clean Campaign', brand: 'Soft Scrub Bleach Cleanser', dateRange: '31 Dec 2025 – 30 Dec 2026', creator: 'OD', creationDate: '07 May 2026' },
  { id: 'mp3', name: 'Brand Awareness — All Products', brand: 'All Brands', dateRange: '01 Jan 2026 – 30 Dec 2026', creator: 'AA', creationDate: '07 May 2026' },
  { id: 'mp4', name: 'Retail Media — Walmart Q1', brand: 'Soft Scrub Bleach Cleanser', dateRange: '31 Dec 2025 – 30 Dec 2026', creator: 'PM', creationDate: '07 May 2026' },
  { id: 'mp5', name: 'Soft Scrub Gel — Pinterest Push', brand: 'Soft Scrub Gel', dateRange: '01 Mar 2026 – 30 Jun 2026', creator: 'SM', creationDate: '06 May 2026' },
  { id: 'mp6', name: 'Holiday Burst — November 2025', brand: 'All Brands', dateRange: '01 Nov 2025 – 30 Nov 2025', creator: 'AA', creationDate: '06 May 2026' },
  { id: 'mp7', name: 'YouTube Demo Content Q2', brand: 'Soft Scrub Gel', dateRange: '01 Apr 2026 – 30 Jun 2026', creator: 'JO', creationDate: '05 May 2026' },
  { id: 'mp8', name: 'Clorox Competitive Response', brand: 'Soft Scrub Bleach Cleanser', dateRange: '14 Nov 2025 – 23 Dec 2026', creator: 'PM', creationDate: '05 May 2026' },
];

export const MULTIMARKET_PLANS = [
  { id: 'mm1', name: 'Global Brand Platform 2025', brand: 'All Brands', markets: ['United States', 'United Kingdom', 'Canada'], dateRange: '14 Jan 2025 – 23 Dec 2026', creator: 'PM', creationDate: '07 May 2026' },
  { id: 'mm2', name: 'EMEA Expansion — Gel Format', brand: 'Soft Scrub Gel', markets: ['United Kingdom', 'Germany', 'France', 'Netherlands'], dateRange: '14 Jan 2025 – 23 Dec 2026', creator: 'OD', creationDate: '07 May 2026' },
  { id: 'mm3', name: 'North America Q2 Push', brand: 'Soft Scrub Bleach Cleanser', markets: ['United States', 'Canada', 'Mexico'], dateRange: '02 Apr 2023 – 30 Mar 2023', creator: 'DT', creationDate: '07 May 2026' },
  { id: 'mm4', name: 'Testing exchange rates on details page', brand: 'Soft Scrub Gel', markets: ['United States', 'United Kingdom'], dateRange: '31 Dec 2024 – 30 Dec 2025', creator: 'AA', creationDate: '07 May 2026' },
  { id: 'mm5', name: 'Su23 Move to Zero new', brand: 'All Brands', markets: ['United States', 'Canada', 'Germany'], dateRange: '30 Apr 2026 – 30 Jul 2026', creator: 'OD', creationDate: '07 May 2026' },
  { id: 'mm6', name: 'Embrace Luxury — Winter 2566', brand: 'Soft Scrub Bleach Cleanser', markets: ['United States', 'United Kingdom'], dateRange: '14 Jan 2025 – 30 Dec 2025', creator: 'AA', creationDate: '06 May 2026' },
  { id: 'mm7', name: 'as-currency', brand: 'All Brands', markets: ['United States', 'Canada'], dateRange: '14 Jan 2025 – 30 Dec 2025', creator: 'AA', creationDate: '06 May 2026' },
];

export const COPILOT_MESSAGES = [
  {
    id: 1,
    role: 'user',
    text: 'What audience should I target for this Soft Scrub Gel campaign?',
  },
  {
    id: 2,
    role: 'copilot',
    text: "Based on your knowledge base, I'd recommend targeting females aged 25–44 who are active on Pinterest and Instagram. They prefer gel-format products and respond strongly to before/after demonstration content. Consider layering in a secondary professional cleaner audience (25–55) which overlaps with the Bleach Cleanser segment.",
    sources: [
      {
        level: 'Global',
        icon: 'globe',
        title: 'Media trends 2024',
        storage: 'SharePoint (external, read-only)',
        external: true,
      },
      {
        level: 'Market: United States',
        icon: 'map-pin',
        title: 'US digital media landscape',
        storage: 'SharePoint (external, read-only)',
        external: true,
      },
      {
        level: 'Client: Soft Scrub',
        icon: 'building-2',
        title: 'Brand strategy overview',
        storage: 'CKB',
        file: 'soft-scrub-brand-guide.pdf',
        external: false,
      },
      {
        level: 'Brand: Soft Scrub Gel',
        icon: 'tag',
        title: 'Audience strategy',
        storage: 'CKB',
        file: 'Manual input',
        external: false,
      },
    ],
  },
  {
    id: 3,
    role: 'user',
    text: 'Which channels should I prioritize for this campaign?',
  },
  {
    id: 4,
    role: 'copilot',
    text: "For Soft Scrub Gel, I'd prioritize Pinterest (visual discovery, high purchase intent) and Instagram Reels (younger female demographic, high engagement). YouTube is strong for longer demonstration content. Allocate at least 60% to digital channels in line with the client's established media strategy.",
    sources: null,
  },
];
