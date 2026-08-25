import React from 'react';
import { SEOHead } from '../common/SEOHead';
import { ShieldCheck, CheckCircle2, Code2, ExternalLink } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

export const VerificationView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <SEOHead
        title="Public Verification & Auditor Guide | FileForge"
        description="Public verification documentation, reviewer test instructions, capability manifest, and audit compliance checklist for FileForge."
        canonicalUrl="/verification"
      />

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-4">
          <ShieldCheck className="w-4 h-4" />
          <span>External Reviewer Specification</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-100 tracking-tight mb-4">
          Public System Verification
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Complete, self-contained documentation for QA engineers, AI auditors, and search engine crawlers to inspect FileForge capabilities.
        </p>
      </div>

      {/* Specification Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Platform Overview</span>
          </h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><strong className="text-slate-400">Application:</strong> FileForge</li>
            <li><strong className="text-slate-400">Version:</strong> {SITE_CONFIG.version}</li>
            <li><strong className="text-slate-400">Architecture:</strong> React 18 SPA + Node.js Serverless</li>
            <li><strong className="text-slate-400">Registered Tools:</strong> 18 Production Tools</li>
            <li><strong className="text-slate-400">Monetization:</strong> Disabled (Ready for AdSense / Subscriptions)</li>
          </ul>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-slate-200 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Technical Limits</span>
          </h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li><strong className="text-slate-400">Free File Size (Client):</strong> 50 MB per file</li>
            <li><strong className="text-slate-400">Free File Size (Serverless):</strong> 25 MB per request</li>
            <li><strong className="text-slate-400">Pro Entitlement Boundary:</strong> 200 MB per file</li>
            <li><strong className="text-slate-400">Batch Processing Cap:</strong> 10 files simultaneous</li>
          </ul>
        </div>
      </div>

      {/* Machine Verification Manifests */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 mb-10">
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Code2 className="w-5 h-5 text-cyan-400" />
          <span>Machine-Readable Endpoint Index</span>
        </h3>
        <div className="space-y-3 font-mono text-xs">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">GET</span>
              <span className="text-slate-200">/api/health</span>
            </div>
            <a href="/api/health" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1">
              <span>View JSON</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">GET</span>
              <span className="text-slate-200">/api/capabilities</span>
            </div>
            <a href="/api/capabilities" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1">
              <span>View JSON</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">GET</span>
              <span className="text-slate-200">/api/audit</span>
            </div>
            <a href="/api/audit" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1">
              <span>View JSON</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20">FILE</span>
              <span className="text-slate-200">/routes.json</span>
            </div>
            <a href="/routes.json" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1">
              <span>View Manifest</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">FILE</span>
              <span className="text-slate-200">/PRODUCT_SPEC.json</span>
            </div>
            <a href="/PRODUCT_SPEC.json" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline flex items-center gap-1">
              <span>View Spec</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
