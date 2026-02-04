'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import NavInfoJournal from '@/app/components/NavInfoJournal';
import { usePathname } from 'next/navigation';

interface WikiSummary {
  title: string;
  extract: string;
  thumbnail?: { source: string };
  description?: string;
}

export default function SavedPage() {
  const [savedArticles, setSavedArticles] = useState<WikiSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const fetchSavedArticles = async () => {
      const savedTitles = JSON.parse(localStorage.getItem('savedArticles') || '[]');

      if (savedTitles.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const summaries = await Promise.all(
          savedTitles.map(async (title: string) => {
            const res = await fetch(
              `/api/wikipedia?action=summary&title=${encodeURIComponent(title)}`
            );
            if (res.ok) {
              return res.json();
            }
            return null;
          })
        );

        setSavedArticles(summaries.filter(Boolean));
      } catch (err) {
        console.error('Failed to fetch saved articles:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedArticles();
  }, []);

  const handleRemove = (title: string) => {
    const savedTitles = JSON.parse(localStorage.getItem('savedArticles') || '[]');
    const updated = savedTitles.filter((t: string) => t !== title);
    localStorage.setItem('savedArticles', JSON.stringify(updated));
    setSavedArticles(savedArticles.filter((a) => a.title !== title));
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <nav className="journey-nav">
          <Link href="/" className="journey-nav-brand">WikiCurious</Link>
          <div className="journey-nav-links">
            <Link href="/" className={pathname === '/' ? 'active' : ''}>Journey</Link>
            <NavInfoJournal />
          </div>
        </nav>
        <div className="wiki-loading">
          <div className="loading-story">Loading your saved articles...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <nav className="journey-nav">
        <Link href="/" className="journey-nav-brand">WikiCurious</Link>
        <div className="journey-nav-links">
          <Link href="/" className={pathname === '/' ? 'active' : ''}>Journey</Link>
          <NavInfoJournal />
        </div>
      </nav>

      <main className="wiki-content" style={{ padding: '32px 20px' }}>
        <div className="typ-center" style={{ marginBottom: '40px' }}>
          <h1 className="typ-h1" style={{ marginBottom: '8px' }}>
            Saved Articles
          </h1>
          <p className="typ-body-lg" style={{ color: 'var(--cumin)' }}>
            {savedArticles.length > 0
              ? `You have ${savedArticles.length} saved article${savedArticles.length > 1 ? 's' : ''}`
              : 'Your saved articles will appear here'}
          </p>
        </div>

        {savedArticles.length === 0 ? (
          <div className="wiki-article" style={{ textAlign: 'center', padding: '60px 40px' }}>
            <h2 className="typ-h2" style={{ marginBottom: '16px' }}>No saved articles yet</h2>
            <p className="typ-body-lg" style={{ color: 'var(--cumin)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
              Explore the journey pages and save articles to read them later during your trip.
            </p>
            <Link href="/" className="journey-button" style={{ display: 'inline-block', opacity: 1, animation: 'none' }}>
              Start Exploring
            </Link>
          </div>
        ) : (
          <>
            <div style={{ display: 'grid', gap: '20px', marginBottom: '48px' }}>
              {savedArticles.map((article, index) => (
                <div key={index} className="wiki-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    {article.thumbnail && (
                      <img
                        src={article.thumbnail.source}
                        alt={`${article.title} - from Wikipedia`}
                        style={{ width: '140px', height: '140px', objectFit: 'cover', borderRadius: 'var(--radius-md)', flexShrink: 0, border: '1px solid var(--ui-border)' }}
                      />
                    )}
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px', gap: '12px', flexWrap: 'wrap' }}>
                        <Link
                          href={`/article/${encodeURIComponent(article.title)}`}
                          style={{ textDecoration: 'none' }}
                        >
                          <h3 className="typ-h3" style={{ margin: 0, color: 'var(--iznik-cobalt)' }}>
                            {article.title}
                          </h3>
                        </Link>
                        <button
                          onClick={() => handleRemove(article.title)}
                          className="back-link"
                          style={{
                            padding: '4px 12px',
                            fontSize: 'var(--font-sm)',
                            margin: 0,
                            borderColor: 'var(--ottoman-crimson)',
                            color: 'var(--ottoman-crimson)',
                          }}
                        >
                          Remove
                        </button>
                      </div>
                      {article.description && (
                        <div className="wiki-infobox" style={{ marginBottom: '12px', padding: '12px' }}>
                          <div className="typ-body-sm" style={{ color: 'var(--cumin)' }}>{article.description}</div>
                        </div>
                      )}
                      <p className="typ-body" style={{ margin: 0 }}>
                        {article.extract?.substring(0, 200)}...
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="wiki-infobox" style={{ padding: '32px', textAlign: 'center' }}>
              <div className="wiki-infobox-title" style={{ justifyContent: 'center', marginBottom: '16px' }}>
                Export Your Articles
              </div>
              <p className="typ-body" style={{ marginBottom: '24px', color: 'var(--cumin)' }}>
                Save your articles as Markdown to read offline during your trip
              </p>
              <button
                onClick={() => {
                  const content = savedArticles.map(a => `# ${a.title}\n\n${a.description ? a.description + '\n\n' : ''}${a.extract}\n\n---\n`).join('\n');
                  const blob = new Blob([content], { type: 'text/markdown' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'wikicurious-saved-articles.md';
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="journey-button"
                style={{ display: 'inline-block', opacity: 1, animation: 'none' }}
              >
                Download as Markdown
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
