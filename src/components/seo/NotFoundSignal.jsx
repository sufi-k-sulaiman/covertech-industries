import { useEffect } from 'react';

/**
 * Marks a client-rendered "not found" screen as a genuine 404 for crawlers and
 * keeps it out of the index. Mount it only after loading has finished, so a page
 * that is still fetching data never reports itself missing.
 */
export default function NotFoundSignal() {
  useEffect(() => {
    const signals = [
      { name: 'prerender-status-code', content: '404' },
      { name: 'robots', content: 'noindex, follow' },
    ];

    const created = signals.map(({ name, content }) => {
      const el = document.createElement('meta');
      el.setAttribute('name', name);
      el.setAttribute('content', content);
      el.setAttribute('data-not-found', '');
      document.head.appendChild(el);
      return el;
    });

    return () => created.forEach((el) => el.remove());
  }, []);

  return null;
}