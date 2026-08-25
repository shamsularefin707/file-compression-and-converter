import React from 'react';
import { Play, UploadCloud, ShieldCheck, Cpu } from 'lucide-react';

interface HeroProps {
  onChooseFiles: () => void;
  onTryDemo: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onChooseFiles, onTryDemo }) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-12 pb-16 sm:pb-24 sm:pt-16">
      {/* Background Decorative Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-500/10 dark:bg-brand-500/5 rounded-full filter blur-[80px] -z-10" />
      <div className="absolute top-1/3 left-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-accent-500/10 dark:bg-accent-500/5 rounded-full filter blur-[60px] -z-10" />

      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Privacy Notice Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-xs font-semibold mb-8 animate-fade-in">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>100% Secure & Client-Side Processing</span>
        </div>

        {/* Headline */}
        <h1 className="font-display font-extrabold text-5xl sm:text-7xl leading-tight sm:leading-none tracking-tight text-slate-900 dark:text-white mb-6">
          Compress. Convert.{' '}
          <span className="bg-gradient-to-r from-brand-500 via-purple-500 to-accent-500 bg-clip-text text-transparent animate-gradient">
            Done.
          </span>
        </h1>

        {/* Supporting text */}
        <p className="font-sans text-lg sm:text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          A fast, privacy-first file toolkit for compressing and converting your files. 
          Everything runs locally in your browser — your files never leave your device.
        </p>

        {/* Call to actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onChooseFiles}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <UploadCloud className="w-5 h-5" />
            <span>Choose Files</span>
          </button>
          <button
            onClick={onTryDemo}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 dark:text-slate-200 dark:bg-slate-950 dark:hover:bg-slate-900 dark:border-slate-800 shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <Play className="w-4 h-4 text-brand-500 fill-brand-500" />
            <span>Try a Demo</span>
          </button>
        </div>

        {/* Privacy Banner */}
        <div className="max-w-2xl mx-auto p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 flex items-center gap-3 text-left">
          <div className="bg-brand-100 dark:bg-brand-950 p-2.5 rounded-xl text-brand-600 dark:text-brand-400 shrink-0">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
              Why FileForge is different:
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              "Your files are processed locally in your browser whenever possible. We don't upload your files."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
