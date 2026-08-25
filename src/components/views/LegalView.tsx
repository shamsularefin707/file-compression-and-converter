import React, { useState } from 'react';
import { SEOHead } from '../common/SEOHead';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { SITE_CONFIG } from '../../config/site';
import { Shield, CheckCircle2, Send } from 'lucide-react';

interface LegalViewProps {
  type: 'privacy' | 'terms' | 'about' | 'contact';
  onNavigate: (path: string) => void;
}

export const LegalView: React.FC<LegalViewProps> = ({ type }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', category: 'bug', message: '' });

  const getTitle = () => {
    switch (type) {
      case 'privacy': return 'Privacy Policy';
      case 'terms': return 'Terms of Service';
      case 'about': return 'About FileForge';
      case 'contact': return 'Contact & Support';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <SEOHead
        title={`${getTitle()} | ${SITE_CONFIG.name}`}
        description={`${getTitle()} for ${SITE_CONFIG.name} - Fast, private file conversion and compression tools.`}
      />

      <Breadcrumbs items={[{ label: getTitle() }]} />

      <header className="my-6">
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
          {getTitle()}
        </h1>
        <p className="text-xs text-slate-400 mt-1">Last Updated: August 25, 2026</p>
      </header>

      {/* PRIVACY POLICY */}
      {type === 'privacy' && (
        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
          <section>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-500" />
              <span>1. Architectural Privacy Commitment</span>
            </h2>
            <p>
              At FileForge, privacy is built directly into our codebase. We process files locally inside your web browser whenever technically possible (e.g. image conversions, client-side PDF compression, DOCX-to-Markdown). For client-processed tools, your files never leave your device.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
              2. Serverless File Processing & Ephemeral RAM Handling
            </h2>
            <p>
              For tools requiring server-side layout parsing (such as PDF-to-DOCX and PDF-to-Markdown NDM reconstruction):
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Uploaded file buffers exist ephemerally in RAM during the duration of the HTTP POST request.</li>
              <li>Files are automatically destroyed immediately after the converted output is streamed back.</li>
              <li>We do NOT store, index, archive, or permanently save user documents.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">
              3. Telemetry & Analytics
            </h2>
            <p>
              We collect privacy-respecting product usage metrics (such as tool page views and conversion success rates) to improve application stability. We do NOT log, inspect, transmit, or record the actual text contents of your uploaded documents.
            </p>
          </section>
        </div>
      )}

      {/* TERMS OF SERVICE */}
      {type === 'terms' && (
        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
          <section>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">1. Acceptable Use</h2>
            <p>
              FileForge provides free file conversion and document preparation tools. You agree not to upload malicious software, corrupted binaries, or content that violates applicable local or international laws.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mb-2">2. Disclaimer of Warranty</h2>
            <p>
              Tools are provided "as is" without warranty of any kind. While our NDM layout parser strives for 100% conversion fidelity, FileForge is not liable for data loss or formatting discrepancies resulting from file processing.
            </p>
          </section>
        </div>
      )}

      {/* ABOUT US */}
      {type === 'about' && (
        <div className="space-y-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
          <p className="text-base font-semibold text-slate-800 dark:text-slate-100">
            FileForge was created to solve a growing problem: converting complex documents into clean, structured formats for modern AI LLM workflows without sacrificing privacy.
          </p>
          <p>
            Whether you are shrinking a PDF for email, converting graphics to WebP for Google Core Web Vitals, or stripping binary noise from a PDF to paste into ChatGPT, FileForge provides fast, reliable, browser-first software tools.
          </p>
        </div>
      )}

      {/* CONTACT & FEEDBACK FORM */}
      {type === 'contact' && (
        <div className="bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800/80">
          {formSubmitted ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Thank You for Your Feedback!</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Your message has been received. We review bug reports and format requests daily.
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
                  <option value="bug">Report a Broken Conversion</option>
                  <option value="feature">Request a New Converter Tool</option>
                  <option value="feedback">General Feedback</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Message</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your issue or feature request..."
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-brand-500/20"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Message</span>
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
