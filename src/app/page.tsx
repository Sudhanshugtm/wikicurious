'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [started, setStarted] = useState(false);

  if (!started) {
    return (
      <div className="story-container">
        <header className="header-minimal">
          <Link href="/saved">saved</Link>
        </header>

        <div className="opening-scene">
          <h1 className="opening-title">TURKEY</h1>
          <p className="opening-subtitle">A journey through time, across two continents</p>
          <button className="journey-button" onClick={() => setStarted(true)}>
            Begin the journey →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="story-container">
      <header className="header-minimal">
        <Link href="/">home</Link>
      </header>

      <div style={{ flex: 1, padding: '60px 20px' }}>
        <h2 className="scene-header">Where would you like to begin?</h2>
        <p className="scene-subtitle">Choose your path through Turkey's story</p>

        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <Link href="/journey/istanbul" style={{ textDecoration: 'none' }}>
            <div className="place-card">
              <span className="place-emoji">🕌</span>
              <h3 className="place-name">Istanbul</h3>
              <p className="place-invitation">The city that straddles two worlds</p>
            </div>
          </Link>

          <Link href="/journey/history" style={{ textDecoration: 'none' }}>
            <div className="place-card">
              <span className="place-emoji">📜</span>
              <h3 className="place-name">Through Time</h3>
              <p className="place-invitation">From Byzantium to the Republic</p>
            </div>
          </Link>

          <Link href="/journey/destinations" style={{ textDecoration: 'none' }}>
            <div className="place-card">
              <span className="place-emoji">🗺️</span>
              <h3 className="place-name">The Land</h3>
              <p className="place-invitation">Mountains, coasts, and fairy chimneys</p>
            </div>
          </Link>

          <Link href="/journey/culture" style={{ textDecoration: 'none' }}>
            <div className="place-card">
              <span className="place-emoji">☕</span>
              <h3 className="place-name">The People</h3>
              <p className="place-invitation">Tea, hospitality, and traditions</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
