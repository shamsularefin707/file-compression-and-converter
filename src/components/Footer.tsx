import React from 'react';
import { Hammer } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Bio */}
          <div className="md:col-span-2 space-y-4">
            <div 
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => onNavigate('/')}
            >
              <div className="bg-gradient-to-tr from-brand-600 to-accent-600 p-2 rounded-xl text-white">
                <Hammer className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-accent-400">
                {SITE_CONFIG.name}
              </span>
            </div>
            <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Fast, private, browser-first file conversion & document preparation tools. Optimized for modern web graphics and AI LLM prompt workflows.
            </p>
          </div>

          {/* Tools & Guides */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-sm text-slate-800 dark:text-slate-200">
              Product & Tools
            </h4>
            <ul className="space-y-2 font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('/tools/pdf-to-markdown')} className="hover:text-brand-500 transition-colors">
                  PDF to Markdown (AI)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tools/pdf-to-docx')} className="hover:text-brand-500 transition-colors">
                  PDF to Word (DOCX)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tools/compress-pdf')} className="hover:text-brand-500 transition-colors">
                  PDF Compressor
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tools/jpg-to-webp')} className="hover:text-brand-500 transition-colors">
                  JPG to WebP
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/blog')} className="hover:text-brand-500 transition-colors">
                  AI Document Guides
                </button>
              </li>
            </ul>
          </div>

          {/* Company & Support */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-sm text-slate-800 dark:text-slate-200">
              Trust & Support
            </h4>
            <ul className="space-y-2 font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-brand-500 transition-colors">
                  About FileForge
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/privacy')} className="hover:text-brand-500 transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/terms')} className="hover:text-brand-500 transition-colors">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-brand-500 transition-colors">
                  Contact & Feedback
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="pt-8 border-t border-slate-100 dark:border-slate-800/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-slate-400 dark:text-slate-500">
            &copy; {new Date().getFullYear()} {SITE_CONFIG.name}. Fast, private, and AI-ready file processing.
          </p>
          <div className="flex gap-4 font-sans text-xs text-slate-400 dark:text-slate-500">
            <button onClick={() => onNavigate('/privacy')} className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => onNavigate('/terms')} className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              Terms
            </button>
            <button onClick={() => onNavigate('/contact')} className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              Contact
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
