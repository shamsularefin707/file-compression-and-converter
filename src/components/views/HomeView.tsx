import React from 'react';
import { SEOHead } from '../common/SEOHead';
import { Hero } from '../Hero';
import { Workspace } from '../Workspace';
import { Features } from '../Features';
import { FAQ } from '../FAQ';
import { ToolCard } from '../tools/ToolCard';
import { AdSlot } from '../ads/AdSlot';
import { getPopularTools, TOOL_CATEGORIES } from '../../config/tools';
import { SITE_CONFIG } from '../../config/site';
import { Sparkles, ArrowRight, FileCode } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (path: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const popularTools = getPopularTools();

  const handleChooseFiles = () => {
    const el = document.getElementById('workspace');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      fileInput?.click();
    }, 150);
  };

  const handleTryDemo = () => {
    const el = document.getElementById('workspace');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    'name': SITE_CONFIG.name,
    'url': SITE_CONFIG.url,
    'description': SITE_CONFIG.description,
    'applicationCategory': 'UtilitiesApplication',
    'operatingSystem': 'All',
    'offers': {
      '@type': 'Offer',
      'price': '0.00',
      'priceCurrency': 'USD',
    },
  };

  return (
    <>
      <SEOHead
        title={`${SITE_CONFIG.name} | Fast, Private & Easy File Tools`}
        description={SITE_CONFIG.description}
        keywords={['file converter', 'pdf to markdown', 'compress pdf', 'image compressor', 'jpg to webp', 'ai document preparation']}
        jsonLd={jsonLd}
      />

      <Hero onChooseFiles={handleChooseFiles} onTryDemo={handleTryDemo} />

      <AdSlot position="top_banner" slotId="home-top-banner" />

      {/* Main Workspace Drag & Drop Engine */}
      <Workspace />

      {/* AI-Ready Document Section */}
      <section className="my-16 p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white relative overflow-hidden shadow-xl border border-slate-800">
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Workflow Architecture</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold tracking-tight mb-4 text-white">
            Prepare Documents for ChatGPT, Claude & AI LLMs
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Raw PDFs contain binary overhead, line-break noise, and repetitive headers. Our Normalized Document Engine parses PDF typography into structured Markdown—preserving headings, tables, and lists while saving up to 40% in AI prompt tokens.
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={() => onNavigate('/tools/pdf-to-markdown')}
              className="px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-brand-500/20"
            >
              <FileCode className="w-4 h-4" />
              <span>Try PDF to Markdown Converter</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
            <button
              onClick={() => onNavigate('/blog/pdf-to-markdown-ai-guide')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 font-semibold text-sm transition-all"
            >
              Read AI Optimization Guide
            </button>
          </div>
        </div>
      </section>

      {/* Popular Tools Directory */}
      <section className="my-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white">
              Popular Tools
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Browser-based file conversion and compression utilities.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/tools')}
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center gap-1"
          >
            <span>View All Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {popularTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} onNavigate={onNavigate} />
          ))}
        </div>
      </section>

      <AdSlot position="content_mid" slotId="home-mid-banner" />

      {/* Categories Showcase */}
      <section className="my-16">
        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-6">
          Explore by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {TOOL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('/tools')}
              className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 hover:border-brand-500/40 dark:hover:border-brand-500/40 transition-all cursor-pointer group shadow-sm"
            >
              <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex items-center gap-2">
                <span>{cat.name}</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Features />

      <FAQ />

      <AdSlot position="bottom_footer" slotId="home-bottom-banner" />
    </>
  );
};
