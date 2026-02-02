'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DestinationsJourney() {
  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);

  if (selectedPlace) {
    return (
      <div className="story-container">
        <header className="header-minimal">
          <Link href="/journey/destinations">destinations</Link>
        </header>

        <div style={{ flex: 1, padding: '40px 20px' }}>
          <div className="story-section">
            <button onClick={() => setSelectedPlace(null)} className="back-link">
              ← Back to the land
            </button>

            {selectedPlace === 'cappadocia' && (
              <>
                <h1 className="typ-h1" style={{ textAlign: 'left' }}>
                  Cappadocia
                </h1>
                <p className="typ-subtitle" style={{ textAlign: 'left' }}>
                  Land of fairy chimneys and underground cities
                </p>

                <p className="story-paragraph typ-dropcap">
                  Imagine waking up before dawn in a room carved into soft volcanic rock. Outside, sky is still dark, but already sound reaches you — rhythmic whoosh of flames. You step outside. Across the valley, dozens of hot air balloons are being inflated, their colorful fabric catching first light of day.
                </p>

                <p className="story-paragraph">
                  This is Cappadocia, a place so strange it could only have been shaped by nature and humans together. Millions of years ago, volcanoes erupted, burying the land in soft tuff. Wind and rain carved it into pillars, cones, and valleys. Humans carved homes, churches, even entire cities into the soft stone.
                </p>

                <p className="story-paragraph">
                  Go underground and you'll discover Derinkuyu — an eight-story subterranean city that once housed 20,000 people. Ventilation shafts, wells, chapels, even a winery, all carved deep beneath the earth. When invaders came, people disappeared into the ground.
                </p>

                <p className="story-paragraph">
                  Above ground, explore the Goreme Open Air Museum. Rock-cut churches with vibrant frescoes of saints and biblical scenes, still brilliant after centuries. Climb Uchisar Castle for views that stretch forever. And at sunset, watch the rocks glow pink and gold — a light that has captivated travelers for millennia.
                </p>
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

                <p className="story-paragraph typ-dropcap">
                  From a distance, they look like snowfields. Or perhaps a frozen waterfall cascading down a green hillside. But as you draw closer, you realize what you're seeing is impossible — white terraces of mineral-rich water, stretching as far as the eye can see.
                </p>

                <p className="story-paragraph">
                  Pamukkale means "cotton castle" in Turkish, and the name fits perfectly. For thousands of years, thermal springs have flowed down this hillside, leaving behind white calcium deposits that form terraced pools. The water is warm, mineral-rich, and said to have healing properties.
                </p>

                <p className="story-paragraph">
                  At the top sits the ancient ruins of Hierapolis — a Roman spa city founded in 190 BC. People came from across the empire to bathe in the same waters you can visit today. Walk through the Roman theater, the Temple of Apollo, the Nymphaeum — all with the white terraces as backdrop.
                </p>

                <p className="story-paragraph">
                  The pools are carefully protected now — visitors can only walk in certain areas to preserve this natural wonder. But wading into the warm mineral water, surrounded by white stone and ancient ruins, you understand why people have been drawn here for two thousand years.
                </p>
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

                <p className="story-paragraph typ-dropcap">
                  Walk down Curetes Street and listen. The marble under your feet is the same marble walked by Cleopatra, Mark Antony, Saint Paul. This was once the second-largest city in the Roman Empire, home to 250,000 people. Now, it's one of the best-preserved ancient cities in the Mediterranean.
                </p>

                <p className="story-paragraph">
                  The Library of Celsus rises before you — its restored facade soaring to the heavens. Once, it held 12,000 scrolls, one of the largest libraries of the ancient world. Behind it, the agora marketplace buzzes with imagined crowds. The theater, carved into the hillside, seats 24,000.
                </p>

                <p className="story-paragraph">
                  But Ephesus has many layers beneath the Roman city. Earlier, it was a Greek city, famed for the Temple of Artemis — one of the Seven Wonders of the Ancient World. Little remains of the temple now, just a single column rising from marshy ground.
                </p>

                <p className="story-paragraph">
                  Perhaps most poignant is the Terrace Houses — where wealthy Romans lived. Mosaics still bright on floors. Frescoes on walls. A sophisticated heating system running beneath. Walking these rooms, you don't see ruins. You see lives interrupted — a meal unfinished, a child's toy left behind, two thousand years ago.
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

        <h1 className="scene-header">The Land</h1>
        <p className="scene-subtitle">Mountains, coasts, and geological wonders</p>

        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div className="era-card" onClick={() => setSelectedPlace('cappadocia')}>
            <h3 className="typ-h3 era-title">🎈 Cappadocia</h3>
            <p className="era-description">Fairy chimneys and underground cities</p>
          </div>

          <div className="era-card" onClick={() => setSelectedPlace('pamukkale')}>
            <h3 className="typ-h3 era-title">🏊 Pamukkale</h3>
            <p className="era-description">White travertine terraces and Roman ruins</p>
          </div>

          <div className="era-card" onClick={() => setSelectedPlace('ephesus')}>
            <h3 className="typ-h3 era-title">🏛️ Ephesus</h3>
            <p className="era-description">Ancient Greek and Roman city</p>
          </div>
        </div>
      </div>
    </div>
  );
}
