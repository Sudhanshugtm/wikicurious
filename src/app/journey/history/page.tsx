'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWikiSummaries } from '../../hooks/useWikiData';

const ERA_IMAGES = {
  byzantine: ['Byzantine Empire', 'Hagia Sophia', 'Theodosian Walls'],
  ottoman: ['Ottoman Empire', 'Suleiman the Magnificent', 'Mimar Sinan'],
  republic: ['Mustafa Kemal Atatürk', 'Ankara', 'Grand National Assembly of Turkey'],
};

const ALL_TOPICS = [
  ...ERA_IMAGES.byzantine,
  ...ERA_IMAGES.ottoman,
  ...ERA_IMAGES.republic,
];

export default function HistoryJourney() {
  const [selectedEra, setSelectedEra] = useState<string | null>(null);
  const pathname = usePathname();
  const { data: wikiData } = useWikiSummaries(ALL_TOPICS);

  if (selectedEra) {
    return (
      <div className="story-container">
        <nav className="journey-nav">
          <Link href="/" className="journey-nav-brand">WikiCurious</Link>
          <div className="journey-nav-links">
            <Link href="/saved" className={pathname === '/saved' ? 'active' : ''}>Saved</Link>
            <Link href="/about" className={pathname === '/about' ? 'active' : ''}>
              <div className="nav-info-icon">ℹ</div>
            </Link>
          </div>
        </nav>

        <div className="page-body">
          <div className="story-section">
            <button onClick={() => setSelectedEra(null)} className="back-link">
              Back to timeline
            </button>

            {selectedEra === 'byzantine' && (
              <>
                <h1 className="typ-h1" style={{ textAlign: 'left' }}>
                  Byzantine Era
                </h1>
                <p className="typ-subtitle" style={{ textAlign: 'left' }}>
                  330&ndash;1453 AD &middot; Constantinople, the New Rome
                </p>

                {wikiData['Byzantine Empire']?.thumbnail && (
                  <div className="hero-image-section">
                    <img
                      src={wikiData['Byzantine Empire'].thumbnail!.source}
                      alt="Byzantine Empire - from Wikipedia"
                    />
                    <div className="hero-image-caption">
                      The Byzantine Empire &mdash; image from <a href={wikiData['Byzantine Empire'].content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                    </div>
                  </div>
                )}

                <p className="story-paragraph typ-dropcap">
                  In 330 AD, Emperor Constantine made a fateful decision. He moved the capital of Rome eastward, to a city called Byzantium. He renamed it Constantinople &mdash; the city of Constantine. For over a thousand years, this would be the beating heart of the Eastern Roman Empire.
                </p>

                <p className="story-paragraph">
                  Walk through these streets and you walk through time. The Theodosian Walls once protected millions within their embrace. The Great Palace echoed with the footsteps of emperors. And in the Hagia Sophia, under its magnificent dome, Byzantine priests chanted as the light filtered through gold mosaics of Christ and saints.
                </p>

                {wikiData['Hagia Sophia']?.thumbnail && (
                  <figure style={{ margin: '0 0 var(--space-xl) 0' }}>
                    <img
                      src={wikiData['Hagia Sophia'].thumbnail!.source}
                      alt="Hagia Sophia - from Wikipedia"
                      className="story-image"
                    />
                    <figcaption className="story-image-caption">
                      Hagia Sophia &mdash; from <a href={wikiData['Hagia Sophia'].content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                    </figcaption>
                  </figure>
                )}

                <p className="story-paragraph">
                  This was a civilization of art, law, and faith. Of silk from China and spices from India, traded in bustling markets. Of scholars preserving ancient Greek texts that would ignite the Renaissance centuries later.
                </p>

                <div className="curiosity-box">
                  <div className="curiosity-title">Did you know?</div>
                  <p className="curiosity-fact">
                    The Theodosian Walls protected Constantinople for over 1,000 years and were not breached until 1453 &mdash; making them one of the most effective fortifications in history.
                  </p>
                  <p className="curiosity-fact">
                    Byzantine &ldquo;Greek fire&rdquo; was a devastating incendiary weapon that could burn on water. Its exact formula remains unknown to this day.
                  </p>
                  <p className="curiosity-fact">
                    The Hagia Sophia&apos;s dome, 31 meters in diameter, was the largest in the world for nearly a thousand years after its construction in 537 AD.
                  </p>
                </div>

                <div className="explore-section">
                  <h3 className="typ-h3">Explore on Wikipedia</h3>
                  <div className="explore-grid">
                    {ERA_IMAGES.byzantine.map(topic => {
                      const wiki = wikiData[topic];
                      return (
                        <Link key={topic} href={`/article/${encodeURIComponent(topic)}`} className="explore-link">
                          {wiki?.thumbnail && <img src={wiki.thumbnail.source} alt={`${topic} - from Wikipedia`} />}
                          <div className="explore-link-text">
                            <h4>{topic}</h4>
                            <p>{wiki?.description || 'Read on Wikipedia'}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {selectedEra === 'ottoman' && (
              <>
                <h1 className="typ-h1" style={{ textAlign: 'left' }}>
                  Ottoman Empire
                </h1>
                <p className="typ-subtitle" style={{ textAlign: 'left' }}>
                  1299&ndash;1922 &middot; From a beylik to a world power
                </p>

                {wikiData['Ottoman Empire']?.thumbnail && (
                  <div className="hero-image-section">
                    <img
                      src={wikiData['Ottoman Empire'].thumbnail!.source}
                      alt="Ottoman Empire - from Wikipedia"
                    />
                    <div className="hero-image-caption">
                      The Ottoman Empire &mdash; image from <a href={wikiData['Ottoman Empire'].content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                    </div>
                  </div>
                )}

                <p className="story-paragraph typ-dropcap">
                  In the rugged hills of northwestern Anatolia, a small Turkish tribe led by Osman Bey began building something that would reshape the world. They were the Ottomans, and for six centuries, their empire would stretch from Budapest to Baghdad, from Crimea to Algeria.
                </p>

                <p className="story-paragraph">
                  In 1453, the young Sultan Mehmed II looked up at the impenetrable walls of Constantinople. For 1,100 years, no army had breached them. But with massive cannons and unwavering determination, his forces broke through. The city fell. Constantinople became Istanbul. The Byzantine Empire ended.
                </p>

                {wikiData['Suleiman the Magnificent']?.thumbnail && (
                  <figure style={{ margin: '0 0 var(--space-xl) 0' }}>
                    <img
                      src={wikiData['Suleiman the Magnificent'].thumbnail!.source}
                      alt="Suleiman the Magnificent - from Wikipedia"
                      className="story-image"
                    />
                    <figcaption className="story-image-caption">
                      Suleiman the Magnificent &mdash; from <a href={wikiData['Suleiman the Magnificent'].content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                    </figcaption>
                  </figure>
                )}

                <p className="story-paragraph">
                  What followed was an age of unprecedented power and sophistication. Suleiman the Magnificent codified laws that still influence legal systems today. Sinan, the master architect, built hundreds of mosques whose domes seem to float on air. The empire became a haven for Jewish refugees fleeing Spain, for scientists fleeing the Inquisition.
                </p>

                <div className="curiosity-box">
                  <div className="curiosity-title">Did you know?</div>
                  <p className="curiosity-fact">
                    When Mehmed II conquered Constantinople, he was just 21 years old. He spoke seven languages and was an accomplished poet.
                  </p>
                  <p className="curiosity-fact">
                    The architect Mimar Sinan designed over 300 structures in his lifetime, including the Suleymaniye Mosque, considered one of the greatest architectural achievements in history.
                  </p>
                  <p className="curiosity-fact">
                    The Ottoman Empire lasted 623 years &mdash; one of the longest-ruling empires in history. At its peak under Suleiman, it controlled territories across three continents.
                  </p>
                </div>

                <div className="explore-section">
                  <h3 className="typ-h3">Explore on Wikipedia</h3>
                  <div className="explore-grid">
                    {ERA_IMAGES.ottoman.map(topic => {
                      const wiki = wikiData[topic];
                      return (
                        <Link key={topic} href={`/article/${encodeURIComponent(topic)}`} className="explore-link">
                          {wiki?.thumbnail && <img src={wiki.thumbnail.source} alt={`${topic} - from Wikipedia`} />}
                          <div className="explore-link-text">
                            <h4>{topic}</h4>
                            <p>{wiki?.description || 'Read on Wikipedia'}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {selectedEra === 'republic' && (
              <>
                <h1 className="typ-h1" style={{ textAlign: 'left' }}>
                  Turkish Republic
                </h1>
                <p className="typ-subtitle" style={{ textAlign: 'left' }}>
                  1923&ndash;present &middot; A nation reborn
                </p>

                {wikiData['Mustafa Kemal Atatürk']?.thumbnail && (
                  <div className="hero-image-section">
                    <img
                      src={wikiData['Mustafa Kemal Atatürk'].thumbnail!.source}
                      alt="Mustafa Kemal Atatürk - from Wikipedia"
                    />
                    <div className="hero-image-caption">
                      Mustafa Kemal Atat&uuml;rk &mdash; image from <a href={wikiData['Mustafa Kemal Atatürk'].content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                    </div>
                  </div>
                )}

                <p className="story-paragraph typ-dropcap">
                  After the First World War, the Ottoman Empire collapsed. Allied forces occupied Istanbul. The Sultanate was abolished. From the ashes of empire, a military officer named Mustafa Kemal &mdash; later given the name Atat&uuml;rk, &ldquo;Father of the Turks&rdquo; &mdash; led a war of independence.
                </p>

                <p className="story-paragraph">
                  In 1923, the Republic of Turkey was proclaimed. The new capital became Ankara, in the heart of Anatolia. Atat&uuml;rk began a radical transformation: Arabic script was replaced with Latin. The veil was discouraged in public spaces. Women gained the right to vote and serve in parliament &mdash; years before many Western democracies granted the same.
                </p>

                <p className="story-paragraph">
                  Today, Turkey stands at a crossroads. A member of NATO, a bridge between East and West. Its cities hum with modern energy while its countryside preserves ancient traditions. The story continues.
                </p>

                <div className="curiosity-box">
                  <div className="curiosity-title">Did you know?</div>
                  <p className="curiosity-fact">
                    Turkish women gained full voting rights in 1934 &mdash; a decade before France (1944) and Italy (1946).
                  </p>
                  <p className="curiosity-fact">
                    The Turkish alphabet switch in 1928 was one of the most dramatic literacy campaigns in history. Atat&uuml;rk personally toured the country teaching the new Latin-based script.
                  </p>
                  <p className="curiosity-fact">
                    Ankara was chosen as the new capital partly because of its central location in Anatolia, symbolizing a break from the Ottoman past centered on Istanbul.
                  </p>
                </div>

                <div className="explore-section">
                  <h3 className="typ-h3">Explore on Wikipedia</h3>
                  <div className="explore-grid">
                    {ERA_IMAGES.republic.map(topic => {
                      const wiki = wikiData[topic];
                      return (
                        <Link key={topic} href={`/article/${encodeURIComponent(topic)}`} className="explore-link">
                          {wiki?.thumbnail && <img src={wiki.thumbnail.source} alt={`${topic} - from Wikipedia`} />}
                          <div className="explore-link-text">
                            <h4>{topic}</h4>
                            <p>{wiki?.description || 'Read on Wikipedia'}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
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
          <Link href="/about" className={pathname === '/about' ? 'active' : ''}>
            <div className="nav-info-icon">ℹ</div>
          </Link>
        </div>
      </nav>

      <div className="page-body">
        <Link href="/" className="back-link">Return to journey</Link>

        <h1 className="scene-header">Through Time</h1>
        <p className="scene-subtitle">Three chapters of an ancient land</p>

        <div className="timeline">
          <div className="timeline-item" onClick={() => setSelectedEra('byzantine')} style={{ animationDelay: '100ms' }}>
            {wikiData['Byzantine Empire']?.thumbnail && (
              <img
                src={wikiData['Byzantine Empire'].thumbnail!.source}
                alt="Byzantine Empire"
                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-md)', border: '1px solid var(--ui-border)' }}
              />
            )}
            <div className="timeline-year">330 AD</div>
            <h3 className="timeline-title">Byzantine Era</h3>
            <p className="timeline-text">Constantinople, the New Rome</p>
          </div>

          <div className="timeline-item" onClick={() => setSelectedEra('ottoman')} style={{ animationDelay: '200ms' }}>
            {wikiData['Ottoman Empire']?.thumbnail && (
              <img
                src={wikiData['Ottoman Empire'].thumbnail!.source}
                alt="Ottoman Empire"
                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-md)', border: '1px solid var(--ui-border)' }}
              />
            )}
            <div className="timeline-year">1299</div>
            <h3 className="timeline-title">Ottoman Empire</h3>
            <p className="timeline-text">From beylik to world power</p>
          </div>

          <div className="timeline-item" onClick={() => setSelectedEra('republic')} style={{ animationDelay: '300ms' }}>
            {wikiData['Mustafa Kemal Atatürk']?.thumbnail && (
              <img
                src={wikiData['Mustafa Kemal Atatürk'].thumbnail!.source}
                alt="Mustafa Kemal Atatürk"
                style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-md)', border: '1px solid var(--ui-border)' }}
              />
            )}
            <div className="timeline-year">1923</div>
            <h3 className="timeline-title">Republic</h3>
            <p className="timeline-text">A nation reborn from ashes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
