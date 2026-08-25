import React from 'react';
import { UploadCloud, ShieldCheck, FileCode } from 'lucide-react';

interface HeroProps {
  onExploreTools: () => void;
  onPdfToMarkdown: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreTools, onPdfToMarkdown }) => {
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
        <p className="font-sans text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Free browser-based tools for PDFs, images, documents, and AI-ready file conversion.
        </p>

        {/* Call to actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
      </div>
    </section>
  );
};
