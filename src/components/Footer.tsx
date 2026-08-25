import React from 'react';
import { Hammer, Mail } from 'lucide-react';

interface FooterProps {
  onScrollTo: (id: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollTo }) => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800/80 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Bio */}
          <div className="md:col-span-2 space-y-4">
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => onScrollTo('hero')}
            >
              <div className="bg-gradient-to-tr from-brand-600 to-accent-600 p-2 rounded-xl text-white">
                <Hammer className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-accent-400">
                FileForge
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              A high-performance, local browser-based utility suite. Compress images and PDFs, convert document formats, data files, and archives without uploading them to external servers.
            </p>
          </div>

          {/* Quick links */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-sm text-slate-800 dark:text-slate-200">
              Product
            </h4>
            <ul className="space-y-2 font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <li>
                <button onClick={() => onScrollTo('workspace-compress')} className="hover:text-brand-500 transition-colors">
                  File Compressor
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('workspace-convert')} className="hover:text-brand-500 transition-colors">
                  File Converter
                </button>
              </li>
              <li>
                <button onClick={() => onScrollTo('features')} className="hover:text-brand-500 transition-colors">
                  Features
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div className="space-y-4">
            <h4 className="font-display font-semibold text-sm text-slate-800 dark:text-slate-200">
              Get in Touch
            </h4>
            <div className="flex gap-4 text-slate-400 dark:text-slate-500">
              <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors" aria-label="GitHub">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors" aria-label="Twitter">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="mailto:support@fileforge.local" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
            <p className="font-sans text-xs text-slate-500 dark:text-slate-400">
              support@fileforge.local
            </p>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-slate-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} FileForge. All rights reserved. Locally processed, never uploaded.
          </p>
          <div className="flex gap-6 font-sans text-xs text-slate-400 dark:text-slate-500">
            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
