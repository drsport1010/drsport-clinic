"use client";

import { useMemo, useState } from "react";
import { useContent } from "@/lib/useContent";
import { parseArticleBody } from "@/lib/articles";
import { renderRichText } from "@/lib/richText";

export default function WeeklyUpdateView() {
  const { weeklyUpdates } = useContent();
  const editions = useMemo(
    () => [...(weeklyUpdates || [])].sort((a, b) => (a.id < b.id ? 1 : -1)),
    [weeklyUpdates]
  );
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const edition =
    editions.find((e) => e.id === selectedId) || editions[0];
  const sections = useMemo(
    () => (edition ? parseArticleBody(edition.body) : []),
    [edition]
  );

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-right">
      {/* Page header */}
      <span
        className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-4"
        style={{
          background: "color-mix(in srgb, var(--accent) 13%, transparent)",
          color: "var(--accent)",
          border: "1px solid color-mix(in srgb, var(--accent) 27%, transparent)",
        }}
      >
        מתעדכן בכל יום שישי
      </span>
      <h1
        className="text-3xl md:text-4xl font-extrabold leading-tight mb-3"
        style={{ color: "#F0F4FF" }}
      >
        העדכון השבועי של ד״ר ספורט
      </h1>
      <p className="text-base mb-8" style={{ color: "#8BA4C8" }}>
        סיכום הפציעות החדשות של השבוע ומעקב קצר אחרי הספורטאים שבשיקום
      </p>
      <div
        className="h-1 rounded-full mb-10"
        style={{
          background: "linear-gradient(90deg, transparent, var(--accent))",
          width: "160px",
          marginLeft: "auto",
        }}
      />

      {/* Editions timeline — newest first, scrollable pills */}
      {editions.length > 0 && (
        <div className="mb-12">
          <p className="text-sm font-bold mb-3" style={{ color: "#8BA4C8" }}>
            🗓 מהדורות
          </p>
          <div
            className="flex gap-3 overflow-x-auto pb-2"
            style={{ scrollbarWidth: "thin" }}
          >
            {editions.map((e, i) => {
              const active = edition && e.id === edition.id;
              return (
                <button
                  key={e.id}
                  onClick={() => setSelectedId(e.id)}
                  className="shrink-0 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200"
                  style={{
                    background: active ? "var(--accent)" : "#0D1B35",
                    color: active ? "#050E1F" : "#C3D2E8",
                    border: active
                      ? "1px solid var(--accent)"
                      : "1px solid rgba(43,87,184,0.4)",
                    cursor: "pointer",
                    boxShadow: active
                      ? "0 0 18px color-mix(in srgb, var(--accent) 35%, transparent)"
                      : "none",
                  }}
                >
                  {e.dateLabel}
                  {i === 0 && (
                    <span
                      className="mr-2 text-[10px] font-extrabold px-2 py-0.5 rounded-full"
                      style={{
                        background: active
                          ? "rgba(5,14,31,0.2)"
                          : "color-mix(in srgb, var(--accent) 15%, transparent)",
                        color: active ? "#050E1F" : "var(--accent)",
                      }}
                    >
                      חדש
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {!edition && (
        <p className="text-base" style={{ color: "#C3D2E8" }}>
          העדכון השבועי הראשון בדרך - חזרו אלינו ביום שישי.
        </p>
      )}

      {edition && (
        <>
          {/* Edition headline */}
          <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
            <h2
              className="text-xl md:text-2xl font-extrabold leading-snug"
              style={{ color: "#F0F4FF" }}
            >
              {edition.headline}
            </h2>
            <span className="text-sm font-bold" style={{ color: "#8BA4C8" }}>
              {edition.dateLabel}
            </span>
          </div>

          {/* Sections — same look as the article pages */}
          {sections.map((section, si) => (
            <section key={si} className="mb-10">
              {section.heading && (
                <h3
                  className="text-xl md:text-2xl font-extrabold mb-4"
                  style={{ color: "var(--accent)" }}
                >
                  {section.heading}
                </h3>
              )}
              {section.paragraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-base leading-relaxed mb-4"
                  style={{ color: "#C3D2E8" }}
                >
                  {renderRichText(paragraph)}
                </p>
              ))}
              {section.bullets && (
                <ul className="flex flex-col gap-3 mt-2 pr-1">
                  {section.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="rounded-xl px-4 py-3 text-sm leading-relaxed"
                      style={{
                        background: "#0D1B35",
                        border: "1px solid rgba(43,87,184,0.3)",
                        color: "#C3D2E8",
                      }}
                    >
                      {bullet.label && (
                        <strong style={{ color: "#F0F4FF" }}>
                          {bullet.label}{" "}
                        </strong>
                      )}
                      {bullet.text}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          {/* CTA */}
          <div
            className="rounded-2xl p-6 text-center"
            style={{
              background: "#0D1B35",
              border: "1px solid rgba(43,87,184,0.3)",
            }}
          >
            <p
              className="text-lg font-extrabold mb-1"
              style={{ color: "#F0F4FF" }}
            >
              נפצעת? אל תחכה שיעבור לבד
            </p>
            <p className="text-sm mb-4" style={{ color: "#8BA4C8" }}>
              קבע תור לאבחון מקצועי אצל ד״ר אלון כהן
            </p>
            <a
              href="tel:0546635335"
              className="inline-block text-sm font-bold px-6 py-3 rounded-full"
              style={{
                background: "var(--accent)",
                color: "#050E1F",
                textDecoration: "none",
              }}
            >
              📞 054-663-5335
            </a>
          </div>

          {/* Signature */}
          <p
            className="text-center text-lg font-extrabold mt-10"
            style={{ color: "var(--accent)" }}
          >
            ד״ר אלון כהן - רפואת ספורט מנצחת
          </p>
        </>
      )}
    </article>
  );
}
