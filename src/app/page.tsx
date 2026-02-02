'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const popularDestinations = [
    { name: 'Istanbul', country: 'Turkey', emoji: '🕌' },
    { name: 'Paris', country: 'France', emoji: '🗼' },
    { name: 'Tokyo', country: 'Japan', emoji: '🗾' },
    { name: 'Rome', country: 'Italy', emoji: '🏛️' },
    { name: 'New York City', country: 'USA', emoji: '🗽' },
    { name: 'Cairo', country: 'Egypt', emoji: '🏺' },
  ];

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
              <Link href="/about" className="text-decoration-none cdx-link">About</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="wiki-content">
        <section className="text-center" style={{ padding: '48px 0' }}>
          <h2 className="text-3xl" style={{ fontFamily: "'Linux Libertine', 'Georgia', 'Times', serif", marginBottom: '16px' }}>
            Explore Wikipedia, Curated for Travelers
          </h2>
          <p className="text-lg" style={{ color: 'var(--wc-secondary)', maxWidth: '600px', margin: '0 auto 32px' }}>
            Discover fascinating history, culture, and hidden gems about your next destination
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-xl mx-auto" style={{ marginBottom: '48px' }}>
            <div className="cdx-text-input cdx-text-input--has-start-icon">
              <input
                type="search"
                className="cdx-text-input__input"
                placeholder="Search for a city, country, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', padding: '12px 16px', fontSize: '16px' }}
              />
              <span className="cdx-text-input__icon cdx-text-input__start-icon">🔍</span>
            </div>
            <button
              type="submit"
              className="cdx-button cdx-button--action-primary cdx-button--weight-primary"
              style={{ marginTop: '12px', padding: '12px 24px', fontSize: '16px' }}
            >
              Explore
            </button>
          </form>

          {/* Popular Destinations */}
          <div style={{ marginBottom: '32px' }}>
            <h3 className="text-xl" style={{ marginBottom: '16px', color: 'var(--wc-secondary)' }}>
              Popular Destinations
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {popularDestinations.map((dest) => (
                <Link
                  key={dest.name}
                  href={`/search?q=${encodeURIComponent(dest.name)}`}
                  className="cdx-card cdx-card--title-only"
                  style={{
                    textDecoration: 'none',
                    display: 'inline-block',
                    padding: '12px 20px',
                    border: '1px solid var(--wc-border)',
                    borderRadius: '2px',
                    transition: 'box-shadow 0.1s ease',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)'}
                  onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
                >
                  <span className="text-2xl">{dest.emoji}</span>
                  <span style={{ marginLeft: '8px', fontWeight: '500', color: 'var(--wc-text)' }}>{dest.name}</span>
                  <span style={{ marginLeft: '4px', color: 'var(--wc-secondary)', fontSize: '0.9em' }}>({dest.country})</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Feature Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', marginTop: '48px' }}>
            <div className="cdx-card">
              <div className="cdx-card__text">
                <h4 className="cdx-card__title">📜 Rich History</h4>
                <p className="cdx-card__text">Dive deep into historical events, empires, and stories that shaped your destination.</p>
              </div>
            </div>
            <div className="cdx-card">
              <div className="cdx-card__text">
                <h4 className="cdx-card__title">🏛️ Landmarks & Culture</h4>
                <p className="cdx-card__text">Discover iconic landmarks, local traditions, and cultural insights.</p>
              </div>
            </div>
            <div className="cdx-card">
              <div className="cdx-card__text">
                <h4 className="cdx-card__title">💡 Curated Facts</h4>
                <p className="cdx-card__text">Get bite-sized interesting facts that make your travels more meaningful.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="wiki-content" style={{ padding: '32px 0', borderTop: '1px solid var(--wc-border)', marginTop: '48px' }}>
        <p style={{ textAlign: 'center', color: 'var(--wc-secondary)', fontSize: '0.9em' }}>
          WikiCurious • Powered by <a href="https://en.wikipedia.org" className="cdx-link" target="_blank" rel="noopener noreferrer">Wikipedia</a> • Built with <a href="https://doc.wikimedia.org/codex/" className="cdx-link" target="_blank" rel="noopener noreferrer">Wikimedia Codex</a>
        </p>
      </footer>
    </div>
  );
}
