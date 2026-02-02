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
          `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`
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
      <div className="wiki-loading">
        <div className="cdx-spinner" style={{ width: '48px', height: '48px', border: '4px solid #c8ccd1', borderTopColor: '#3366cc', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }}>
          <style jsx>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="wiki-error">
        <div className="wiki-error-title">Article Not Found</div>
        <div>{error || 'The requested article could not be found.'}</div>
        <Link href="/" className="cdx-link" style={{ marginTop: '16px', display: 'inline-block' }}>
          ← Return to home
        </Link>
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
            <nav className="flex gap-2">
              <button
                onClick={handleSave}
                className={`cdx-button cdx-button--weight-quiet ${saved ? 'cdx-button--action-quiet-active' : ''}`}
              >
                {saved ? '★ Saved' : '☆ Save'}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <main className="wiki-content">
        <div style={{ padding: '24px 0' }}>
          {/* Breadcrumb */}
          <nav className="cdx-breadcrumb" style={{ marginBottom: '16px', fontSize: '0.9em' }}>
            <Link href="/" className="cdx-link">Home</Link>
            <span> / </span>
            <span>{title}</span>
          </nav>

          {/* Main Article */}
          <article className="wiki-article">
            {/* Article Header */}
            <div className="flex flex-col md:flex-row gap-4" style={{ marginBottom: '24px' }}>
              {article.thumbnail && (
                <img
                  src={article.thumbnail.source}
                  alt={article.title}
                  style={{ maxWidth: '350px', borderRadius: '2px', alignSelf: 'flex-start' }}
                />
              )}
              <div style={{ flex: 1 }}>
                <h1>{article.title}</h1>
                {article.description && (
                  <div className="wiki-infobox" style={{ marginBottom: '16px' }}>
                    <div className="wiki-infobox-label" style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                      Description
                    </div>
                    <div>{article.description}</div>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="wiki-content-text">
              {article.extract && (
                <div>
                  {article.extract.split('\n\n').map((paragraph, idx) => (
                    <p key={idx} style={{ marginBottom: '1em', lineHeight: '1.6' }}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {/* External Link */}
            <div className="wiki-infobox" style={{ marginTop: '24px' }}>
              <div className="wiki-infobox-title">Read More</div>
              <p style={{ marginBottom: '8px' }}>
                This is a summary from Wikipedia. For the full article with citations and more details:
              </p>
              <a
                href={article.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="cdx-link cdx-button cdx-button--action-primary"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                Read full article on Wikipedia
                <span style={{ fontSize: '0.8em' }}>↗</span>
              </a>
            </div>

            {/* Interesting Facts Card */}
            <div className="wiki-fact-card" style={{ marginTop: '24px' }}>
              <div className="wiki-fact-label">💡 Quick Fact</div>
              <div className="wiki-fact-value">
                {article.extract?.substring(0, 200)}...
              </div>
            </div>
          </article>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2" style={{ marginTop: '16px' }}>
            <Link
              href="/saved"
              className="cdx-button cdx-button--action-secondary"
            >
              View Saved Articles
            </Link>
            <button
              onClick={() => window.print()}
              className="cdx-button cdx-button--weight-quiet"
            >
              Print Article
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function ArticlePage() {
  return (
    <Suspense fallback={<div className="wiki-loading">Loading...</div>}>
      <ArticleContent />
    </Suspense>
  );
}
