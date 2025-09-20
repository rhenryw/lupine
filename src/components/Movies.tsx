import React from 'react';
import { Play, Calendar, Clock } from 'lucide-react';

export default function Movies() {
  const movies = [
    {
      id: 1,
      title: "The Witcher: Nightmare of the Wolf",
      description: "An animated film exploring the origins of Vesemir and the School of the Wolf.",
      image: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg",
      duration: "81 min",
      releaseDate: "2021",
      category: "Animation"
    },
    {
      id: 2,
      title: "Arcane",
      description: "Based on League of Legends, this animated series follows Vi and Jinx in the cities of Piltover and Zaun.",
      image: "https://images.pexels.com/photos/7991589/pexels-photo-7991589.jpeg",
      duration: "40 min/ep",
      releaseDate: "2021",
      category: "Series"
    },
    {
      id: 3,
      title: "Detective Pikachu",
      description: "A young man joins forces with Detective Pikachu to find his father and uncover a conspiracy.",
      image: "https://images.pexels.com/photos/163036/mario-luigi-figures-funny-163036.jpeg",
      duration: "104 min",
      releaseDate: "2019",
      category: "Live Action"
    },
    {
      id: 4,
      title: "Sonic the Hedgehog",
      description: "The world's fastest hedgehog embraces his new home on Earth in this live-action adventure.",
      image: "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg",
      duration: "99 min",
      releaseDate: "2020",
      category: "Live Action"
    },
    {
      id: 5,
      title: "Cyberpunk: Edgerunners",
      description: "A street kid trying to survive in Night City becomes an edgerunner—a mercenary outlaw.",
      image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
      duration: "25 min/ep",
      releaseDate: "2022",
      category: "Animation"
    },
    {
      id: 6,
      title: "Mortal Kombat",
      description: "A new fighter discovers his unique birthmark grants him access to the otherworldly tournament.",
      image: "https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg",
      duration: "110 min",
      releaseDate: "2021",
      category: "Live Action"
    }
  ];

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Gaming <span className="text-[#5E17EB]">Movies & Series</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Explore the best movies and series inspired by your favorite video games. From animated masterpieces to live-action adventures.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-[#5E17EB]/50 transition-all duration-300 group hover:transform hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-[#5E17EB] hover:bg-[#4c14c7] text-white p-4 rounded-full shadow-lg transform scale-110">
                    <Play className="w-8 h-8 ml-1" />
                  </button>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-[#5E17EB]/90 text-white text-sm font-medium rounded-full">
                    {movie.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 group-hover:text-[#5E17EB] transition-colors duration-200">
                  {movie.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                  {movie.description}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{movie.releaseDate}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{movie.duration}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-[#5E17EB] to-[#7c3aed] hover:from-[#4c14c7] hover:to-[#6d28d9] text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg">
            View All Movies & Series
          </button>
        </div>
      </div>
    </section>
  );
}