'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const JOURNAL_ENTRIES = [
  {
    eyebrow: 'Travel Notebook',
    title: 'This app reads like a journey, not a database.',
    body: 'We shape each page like a travel journal so discovery feels paced and human. Instead of endless links, you get a narrative arc with context, imagery, and texture.',
    prompt: 'If you were landing in Istanbul tomorrow, which story would you open first and why?',
  },
  {
    eyebrow: 'NYTimes-Inspired Flow',
    title: 'Scroll to reveal chapters one scene at a time.',
    body: 'Each panel is built for thumb-friendly reading with dramatic transitions, sticky framing, and story beats that unfold as you move. It is meant to feel editorial on mobile.',
    prompt: 'Pause on one chapter and note the detail that made you curious enough to keep going.',
  },
  {
    eyebrow: 'Curated Curiosity',
    title: 'Wikipedia power, but filtered for travelers.',
    body: 'We keep the open knowledge backbone, then curate what matters for place, culture, and memory. You can branch out anytime through related articles.',
    prompt: 'Which cultural detail would you want in your own trip journal: food, ritual, architecture, or people?',
  },
  {
    eyebrow: 'Save And Return',
    title: 'Build your personal reading trail as you explore.',
    body: 'Save moments that resonate. Your list lives locally in your browser, so your notes and reading path stay private to you.',
    prompt: 'Capture one topic now that you want to revisit when planning your next itinerary.',
  },
  {
    eyebrow: 'Design Intent',
    title: 'Crafted with Ottoman tones and manuscript energy.',
    body: 'Typography, color, and motion are tuned to evoke Turkish visual heritage while staying clean, modern, and readable on small screens.',
    prompt: 'What should the next interactive chapter cover: markets, food routes, coastal escapes, or hidden neighborhoods?',
  },
] as const;

export default function NavInfoJournal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const sectionRefs = useRef<Array<HTMLElement | null>>([]);

  const openJournal = () => {
    setActiveIndex(0);
    setIsOpen(true);
  };
  const closeJournal = () => setIsOpen(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeJournal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      trackRef.current?.scrollTo({ top: 0, behavior: 'auto' });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || !trackRef.current) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visibleEntry) {
          return;
        }

        const index = Number((visibleEntry.target as HTMLElement).dataset.index);
        if (!Number.isNaN(index)) {
          setActiveIndex(index);
        }
      },
      {
        root: trackRef.current,
        threshold: [0.35, 0.6, 0.85],
      }
    );

    sectionRefs.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, [isOpen]);

  const jumpToSection = (index: number) => {
    const section = sectionRefs.current[index];
    const track = trackRef.current;

    if (!section || !track) {
      return;
    }

    track.scrollTo({
      top: section.offsetTop - 10,
      behavior: 'smooth',
    });
  };

  return (
    <>
      <button
        type="button"
        className={`nav-info-icon nav-info-button ${isOpen ? 'is-open' : ''}`}
        onClick={openJournal}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="info-journal-dialog"
        aria-label="Open interactive journal info"
      >
        ℹ
      </button>

      {isOpen && (
        <div className="info-journal-overlay" onClick={closeJournal}>
          <section
            id="info-journal-dialog"
            className="info-journal-sheet"
            role="dialog"
            aria-modal="true"
            aria-label="Inside WikiCurious"
            onClick={(event) => event.stopPropagation()}
          >
            <header className="info-journal-header">
              <div>
                <p className="info-journal-kicker">Interactive Journal</p>
                <h2 className="info-journal-heading">Inside WikiCurious</h2>
                <p className="info-journal-subtitle">A mobile-first story flow inspired by editorial travel features.</p>
              </div>
              <button
                type="button"
                className="info-journal-close"
                onClick={closeJournal}
                aria-label="Close journal"
              >
                Close
              </button>
            </header>

            <nav className="info-journal-progress" aria-label="Journal sections">
              {JOURNAL_ENTRIES.map((entry, index) => (
                <button
                  key={entry.title}
                  type="button"
                  className={index === activeIndex ? 'active' : ''}
                  onClick={() => jumpToSection(index)}
                  aria-label={`Go to section ${index + 1}: ${entry.eyebrow}`}
                >
                  {index + 1}
                </button>
              ))}
            </nav>

            <div className="info-journal-track" ref={trackRef}>
              {JOURNAL_ENTRIES.map((entry, index) => (
                <article
                  key={entry.title}
                  data-index={index}
                  ref={(node) => {
                    sectionRefs.current[index] = node;
                  }}
                  className="info-journal-card"
                  style={{ animationDelay: `${index * 70}ms` }}
                >
                  <p className="info-journal-eyebrow">{entry.eyebrow}</p>
                  <h3 className="info-journal-title">{entry.title}</h3>
                  <p className="info-journal-copy">{entry.body}</p>
                  <div className="info-journal-prompt">
                    <span className="info-journal-prompt-label">Journal prompt</span>
                    <p>{entry.prompt}</p>
                  </div>
                </article>
              ))}

              <footer className="info-journal-footer">
                <Link href="/about" className="info-journal-about-link" onClick={closeJournal}>
                  Read the full About page
                </Link>
              </footer>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
