import React from 'react';
import { SEOHead } from '../common/SEOHead';
import { Shield, Cookie, Lock, CheckCircle2 } from 'lucide-react';

export const CookiesView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <SEOHead
        title="Cookie & Analytics Policy | FileForge"
        description="Comprehensive privacy statement explaining cookie usage, local storage utilization, telemetry standards, and zero-tracking commitments at FileForge."
        canonicalUrl="/cookies"
      />

      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
          <Cookie className="w-4 h-4" />
          <span>Transparency Specification</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-100 tracking-tight mb-4">
          Cookie & Telemetry Policy
        </h1>
        <p className="text-slate-400 text-lg">
          Last updated: August 25, 2026. FileForge is committed to strict data privacy and zero invasive user tracking.
        </p>
      </div>

      <div className="space-y-8 text-slate-300">
        <section className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-3 flex items-center gap-2">
            <Lock className="w-5 h-5 text-emerald-400" />
            1. Zero Third-Party Advertising Cookies
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed mb-3">
            FileForge currently does NOT serve third-party advertising cookies, behavioral tracking pixels, or cross-site fingerprinting scripts. 
            All advertising functionality remains completely disabled (<code className="text-cyan-400 font-mono">ADS_ENABLED=false</code>).
          </p>
        </section>

        <section className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-400" />
            2. Local Storage Usage
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            We use your browser's local storage solely to store client-side operational preferences, such as selected conversion target format, UI theme settings, and workspace drawer state. Local storage data never leaves your device.
          </p>
        </section>

        <section className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-slate-100 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-purple-400" />
            3. Privacy-First Telemetry
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            If anonymous telemetry is enabled in future releases (<code className="text-cyan-400 font-mono">ANALYTICS_ENABLED</code>), it records only high-level aggregated counts (such as total files processed or pageviews). **Document text, file content, metadata, and filenames are NEVER recorded, logged, or transmitted.**
          </p>
        </section>
      </div>
    </div>
  );
};
