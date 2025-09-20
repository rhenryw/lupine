import React from 'react';
import { Star, Calendar, Download } from 'lucide-react';
import { Game } from '../types/game';

interface GameGridProps {
  games: Game[];
}

export default function GameGrid({ games }: GameGridProps) {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            Featured <span className="text-[#5E17EB]">Games</span>
          </h2>
          <p className="text-gray-400">{games.length} games found</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-[#5E17EB]/50 transition-all duration-300 group hover:transform hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-[#5E17EB] hover:bg-[#4c14c7] text-white p-2 rounded-full shadow-lg">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-1 bg-[#5E17EB]/20 border border-[#5E17EB]/30 rounded-full text-[#5E17EB] text-xs font-medium">
                    {game.genre}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-400">{game.rating}</span>
                  </div>
                </div>
                
                <h3 className="font-bold text-lg mb-2 group-hover:text-[#5E17EB] transition-colors duration-200">
                  {game.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                  {game.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-3 h-3 text-gray-500" />
                    <span className="text-xs text-gray-500">{game.releaseDate}</span>
                  </div>
                  <span className="text-[#5E17EB] font-bold">{game.price}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {games.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No games found matching your search.</p>
          </div>
        )}
      </div>
    </section>
  );
}