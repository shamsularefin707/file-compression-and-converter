import React from 'react';
import type { ToolDefinition } from '../../types/tools';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { Workspace } from '../Workspace';
import { ToolCard } from '../tools/ToolCard';
import { AdSlot } from '../ads/AdSlot';
import { TOOLS } from '../../config/tools';
import { Sparkles, Shield, CheckCircle2, Lock, FileType, Lightbulb } from 'lucide-react';

interface ToolViewProps {
  tool: ToolDefinition;
  onNavigate: (path: string) => void;
}

export const ToolView: React.FC<ToolViewProps> = ({ tool, onNavigate }) => {
  const relatedTools = TOOLS.filter((t) => t.category === tool.category && t.id !== tool.id).slice(0, 3);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': tool.seo.h1,
    'operatingSystem': 'All',
    'applicationCategory': 'UtilitiesApplication',
    'description': tool.seo.description,
    'offers': {
      '@type': 'Offer',
      'price': '0.00',
      'priceCurrency': 'USD',
    },
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      <SEOHead
        title={tool.seo.title}
        description={tool.seo.description}
        keywords={tool.seo.keywords}
        jsonLd={jsonLd}
      />

      <Breadcrumbs
        items={[
          { label: 'Tools', href: '/tools', onClick: () => onNavigate('/tools') },
          { label: tool.name },
        ]}
      />

      <AdSlot position="top_banner" slotId={`tool-${tool.slug}-top`} />

      {/* Tool Header Banner */}
      <header className="my-6">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 text-xs font-bold uppercase tracking-wider">
            {tool.category.toUpperCase()} TOOL
          </span>
          <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-xs font-medium flex items-center gap-1">
            <Lock className="w-3.5 h-3.5 text-emerald-500" />
            <span>{tool.processingMode === 'client' ? '100% Client-Side Privacy' : 'Serverless Ephemeral RAM Processing'}</span>
          </span>
          {tool.isAiReady && (
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Ready LLM Optimization</span>
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
          {tool.seo.h1}
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mt-2 max-w-3xl leading-relaxed">
          {tool.description}
        </p>
      </header>

      {/* Embedded Workspace Engine */}
      <div className="my-8">
        <Workspace initialTargetFormat={tool.defaultOutputFormat} />
      </div>

      {/* Supported Formats Section */}
      <section className="my-10 p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
        <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <FileType className="w-5 h-5 text-brand-500" />
          <span>Supported File Formats</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
            <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Accepted Input Formats:</span>
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {tool.inputFormats.map((fmt) => (
                <span key={fmt} className="px-2 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 uppercase">
                  .{fmt}
                </span>
              ))}
            </div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
            <span className="font-semibold text-slate-700 dark:text-slate-300 block mb-1">Generated Output Formats:</span>
            <div className="flex flex-wrap gap-1.5 font-mono text-xs">
              {tool.outputFormats.map((fmt) => (
                <span key={fmt} className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 uppercase">
                  .{fmt}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI-Ready Document Special Explanation */}
      {tool.isAiReady && (
        <section className="my-10 p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-md">
          <div className="flex items-center gap-2 text-brand-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4" />
            <span>AI Context & Token Optimization</span>
          </div>
          <h2 className="text-lg font-bold text-white mb-2">
            Optimized for ChatGPT, Claude & Knowledge Bases
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
            Converting documents with this tool strips binary PDF markers, font subsets, and header noise while preserving headings, lists, and tables. This reduces token overhead by up to 40% when pasting content into AI models.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <p className="text-slate-400">Heading Preservation</p>
              <p className="font-bold text-emerald-400 mt-0.5">H1 to H4 Structure</p>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <p className="text-slate-400">Table Extraction</p>
              <p className="font-bold text-emerald-400 mt-0.5">GFM Pipe Tables</p>
            </div>
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
              <p className="text-slate-400">Token Efficiency</p>
              <p className="font-bold text-emerald-400 mt-0.5">~35-40% Reduction</p>
            </div>
          </div>
        </section>
      )}

      <AdSlot position="content_mid" slotId={`tool-${tool.slug}-mid`} />

      {/* Key Features */}
      {tool.features.length > 0 && (
        <section className="my-10 p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-4">
            Key Features of {tool.name}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {tool.features.map((feat, fIdx) => (
              <li key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* How It Works Steps */}
      {tool.howItWorks.length > 0 && (
        <section className="my-10">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-6">
            How to Use {tool.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {tool.howItWorks.map((step) => (
              <div key={step.step} className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
                <div className="w-8 h-8 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400 font-bold text-sm flex items-center justify-center mb-3">
                  {step.step}
                </div>
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 mb-1">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Common Use Cases Section */}
      <section className="my-10 p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
        <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <span>Common Use Cases</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">AI Prompt Ingestion</h3>
            <p className="leading-relaxed">Extract clean text and document structure for ChatGPT, Claude, and RAG knowledge bases.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Web & Document Publishing</h3>
            <p className="leading-relaxed">Convert legacy document files into lightweight web-ready formats like WebP or Markdown.</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60">
            <h3 className="font-bold text-slate-800 dark:text-slate-200 mb-1">Secure & Fast Archiving</h3>
            <p className="leading-relaxed">Shrink large files for email attachments and local storage without losing typography or quality.</p>
          </div>
        </div>
      </section>

      {/* Privacy Notice Card */}
      <section className="my-10 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-900 dark:text-emerald-300 flex items-start gap-3 text-xs sm:text-sm">
        <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <p className="font-bold">Privacy & Security Guarantee</p>
          <p className="mt-1 opacity-90 leading-relaxed">
            {tool.processingMode === 'client' 
              ? 'Your files are processed locally inside your web browser. File bytes never leave your device.'
              : 'Files uploaded for serverless conversion are processed ephemerally in RAM and immediately deleted upon completion. We never store or retain user documents.'}
          </p>
        </div>
      </section>

      {/* Tool FAQs */}
      {tool.faqs.length > 0 && (
        <section className="my-10">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {tool.faqs.map((faq, qIdx) => (
              <div key={qIdx} className="p-4 rounded-xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80">
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 mb-1">
                  {faq.question}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="my-12">
          <h2 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-4">
            Related Tools
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {relatedTools.map((rt) => (
              <ToolCard key={rt.id} tool={rt} onNavigate={onNavigate} />
            ))}
          </div>
        </section>
      )}

      <AdSlot position="bottom_footer" slotId={`tool-${tool.slug}-bottom`} />
    </div>
  );
};
