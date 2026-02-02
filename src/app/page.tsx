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
    { name: 'London', country: 'UK', emoji: '🎡' },
    { name: 'Barcelona', country: 'Spain', emoji: '🏰' },
  ];

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
              <Link href="/saved" className="cdx-link">Saved</Link>
              <Link href="/about" className="cdx-link">About</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <h2>Explore Wikipedia, Curated for Travelers</h2>
        <p>Discover fascinating history, culture, and hidden gems about your next destination</p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="search-box">
          <input
            type="search"
            placeholder="Search for a city, country, or topic..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            🔍 Explore
          </button>
        </form>
      </section>

      <main className="wiki-content">
        {/* Popular Destinations */}
        <section style={{ marginBottom: '48px' }}>
          <h3 className="section-title">✨ Popular Destinations</h3>
          <div className="flex flex-wrap justify-center" style={{ margin: '0 -8px' }}>
            {popularDestinations.map((dest) => (
              <Link
                key={dest.name}
                href={`/search?q=${encodeURIComponent(dest.name)}`}
                className="destination-card"
              >
                <span className="emoji">{dest.emoji}</span>
                <span className="name">{dest.name}</span>
                <span className="country">({dest.country})</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Feature Cards */}
        <section style={{ marginBottom: '48px' }}>
          <h3 className="section-title">🎯 Why WikiCurious?</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="feature-card">
              <div className="icon">📜</div>
              <h4>Rich History</h4>
              <p>Dive deep into historical events, empires, and stories that shaped your destination. Every place has a story to tell.</p>
            </div>
            <div className="feature-card">
              <div className="icon">🏛️</div>
              <h4>Landmarks & Culture</h4>
              <p>Discover iconic landmarks, local traditions, and cultural insights that make each destination unique and memorable.</p>
            </div>
            <div className="feature-card">
              <div className="icon">💡</div>
              <h4>Curated Facts</h4>
              <p>Get bite-sized interesting facts that make your travels more meaningful and give you conversation starters.</p>
            </div>
            <div className="feature-card">
              <div className="icon">⭐</div>
              <h4>Save & Export</h4>
              <p>Save interesting articles to read later and export them as Markdown for offline reading during your trip.</p>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="wiki-infobox" style={{ marginBottom: '48px' }}>
          <h3 style={{ color: 'var(--wc-primary)', marginBottom: '20px', fontSize: '1.5em' }}>
            🚀 How It Works
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '3em', marginBottom: '12px' }}>🔍</div>
              <h4 style={{ margin: '0 0 8px 0' }}>Search</h4>
              <p style={{ color: 'var(--wc-secondary)', fontSize: '0.95em' }}>Enter any city, country, or topic you're curious about</p>
            </div>
            <div>
              <div style={{ fontSize: '3em', marginBottom: '12px' }}>📚</div>
              <h4 style={{ margin: '0 0 8px 0' }}>Explore</h4>
              <p style={{ color: 'var(--wc-secondary)', fontSize: '0.95em' }}>Browse the main article and related content</p>
            </div>
            <div>
              <div style={{ fontSize: '3em', marginBottom: '12px' }}>⭐</div>
              <h4 style={{ margin: '0 0 8px 0' }}>Save</h4>
              <p style={{ color: 'var(--wc-secondary)', fontSize: '0.95em' }}>Save articles to read later (stored in your browser)</p>
            </div>
            <div>
              <div style={{ fontSize: '3em', marginBottom: '12px' }}>📥</div>
              <h4 style={{ margin: '0 0 8px 0' }}>Export</h4>
              <p style={{ color: 'var(--wc-secondary)', fontSize: '0.95em' }}>Download saved articles as Markdown for offline reading</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ textAlign: 'center', padding: '40px 20px', background: 'linear-gradient(135deg, #e8f4f8 0%, #d4eef7 100%)', borderRadius: '16px', marginBottom: '48px' }}>
          <h3 style={{ fontSize: '1.8em', marginBottom: '16px', color: 'var(--wc-primary)' }}>
            Ready to explore? 🌏
          </h3>
          <p style={{ fontSize: '1.1em', color: 'var(--wc-secondary)', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
            Start discovering fascinating stories about your next travel destination
          </p>
          <form onSubmit={handleSearch} className="search-box">
            <input
              type="search"
              placeholder="Where are you curious about?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="search-button">
              🚀 Start Exploring
            </button>
          </form>
        </section>
      </main>

      {/* Footer */}
      <footer className="wiki-footer">
        <div className="wiki-content">
          <p style={{ fontSize: '1.1em', marginBottom: '8px' }}>
            🌍 <strong>WikiCurious</strong> • Explore Wikipedia Like Never Before
          </p>
          <p style={{ opacity: 0.9, fontSize: '0.95em' }}>
            Powered by <a href="https://en.wikipedia.org" target="_blank" rel="noopener noreferrer">Wikipedia</a> • 
            Built with <a href="https://doc.wikimedia.org/codex/" target="_blank" rel="noopener noreferrer">Wikimedia Codex</a>
          </p>
          <p style={{ opacity: 0.7, fontSize: '0.85em', marginTop: '16px' }}>
            Made with ❤️ in Istanbul
          </p>
        </div>
      </footer>
    </div>
  );
}
