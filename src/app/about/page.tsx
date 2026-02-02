import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="wiki-header">
        <div className="wiki-content">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 text-decoration-none">
              <span className="text-2xl">🌍</span>
              <h1 className="m-0 text-xl font-bold">WikiCurious</h1>
            </Link>
            <nav className="flex gap-4 text-sm">
              <Link href="/" className="text-decoration-none cdx-link">Home</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="wiki-content">
        <article className="wiki-article">
          <h1>About WikiCurious</h1>

          <p>
            <strong>WikiCurious</strong> is a web application designed to help travelers and curious minds explore
            Wikipedia content in a more accessible, curated way. Built specifically for those planning trips or
            wanting to learn about new places, WikiCurious brings you the most interesting and relevant information
            about any destination or topic.
          </p>

          <h2>Why WikiCurious?</h2>
          <p>
            Wikipedia is an incredible resource, but it can be overwhelming when you're looking for quick, travel-
            relevant information. WikiCurious curates content to highlight:
          </p>
          <ul>
            <li>📜 <strong>Rich History</strong> - The stories and events that shaped your destination</li>
            <li>🏛️ <strong>Landmarks & Culture</strong> - Iconic sites and local traditions</li>
            <li>💡 <strong>Interesting Facts</strong> - Bite-sized trivia that makes your journey more meaningful</li>
            <li>🔗 <strong>Related Articles</strong> - Discover connected topics you might not find otherwise</li>
          </ul>

          <h2>How It Works</h2>
          <ol>
            <li>Search for any city, country, or topic you're curious about</li>
            <li>Browse the main article summary and related content</li>
            <li>Save interesting articles to read later (stored in your browser)</li>
            <li>Export saved articles as Markdown for offline reading</li>
          </ol>

          <h2>Built With</h2>
          <div className="wiki-infobox">
            <div className="wiki-infobox-title">Technology Stack</div>
            <ul style={{ marginBottom: '0' }}>
              <li><strong>Framework:</strong> Next.js 16 (React)</li>
              <li><strong>Design System:</strong> Wikimedia Codex</li>
              <li><strong>Data Source:</strong> Wikipedia REST API</li>
              <li><strong>Storage:</strong> Browser localStorage</li>
            </ul>
          </div>

          <h2>Privacy</h2>
          <p>
            WikiCurious is a client-side application. Your saved articles are stored locally in your browser's
            localStorage. We don't collect, store, or transmit any personal data. All Wikipedia content is fetched
            directly from Wikipedia's public API.
          </p>

          <h2>Contribute</h2>
          <p>
            WikiCurious is open source and welcomes contributions! Whether it's bug fixes, new features, or design
            improvements, your help is appreciated.
          </p>

          <div className="wiki-fact-card">
            <div className="wiki-fact-label">🌟 Fun Fact</div>
            <div className="wiki-fact-value">
              This project was born from a trip to Istanbul, where the sheer amount of fascinating history and culture
              inspired the desire to explore destinations more deeply before and during travel.
            </div>
          </div>

          <h2>Contact</h2>
          <p>
            Have feedback or suggestions? Feel free to reach out or open an issue on GitHub.
          </p>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <Link href="/" className="cdx-button cdx-button--action-primary">
              Start Exploring
            </Link>
          </div>
        </article>
      </main>

      {/* Footer */}
      <footer className="wiki-content" style={{ padding: '32px 0', borderTop: '1px solid var(--wc-border)', marginTop: '48px' }}>
        <p style={{ textAlign: 'center', color: 'var(--wc-secondary)', fontSize: '0.9em' }}>
          WikiCurious • Powered by <a href="https://en.wikipedia.org" className="cdx-link" target="_blank" rel="noopener noreferrer">Wikipedia</a> • Built with <a href="https://doc.wikimedia.org/codex/" className="cdx-link" target="_blank" rel="noopener noreferrer">Wikimedia Codex</a>
        </p>
      </footer>
    </div>
  );
}
