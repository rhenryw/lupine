import React from 'react';
import { Star, Play, Calendar } from 'lucide-react';

export default function GameOfTheDay() {
  const gameOfTheDay = {
    title: "Cyberpunk 2077",
    description: "Experience the most immersive open-world RPG in a dystopian future where technology and humanity collide.",
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
    rating: 4.2,
    releaseDate: "2020",
    genre: "RPG"
  };

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${gameOfTheDay.image})`
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl">
          <div className="flex items-center space-x-2 mb-4">
            <Star className="w-5 h-5 text-[#5E17EB]" />
            <span className="text-[#5E17EB] font-medium uppercase tracking-wide text-sm">Game of the Day</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {gameOfTheDay.title}
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
            {gameOfTheDay.description}
          </p>
          
          <div className="flex items-center space-x-6 mb-8">
            <div className="flex items-center space-x-2">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-gray-300">{gameOfTheDay.rating}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span className="text-gray-300">{gameOfTheDay.releaseDate}</span>
            </div>
            <span className="px-3 py-1 bg-[#5E17EB]/20 border border-[#5E17EB]/30 rounded-full text-[#5E17EB] text-sm">
              {gameOfTheDay.genre}
            </span>
          </div>
          
          <button className="bg-gradient-to-r from-[#5E17EB] to-[#7c3aed] hover:from-[#4c14c7] hover:to-[#6d28d9] text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 shadow-lg">
            <Play className="w-5 h-5" />
            <span>Play Now</span>
          </button>
        </div>
      </div>
    </section>
  );
}