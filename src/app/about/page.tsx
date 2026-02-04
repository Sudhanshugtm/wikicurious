'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AboutPage() {
  const pathname = usePathname();

  return (
    <div className="min-h-screen">
      <nav className="journey-nav">
        <Link href="/" className="journey-nav-brand">WikiCurious</Link>
        <div className="journey-nav-links">
          <Link href="/" className={pathname === '/' ? 'active' : ''}>Journey</Link>
        </div>
      </nav>

      <main className="wiki-content" style={{ padding: '32px 20px' }}>
        <article className="wiki-article">
          <h1 className="typ-h1">About WikiCurious</h1>

          <p className="typ-body-lg">
            <strong>WikiCurious</strong> is a web application designed to help travelers and curious minds explore
            Wikipedia content in a more accessible, curated way. Built specifically for those planning trips or
            wanting to learn about new places before visiting.
          </p>

          <h2 className="typ-h2" style={{ paddingLeft: 'var(--space-2xl)' }}>Why WikiCurious?</h2>
          <p className="typ-body" style={{ marginBottom: '16px' }}>
            Wikipedia is an incredible resource, but it can be overwhelming when you&apos;re looking for quick, travel-
            relevant information. WikiCurious curates content to highlight:
          </p>
          <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
            <div className="wiki-card" style={{ padding: '20px' }}>
              <h4 className="typ-h4" style={{ marginBottom: '8px' }}>Rich History</h4>
              <p className="typ-body-sm" style={{ margin: 0 }}>The stories and events that shaped your destination</p>
            </div>
            <div className="wiki-card" style={{ padding: '20px' }}>
              <h4 className="typ-h4" style={{ marginBottom: '8px' }}>Landmarks &amp; Culture</h4>
              <p className="typ-body-sm" style={{ margin: 0 }}>Iconic sites and local traditions</p>
            </div>
            <div className="wiki-card" style={{ padding: '20px' }}>
              <h4 className="typ-h4" style={{ marginBottom: '8px' }}>Interesting Facts</h4>
              <p className="typ-body-sm" style={{ margin: 0 }}>Bite-sized trivia that makes your journey more meaningful</p>
            </div>
            <div className="wiki-card" style={{ padding: '20px' }}>
              <h4 className="typ-h4" style={{ marginBottom: '8px' }}>Related Articles</h4>
              <p className="typ-body-sm" style={{ margin: 0 }}>Discover connected topics you might not find otherwise</p>
            </div>
          </div>

          <h2 className="typ-h2" style={{ paddingLeft: 'var(--space-2xl)' }}>How It Works</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            {[
              { step: '1. Explore', desc: 'Follow the story-based journey through Turkey' },
              { step: '2. Discover', desc: 'Every card links to a Wikipedia article with images' },
              { step: '3. Save', desc: 'Bookmark articles for offline reading' },
              { step: '4. Export', desc: 'Download saved articles as Markdown' },
            ].map(item => (
              <div key={item.step} className="wiki-card" style={{ textAlign: 'center', padding: '20px' }}>
                <h4 className="typ-h4" style={{ margin: '0 0 8px 0' }}>{item.step}</h4>
                <p className="typ-body-sm" style={{ margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="typ-h2" style={{ paddingLeft: 'var(--space-2xl)' }}>Built With</h2>
          <div className="wiki-infobox">
            <div className="wiki-infobox-title">Technology Stack</div>
            <ul style={{ marginBottom: '0', lineHeight: '1.8', paddingLeft: '20px' }}>
              <li><strong>Framework:</strong> Next.js 16 (React 19) with TypeScript</li>
              <li><strong>Design System:</strong> Wikimedia Codex (the official design system for Wikipedia)</li>
              <li><strong>Data Source:</strong> Wikipedia REST API</li>
              <li><strong>Images:</strong> All visual content from Wikimedia projects</li>
              <li><strong>Storage:</strong> Browser localStorage (no server-side data)</li>
              <li><strong>Deployment:</strong> Vercel</li>
            </ul>
          </div>

          <h2 className="typ-h2" style={{ paddingLeft: 'var(--space-2xl)' }}>Privacy</h2>
          <div className="wiki-infobox" style={{ borderLeftColor: 'var(--iznik-turquoise)' }}>
            <p className="typ-body" style={{ margin: 0 }}>
              <strong>WikiCurious is completely private.</strong> Your saved articles are stored locally in your browser&apos;s
              localStorage. We don&apos;t collect, store, or transmit any personal data. All Wikipedia content is fetched
              directly from Wikipedia&apos;s public API.
            </p>
          </div>

          <h2 className="typ-h2" style={{ paddingLeft: 'var(--space-2xl)' }}>Licensing &amp; Attribution</h2>
          <div className="wiki-fact-card">
            <div className="wiki-fact-label">Content License</div>
            <div className="wiki-fact-value">
              <p style={{ margin: '0 0 12px 0' }}>
                All Wikipedia content is available under the <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--iznik-cobalt)' }}>Creative Commons Attribution-ShareAlike 3.0 License</a>.
                All images are sourced from Wikimedia projects and are subject to their individual licenses.
              </p>
              <p style={{ margin: '0 0 12px 0' }}>
                Wikipedia&reg; is a registered trademark of the Wikimedia Foundation, Inc.
              </p>
              <p style={{ margin: '0', fontSize: 'var(--font-sm)', color: 'var(--cumin)' }}>
                When using content from WikiCurious, please attribute the original Wikipedia article and include a link to the license.
              </p>
            </div>
          </div>

          <div className="curiosity-box">
            <div className="curiosity-title">The story behind this project</div>
            <p className="curiosity-fact">
              This project was born from a trip to Istanbul, where the sheer amount of fascinating history and culture
              inspired the desire to explore destinations more deeply before and during travel.
            </p>
            <p className="curiosity-fact">
              The design draws from Ottoman manuscripts, Iznik tile patterns, and the warm tones of the Spice Bazaar.
              Every color, pattern, and animation is a deliberate nod to Turkey&apos;s visual heritage.
            </p>
          </div>

          <div style={{ marginTop: '40px', textAlign: 'center' }}>
            <Link href="/" className="journey-button" style={{ display: 'inline-block', opacity: 1, animation: 'none' }}>
              Start Exploring
            </Link>
          </div>
        </article>
      </main>

      <footer className="wiki-footer">
        <div className="wiki-content">
          <p style={{ fontSize: '1.1em', marginBottom: '8px' }}>
            <strong>WikiCurious</strong> &middot; Explore Wikipedia Like Never Before
          </p>
          <p style={{ opacity: 0.9, fontSize: '0.95em' }}>
            Powered by <a href="https://en.wikipedia.org" target="_blank" rel="noopener noreferrer">Wikipedia</a> &middot;
            Built with <a href="https://doc.wikimedia.org/codex/" target="_blank" rel="noopener noreferrer">Wikimedia Codex</a>
          </p>
          <p style={{ opacity: 0.7, fontSize: '0.85em', marginTop: '16px' }}>
            Made in Istanbul
          </p>
        </div>
      </footer>
    </div>
  );
}
