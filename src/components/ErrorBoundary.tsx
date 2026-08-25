import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in FileForge:", error, errorInfo);
  }

  public handleReload = () => {
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-6 text-center font-sans">
          <div className="max-w-md w-full bg-slate-950 border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6">
            <div className="w-16 h-16 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl flex items-center justify-center mx-auto">
              <ShieldAlert className="w-8 h-8" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-white font-semibold">
                Something went wrong
              </h1>
              <p className="text-sm text-slate-400 leading-relaxed">
                FileForge encountered an unexpected error while initializing or rendering.
              </p>
            </div>

            <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-left">
              <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
                Error Details
              </span>
              <code className="text-xs text-red-400 break-all font-mono">
                {this.state.error?.message || "Unknown rendering error"}
              </code>
            </div>

            <button
              onClick={this.handleReload}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl text-sm font-bold text-slate-900 bg-white hover:bg-slate-100 transition-colors shadow-md cursor-pointer"
            >
              <RefreshCw className="w-4 h-4 animate-spin-slow" />
              <span>Reload Application</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
