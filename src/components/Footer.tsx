import React from 'react';
import { Hammer } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo & Bio */}
          <div className="md:col-span-2 space-y-4">
            <a 
              href="/"
              onClick={(e) => handleLinkClick(e, '/')}
              className="flex items-center gap-2 cursor-pointer group"
              title="FileForge Homepage"
            >
              <div className="bg-gradient-to-tr from-brand-600 to-accent-600 p-2 rounded-xl text-white">
                <Hammer className="w-4 h-4" />
              </div>
              <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-brand-600 to-accent-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-accent-400">
                {SITE_CONFIG.name}
              </span>
            </a>
            <p className="font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed">
              Fast, private, browser-first file conversion & document preparation tools. Optimized for modern web graphics and AI LLM prompt workflows.
            </p>
          </div>

          {/* Tools & Guides Links */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-sm text-slate-800 dark:text-slate-200">
              Product & Tools
            </h4>
            <ul className="space-y-2 font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <li>
                <a href="/tools" onClick={(e) => handleLinkClick(e, '/tools')} className="hover:text-brand-500 transition-colors">
                  All 18 Conversion Tools
                </a>
              </li>
              <li>
                <a href="/tools/pdf-to-markdown" onClick={(e) => handleLinkClick(e, '/tools/pdf-to-markdown')} className="hover:text-brand-500 transition-colors">
                  PDF to Markdown (AI)
                </a>
              </li>
              <li>
                <a href="/tools/pdf-to-docx" onClick={(e) => handleLinkClick(e, '/tools/pdf-to-docx')} className="hover:text-brand-500 transition-colors">
                  PDF to Word (DOCX)
                </a>
              </li>
              <li>
                <a href="/tools/compress-pdf" onClick={(e) => handleLinkClick(e, '/tools/compress-pdf')} className="hover:text-brand-500 transition-colors">
                  PDF Compressor
                </a>
              </li>
              <li>
                <a href="/tools/jpg-to-webp" onClick={(e) => handleLinkClick(e, '/tools/jpg-to-webp')} className="hover:text-brand-500 transition-colors">
                  JPG to WebP Converter
                </a>
              </li>
              <li>
                <a href="/blog" onClick={(e) => handleLinkClick(e, '/blog')} className="hover:text-brand-500 transition-colors">
                  AI Document Guides
                </a>
              </li>
            </ul>
          </div>

          {/* Trust & System Inspection Links */}
          <div className="space-y-3">
            <h4 className="font-display font-semibold text-sm text-slate-800 dark:text-slate-200">
              Inspection & Compliance
            </h4>
            <ul className="space-y-2 font-sans text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              <li>
                <a href="/capabilities" onClick={(e) => handleLinkClick(e, '/capabilities')} className="hover:text-brand-500 transition-colors">
                  System Capabilities
                </a>
              </li>
              <li>
                <a href="/status" onClick={(e) => handleLinkClick(e, '/status')} className="hover:text-brand-500 transition-colors">
                  System Operational Status
                </a>
              </li>
              <li>
                <a href="/verification" onClick={(e) => handleLinkClick(e, '/verification')} className="hover:text-brand-500 transition-colors">
                  Reviewer Verification Guide
                </a>
              </li>
              <li>
                <a href="/about" onClick={(e) => handleLinkClick(e, '/about')} className="hover:text-brand-500 transition-colors">
                  About FileForge Engine
                </a>
              </li>
              <li>
                <a href="/privacy" onClick={(e) => handleLinkClick(e, '/privacy')} className="hover:text-brand-500 transition-colors">
                  Privacy Policy & Security
                </a>
              </li>
              <li>
                <a href="/cookies" onClick={(e) => handleLinkClick(e, '/cookies')} className="hover:text-brand-500 transition-colors">
                  Cookie & Telemetry Policy
                </a>
              </li>
              <li>
                <a href="/terms" onClick={(e) => handleLinkClick(e, '/terms')} className="hover:text-brand-500 transition-colors">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact" onClick={(e) => handleLinkClick(e, '/contact')} className="hover:text-brand-500 transition-colors">
                  Contact & Support
                </a>
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
            <a href="/privacy" onClick={(e) => handleLinkClick(e, '/privacy')} className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              Privacy Policy
            </a>
            <a href="/terms" onClick={(e) => handleLinkClick(e, '/terms')} className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              Terms
            </a>
            <a href="/cookies" onClick={(e) => handleLinkClick(e, '/cookies')} className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              Cookies
            </a>
            <a href="/contact" onClick={(e) => handleLinkClick(e, '/contact')} className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
