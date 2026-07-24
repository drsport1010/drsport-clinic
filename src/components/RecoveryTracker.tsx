"use client";

import { useEffect, useState } from "react";
import { useContent } from "@/lib/useContent";

type Athlete = {
  name: string;
  sport: string;
  injury: string;
  phase: string;
  phaseColor: string;
  progress: number;
  progressDate?: string;
  injuryDate?: string;
  returnDate?: string;
  eta: string;
  description: string;
};

// Auto-advance so the bar is always correct for today's date:
// - with a manually-set progress (> 0), interpolate from it (as of
//   progressDate) up to 100% at returnDate;
// - without one, compute purely from the injuryDate → returnDate timeline.
function computeProgress(a: Athlete, now: number): number {
  const base = typeof a.progress === "number" ? a.progress : 0;
  const ret = Date.parse(a.returnDate || "");
  if (isNaN(ret)) return base;
  if (now >= ret) return 100;
  const anchor = Date.parse(a.progressDate || "");
  const injury = Date.parse(a.injuryDate || "");
  let start: number;
  let startPct: number;
  if (base > 0 && !isNaN(anchor)) {
    start = anchor;
    startPct = base;
  } else if (!isNaN(injury)) {
    start = injury;
    startPct = 0;
  } else if (!isNaN(anchor)) {
    start = anchor;
    startPct = base;
  } else {
    return base;
  }
  if (now <= start || ret <= start) return startPct;
  return Math.min(
    100,
    Math.round(startPct + (100 - startPct) * ((now - start) / (ret - start)))
  );
}

function getProgressGradient(progress: number): string {
  if (progress >= 60) {
    return `linear-gradient(90deg, #1A3A7C 0%, var(--accent) 100%)`;
  }
  return `linear-gradient(90deg, #1A3A7C 0%, #FF6D00 100%)`;
}

export default function RecoveryTracker() {
  const content = useContent();
  // Newest first: reversed relative to the admin-panel list, so the athlete
  // added last in the panel shows at the top of the site.
  const athletes = [...((content.athletes || []) as Athlete[])].reverse();
  const stats = content.recoveryStats || [];

  // Compute after mount to avoid SSR/client clock hydration mismatch
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);

  return (
    <section
      id="recovery"
      className="section-pad"
      style={{ background: "#050E1F" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-right">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-3"
            style={{ color: "#F0F4FF" }}
          >
            מעקב שיקום ספורטאים
          </h2>
          <div
            className="h-1 rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, #FF6D00)",
              width: "200px",
              marginLeft: "auto",
            }}
          />
          <p className="mt-4 text-base" style={{ color: "#8BA4C8" }}>
            מעקב בזמן אמת על תהליך השיקום
          </p>
        </div>

        {/* Athlete Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {athletes.map((athlete, i) => {
            const progress =
              now === null
                ? athlete.progress || 0
                : computeProgress(athlete, now);
            return (
            <div
              key={i}
              className="card-hover rounded-2xl p-6 flex flex-col gap-4"
              style={{
                background: "#0D1B35",
                border: "1px solid rgba(43,87,184,0.3)",
              }}
            >
              {/* Header row */}
              <div className="flex items-start justify-between">
                <div>
                  <h3
                    className="text-lg font-extrabold"
                    style={{ color: "#F0F4FF" }}
                  >
                    {athlete.name}
                  </h3>
                  <p className="text-sm mt-0.5" style={{ color: "#8BA4C8" }}>
                    {athlete.sport}
                  </p>
                </div>
                {/* Phase badge */}
                <span
                  className="text-xs font-bold px-3 py-1 rounded-full flex-shrink-0"
                  style={{
                    background: athlete.phaseColor + "22",
                    color: athlete.phaseColor,
                    border: `1px solid ${athlete.phaseColor}44`,
                  }}
                >
                  {athlete.phase}
                </span>
              </div>

              {/* Injury */}
              <div
                className="text-sm px-3 py-2 rounded-lg"
                style={{
                  background: "rgba(43,87,184,0.15)",
                  color: "#8BA4C8",
                }}
              >
                🤕 <span className="font-semibold">{athlete.injury}</span>
              </div>

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: "#8BA4C8" }}>
                {athlete.description}
              </p>

              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs" style={{ color: "#8BA4C8" }}>
                    התקדמות שיקום
                  </span>
                  <span
                    className="text-sm font-extrabold"
                    style={{
                      color: progress >= 60 ? "var(--accent)" : "#FF6D00",
                    }}
                  >
                    {progress}%
                  </span>
                </div>
                <div
                  className="w-full h-3 rounded-full overflow-hidden"
                  style={{ background: "rgba(43,87,184,0.2)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${progress}%`,
                      background: getProgressGradient(progress),
                      boxShadow:
                        progress >= 60
                          ? "0 0 10px color-mix(in srgb, var(--accent) 40%, transparent)"
                          : "0 0 10px rgba(255,109,0,0.4)",
                    }}
                  />
                </div>
              </div>

              {/* ETA */}
              <div
                className="flex items-center gap-2 text-sm"
                style={{ color: "#8BA4C8" }}
              >
                <span>📅</span>
                <span>
                  צפי חזרה:{" "}
                  <strong style={{ color: "#F0F4FF" }}>{athlete.eta}</strong>
                </span>
              </div>
            </div>
            );
          })}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="rounded-xl p-4 text-center"
              style={{
                background: "rgba(43,87,184,0.1)",
                border: "1px solid rgba(43,87,184,0.25)",
              }}
            >
              <div
                className="text-2xl font-extrabold glow-green"
                style={{ color: "var(--accent)" }}
              >
                {stat.value}
              </div>
              <div className="text-xs mt-1" style={{ color: "#8BA4C8" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
