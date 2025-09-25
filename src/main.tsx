import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

function runLimestone(url: string) {
  const head = document.head || document.getElementsByTagName('head')[0];
  const s = document.createElement('script');
  s.src = 'https://github.com/rhenryw/limestone/releases/download/1.0/limestone.js';
  s.onload = () => {
    try {
      if ((window as any).sandstone?.libcurl?.set_websocket) {
        try { (window as any).sandstone.libcurl.set_websocket('wss://curl-proxy.rhw.one'); } catch {}
      }
      const root = document.getElementById('root') || (() => { const d = document.createElement('div'); d.id = 'root'; document.body.appendChild(d); return d; })();
      const frame = new (window as any).sandstone.controller.ProxyFrame(root);
      if (frame.load) frame.load(url); else if (frame.navigate) frame.navigate(url); else location.href = url;
    } catch (e) {
      console.error(e);
      document.body.textContent = 'Failed to load';
    }
  };
  head.appendChild(s);
}

const mount = () => {
  const params = new URLSearchParams(window.location.search);
  const limestone = params.get('limestone');
  if (limestone) {
    runLimestone(limestone);
    return;
  }
  let container = document.getElementById('root');
  if (!container) {
    container = document.createElement('div');
    container.id = 'root';
    document.body.appendChild(container);
  }
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
};

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', mount, { once: true });
} else {
  mount();
}
