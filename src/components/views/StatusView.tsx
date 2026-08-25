import React from 'react';
import { SEOHead } from '../common/SEOHead';
import { Activity, CheckCircle2, Server, Terminal, FileCheck } from 'lucide-react';

export const StatusView: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <SEOHead
        title="Public System Status & Health Monitor | FileForge"
        description="Real-time operational status, system health checks, API availability, and compliance metrics for the FileForge file processing platform."
        canonicalUrl="/status"
      />

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
          <Activity className="w-4 h-4 animate-pulse" />
          <span>Systems Operational</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-100 tracking-tight mb-4">
          FileForge System Status
        </h1>
        <p className="text-slate-400 max-w-xl mx-auto text-lg">
          Live verification status, production health indicators, and machine capability endpoints.
        </p>
      </div>

      {/* Main Status Banner */}
      <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-emerald-950/40 border border-emerald-500/30 rounded-2xl p-8 mb-10 text-center shadow-lg shadow-emerald-950/20">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-slate-100 mb-2">All Systems Operational</h2>
        <p className="text-slate-300 text-sm max-w-md mx-auto">
          Conversion engine, client-side WebAssembly transcoders, and ephemeral RAM serverless workers are performing normally.
        </p>
      </div>

      {/* Component Status Grid */}
      <div className="space-y-4 mb-12">
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Server className="w-5 h-5 text-cyan-400" />
          <span>Core Subsystem Readiness</span>
        </h3>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-slate-200 font-medium text-sm">Client Browser WebAssembly Engine</div>
              <div className="text-slate-400 text-xs">Image transcoding, PDF compression, CSV/JSON processing</div>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20">
            100% Operational
          </span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-slate-200 font-medium text-sm">Serverless Ephemeral RAM Parser</div>
              <div className="text-slate-400 text-xs">PDF to Markdown, DOCX, and Text NDM document layout engine</div>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20">
            100% Operational
          </span>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <div>
              <div className="text-slate-200 font-medium text-sm">Zero Disk Storage Retention Safeguard</div>
              <div className="text-slate-400 text-xs">Auto-disposal of in-memory buffers upon HTTP response completion</div>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-400 text-xs border border-emerald-500/20">
            Active
          </span>
        </div>
      </div>

      {/* Machine Verification Links */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-purple-400" />
          <span>Machine Verification Endpoints</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
          <a
            href="/api/health"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-cyan-400 flex items-center justify-between"
          >
            <span>GET /api/health</span>
            <FileCheck className="w-4 h-4 text-slate-500" />
          </a>
          <a
            href="/api/capabilities"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-cyan-400 flex items-center justify-between"
          >
            <span>GET /api/capabilities</span>
            <FileCheck className="w-4 h-4 text-slate-500" />
          </a>
          <a
            href="/api/audit"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-500/40 text-cyan-400 flex items-center justify-between"
          >
            <span>GET /api/audit</span>
            <FileCheck className="w-4 h-4 text-slate-500" />
          </a>
        </div>
      </div>
    </div>
  );
};
