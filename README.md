# WikiCurious 🌍

A web application that helps travelers and curious minds explore Wikipedia content in a curated, accessible way. Built for those planning trips or wanting to learn about new places before visiting.

## Features

- 🔍 **Smart Search** - Search for any city, country, or topic on Wikipedia
- 📚 **Curated Content** - Browse main article summaries and related articles
- ⭐ **Save Articles** - Save interesting articles to read later (stored locally in browser)
- 📥 **Offline Export** - Download saved articles as Markdown for offline reading
- 🎨 **Wikimedia Codex Design** - Clean, familiar Wikipedia-like interface

## Tech Stack

- **Framework**: Next.js 16 (React 19)
- **Design System**: Wikimedia Codex (the official design system for Wikipedia)
- **Data Source**: Wikipedia REST API
- **Storage**: Browser localStorage
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+ installed

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd wikicurious
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
wikicurious/
├── src/
│   └── app/
│       ├── about/           # About page
│       ├── article/[title]/  # Individual article page
│       ├── saved/            # Saved articles page
│       ├── search/           # Search results page
│       ├── layout.tsx        # Root layout with Codex import
│       ├── page.tsx          # Home page
│       └── globals.css       # Custom styles + overrides
├── public/                   # Static assets
└── package.json
```

## Wikimedia Codex Integration

This project uses **only** the Wikimedia Codex design system:

- **CSS Import**: `@wikimedia/codex/codex.style.css` is imported in `layout.tsx`
- **Design Tokens**: Uses Wikimedia's color palette, spacing, and typography
- **Component Classes**: Uses Codex classes like `cdx-button`, `cdx-card`, `cdx-link`, etc.

### Key Codex Classes Used

- `cdx-button` - Primary and secondary action buttons
- `cdx-card` - Content cards for articles
- `cdx-link` - Styled links
- `cdx-text-input` - Search input fields
- `cdx-breadcrumb` - Navigation breadcrumbs

## Wikipedia API Endpoints Used

- **Summary**: `https://en.wikipedia.org/api/rest_v1/page/summary/{title}`
- **Related**: `https://en.wikipedia.org/api/rest_v1/page/related/{title}`
- **Search**: `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch={query}`

## Features in Detail

### Search Flow

1. User enters a search query (e.g., "Istanbul")
2. App fetches related articles and main summary from Wikipedia
3. Displays the main article with thumbnail and extract
4. Shows related articles for further exploration

### Saving Articles

- Click the "★ Save" button on any article
- Articles are stored in browser's localStorage
- Access saved articles via the "Saved" page
- Export as Markdown for offline reading

### Export Format

Saved articles are exported in Markdown format:
```markdown
# Article Title

Description

Article extract...

---
```

## Privacy

- No user accounts or authentication
- All saved articles stored locally in browser
- No data collection or tracking
- Content fetched directly from Wikipedia API

## Future Enhancements

Potential features to add:
- [ ] Dark mode support (using Codex theme tokens)
- [ ] Advanced filtering by topic (History, Food, Landmarks)
- [ ] Map integration showing article locations
- [ ] AI-powered fact summarization
- [ ] Multi-language Wikipedia support
- [ ] User accounts for cross-device sync

## Inspiration

This project was born from a trip to Istanbul, where the sheer amount of fascinating history and culture inspired the desire to explore destinations more deeply before and during travel.

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests
- Improve documentation

## License

MIT License - feel free to use this project for your own purposes.

## Acknowledgments

- **Wikipedia** - For the incredible wealth of knowledge and public API
- **Wikimedia Foundation** - For the Codex design system
- **Next.js** - For the excellent React framework

---

Made with ❤️ using Wikimedia Codex
