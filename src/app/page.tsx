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
      {/* Simple Header - Just logo and saved link */}
      <header style={{ padding: '20px 20px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '960px', margin: '0 auto' }}>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <span style={{ fontSize: '2em' }}>🇹🇷</span>
            <span style={{ fontSize: '1.4em', fontWeight: 'bold', color: 'var(--wc-primary)' }}>TurkeyCurious</span>
          </Link>
          <Link href="/saved" style={{ color: 'var(--wc-secondary)', textDecoration: 'none', fontSize: '0.95em' }}>Saved</Link>
        </div>
      </header>

      {/* Hero Section - Simplified */}
      <section className="hero-section" style={{ borderRadius: '0 0 16px 16px', margin: '20px auto 40px', maxWidth: '960px' }}>
        <h2 style={{ fontSize: '2em', margin: '0 0 12px 0' }}>Discover Turkey Through Wikipedia</h2>
        <p style={{ margin: '0 0 24px', opacity: 0.95 }}>Explore rich history, culture, and hidden gems</p>

        {/* Search Form */}
        <form onSubmit={handleSearch} className="search-box">
          <input
            type="search"
            placeholder="Search anything about Turkey..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            🔍
          </button>
        </form>
      </section>

      {/* Content */}
      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 20px 60px' }}>
        {/* Turkish Destinations */}
        <section style={{ marginBottom: '48px' }}>
          <h3 style={{ fontSize: '1.3em', marginBottom: '20px', color: 'var(--wc-primary)' }}>🏛️ Destinations</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {turkeyDestinations.map((dest) => (
              <Link
                key={dest.name}
                href={`/search?q=${encodeURIComponent(dest.name)}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  background: 'white',
                  border: '1px solid var(--wc-border)',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: 'var(--wc-text)',
                  transition: 'all 0.2s',
                }}
                title={dest.description}
              >
                <span>{dest.emoji}</span>
                <span>{dest.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Turkish Topics */}
        <section style={{ marginBottom: '48px' }}>
          <h3 style={{ fontSize: '1.3em', marginBottom: '20px', color: 'var(--wc-primary)' }}>📚 Culture & History</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {turkeyTopics.map((topic) => (
              <Link
                key={topic.name}
                href={`/search?q=${encodeURIComponent(topic.name)}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  background: 'white',
                  border: '1px solid var(--wc-border)',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  color: 'var(--wc-text)',
                  transition: 'all 0.2s',
                }}
                title={topic.description}
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
