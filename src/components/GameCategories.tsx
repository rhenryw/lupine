import React from 'react';

interface GameCategoriesProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function GameCategories({ categories, selectedCategory, onCategoryChange }: GameCategoriesProps) {
  return (
    <section className="py-12 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Game <span className="text-[#5E17EB]">Categories</span>
        </h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {categories.map((id) => (
            <button
              key={id}
              onClick={() => onCategoryChange(id)}
              className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                selectedCategory === id
                  ? 'bg-[#5E17EB]/20 border-[#5E17EB] text-[#5E17EB]'
                  : 'bg-gray-800/50 border-gray-700 text-gray-400 hover:bg-gray-800 hover:border-gray-600 hover:text-white'
              }`}
            >
              {id}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}