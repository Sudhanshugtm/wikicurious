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
        <nav className="journey-nav">
          <Link href="/" className="journey-nav-brand">WikiCurious</Link>
          <div className="journey-nav-links">
            <Link href="/">Journey</Link>
            <Link href="/saved">Saved</Link>
          </div>
        </nav>
        <div className="wiki-loading">
          <div className="loading-story">Loading article...</div>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen">
        <nav className="journey-nav">
          <Link href="/" className="journey-nav-brand">WikiCurious</Link>
          <div className="journey-nav-links">
            <Link href="/">Journey</Link>
            <Link href="/saved">Saved</Link>
          </div>
        </nav>
        <main className="wiki-content" style={{ padding: '40px 20px' }}>
          <div className="wiki-error">
            <div className="wiki-error-title">Article Not Found</div>
            <div className="typ-body">{error || 'The requested article could not be found.'}</div>
            <Link href="/" className="back-link" style={{ marginTop: '16px' }}>
              Return to home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <nav className="journey-nav">
        <Link href="/" className="journey-nav-brand">WikiCurious</Link>
        <div className="journey-nav-links">
          <button
            onClick={handleSave}
            className="back-link"
            style={{
              margin: 0,
              borderColor: saved ? 'var(--imperial-gold)' : 'var(--ottoman-purple)',
              color: saved ? 'var(--antique-gold)' : 'var(--ottoman-purple)',
              background: saved ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
              fontSize: 'var(--font-sm)',
              padding: '4px 12px',
            }}
          >
            {saved ? 'Saved' : 'Save'}
          </button>
          <Link href="/">Journey</Link>
          <Link href="/saved">Saved</Link>
        </div>
      </nav>

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
              <div className="hero-image-section" style={{ maxWidth: '400px' }}>
                <img
                  src={article.thumbnail.source}
                  alt={`${article.title} - from Wikipedia`}
                />
                <div className="hero-image-caption">
                  Image from <a href={article.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                </div>
              </div>
            )}
            <div style={{ flex: 1 }}>
              <h1 className="typ-h1">{article.title}</h1>
              {article.description && (
                <div className="wiki-infobox" style={{ marginBottom: '20px' }}>
                  <div className="wiki-infobox-title">About</div>
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
                  <p key={idx} className={`typ-body ${idx === 0 ? 'typ-dropcap' : ''}`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Read More */}
          <div className="wiki-infobox" style={{ textAlign: 'center', padding: '28px' }}>
            <div className="wiki-infobox-title" style={{ justifyContent: 'center', marginBottom: '20px' }}>
              Read More on Wikipedia
            </div>
            <p className="typ-body" style={{ marginBottom: '20px', color: 'var(--cumin)' }}>
              This is a summary from Wikipedia. For the full article with citations, references, and more details:
            </p>
            <a
              href={article.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="journey-button"
              style={{ display: 'inline-block', opacity: 1, animation: 'none', fontSize: 'var(--font-base)', padding: '12px 24px' }}
            >
              Read full article
            </a>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-md)', marginTop: '32px', justifyContent: 'center' }}>
            <Link href="/saved" className="back-link" style={{ margin: 0 }}>
              View Saved Articles
            </Link>
            <Link href={`/search?q=${encodeURIComponent(title)}`} className="back-link" style={{ margin: 0 }}>
              Find Related Articles
            </Link>
          </div>
        </article>

        {/* Wikipedia Attribution */}
        <div style={{ marginTop: '32px', padding: '20px', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <div style={{
            borderTop: '2px solid var(--imperial-gold)',
            paddingTop: '24px',
            fontSize: 'var(--font-sm)',
            color: 'var(--cumin)',
            lineHeight: '1.6'
          }}>
            <p style={{ margin: '0 0 8px 0' }}>
              Content from &ldquo;<a
                href={article.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--iznik-cobalt)', textDecoration: 'underline' }}
              >
                {article.title}
              </a>&rdquo; &mdash;{' '}
              <a
                href="https://creativecommons.org/licenses/by-sa/3.0/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--iznik-cobalt)', textDecoration: 'underline' }}
              >
                CC BY-SA 3.0
              </a>
            </p>
            <p style={{ margin: '0' }}>
              Wikipedia&reg; is a registered trademark of the Wikimedia Foundation, Inc.
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
