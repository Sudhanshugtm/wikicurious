import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="wiki-header">
        <div className="wiki-content">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3" style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: '2.5em' }}>🌍</span>
              <h1 className="m-0" style={{ fontSize: '1.8em', fontWeight: 'bold', color: 'var(--wc-primary)' }}>
                WikiCurious
              </h1>
            </Link>
            <nav className="flex gap-4" style={{ fontSize: '0.95em' }}>
              <Link href="/" className="cdx-link">Home</Link>
              <Link href="/saved" className="cdx-link">Saved</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="wiki-content" style={{ padding: '32px 20px' }}>
        <article className="wiki-article">
          <h1>About WikiCurious</h1>

          <p style={{ fontSize: '1.1em', lineHeight: '1.8' }}>
            <strong>WikiCurious</strong> is a web application designed to help travelers and curious minds explore
            Wikipedia content in a more accessible, curated way. Built specifically for those planning trips or
            wanting to learn about new places before visiting.
          </p>

          <h2>Why WikiCurious? 🤔</h2>
          <p style={{ marginBottom: '16px' }}>
            Wikipedia is an incredible resource, but it can be overwhelming when you&apos;re looking for quick, travel-
            relevant information. WikiCurious curates content to highlight:
          </p>
          <div style={{ display: 'grid', gap: '16px', marginBottom: '24px' }}>
            <div className="wiki-card" style={{ padding: '20px' }}>
              <div style={{ fontSize: '1.5em', marginBottom: '8px' }}>📜</div>
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--wc-primary)' }}>Rich History</h4>
              <p style={{ margin: 0, color: 'var(--wc-secondary)' }}>The stories and events that shaped your destination</p>
            </div>
            <div className="wiki-card" style={{ padding: '20px' }}>
              <div style={{ fontSize: '1.5em', marginBottom: '8px' }}>🏛️</div>
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--wc-primary)' }}>Landmarks & Culture</h4>
              <p style={{ margin: 0, color: 'var(--wc-secondary)' }}>Iconic sites and local traditions</p>
            </div>
            <div className="wiki-card" style={{ padding: '20px' }}>
              <div style={{ fontSize: '1.5em', marginBottom: '8px' }}>💡</div>
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--wc-primary)' }}>Interesting Facts</h4>
              <p style={{ margin: 0, color: 'var(--wc-secondary)' }}>Bite-sized trivia that makes your journey more meaningful</p>
            </div>
            <div className="wiki-card" style={{ padding: '20px' }}>
              <div style={{ fontSize: '1.5em', marginBottom: '8px' }}>🔗</div>
              <h4 style={{ margin: '0 0 8px 0', color: 'var(--wc-primary)' }}>Related Articles</h4>
              <p style={{ margin: 0, color: 'var(--wc-secondary)' }}>Discover connected topics you might not find otherwise</p>
            </div>
          </div>

          <h2>How It Works 🚀</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
            <div style={{ textAlign: 'center', padding: '20px', background: 'linear-gradient(135deg, #e8f4f8 0%, #d4eef7 100%)', borderRadius: '12px' }}>
              <div style={{ fontSize: '3em', marginBottom: '12px' }}>🔍</div>
              <h4 style={{ margin: '0 0 8px 0' }}>1. Search</h4>
              <p style={{ margin: 0, color: 'var(--wc-secondary)', fontSize: '0.95em' }}>Search for any city, country, or topic</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', background: 'linear-gradient(135deg, #e8f4f8 0%, #d4eef7 100%)', borderRadius: '12px' }}>
              <div style={{ fontSize: '3em', marginBottom: '12px' }}>📚</div>
              <h4 style={{ margin: '0 0 8px 0' }}>2. Browse</h4>
              <p style={{ margin: 0, color: 'var(--wc-secondary)', fontSize: '0.95em' }}>Explore the main article and related content</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', background: 'linear-gradient(135deg, #e8f4f8 0%, #d4eef7 100%)', borderRadius: '12px' }}>
              <div style={{ fontSize: '3em', marginBottom: '12px' }}>⭐</div>
              <h4 style={{ margin: '0 0 8px 0' }}>3. Save</h4>
              <p style={{ margin: 0, color: 'var(--wc-secondary)', fontSize: '0.95em' }}>Save articles for offline reading</p>
            </div>
            <div style={{ textAlign: 'center', padding: '20px', background: 'linear-gradient(135deg, #e8f4f8 0%, #d4eef7 100%)', borderRadius: '12px' }}>
              <div style={{ fontSize: '3em', marginBottom: '12px' }}>📥</div>
              <h4 style={{ margin: '0 0 8px 0' }}>4. Export</h4>
              <p style={{ margin: 0, color: 'var(--wc-secondary)', fontSize: '0.95em' }}>Download as Markdown for offline use</p>
            </div>
          </div>

          <h2>Built With 🛠️</h2>
          <div className="wiki-infobox">
            <div className="wiki-infobox-title">Technology Stack</div>
            <ul style={{ marginBottom: '0', lineHeight: '1.8' }}>
              <li><strong>Framework:</strong> Next.js 16 (React 19) with TypeScript</li>
              <li><strong>Design System:</strong> Wikimedia Codex (the official design system for Wikipedia)</li>
              <li><strong>Data Source:</strong> Wikipedia REST API</li>
              <li><strong>Storage:</strong> Browser localStorage</li>
              <li><strong>Deployment:</strong> Vercel</li>
            </ul>
          </div>

          <h2>Privacy 🔒</h2>
          <div className="wiki-infobox" style={{ background: 'linear-gradient(135deg, #e8f9e8 0%, #d4f2d4 100%)', borderLeftColor: 'var(--wc-success)' }}>
            <p style={{ margin: 0 }}>
              <strong>WikiCurious is completely private:</strong> Your saved articles are stored locally in your browser&apos;s
              localStorage. We don&apos;t collect, store, or transmit any personal data. All Wikipedia content is fetched
              directly from Wikipedia&apos;s public API.
            </p>
          </div>

          <div className="wiki-fact-card">
            <div className="wiki-fact-label">🌟 Fun Fact</div>
            <div className="wiki-fact-value">
              This project was born from a trip to Istanbul, where the sheer amount of fascinating history and culture
              inspired the desire to explore destinations more deeply before and during travel. The blue gradient you see
              throughout the app is inspired by the iconic blue tiles of Turkish architecture! 🕌
            </div>
          </div>

          <h2>Contribute 💻</h2>
          <p>
            WikiCurious is open source and welcomes contributions! Whether it&apos;s bug fixes, new features, or design
            improvements, your help is appreciated.
          </p>

          <p style={{ marginTop: '24px' }}>
            <strong>Have feedback or suggestions?</strong> Feel free to open an issue or pull request on GitHub!
          </p>

          <div style={{ marginTop: '40px', textAlign: 'center', padding: '32px', background: 'linear-gradient(135deg, #e8f4f8 0%, #d4eef7 100%)', borderRadius: '16px' }}>
            <h3 style={{ color: 'var(--wc-primary)', marginBottom: '16px' }}>Ready to explore? 🌍</h3>
            <Link href="/" className="cdx-button cdx-button--action-primary" style={{ fontSize: '1.1em', padding: '14px 28px' }}>
              🚀 Start Exploring
            </Link>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="wiki-footer">
        <div className="wiki-content">
          <p style={{ fontSize: '1.1em', marginBottom: '8px' }}>
            🌍 <strong>WikiCurious</strong> • Explore Wikipedia Like Never Before
          </p>
          <p style={{ opacity: 0.9, fontSize: '0.95em' }}>
            Powered by <a href="https://en.wikipedia.org" target="_blank" rel="noopener noreferrer">Wikipedia</a> • 
            Built with <a href="https://doc.wikimedia.org/codex/" target="_blank" rel="noopener noreferrer">Wikimedia Codex</a>
          </p>
          <p style={{ opacity: 0.7, fontSize: '0.85em', marginTop: '16px' }}>
            Made with ❤️ in Istanbul
          </p>
        </div>
      </footer>
    </div>
  );
}
