import { useEffect, useState, useCallback } from 'react';

export type Theme = 'dark' | 'light';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>('dark');

  useEffect(() => {
    const current = (document.documentElement.classList.contains('light') ? 'light' : 'dark') as Theme;
    setTheme(current);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      const root = document.documentElement;
      // Add transition class for smooth color shift, remove after
      root.classList.add('theme-transition');
      root.classList.remove('dark', 'light');
      root.classList.add(next);
      try {
        localStorage.setItem('leadflow-theme', next);
      } catch {
        // ignore
      }
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', next === 'dark' ? '#050505' : '#f0f4ff');
      window.setTimeout(() => root.classList.remove('theme-transition'), 450);
      return next;
    });
  }, []);

  return { theme, toggle };
}
