import React from 'react';
import { Gamepad2, Sword, Car, Puzzle, Zap, Users } from 'lucide-react';

interface GameCategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function GameCategories({ selectedCategory, onCategoryChange }: GameCategoriesProps) {
  const categories = [
    { id: 'all', label: 'All Games', icon: Gamepad2 },
    { id: 'action', label: 'Action', icon: Sword },
    { id: 'racing', label: 'Racing', icon: Car },
    { id: 'puzzle', label: 'Puzzle', icon: Puzzle },
    { id: 'adventure', label: 'Adventure', icon: Zap },
    { id: 'multiplayer', label: 'Multiplayer', icon: Users }
  ];

  return (
    <section className="py-12 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Game <span className="text-[#5E17EB]">Categories</span>
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`p-6 rounded-xl border transition-all duration-200 group ${
                  selectedCategory === category.id
                    ? 'bg-[#5E17EB]/20 border-[#5E17EB] text-[#5E17EB]'
                    : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-800 hover:border-gray-600 hover:text-white'
                }`}
              >
                <Icon className="w-8 h-8 mx-auto mb-3 transition-transform duration-200 group-hover:scale-110" />
                <p className="text-sm font-medium">{category.label}</p>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}