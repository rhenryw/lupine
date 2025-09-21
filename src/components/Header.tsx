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
            <a
              href="https://discord.gg/XygZfmMM86"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Discord"
              className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800"
              title="Discord"
            >
              <svg className="w-5 h-5 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.073.073 0 00-.079.037c-.211.375-.444.864-.608 1.249-1.844-.276-3.68-.276-5.486 0-.164-.404-.404-.874-.617-1.249a.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.07.07 0 00-.032.027C.533 9.045-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 006.001 3.156.078.078 0 00.084-.027 14.077 14.077 0 001.207-1.955.076.076 0 00-.041-.104 13.123 13.123 0 01-1.872-.9.076.076 0 01-.008-.126c.126-.094.252-.192.372-.291a.074.074 0 01.077-.01c3.927 1.807 8.18 1.807 12.061 0a.074.074 0 01.079.01c.12.099.246.197.372.291a.076.076 0 01-.006.126 12.299 12.299 0 01-1.873.899.076.076 0 00-.04.105c.36.69.766 1.338 1.206 1.954a.076.076 0 00.084.028 19.876 19.876 0 006.002-3.156.077.077 0 00.03-.057c.5-5.177-.838-9.673-3.548-13.661a.06.06 0 00-.031-.03zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419zm7.974 0c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.947 2.419-2.157 2.419z"/>
              </svg>
            </a>
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
              <a
                href="https://discord.gg/XygZfmMM86"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-left px-3 py-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-800 flex items-center gap-2"
                aria-label="Discord"
                title="Discord"
              >
                <svg className="w-5 h-5 fill-current" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.073.073 0 00-.079.037c-.211.375-.444.864-.608 1.249-1.844-.276-3.68-.276-5.486 0-.164-.404-.404-.874-.617-1.249a.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.07.07 0 00-.032.027C.533 9.045-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 006.001 3.156.078.078 0 00.084-.027 14.077 14.077 0 001.207-1.955.076.076 0 00-.041-.104 13.123 13.123 0 01-1.872-.9.076.076 0 01-.008-.126c.126-.094.252-.192.372-.291a.074.074 0 01.077-.01c3.927 1.807 8.18 1.807 12.061 0a.074.074 0 01.079.01c.12.099.246.197.372.291a.076.076 0 01-.006.126 12.299 12.299 0 01-1.873.899.076.076 0 00-.04.105c.36.69.766 1.338 1.206 1.954a.076.076 0 00.084.028 19.876 19.876 0 006.002-3.156.077.077 0 00.03-.057c.5-5.177-.838-9.673-3.548-13.661a.06.06 0 00-.031-.03zM8.02 15.331c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.955 2.419-2.157 2.419zm7.974 0c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.176 1.094 2.157 2.418 0 1.334-.947 2.419-2.157 2.419z"/>
                </svg>
                <span>Discord</span>
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}