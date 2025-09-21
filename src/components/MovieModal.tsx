import React, { useRef } from 'react';
import { X } from 'lucide-react';

interface Props {
  tmdbId: number;
  onClose: () => void;
}

export default function MovieModal({ tmdbId, onClose }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  function requestFullscreen() {
    const el = iframeRef.current as any;
    el && (el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen)?.call(el);
  }
  const src = `https://player.vidify.top/embed/movie/${tmdbId}?autoplay=false&poster=true&chromecast=true&servericon=true&setting=true&pip=true&download=true&logourl=https%3A%2F%2Fcdn.jsdelivr.net%2Fgh%2FLupineVault%2Flupinevault.github.io%40main%2Fassets%2Fimages%2FtinyTitle.png&font=Roboto&fontcolor=5E17EB&fontsize=20&opacity=0.5&primarycolor=3b82f6&secondarycolor=1f2937&iconcolor=ffffff#translate.google.com`;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80">
      <div ref={containerRef} className="relative w-full h-full md:h-[85vh] md:w-[90vw] rounded-xl overflow-hidden bg-black">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button onClick={requestFullscreen} className="bg-gray-900/80 border border-gray-700 rounded-full px-3 py-2 text-white text-sm">Fullscreen</button>
          <button onClick={onClose} className="bg-gray-900/80 border border-gray-700 rounded-full p-2 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>
        <iframe ref={iframeRef} src={src} className="w-full h-full" allowFullScreen frameBorder={0} />
      </div>
    </div>
  );
}


