import React, { useEffect, useState } from 'react';
import { UploadCloud, ShieldCheck, FileCode, Users, Eye } from 'lucide-react';
import { fetchSiteStats, type SiteStats } from '../services/stats';

interface HeroProps {
  onExploreTools: () => void;
  onPdfToMarkdown: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreTools, onPdfToMarkdown }) => {
  const [stats, setStats] = useState<SiteStats>({
    pageViews: 48520,
    visitors: 14290,
    conversions: 38940,
    activeNow: 16,
  });

  useEffect(() => {
    let isMounted = true;
    fetchSiteStats().then((data) => {
      if (isMounted && data) {
        setStats(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-16 sm:pb-24 sm:pt-16">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/10 dark:bg-brand-500/5 rounded-full filter blur-[80px] -z-10" />
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-accent-500/10 dark:bg-accent-500/5 rounded-full filter blur-[60px] -z-10" />

      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Privacy Notice Badge */}
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-8 animate-fade-in">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>🔒 Your files stay on your device</span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl leading-tight sm:leading-none tracking-tight text-slate-900 dark:text-white mb-6">
          Convert, Compress & Transform{' '}
          <span className="bg-gradient-to-r from-brand-500 via-purple-500 to-accent-500 bg-clip-text text-transparent">
            Your Files Privately
          </span>
        </h1>

        {/* Supporting text */}
        <p className="font-sans text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          Free browser-based tools for PDFs, images, documents, and AI-ready file conversion.
        </p>

        {/* Call to actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <button
            onClick={onExploreTools}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <UploadCloud className="w-5 h-5" />
            <span>Explore Tools</span>
          </button>
          <button
            onClick={onPdfToMarkdown}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 dark:text-slate-200 dark:bg-slate-950 dark:hover:bg-slate-900 dark:border-slate-800 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <FileCode className="w-4 h-4 text-brand-500" />
            <span>PDF to Markdown</span>
          </button>
        </div>

        {/* Live Visitor & Page Views Stats Ribbon */}
        <div className="inline-flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-6 py-3 rounded-2xl bg-white/60 dark:bg-slate-950/60 backdrop-blur-md border border-slate-200/80 dark:border-slate-800/80 text-xs font-semibold text-slate-600 dark:text-slate-400 shadow-sm">
          <div className="flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-brand-500" />
            <span><strong className="text-slate-800 dark:text-slate-200">{stats.visitors.toLocaleString()}</strong> Visitors</span>
          </div>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-purple-500" />
            <span><strong className="text-slate-800 dark:text-slate-200">{stats.pageViews.toLocaleString()}</strong> Page Views</span>
          </div>
          <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
          <div className="flex items-center gap-1.5">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">{stats.activeNow} Active Now</span>
          </div>
        </div>
      </div>
    </section>
  );
};
