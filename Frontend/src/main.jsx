/**
 * React entry — mounts App and loads global styles.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { unregisterServiceWorkers } from './utils/unregisterServiceWorkers.js';
import './index.css';
import './styles/components.css';

// Drop stale SWs before first paint so they cannot hijack /api fetches
void unregisterServiceWorkers();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
