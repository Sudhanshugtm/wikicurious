'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface WikiSummary {
  title: string;
  extract: string;
  thumbnail?: { source: string };
  description?: string;
  content_urls?: { desktop: { page: string } };
}

interface WikiArticle {
  title: string;
  extract: string;
  thumbnail?: { source: string };
  description?: string;
  content_urls?: { desktop: { page: string } };
}

interface WikiSection {
  title: string;
  content: string;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState<WikiSummary[]>([]);
  const [mainArticle, setMainArticle] = useState<WikiArticle | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;

    const fetchContent = async () => {
      setLoading(true);
      setError(null);

      try {
        // Try to get main article summary first
        const summaryResponse = await fetch(
          `/api/wikipedia?action=summary&title=${encodeURIComponent(query)}`
        );

        if (summaryResponse.ok) {
          const mainData = await summaryResponse.json();
          if (mainData.title) {
            setMainArticle(mainData);
          }
        }

        // Try to get related articles
        const relatedResponse = await fetch(
          `/api/wikipedia?action=related&title=${encodeURIComponent(query)}`
        );

        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          if (relatedData.pages) {
            setArticles(relatedData.pages);
          }
        }

        // If no related pages, try search API
        if (!mainArticle && (!articles || articles.length === 0)) {
          const searchResponse = await fetch(
            `/api/wikipedia?action=search&q=${encodeURIComponent(query)}`
          );

          if (searchResponse.ok) {
            const searchData = await searchResponse.json();
            if (searchData.query?.search?.length > 0) {
              // Get summaries for top results
              const summaries = await Promise.all(
                searchData.query.search.slice(0, 6).map(async (result: any) => {
                  const summaryRes = await fetch(
                    `/api/wikipedia?action=summary&title=${encodeURIComponent(result.title)}`
                  );
                  if (summaryRes.ok) {
                    return summaryRes.json();
                  }
                  return null;
                })
              );

              const validSummaries = summaries.filter(Boolean);
              setArticles(validSummaries);

              // Set first result as main article if we don't have one
              if (!mainArticle && validSummaries[0]) {
                setMainArticle(validSummaries[0]);
              }
            }
          }
        }
      } catch (err) {
        setError('Failed to fetch content. Please try again.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [query]);

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

  if (error) {
    return (
      <div className="wiki-error">
        <div className="wiki-error-title">Error</div>
        <div>{error}</div>
      </div>
    );
  }

  if (!mainArticle && (!articles || articles.length === 0)) {
    return (
      <div className="wiki-article">
        <h2>No Results Found</h2>
        <p>We couldn&apos;t find any Wikipedia articles for &quot;{query}&quot;.</p>
        <p>Try searching for a different term or checking the spelling.</p>
        <Link href="/" className="cdx-button cdx-button--action-secondary" style={{ marginTop: '16px' }}>
          ← Back to search
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
            <nav className="flex gap-4 text-sm">
              <Link href="/" className="text-decoration-none cdx-link">Home</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="wiki-content">
        <div style={{ padding: '24px 0' }}>
          {/* Search Bar */}
          <Link
            href="/"
            className="cdx-button cdx-button--action-secondary"
            style={{ marginBottom: '24px' }}
          >
            ← Back to search
          </Link>

          <h2 style={{ fontSize: '2em', marginBottom: '16px' }}>
            Results for &quot;{query}&quot;
          </h2>

          {mainArticle && (
            <div className="wiki-article">
              <div className="flex flex-col md:flex-row gap-4" style={{ marginBottom: '24px' }}>
                {mainArticle.thumbnail && (
                  <img
                    src={mainArticle.thumbnail.source}
                    alt={mainArticle.title}
                    style={{ maxWidth: '300px', borderRadius: '2px' }}
                  />
                )}
                <div>
                  <h1>{mainArticle.title}</h1>
                  {mainArticle.description && (
                    <p style={{ fontStyle: 'italic', color: 'var(--wc-secondary)', marginBottom: '16px' }}>
                      {mainArticle.description}
                    </p>
                  )}
                  <p>{mainArticle.extract}</p>
                  <a
                    href={mainArticle.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(mainArticle.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cdx-link"
                  >
                    Read full article on Wikipedia →
                  </a>
                </div>
              </div>

              {/* Quick Facts Section */}
              <div className="wiki-fact-card">
                <div className="wiki-fact-label">💡 Did you know?</div>
                <div className="wiki-fact-value">
                  {mainArticle.extract?.substring(0, 200)}...
                </div>
              </div>
            </div>
          )}

          {/* Related Articles */}
          {articles && articles.length > 1 && (
            <div>
              <h3 style={{ marginTop: '32px', marginBottom: '16px' }}>
                Related Articles
              </h3>
              <div style={{ display: 'grid', gap: '16px' }}>
                {articles.map((article, index) => (
                  article && article.title !== mainArticle?.title && (
                    <Link
                      key={index}
                      href={`/article/${encodeURIComponent(article.title)}`}
                      className="cdx-card"
                      style={{ textDecoration: 'none', display: 'flex', gap: '16px' }}
                    >
                      {article.thumbnail && (
                        <img
                          src={article.thumbnail.source}
                          alt={article.title}
                          style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '2px' }}
                        />
                      )}
                      <div className="cdx-card__text" style={{ flex: 1 }}>
                        <h4 className="cdx-card__title" style={{ marginBottom: '8px', color: 'var(--wc-text)' }}>
                          {article.title}
                        </h4>
                        <p className="cdx-card__text" style={{ color: 'var(--wc-secondary)', fontSize: '0.9em' }}>
                          {article.extract?.substring(0, 150)}...
                        </p>
                      </div>
                    </Link>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="wiki-loading">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}
