import React, { useState } from 'react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { ToolCard } from '../tools/ToolCard';
import { TOOLS, TOOL_CATEGORIES } from '../../config/tools';
import { SITE_CONFIG } from '../../config/site';
import { Search, Sparkles } from 'lucide-react';

interface ToolsDirectoryViewProps {
  onNavigate: (path: string) => void;
}

export const ToolsDirectoryView: React.FC<ToolsDirectoryViewProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredTools = TOOLS.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tool.inputFormats.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    'name': `All File Tools & Converters | ${SITE_CONFIG.name}`,
    'description': 'Browse all 18 online file tools: PDF to Markdown, PDF to DOCX, image compressor, JPG to WebP, and document converters.',
    'url': 'https://file-compression-and-converter.vercel.app/tools',
    'mainEntity': {
      '@type': 'ItemList',
      'numberOfItems': TOOLS.length,
      'itemListElement': TOOLS.map((tool, idx) => ({
        '@type': 'ListItem',
        'position': idx + 1,
        'name': tool.name,
        'url': `https://file-compression-and-converter.vercel.app/tools/${tool.slug}`,
      })),
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <SEOHead
        title={`All 18 Online File Converters & Tools | ${SITE_CONFIG.name}`}
        description="Browse all 18 free online file tools: PDF to Markdown, PDF to DOCX, image compressor, JPG to WebP, and document utilities."
        keywords={['file tools directory', 'pdf converter list', 'image compression tools', 'ai document converters']}
        jsonLd={jsonLd}
      />

      <Breadcrumbs items={[{ label: 'All Tools' }]} />

      <header className="my-6">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Complete Tools Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
          FileForge Utilities Suite
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
          Fast, browser-first conversion and compression engines. Strip binary noise from PDFs, optimize graphics for Core Web Vitals, and prepare documents for AI LLM prompts.
        </p>
      </header>

      {/* Search & Category Filter */}
      <div className="my-6 flex flex-col sm:flex-row items-center gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools or formats (e.g. PDF, WebP, MD)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
              selectedCategory === 'all'
                ? 'bg-brand-500 text-white shadow-sm'
                : 'bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
            }`}
          >
            All Tools ({TOOLS.length})
          </button>
          {TOOL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-brand-500 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onNavigate={onNavigate} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center rounded-2xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 my-8">
          <p className="text-slate-500 dark:text-slate-400 text-sm font-semibold">
            No conversion tools matched your search "{searchQuery}".
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
            className="mt-4 px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
