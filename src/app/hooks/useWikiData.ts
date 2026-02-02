'use client';

import { useState, useEffect, useRef } from 'react';

export interface WikiSummary {
  title: string;
  extract: string;
  thumbnail?: { source: string; width: number; height: number };
  description?: string;
  content_urls?: { desktop: { page: string } };
}

// Simple in-memory cache to avoid refetching on re-renders
const cache: Record<string, WikiSummary> = {};

async function fetchSummary(title: string): Promise<WikiSummary | null> {
  if (cache[title]) return cache[title];

  try {
    const res = await fetch(`/api/wikipedia?action=summary&title=${encodeURIComponent(title)}`);
    if (res.ok) {
      const data = await res.json();
      cache[title] = data;
      return data;
    }
  } catch {
    // Silently fail - images are progressive enhancement
  }
  return null;
}

export function useWikiSummary(title: string) {
  const [data, setData] = useState<WikiSummary | null>(cache[title] || null);
  const [loading, setLoading] = useState(!cache[title]);

  useEffect(() => {
    if (!title) return;
    if (cache[title]) {
      setData(cache[title]);
      setLoading(false);
      return;
    }

    let cancelled = false;
    fetchSummary(title).then(result => {
      if (!cancelled) {
        setData(result);
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, [title]);

  return { data, loading };
}

export function useWikiSummaries(titles: string[]) {
  const [data, setData] = useState<Record<string, WikiSummary>>(() => {
    const initial: Record<string, WikiSummary> = {};
    titles.forEach(t => { if (cache[t]) initial[t] = cache[t]; });
    return initial;
  });
  const [loading, setLoading] = useState(true);
  const titlesKey = titles.join('|');
  const fetched = useRef(false);

  useEffect(() => {
    if (!titles.length) {
      setLoading(false);
      return;
    }

    // Only fetch once per title set
    if (fetched.current) return;
    fetched.current = true;

    let cancelled = false;

    Promise.all(titles.map(fetchSummary)).then(results => {
      if (cancelled) return;
      const map: Record<string, WikiSummary> = {};
      results.forEach((result, i) => {
        if (result) map[titles[i]] = result;
      });
      setData(map);
      setLoading(false);
    });

    return () => { cancelled = true; };
  }, [titlesKey]);

  return { data, loading };
}
