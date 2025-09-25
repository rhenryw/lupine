import React from 'react';

interface SettingsProps {
  tabTitle: string;
  setTabTitle: (v: string) => void;
  useEmbeddr: boolean;
  setUseEmbeddr: (v: boolean) => void;
  useSandstone?: boolean;
  setUseSandstone?: (v: boolean) => void;
  proxyEnabled?: boolean;
  setProxyEnabled?: (v: boolean) => void;
  proxyType?: 'embeddr' | 'limestone';
  setProxyType?: (v: 'embeddr' | 'limestone') => void;
  movieMaxRating: 'PG' | 'PG-13' | 'R' | 'ALL';
  setMovieMaxRating: (v: 'PG' | 'PG-13' | 'R' | 'ALL') => void;
  tvUseProxy: boolean;
  setTvUseProxy: (v: boolean) => void;
  tvProxyType?: 'embeddr' | 'limestone';
  setTvProxyType?: (v: 'embeddr' | 'limestone') => void;
  moviesUseProxy?: boolean;
  setMoviesUseProxy?: (v: boolean) => void;
  moviesProxyType?: 'embeddr' | 'limestone';
  setMoviesProxyType?: (v: 'embeddr' | 'limestone') => void;
  securlyProtect: boolean;
  setSecurlyProtect: (v: boolean) => void;
}

export default function Settings({ tabTitle, setTabTitle, useEmbeddr, setUseEmbeddr, useSandstone = false, setUseSandstone, proxyEnabled = false, setProxyEnabled, proxyType = 'embeddr', setProxyType, movieMaxRating, setMovieMaxRating, tvUseProxy, setTvUseProxy, tvProxyType = 'embeddr', setTvProxyType, moviesUseProxy = false, setMoviesUseProxy, moviesProxyType = 'embeddr', setMoviesProxyType, securlyProtect, setSecurlyProtect }: SettingsProps) {
  const options: { key: 'PG' | 'PG-13' | 'R' | 'ALL'; label: string }[] = [
    { key: 'PG', label: 'PG' },
    { key: 'PG-13', label: 'PG-13' },
    { key: 'R', label: 'R' },
    { key: 'ALL', label: 'Not Rated/Other (NC17)' }
  ];
  return (
    <section className="py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Settings</h2>
        <div className="space-y-6 bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Tab Title</label>
            <input
              type="text"
              value={tabTitle}
              onChange={(e) => setTabTitle(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB] text-white placeholder-gray-400"
              placeholder="Enter browser tab title"
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Enable Proxy</div>
              <div className="text-sm text-gray-400">Route games and websites through a proxy</div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={!!proxyEnabled} onChange={(e) => setProxyEnabled && setProxyEnabled(e.target.checked)} />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:bg-[#5E17EB] transition-colors relative">
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${proxyEnabled ? 'translate-x-5' : ''}`} />
              </div>
            </label>
          </div>

          {proxyEnabled && (
            <div className="space-y-4 border border-gray-800 rounded-lg p-4 bg-gray-900/50">
              <div className="text-sm text-gray-400">Choose proxy</div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={() => setProxyType && setProxyType('embeddr')}
                  className={`text-left p-3 rounded-md border ${proxyType === 'embeddr' ? 'border-[#5E17EB] bg-[#5E17EB]/10' : 'border-gray-800 bg-gray-900'}`}
                >
                  <div className="font-medium">Embeddr</div>
                  <div className="text-xs text-gray-400">Works best for most games</div>
                </button>
                <button
                  onClick={() => setProxyType && setProxyType('limestone')}
                  className={`text-left p-3 rounded-md border ${proxyType === 'limestone' ? 'border-[#5E17EB] bg-[#5E17EB]/10' : 'border-gray-800 bg-gray-900'}`}
                >
                  <div className="font-medium">Limestone <span className="ml-1 text-[10px] px-1 py-0.5 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 align-middle">BETA</span></div>
                  <div className="text-xs text-gray-400">Harder to block; Embeddr generally works better</div>
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">TunnelVision Proxy</div>
              <div className="text-sm text-gray-400">Open URLs via proxy</div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={tvUseProxy} onChange={(e) => setTvUseProxy(e.target.checked)} />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:bg-[#5E17EB] transition-colors relative">
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${tvUseProxy ? 'translate-x-5' : ''}`} />
              </div>
            </label>
          </div>

          {tvUseProxy && (
            <div className="space-y-4 border border-gray-800 rounded-lg p-4 bg-gray-900/50">
              <div className="text-sm text-gray-400">Choose TunnelVision proxy</div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={() => setTvProxyType && setTvProxyType('embeddr')}
                  className={`text-left p-3 rounded-md border ${tvProxyType === 'embeddr' ? 'border-[#5E17EB] bg-[#5E17EB]/10' : 'border-gray-800 bg-gray-900'}`}
                >
                  <div className="font-medium">Embeddr</div>
                  <div className="text-xs text-gray-400">Recommended for most sites</div>
                </button>
                <button
                  onClick={() => setTvProxyType && setTvProxyType('limestone')}
                  className={`text-left p-3 rounded-md border ${tvProxyType === 'limestone' ? 'border-[#5E17EB] bg-[#5E17EB]/10' : 'border-gray-800 bg-gray-900'}`}
                >
                  <div className="font-medium">Limestone <span className="ml-1 text-[10px] px-1 py-0.5 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 align-middle">BETA</span></div>
                  <div className="text-xs text-gray-400">Harder to block; may be slower</div>
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Movies Proxy</div>
              <div className="text-sm text-gray-400">Open movie player via proxy</div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={!!moviesUseProxy} onChange={(e) => setMoviesUseProxy && setMoviesUseProxy(e.target.checked)} />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:bg-[#5E17EB] transition-colors relative">
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${moviesUseProxy ? 'translate-x-5' : ''}`} />
              </div>
            </label>
          </div>

          {moviesUseProxy && (
            <div className="space-y-4 border border-gray-800 rounded-lg p-4 bg-gray-900/50">
              <div className="text-sm text-gray-400">Choose movies proxy</div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  onClick={() => setMoviesProxyType && setMoviesProxyType('embeddr')}
                  className={`text-left p-3 rounded-md border ${moviesProxyType === 'embeddr' ? 'border-[#5E17EB] bg-[#5E17EB]/10' : 'border-gray-800 bg-gray-900'}`}
                >
                  <div className="font-medium">Embeddr</div>
                  <div className="text-xs text-gray-400">Recommended for most players</div>
                </button>
                <button
                  onClick={() => setMoviesProxyType && setMoviesProxyType('limestone')}
                  className={`text-left p-3 rounded-md border ${moviesProxyType === 'limestone' ? 'border-[#5E17EB] bg-[#5E17EB]/10' : 'border-gray-800 bg-gray-900'}`}
                >
                  <div className="font-medium">Limestone <span className="ml-1 text-[10px] px-1 py-0.5 rounded bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 align-middle">BETA</span></div>
                  <div className="text-xs text-gray-400">Harder to block; may be slower</div>
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Securly Protect</div>
              <div className="text-sm text-gray-400">Append #translate.google.com to all accessed URLs</div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={securlyProtect} onChange={(e) => setSecurlyProtect(e.target.checked)} />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:bg-[#5E17EB] transition-colors relative">
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${securlyProtect ? 'translate-x-5' : ''}`} />
              </div>
            </label>
          </div>

          <div>
            <div className="mb-2 text-sm text-gray-400">Max Movie Rating</div>
            <div className="flex bg-gray-800/60 border border-gray-700 rounded-lg overflow-hidden">
              {options.map(o => (
                <button
                  key={o.key}
                  onClick={() => setMovieMaxRating(o.key)}
                  className={`flex-1 px-3 py-2 text-sm ${movieMaxRating === o.key ? 'bg-[#5E17EB]/30 text-white' : 'text-gray-300 hover:bg-gray-800'}`}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


