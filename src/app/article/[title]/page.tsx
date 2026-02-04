'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import NavInfoJournal from '@/app/components/NavInfoJournal';

interface WikiArticle {
  title: string;
  extract: string;
  thumbnail?: { source: string };
  description?: string;
  content_urls?: { desktop: { page: string } };
}

function ArticleContent() {
  const params = useParams();
  const title = decodeURIComponent(params.title as string);
  const [article, setArticle] = useState<WikiArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);

      try {
        const summaryRes = await fetch(
          `/api/wikipedia?action=summary&title=${encodeURIComponent(title)}`
        );

        if (summaryRes.ok) {
          const summaryData = await summaryRes.json();
          setArticle(summaryData);
        } else {
          setError('Article not found');
        }

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

  // Scroll progress and back to top button
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setScrollProgress(Math.min(progress, 100));
      setShowBackToTop(scrollTop > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [article]);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <nav className="journey-nav">
          <Link href="/" className="journey-nav-brand">WikiCurious</Link>
          <div className="journey-nav-links">
            <NavInfoJournal />
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
            <NavInfoJournal />
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

  // Split extract into paragraphs for immersive reading
  const paragraphs = article.extract.split('\n\n').filter(p => p.trim());
  const pullQuoteIndex = paragraphs.length > 3 ? 1 : 0;

  return (
    <>
      {/* Reading progress bar */}
      <div className="reading-progress" style={{ width: `${scrollProgress}%` }} />

      {/* Back to top button */}
      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑
      </button>

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
              }}
            >
              {saved ? '★ Saved' : '☆ Save'}
            </button>
            <NavInfoJournal />
          </div>
        </nav>

        {/* Immersive article experience */}
        <article className="immersive-article">
          {/* Hero Section */}
          <header className="article-hero fade-in-scroll">
            <h1 className="article-hero-title">{article.title}</h1>

            {article.description && (
              <p className="article-hero-subtitle">{article.description}</p>
            )}

            <div className="article-hero-meta">
              <div className="article-hero-meta-item">
                <span>📖</span>
                <span>From Wikipedia</span>
              </div>
              <div className="article-hero-meta-item">
                <span>⏱️</span>
                <span>{Math.ceil(article.extract.length / 1000)} min read</span>
              </div>
            </div>
          </header>

          {/* Main content */}
          <main style={{ padding: '0 var(--space-xl)' }}>
            {/* Immersive image */}
            {article.thumbnail && (
              <figure className="immersive-image fade-in-scroll">
                <img
                  src={article.thumbnail.source}
                  alt={`${article.title} - from Wikipedia`}
                />
                <figcaption className="immersive-image-caption">
                  <a
                    href={article.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Image from Wikipedia
                  </a>
                </figcaption>
              </figure>
            )}

            {/* Immersive text paragraphs */}
            <div style={{ margin: 'var(--space-3xl) auto' }}>
              {paragraphs.map((paragraph, idx) => (
                <div key={idx}>
                  {idx === pullQuoteIndex && paragraphs.length > 2 && (
                    <blockquote className="pull-quote fade-in-scroll">
                      {paragraph.length > 150 ? paragraph.slice(0, 150) + '...' : paragraph}
                      {paragraph.length > 150 && <cite className="pull-quote-citation">— {article.title}</cite>}
                    </blockquote>
                  )}

                  {idx !== pullQuoteIndex && (
                    <p className="immersive-text fade-in-scroll">
                      {paragraph}
                    </p>
                  )}
                </div>
              ))}

              {/* Section divider */}
              {paragraphs.length > 3 && <div className="section-divider" />}
            </div>

            {/* Call to action */}
            <div className="article-footer fade-in-scroll">
              <p className="typ-body" style={{ marginBottom: 'var(--space-lg)', color: 'var(--ottoman-purple)' }}>
                This article is a summary from Wikipedia. For the complete article with citations, references, and more details, visit the source.
              </p>

              <div className="article-footer-actions">
                <a
                  href={article.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="journey-button"
                  style={{
                    display: 'inline-block',
                    opacity: 1,
                    animation: 'none',
                  }}
                >
                  Read full article on Wikipedia
                </a>

                <button
                  onClick={handleSave}
                  className="back-link"
                  style={{
                    margin: 0,
                    padding: '12px 24px',
                  }}
                >
                  {saved ? '★ Saved' : '☆ Save for later'}
                </button>
              </div>

              <div style={{ marginTop: 'var(--space-xl)' }}>
                <Link href="/" className="back-link" style={{ margin: 0 }}>
                  ← Return to journey
                </Link>
              </div>
            </div>

            {/* Attribution */}
            <footer style={{
              padding: 'var(--space-2xl) 0',
              textAlign: 'center',
              fontSize: 'var(--font-sm)',
              color: 'var(--cumin)',
              borderTop: '1px solid var(--ui-border)',
              marginTop: 'var(--space-2xl)',
            }}>
              <p style={{ marginBottom: 'var(--space-sm)' }}>
                Content from <a
                  href={article.content_urls?.desktop?.page || `https://en.wikipedia.org/wiki/${encodeURIComponent(article.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--iznik-cobalt)' }}
                >
                  "{article.title}"
                </a> — <a
                  href="https://creativecommons.org/licenses/by-sa/3.0/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--iznik-cobalt)' }}
                >
                  CC BY-SA 3.0
                </a>
              </p>
              <p style={{ margin: 0 }}>
                Wikipedia® is a registered trademark of Wikimedia Foundation, Inc.
              </p>
            </footer>
          </main>
        </article>
      </div>
    </>
  );
}

export default function ArticlePage() {
  return (
    <Suspense fallback={<div className="wiki-loading"><div className="loading-story">Loading...</div></div>}>
      <ArticleContent />
    </Suspense>
  );
}
