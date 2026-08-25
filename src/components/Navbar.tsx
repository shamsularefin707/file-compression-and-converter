import React from 'react';
import { Sun, Moon, Hammer, Sparkles, Grid, BookOpen } from 'lucide-react';
import type { Theme } from '../hooks/useTheme';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  onNavigate,
}) => {
  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-8 py-3.5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onNavigate('/')}
        >
          <div className="bg-gradient-to-tr from-brand-600 to-accent-600 p-2 rounded-xl text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
            <Hammer className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-accent-400">
            FileForge
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 font-sans font-medium text-xs sm:text-sm text-slate-600 dark:text-slate-300">
          <button 
            onClick={() => onNavigate('/tools')}
            className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1.5"
          >
            <Grid className="w-3.5 h-3.5" />
            <span>All Tools</span>
          </button>

          <button 
            onClick={() => onNavigate('/tools/pdf-to-markdown')}
            className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1 text-brand-600 dark:text-brand-400 font-bold"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>PDF → AI Markdown</span>
          </button>

          <button 
            onClick={() => onNavigate('/blog')}
            className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Guides</span>
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <div
            className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide bg-brand-500/10 text-brand-600 dark:bg-brand-500/5 dark:text-brand-400 border border-brand-500/20"
            title="Fast, private file tools"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Free & Private</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl border border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400 transition-all duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Directory Button */}
          <button
            onClick={() => onNavigate('/tools')}
            className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-brand-600 hover:bg-brand-700 transition-colors shadow-sm"
          >
            Open Tools
          </button>
        </div>
      </div>
    </nav>
  );
};
