# WikiCurious - Changes Summary

## Date: February 2, 2026

---

## 🎨 Typography Improvements

### 1. Google Fonts Integration
- **Added** Libre Baskerville (display/headings font)
- **Added** Lora (body text font)
- **Location**: `src/app/layout.tsx`
- **Benefits**: Improved readability, cohesive vintage aesthetic

### 2. Type Scale System
Implemented a minor third type scale in `src/app/globals.css`:

| Scale | Pixel | Rem | Usage |
|-------|-------|-----|-------|
| `--font-hero` | 56px | 3.5rem | Opening titles |
| `--font-h1` | 42px | 2.625rem | Main page titles |
| `--font-h2` | 32px | 2rem | Section headings |
| `--font-h3` | 24px | 1.5rem | Card titles |
| `--font-h4` | 20px | 1.25rem | Small headings |
| `--font-lg` | 18px | 1.125rem | Story paragraphs |
| `--font-base` | 16px | 1rem | Wiki body text |
| `--font-sm` | 14px | 0.875rem | Metadata/captions |

### 3. Typography Utility Classes
Created semantic classes for consistent styling:
- `.typ-hero` - Large display headings
- `.typ-h1` through `.typ-h4` - Heading hierarchy
- `.typ-body-lg`, `.typ-body`, `.typ-body-sm` - Body text sizes
- `.typ-subtitle` - Italic subtitles
- `.typ-dropcap` - Decorative first letters
- `.typ-italic`, `.typ-center`, `.typ-justify` - Utilities

### 4. Updated Components
Applied new typography to:
- ✅ `src/app/page.tsx` - Home page
- ✅ `src/app/journey/istanbul/page.tsx` - Istanbul journey
- ✅ `src/app/journey/history/page.tsx` - History journey
- ✅ `src/app/journey/destinations/page.tsx` - Destinations journey
- ✅ `src/app/journey/culture/page.tsx` - Culture journey
- ✅ `src/app/search/page.tsx` - Search page
- ✅ `src/app/saved/page.tsx` - Saved articles
- ✅ `src/app/article/[title]/page.tsx` - Article detail

### 5. Improvements Applied
- Consistent font sizes across all pages
- Proper line heights (1.75 for stories, 1.65 for wiki articles)
- Drop caps for story openings
- Responsive font sizing for mobile devices
- Shared typographic DNA between vintage & modern sections
- CSS variables for easy maintenance

---

## 🔒 Wikipedia API Compliance

### 1. Enhanced API Route (`src/app/api/wikipedia/route.ts`)

**Added Rate Limiting:**
- In-memory rate limiter (50 req/sec max)
- 1-second sliding window
- Prevents API abuse and respects Wikimedia limits

**Added Retry Logic:**
- Exponential backoff for failed requests
- Maximum 3 retry attempts
- Handles HTTP 429 (rate limit) and 503 (maxlag) errors

**Added Server Protection:**
- `maxlag=5` parameter to Action API calls
- Prevents server overload during high traffic

**Updated User-Agent:**
```
WikiCurious/1.0 (https://github.com/Sudhanshugtm/wikicurious; https://github.com/Sudhanshugtm/wikicurious/issues)
```
- Includes app name, version, project URL, and contact info

**Added Cache Headers:**
- Search: `max-age=600` (10 minutes)
- Summaries/Related: `max-age=3600` (1 hour)
- Reduces server load

### 2. Attribution UI

**Added to Article Page** (`src/app/article/[title]/page.tsx`):
- Link to original Wikipedia article
- CC BY-SA 3.0 license notice
- Wikipedia® trademark notice
- Placed at bottom of each article

**Added to About Page** (`src/app/about/page.tsx`):
- Licensing section explaining CC BY-SA 3.0
- Wikipedia trademark notice
- Guidance on proper attribution when using content

### 3. Documentation
Created `WIKIPEDIA_API_CONFIG.md`:
- Complete API usage documentation
- Compliance measures implemented
- Rate limiting strategy
- Error handling documentation
- Future API considerations (Wikidata, Commons, etc.)
- Wikimedia terms of use reference

---

## 📋 Summary of Changes

### Files Modified:
1. `src/app/layout.tsx` - Added Google Fonts
2. `src/app/globals.css` - Complete typography system rewrite
3. `src/app/page.tsx` - Typography updates
4. `src/app/journey/istanbul/page.tsx` - Typography updates
5. `src/app/journey/history/page.tsx` - Typography updates
6. `src/app/journey/destinations/page.tsx` - Complete rewrite + typography
7. `src/app/journey/culture/page.tsx` - Complete rewrite + typography
8. `src/app/search/page.tsx` - Typography updates
9. `src/app/saved/page.tsx` - Typography updates
10. `src/app/article/[title]/page.tsx` - Typography + attribution
11. `src/app/about/page.tsx` - Added licensing section
12. `src/app/api/wikipedia/route.ts` - Rate limiting, retry logic, maxlag

### Files Created:
1. `WIKIPEDIA_API_CONFIG.md` - API compliance documentation
2. `CHANGES_SUMMARY.md` - This file

---

## ✅ Verification

### Build Status:
```
✓ Compiled successfully
✓ All pages generated
✓ TypeScript validation passed
```

### Compliance Checklist:
- ✅ Uses only official Wikimedia APIs
- ✅ Proper User-Agent with contact info
- ✅ Rate limiting implemented (50 req/sec max)
- ✅ Retry logic with exponential backoff
- ✅ Server protection (maxlag parameter)
- ✅ Attribution UI on article pages
- ✅ CC BY-SA 3.0 license notices
- ✅ Wikipedia® trademark respected
- ✅ No content scraping
- ✅ Cache headers for reduced load

---

## 🚀 Next Steps (Optional)

### Typography:
1. Consider adding a dark mode
2. Add more font weights if needed
3. Implement print-specific styles

### Wikipedia API:
1. Add server-side caching (Redis/Upstash)
2. Implement Wikidata integration for structured facts
3. Add Wikimedia Commons for images
4. Monitor API usage and adjust rate limits if needed

### Features:
1. Add search history
2. Implement article categories
3. Add multilingual support

---

## 📚 Resources

- [Google Fonts - Libre Baskerville](https://fonts.google.com/specimen/Libre+Baskerville)
- [Google Fonts - Lora](https://fonts.google.com/specimen/Lora)
- [Wikipedia API Etiquette](https://www.mediawiki.org/wiki/API:Etiquette)
- [Wikipedia Terms of Use](https://wikimediafoundation.org/wiki/Terms_of_Use)
- [CC BY-SA 3.0 License](https://creativecommons.org/licenses/by-sa/3.0/)

---

**All changes tested and ready for deployment!** ✅
