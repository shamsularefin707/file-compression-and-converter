import React from 'react';
import type { ToolDefinition } from '../../types/tools';
import { Sparkles, ArrowRight, FileText, RefreshCw, FileCode, ImageIcon, Code, FileSpreadsheet, FileCheck, FilePlus } from 'lucide-react';

interface ToolCardProps {
  tool: ToolDefinition;
  onNavigate: (path: string) => void;
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, onNavigate }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-brand-500" />;
      case 'FileText': return <FileText className="w-5 h-5 text-blue-500" />;
      case 'FileSpreadsheet': return <FileSpreadsheet className="w-5 h-5 text-emerald-500" />;
      case 'FileCode': return <FileCode className="w-5 h-5 text-amber-500" />;
      case 'Code': return <Code className="w-5 h-5 text-purple-500" />;
      case 'FileCheck': return <FileCheck className="w-5 h-5 text-indigo-500" />;
      case 'FilePlus': return <FilePlus className="w-5 h-5 text-rose-500" />;
      case 'ImageIcon': return <ImageIcon className="w-5 h-5 text-emerald-500" />;
      default: return <RefreshCw className="w-5 h-5 text-brand-500" />;
    }
  };

  return (
    <div
      onClick={() => onNavigate(`/tools/${tool.slug}`)}
      className="p-5 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 hover:border-brand-500/40 dark:hover:border-brand-500/40 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/60">
            {getIcon(tool.icon)}
          </div>
          <div className="flex items-center gap-1.5">
            {tool.isAiReady && (
              <span className="px-2 py-0.5 rounded-full bg-brand-500/10 dark:bg-brand-950/60 text-brand-600 dark:text-brand-400 border border-brand-500/20 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                <span>AI-Ready</span>
              </span>
            )}
            <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider">
              {tool.processingMode === 'client' ? 'Client-Side' : 'Serverless'}
            </span>
          </div>
        </div>

        <h3 className="font-display font-bold text-base text-slate-800 dark:text-slate-100 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {tool.name}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2 leading-relaxed">
          {tool.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
        <span>Formats: {tool.inputFormats.join(', ').toUpperCase()} → {tool.defaultOutputFormat.toUpperCase()}</span>
        <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
};
