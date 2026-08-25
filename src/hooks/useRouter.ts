import { useState, useEffect } from 'react';

export interface RouteState {
  path: string;
  slug?: string;
  category?: string;
}

export function useRouter() {
  const [currentPath, setCurrentPath] = useState<string>(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (to: string) => {
    if (window.location.pathname !== to) {
      window.history.pushState({}, '', to);
      setCurrentPath(to);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Route Parser with trailing slash normalization & alias handling
  const parseRoute = (): RouteState => {
    let path = currentPath.toLowerCase().trim();
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1);
    }

    if (path === '' || path === '/') {
      return { path: '/' };
    }

    if (path === '/compress') {
      return { path: '/compress', category: 'pdf' };
    }

    if (path === '/convert') {
      return { path: '/convert' };
    }

    if (path === '/tools') {
      return { path: '/tools' };
    }

    if (path.startsWith('/tools/')) {
      let slug = path.replace('/tools/', '');
      // Alias handling for common tool URLs
      if (slug === 'pdf-compressor') slug = 'compress-pdf';
      return { path: '/tools/:slug', slug };
    }

    if (path === '/blog') {
      return { path: '/blog' };
    }

    if (path.startsWith('/blog/')) {
      const slug = path.replace('/blog/', '');
      return { path: '/blog/:slug', slug };
    }

    if (
      [
        '/privacy',
        '/terms',
        '/about',
        '/contact',
        '/capabilities',
        '/status',
        '/verification',
        '/cookies',
      ].includes(path)
    ) {
      return { path };
    }

    return { path: '404' };
  };

  return {
    currentPath,
    navigate,
    route: parseRoute(),
  };
}
