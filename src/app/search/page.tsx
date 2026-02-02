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
        const summaryResponse = await fetch(
          `/api/wikipedia?action=summary&title=${encodeURIComponent(query)}`
        );

        if (summaryResponse.ok) {
          const mainData = await summaryResponse.json();
          if (mainData.title) {
            setMainArticle(mainData);
          }
        }

        const relatedResponse = await fetch(
          `/api/wikipedia?action=related&title=${encodeURIComponent(query)}`
        );

        if (relatedResponse.ok) {
          const relatedData = await relatedResponse.json();
          if (relatedData.pages) {
            setArticles(relatedData.pages);
          }
        }

        if (!mainArticle && (!articles || articles.length === 0)) {
          const searchResponse = await fetch(
            `/api/wikipedia?action=search&q=${encodeURIComponent(query)}`
          );

          if (searchResponse.ok) {
            const searchData = await searchResponse.json();
            if (searchData.query?.search?.length > 0) {
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
        <nav className="journey-nav">
          <Link href="/" className="journey-nav-brand">WikiCurious</Link>
          <div className="journey-nav-links">
            <Link href="/">Journey</Link>
            <Link href="/saved">Saved</Link>
          </div>
        </nav>
        <div className="wiki-loading">
          <div className="loading-story">Searching Wikipedia...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen">
        <nav className="journey-nav">
          <Link href="/" className="journey-nav-brand">WikiCurious</Link>
          <div className="journey-nav-links">
            <Link href="/">Journey</Link>
            <Link href="/saved">Saved</Link>
          </div>
        </nav>
        <div className="content-wrapper">
          <div className="wiki-error">
            <div className="wiki-error-title">Error</div>
            <div className="typ-body">{error}</div>
            <Link href="/" className="back-link" style={{ marginTop: '16px' }}>Return home</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!mainArticle && (!articles || articles.length === 0)) {
    return (
      <div className="min-h-screen">
        <nav className="journey-nav">
          <Link href="/" className="journey-nav-brand">WikiCurious</Link>
          <div className="journey-nav-links">
            <Link href="/">Journey</Link>
            <Link href="/saved">Saved</Link>
          </div>
        </nav>
        <div className="content-wrapper">
          <div className="wiki-article" style={{ textAlign: 'center', padding: '48px 32px' }}>
            <h2 className="typ-h2" style={{ marginBottom: '16px' }}>No Results Found</h2>
            <p className="typ-italic" style={{ color: 'var(--cumin)' }}>
              We couldn&apos;t find any Wikipedia articles for &quot;{query}&quot;.
            </p>
            <Link href="/" className="back-link" style={{ marginTop: '24px' }}>Return home</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <nav className="journey-nav">
        <Link href="/" className="journey-nav-brand">WikiCurious</Link>
        <div className="journey-nav-links">
          <Link href="/">Journey</Link>
          <Link href="/saved">Saved</Link>
        </div>
      </nav>

      <div className="content-wrapper">
        <Link href="/" className="cdx-button" style={{ marginBottom: '24px' }}>← Back</Link>

        <h2 className="typ-h1" style={{ marginBottom: '32px' }}>
          &quot;{query}&quot;
        </h2>

        {mainArticle && (
          <article className="wiki-article">
            <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', flexDirection: 'column' }}>
              {mainArticle.thumbnail && (
                <img
                  src={mainArticle.thumbnail.source}
                  alt={mainArticle.title}
                  style={{ maxWidth: '260px', float: 'none', margin: '0 auto 16px', borderRadius: '8px', boxShadow: '0 2px 8px var(--wc-shadow)' }}
                />
              )}
              <div>
                <h1 className="typ-h1">{mainArticle.title}</h1>
                {mainArticle.description && (
                  <p className="typ-italic" style={{ color: 'var(--wc-secondary)', marginBottom: '16px' }}>
                    {mainArticle.description}
                  </p>
                )}
                <p className="typ-body">{mainArticle.extract}</p>
                <a
                  href={mainArticle.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(mainArticle.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cdx-link"
                  style={{ fontStyle: 'italic', fontFamily: 'var(--font-body)' }}
                >
                  Read full article on Wikipedia →
                </a>
              </div>
            </div>
          </article>
        )}

        {articles && articles.length > 1 && (
          <div style={{ marginTop: '40px' }}>
            <h3 className="section-header">Related</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {articles.map((article, index) => (
                article && article.title !== mainArticle?.title && (
                  <Link
                    key={index}
                    href={`/article/${encodeURIComponent(article.title)}`}
                    style={{
                      display: 'flex',
                      gap: '16px',
                      padding: '20px 24px',
                      background: 'var(--wc-paper)',
                      border: '1px solid var(--wc-border)',
                      textDecoration: 'none',
                      color: 'var(--wc-ink)',
                      boxShadow: '0 1px 3px var(--wc-shadow)',
                      borderRadius: '8px',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {article.thumbnail && (
                      <img
                        src={article.thumbnail.source}
                        alt={article.title}
                        style={{ width: '80px', height: '80px', objectFit: 'cover', border: '1px solid var(--wc-border)', padding: '3px', borderRadius: '4px' }}
                      />
                    )}
                    <div>
                      <h4 className="typ-h4" style={{ margin: '0 0 8px 0', color: 'var(--wc-primary)', fontWeight: '500' }}>
                        {article.title}
                      </h4>
                      <p className="typ-body-sm" style={{ fontStyle: 'italic', color: 'var(--wc-secondary)', margin: 0 }}>
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
