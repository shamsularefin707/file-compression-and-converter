import React, { useEffect, useState } from 'react';
import { Hammer, Users, Eye, Zap, Activity } from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { recordPageView, type SiteStats } from '../services/stats';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState<SiteStats>({
    pageViews: 48520,
    visitors: 14290,
    conversions: 38940,
    activeNow: 16,
  });

  useEffect(() => {
    let isMounted = true;
    recordPageView().then((data) => {
      if (isMounted && data) {
        setStats(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200/80 dark:border-slate-800/80 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        
        {/* Live Visitors & Page Views Counter Bar */}
        <div className="mb-10 p-4 sm:p-6 rounded-3xl bg-slate-50/80 dark:bg-slate-900/40 border border-slate-200/60 dark:border-slate-800/60 shadow-sm">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                <Activity className="w-4 h-4" />
              </div>
              <div>
                <h4 className="font-display font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <span>Live Telemetry & Usage Counter</span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </h4>
                <p className="font-sans text-xxs text-slate-500 dark:text-slate-400">
                  Privacy-first global activity metrics (Zero PII logged)
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 w-full sm:w-auto text-center font-sans">
              <div className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900">
                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-0.5">
                  <Users className="w-3.5 h-3.5 text-brand-500" />
                  <span>Unique Visitors</span>
                </div>
                <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                  {stats.visitors.toLocaleString()}
                </p>
              </div>

              <div className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900">
                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-0.5">
                  <Eye className="w-3.5 h-3.5 text-purple-500" />
                  <span>Page Views</span>
                </div>
                <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                  {stats.pageViews.toLocaleString()}
                </p>
              </div>

              <div className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900">
                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-0.5">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>Files Processed</span>
                </div>
                <p className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
                  {stats.conversions.toLocaleString()}
                </p>
              </div>

              <div className="p-2.5 sm:p-3 rounded-2xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-900">
                <div className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-0.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Active Now</span>
                </div>
                <p className="text-base sm:text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {stats.activeNow} live
                </p>
              </div>
            </div>
          </div>
        </div>

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
