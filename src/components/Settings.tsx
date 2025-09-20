import React from 'react';

interface SettingsProps {
  tabTitle: string;
  setTabTitle: (v: string) => void;
  useEmbeddr: boolean;
  setUseEmbeddr: (v: boolean) => void;
  movieMaxRating: 'PG' | 'PG-13' | 'R' | 'ALL';
  setMovieMaxRating: (v: 'PG' | 'PG-13' | 'R' | 'ALL') => void;
  tvUseProxy: boolean;
  setTvUseProxy: (v: boolean) => void;
}

export default function Settings({ tabTitle, setTabTitle, useEmbeddr, setUseEmbeddr, movieMaxRating, setMovieMaxRating, tvUseProxy, setTvUseProxy }: SettingsProps) {
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
              <div className="font-medium">Use Embeddr</div>
              <div className="text-sm text-gray-400">Open games via Embeddr proxy</div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={useEmbeddr} onChange={(e) => setUseEmbeddr(e.target.checked)} />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:bg-[#5E17EB] transition-colors relative">
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${useEmbeddr ? 'translate-x-5' : ''}`} />
              </div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">TunnelVision Proxy</div>
              <div className="text-sm text-gray-400">Open URLs via Embeddr proxy</div>
            </div>
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={tvUseProxy} onChange={(e) => setTvUseProxy(e.target.checked)} />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:bg-[#5E17EB] transition-colors relative">
                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform ${tvUseProxy ? 'translate-x-5' : ''}`} />
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


