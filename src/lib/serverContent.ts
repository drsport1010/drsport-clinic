import { readFileSync } from "fs";
import { join } from "path";
import defaultContent, { type ContentData } from "./defaultContent";

// Server-side content reader. content.json is committed on every admin save,
// which triggers a Vercel rebuild — so build-time reads are always fresh.
export function getServerContent(): ContentData {
  try {
    const raw = readFileSync(join(process.cwd(), "public", "content.json"), "utf8");
    return { ...defaultContent, ...JSON.parse(raw) };
  } catch {
    return defaultContent;
  }
}
