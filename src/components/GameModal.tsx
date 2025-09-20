import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Game } from '../types/game';

interface Props {
  game: Game;
  onClose: () => void;
}

export default function GameModal({ game, onClose }: Props) {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80">
      <div className="relative w-full h-full md:h-[85vh] md:w-[90vw]">
        <button onClick={onClose} className="absolute top-4 right-4 z-10 bg-gray-900/80 border border-gray-700 rounded-full p-2 text-white">
          <X className="w-5 h-5" />
        </button>
        <div className="w-full h-full grid grid-rows-[auto,1fr] md:grid-cols-[1fr,360px] md:grid-rows-1">
          <iframe
            ref={iframeRef}
            src={game.iframeUrl}
            title={game.title}
            allow="autoplay; fullscreen; gamepad"
            className="w-full h-full bg-black"
          />
          <aside className="hidden md:block bg-gray-950 border-l border-gray-800 p-4 overflow-y-auto">
            <h2 className="text-xl font-bold mb-2">{game.title}</h2>
            <p className="text-gray-300 mb-4 whitespace-pre-line">{game.description}</p>
            <h3 className="font-semibold mb-1">How to play</h3>
            <p className="text-gray-300 whitespace-pre-line">{game.instructions}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {game.categories.map((c) => (
                <span key={c} className="px-2 py-0.5 bg-[#5E17EB]/20 border border-[#5E17EB]/30 rounded-full text-[#5E17EB] text-xs font-medium">{c}</span>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}


