import React, { useMemo, useState } from 'react';
import { Game } from '../types/game';
import SafeImage from './SafeImage';

interface GameGridProps {
  games: Game[];
  isLoading: boolean;
  onGameClick: (game: Game) => void;
}

export default function GameGrid({ games, isLoading, onGameClick }: GameGridProps) {
  const [visibleCount, setVisibleCount] = useState(120);
  const shown = useMemo(() => games.slice(0, visibleCount), [games, visibleCount]);

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            Featured <span className="text-[#5E17EB]">Games</span>
          </h2>
          <p className="text-gray-400">{isLoading ? 'Loading…' : `${games.length} games found`}</p>
        </div>
        <div className="[column-fill:_balance] columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6">
          {shown.map((game) => (
            <div key={game.id} className="break-inside-avoid mb-6">
              <button onClick={() => onGameClick(game)} className="block text-left w-full bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-[#5E17EB]/50 transition-all duration-300 group">
                <div className="relative overflow-hidden">
                  <SafeImage src={game.imageSmall} alt={game.title} className="w-full object-cover" showFallbackCaption />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 group-hover:text-[#5E17EB] transition-colors duration-200">{game.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{game.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {game.categories.slice(0, 3).map((c) => (
                      <span key={c} className="px-2 py-0.5 bg-[#5E17EB]/20 border border-[#5E17EB]/30 rounded-full text-[#5E17EB] text-xs font-medium">{c}</span>
                    ))}
                  </div>
                </div>
              </button>
            </div>
          ))}
        </div>
        {visibleCount < games.length && (
          <div className="text-center mt-8">
            <button onClick={() => setVisibleCount((v) => v + 120)} className="bg-gradient-to-r from-[#5E17EB] to-[#7c3aed] hover:from-[#4c14c7] hover:to-[#6d28d9] text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg">Load More</button>
          </div>
        )}
        {games.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No games found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}