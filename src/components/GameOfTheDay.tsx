import React from 'react';
import { Star, Play } from 'lucide-react';
import { Game } from '../types/game';

interface Props {
  game: Game;
  onPlay: () => void;
}

export default function GameOfTheDay({ game, onPlay }: Props) {
  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${game.imageLarge})`
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-2 mb-4">
            <Star className="w-5 h-5 text-[#5E17EB]" />
            <span className="text-[#5E17EB] font-medium uppercase tracking-wide text-sm">Featured Game</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {game.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
            {game.description}
          </p>
          <button onClick={onPlay} className="bg-gradient-to-r from-[#5E17EB] to-[#7c3aed] hover:from-[#4c14c7] hover:to-[#6d28d9] text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg">
            <Play className="w-5 h-5" />
            <span>Play Now</span>
          </button>
        </div>
      </div>
    </section>
  );
}