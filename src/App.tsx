import React, { useEffect, useMemo, useState } from 'react';
import Header from './components/Header';
import GameOfTheDay from './components/GameOfTheDay';
import GameCategories from './components/GameCategories';
import GameGrid from './components/GameGrid';
import About from './components/About';
import Movies from './components/Movies';
import GameModal from './components/GameModal.tsx';
import Settings from './components/Settings';
import MovieModal from './components/MovieModal.tsx';
import TunnelVision from './components/TunnelVision';
import { Game } from './types/game';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [allGames, setAllGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [tabTitle, setTabTitle] = useState<string>(() => (typeof window !== 'undefined' ? (localStorage.getItem('tabTitle') || 'LupineVault') : 'LupineVault'));
  const [useEmbeddr, setUseEmbeddr] = useState<boolean>(() => (typeof window !== 'undefined' ? localStorage.getItem('useEmbeddr') === '1' : true));
  const [movieMaxRating, setMovieMaxRating] = useState<'PG' | 'PG-13' | 'R' | 'ALL'>(() => {
    if (typeof window === 'undefined') return 'PG-13';
    const v = localStorage.getItem('movieMaxRating') as any;
    return v === 'PG' || v === 'PG-13' || v === 'R' || v === 'ALL' ? v : 'PG-13';
  });
  const [tvUseProxy, setTvUseProxy] = useState<boolean>(() => (typeof window !== 'undefined' ? localStorage.getItem('tvUseProxy') === '1' : false));
  const [securlyProtect, setSecurlyProtect] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    const v = localStorage.getItem('securlyProtect');
    return v !== '0';
  });

  const maybeHashTranslate = (u: string) => (securlyProtect ? (u.includes('#') ? `${u}&translate.google.com` : `${u}#translate.google.com`) : u);

  useEffect(() => {
    const controller = new AbortController();
    let isCancelled = false;
    async function fetchFrom(url: string) {
      const isLocal = url.startsWith('/');
      const res = await fetch(url, { cache: isLocal ? 'no-cache' : 'force-cache', mode: 'cors', credentials: 'omit', signal: controller.signal, headers: { Accept: 'application/json' } });
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
          '/all_games.json',
          maybeHashTranslate('https://cdn.statically.io/gh/rhenryw/lupine/0453c38f1fbc06dba907d5b7e1aff7eda0f35eff/public/all_games.json')
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
          const md5 = (g.Md5 as string) || '';
          const url = (g.Url as string) || '';
          let id = md5;
          if (!id && url) {
            const m = url.match(/\/([a-f0-9]{32})\/?$/i) || url.match(/html5\.gamedistribution\.com\/([^\/]+)\/?/i);
            id = m ? m[1] : '';
          }
          let imageSmall = id ? maybeHashTranslate(`https://img.gamedistribution.com/${id}-512x384.jpg`) : '';
          let imageLarge = id ? maybeHashTranslate(`https://img.gamedistribution.com/${id}-1280x720.jpg`) : '';
          const imgField = typeof g.Img === 'string' ? (g.Img as string) : '';
          const assets = Array.isArray(g.Asset) ? (g.Asset as string[]) : [];
          if (!id && imgField) {
            imageSmall = imgField;
            imageLarge = imgField;
          } else if (!id && assets.length) {
            const small = assets.find(a => /-512x384\.jpg$/i.test(a)) || assets[0];
            const large = assets.find(a => /-1280x720\.jpg$/i.test(a)) || assets[assets.length - 1];
            imageSmall = small || '';
            imageLarge = large || imageSmall;
          }
          const directUrl = id ? maybeHashTranslate(`https://gamedistro.rhenrywarren.workers.dev/rvvASMiM/${id}/index.html?gd_sdk_referrer_url=https://lupine.red`) : maybeHashTranslate(url);
          const iframeUrl = maybeHashTranslate(`https://embeddr.rhw.one/embed#${directUrl}`);
          return {
            id: id || url,
            title: g.Title as string,
            description: (g.Description as string) || '',
            instructions: (g.Instructions as string) || '',
            categories: Array.isArray(g.Category) ? g.Category as string[] : [],
            imageSmall,
            imageLarge,
            iframeUrl,
            sourceUrl: url || undefined
          } as Game;
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
    return allGames.filter((game) => {
      const matchesCategory = selectedCategory === 'all' || game.categories.includes(selectedCategory);
      return matchesCategory;
    });
  }, [allGames, selectedCategory]);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [] as Game[];
    const byTitle = allGames.filter(g => g.title.toLowerCase().includes(q));
    const byDesc = allGames.filter(g => !byTitle.includes(g) && g.description.toLowerCase().includes(q));
    return [...byTitle, ...byDesc].slice(0, 20);
  }, [allGames, searchQuery]);

  const handleGameClick = (game: Game) => {
    setSelectedGame(game);
  };

  const handleCloseModal = () => {
    setSelectedGame(null);
  };

  const [movieSearchResults, setMovieSearchResults] = useState<{ id: number; title: string; imageSmall?: string }[]>([]);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  useEffect(() => {
    if (activeSection !== 'movies') {
      setMovieSearchResults([]);
      return;
    }
    const q = searchQuery.trim();
    if (q.length < 2) {
      setMovieSearchResults([]);
      return;
    }
    let cancelled = false;
    const t = setTimeout(async () => {
      try {
        const url = new URL('https://api.themoviedb.org/3/search/movie');
        url.searchParams.set('api_key', '2713804610e1e236b1cf44bfac3a7776');
        url.searchParams.set('query', q);
        url.searchParams.set('include_adult', 'false');
        url.searchParams.set('language', 'en-US');
        const res = await fetch(url.toString(), { cache: 'no-cache' });
        const json = await res.json();
        if (cancelled) return;
        const results = Array.isArray(json.results) ? json.results : [];
        const mapped = results.slice(0, 20).map((m: any) => ({
          id: m.id as number,
          title: (m.title || m.name || '').toString(),
          imageSmall: m.poster_path ? `https://image.tmdb.org/t/p/w154${m.poster_path}` : undefined
        }));
        setMovieSearchResults(mapped);
      } catch {
        if (!cancelled) setMovieSearchResults([]);
      }
    }, 300);
    return () => { cancelled = true; clearTimeout(t); };
  }, [activeSection, searchQuery]);

  useEffect(() => {
    document.title = tabTitle;
    try { localStorage.setItem('tabTitle', tabTitle); } catch {}
  }, [tabTitle]);

  useEffect(() => {
    try { localStorage.setItem('useEmbeddr', useEmbeddr ? '1' : '0'); } catch {}
  }, [useEmbeddr]);

  useEffect(() => {
    try { localStorage.setItem('movieMaxRating', movieMaxRating); } catch {}
  }, [movieMaxRating]);

  useEffect(() => {
    try { localStorage.setItem('tvUseProxy', tvUseProxy ? '1' : '0'); } catch {}
  }, [tvUseProxy]);

  useEffect(() => {
    try { localStorage.setItem('securlyProtect', securlyProtect ? '1' : '0'); } catch {}
  }, [securlyProtect]);

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
        return <Movies maxRating={movieMaxRating} />;
      case 'tunnel':
        return <TunnelVision tvUseProxy={tvUseProxy} isActive={activeSection === 'tunnel'} />;
      case 'settings':
        return <Settings tabTitle={tabTitle} setTabTitle={setTabTitle} useEmbeddr={useEmbeddr} setUseEmbeddr={setUseEmbeddr} movieMaxRating={movieMaxRating} setMovieMaxRating={setMovieMaxRating} tvUseProxy={tvUseProxy} setTvUseProxy={setTvUseProxy} securlyProtect={securlyProtect} setSecurlyProtect={setSecurlyProtect} />;
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
        searchResults={activeSection === 'movies' ? (movieSearchResults as any) : (searchResults as any)}
        onSelectSearchResult={activeSection === 'movies' ? ((m: any) => setSelectedMovieId(m.id)) : (handleGameClick as any)}
      />
      
      <main className="pt-20">
        {renderContent()}
      </main>

      {selectedGame && (
        <GameModal 
          game={selectedGame}
          onClose={handleCloseModal}
          useEmbeddr={useEmbeddr}
          securlyProtect={securlyProtect}
        />
      )}
      {selectedMovieId !== null && (
        <MovieModal tmdbId={selectedMovieId} onClose={() => setSelectedMovieId(null)} securlyProtect={securlyProtect} />
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