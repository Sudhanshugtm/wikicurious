'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

interface WikiSummary {
  title: string;
  extract: string;
  thumbnail?: { source: string };
  description?: string;
  content_urls: { desktop: { page: string } };
}

interface WikiArticle {
  title: string;
  extract: string;
  thumbnail?: { source: string };
  sections?: WikiSection[];
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
        // First, search for articles
        const searchResponse = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/related/${encodeURIComponent(query)}`
        );

        if (searchResponse.ok) {
          const searchData = await searchResponse.json();
          setArticles(searchData.pages || []);

          // Get the main article summary
          const mainResponse = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
          );

          if (mainResponse.ok) {
            const mainData = await mainResponse.json();
            setMainArticle(mainData);
          }
        } else {
          // If related pages fails, try search API
          const wikiSearchResponse = await fetch(
            `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&format=json&origin=*`
          );

          if (wikiSearchResponse.ok) {
            const wikiSearchData = await wikiSearchResponse.json();
            if (wikiSearchData.query?.search?.length > 0) {
              // Get summaries for top results
              const summaries = await Promise.all(
                wikiSearchData.query.search.slice(0, 6).map(async (result: any) => {
                  const summaryRes = await fetch(
                    `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(result.title)}`
                  );
                  if (summaryRes.ok) {
                    return summaryRes.json();
                  }
                  return null;
                })
              );
              setArticles(summaries.filter(Boolean));

              // Set first result as main article
              if (summaries[0]) {
                setMainArticle(summaries[0]);
              }
            }
          }
        }
      } catch (err) {
        setError('Failed to fetch content. Please try again.');
        console.error(err);
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
          {articles.length > 1 && (
            <div>
              <h3 style={{ marginTop: '32px', marginBottom: '16px' }}>
                Related Articles
              </h3>
              <div style={{ display: 'grid', gap: '16px' }}>
                {articles.slice(1).map((article, index) => (
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
