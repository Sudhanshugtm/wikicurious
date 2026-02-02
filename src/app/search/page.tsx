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
                <Link href="/saved" className="cdx-link">Saved</Link>
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

  if (error) {
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
                <Link href="/saved" className="cdx-link">Saved</Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="wiki-content" style={{ padding: '40px 20px' }}>
          <div className="wiki-error">
            <div className="wiki-error-title">Oops! Something went wrong</div>
            <div>{error}</div>
            <Link href="/" className="cdx-button cdx-button--action-secondary" style={{ marginTop: '16px', display: 'inline-block' }}>
              ← Back to home
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (!mainArticle && (!articles || articles.length === 0)) {
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
                <Link href="/saved" className="cdx-link">Saved</Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="wiki-content" style={{ padding: '40px 20px' }}>
          <div className="wiki-article" style={{ textAlign: 'center', padding: '48px' }}>
            <div style={{ fontSize: '4em', marginBottom: '16px' }}>🔍</div>
            <h2 style={{ color: 'var(--wc-primary)', marginBottom: '16px' }}>No Results Found</h2>
            <p style={{ fontSize: '1.1em', color: 'var(--wc-secondary)', marginBottom: '24px' }}>
              We couldn&apos;t find any Wikipedia articles for &quot;{query}&quot;.
            </p>
            <p style={{ color: 'var(--wc-secondary)', marginBottom: '32px' }}>
              Try searching for a different term or checking the spelling.
            </p>
            <Link href="/" className="cdx-button cdx-button--action-primary">
              ← Back to search
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
              <h1 className="m-0" style={{ fontSize: '1.8em', fontWeight: 'bold', color: 'var(--wc-primary)' }}>
                WikiCurious
              </h1>
            </Link>
            <nav className="flex gap-4" style={{ fontSize: '0.95em' }}>
              <Link href="/" className="cdx-link">Home</Link>
              <Link href="/saved" className="cdx-link">Saved</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="wiki-content" style={{ padding: '32px 20px' }}>
        {/* Search Bar */}
        <div style={{ marginBottom: '24px' }}>
          <Link
            href="/"
            className="cdx-button cdx-button--action-secondary"
          >
            ← Back to search
          </Link>
        </div>

        {/* Results Header */}
        <div style={{ marginBottom: '32px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2em', marginBottom: '8px', color: 'var(--wc-primary)' }}>
            Results for &quot;{query}&quot;
          </h2>
          <p style={{ color: 'var(--wc-secondary)' }}>
            {articles?.length || 0} related articles found
          </p>
        </div>

        {/* Main Article */}
        {mainArticle && (
          <article className="wiki-article fade-in">
            <div className="flex flex-col md:flex-row gap-6" style={{ marginBottom: '24px' }}>
              {mainArticle.thumbnail && (
                <img
                  src={mainArticle.thumbnail.source}
                  alt={mainArticle.title}
                  style={{ maxWidth: '320px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
              )}
              <div>
                <h1>{mainArticle.title}</h1>
                {mainArticle.description && (
                  <div className="wiki-infobox" style={{ marginBottom: '20px', padding: '16px', background: 'linear-gradient(135deg, #e8f4f8 0%, #d4eef7 100%)' }}>
                    <div style={{ fontWeight: '600', marginBottom: '4px' }}>📝 Description</div>
                    <div>{mainArticle.description}</div>
                  </div>
                )}
                <p style={{ fontSize: '1.05em', lineHeight: '1.8' }}>{mainArticle.extract}</p>
                <a
                  href={mainArticle.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(mainArticle.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cdx-button cdx-button--action-primary"
                  style={{ marginTop: '20px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  Read full article on Wikipedia <span>↗</span>
                </a>
              </div>
            </div>

            {/* Quick Facts Section */}
            <div className="wiki-fact-card">
              <div className="wiki-fact-label">💡 Did you know?</div>
              <div className="wiki-fact-value">
                {mainArticle.extract?.substring(0, 250)}...
              </div>
            </div>
          </article>
        )}

        {/* Related Articles */}
        {articles && articles.length > 1 && (
          <section style={{ marginTop: '48px' }}>
            <h3 style={{ fontSize: '1.5em', marginBottom: '24px', color: 'var(--wc-primary)', textAlign: 'center' }}>
              🔗 Related Articles
            </h3>
            <div style={{ display: 'grid', gap: '16px' }}>
              {articles.map((article, index) => (
                article && article.title !== mainArticle?.title && (
                  <Link
                    key={index}
                    href={`/article/${encodeURIComponent(article.title)}`}
                    className="wiki-card"
                    style={{ textDecoration: 'none', display: 'flex', gap: '16px' }}
                  >
                    {article.thumbnail && (
                      <img
                        src={article.thumbnail.source}
                        alt={article.title}
                        style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', flexShrink: 0 }}
                      />
                    )}
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 8px 0', color: 'var(--wc-primary)', fontSize: '1.2em' }}>
                        {article.title}
                      </h4>
                      {article.description && (
                        <p style={{ fontStyle: 'italic', color: 'var(--wc-secondary)', fontSize: '0.9em', marginBottom: '8px' }}>
                          {article.description}
                        </p>
                      )}
                      <p style={{ color: 'var(--wc-text)', fontSize: '0.95em', lineHeight: '1.6', margin: 0 }}>
                        {article.extract?.substring(0, 180)}...
                      </p>
                    </div>
                  </Link>
                )
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="wiki-loading"><div className="cdx-spinner"></div></div>}>
      <SearchContent />
    </Suspense>
  );
}
