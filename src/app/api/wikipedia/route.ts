import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const action = searchParams.get('action');
  const query = searchParams.get('q');
  const title = searchParams.get('title');

  try {
    let url = '';

    if (action === 'search') {
      // Search API
      url = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query || '')}&format=json&origin=*`;
    } else if (action === 'summary') {
      // Summary API
      url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title || '')}`;
    } else if (action === 'related') {
      // Related pages API
      url = `https://en.wikipedia.org/api/rest_v1/page/related/${encodeURIComponent(title || '')}`;
    }

    if (!url) {
      return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'WikiCurious/1.0 (https://github.com/Sudhanshugtm/wikicurious)',
      },
    });

    if (!response.ok) {
      throw new Error(`Wikipedia API returned ${response.status}`);
    }

    const data = await response.json();

    // Add CORS headers
    return NextResponse.json(data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  } catch (error) {
    console.error('Wikipedia API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from Wikipedia' },
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
