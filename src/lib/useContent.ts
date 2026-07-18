"use client";

import { useState, useEffect } from 'react';
import defaultContent, { type ContentData } from './defaultContent';

let _cache: ContentData = defaultContent;

export function useContent(): ContentData {
  const [content, setContent] = useState<ContentData>(_cache);

  useEffect(() => {
    const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
    fetch(`${BASE}/content.json`)
      .then(r => r.ok ? r.json() : null)
      .then((data: ContentData | null) => {
        if (data && typeof data === 'object' && Object.keys(data).length > 0) {
          const merged = { ...defaultContent, ...data };
          _cache = merged;
          setContent(merged);
        }
      })
      .catch(() => { /* keep defaults on error */ });
  }, []);

  return content;
}
