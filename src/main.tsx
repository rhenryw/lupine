import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

const mount = () => {
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
