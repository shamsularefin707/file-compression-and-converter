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
import { Sparkles, ArrowRight, FileCode, Database, Bot, BrainCircuit, Notebook, FileCheck } from 'lucide-react';

interface HomeViewProps {
  onNavigate: (path: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ onNavigate }) => {
  const popularTools = getPopularTools();

  const handleExploreTools = () => {
    onNavigate('/tools');
  };

  const handlePdfToMarkdown = () => {
    onNavigate('/tools/pdf-to-markdown');
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
        title={`${SITE_CONFIG.name} | Convert, Compress & Transform Your Files Privately`}
        description={SITE_CONFIG.description}
        keywords={['file converter', 'pdf to markdown', 'compress pdf', 'image compressor', 'jpg to webp', 'ai document preparation']}
        jsonLd={jsonLd}
      />

      <Hero onExploreTools={handleExploreTools} onPdfToMarkdown={handlePdfToMarkdown} />

      <AdSlot position="top_banner" slotId="home-top-banner" />

      {/* Main Workspace Drag & Drop Engine */}
      <Workspace />

      {/* Featured Flagship Tool Section: PDF to Markdown */}
      <section className="my-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white relative overflow-hidden shadow-2xl border border-slate-800">
        <div className="absolute right-0 top-0 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 border border-brand-500/30 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Flagship Feature</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight mb-4 text-white">
            PDF to Markdown for AI Workflows
          </h2>
          
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
            Transform heavy, binary PDF documents into clean, structured Markdown. Preserves headings, bullet lists, tables, and typography hierarchy—optimizing documents for:
          </p>

          {/* AI LLM & Productivity Use Case Chips */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-200 flex items-center gap-1.5">
              <Bot className="w-3.5 h-3.5 text-cyan-400" /> ChatGPT
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-200 flex items-center gap-1.5">
              <BrainCircuit className="w-3.5 h-3.5 text-purple-400" /> Claude
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-200 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Gemini
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-200 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-400" /> RAG Pipelines
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-200 flex items-center gap-1.5">
              <Notebook className="w-3.5 h-3.5 text-blue-400" /> Documentation & Notes
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-200 flex items-center gap-1.5">
              <FileCheck className="w-3.5 h-3.5 text-rose-400" /> Knowledge Bases & Research
            </span>
          </div>

          {/* Simple Visual Workflow Diagram */}
          <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 mb-8 flex flex-col sm:flex-row items-center justify-around gap-4 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center font-bold text-xs">
                PDF
              </div>
              <div className="text-xs">
                <div className="font-semibold text-slate-200">Raw PDF Input</div>
                <div className="text-slate-400">Binary streams</div>
              </div>
            </div>
            
            <ArrowRight className="w-4 h-4 text-slate-500 hidden sm:block shrink-0" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs">
                NDM
              </div>
              <div className="text-xs">
                <div className="font-semibold text-slate-200">Structured Markdown</div>
                <div className="text-slate-400">Clean H1-H4 & tables</div>
              </div>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-500 hidden sm:block shrink-0" />

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
                AI
              </div>
              <div className="text-xs">
                <div className="font-semibold text-slate-200">AI / Knowledge Base</div>
                <div className="text-slate-400">Optimized prompt context</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 items-center">
            <button
              onClick={handlePdfToMarkdown}
              className="px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-brand-500/20"
            >
              <FileCode className="w-4 h-4" />
              <span>Use PDF to Markdown Tool</span>
              <ArrowRight className="w-4 h-4 ml-1" />
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

      {/* Tool Categories Showcase */}
      <section className="my-16">
        <h2 className="text-2xl font-display font-bold text-slate-900 dark:text-white mb-6">
          Explore by Tool Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TOOL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('/tools')}
              className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 hover:border-brand-500/40 dark:hover:border-brand-500/40 transition-all cursor-pointer group shadow-sm flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex items-center gap-2">
                  <span>{cat.name}</span>
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>
              <div className="mt-4 text-xs font-semibold text-brand-500 flex items-center gap-1">
                <span>Browse Category</span>
                <ArrowRight className="w-3 h-3" />
              </div>
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
