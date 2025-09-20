import React from 'react';
import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchResults?: { id: string; title: string; imageSmall?: string; description?: string }[];
  onSelectSearchResult?: (game: any) => void;
}

export default function Header({ activeSection, setActiveSection, searchQuery, setSearchQuery, searchResults = [], onSelectSearchResult }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'movies', label: 'Movies' },
    { id: 'tunnel', label: 'TunnelVision' },
    { id: 'settings', label: 'Settings' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            className="cursor-pointer"
            onClick={() => setActiveSection('home')}
          >
            <img src="https://cdn.jsdelivr.net/gh/rhenryw/lupine@main/public/tinyTitle.png" alt="LupineVault" className="h-8 w-auto" />
          </button>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`px-3 py-2 rounded-md transition-all duration-200 ${
                  activeSection === item.id
                    ? 'text-[#5E17EB] bg-[#5E17EB]/10'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:block relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search games & movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB] text-white placeholder-gray-400 w-64"
            />
            {searchQuery && searchResults.length > 0 && (
              <div className="absolute mt-2 w-[28rem] -left-32 bg-gray-950 border border-gray-800 rounded-lg shadow-xl max-h-96 overflow-auto">
                <ul>
                  {searchResults.map((g) => (
                    <li key={g.id}>
                      <button onClick={() => onSelectSearchResult && onSelectSearchResult(g)} className="w-full flex items-center gap-3 p-3 hover:bg-gray-900 text-left">
                        {g.imageSmall ? (<img src={g.imageSmall} alt={g.title} className="w-12 h-9 object-cover rounded" loading="lazy" />) : (<img src="https://cdn.jsdelivr.net/gh/rhenryw/lupine@main/public/tinyTitle.png" alt="No image" className="w-12 h-9 object-cover rounded" loading="lazy" />)}
                        <div>
                          <div className="text-sm font-medium">{g.title}</div>
                          {g.description && (<div className="text-xs text-gray-400 line-clamp-1">{g.description}</div>)}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
            <div className="relative mt-4 mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search games & movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB] text-white placeholder-gray-400"
              />
              {searchQuery && searchResults.length > 0 && (
                <div className="mt-2 bg-gray-950 border border-gray-800 rounded-lg shadow-xl max-h-80 overflow-auto">
                  <ul>
                    {searchResults.map((g) => (
                      <li key={g.id}>
                        <button onClick={() => { onSelectSearchResult && onSelectSearchResult(g); setIsMenuOpen(false); }} className="w-full flex items-center gap-3 p-3 hover:bg-gray-900 text-left">
                          {g.imageSmall ? (<img src={g.imageSmall} alt={g.title} className="w-12 h-9 object-cover rounded" loading="lazy" />) : (<img src="https://cdn.jsdelivr.net/gh/rhenryw/lupine@main/public/tinyTitle.png" alt="No image" className="w-12 h-9 object-cover rounded" loading="lazy" />)}
                          <div>
                            <div className="text-sm font-medium">{g.title}</div>
                            {g.description && (<div className="text-xs text-gray-400 line-clamp-1">{g.description}</div>)}
                          </div>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <nav className="space-y-2">
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md transition-all duration-200 ${
                    activeSection === item.id
                      ? 'text-[#5E17EB] bg-[#5E17EB]/10'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}