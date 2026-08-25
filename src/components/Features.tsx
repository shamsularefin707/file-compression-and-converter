import React from 'react';
import { 
  Zap, 
  Cpu, 
  ShieldAlert, 
  Layers, 
  FileCheck, 
  Smile 
} from 'lucide-react';

export const Features: React.FC = () => {
  const items = [
    {
      title: 'Fast Processing',
      description: 'Files are processed instantly on your hardware. No waiting in remote server queues.',
      icon: Zap,
      color: 'text-amber-500 bg-amber-500/10 dark:bg-amber-500/5',
    },
    {
      title: 'Browser-Based',
      description: 'Uses advanced browser APIs, Canvas, and WebAssembly to run entirely on the client side.',
      icon: Cpu,
      color: 'text-brand-500 bg-brand-500/10 dark:bg-brand-500/5',
    },
    {
      title: 'Privacy First',
      description: 'Your sensitive data never leaves your computer. Absolute compliance with strict data security.',
      icon: ShieldAlert,
      color: 'text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/5',
    },
    {
      title: 'Batch Processing',
      description: 'Upload multiple files of different types simultaneously and compress or convert them in one go.',
      icon: Layers,
      color: 'text-accent-500 bg-accent-500/10 dark:bg-accent-500/5',
    },
    {
      title: 'Multiple Formats',
      description: 'Convert between PNG, JPG, WebP, AVIF, PDF, JSON, CSV, XLSX, Markdown, DOCX, and ZIP.',
      icon: FileCheck,
      color: 'text-blue-500 bg-blue-500/10 dark:bg-blue-500/5',
    },
    {
      title: 'Free to Use',
      description: 'No accounts, no email forms, no hidden subscription walls or page watermarks.',
      icon: Smile,
      color: 'text-rose-500 bg-rose-500/10 dark:bg-rose-500/5',
    },
  ];

  return (
    <section id="features" className="py-20 bg-slate-50/50 dark:bg-slate-900/30 border-y border-slate-100 dark:border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white mb-4">
            Everything you need. Done locally.
          </h2>
          <p className="font-sans text-slate-500 dark:text-slate-400">
            A comprehensive, client-side toolkit that respects your privacy.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((item, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-3xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800/80 shadow-sm hover:shadow-md hover:border-slate-200/60 dark:hover:border-slate-700/60 hover:scale-[1.01] transition-all duration-200"
            >
              <div className={`inline-flex p-3 rounded-2xl ${item.color} mb-6`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="font-display font-semibold text-lg text-slate-900 dark:text-white mb-3">
                {item.title}
              </h3>
              <p className="font-sans text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
