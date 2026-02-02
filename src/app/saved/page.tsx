'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface WikiSummary {
  title: string;
  extract: string;
  thumbnail?: { source: string };
  description?: string;
}

export default function SavedPage() {
  const [savedArticles, setSavedArticles] = useState<WikiSummary[]>([]);
  const [loading, setLoading] = useState(true);

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
              `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
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
        <header className="wiki-header">
          <div className="wiki-content">
            <Link href="/" className="flex items-center gap-2 text-decoration-none">
              <span className="text-2xl">🌍</span>
              <h1 className="m-0 text-xl font-bold">WikiCurious</h1>
            </Link>
          </div>
        </header>
        <div className="wiki-loading">
          <div className="cdx-spinner" style={{ width: '48px', height: '48px', border: '4px solid #c8ccd1', borderTopColor: '#3366cc', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }}>
            <style jsx>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="wiki-header">
        <div className="wiki-content">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-decoration-none">
              <span className="text-2xl">🌍</span>
              <h1 className="m-0 text-xl font-bold">WikiCurious</h1>
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/" className="text-decoration-none cdx-link">Home</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="wiki-content">
        <div style={{ padding: '24px 0' }}>
          <h1 style={{ fontSize: '2em', marginBottom: '16px' }}>
            {savedArticles.length > 0 ? `Saved Articles (${savedArticles.length})` : 'Saved Articles'}
          </h1>

          {savedArticles.length === 0 ? (
            <div className="wiki-infobox" style={{ textAlign: 'center', padding: '48px' }}>
              <p style={{ fontSize: '1.2em', marginBottom: '16px' }}>No saved articles yet</p>
              <p style={{ color: 'var(--wc-secondary)', marginBottom: '24px' }}>
                Search for a topic and save articles to read them later!
              </p>
              <Link href="/" className="cdx-button cdx-button--action-primary">
                Start Exploring
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '16px' }}>
              {savedArticles.map((article) => (
                <div key={article.title} className="cdx-card">
                  <div className="flex flex-col md:flex-row gap-4">
                    {article.thumbnail && (
                      <img
                        src={article.thumbnail.source}
                        alt={article.title}
                        style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '2px' }}
                      />
                    )}
                    <div className="cdx-card__text" style={{ flex: 1 }}>
                      <div className="flex justify-between items-start">
                        <Link
                          href={`/article/${encodeURIComponent(article.title)}`}
                          className="cdx-link"
                        >
                          <h3 className="cdx-card__title" style={{ marginBottom: '8px' }}>
                            {article.title}
                          </h3>
                        </Link>
                        <button
                          onClick={() => handleRemove(article.title)}
                          className="cdx-button cdx-button--weight-quiet cdx-button--action-destructive"
                          style={{ fontSize: '0.9em', padding: '4px 12px' }}
                        >
                          Remove
                        </button>
                      </div>
                      {article.description && (
                        <p style={{ fontStyle: 'italic', color: 'var(--wc-secondary)', fontSize: '0.9em', marginBottom: '8px' }}>
                          {article.description}
                        </p>
                      )}
                      <p style={{ fontSize: '0.9em', lineHeight: '1.5' }}>
                        {article.extract?.substring(0, 200)}...
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Export Section */}
          {savedArticles.length > 0 && (
            <div className="wiki-infobox" style={{ marginTop: '32px' }}>
              <div className="wiki-infobox-title">Export Articles</div>
              <p style={{ marginBottom: '16px' }}>Save your articles for offline reading:</p>
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
                className="cdx-button cdx-button--action-primary"
              >
                Download as Markdown
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
