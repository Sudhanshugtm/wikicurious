// ABOUTME: Full-screen immersive visual story about Istanbul with parallax backgrounds.
// ABOUTME: NYT "Snow Fall" mobile treatment — scroll-snap scenes, gradient scrims, text reveals.

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { WikiSummary } from '@/app/hooks/useWikiData';

const WIKI_TITLES = [
  'Istanbul',
  'Hagia_Sophia',
  'Grand_Bazaar,_Istanbul',
  'Bosphorus',
  'Turkish_tea',
];

interface SceneData {
  chapter: string;
  headline: string;
  body: string;
  wikiTitle: string;
  gradient: string;
}

const SCENES: SceneData[] = [
  {
    chapter: 'A Visual Journey',
    headline: 'Istanbul',
    body: 'Where continents meet and fifteen million stories overlap — a city that has reinvented itself for sixteen centuries without ever losing its thread.',
    wikiTitle: 'Istanbul',
    gradient: 'linear-gradient(to top, rgba(139, 0, 0, 0.85) 0%, rgba(139, 0, 0, 0.4) 40%, transparent 70%)',
  },
  {
    chapter: 'Chapter I',
    headline: 'The Dome That Changed Architecture',
    body: 'For a thousand years Hagia Sophia held the record for the largest enclosed space on Earth. Its floating dome still makes engineers pause.',
    wikiTitle: 'Hagia_Sophia',
    gradient: 'linear-gradient(to top, rgba(30, 58, 138, 0.85) 0%, rgba(30, 58, 138, 0.4) 40%, transparent 70%)',
  },
  {
    chapter: 'Chapter II',
    headline: 'Four Thousand Shops Under One Roof',
    body: 'The Grand Bazaar is not a market — it is an indoor city. Sixty-one covered streets, half a millennium of haggling, and the scent of leather and saffron everywhere.',
    wikiTitle: 'Grand_Bazaar,_Istanbul',
    gradient: 'linear-gradient(to top, rgba(45, 27, 27, 0.85) 0%, rgba(45, 27, 27, 0.4) 40%, transparent 70%)',
  },
  {
    chapter: 'Chapter III',
    headline: 'The Strait Between Two Worlds',
    body: 'The Bosphorus divides Europe from Asia in a ribbon of dark water thirty-one kilometres long. Ferries cross it every fifteen minutes, carrying commuters between continents.',
    wikiTitle: 'Bosphorus',
    gradient: 'linear-gradient(to top, rgba(30, 58, 138, 0.85) 0%, rgba(30, 58, 138, 0.4) 40%, transparent 70%)',
  },
  {
    chapter: 'Chapter IV',
    headline: 'A Glass of Hospitality',
    body: 'Turkey drinks more tea per person than any country on Earth. The tulip-shaped glass is not a design choice — it keeps the brew hot at the rim and cool at the base.',
    wikiTitle: 'Turkish_tea',
    gradient: 'linear-gradient(to top, rgba(139, 0, 0, 0.85) 0%, rgba(139, 0, 0, 0.4) 40%, transparent 70%)',
  },
];

/**
 * Replaces the width segment in a Wikimedia thumbnail URL to request a
 * higher-resolution variant. Falls back to the original if the pattern
 * does not match.
 */
function upscaleThumbnail(src: string, targetWidth: number = 1200): string {
  return src.replace(/\/(\d+)px-/, `/${targetWidth}px-`);
}

interface VisualStoryProps {
  onClose: () => void;
}

export default function VisualStory({ onClose }: VisualStoryProps) {
  const [wikiData, setWikiData] = useState<Record<string, WikiSummary>>({});
  const [activeScene, setActiveScene] = useState(0);
  const [visibleScenes, setVisibleScenes] = useState<Set<number>>(new Set([0]));
  const [imgErrors, setImgErrors] = useState<Set<number>>(new Set());

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const sceneRefs = useRef<Array<HTMLElement | null>>([]);
  const closeRef = useRef<HTMLButtonElement | null>(null);

  // Fetch Wikipedia summaries for each scene independently
  useEffect(() => {
    let cancelled = false;

    WIKI_TITLES.forEach((title) => {
      fetch(`/api/wikipedia?action=summary&title=${encodeURIComponent(title)}`)
        .then((res) => (res.ok ? res.json() : null))
        .then((data: WikiSummary | null) => {
          if (cancelled || !data) return;
          setWikiData((prev) => ({ ...prev, [title]: data }));
        })
        .catch(() => {
          // Images are progressive enhancement — silently ignore
        });
    });

    return () => { cancelled = true; };
  }, []);

  // Focus the close button when the story mounts
  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  // Escape key to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  // IntersectionObserver for text reveals and active scene tracking
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number((entry.target as HTMLElement).dataset.scene);
          if (Number.isNaN(index)) return;

          if (entry.isIntersecting) {
            setVisibleScenes((prev) => {
              const next = new Set(prev);
              next.add(index);
              return next;
            });
          }

          // Update active scene when mostly visible
          if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
            setActiveScene(index);
          }
        });
      },
      {
        root: scrollEl,
        threshold: [0.1, 0.5, 0.8],
      }
    );

    sceneRefs.current.forEach((scene) => {
      if (scene) observer.observe(scene);
    });

    return () => observer.disconnect();
  }, []);

  // Parallax effect on background images
  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleScroll = () => {
      const scrollTop = scrollEl.scrollTop;
      const viewportH = scrollEl.clientHeight;

      sceneRefs.current.forEach((scene) => {
        if (!scene) return;
        const img = scene.querySelector<HTMLImageElement>('.visual-story-bg');
        if (!img) return;

        const sceneTop = scene.offsetTop;
        const offset = scrollTop - sceneTop;
        // Translate at 30% of scroll speed for subtle parallax
        const translate = (offset / viewportH) * 0.3 * viewportH * -1;
        img.style.transform = `translateY(${translate}px)`;
      });
    };

    scrollEl.addEventListener('scroll', handleScroll, { passive: true });
    return () => scrollEl.removeEventListener('scroll', handleScroll);
  }, []);

  const jumpToScene = useCallback((index: number) => {
    const scene = sceneRefs.current[index];
    if (!scene) return;
    scene.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleImgError = useCallback((sceneIndex: number) => {
    setImgErrors((prev) => {
      const next = new Set(prev);
      next.add(sceneIndex);
      return next;
    });
  }, []);

  return (
    <div
      className="visual-story-container"
      role="dialog"
      aria-modal="true"
      aria-label="Istanbul visual story"
    >
      <button
        ref={closeRef}
        type="button"
        className="visual-story-close"
        onClick={onClose}
        aria-label="Close story"
      >
        ✕
      </button>

      <nav className="visual-story-progress" aria-label="Story progress">
        {SCENES.map((scene, i) => (
          <button
            key={scene.wikiTitle}
            type="button"
            className={`visual-story-dot ${i === activeScene ? 'active' : ''}`}
            onClick={() => jumpToScene(i)}
            aria-label={`Go to scene ${i}: ${scene.headline}`}
          />
        ))}
      </nav>

      <div className="visual-story-scroll" ref={scrollRef}>
        {SCENES.map((scene, i) => {
          const wiki = wikiData[scene.wikiTitle];
          const thumbnail = wiki?.thumbnail?.source;
          const hiRes = thumbnail ? upscaleThumbnail(thumbnail) : null;
          const fallbackSrc = thumbnail || null;
          const showImage = hiRes && !imgErrors.has(i);

          return (
            <section
              key={scene.wikiTitle}
              data-scene={i}
              ref={(node) => {
                sceneRefs.current[i] = node;
              }}
              className="visual-story-scene"
            >
              {showImage && (
                <img
                  className="visual-story-bg"
                  src={hiRes}
                  alt={wiki?.title || scene.headline}
                  loading={i <= 1 ? 'eager' : 'lazy'}
                  onError={(e) => {
                    // Try original thumbnail as fallback
                    if (fallbackSrc && (e.target as HTMLImageElement).src !== fallbackSrc) {
                      (e.target as HTMLImageElement).src = fallbackSrc;
                    } else {
                      handleImgError(i);
                    }
                  }}
                />
              )}

              <div
                className="visual-story-gradient"
                style={{ background: scene.gradient }}
              />

              <div className={`visual-story-content ${visibleScenes.has(i) ? 'visible' : ''}`}>
                <p className="visual-story-chapter">{scene.chapter}</p>
                <h2 className="visual-story-headline">{scene.headline}</h2>
                <p className="visual-story-body">{scene.body}</p>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
