import React, { useEffect, useMemo, useState } from 'react';
import { Play } from 'lucide-react';
import MovieModal from './MovieModal.tsx';

type TmdbMovie = {
  id: number;
  title: string;
  name?: string;
  poster_path: string | null;
  release_date?: string;
  adult?: boolean;
};

const TMDB_API_KEY = '2713804610e1e236b1cf44bfac3a7776';
const IMG_BASE = 'https://image.tmdb.org/t/p/w500';

interface MoviesProps { maxRating?: 'PG' | 'PG-13' | 'R' | 'ALL'; securlyProtect?: boolean }

export default function Movies({ maxRating = 'ALL', securlyProtect = false }: MoviesProps) {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<TmdbMovie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load(p: number) {
      try {
        setIsLoading(true);
        const base = new URL('https://api.themoviedb.org/3/discover/movie');
        base.searchParams.set('api_key', TMDB_API_KEY);
        base.searchParams.set('language', 'en-US');
        base.searchParams.set('sort_by', 'popularity.desc');
        base.searchParams.set('page', String(p));
        base.searchParams.set('include_adult', 'false');
        base.searchParams.set('region', 'US');
        if (maxRating !== 'ALL') {
          base.searchParams.set('certification_country', 'US');
          base.searchParams.set('certification.lte', maxRating);
        }
        const res = await fetch(base.toString(), { cache: 'force-cache' });
        const json = await res.json();
        if (cancelled) return;
        let results: TmdbMovie[] = json.results || [];
        if (maxRating !== 'ALL') {
          const order: Record<string, number> = { 'G': 0, 'PG': 1, 'PG-13': 2, 'R': 3, 'NC-17': 4 };
          const maxLevel = order[maxRating] ?? 2;
          const filtered: TmdbMovie[] = [];
          await Promise.all(results.map(async (m) => {
            try {
              const rdRes = await fetch(`https://api.themoviedb.org/3/movie/${m.id}/release_dates?api_key=${TMDB_API_KEY}`, { cache: 'force-cache' });
              const rd = await rdRes.json();
              const us = Array.isArray(rd.results) ? rd.results.find((r: any) => r.iso_3166_1 === 'US') : null;
              const certEntry = us && Array.isArray(us.release_dates) ? us.release_dates.find((d: any) => (d.certification || '').trim().length > 0) : null;
              const cert = certEntry ? String(certEntry.certification).toUpperCase() : '';
              const normalized = cert.startsWith('PG-13') ? 'PG-13' : (cert === 'NC-17' ? 'NC-17' : (cert === 'R' ? 'R' : (cert === 'PG' ? 'PG' : (cert === 'G' ? 'G' : ''))));
              if (!normalized) return; // exclude unrated when filtering is enabled
              if ((order[normalized] ?? 99) <= maxLevel) filtered.push(m);
            } catch {}
          }));
          results = filtered;
        }
        setMovies(prev => p === 1 ? results : [...prev, ...results]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    load(page);
    return () => { cancelled = true; };
  }, [page, maxRating]);

  useEffect(() => {
    setMovies([]);
    setPage(1);
  }, [maxRating]);

  const maybeHashTranslate = (u: string) => (securlyProtect ? (u.includes('#') ? `${u}&translate.google.com` : `${u}#translate.google.com`) : u);
  const cards = useMemo(() => {
    const allowed = new Set<string>();
    if (maxRating === 'ALL') allowed.add('ALL');
    if (maxRating === 'R' || maxRating === 'ALL') { allowed.add('R'); }
    if (maxRating === 'PG-13' || maxRating === 'R' || maxRating === 'ALL') { allowed.add('PG-13'); }
    if (maxRating === 'PG' || maxRating === 'PG-13' || maxRating === 'R' || maxRating === 'ALL') { allowed.add('PG'); }
    return movies
      .map(m => ({
        id: m.id,
        title: m.title || m.name || 'Untitled',
        poster: m.poster_path ? maybeHashTranslate(`${IMG_BASE}${m.poster_path}`) : '',
        year: m.release_date ? (m.release_date.split('-')[0] || '') : ''
      }))
      .filter(() => true);
  }, [movies, maxRating]);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Popular <span className="text-[#5E17EB]">Movies</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Browse popular titles from TMDB. Click a movie to watch.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {cards.map((movie) => (
            <button
              key={movie.id}
              onClick={() => setSelectedId(movie.id)}
              className="bg-gray-900/50 rounded-xl overflow-hidden border border-gray-800 hover:border-[#5E17EB]/50 transition-all duration-300 group"
            >
              <div className="relative overflow-hidden">
                {movie.poster ? (
                  <img src={movie.poster} alt={movie.title} loading="lazy" decoding="async" className="w-full h-64 object-cover" />
                ) : (
                  <div className="w-full h-64 bg-gray-800 flex items-center justify-center text-gray-500">No Image</div>
                )}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="bg-[#5E17EB] text-white p-3 rounded-full shadow-lg">
                    <Play className="w-6 h-6" />
                  </span>
                </div>
              </div>
              <div className="p-3 text-left">
                <div className="font-medium line-clamp-1">{movie.title}</div>
                <div className="text-xs text-gray-400">{movie.year}</div>
              </div>
            </button>
          ))}
        </div>

        <div className="text-center mt-10">
          <button disabled={isLoading} onClick={() => setPage(p => p + 1)} className="disabled:opacity-50 bg-gradient-to-r from-[#5E17EB] to-[#7c3aed] hover:from-[#4c14c7] hover:to-[#6d28d9] text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-lg">
            {isLoading ? 'Loading…' : 'Load More'}
          </button>
        </div>
      </div>

      {selectedId !== null && (
        <MovieModal tmdbId={selectedId} onClose={() => setSelectedId(null)} securlyProtect={securlyProtect} />
      )}
    </section>
  );
}