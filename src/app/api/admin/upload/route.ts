import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO ?? 'drsport1010/drsport-clinic';

const GH_HEADERS = {
  Authorization: `Bearer ${GITHUB_TOKEN}`,
  Accept: 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
};

const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED_EXT = new Set(['jpg', 'jpeg', 'png', 'webp', 'svg', 'gif']);

export async function POST(req: NextRequest) {
  if (!ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Admin not configured' }, { status: 503 });
  }
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${ADMIN_PASSWORD}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  let body: { filename?: string; data?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const { filename, data } = body;
  if (!filename || !data) {
    return NextResponse.json({ error: 'Missing filename or data' }, { status: 400 });
  }
  const ext = (filename.split('.').pop() || '').toLowerCase();
  if (!ALLOWED_EXT.has(ext)) {
    return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
  }
  const base64 = data.replace(/^data:[^;]+;base64,/, '');
  if (Buffer.byteLength(base64, 'base64') > MAX_BYTES) {
    return NextResponse.json({ error: 'File too large (max 4MB)' }, { status: 413 });
  }
  const stem = filename
    .replace(/\.[^.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 40) || 'image';
  const name = `${Date.now().toString(36)}-${stem}.${ext}`;
  const repoPath = `public/shop/${name}`;
  const url = `/shop/${name}`;

  if (GITHUB_TOKEN) {
    try {
      const res = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/contents/${repoPath}`,
        {
          method: 'PUT',
          headers: { ...GH_HEADERS, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: `Upload product image via admin panel: ${name}`,
            content: base64,
          }),
        }
      );
      if (!res.ok) {
        return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
      }
      // The image URL goes live once Vercel redeploys the commit (~1 min).
      return NextResponse.json({ ok: true, url, deploying: true });
    } catch {
      return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
    }
  }

  try {
    const dir = join(process.cwd(), 'public', 'shop');
    mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, name), Buffer.from(base64, 'base64'));
    return NextResponse.json({ ok: true, url });
  } catch {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
