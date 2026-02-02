'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CultureJourney() {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  if (selectedTopic) {
    return (
      <div className="story-container">
        <header className="header-minimal">
          <Link href="/journey/culture">culture</Link>
        </header>

        <div style={{ flex: 1, padding: '40px 20px' }}>
          <div className="story-section">
            <button onClick={() => setSelectedTopic(null)} className="back-link">
              ← Back to traditions
            </button>

            {selectedTopic === 'tea' && (
              <>
                <h1 className="typ-h1" style={{ textAlign: 'left' }}>
                  Turkish Tea
                </h1>
                <p className="typ-subtitle" style={{ textAlign: 'left' }}>
                  More than a drink — a way of life
                </p>

                <p className="story-paragraph typ-dropcap">
                  In every village, every city square, every home across Turkey, you'll find it. The tulip-shaped glass. The crimson liquid. The tiny saucer. Turkish tea (çay) is not merely a beverage — it's a ritual of hospitality that welcomes strangers and binds communities.
                </p>

                <p className="story-paragraph">
                  Watch the çaycı prepare it. Two kettles stacked one upon the other. Water boils in the lower, while a strong concentrate simmers in the upper. The art is in the blend. Too weak, and it's disappointing. Too strong, and it's bitter. But when made just right, it's warm comfort in a glass.
                </p>

                <p className="story-paragraph">
                  In the mornings, men gather in çay bahçesi — tea gardens — watching football matches and debating politics. In homes, guests are offered tea before they've even settled in. To refuse is considered impolite. To drink three glasses is expected — the third brings luck.
                </p>
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

                <p className="story-paragraph typ-dropcap">
                  Knock on a door in rural Turkey, and you might be invited in for dinner before you've explained who you are. This is misafirperverlik — Turkish tradition of hospitality, deeply rooted in both Islamic teaching and nomadic culture where shelter was given to travelers regardless of who they were.
                </p>

                <p className="story-paragraph">
                  A guest is considered a gift from God. The host will provide their best food, their cleanest room, their most generous welcome. To accept less would be dishonor. Turkish hospitality doesn't ask for anything in return — not even your name. It's given freely, as it has been for centuries.
                </p>

                <p className="story-paragraph">
                  You'll feel it in the warmth of shopkeepers who insist you taste their wares. In the extra dollop of ice cream granted with a smile. In the way a stranger in the street will walk you to your destination rather than just give directions. This is Turkey's heart.
                </p>
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

                <p className="story-paragraph typ-dropcap">
                  Unlike tea, which flows freely and abundantly, Turkish coffee is something to savor. Made in a copper pot called a cezve, with very finely ground coffee, water, and sugar (optional), it's brewed slowly over sand or embers. The result is thick, strong, and unmistakable.
                </p>

                <p className="story-paragraph">
                  But what happens after you've drunk it is perhaps more interesting. The cup is turned upside down on the saucer. You wait. Then someone skilled in the art reads the patterns left by the grounds. Your future is revealed in the swirls of coffee residue. Love, fortune, travel — all foretold in the dregs.
                </p>

                <p className="story-paragraph">
                  There's a Turkish proverb: "Coffee should be black as hell, strong as death, and sweet as love." The experience is meant to be shared. Not quickly gulped, but savored in conversation with friends. Time slows down. Stories are told. Connections deepen.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="story-container">
      <header className="header-minimal">
        <Link href="/">home</Link>
      </header>

      <div style={{ flex: 1, padding: '40px 20px' }}>
        <Link href="/" className="back-link">← Return to journey</Link>

        <h1 className="scene-header">The People</h1>
        <p className="scene-subtitle">Traditions that define a culture</p>

        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div className="era-card" onClick={() => setSelectedTopic('tea')}>
            <h3 className="typ-h3 era-title">☕ Tea Culture</h3>
            <p className="era-description">A ritual of hospitality and connection</p>
          </div>

          <div className="era-card" onClick={() => setSelectedTopic('hospitality')}>
            <h3 className="typ-h3 era-title">🤝 Misafirperverlik</h3>
            <p className="era-description">The sacred duty of welcoming guests</p>
          </div>

          <div className="era-card" onClick={() => setSelectedTopic('coffee')}>
            <h3 className="typ-h3 era-title">☕ Turkish Coffee</h3>
            <p className="era-description">Fortune-telling and slow conversation</p>
          </div>
        </div>
      </div>
    </div>
  );
}
