'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWikiSummaries } from '../../hooks/useWikiData';

const DEST_TOPICS = [
  'Cappadocia',
  'Pamukkale',
  'Ephesus',
  'Göreme National Park',
  'Derinkuyu underground city',
  'Hierapolis',
  'Library of Celsus',
  'Temple of Artemis',
  'Uçhisar',
];

export default function DestinationsJourney() {
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const pathname = usePathname();
  const { data: wikiData } = useWikiSummaries(DEST_TOPICS);

  if (selectedPlace) {
    return (
      <div className="story-container">
        <nav className="journey-nav">
          <Link href="/" className="journey-nav-brand">WikiCurious</Link>
          <div className="journey-nav-links">
            <Link href="/saved" className={pathname === '/saved' ? 'active' : ''}>Saved</Link>
          </div>
        </nav>

        <div className="page-body">
          <div className="story-section">
            <button onClick={() => setSelectedPlace(null)} className="back-link">
              Back to the land
            </button>

            {selectedPlace === 'cappadocia' && (
              <>
                <h1 className="typ-h1" style={{ textAlign: 'left' }}>
                  Cappadocia
                </h1>
                <p className="typ-subtitle" style={{ textAlign: 'left' }}>
                  Land of fairy chimneys and underground cities
                </p>

                {wikiData['Cappadocia']?.thumbnail && (
                  <div className="hero-image-section">
                    <img
                      src={wikiData['Cappadocia'].thumbnail!.source}
                      alt="Cappadocia - from Wikipedia"
                    />
                    <div className="hero-image-caption">
                      Cappadocia &mdash; image from <a href={wikiData['Cappadocia'].content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                    </div>
                  </div>
                )}

                <p className="story-paragraph typ-dropcap">
                  Imagine waking up before dawn in a room carved into soft volcanic rock. Outside, the sky is still dark, but already sound reaches you &mdash; the rhythmic whoosh of flames. You step outside. Across the valley, dozens of hot air balloons are being inflated, their colorful fabric catching the first light of day.
                </p>

                <p className="story-paragraph">
                  This is Cappadocia, a place so strange it could only have been shaped by nature and humans together. Millions of years ago, volcanoes erupted, burying the land in soft tuff. Wind and rain carved it into pillars, cones, and valleys. Humans carved homes, churches, even entire cities into the soft stone.
                </p>

                {wikiData['Göreme National Park']?.thumbnail && (
                  <figure style={{ margin: '0 0 var(--space-xl) 0' }}>
                    <img
                      src={wikiData['Göreme National Park'].thumbnail!.source}
                      alt="Göreme National Park - from Wikipedia"
                      className="story-image story-image-wide"
                    />
                    <figcaption className="story-image-caption">
                      G&ouml;reme National Park &mdash; from <a href={wikiData['Göreme National Park'].content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                    </figcaption>
                  </figure>
                )}

                <p className="story-paragraph">
                  Go underground and you&apos;ll discover Derinkuyu &mdash; an eight-story subterranean city that once housed 20,000 people. Ventilation shafts, wells, chapels, even a winery, all carved deep beneath the earth. When invaders came, people disappeared into the ground.
                </p>

                <p className="story-paragraph">
                  Above ground, explore the G&ouml;reme Open Air Museum. Rock-cut churches with vibrant frescoes of saints and biblical scenes, still brilliant after centuries. Climb U&ccedil;hisar Castle for views that stretch forever. And at sunset, watch the rocks glow pink and gold &mdash; a light that has captivated travelers for millennia.
                </p>

                <div className="curiosity-box">
                  <div className="curiosity-title">Did you know?</div>
                  <p className="curiosity-fact">
                    Derinkuyu underground city extends to a depth of approximately 60 meters (200 feet) and could shelter up to 20,000 people along with their livestock and food stores.
                  </p>
                  <p className="curiosity-fact">
                    The fairy chimneys of Cappadocia were formed by the erosion of volcanic ash (tuff) deposited millions of years ago. Harder basalt caps protected the softer rock below, creating the distinctive mushroom shapes.
                  </p>
                  <p className="curiosity-fact">
                    Early Christians used the caves of Cappadocia as hiding places during Roman persecution. Some cave churches date back to the 4th century AD.
                  </p>
                </div>

                <div className="explore-section">
                  <h3 className="typ-h3">Explore on Wikipedia</h3>
                  <div className="explore-grid">
                    {['Cappadocia', 'Göreme National Park', 'Derinkuyu underground city', 'Uçhisar'].map(topic => {
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

            {selectedPlace === 'pamukkale' && (
              <>
                <h1 className="typ-h1" style={{ textAlign: 'left' }}>
                  Pamukkale
                </h1>
                <p className="typ-subtitle" style={{ textAlign: 'left' }}>
                  Cotton castles of travertine
                </p>

                {wikiData['Pamukkale']?.thumbnail && (
                  <div className="hero-image-section">
                    <img
                      src={wikiData['Pamukkale'].thumbnail!.source}
                      alt="Pamukkale - from Wikipedia"
                    />
                    <div className="hero-image-caption">
                      Pamukkale &mdash; image from <a href={wikiData['Pamukkale'].content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                    </div>
                  </div>
                )}

                <p className="story-paragraph typ-dropcap">
                  From a distance, they look like snowfields. Or perhaps a frozen waterfall cascading down a green hillside. But as you draw closer, you realize what you&apos;re seeing is impossible &mdash; white terraces of mineral-rich water, stretching as far as the eye can see.
                </p>

                <p className="story-paragraph">
                  Pamukkale means &ldquo;cotton castle&rdquo; in Turkish, and the name fits perfectly. For thousands of years, thermal springs have flowed down this hillside, leaving behind white calcium deposits that form terraced pools. The water is warm, mineral-rich, and said to have healing properties.
                </p>

                {wikiData['Hierapolis']?.thumbnail && (
                  <figure style={{ margin: '0 0 var(--space-xl) 0' }}>
                    <img
                      src={wikiData['Hierapolis'].thumbnail!.source}
                      alt="Hierapolis - from Wikipedia"
                      className="story-image"
                    />
                    <figcaption className="story-image-caption">
                      The ruins of Hierapolis &mdash; from <a href={wikiData['Hierapolis'].content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                    </figcaption>
                  </figure>
                )}

                <p className="story-paragraph">
                  At the top sits the ancient ruins of Hierapolis &mdash; a Roman spa city founded in 190 BC. People came from across the empire to bathe in the same waters you can visit today. Walk through the Roman theater, the Temple of Apollo, the Nymphaeum &mdash; all with the white terraces as backdrop.
                </p>

                <p className="story-paragraph">
                  The pools are carefully protected now &mdash; visitors can only walk in certain areas to preserve this natural wonder. But wading into the warm mineral water, surrounded by white stone and ancient ruins, you understand why people have been drawn here for two thousand years.
                </p>

                <div className="curiosity-box">
                  <div className="curiosity-title">Did you know?</div>
                  <p className="curiosity-fact">
                    The thermal waters at Pamukkale emerge at 35&deg;C (95&deg;F) and contain calcium, magnesium bicarbonate, and sulfate. The white travertine is created as carbon dioxide degasses from the water.
                  </p>
                  <p className="curiosity-fact">
                    Hierapolis had a &ldquo;Plutonium&rdquo; &mdash; a cave connected to a geological vent that emitted deadly carbon dioxide gas. Ancient priests would demonstrate their &ldquo;divine power&rdquo; by entering the cave and surviving (by standing above the denser gas).
                  </p>
                  <p className="curiosity-fact">
                    Pamukkale was designated a UNESCO World Heritage Site in 1988 along with Hierapolis. Hotels that were built on the terraces in the 1960s&ndash;80s were demolished to restore the site.
                  </p>
                </div>

                <div className="explore-section">
                  <h3 className="typ-h3">Explore on Wikipedia</h3>
                  <div className="explore-grid">
                    {['Pamukkale', 'Hierapolis'].map(topic => {
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

            {selectedPlace === 'ephesus' && (
              <>
                <h1 className="typ-h1" style={{ textAlign: 'left' }}>
                  Ephesus
                </h1>
                <p className="typ-subtitle" style={{ textAlign: 'left' }}>
                  Where the Greeks and Romans walked
                </p>

                {wikiData['Ephesus']?.thumbnail && (
                  <div className="hero-image-section">
                    <img
                      src={wikiData['Ephesus'].thumbnail!.source}
                      alt="Ephesus - from Wikipedia"
                    />
                    <div className="hero-image-caption">
                      Ephesus &mdash; image from <a href={wikiData['Ephesus'].content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                    </div>
                  </div>
                )}

                <p className="story-paragraph typ-dropcap">
                  Walk down Curetes Street and listen. The marble under your feet is the same marble walked by Cleopatra, Mark Antony, Saint Paul. This was once the second-largest city in the Roman Empire, home to 250,000 people. Now, it&apos;s one of the best-preserved ancient cities in the Mediterranean.
                </p>

                {wikiData['Library of Celsus']?.thumbnail && (
                  <figure style={{ margin: '0 0 var(--space-xl) 0' }}>
                    <img
                      src={wikiData['Library of Celsus'].thumbnail!.source}
                      alt="Library of Celsus - from Wikipedia"
                      className="story-image"
                    />
                    <figcaption className="story-image-caption">
                      The Library of Celsus &mdash; from <a href={wikiData['Library of Celsus'].content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                    </figcaption>
                  </figure>
                )}

                <p className="story-paragraph">
                  The Library of Celsus rises before you &mdash; its restored facade soaring to the heavens. Once, it held 12,000 scrolls, one of the largest libraries of the ancient world. Behind it, the agora marketplace buzzes with imagined crowds. The theater, carved into the hillside, seats 24,000.
                </p>

                <p className="story-paragraph">
                  But Ephesus has many layers beneath the Roman city. Earlier, it was a Greek city, famed for the Temple of Artemis &mdash; one of the Seven Wonders of the Ancient World. Little remains of the temple now, just a single column rising from marshy ground.
                </p>

                <p className="story-paragraph">
                  Perhaps most poignant is the Terrace Houses &mdash; where wealthy Romans lived. Mosaics still bright on floors. Frescoes on walls. A sophisticated heating system running beneath. Walking these rooms, you don&apos;t see ruins. You see lives interrupted &mdash; a meal unfinished, a child&apos;s toy left behind, two thousand years ago.
                </p>

                <div className="curiosity-box">
                  <div className="curiosity-title">Did you know?</div>
                  <p className="curiosity-fact">
                    The Library of Celsus had a hidden tunnel connecting it to a building across the street that some scholars believe was a brothel &mdash; allowing Roman citizens to claim they were &ldquo;going to the library.&rdquo;
                  </p>
                  <p className="curiosity-fact">
                    The Temple of Artemis at Ephesus was four times the size of the Parthenon in Athens. It was destroyed and rebuilt three times before its final destruction in 401 AD.
                  </p>
                  <p className="curiosity-fact">
                    The Great Theatre of Ephesus, with a seating capacity of 24,000, is where the &ldquo;riot of the silversmiths&rdquo; described in the Acts of the Apostles is said to have taken place during Saint Paul&apos;s visit.
                  </p>
                </div>

                <div className="explore-section">
                  <h3 className="typ-h3">Explore on Wikipedia</h3>
                  <div className="explore-grid">
                    {['Ephesus', 'Library of Celsus', 'Temple of Artemis'].map(topic => {
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
        </div>
      </nav>

      <div className="page-body">
        <Link href="/" className="back-link">Return to journey</Link>

        <h1 className="scene-header">The Land</h1>
        <p className="scene-subtitle">Mountains, coasts, and geological wonders</p>

        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          {[
            { key: 'cappadocia', wiki: 'Cappadocia', name: 'Cappadocia', desc: 'Fairy chimneys and underground cities' },
            { key: 'pamukkale', wiki: 'Pamukkale', name: 'Pamukkale', desc: 'White travertine terraces and Roman ruins' },
            { key: 'ephesus', wiki: 'Ephesus', name: 'Ephesus', desc: 'Ancient Greek and Roman city' },
          ].map((dest, i) => {
            const wiki = wikiData[dest.wiki];
            return (
              <div
                key={dest.key}
                className="image-card"
                onClick={() => setSelectedPlace(dest.key)}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div style={{ overflow: 'hidden' }}>
                  {wiki?.thumbnail ? (
                    <img src={wiki.thumbnail.source} alt={`${dest.name} - from Wikipedia`} className="image-card-img" />
                  ) : (
                    <div className="image-card-placeholder" />
                  )}
                </div>
                <div className="image-card-body">
                  <h3 className="image-card-name">{dest.name}</h3>
                  <p className="image-card-desc">{dest.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
