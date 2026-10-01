import { useState, useEffect, useCallback } from 'react';

// Hash-based routes keep the app working from any subpath and offline:
//   #/            home
//   #/settings    settings
//   #/ex/<type>[/<level>]
export function parseRoute(hash = window.location.hash) {
  const parts = hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent);
  if (parts[0] === 'settings') return { view: 'settings' };
  if (parts[0] === 'ex' && parts[1]) return { view: 'exercise', type: parts[1], level: parts[2] || 'auto' };
  return { view: 'home' };
}

export function routeToHash(route) {
  if (route.view === 'settings') return '#/settings';
  if (route.view === 'exercise') {
    const base = `#/ex/${encodeURIComponent(route.type).replace(/%2B/g, '+')}`;
    return route.level && route.level !== 'auto' ? `${base}/${encodeURIComponent(route.level)}` : base;
  }
  return '#/';
}

export function useRouter() {
  const [route, setRoute] = useState(() => parseRoute());

  useEffect(() => {
    if (!window.history.state?.app) {
      window.history.replaceState({ app: true, depth: 0 }, '', routeToHash(parseRoute()));
    }
    const sync = () => {
      // A hash typed/edited by hand creates a new entry with no state; there is an entry behind it.
      if (!window.history.state?.app) window.history.replaceState({ app: true, depth: 1 }, '', window.location.hash);
      setRoute(parseRoute());
    };
    window.addEventListener('popstate', sync);
    window.addEventListener('hashchange', sync);
    return () => {
      window.removeEventListener('popstate', sync);
      window.removeEventListener('hashchange', sync);
    };
  }, []);

  const navigate = useCallback((next, { replace = false } = {}) => {
    const hash = routeToHash(next);
    const depth = window.history.state?.depth ?? 0;
    if (replace) {
      window.history.replaceState({ app: true, depth }, '', hash);
    } else if (hash !== window.location.hash) {
      window.history.pushState({ app: true, depth: depth + 1 }, '', hash);
    }
    setRoute(parseRoute(hash));
  }, []);

  // Prefer real browser history so Back in the header and the browser agree.
  const back = useCallback(() => {
    if ((window.history.state?.depth ?? 0) > 0) window.history.back();
    else navigate({ view: 'home' }, { replace: true });
  }, [navigate]);

  return { route, navigate, back };
}
