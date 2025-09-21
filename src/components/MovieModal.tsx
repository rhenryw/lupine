import React, { useRef, useState } from 'react';
import { X } from 'lucide-react';

interface Props {
  tmdbId: number;
  onClose: () => void;
  securlyProtect?: boolean;
}

export default function MovieModal({ tmdbId, onClose, securlyProtect = false }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [provider, setProvider] = useState<'main' | 'ads'>('main');
  function requestFullscreen() {
    const el = iframeRef.current as any;
    el && (el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen)?.call(el);
  }
  const mainBase = `https://player.vidify.top/embed/movie/${tmdbId}?autoplay=false&poster=true&chromecast=true&servericon=true&setting=true&pip=true&download=true&logourl=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2FLupineVault%2Flupinevault.github.io%40main%2Fassets%2Fimages%2FtinyTitle.png&font=Roboto&fontcolor=5E17EB&fontsize=20&opacity=0.5&primarycolor=3b82f6&secondarycolor=1f2937&iconcolor=ffffff`;
  const adsBase = `https://embed.su/embed/movie/${tmdbId}`;
  const chosen = provider === 'main' ? mainBase : adsBase;
  const src = securlyProtect ? (chosen.includes('#') ? `${chosen}&translate.google.com` : `${chosen}#translate.google.com`) : chosen;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80">
      <div ref={containerRef} className="relative w-full h-full md:h-[85vh] md:w-[90vw] rounded-xl overflow-hidden bg-black">
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between bg-gray-900/80 border-b border-gray-800 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300">Provider</span>
            <select value={provider} onChange={(e) => setProvider(e.target.value as 'main' | 'ads')} className="bg-gray-900 border border-gray-700 text-white text-sm rounded-md px-2 py-1 focus:outline-none focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB]">
              <option value="main">Main</option>
              <option value="ads">Ads</option>
            </select>
          </div>
          <div className="flex gap-2">
            <button onClick={requestFullscreen} className="bg-gray-900/80 border border-gray-700 rounded-full px-3 py-2 text-white text-sm">Fullscreen</button>
            <button onClick={onClose} className="bg-gray-900/80 border border-gray-700 rounded-full p-2 text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <iframe ref={iframeRef} src={src} className="w-full h-full" allowFullScreen frameBorder={0} />
      </div>
    </div>
  );
}


