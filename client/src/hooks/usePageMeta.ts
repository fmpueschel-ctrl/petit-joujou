import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
}

/**
 * Sets per-route <title>, <meta name="description">, canonical, and OG tags.
 * Falls back to the static index.html values when unmounted.
 */
export function usePageMeta(meta: PageMeta) {
  useEffect(() => {
    // Title
    document.title = meta.title;

    // Description
    const descEl = document.querySelector('meta[name="description"]');
    if (descEl) descEl.setAttribute("content", meta.description);

    // Canonical
    if (meta.canonical) {
      const link = document.querySelector('link[rel="canonical"]');
      if (link) link.setAttribute("href", meta.canonical);
    }

    // OG tags
    const ogTitleEl = document.querySelector('meta[property="og:title"]');
    if (ogTitleEl) ogTitleEl.setAttribute("content", meta.ogTitle ?? meta.title);

    const ogDescEl = document.querySelector('meta[property="og:description"]');
    if (ogDescEl) ogDescEl.setAttribute("content", meta.ogDescription ?? meta.description);

    const ogUrlEl = document.querySelector('meta[property="og:url"]');
    if (ogUrlEl && meta.canonical) ogUrlEl.setAttribute("content", meta.canonical);

    // Cleanup: restore defaults on unmount
    return () => {
      document.title = "petit joujou — Weinbar Bad Dürkheim Pfalz | Bio-Weine, Entrecôte, Steak & Events";
      if (descEl) descEl.setAttribute("content", "petit joujou — Weinbar in Bad Dürkheim, Pfalz. 500 Bio-Weine im Gewölbekeller von 1709. Sharing-Küche, Entrecôte & Pinsa. Do–Fr ab 16, Sa–So ab 12 Uhr.");
      const link = document.querySelector('link[rel="canonical"]');
      if (link) link.setAttribute("href", "https://www.petit-joujou.de/");
      if (ogTitleEl) ogTitleEl.setAttribute("content", "petit joujou — Weinbar Bad Dürkheim Pfalz");
      if (ogDescEl) ogDescEl.setAttribute("content", "Nachhaltige Weinbar in Bad Dürkheim, Pfalz. Über 500 biozertifizierte Weine, Entrecôte & Rib-Eye vom Weiderind, Pinsa, Events & Weinabende. klein · fein · wein.");
      if (ogUrlEl) ogUrlEl.setAttribute("content", "https://www.petit-joujou.de/");
    };
  }, [meta.title, meta.description, meta.canonical, meta.ogTitle, meta.ogDescription]);
}
