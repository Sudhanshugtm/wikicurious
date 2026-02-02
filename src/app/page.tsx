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

  const turkeyDestinations = [
    { name: 'Istanbul', description: 'The city straddling Europe and Asia', emoji: '🕌' },
    { name: 'Cappadocia', description: 'Fairy chimneys and hot air balloons', emoji: '🎈' },
    { name: 'Ephesus', description: 'Ancient Greek city ruins', emoji: '🏛️' },
    { name: 'Pamukkale', description: 'White travertine terraces', emoji: '🏊' },
    { name: 'Ankara', description: 'Capital city of Turkey', emoji: '🏛️' },
    { name: 'Antalya', description: 'Turquoise Coast beaches', emoji: '🏖️' },
    { name: 'Bodrum', description: 'Historic resort town', emoji: '⚓' },
    { name: 'Konya', description: 'City of whirling dervishes', emoji: '💫' },
  ];

  const turkeyTopics = [
    { name: 'Ottoman Empire', description: 'One of history\'s greatest empires', emoji: '👑' },
    { name: 'Turkish Cuisine', description: 'Delicious food culture', emoji: '🥙' },
    { name: 'Turkish Tea', description: 'Cultural symbol of hospitality', emoji: '☕' },
    { name: 'Hagia Sophia', description: 'Iconic Byzantine architecture', emoji: '⛪' },
    { name: 'Turkish Coffee', description: 'Traditional beverage culture', emoji: '☕' },
    { name: 'Turkish Bath', description: 'Traditional hammam experience', emoji: '🛁' },
    { name: 'Bosphorus', description: 'Iconic Istanbul strait', emoji: '🌊' },
    { name: 'Grand Bazaar', description: 'One of the oldest covered markets', emoji: '🛍️' },
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="wiki-header">
        <div className="wiki-content">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: '2.5em' }}>🇹🇷</span>
              <h1 className="m-0" style={{ fontSize: '1.8em', fontWeight: 'bold', color: 'var(--wc-primary)' }}>
                TurkeyCurious
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
        <h2>Discover Turkey Through Wikipedia</h2>
        <p>Explore the rich history, culture, and hidden gems of Turkey - from Istanbul to Cappadocia</p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="search-box">
          <input
            type="search"
            placeholder="Search anything about Turkey..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            🔍 Explore
          </button>
        </form>
      </section>

      <main className="wiki-content">
        {/* Popular Destinations in Turkey */}
        <section style={{ marginBottom: '48px' }}>
          <h3 className="section-title">🏛️ Explore Turkish Destinations</h3>
          <div className="flex flex-wrap justify-center" style={{ margin: '0 -8px' }}>
            {turkeyDestinations.map((dest) => (
              <Link
                key={dest.name}
                href={`/search?q=${encodeURIComponent(dest.name)}`}
                className="destination-card"
                title={dest.description}
              >
                <span className="emoji">{dest.emoji}</span>
                <span className="name">{dest.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Turkish Topics */}
        <section style={{ marginBottom: '48px' }}>
          <h3 className="section-title">📚 Turkish Culture & History</h3>
          <div className="flex flex-wrap justify-center" style={{ margin: '0 -8px' }}>
            {turkeyTopics.map((topic) => (
              <Link
                key={topic.name}
                href={`/search?q=${encodeURIComponent(topic.name)}`}
                className="destination-card"
                title={topic.description}
              >
                <span className="emoji">{topic.emoji}</span>
                <span className="name">{topic.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Feature Cards */}
        <section style={{ marginBottom: '48px' }}>
          <h3 className="section-title">🎯 Why Explore Turkey?</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            <div className="feature-card">
              <div className="icon">🏛️</div>
              <h4>Ancient History</h4>
              <p>From Byzantine to Ottoman empires, Turkey has been at the crossroads of civilizations for millennia.</p>
            </div>
            <div className="feature-card">
              <div className="icon">🌍</div>
              <h4>Two Continents</h4>
              <p>Istanbul bridges Europe and Asia, making it one of the world's most unique cities.</p>
            </div>
            <div className="feature-card">
              <div className="icon">🥙</div>
              <h4>Rich Cuisine</h4>
              <p>Discover delicious Turkish food, from kebabs to baklava, that spans centuries of culinary tradition.</p>
            </div>
            <div className="feature-card">
              <div className="icon">💫</div>
              <h4>Cultural Heritage</h4>
              <p>Experience the whirling dervishes, Turkish baths, tea culture, and timeless traditions.</p>
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
              <p style={{ color: 'var(--wc-secondary)', fontSize: '0.95em' }}>Enter any Turkish destination or topic</p>
            </div>
            <div>
              <div style={{ fontSize: '3em', marginBottom: '12px' }}>📚</div>
              <h4 style={{ margin: '0 0 8px 0' }}>Explore</h4>
              <p style={{ color: 'var(--wc-secondary)', fontSize: '0.95em' }}>Browse Wikipedia articles and facts</p>
            </div>
            <div>
              <div style={{ fontSize: '3em', marginBottom: '12px' }}>⭐</div>
              <h4 style={{ margin: '0 0 8px 0' }}>Save</h4>
              <p style={{ color: 'var(--wc-secondary)', fontSize: '0.95em' }}>Save articles to read during your trip</p>
            </div>
            <div>
              <div style={{ fontSize: '3em', marginBottom: '12px' }}>📥</div>
              <h4 style={{ margin: '0 0 8px 0' }}>Export</h4>
              <p style={{ color: 'var(--wc-secondary)', fontSize: '0.95em' }}>Download as Markdown for offline use</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ textAlign: 'center', padding: '40px 20px', background: 'linear-gradient(135deg, #e8f4f8 0%, #d4eef7 100%)', borderRadius: '16px', marginBottom: '48px' }}>
          <h3 style={{ fontSize: '1.8em', marginBottom: '16px', color: 'var(--wc-primary)' }}>
            Ready to discover Turkey? 🇹🇷
          </h3>
          <p style={{ fontSize: '1.1em', color: 'var(--wc-secondary)', marginBottom: '24px', maxWidth: '600px', margin: '0 auto 24px' }}>
            Start exploring the fascinating history and culture of this beautiful country
          </p>
          <form onSubmit={handleSearch} className="search-box">
            <input
              type="search"
              placeholder="What are you curious about in Turkey?"
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
            🇹🇷 <strong>TurkeyCurious</strong> • Explore Turkey Through Wikipedia
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
