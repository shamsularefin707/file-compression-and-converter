import React from 'react';
import { Sun, Moon, Hammer, Sparkles } from 'lucide-react';
import type { Theme } from '../hooks/useTheme';

interface NavbarProps {
  theme: Theme;
  toggleTheme: () => void;
  onScrollTo: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  toggleTheme,
  onScrollTo,
}) => {
  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-8 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center gap-2 cursor-pointer group"
          onClick={() => onScrollTo('hero')}
        >
          <div className="bg-gradient-to-tr from-brand-600 to-accent-600 p-2 rounded-xl text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
            <Hammer className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-2xl tracking-tight bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-accent-400">
            FileForge
          </span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 font-sans font-medium text-sm text-slate-600 dark:text-slate-300">
          <button 
            onClick={() => onScrollTo('workspace-compress')}
            className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            Compress
          </button>
          <button 
            onClick={() => onScrollTo('workspace-convert')}
            className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            Convert
          </button>
          <button 
            onClick={() => onScrollTo('features')}
            className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            Features
          </button>
          <button 
            onClick={() => onScrollTo('faq')}
            className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
          >
            FAQ
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Ad-Supported Status Badge */}
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide bg-brand-500/10 text-brand-600 dark:bg-brand-500/5 dark:text-brand-400 border border-brand-500/20"
            title="FileForge operates entirely locally, supported by non-intrusive ads"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-500" />
            <span>Ad-Supported Free</span>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-600 dark:text-slate-400 transition-all duration-200"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>

          {/* Get Started Button */}
          <button
            onClick={() => onScrollTo('workspace')}
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 transition-colors shadow-sm"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};
