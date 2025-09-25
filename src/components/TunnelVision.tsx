import React, { useMemo, useState } from 'react';

interface TunnelVisionProps {
  tvUseProxy: boolean;
  isActive: boolean;
  securlyProtect?: boolean;
  sandstoneProxy?: boolean;
}

export default function TunnelVision({ tvUseProxy, isActive, securlyProtect = false, sandstoneProxy = false }: TunnelVisionProps) {
  const [urlInput, setUrlInput] = useState<string>(() => (typeof window !== 'undefined' ? (localStorage.getItem('tvUrlInput') || '') : ''));
  const [viewerUrl, setViewerUrl] = useState<string>(() => (typeof window !== 'undefined' ? (localStorage.getItem('tvViewerUrl') || '') : ''));
  const [iframeRef, setIframeRef] = useState<HTMLIFrameElement | null>(null);

  function normalizeUrl(raw: string) {
    let u = raw.trim();
    if (!/^https?:\/\//i.test(u)) u = 'https://' + u;
    return u;
  }

  function maybeHashTranslate(u: string) { return securlyProtect ? (u.includes('#') ? `${u}&translate.google.com` : `${u}#translate.google.com`) : u; }
  function buildLimestoneUrl(target: string) {
    const base = new URL(window.location.href);
    base.searchParams.set('limestone', target);
    return base.pathname + '?' + base.searchParams.toString();
  }
  function applyProxy(u: string) {
    const normalized = u;
    if (sandstoneProxy) {
      const t = maybeHashTranslate(normalized);
      return buildLimestoneUrl(t);
    }
    const viaEmbeddr = tvUseProxy ? `https://embeddr.rhw.one/embed#${encodeURIComponent(normalized)}` : normalized;
    return maybeHashTranslate(viaEmbeddr);
  }

  function load(u: string) {
    const normalized = normalizeUrl(u);
    setViewerUrl(applyProxy(normalized));
    try {
      localStorage.setItem('tvUrlInput', normalized);
      localStorage.setItem('tvViewerUrl', applyProxy(normalized));
    } catch {}
  }

  function requestFullscreen() {
    const el = iframeRef as any;
    if (!el) return;
    (el.requestFullscreen || el.webkitRequestFullscreen || el.mozRequestFullScreen || el.msRequestFullscreen)?.call(el);
  }

  return (
    <section className={isActive ? 'py-12' : 'absolute -left-[10000px] -top-[10000px] w-0 h-0 overflow-hidden'}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Tunnel<span className="text-[#5E17EB]">Vision</span>
          </h1>
          <p className="text-gray-400">Browse any URL directly here. Toggle proxy in Settings.</p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch gap-3 mb-6">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => { setUrlInput(e.target.value); try { localStorage.setItem('tvUrlInput', e.target.value); } catch {} }}
            onKeyDown={(e) => { if (e.key === 'Enter' && urlInput.trim()) load(urlInput); }}
            placeholder="Enter a URL..."
            className="flex-1 px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-[#5E17EB] focus:ring-1 focus:ring-[#5E17EB] text-white placeholder-gray-400"
          />
          <button
            onClick={() => urlInput.trim() && load(urlInput)}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-[#5E17EB] to-[#7c3aed] hover:from-[#4c14c7] hover:to-[#6d28d9] text-white font-medium"
          >
            Enter
          </button>
          {viewerUrl && (
            <button onClick={requestFullscreen} className="px-6 py-3 rounded-lg border border-gray-700 text-white hover:bg-gray-800">Fullscreen</button>
          )}
        </div>

        <div className="rounded-xl overflow-hidden border border-gray-800 bg-black min-h-[300px]">
          {viewerUrl ? (
            <iframe ref={setIframeRef} src={viewerUrl} className="w-full h-[70vh]" />
          ) : (
            <div className="h-[50vh] flex items-center justify-center text-gray-500">Enter a URL to begin</div>
          )}
        </div>
      </div>
    </section>
  );
}


