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
        <header className="wiki-header">
          <div className="wiki-content">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
                <span style={{ fontSize: '2.5em' }}>🌍</span>
                <h1 className="m-0" style={{ fontSize: '1.8em', fontWeight: 'bold', color: 'var(--wc-primary)' }}>
                  WikiCurious
                </h1>
              </Link>
              <nav className="flex gap-4" style={{ fontSize: '0.95em' }}>
                <Link href="/" className="cdx-link">Home</Link>
                <Link href="/about" className="cdx-link">About</Link>
              </nav>
            </div>
          </div>
        </header>
        <div className="wiki-loading">
          <div className="cdx-spinner"></div>
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
            <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: '2.5em' }}>🌍</span>
              <h1 className="m-0" style={{ fontSize: '1.8em', fontWeight: 'bold', color: 'var(--wc-primary)' }}>
                WikiCurious
              </h1>
            </Link>
            <nav className="flex gap-4" style={{ fontSize: '0.95em' }}>
              <Link href="/" className="cdx-link">Home</Link>
              <Link href="/about" className="cdx-link">About</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="wiki-content" style={{ padding: '32px 20px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2.2em', marginBottom: '8px', color: 'var(--wc-primary)' }}>
            ⭐ Saved Articles
          </h1>
          <p style={{ color: 'var(--wc-secondary)', fontSize: '1.1em' }}>
            {savedArticles.length > 0 
              ? `You have ${savedArticles.length} saved article${savedArticles.length > 1 ? 's' : ''}`
              : 'Your saved articles will appear here'}
          </p>
        </div>

        {savedArticles.length === 0 ? (
          <div className="wiki-article" style={{ textAlign: 'center', padding: '60px 40px' }}>
            <div style={{ fontSize: '5em', marginBottom: '20px' }}>📚</div>
            <h2 style={{ color: 'var(--wc-primary)', marginBottom: '16px' }}>No saved articles yet</h2>
            <p style={{ fontSize: '1.1em', color: 'var(--wc-secondary)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
              Search for a topic and save articles to read them later during your trip!
            </p>
            <Link href="/" className="cdx-button cdx-button--action-primary" style={{ fontSize: '1.05em', padding: '14px 28px' }}>
              🚀 Start Exploring
            </Link>
          </div>
        ) : (
          <>
            {/* Articles Grid */}
            <div style={{ display: 'grid', gap: '20px', marginBottom: '48px' }}>
              {savedArticles.map((article, index) => (
                <div key={index} className="wiki-card" style={{ padding: '24px' }}>
                  <div className="flex flex-col md:flex-row gap-4">
                    {article.thumbnail && (
                      <img
                        src={article.thumbnail.source}
                        alt={article.title}
                        style={{ width: '140px', height: '140px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                      />
                    )}
                    <div style={{ flex: 1 }}>
                      <div className="flex justify-between items-start" style={{ marginBottom: '12px' }}>
                        <Link
                          href={`/article/${encodeURIComponent(article.title)}`}
                          className="cdx-link"
                          style={{ textDecoration: 'none' }}
                        >
                          <h3 style={{ margin: 0, color: 'var(--wc-primary)', fontSize: '1.4em' }}>
                            {article.title}
                          </h3>
                        </Link>
                        <button
                          onClick={() => handleRemove(article.title)}
                          className="cdx-button"
                          style={{
                            padding: '8px 16px',
                            background: 'linear-gradient(135deg, #fee7e6 0%, #fec8c5 100%)',
                            border: '1px solid var(--wc-error)',
                            borderRadius: '8px',
                            fontSize: '0.9em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px',
                            cursor: 'pointer'
                          }}
                        >
                          ✕ Remove
                        </button>
                      </div>
                      {article.description && (
                        <div className="wiki-infobox" style={{ marginBottom: '12px', padding: '12px', background: 'linear-gradient(135deg, #e8f4f8 0%, #d4eef7 100%)' }}>
                          <div style={{ fontSize: '0.95em', color: 'var(--wc-secondary)' }}>{article.description}</div>
                        </div>
                      )}
                      <p style={{ color: 'var(--wc-text)', fontSize: '1em', lineHeight: '1.6', margin: 0 }}>
                        {article.extract?.substring(0, 200)}...
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Export Section */}
            <div className="wiki-infobox" style={{ padding: '32px', textAlign: 'center' }}>
              <div className="wiki-infobox-title" style={{ justifyContent: 'center', marginBottom: '16px' }}>
                📥 Export Your Articles
              </div>
              <p style={{ marginBottom: '24px', fontSize: '1.05em', color: 'var(--wc-secondary)' }}>
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
                className="cdx-button cdx-button--action-primary"
                style={{ fontSize: '1.05em', padding: '14px 28px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                📄 Download as Markdown
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
