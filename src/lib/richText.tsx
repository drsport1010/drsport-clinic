import type { ReactNode } from "react";

// Renders **bold** and [text](url) inside plain strings.
export function renderRichText(text: string): ReactNode[] {
  const tokenRe = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  const parts: ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = tokenRe.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "var(--accent)",
            fontWeight: 600,
            textDecoration: "underline",
            textUnderlineOffset: "3px",
          }}
        >
          {match[1]}
        </a>
      );
    } else {
      parts.push(
        <strong key={match.index} style={{ color: "#F0F4FF" }}>
          {match[3]}
        </strong>
      );
    }
    last = match.index + match[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}
