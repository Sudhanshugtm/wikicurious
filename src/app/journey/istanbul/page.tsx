'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface WikiArticle {
  title: string;
  extract: string;
  thumbnail?: { source: string };
  description?: string;
  content_urls?: { desktop: { page: string } };
}

export default function IstanbulJourney() {
  const [article, setArticle] = useState<WikiArticle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIstanbul = async () => {
      try {
        const res = await fetch('/api/wikipedia?action=summary&title=Istanbul');
        if (res.ok) {
          const data = await res.json();
          setArticle(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchIstanbul();
  }, []);

  if (loading) {
    return (
      <div className="story-container">
        <div className="loading-story">Walking through the streets of Istanbul...</div>
      </div>
    );
  }

  return (
    <div className="story-container">
      <header className="header-minimal">
        <Link href="/">home</Link>
      </header>

      <div style={{ flex: 1, padding: '40px 20px' }}>
        <div className="story-section">
          <Link href="/" className="back-link">← Return to journey</Link>

          <h1 className="scene-header" style={{ textAlign: 'left', fontSize: '2.8em' }}>
            Istanbul
          </h1>
          <p className="scene-subtitle" style={{ textAlign: 'left' }}>
            Where continents meet and civilizations merge
          </p>

          {article && (
            <>
              {article.thumbnail && (
                <img
                  src={article.thumbnail.source}
                  alt="Istanbul"
                  className="article-image"
                />
              )}

              <p className="story-paragraph">
                You stand at the edge of the Golden Horn. The air carries the scent of sea salt, roasted chestnuts, and coffee. Before you, the Bosphorus Strait divides two continents — Europe to your left, Asia to your right. Ferries crisscross the dark blue water like stitching on a great coat.
              </p>

              <p className="story-paragraph">
                {article.extract}
              </p>

              {article.description && (
                <div style={{ padding: '24px', margin: '24px 0', background: 'var(--paper-cream)', borderLeft: '3px solid var(--accent)' }}>
                  <em>{article.description}</em>
                </div>
              )}

              <p className="story-paragraph">
                Above the city, six minarets pierce the sky. The Hagia Sophia — once church, once mosque, now museum — has watched over this place for fifteen centuries. Through its walls, you can feel the pulse of empires: Byzantine mosaics beneath Ottoman calligraphy.
              </p>
            </>
          )}

          <div style={{ marginTop: '48px' }}>
            <h2 style={{ fontSize: '1.5em', fontWeight: 'normal', marginBottom: '24px', textAlign: 'center' }}>
              Explore deeper
            </h2>

            <Link href="/article/Hagia%20Sophia" style={{ textDecoration: 'none' }}>
              <div className="era-card">
                <h3 className="era-title">⛪ Hagia Sophia</h3>
                <p className="era-description">The architectural wonder that defied time</p>
              </div>
            </Link>

            <Link href="/article/Grand%20Bazaar" style={{ textDecoration: 'none' }}>
              <div className="era-card">
                <h3 className="era-title">🛍️ Grand Bazaar</h3>
                <p className="era-description">One of the oldest covered markets in the world</p>
              </div>
            </Link>

            <Link href="/article/Topkapi%20Palace" style={{ textDecoration: 'none' }}>
              <div className="era-card">
                <h3 className="era-title">👑 Topkapi Palace</h3>
                <p className="era-description">Where Ottoman sultans ruled an empire</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
