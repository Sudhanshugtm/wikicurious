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
    { name: 'Istanbul', emoji: '🕌' },
    { name: 'Cappadocia', emoji: '🎈' },
    { name: 'Ephesus', emoji: '🏛️' },
    { name: 'Pamukkale', emoji: '🏊' },
    { name: 'Ankara', emoji: '🏛️' },
    { name: 'Antalya', emoji: '🏖️' },
    { name: 'Bodrum', emoji: '⚓' },
    { name: 'Konya', emoji: '💫' },
  ];

  const turkeyTopics = [
    { name: 'Ottoman Empire', emoji: '👑' },
    { name: 'Turkish Cuisine', emoji: '🥙' },
    { name: 'Turkish Tea', emoji: '☕' },
    { name: 'Hagia Sophia', emoji: '⛪' },
    { name: 'Turkish Coffee', emoji: '☕' },
    { name: 'Turkish Bath', emoji: '🛁' },
    { name: 'Bosphorus', emoji: '🌊' },
    { name: 'Grand Bazaar', emoji: '🛍️' },
  ];

  return (
    <div className="min-h-screen">
      {/* Simple Header */}
      <header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none', color: 'var(--wc-ink)' }}>
            <span style={{ fontSize: '1.8em' }}>🇹🇷</span>
            <span style={{ fontSize: '1.3em', fontFamily: "'Georgia', 'Times New Roman', serif" }}>TurkeyCurious</span>
          </Link>
          <Link href="/saved" style={{ textDecoration: 'none', color: 'var(--wc-secondary)', fontSize: '0.95em', fontFamily: "'Georgia', 'Times New Roman', serif" }}>Saved</Link>
        </div>
      </header>

      {/* Hero Section - Letterhead style */}
      <section className="hero-section">
        <h2>Discover Turkey Through Wikipedia</h2>
        <p>Explore history, culture, and hidden gems</p>

        <form onSubmit={handleSearch} className="search-box">
          <input
            type="search"
            placeholder="Search anything about Turkey..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit">🔍</button>
        </form>
      </section>

      {/* Content */}
      <div className="content-wrapper">
        {/* Turkish Destinations */}
        <section style={{ marginBottom: '40px' }}>
          <h3 className="section-header">Destinations</h3>
          <div>
            {turkeyDestinations.map((dest) => (
              <Link
                key={dest.name}
                href={`/search?q=${encodeURIComponent(dest.name)}`}
                className="paper-card"
              >
                <span>{dest.emoji}</span>
                <span>{dest.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Turkish Topics */}
        <section>
          <h3 className="section-header">Culture & History</h3>
          <div>
            {turkeyTopics.map((topic) => (
              <Link
                key={topic.name}
                href={`/search?q=${encodeURIComponent(topic.name)}`}
                className="paper-card"
              >
                <span>{topic.emoji}</span>
                <span>{topic.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
