import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Intercept and muffle harmless WebSocket / Vite HMR development server connection warnings
if (typeof window !== "undefined") {
  window.addEventListener("unhandledrejection", (event) => {
    const msg = event.reason?.message || String(event.reason || "");
    if (
      msg.includes("WebSocket") || 
      msg.includes("websocket") || 
      msg.includes("vite") || 
      msg.includes("HMR")
    ) {
      event.preventDefault();
      console.info("Suppressed benign background HMR WebSocket error:", event.reason);
    }
  });

  window.addEventListener("error", (event) => {
    const msg = event.message || "";
    if (
      msg.includes("WebSocket") || 
      msg.includes("websocket") || 
      msg.includes("vite") || 
      msg.includes("HMR")
    ) {
      event.preventDefault();
      console.info("Suppressed benign background HMR WebSocket error:", event.message);
    }
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
