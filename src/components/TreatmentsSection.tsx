"use client";

import { useContent } from "@/lib/useContent";

export default function TreatmentsSection() {
  const treatments = useContent().treatments || [];
  return (
    <section
      id="treatments"
      className="section-pad"
      style={{ background: "#050E1F" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-right">
          <h2
            className="text-3xl md:text-4xl font-extrabold mb-2"
            style={{ color: "#F0F4FF" }}
          >
            טיפולים קליניים
          </h2>
          <p className="text-base" style={{ color: "#8BA4C8" }}>
            טכנולוגיה מתקדמת, ניסיון מוכח, תוצאות אמיתיות
          </p>
          <div
            className="h-1 rounded-full mt-3"
            style={{
              background: "linear-gradient(90deg, transparent, #2B57B8)",
              width: "180px",
              marginLeft: "auto",
            }}
          />
        </div>

        {/* Treatments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {treatments.map((t, i) => (
            <div
              key={i}
              className="card-hover rounded-2xl p-6 flex gap-5"
              style={{
                background: "#0D1B35",
                border: "1px solid rgba(43,87,184,0.3)",
              }}
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 text-3xl"
                style={{
                  background: t.accent + "20",
                  border: `1px solid ${t.accent}40`,
                }}
              >
                {t.icon}
              </div>
              <div>
                <h3
                  className="text-lg font-bold mb-2"
                  style={{ color: "#F0F4FF" }}
                >
                  {t.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "#8BA4C8" }}
                >
                  {t.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
