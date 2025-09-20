import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import GameOfTheDay from './components/GameOfTheDay';
import GameCategories from './components/GameCategories';
import GameGrid from './components/GameGrid';
import About from './components/About';
import Movies from './components/Movies';
import GameModal from './components/GameModal';
import { Game } from './types/game';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    let isCancelled = false;
    async function fetchFrom(url: string) {
      const res = await fetch(url, { cache: 'force-cache', mode: 'cors', credentials: 'omit', signal: controller.signal, headers: { Accept: 'application/json' } });
      if (!res.ok) {
        const t = await res.text().catch(() => '');
        throw new Error(`Failed ${res.status}: ${t.slice(0, 200)}`);
      }
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        try {
          return await res.json();
        } catch {}
      }
      const raw = await res.text();
      const t = raw.replace(/^\uFEFF/, '').trim();
      if (t.startsWith('{') || t.startsWith('[')) {
        try {
          return JSON.parse(t);
        } catch {}
      }
      throw new Error('Unexpected response');
    }
    async function load() {
      try {
        setIsLoading(true);
        const urls = [
          'https://cdn.jsdelivr.net/gh/rhenryw/lupine@main/all_games.json',
          'https://raw.githubusercontent.com/rhenryw/lupine/main/all_games.json',
          'https://cdn.statically.io/gh/rhenryw/lupine/main/all_games.json',
          '/all_games.json'
        ];
        let data: any[] | null = null;
        let lastError: unknown = null;
        for (const u of urls) {
          try {
            const d = await fetchFrom(u);
            if (Array.isArray(d)) {
              data = d;
              break;
            }
          } catch (e) {
            lastError = e;
            console.warn('Failed to load games from', u, e);
          }
        }
        if (!data) throw lastError || new Error('Unable to load data');
        if (isCancelled) return;
        const mapped: Game[] = (data as any[]).map((g) => {
          const id = g.Md5 as string;
          return {
            id,
            title: g.Title as string,
            description: (g.Description as string) || '',
            instructions: (g.Instructions as string) || '',
            categories: Array.isArray(g.Category) ? g.Category as string[] : [],
            imageSmall: `https://img.gamedistribution.com/${id}-512x384.jpg`,
            imageLarge: `https://img.gamedistribution.com/${id}-1280x720.jpg`,
            iframeUrl: `https://embeddr.rhw.one/embed#https://gamedistro.rhenrywarren.workers.dev/rvvASMiM/${id}/index.html?gd_sdk_referrer_url=https://lupine.red`
          };
        });
        setAllGames(mapped);
      } catch (e) {
        console.error(e);
      } finally {
        if (!isCancelled) setIsLoading(false);
      }
    }
    load();
    return () => { isCancelled = true; controller.abort(); };
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const g of allGames) {
      for (const c of g.categories) set.add(c);
    }
    return ['all', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [allGames]);

  const filteredGames = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return allGames.filter((game) => {
      const matchesSearch = !q || game.title.toLowerCase().includes(q) || game.description.toLowerCase().includes(q);
      const matchesCategory = selectedCategory === 'all' || game.categories.includes(selectedCategory);
      return matchesSearch && matchesCategory;
    });
  }, [allGames, searchQuery, selectedCategory]);

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  const featuredGame = useMemo(() => {
    if (filteredGames.length === 0) return null;
    const idx = Math.floor(Math.random() * filteredGames.length);
    return filteredGames[idx];
  }, [filteredGames]);

  const renderContent = () => {
    switch (activeSection) {
      case 'about':
        return <About />;
      case 'movies':
        return <Movies />;
      default:
        return (
          <>
            {featuredGame && (
              <GameOfTheDay game={featuredGame} onPlay={() => handleGameClick(featuredGame)} />
            )}
            <GameCategories 
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <GameGrid games={filteredGames} isLoading={isLoading} onGameClick={handleGameClick} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main className="pt-20">
        {renderContent()}
      </main>

      {selectedGame && (
        <GameModal 
          game={selectedGame}
          onClose={handleCloseModal}
        />
      )}
      
      <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">© 2025 LupineVault. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;