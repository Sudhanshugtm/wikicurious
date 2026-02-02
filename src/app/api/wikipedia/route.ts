import { NextRequest, NextResponse } from 'next/server';

// Wikimedia API Configuration
const WIKI_CONFIG = {
  userAgent: 'WikiCurious/1.0 (https://github.com/Sudhanshugtm/wikicurious; https://github.com/Sudhanshugtm/wikicurious/issues)',
  maxRetries: 3,
  baseDelay: 1000,
  maxlag: 5, // Prevent server overload
};

// Simple rate limiter (in-memory for demo - use Redis/Redis-like for production)
const rateLimiter = {
  requests: [] as number[],
  async acquire(): Promise<void> {
    const now = Date.now();
    const oneSecondAgo = now - 1000;

    // Remove requests older than 1 second
    this.requests = this.requests.filter(t => t > oneSecondAgo);

    // If at or over limit (50 req/sec to stay safe under 200/sec limit)
    if (this.requests.length >= 50) {
      const waitTime = 1000 - (now - this.requests[0]);
      if (waitTime > 0) {
        await new Promise(resolve => setTimeout(resolve, waitTime));
      }
    }

    this.requests.push(Date.now());
  }
};

async function fetchWikiAPI(url: string, options: RequestInit = {}): Promise<Response> {
  let attempt = 0;

  while (attempt < WIKI_CONFIG.maxRetries) {
    try {
      // Rate limit before each request
      await rateLimiter.acquire();

      const response = await fetch(url, {
        ...options,
        headers: {
          'User-Agent': WIKI_CONFIG.userAgent,
          'Accept': 'application/json',
          ...options.headers,
        },
      });

      // Handle rate limiting (HTTP 429)
      if (response.status === 429) {
        const retryAfter = parseInt(response.headers.get('Retry-After') || '5', 10);
        await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
        attempt++;
        continue;
      }

      // Handle maxlag (server busy - HTTP 503)
      if (response.status === 503) {
        const error = await response.json().catch(() => ({}));
        if (error?.error?.code === 'maxlag') {
          await new Promise(resolve => setTimeout(resolve, 5000));
          attempt++;
          continue;
        }
      }

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      attempt++;
      if (attempt >= WIKI_CONFIG.maxRetries) throw error;
      // Exponential backoff
      const delay = Math.min(
        WIKI_CONFIG.baseDelay * Math.pow(2, attempt),
        WIKI_CONFIG.baseDelay * 10
      );
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  throw new Error('Max retries exceeded');
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action');
  const query = searchParams.get('q');
  const title = searchParams.get('title');

  try {
    let url = '';

    if (action === 'search') {
      // Search API with maxlag parameter
      url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query || '')}&format=json&origin=*&maxlag=${WIKI_CONFIG.maxlag}`;
    } else if (action === 'summary') {
      // Summary API (REST API doesn't use maxlag)
      url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title || '')}`;
    } else if (action === 'related') {
      // Related pages API (REST API doesn't use maxlag)
      url = `https://en.wikipedia.org/api/rest_v1/page/related/${encodeURIComponent(title || '')}`;
    }

    if (!url) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const response = await fetchWikiAPI(url);
    const data = await response.json();

    // Add CORS headers
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        // Cache headers for client-side caching
        'Cache-Control': action === 'search' ? 'public, max-age=600' : 'public, max-age=3600',
      },
    });
  } catch (error) {
    console.error('Wikipedia API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from Wikipedia', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
