import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const CONTENT_FILE = join(process.cwd(), 'public', 'content.json');
const CONTENT_PATH = 'public/content.json';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO ?? 'drsport1010/drsport-clinic';

const GH_API = `https://api.github.com/repos/${GITHUB_REPO}/contents/${CONTENT_PATH}`;
const GH_HEADERS = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

export async function GET() {
  if (GITHUB_TOKEN) {
    try {
      const res = await fetch(GH_API, { headers: GH_HEADERS, cache: 'no-store' });
      if (res.ok) {
        const file = await res.json();
        const content = Buffer.from(file.content, 'base64').toString('utf8');
        return NextResponse.json(JSON.parse(content));
      }
    } catch {
      // fall through to local file
    }
  }
  try {
    const data = readFileSync(CONTENT_FILE, 'utf8');
    return NextResponse.json(JSON.parse(data));
  } catch {
    return NextResponse.json({ error: 'Could not read content' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  if (!ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Admin not configured' }, { status: 503 });
  }
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const json = JSON.stringify(body, null, 2);

  if (GITHUB_TOKEN) {
    try {
      const current = await fetch(GH_API, { headers: GH_HEADERS, cache: 'no-store' });
      const sha = current.ok ? (await current.json()).sha : undefined;
      const res = await fetch(GH_API, {
        method: 'PUT',
        headers: { ...GH_HEADERS, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Update site content via admin panel',
          content: Buffer.from(json, 'utf8').toString('base64'),
          ...(sha ? { sha } : {}),
        }),
      });
      if (!res.ok) {
        return NextResponse.json({ error: 'Save failed' }, { status: 500 });
      }
      return NextResponse.json({ ok: true, deploying: true });
    } catch {
      return NextResponse.json({ error: 'Save failed' }, { status: 500 });
    }
  }

  try {
    writeFileSync(CONTENT_FILE, json, 'utf8');
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Save failed' }, { status: 500 });
  }
}
