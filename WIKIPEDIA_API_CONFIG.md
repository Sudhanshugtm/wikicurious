# Wikipedia API Configuration & Compliance

## Official Wikimedia APIs Used

WikiCurious uses ONLY official Wikimedia APIs - no third-party services or scrapers.

### APIs in Use

| API | Endpoint | Purpose |
|-----|----------|---------|
| Search API | `https://en.wikipedia.org/w/api.php?action=query&list=search` | Search for Wikipedia articles |
| Summary API | `https://en.wikipedia.org/api/rest_v1/page/summary/{title}` | Get article summaries |
| Related Pages | `https://en.wikipedia.org/api/rest_v1/page/related/{title}` | Get related articles |

### User Agent
```
WikiCurious/1.0 (https://github.com/Sudhanshugtm/wikicurious; https://github.com/Sudhanshugtm/wikicurious/issues)
```

## Compliance Measures

### ✅ Implemented
- **Official APIs Only**: All data from official Wikimedia endpoints
- **Proper User-Agent**: Includes app name, version, project URL, and contact
- **Rate Limiting**: Max 50 requests/second (well below 200/sec limit)
- **Retry Logic**: Exponential backoff for failed requests
- **Server Protection**: `maxlag=5` parameter to prevent server overload
- **Caching Headers**: Client-side caching for reduced server load
- **Error Handling**: Graceful handling of HTTP 429 (rate limit) and 503 (maxlag) errors

### ✅ Attribution
- All article pages display:
  - Link to original Wikipedia article
  - CC BY-SA 3.0 license notice
  - Wikipedia® trademark notice
- About page explains licensing requirements

### ✅ Privacy
- No data collection or transmission
- Articles saved locally in browser localStorage
- No personal information stored or transmitted

## Rate Limiting Strategy

### Limits
- **Action API**: Stay under 50 req/sec (limit is ~200/sec)
- **REST API**: Stay under 50 req/sec (limit is ~200/sec)

### Implementation
- In-memory rate limiter with 1-second sliding window
- Exponential backoff on retries
- Maximum 3 retry attempts

## Caching Strategy

### Cache TTLs (Recommended for Future Implementation)

| Data Type | TTL | Reasoning |
|-----------|-----|-----------|
| Search results | 10 min | Content changes frequently |
| Page summaries | 1-6 hours | Stable content |
| Related pages | 1-6 hours | Stable relationships |
| Images/metadata | 24 hours | Rarely changes |

### Current Implementation
- HTTP cache headers set for client-side caching
- Search: `max-age=600` (10 minutes)
- Summaries/Related: `max-age=3600` (1 hour)

## Error Handling

### Handled Errors
- **HTTP 429**: Rate limit exceeded - waits Retry-After seconds
- **HTTP 503**: Server busy (maxlag) - waits 5 seconds
- **Network Errors**: Exponential backoff retry
- **Invalid Response**: Graceful error message to user

## Future Wikimedia APIs to Consider

### 1. Wikidata API
- **Endpoint**: `https://www.wikidata.org/wiki/Special:EntityData/{id}.json`
- **Use Cases**: Structured facts, multilingual support, knowledge graph
- **Priority**: Medium

### 2. Wikimedia Commons API
- **Endpoint**: `https://commons.wikimedia.org/w/api.php`
- **Use Cases**: Free images, illustrations, diagrams
- **Priority**: Low

### 3. Page Views API
- **Endpoint**: `https://wikimedia.org/api/rest_v1/metrics/pageviews/`
- **Use Cases**: Popularity metrics, trending articles
- **Priority**: Low

### 4. ORES (Quality Scoring)
- **Endpoint**: `https://ores.wikimedia.org/v3/scores/{wiki}/{revid}/{model}`
- **Use Cases**: Article quality indicators, vandalism detection
- **Priority**: Low

## Terms of Use Compliance

### Wikimedia Terms
- ✅ Attribution provided (CC BY-SA 3.0)
- ✅ User-Agent identifies the application
- ✅ Rate limiting implemented
- ✅ No content scraping of HTML pages
- ✅ Wikipedia® trademark respected
- ✅ Content displayed as-is without modification

### Do's
- ✅ Cache responses
- ✅ Respect rate limits
- ✅ Provide attribution
- ✅ Use official APIs only
- ✅ Handle errors gracefully
- ✅ Implement retry logic

### Don'ts
- ❌ Scrape HTML pages
- ❌ Remove attribution
- ❌ Exceed rate limits
- ❌ Pretend to be a browser
- ❌ Store content permanently without licensing considerations

## Documentation Links

- [API Etiquette](https://www.mediawiki.org/wiki/API:Etiquette)
- [Terms of Use](https://wikimediafoundation.org/wiki/Terms_of_Use)
- [Licensing](https://en.wikipedia.org/wiki/Wikipedia:Copyrights)
- [REST API Docs](https://en.wikipedia.org/api/rest_v1/)
- [Action API Docs](https://www.mediawiki.org/wiki/API:Main_page)

## Contact

For questions about API usage:
- GitHub Issues: https://github.com/Sudhanshugtm/wikicurious/issues
- User-Agent includes GitHub issues URL for Wikimedia contact

---

**Last Updated**: February 2, 2026
**Status**: ✅ Fully Compliant
**Next Review**: After major API changes
