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
        <header>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--wc-ink)' }}>
            <span style={{ fontSize: '1.5em' }}>🇹🇷</span>
            <span style={{ fontSize: '1.2em', fontFamily: "'Georgia', 'Times New Roman', serif" }}>TurkeyCurious</span>
          </Link>
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
        <header>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--wc-ink)' }}>
            <span style={{ fontSize: '1.5em' }}>🇹🇷</span>
            <span style={{ fontSize: '1.2em', fontFamily: "'Georgia', 'Times New Roman', serif" }}>TurkeyCurious</span>
          </Link>
        </header>
        <div className="content-wrapper">
          <div className="wiki-error">
            <div className="wiki-error-title">Error</div>
            <div>{error}</div>
            <Link href="/" className="cdx-button" style={{ marginTop: '16px' }}>← Back</Link>
          </div>
        </div>
      </div>
    );
  }

  if (!mainArticle && (!articles || articles.length === 0)) {
    return (
      <div className="min-h-screen">
        <header>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--wc-ink)' }}>
            <span style={{ fontSize: '1.5em' }}>🇹🇷</span>
            <span style={{ fontSize: '1.2em', fontFamily: "'Georgia', 'Times New Roman', serif" }}>TurkeyCurious</span>
          </Link>
        </header>
        <div className="content-wrapper">
          <div className="wiki-article" style={{ textAlign: 'center', padding: '48px 32px' }}>
            <div style={{ fontSize: '3em', marginBottom: '16px' }}>📜</div>
            <h2 style={{ marginBottom: '16px' }}>No Results Found</h2>
            <p style={{ fontStyle: 'italic', color: 'var(--wc-secondary)' }}>
              We couldn&apos;t find any Wikipedia articles for &quot;{query}&quot;.
            </p>
            <Link href="/" className="cdx-button" style={{ marginTop: '24px' }}>← Back</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--wc-ink)' }}>
          <span style={{ fontSize: '1.5em' }}>🇹🇷</span>
          <span style={{ fontSize: '1.2em', fontFamily: "'Georgia', 'Times New Roman', serif" }}>TurkeyCurious</span>
        </Link>
      </header>

      <div className="content-wrapper">
        <Link href="/" className="cdx-button" style={{ marginBottom: '24px' }}>← Back</Link>

        <h2 style={{ fontSize: '2em', marginBottom: '32px', fontFamily: "'Georgia', 'Times New Roman', serif", fontWeight: 'normal', color: 'var(--wc-primary)' }}>
          &quot;{query}&quot;
        </h2>

        {mainArticle && (
          <article className="wiki-article">
            <div style={{ display: 'flex', gap: '24px', marginBottom: '24px', flexDirection: 'column' }}>
              {mainArticle.thumbnail && (
                <img
                  src={mainArticle.thumbnail.source}
                  alt={mainArticle.title}
                  style={{ maxWidth: '260px', float: 'none', margin: '0 auto 16px' }}
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
                  style={{ fontStyle: 'italic' }}
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
                    }}
                  >
                    {article.thumbnail && (
                      <img
                        src={article.thumbnail.source}
                        alt={article.title}
                        style={{ width: '80px', height: '80px', objectFit: 'cover', border: '1px solid var(--wc-border)', padding: '3px' }}
                      />
                    )}
                    <div>
                      <h4 style={{ margin: '0 0 8px 0', color: 'var(--wc-primary)', fontSize: '1.2em', fontFamily: "'Georgia', 'Times New Roman', serif", fontWeight: 'normal' }}>
                        {article.title}
                      </h4>
                      <p style={{ color: 'var(--wc-secondary)', fontSize: '0.95em', fontStyle: 'italic', margin: 0 }}>
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
