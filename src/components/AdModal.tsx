import React, { useState, useEffect } from 'react';
import { X, ShieldAlert, Sparkles, Volume2, VolumeX, ExternalLink } from 'lucide-react';

interface AdModalProps {
  isOpen: boolean;
  isMandatory: boolean; // True for files > 20MB
  onClose: () => void;
  onAdCompleted: () => void;
}

export const AdModal: React.FC<AdModalProps> = ({
  isOpen,
  isMandatory,
  onClose,
  onAdCompleted,
}) => {
  const duration = isMandatory ? 8 : 3;
  const [timeLeft, setTimeLeft] = useState<number>(duration);
  const [muted, setMuted] = useState<boolean>(true);
  const [canSkip, setCanSkip] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;
    
    setTimeLeft(duration);
    setCanSkip(false);

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCanSkip(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, duration]);

  if (!isOpen) return null;

  const handleSkip = () => {
    if (canSkip) {
      onAdCompleted();
      onClose();
    }
  };

  // Curated mock ads list
  const mockAds = [
    {
      title: "FileForge Cloud API",
      desc: "Integrate high-speed document conversion & compression APIs into your own SaaS applications. Zero latency, simple REST endpoints.",
      cta: "Developer Docs",
      tag: "Sponsored by FileForge",
      bg: "from-blue-600 to-indigo-800",
    },
    {
      title: "Google DeepMind",
      desc: "Introducing Gemini 1.5 Pro: Advanced reasoning, coding, and multi-modal understanding with an industry-first 1 million token context window.",
      cta: "Try Gemini API",
      tag: "Ad by Google Adsense",
      bg: "from-emerald-600 to-teal-800",
    },
    {
      title: "Ezoic Ad Manager",
      desc: "Optimize your website layout and maximize ad revenue using machine learning. The intelligent publishing platform for creators.",
      cta: "Scale Website",
      tag: "Sponsored by Ezoic",
      bg: "from-purple-600 to-pink-800",
    }
  ];

  // Select ad based on isMandatory
  const activeAd = mockAds[isMandatory ? 1 : 0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl transition-all duration-300">
        
        {/* Banner Top */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 tracking-wide uppercase">
              Ad
            </span>
            <span className="text-xs text-slate-400 font-sans">{activeAd.tag}</span>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMuted(!muted)} 
              className="text-slate-400 hover:text-white transition-colors"
              title={muted ? "Unmute ad" : "Mute ad"}
            >
              {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
            
            {/* Countdown / Skip */}
            {canSkip ? (
              <button
                onClick={handleSkip}
                className="flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-full bg-white text-slate-950 hover:bg-slate-100 transition-colors shadow-sm"
              >
                <span>Skip Ad</span>
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="px-3 py-1 text-xs font-semibold rounded-full bg-slate-800 text-slate-300">
                {isMandatory ? 'Required Ad: ' : ''} {timeLeft}s
              </div>
            )}
          </div>
        </div>

        {/* Video / Creative Content */}
        <div className={`h-48 bg-gradient-to-tr ${activeAd.bg} p-6 flex flex-col justify-between text-white relative overflow-hidden group`}>
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-500"></div>
          <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-black/20 rounded-full blur-xl group-hover:scale-125 transition-transform duration-500"></div>
          
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/80">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
            <span>Premium Feature Unlocked Via Ads</span>
          </div>

          <div className="space-y-1">
            <h3 className="font-display font-extrabold text-2xl tracking-tight leading-tight">
              {activeAd.title}
            </h3>
            <p className="font-sans text-xs text-white/90 line-clamp-2 max-w-sm">
              {activeAd.desc}
            </p>
          </div>

          <div className="flex justify-between items-center mt-2">
            <span className="text-[10px] text-white/60 font-sans">Clicking ad will open sponsor link in new tab</span>
            <a 
              href="https://google.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white text-slate-900 font-sans font-bold text-xs rounded-xl shadow-md hover:bg-slate-100 transition-colors"
            >
              <span>{activeAd.cta}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom instructions */}
        <div className="p-6 bg-slate-900 border-t border-slate-800/60 font-sans">
          {isMandatory ? (
            <div className="flex gap-3 items-start p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
              <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider">File Exceeds 20MB Limit</h4>
                <p className="text-xs text-slate-400 mt-1 leading-normal">
                  To keep FileForge free without subscriptions, we require watching a short {duration}s ad to process larger files up to 1GB. Thank you for supporting us!
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-xs text-slate-400">
                Processing your file conversion. Your file stays 100% private.
              </p>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-3">
                <div 
                  className="bg-brand-500 h-full rounded-full transition-all duration-1000 ease-linear"
                  style={{ width: `${((duration - timeLeft) / duration) * 100}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
