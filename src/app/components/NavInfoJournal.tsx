// ABOUTME: Navigation button that opens the full-screen Istanbul visual story.
// ABOUTME: Phone icon trigger with VisualStory overlay — used across all pages.

'use client';

import { useCallback, useRef, useState } from 'react';
import VisualStory from './VisualStory';

export default function NavInfoJournal() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openStory = useCallback(() => setIsOpen(true), []);

  const closeStory = useCallback(() => {
    setIsOpen(false);
    // Return focus to the trigger button after closing
    requestAnimationFrame(() => {
      triggerRef.current?.focus();
    });
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className={`nav-info-icon nav-info-button ${isOpen ? 'is-open' : ''}`}
        onClick={openStory}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-label="Open Istanbul visual story"
      >
        ☏
      </button>

      {isOpen && <VisualStory onClose={closeStory} />}
    </>
  );
}
