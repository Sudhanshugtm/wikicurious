'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import NavInfoJournal from '@/app/components/NavInfoJournal';
import { usePathname } from 'next/navigation';
import { useWikiSummaries, type WikiSummary } from '../../hooks/useWikiData';

interface WikiArticle {
  title: string;
  extract: string;
  thumbnail?: { source: string };
  description?: string;
  content_urls?: { desktop: { page: string } };
}

const EXPLORE_TOPICS = [
  'Hagia Sophia',
  'Grand Bazaar, Istanbul',
  'Topkapi Palace',
  'Blue Mosque',
  'Bosphorus',
  'Galata Tower',
  'Basilica Cistern',
  'Dolmabahce Palace',
  'Spice Bazaar',
];

export default function IstanbulJourney() {
  const [article, setArticle] = useState<WikiArticle | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const { data: exploreData } = useWikiSummaries(EXPLORE_TOPICS);

  useEffect(() => {
    const fetchIstanbul = async () => {
      try {
        const res = await fetch('/api/wikipedia?action=summary&title=Istanbul');
        if (res.ok) {
          const data = await res.json();
          setArticle(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchIstanbul();
  }, []);

  if (loading) {
    return (
      <div className="story-container">
        <div className="loading-story">Walking through the streets of Istanbul...</div>
      </div>
    );
  }

  return (
    <div className="story-container">
      <nav className="journey-nav">
        <Link href="/" className="journey-nav-brand">WikiCurious</Link>
        <div className="journey-nav-links">
          <Link href="/saved" className={pathname === '/saved' ? 'active' : ''}>Saved</Link>
          <NavInfoJournal />
        </div>
      </nav>

      <div className="page-body">
        <div className="story-section">
          <Link href="/" className="back-link">Return to journey</Link>

          <h1 className="typ-h1" style={{ textAlign: 'left' }}>
            Istanbul
          </h1>
          <p className="typ-subtitle" style={{ textAlign: 'left' }}>
            Where continents meet and civilizations merge
          </p>

          {article && (
            <>
              {article.thumbnail && (
                <div className="hero-image-section">
                  <img
                    src={article.thumbnail.source}
                    alt="Istanbul skyline - from Wikipedia"
                  />
                  <div className="hero-image-caption">
                    Istanbul &mdash; image from <a href={article.content_urls?.desktop?.page || 'https://en.wikipedia.org/wiki/Istanbul'} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                  </div>
                </div>
              )}

              <p className="story-paragraph typ-dropcap">
                You stand at the edge of the Golden Horn. The air carries the scent of sea salt, roasted chestnuts, and coffee. Before you, the Bosphorus Strait divides two continents &mdash; Europe to your left, Asia to your right. Ferries crisscross the dark blue water like stitching on a great coat.
              </p>

              <p className="story-paragraph">
                {article.extract}
              </p>

              {article.description && (
                <div className="wiki-infobox" style={{ margin: '24px 0' }}>
                  <p className="typ-italic">{article.description}</p>
                </div>
              )}

              <p className="story-paragraph">
                Above the city, six minarets pierce the sky. The Hagia Sophia &mdash; built as a cathedral in 537 AD, converted to a mosque after the Ottoman conquest in 1453, secularized as a museum in 1934, and reconverted to a mosque in 2020 &mdash; has watched over this place for fifteen centuries. Through its walls, you can feel the pulse of empires: Byzantine mosaics beneath Ottoman calligraphy.
              </p>

              {exploreData['Bosphorus']?.thumbnail && (
                <figure style={{ margin: '0 0 var(--space-xl) 0' }}>
                  <img
                    src={exploreData['Bosphorus'].thumbnail!.source}
                    alt="The Bosphorus - from Wikipedia"
                    className="story-image story-image-wide"
                  />
                  <figcaption className="story-image-caption">
                    The Bosphorus strait &mdash; from <a href={exploreData['Bosphorus'].content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                  </figcaption>
                </figure>
              )}

              <p className="story-paragraph">
                Cross the Galata Bridge at dusk and you&apos;ll see fishermen casting lines into the Golden Horn while the call to prayer echoes from hundreds of mosques. Below the bridge, restaurants serve fresh fish sandwiches from rocking boats. Above, the Galata Tower &mdash; built by Genoese traders in 1348 &mdash; offers views that stretch from the Sea of Marmara to the Black Sea.
              </p>

              <p className="story-paragraph">
                Wander into the Grand Bazaar and lose yourself among 4,000 shops spread across 61 covered streets. Carpets from every province, hand-painted ceramics echoing Iznik patterns, lanterns casting colored shadows on vaulted ceilings. Merchants offer tea. Haggling is an art form here, practiced with warmth and humor.
              </p>
            </>
          )}

          <div className="curiosity-box">
            <div className="curiosity-title">Did you know?</div>
            <p className="curiosity-fact">
              Constantinople was the largest and wealthiest city in Europe for nearly 1,000 years, from the 5th to the 15th century.
            </p>
            <p className="curiosity-fact">
              The Basilica Cistern, built in 532 AD, could hold 80,000 cubic meters of water. It features 336 marble columns, many recycled from ruined Roman temples.
            </p>
            <p className="curiosity-fact">
              Istanbul has been the capital of three successive empires: Roman, Byzantine, and Ottoman &mdash; a distinction held by no other city.
            </p>
            <p className="curiosity-fact">
              The name &ldquo;Istanbul&rdquo; likely derives from the Greek phrase &ldquo;eis tin polin&rdquo; meaning &ldquo;to the city&rdquo; &mdash; because for centuries, it was simply <em>the</em> city.
            </p>
          </div>

          <div className="explore-section">
            <h2 className="typ-h2 typ-center">
              Explore deeper
            </h2>
            <p className="typ-body typ-center" style={{ color: 'var(--cumin)', maxWidth: '500px', margin: '0 auto var(--space-lg)' }}>
              Each card links to a full Wikipedia article. Save what interests you for later.
            </p>

            <div className="explore-grid">
              {EXPLORE_TOPICS.map(topic => {
                const wiki = exploreData[topic];
                return (
                  <Link key={topic} href={`/article/${encodeURIComponent(topic)}`} className="explore-link">
                    {wiki?.thumbnail ? (
                      <img src={wiki.thumbnail.source} alt={`${topic} - from Wikipedia`} />
                    ) : (
                      <div style={{ width: 60, height: 60, borderRadius: 'var(--radius-md)', background: 'var(--gradient-paper)', flexShrink: 0 }} />
                    )}
                    <div className="explore-link-text">
                      <h4>{topic.replace(', Istanbul', '')}</h4>
                      <p>{wiki?.description || 'Read on Wikipedia'}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
