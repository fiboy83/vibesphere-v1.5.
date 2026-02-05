import React, { useState, useRef, useEffect } from 'react';
import { VibeColorSDK } from 'vibe-color-sdk';
import { Shield, Camera, Zap } from 'lucide-react';

export default function App() {
  const [content, setContent] = useState('');
  const [userAvatar] = useState('https://api.dicebear.com/7.x/pixel-art/svg?seed=vibecoder83');
  const [isPosting, setIsPosting] = useState(false);
  const mediaInputRef = useRef(null);

  useEffect(() => {
    const syncVibe = async () => {
      try {
        const color = await VibeColorSDK.extractVibe(userAvatar);
        VibeColorSDK.applyVibe(color);
      } catch (err) {
        VibeColorSDK.applyVibe("#00ff88");
      }
    };
    syncVibe();
  }, [userAvatar]);

  const handleVibe = () => {
    if (!content) return;
    setIsPosting(true);
    setTimeout(() => {
      setIsPosting(false);
      setContent('');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-[var(--vibe-color)] selection:text-black">
      <style>{`
        :root { --vibe-color: #00ff88; --vibe-glow: rgba(0, 255, 136, 0.3); }
        .vibe-border { border-color: var(--vibe-color) !important; }
        .vibe-text { color: var(--vibe-color) !important; }
        .vibe-bg { background-color: var(--vibe-color) !important; }
      `}</style>

      <nav className="p-6 border-b border-zinc-900 flex justify-between items-center sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <Shield className="vibe-text w-6 h-6" />
          <h1 className="text-xl font-black lowercase italic tracking-tighter">vibesphere</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right hidden sm:block">
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Network</p>
            <p className="text-xs font-black vibe-text italic uppercase">pharos</p>
          </div>
          <Zap className="w-4 h-4 vibe-text" />
        </div>
      </nav>

      <main className="max-w-xl mx-auto py-16 px-4">
        <div className="bg-zinc-900/10 border-2 border-zinc-900 rounded-[2.5rem] p-8 shadow-2xl transition-all hover:border-zinc-800">
          <div className="flex gap-5 mb-6">
            <img src={userAvatar} className="w-14 h-14 rounded-2xl border-2 vibe-border p-1 bg-black shadow-lg" alt="avatar" />
            <textarea 
              className="w-full bg-transparent border-none focus:outline-none text-xl h-32 placeholder:text-zinc-800"
              placeholder="apa kedaulatan lo hari ini?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          
          <div className="flex justify-between items-center mt-4 pt-6 border-t border-zinc-900/50">
            <button onClick={() => mediaInputRef.current?.click()} className="p-3 text-zinc-600 hover:vibe-text transition-all">
              <Camera size={24} />
            </button>
            <input type="file" ref={mediaInputRef} className="hidden" />
            
            <div className="flex items-center gap-8">
              <div className="text-right">
                <p className="text-[9px] text-zinc-700 font-black uppercase tracking-widest">Asset</p>
                <p className="text-sm font-black vibe-text italic uppercase">phrs</p>
              </div>
              <button 
                onClick={handleVibe}
                disabled={isPosting || !content}
                className="vibe-bg text-black px-12 py-4 rounded-2xl font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_var(--vibe-glow)] disabled:opacity-20"
              >
                {isPosting ? 'MENYINKRONKAN...' : 'VIBE'}
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
