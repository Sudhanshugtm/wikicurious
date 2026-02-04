'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWikiSummaries } from '../../hooks/useWikiData';

const CULTURE_TOPICS = [
  'Turkish tea',
  'Turkish coffee',
  'Turkish cuisine',
  'Turkish bath',
  'Whirling dervishes',
  'Iznik pottery',
  'Nazar (amulet)',
  'Simit',
];

export default function CultureJourney() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const pathname = usePathname();
  const { data: wikiData } = useWikiSummaries(CULTURE_TOPICS);

  if (selectedTopic) {
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
            <button onClick={() => setSelectedTopic(null)} className="back-link">
              Back to traditions
            </button>

            {selectedTopic === 'tea' && (
              <>
                <h1 className="typ-h1" style={{ textAlign: 'left' }}>
                  Turkish Tea
                </h1>
                <p className="typ-subtitle" style={{ textAlign: 'left' }}>
                  More than a drink &mdash; a way of life
                </p>

                {wikiData['Turkish tea']?.thumbnail && (
                  <div className="hero-image-section">
                    <img
                      src={wikiData['Turkish tea'].thumbnail!.source}
                      alt="Turkish tea - from Wikipedia"
                    />
                    <div className="hero-image-caption">
                      Turkish tea &mdash; image from <a href={wikiData['Turkish tea'].content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                    </div>
                  </div>
                )}

                <p className="story-paragraph typ-dropcap">
                  In every village, every city square, every home across Turkey, you&apos;ll find it. The tulip-shaped glass. The crimson liquid. The tiny saucer. Turkish tea (&ccedil;ay) is not merely a beverage &mdash; it&apos;s a ritual of hospitality that welcomes strangers and binds communities.
                </p>

                <p className="story-paragraph">
                  Watch the &ccedil;ayc&inodot; prepare it. Two kettles stacked one upon the other. Water boils in the lower, while a strong concentrate simmers in the upper. The art is in the blend. Too weak, and it&apos;s disappointing. Too strong, and it&apos;s bitter. But when made just right, it&apos;s warm comfort in a glass.
                </p>

                <p className="story-paragraph">
                  In the mornings, men gather in &ccedil;ay bahçesi &mdash; tea gardens &mdash; watching football matches and debating politics. In homes, guests are offered tea before they&apos;ve even settled in. To refuse is considered impolite. To drink three glasses is expected &mdash; the third brings luck.
                </p>

                <div className="curiosity-box">
                  <div className="curiosity-title">Did you know?</div>
                  <p className="curiosity-fact">
                    Turkey is the world&apos;s largest per-capita consumer of tea, drinking roughly 3.5 kg per person annually &mdash; nearly triple the per-capita consumption in the United Kingdom.
                  </p>
                  <p className="curiosity-fact">
                    Turkish tea is grown primarily in the Rize province on the eastern Black Sea coast, where the humid climate creates ideal growing conditions.
                  </p>
                  <p className="curiosity-fact">
                    The tulip-shaped glass (&ldquo;ince belli&rdquo;) is designed to keep the tea hot at the top while cool enough to hold at the rim. Its shape echoes the tulip, a flower that originated in the Ottoman Empire before reaching Holland.
                  </p>
                </div>

                <div className="explore-section">
                  <h3 className="typ-h3">Explore on Wikipedia</h3>
                  <div className="explore-grid">
                    {['Turkish tea', 'Turkish cuisine', 'Simit'].map(topic => {
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

            {selectedTopic === 'hospitality' && (
              <>
                <h1 className="typ-h1" style={{ textAlign: 'left' }}>
                  Misafirperverlik
                </h1>
                <p className="typ-subtitle" style={{ textAlign: 'left' }}>
                  The art of welcoming strangers
                </p>

                {wikiData['Turkish bath']?.thumbnail && (
                  <div className="hero-image-section">
                    <img
                      src={wikiData['Turkish bath'].thumbnail!.source}
                      alt="Turkish bath (hamam) - from Wikipedia"
                    />
                    <div className="hero-image-caption">
                      The Turkish hamam &mdash; a symbol of communal hospitality &mdash; from <a href={wikiData['Turkish bath'].content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                    </div>
                  </div>
                )}

                <p className="story-paragraph typ-dropcap">
                  Knock on a door in rural Turkey, and you might be invited in for dinner before you&apos;ve explained who you are. This is misafirperverlik &mdash; the Turkish tradition of hospitality, deeply rooted in both Islamic teaching and nomadic culture where shelter was given to travelers regardless of who they were.
                </p>

                <p className="story-paragraph">
                  A guest is considered a gift from God. The host will provide their best food, their cleanest room, their most generous welcome. To accept less would be dishonor. Turkish hospitality doesn&apos;t ask for anything in return &mdash; not even your name. It&apos;s given freely, as it has been for centuries.
                </p>

                <p className="story-paragraph">
                  You&apos;ll feel it in the warmth of shopkeepers who insist you taste their wares. In the extra dollop of ice cream granted with a smile. In the way a stranger in the street will walk you to your destination rather than just give directions. This is Turkey&apos;s heart.
                </p>

                <div className="curiosity-box">
                  <div className="curiosity-title">Did you know?</div>
                  <p className="curiosity-fact">
                    The Turkish concept of &ldquo;misafir&rdquo; (guest) comes from Arabic and carries a spiritual dimension &mdash; in Turkish culture, an unexpected guest is called &ldquo;God&apos;s guest&rdquo; (Tanr&inodot; misafiri).
                  </p>
                  <p className="curiosity-fact">
                    The hammam (Turkish bath) tradition dates back to Roman times and became central to Ottoman social life. It served as a place for socializing, ceremonies, and even matchmaking.
                  </p>
                  <p className="curiosity-fact">
                    The nazar boncu&gbreve;u (evil eye bead), seen hanging everywhere in Turkey, is a symbol of protection. Its blue color is said to reflect the &ldquo;evil eye&rdquo; back to the one casting it.
                  </p>
                </div>

                <div className="explore-section">
                  <h3 className="typ-h3">Explore on Wikipedia</h3>
                  <div className="explore-grid">
                    {['Turkish bath', 'Nazar (amulet)', 'Turkish cuisine'].map(topic => {
                      const wiki = wikiData[topic];
                      return (
                        <Link key={topic} href={`/article/${encodeURIComponent(topic)}`} className="explore-link">
                          {wiki?.thumbnail && <img src={wiki.thumbnail.source} alt={`${topic} - from Wikipedia`} />}
                          <div className="explore-link-text">
                            <h4>{topic.replace(' (amulet)', '')}</h4>
                            <p>{wiki?.description || 'Read on Wikipedia'}</p>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {selectedTopic === 'coffee' && (
              <>
                <h1 className="typ-h1" style={{ textAlign: 'left' }}>
                  Turkish Coffee
                </h1>
                <p className="typ-subtitle" style={{ textAlign: 'left' }}>
                  Fortune in a cup
                </p>

                {wikiData['Turkish coffee']?.thumbnail && (
                  <div className="hero-image-section">
                    <img
                      src={wikiData['Turkish coffee'].thumbnail!.source}
                      alt="Turkish coffee - from Wikipedia"
                    />
                    <div className="hero-image-caption">
                      Turkish coffee &mdash; image from <a href={wikiData['Turkish coffee'].content_urls?.desktop?.page} target="_blank" rel="noopener noreferrer">Wikipedia</a>
                    </div>
                  </div>
                )}

                <p className="story-paragraph typ-dropcap">
                  Unlike tea, which flows freely and abundantly, Turkish coffee is something to savor. Made in a copper pot called a cezve, with very finely ground coffee, water, and sugar (optional), it&apos;s brewed slowly over sand or embers. The result is thick, strong, and unmistakable.
                </p>

                <p className="story-paragraph">
                  But what happens after you&apos;ve drunk it is perhaps more interesting. The cup is turned upside down on the saucer. You wait. Then someone skilled in the art reads the patterns left by the grounds. Your future is revealed in the swirls of coffee residue. Love, fortune, travel &mdash; all foretold in the dregs.
                </p>

                <p className="story-paragraph">
                  There&apos;s a Turkish proverb: &ldquo;Coffee should be black as hell, strong as death, and sweet as love.&rdquo; The experience is meant to be shared. Not quickly gulped, but savored in conversation with friends. Time slows down. Stories are told. Connections deepen.
                </p>

                <div className="curiosity-box">
                  <div className="curiosity-title">Did you know?</div>
                  <p className="curiosity-fact">
                    Turkish coffee culture was inscribed on UNESCO&apos;s Intangible Cultural Heritage list in 2013, recognizing its importance as a social practice.
                  </p>
                  <p className="curiosity-fact">
                    The word &ldquo;coffee&rdquo; in many European languages derives from the Turkish &ldquo;kahve,&rdquo; which in turn comes from the Arabic &ldquo;qahwa.&rdquo; Coffee houses (kahvehane) first appeared in Istanbul in the 1550s.
                  </p>
                  <p className="curiosity-fact">
                    In traditional Turkish engagement customs, the bride-to-be serves coffee to the groom&apos;s family. She sometimes adds salt instead of sugar to the groom&apos;s cup to test his temperament.
                  </p>
                </div>

                <div className="explore-section">
                  <h3 className="typ-h3">Explore on Wikipedia</h3>
                  <div className="explore-grid">
                    {['Turkish coffee', 'Whirling dervishes', 'Iznik pottery'].map(topic => {
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

        <h1 className="scene-header">The People</h1>
        <p className="scene-subtitle">Traditions that define a culture</p>

        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          {[
            { key: 'tea', wiki: 'Turkish tea', name: 'Tea Culture', desc: 'A ritual of hospitality and connection' },
            { key: 'hospitality', wiki: 'Turkish bath', name: 'Misafirperverlik', desc: 'The sacred duty of welcoming guests' },
            { key: 'coffee', wiki: 'Turkish coffee', name: 'Turkish Coffee', desc: 'Fortune-telling and slow conversation' },
          ].map((topic, i) => {
            const wiki = wikiData[topic.wiki];
            return (
              <div
                key={topic.key}
                className="image-card"
                onClick={() => setSelectedTopic(topic.key)}
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div style={{ overflow: 'hidden' }}>
                  {wiki?.thumbnail ? (
                    <img src={wiki.thumbnail.source} alt={`${topic.name} - from Wikipedia`} className="image-card-img" />
                  ) : (
                    <div className="image-card-placeholder" />
                  )}
                </div>
                <div className="image-card-body">
                  <h3 className="image-card-name">{topic.name}</h3>
                  <p className="image-card-desc">{topic.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="curiosity-box" style={{ maxWidth: '680px', margin: 'var(--space-2xl) auto 0' }}>
          <div className="curiosity-title">Did you know?</div>
          <p className="curiosity-fact">
            The Mevlevi Order&apos;s whirling dance (Sema) was inscribed on UNESCO&apos;s Intangible Cultural Heritage list in 2008. The spinning represents a spiritual journey through love to perfection.
          </p>
          <p className="curiosity-fact">
            Iznik tiles, the famous blue-and-white ceramics seen in Ottoman mosques, were so valuable that sultans kept the artisans under close guard to prevent their techniques from spreading.
          </p>
        </div>
      </div>
    </div>
  );
}
