import React, { useState, useEffect, useRef } from 'react';
import { Shield, Camera, Zap, Globe, Send, Cpu, Fingerprint, RefreshCw } from 'lucide-react';

/**
 * VIBESPHERE 1.5 - KEDAULATAN DIGITAL
 * RPC: pharos | SYMBOL: PHRS
 * IDENTITY: vibe coder
 * STATUS: Vercel-Ready (No External SSH SDK)
 */

export default function App() {
  const [content, setContent] = useState('');
  const [vibeColor, setVibeColor] = useState('#00ff88'); 
  const [userAvatar, setUserAvatar] = useState(`https://api.dicebear.com/7.x/pixel-art/svg?seed=vibe-${Math.floor(Math.random() * 1000)}`);
  const [isPosting, setIsPosting] = useState(false);
  const [posts, setPosts] = useState([
    {
      id: 1,
      text: "jalur kedaulatan pharos aktif. sinkronisasi node berhasil tanpa error ssh.",
      uid: "vibe-coder-001",
      avatar: "https://api.dicebear.com/7.x/pixel-art/svg?seed=vibe",
      timestamp: new Date(),
      rpc: 'pharos',
      symbol: 'PHRS'
    }
  ]);
  const mediaInputRef = useRef(null);

  // LOGIKA INTERNAL: Pengganti SDK untuk menghindari error SSH Vercel
  useEffect(() => {
    const updateTheme = () => {
      try {
        const url = new URL(userAvatar);
        const seed = url.searchParams.get('seed') || 'pharos';
        let hash = 0;
        for (let i = 0; i < seed.length; i++) {
          hash = seed.charCodeAt(i) + ((hash << 5) - hash);
        }
        const h = Math.abs(hash % 360);
        const color = `hsl(${h}, 85%, 60%)`;
        setVibeColor(color);
        document.documentElement.style.setProperty('--vibe-color', color);
        document.documentElement.style.setProperty('--vibe-glow', `${color}4d`);
      } catch (e) {
        setVibeColor('#00ff88');
      }
    };
    updateTheme();
  }, [userAvatar]);

  const handleVibe = () => {
    if (!content.trim() || isPosting) return;
    setIsPosting(true);
    const newPost = {
      id: Date.now(),
      text: content,
      uid: "node-" + Math.random().toString(36).substr(2, 6),
      avatar: userAvatar,
      timestamp: new Date(),
      rpc: 'pharos',
      symbol: 'PHRS'
    };
    setTimeout(() => {
      setPosts([newPost, ...posts]);
      setContent('');
      setIsPosting(false);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-black text-white font-mono selection:bg-[var(--vibe-color)] selection:text-black">
      <style>{`
        :root { --vibe-color: #00ff88; --vibe-glow: rgba(0, 255, 136, 0.3); }
        .vibe-text { color: var(--vibe-color) !important; }
        .vibe-bg { background-color: var(--vibe-color) !important; }
        .vibe-border { border-color: var(--vibe-color) !important; }
        .glass-panel { background: rgba(15, 15, 15, 0.85); backdrop-filter: blur(20px); }
        .vibe-glow-shadow { box-shadow: 0 0 20px var(--vibe-glow); }
      `}</style>

      {/* Header */}
      <nav className="p-6 border-b border-zinc-900 flex justify-between items-center sticky top-0 bg-black/90 z-50">
        <div className="flex items-center gap-3">
          <Shield className="vibe-text w-6 h-6" />
          <h1 className="text-xl font-black lowercase italic tracking-tighter">vibesphere</h1>
        </div>
        <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-60">
           <span>pharos rpc</span>
           <Zap className="w-4 h-4 vibe-text fill-current animate-pulse" />
        </div>
      </nav>

      <main className="max-w-xl mx-auto py-10 px-4">
        {/* Identitas Node */}
        <div className="flex items-center gap-4 mb-8 px-6 py-4 glass-panel rounded-2xl border border-zinc-800 shadow-2xl">
           <div className="relative group cursor-pointer" onClick={() => setUserAvatar(`https://api.dicebear.com/7.x/pixel-art/svg?seed=${Math.random()}`)}>
              <img src={userAvatar} className="w-12 h-12 rounded-xl border-2 vibe-border p-0.5 bg-black" alt="avatar" />
              <div className="absolute inset-0 bg-black/60 rounded-xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <RefreshCw size={14} className="vibe-text animate-spin" />
              </div>
           </div>
           <div className="flex-1 text-left">
              <p className="text-[9px] uppercase text-zinc-600 font-black tracking-widest mb-1">Status Kedaulatan</p>
              <p className="text-[10px] truncate opacity-50 italic">vibe-coder-node</p>
           </div>
           <div className="text-right">
              <p className="text-[9px] uppercase text-zinc-600 font-black mb-1">Aset Utama</p>
              <p className="text-[10px] vibe-text font-black tracking-widest uppercase">PHRS</p>
           </div>
        </div>

        {/* Kotak Input */}
        <div className="bg-zinc-900/10 border-2 border-zinc-900 rounded-[2.5rem] p-8 mb-16 shadow-2xl focus-within:vibe-border transition-all duration-500">
          <textarea 
            className="w-full bg-transparent border-none focus:outline-none text-xl h-24 placeholder:text-zinc-800 resize-none font-mono"
            placeholder="apa kedaulatan anda hari ini?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="flex justify-between items-center pt-6 border-t border-zinc-900/50">
            <div className="flex gap-2 text-zinc-600">
              <Camera size={20} className="hover:vibe-text cursor-pointer" />
              <Fingerprint size={20} className="hover:vibe-text cursor-pointer" />
            </div>
            <button 
              onClick={handleVibe}
              disabled={isPosting || !content.trim()}
              className="vibe-bg text-black px-12 py-4 rounded-2xl font-black text-sm flex items-center gap-2 vibe-glow-shadow hover:scale-105 transition-all disabled:opacity-20"
            >
              {isPosting ? <Cpu className="animate-spin w-4 h-4" /> : <Send size={18} />}
              VIBE
            </button>
          </div>
        </div>

        {/* Aliran Feed */}
        <div className="space-y-12">
          <div className="flex items-center gap-3 mb-10 text-zinc-500 text-[10px] font-bold uppercase tracking-[0.5em]">
            <Globe size={14} className="vibe-text" />
            <span>Aliran Global</span>
            <div className="h-[1px] flex-1 bg-zinc-900/30"></div>
          </div>

          <div className="space-y-10">
            {posts.map((post) => (
              <div key={post.id} className="border-l border-zinc-900 pl-8 py-2 hover:border-[var(--vibe-color)] group text-left transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <img src={post.avatar} className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800" alt="avatar" />
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-tighter">NODE:{post.uid?.slice(0, 8)}</span>
                    <span className="text-[8px] text-zinc-700 font-black uppercase italic">verified node</span>
                  </div>
                  <span className="text-[9px] text-zinc-800 ml-auto font-black italic tracking-widest opacity-40">
                    {post.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <p className="text-zinc-400 text-lg group-hover:text-white transition-colors leading-relaxed">
                  {post.text}
                </p>
                <div className="mt-4 flex gap-6 opacity-0 group-hover:opacity-100 transition-opacity">
                   <span className="text-[8px] text-zinc-700 font-black uppercase tracking-widest">RPC: {post.rpc}</span>
                   <span className="text-[8px] text-zinc-700 font-black uppercase tracking-widest">ASSET: {post.symbol}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="py-24 text-center opacity-20 select-none">
        <p className="text-[10px] font-black lowercase italic tracking-tighter">vibesphere 1.5</p>
      </footer>
    </div>
  );
}
