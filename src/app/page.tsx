'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useWikiSummaries } from './hooks/useWikiData';

const CARD_TOPICS = [
  { key: 'Istanbul', href: '/journey/istanbul', name: 'Istanbul', desc: 'The city that straddles two worlds' },
  { key: 'Ottoman Empire', href: '/journey/history', name: 'Through Time', desc: 'From Byzantium to the Republic' },
  { key: 'Cappadocia', href: '/journey/destinations', name: 'The Land', desc: 'Mountains, coasts, and fairy chimneys' },
  { key: 'Turkish tea', href: '/journey/culture', name: 'The People', desc: 'Tea, hospitality, and traditions' },
];

export default function Home() {
  const [started, setStarted] = useState(false);
  const pathname = usePathname();
  const { data: wikiData, loading: imagesLoading } = useWikiSummaries(
    CARD_TOPICS.map(c => c.key)
  );

  if (!started) {
    return (
      <div className="story-container">
        <nav className="journey-nav">
          <Link href="/" className="journey-nav-brand">WikiCurious</Link>
          <div className="journey-nav-links">
            <Link href="/saved" className={pathname === '/saved' ? 'active' : ''}>Saved</Link>
          </div>
        </nav>

        <div className="opening-scene">
          <h1 className="opening-title">TURKEY</h1>
          <p className="opening-subtitle">A journey through time, across two continents</p>
          <button className="journey-button" onClick={() => setStarted(true)}>
            Begin the journey
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="story-container">
      <nav className="journey-nav">
        <Link href="/" className="journey-nav-brand">WikiCurious</Link>
        <div className="journey-nav-links">
          <Link href="/saved" className={pathname === '/saved' ? 'active' : ''}>Saved</Link>
        </div>
      </nav>

      <div className="page-body">
        <h2 className="scene-header">Where would you like to begin?</h2>
        <p className="scene-subtitle">Choose your path through Turkey&apos;s story</p>

        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          {CARD_TOPICS.map((card, i) => {
            const wiki = wikiData[card.key];
            const thumbUrl = wiki?.thumbnail?.source;

            return (
              <Link key={card.key} href={card.href} className="image-card" style={{ animationDelay: `${i * 100}ms` }}>
                <div style={{ overflow: 'hidden' }}>
                  {thumbUrl ? (
                    <img
                      src={thumbUrl}
                      alt={`${card.name} - from Wikipedia`}
                      className="image-card-img"
                    />
                  ) : (
                    <div className="image-card-placeholder">
                      {imagesLoading ? '...' : ''}
                    </div>
                  )}
                </div>
                <div className="image-card-body">
                  <h3 className="image-card-name">{card.name}</h3>
                  <p className="image-card-desc">{card.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="curiosity-box" style={{ maxWidth: '680px', margin: 'var(--space-2xl) auto 0' }}>
          <div className="curiosity-title">Did you know?</div>
          <p className="curiosity-fact">
            Istanbul is the only city in the world that spans two continents &mdash; Europe and Asia, divided by the Bosphorus strait.
          </p>
          <p className="curiosity-fact">
            Turkey consumes more tea per capita than any other country &mdash; roughly 3.5 kg per person per year, far surpassing even the British.
          </p>
          <p className="curiosity-fact">
            The Grand Bazaar in Istanbul, built in 1461, is one of the oldest and largest covered markets in the world with over 4,000 shops.
          </p>
        </div>
      </div>
    </div>
  );
}
