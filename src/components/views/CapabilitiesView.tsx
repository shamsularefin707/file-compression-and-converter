import React from 'react';
import { TOOLS } from '../../config/tools';
import { SEOHead } from '../common/SEOHead';
import { Cpu, HardDrive, Lock, FileCode, CheckCircle } from 'lucide-react';

export const CapabilitiesView: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <SEOHead
        title="System Capabilities & Format Matrix | FileForge"
        description="Comprehensive technical specification of FileForge conversion tools, supported file formats, file-size limits, and local privacy guarantees."
        canonicalUrl="/capabilities"
      />

      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
          <Cpu className="w-4 h-4" />
          <span>Technical Capabilities Matrix</span>
        </div>
        <h1 className="text-4xl font-bold text-slate-100 tracking-tight mb-4">
          FileForge Engine Capabilities
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Complete, externally inspectable specification of all 18 file conversion tools, input/output capabilities, and execution limits.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-200 mb-2">Privacy Architecture</h3>
          <p className="text-sm text-slate-400">
            Client-side WebAssembly/Canvas for images & data; Ephemeral RAM buffers with 0% disk logging for complex PDF conversions.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
            <HardDrive className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-200 mb-2">File Size Boundaries</h3>
          <p className="text-sm text-slate-400">
            Free tier: 50 MB per client file, 25 MB per PDF request, up to 10 batch files per session. Pro tier: 200 MB per file.
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
          <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-4">
            <FileCode className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-semibold text-slate-200 mb-2">AI Prompt Optimization</h3>
          <p className="text-sm text-slate-400">
            Specialized Normalized Document Engine (NDM) extracts structural headings, tables, lists, and character counts for LLM prompts.
          </p>
        </div>
      </div>

      {/* Format & Tool Matrix */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden mb-12">
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-slate-200">Tool Directory & Format Matrix</h2>
          <span className="text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700">
            18 Registered Tools
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-slate-950/60 text-xs uppercase text-slate-400 border-b border-slate-800">
              <tr>
                <th className="px-6 py-3">Tool Name</th>
                <th className="px-6 py-3">Category</th>
                <th className="px-6 py-3">Input Formats</th>
                <th className="px-6 py-3">Output Format</th>
                <th className="px-6 py-3">Processing Engine</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {TOOLS.map((tool) => (
                <tr key={tool.id} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-200 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-cyan-400 shrink-0" />
                    <a href={`/tools/${tool.slug}`} className="hover:underline text-cyan-300">
                      {tool.name}
                    </a>
                  </td>
                  <td className="px-6 py-4 capitalize text-slate-400">{tool.category}</td>
                  <td className="px-6 py-4 font-mono text-xs text-slate-400">
                    {tool.inputFormats.join(', ').toUpperCase()}
                  </td>
                  <td className="px-6 py-4 font-mono text-xs text-emerald-400 uppercase">
                    {tool.outputFormats.join(', ')}
                  </td>
                  <td className="px-6 py-4 text-xs">
                    {tool.category === 'document' ? (
                      <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20">
                        Serverless Ephemeral RAM
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        100% Client-Side Sandbox
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Machine Endpoints Footer Note */}
      <div className="bg-cyan-950/20 border border-cyan-800/40 rounded-xl p-6 text-center">
        <h3 className="text-lg font-semibold text-cyan-300 mb-2">Machine-Readable Verification</h3>
        <p className="text-sm text-slate-400 mb-4 max-w-xl mx-auto">
          Automated crawlers and QA agents can programmatically fetch capability specifications via machine endpoints.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/api/capabilities"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:bg-slate-800 text-xs font-mono"
          >
            GET /api/capabilities
          </a>
          <a
            href="/PRODUCT_SPEC.json"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:bg-slate-800 text-xs font-mono"
          >
            GET /PRODUCT_SPEC.json
          </a>
        </div>
      </div>
    </div>
  );
};
