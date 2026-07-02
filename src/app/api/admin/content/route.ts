import { NextRequest, NextResponse } from 'next/server';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const CONTENT_FILE = join(process.cwd(), 'public', 'content.json');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function GET() {
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
  try {
    const body = await req.json();
    writeFileSync(CONTENT_FILE, JSON.stringify(body, null, 2), 'utf8');
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Save failed' }, { status: 500 });
  }
}
