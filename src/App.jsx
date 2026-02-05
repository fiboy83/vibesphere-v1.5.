import React, { useState, useRef, useEffect } from 'react';
import { VibeColorSDK } from 'vibe-color-sdk';
import { Camera, Send, Shield, Globe, Zap } from 'lucide-react';

export default function App() {
  const [content, setContent] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [userAvatar, setUserAvatar] = useState('https://api.dicebear.com/7.x/pixel-art/svg?seed=vibecoder83');
  const [isPosting, setIsPosting] = useState(false);

  // FIXED: Inisialisasi Ref agar tidak ReferenceError
  const mediaInputRef = useRef(null);

  // VIBE_COLOR: Ekstraksi warna otomatis dari avatar
  useEffect(() => {
    const syncVibe = async () => {
      try {
        const color = await VibeColorSDK.extractVibe(userAvatar);
        VibeColorSDK.applyVibe(color);
      } catch (err) {
        VibeColorSDK.applyVibe("#00ff88"); // Fallback ijo vibesphere
      }
    };
    syncVibe();
  }, [userAvatar]);

  const handleConnect = () => {
    console.log("Jalur kedaulatan: pharos rpc aktif.");
    setIsWalletConnected(!isWalletConnected);
  };

  const triggerUpload = () => {
    if (mediaInputRef.current) mediaInputRef.current.click();
  };

  const handlePost = () => {
    if (!content) return;
    setIsPosting(true);
    setTimeout(() => {
      setIsPosting(false);
      setContent('');
      console.log("Vibe terkirim ke pharos layer.");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-black text-zinc-100 font-mono selection:bg-[var(--vibe-color)] selection:text-black">
      <style>{`
        :root { --vibe-color: #00ff88; --vibe-glow: rgba(0, 255, 136, 0.3); }
        .vibe-border { border-color: var(--vibe-color) !important; }
        .vibe-text { color: var(--vibe-color) !important; }
        .vibe-bg { background-color: var(--vibe-color) !important; }
        .vibe-glow-ui { box-shadow: 0 0 20px var(--vibe-glow); }
      `}</style>

      {/* Header */}
      <nav className="border-b border-zinc-900 p-6 sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Shield className="vibe-text w-6 h-6" />
            <h1 className="text-2xl font-black tracking-tighter italic lowercase">vibesphere</h1>
          </div>
          <button 
            onClick={handleConnect}
            className={`px-6 py-2 rounded-xl border-2 vibe-border text-[10px] font-black transition-all ${isWalletConnected ? 'vibe-bg text-black' : 'text-white'}`}
          >
            {isWalletConnected ? 'IDENTITY_LOCKED' : 'CONNECT_PHAROS'}
          </button>
        </div>
      </nav>

      {/* Post Box */}
      <main className="max-w-xl mx-auto py-16 px-4">
        <div className="bg-zinc-900/10 border-2 border-zinc-900 rounded-[2rem] p-8 mb-10 transition-all hover:border-zinc-800">
          <div className="flex gap-6">
            <img src={userAvatar} className="w-16 h-16 rounded-2xl border-2 vibe-border p-1 bg-black" alt="avatar" />
            <div className="flex-1">
              <textarea 
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="apa kedaulatan lo hari ini?"
                className="w-full bg-transparent border-none resize-none focus:outline-none text-xl h-32 placeholder:text-zinc-800"
              />
              <div className="flex justify-between items-center border-t border-zinc-900 mt-4 pt-4">
                <button onClick={triggerUpload} className="p-2 text-zinc-600 hover:vibe-text transition-all"><Camera /></button>
                <input type="file" ref={mediaInputRef} className="hidden" />
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-[9px] text-zinc-700 font-bold uppercase">Asset</p>
                    <p className="text-xs font-black vibe-text italic">PHRS</p>
                  </div>
                  <button 
                    onClick={handlePost}
                    disabled={isPosting || !content}
                    className="vibe-bg text-black px-10 py-3 rounded-2xl font-black text-sm hover:scale-105 transition-all vibe-glow-ui"
                  >
                    {isPosting ? 'SYNC...' : 'VIBE'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
      }
