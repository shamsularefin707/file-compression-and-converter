import React, { useState } from 'react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { SITE_CONFIG } from '../../config/site';
import { Shield, CheckCircle2, Send, Lock, Cpu, Sparkles, ArrowRight } from 'lucide-react';

interface LegalViewProps {
  type: 'privacy' | 'terms' | 'about' | 'contact';
  onNavigate: (path: string) => void;
}

export const LegalView: React.FC<LegalViewProps> = ({ type, onNavigate }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', category: 'bug', message: '' });

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  const getTitle = () => {
    switch (type) {
      case 'privacy': return 'Privacy Policy & Data Security';
      case 'terms': return 'Terms of Service';
      case 'about': return 'About FileForge Conversion Engine';
      case 'contact': return 'Contact & Engineering Support';
    }
  };

  const getSeoDescription = () => {
    switch (type) {
      case 'privacy':
        return 'Learn how FileForge protects your document privacy with 100% client-side browser processing and ephemeral serverless RAM handling with zero file retention.';
      case 'terms':
        return 'FileForge Terms of Service - Acceptable use policies, operational warranties, and file conversion guidelines.';
      case 'about':
        return 'Discover the FileForge engineering architecture: client-side WebAssembly transcoders and Normalized Document Model (NDM) layout parsers built for AI LLM prompts.';
      case 'contact':
        return 'Get in touch with FileForge support, report conversion bugs, or request custom document format support.';
    }
  };

  const getJsonLd = () => {
    const baseUrl = 'https://file-compression-and-converter.vercel.app';
    if (type === 'about') {
      return {
        '@context': 'https://schema.org',
        '@type': 'AboutPage',
        'name': 'About FileForge Document Engine',
        'url': `${baseUrl}/about`,
        'description': getSeoDescription(),
        'mainEntity': {
          '@type': 'SoftwareApplication',
          'name': SITE_CONFIG.name,
          'applicationCategory': 'UtilitiesApplication',
          'operatingSystem': 'All',
          'description': SITE_CONFIG.description,
        },
      };
    }
    if (type === 'privacy') {
      return {
        '@context': 'https://schema.org',
        '@type': 'PrivacyPolicy',
        'name': 'FileForge Privacy Policy',
        'url': `${baseUrl}/privacy`,
        'description': getSeoDescription(),
      };
    }
    return undefined;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <SEOHead
        title={`${getTitle()} | ${SITE_CONFIG.name}`}
        description={getSeoDescription()}
        keywords={
          type === 'privacy' 
            ? ['private file converter', 'gdpr compliant pdf converter', 'secure document processing', 'no log file conversion']
            : ['fileforge architecture', 'pdf to markdown converter engine', 'client side file tools', 'ai document processing']
        }
        jsonLd={getJsonLd()}
      />

      <Breadcrumbs items={[{ label: getTitle() }]} />

      <header className="my-6">
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
          {getTitle()}
        </h1>
        <p className="text-xs text-slate-400 mt-2">Document Version 2.4 • Effective August 25, 2026</p>
      </header>

      {/* ABOUT PAGE (SEO & E-E-A-T POWERHOUSE) */}
      {type === 'about' && (
        <div className="space-y-8">
          <section className="bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-brand-500" />
              <span>Next-Generation File Conversion Infrastructure</span>
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              FileForge was architected to solve a critical limitation of traditional online file converters: document corruption and privacy risks. While generic conversion tools destroy document layout structure or upload confidential files to permanent cloud storage, FileForge utilizes a high-performance hybrid pipeline.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">100% Client-Side Browser Sandbox</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Image transcoders (JPG to WebP, PNG compression) execute directly inside client browser memory using HTML5 WebAssembly and Canvas pipelines. File bytes never traverse the internet.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 text-brand-500 flex items-center justify-center font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Normalized Document Model (NDM)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Our serverless document engine parses complex PDF typography into an intermediate structural representation. Headings (H1–H4), tables, and bullet lists are reconstructed cleanly for AI LLM prompts (ChatGPT, Claude).
              </p>
            </div>
          </div>

          <section className="p-6 rounded-2xl bg-slate-900 text-white space-y-3">
            <h3 className="text-lg font-bold text-white">Explore FileForge Conversion Utilities</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Browse our complete registry of 18 conversion and compression tools, or try our flagship PDF to Markdown converter.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href="/tools"
                onClick={(e) => handleLinkClick(e, '/tools')}
                className="px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-bold hover:bg-brand-600 transition-colors inline-flex items-center gap-1.5"
              >
                <span>Browse All 18 Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="/tools/pdf-to-markdown"
                onClick={(e) => handleLinkClick(e, '/tools/pdf-to-markdown')}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 text-xs font-bold hover:bg-slate-700 transition-colors inline-flex items-center gap-1.5"
              >
                <span>PDF to Markdown AI Tool</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>
        </div>
      )}

      {/* PRIVACY POLICY (HIGH AUTHORITY & GDPR COMPLIANT) */}
      {type === 'privacy' && (
        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              <span>1. Privacy by Architectural Design</span>
            </h2>
            <p>
              FileForge operates under a privacy-first engineering philosophy. We ensure your personal files, sensitive financial spreadsheets, legal contracts, and intellectual property remain confidential.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              2. Local Browser Processing vs. Ephemeral RAM Pipeline
            </h2>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80">
                <p className="font-bold text-slate-800 dark:text-slate-200">Local Processing (Client-Side)</p>
                <p className="mt-1 text-slate-500 dark:text-slate-400">
                  Image conversions (JPG, PNG, WebP), image compression, PDF merge operations, and DOCX-to-Markdown conversions execute completely within your client Web Browser sandbox using JavaScript and WebAssembly. No data packet is transmitted over the internet.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80">
                <p className="font-bold text-slate-800 dark:text-slate-200">Ephemeral Serverless RAM Processing</p>
                <p className="mt-1 text-slate-500 dark:text-slate-400">
                  Complex PDF document structure parsing (PDF to DOCX and PDF to Markdown layout reconstruction) is executed via serverless Node.js functions. File buffers exist only in volatile server RAM during request execution and are destroyed immediately upon output streaming. We maintain zero disk logs, zero database records, and zero cloud backups.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              3. Privacy-Conscious Telemetry
            </h2>
            <p>
              We collect anonymous aggregated usage metrics (such as tool page views, system status, and aggregate conversion counts) to optimize software performance. We do NOT analyze, store, inspect, or sell document text contents or metadata.
            </p>
          </section>

          <section className="pt-4 border-t border-slate-100 dark:border-slate-900 flex items-center justify-between text-xs">
            <span className="text-slate-400">Questions about our privacy policy?</span>
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className="text-brand-600 dark:text-brand-400 font-bold hover:underline"
            >
              Contact Support Team →
            </a>
          </section>
        </div>
      )}

      {/* TERMS OF SERVICE */}
      {type === 'terms' && (
        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">1. Acceptable Use Policy</h2>
            <p>
              FileForge provides free file processing utilities. You agree not to submit malicious software, automated scraping scripts, or prohibited content.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">2. Warranty Disclaimer</h2>
            <p>
              Our conversion engines strive for 100% structural fidelity. However, services are provided "as-is" without warranty. Users are encouraged to verify converted documents.
            </p>
          </section>
        </div>
      )}

      {/* CONTACT FORM */}
      {type === 'contact' && (
        <div className="bg-white dark:bg-slate-950 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
          {formSubmitted ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Message Received</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Thank you for contacting FileForge engineering. We review bug reports and feature requests daily.
              </p>
              <button
                onClick={() => setFormSubmitted(false)}
                className="mt-4 px-4 py-2 rounded-xl bg-brand-500 text-white text-xs font-bold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                >
                  <option value="bug">Report Broken Conversion</option>
                  <option value="feature">Request New Converter Tool</option>
                  <option value="feedback">General Product Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your issue or format feature request..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-500/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Feedback</span>
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
