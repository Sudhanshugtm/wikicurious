'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface WikiArticle {
  title: string;
  extract: string;
  thumbnail?: { source: string };
  description?: string;
  content_urls?: { desktop: { page: string } };
  sections?: WikiSection[];
}

interface WikiSection {
  title: string;
  level: number;
  line: string;
}

function ArticleContent() {
  const params = useParams();
  const title = decodeURIComponent(params.title as string);
  const [article, setArticle] = useState<WikiArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);

      try {
        // Get article summary
        const summaryRes = await fetch(
          `/api/wikipedia?action=summary&title=${encodeURIComponent(title)}`
        );

        if (summaryRes.ok) {
          const summaryData = await summaryRes.json();
          setArticle(summaryData);
        } else {
          setError('Article not found');
        }

        // Check if saved
        const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]');
        setSaved(savedArticles.includes(title));
      } catch (err) {
        setError('Failed to fetch article. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [title]);

  const handleSave = () => {
    const savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]');

    if (saved) {
      const updated = savedArticles.filter((t: string) => t !== title);
      localStorage.setItem('savedArticles', JSON.stringify(updated));
      setSaved(false);
    } else {
      savedArticles.push(title);
      localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
      setSaved(true);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <header className="wiki-header">
          <div className="wiki-content">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
                <span style={{ fontSize: '2.5em' }}>🌍</span>
                <h1 className="m-0 typ-h3" style={{ color: 'var(--wc-primary)' }}>
                  WikiCurious
                </h1>
              </Link>
            </div>
          </div>
        </header>
        <div className="wiki-loading">
          <div className="cdx-spinner"></div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen">
        <header className="wiki-header">
          <div className="wiki-content">
            <div className="flex items-center justify-between">
              <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
                <span style={{ fontSize: '2.5em' }}>🌍</span>
                <h1 className="m-0 typ-h3" style={{ color: 'var(--wc-primary)' }}>
                  WikiCurious
                </h1>
              </Link>
            </div>
          </div>
        </header>
        <main className="wiki-content" style={{ padding: '40px 20px' }}>
          <div className="wiki-error">
            <div className="wiki-error-title">Article Not Found</div>
            <div className="typ-body">{error || 'The requested article could not be found.'}</div>
            <Link href="/" className="cdx-button cdx-button--action-secondary" style={{ marginTop: '16px', display: 'inline-block' }}>
              ← Return to home
            </Link>
          </div>
        </main>
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
              <h1 className="m-0 typ-h3" style={{ color: 'var(--wc-primary)' }}>
                WikiCurious
              </h1>
            </Link>
            <nav className="flex gap-2">
              <button
                onClick={handleSave}
                className={`cdx-button ${saved ? 'cdx-button--action-primary' : 'cdx-button--action-secondary'}`}
                style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                {saved ? '★ Saved' : '☆ Save Article'}
              </button>
              <Link href="/saved" className="cdx-button cdx-button--action-secondary">
                Saved
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="wiki-content" style={{ padding: '32px 20px' }}>
        {/* Breadcrumb */}
        <nav className="cdx-breadcrumb" style={{ marginBottom: '16px' }}>
          <Link href="/" className="cdx-link">Home</Link>
          <span> / </span>
          <span className="typ-body-sm" style={{ color: 'var(--wc-text)' }}>{title}</span>
        </nav>

        {/* Main Article */}
        <article className="wiki-article fade-in">
          {/* Article Header */}
          <div className="flex flex-col md:flex-row gap-6" style={{ marginBottom: '32px' }}>
            {article.thumbnail && (
              <img
                src={article.thumbnail.source}
                alt={article.title}
                style={{ maxWidth: '400px', borderRadius: '12px', boxShadow: '0 4px 16px rgba(0,0,0,0.12)', alignSelf: 'flex-start' }}
              />
            )}
            <div style={{ flex: 1 }}>
              <h1 className="typ-h1">{article.title}</h1>
              {article.description && (
                <div className="wiki-infobox" style={{ marginBottom: '20px', background: 'linear-gradient(135deg, #e8f4f8 0%, #d4eef7 100%)' }}>
                  <div className="typ-h4" style={{ fontWeight: '600', marginBottom: '8px' }}>📝 About</div>
                  <div className="typ-body">{article.description}</div>
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div style={{ marginBottom: '32px' }}>
            {article.extract && (
              <div>
                {article.extract.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="typ-body">
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* External Link */}
          <div className="wiki-infobox" style={{ textAlign: 'center', padding: '28px' }}>
            <div className="wiki-infobox-title" style={{ justifyContent: 'center', marginBottom: '20px' }}>
              📖 Read More on Wikipedia
            </div>
            <p className="typ-body" style={{ marginBottom: '20px', color: 'var(--wc-secondary)' }}>
              This is a summary from Wikipedia. For the full article with citations, references, and more details:
            </p>
            <a
              href={article.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="cdx-button cdx-button--action-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '1.05em', padding: '14px 28px' }}
            >
              Read full article <span>↗</span>
            </a>
          </div>

          {/* Interesting Facts Card */}
          <div className="wiki-fact-card">
            <div className="wiki-fact-label">💡 Quick Fact</div>
            <div className="wiki-fact-value">
              {article.extract?.substring(0, 300)}...
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3" style={{ marginTop: '32px', justifyContent: 'center' }}>
            <Link
              href="/saved"
              className="cdx-button cdx-button--action-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              ⭐ View Saved Articles
            </Link>
            <button
              onClick={() => window.print()}
              className="cdx-button cdx-button--action-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              🖨️ Print Article
            </button>
            <Link
              href={`/search?q=${encodeURIComponent(title)}`}
              className="cdx-button cdx-button--action-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              🔍 Find Related Articles
            </Link>
          </div>
        </article>

        {/* Wikipedia Attribution */}
        <div className="wiki-content" style={{ marginTop: '32px', padding: '20px' }}>
          <div style={{
            borderTop: '1px solid var(--wc-border)',
            paddingTop: '24px',
            textAlign: 'center',
            fontSize: '0.85em',
            color: 'var(--wc-secondary)',
            lineHeight: '1.6'
          }}>
            <p style={{ margin: '0 0 8px 0' }}>
              Content from "<a
                href={article.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', textDecoration: 'underline' }}
              >
                {article.title}
              </a>" -
              <a
                href="https://creativecommons.org/licenses/by-sa/3.0/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'inherit', textDecoration: 'underline' }}
              >
                CC BY-SA 3.0
              </a>
            </p>
            <p style={{ margin: '0' }}>
              Wikipedia® is a registered trademark of the Wikimedia Foundation, Inc.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ArticlePage() {
  return (
    <Suspense fallback={<div className="wiki-loading"><div className="cdx-spinner"></div></div>}>
      <ArticleContent />
    </Suspense>
  );
}
