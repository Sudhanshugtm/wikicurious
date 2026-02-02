'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function HistoryJourney() {
  const [selectedEra, setSelectedEra] = useState<string | null>(null);

  if (selectedEra) {
    return (
      <div className="story-container">
        <header className="header-minimal">
          <Link href="/journey/history">history</Link>
        </header>

        <div style={{ flex: 1, padding: '40px 20px' }}>
          <div className="story-section">
            <button onClick={() => setSelectedEra(null)} className="back-link">
              ← Back to timeline
            </button>

            {selectedEra === 'byzantine' && (
              <>
                <h1 className="typ-h1" style={{ textAlign: 'left' }}>
                  Byzantine Era
                </h1>
                <p className="typ-subtitle" style={{ textAlign: 'left' }}>
                  330–1453 AD • Constantinople, the New Rome
                </p>

                <p className="story-paragraph typ-dropcap">
                  In 330 AD, Emperor Constantine made a fateful decision. He moved the capital of Rome eastward, to a city called Byzantium. He renamed it Constantinople — the city of Constantine. For over a thousand years, this would be the beating heart of the Eastern Roman Empire.
                </p>

                <p className="story-paragraph">
                  Walk through these streets and you walk through time. The Theodosian Walls once protected millions within their embrace. The Great Palace echoed with the footsteps of emperors. And in the Hagia Sophia, under its magnificent dome, Byzantine priests chanted as the light filtered through gold mosaics of Christ and saints.
                </p>

                <p className="story-paragraph">
                  This was a civilization of art, law, and faith. Of silk from China and spices from India, traded in bustling markets. Of scholars preserving ancient Greek texts that would ignite the Renaissance centuries later.
                </p>
              </>
            )}

            {selectedEra === 'ottoman' && (
              <>
                <h1 className="typ-h1" style={{ textAlign: 'left' }}>
                  Ottoman Empire
                </h1>
                <p className="typ-subtitle" style={{ textAlign: 'left' }}>
                  1299–1922 • From a beylik to a world power
                </p>

                <p className="story-paragraph typ-dropcap">
                  In the rugged hills of northwestern Anatolia, a small Turkish tribe led by Osman Bey began building something that would reshape the world. They were the Ottomans, and for six centuries, their empire would stretch from Budapest to Baghdad, from Crimea to Algeria.
                </p>

                <p className="story-paragraph">
                  In 1453, the young Sultan Mehmed II looked up at the impenetrable walls of Constantinople. For 1,100 years, no army had breached them. But with massive cannons and unwavering determination, his forces broke through. The city fell. Constantinople became Istanbul. The Byzantine Empire ended.
                </p>

                <p className="story-paragraph">
                  What followed was an age of unprecedented power and sophistication. Suleiman the Magnificent codified laws that still influence legal systems today. Sinan, the master architect, built hundreds of mosques whose domes seem to float on air. The empire became a haven for Jewish refugees fleeing Spain, for scientists fleeing the Inquisition.
                </p>
              </>
            )}

            {selectedEra === 'republic' && (
              <>
                <h1 className="typ-h1" style={{ textAlign: 'left' }}>
                  Turkish Republic
                </h1>
                <p className="typ-subtitle" style={{ textAlign: 'left' }}>
                  1923–present • A nation reborn
                </p>

                <p className="story-paragraph typ-dropcap">
                  After the First World War, the Ottoman Empire collapsed. Allied forces occupied Istanbul. The Sultanate was abolished. From the ashes of empire, a military officer named Mustafa Kemal — later given the name Atatürk, "Father of the Turks" — led a war of independence.
                </p>

                <p className="story-paragraph">
                  In 1923, the Republic of Turkey was proclaimed. The new capital became Ankara, in the heart of Anatolia. Atatürk began a radical transformation: Arabic script was replaced with Latin. The veil was discouraged in public spaces. Women gained the right to vote and serve in parliament.
                </p>

                <p className="story-paragraph">
                  Today, Turkey stands at a crossroads. A member of NATO, an applicant to the European Union, a bridge between East and West. Its cities hum with modern energy while its countryside preserves ancient traditions. The story continues.
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

        <h1 className="scene-header">Through Time</h1>
        <p className="scene-subtitle">Three chapters of an ancient land</p>

        <div className="timeline">
          <div className="timeline-item" onClick={() => setSelectedEra('byzantine')}>
            <div className="timeline-year">330 AD</div>
            <h3 className="timeline-title">Byzantine Era</h3>
            <p className="timeline-text">Constantinople, the New Rome</p>
          </div>

          <div className="timeline-item" onClick={() => setSelectedEra('ottoman')}>
            <div className="timeline-year">1299</div>
            <h3 className="timeline-title">Ottoman Empire</h3>
            <p className="timeline-text">From beylik to world power</p>
          </div>

          <div className="timeline-item" onClick={() => setSelectedEra('republic')}>
            <div className="timeline-year">1923</div>
            <h3 className="timeline-title">Republic</h3>
            <p className="timeline-text">A nation reborn from ashes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
