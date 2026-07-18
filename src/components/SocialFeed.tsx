"use client";

import React, { useEffect } from "react";

const BEHOLD_FEED_ID = "LAdSVUWJzmu46rVYEFZa";
const INSTAGRAM_HANDLE = "drsport.il";

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="6" stroke="white" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="white" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1" fill="white" />
    </svg>
  );
}

function BeholdWidget() {
  useEffect(() => {
    if (!document.getElementById("behold-script")) {
      const s = document.createElement("script");
      s.id = "behold-script";
      s.type = "module";
      s.src = "https://w.behold.so/widget.js";
      document.head.appendChild(s);
    }
  }, []);

  return React.createElement("behold-widget", { "feed-id": BEHOLD_FEED_ID });
}

export default function SocialFeed() {
  return (
    <section id="social" className="section-pad" style={{ background: "#0D1B35" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 text-right">
          <div className="flex items-center gap-4 justify-end mb-3">
            <h2 className="text-3xl md:text-4xl font-extrabold" style={{ color: "#F0F4FF" }}>
              עוקבים אחרינו?
            </h2>
            <span
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)" }}
            >
              <InstagramIcon />
            </span>
          </div>
          <div
            className="h-1 rounded-full"
            style={{
              background: "linear-gradient(90deg, transparent, #833AB4, #FD1D1D)",
              width: "220px",
              marginLeft: "auto",
            }}
          />
          <p className="mt-4 text-base" style={{ color: "#8BA4C8" }}>
            רפואת ספורט, פציעות ספורט אקטואליות ומעקב אחרי תהליכי שיקום וההחלמה
          </p>
        </div>

        <BeholdWidget />

        {/* CTA */}
        <div
          className="mt-10 rounded-2xl p-6 text-center"
          style={{
            background: "rgba(43,87,184,0.1)",
            border: "1px solid rgba(43,87,184,0.3)",
          }}
        >
          <p className="text-lg font-bold mb-4" style={{ color: "#F0F4FF" }}>
            עקבו אחרינו ב-{" "}
            <span style={{ color: "var(--accent)" }}>@{INSTAGRAM_HANDLE}</span>
          </p>
          <a
            href={`https://instagram.com/${INSTAGRAM_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-all duration-200"
            style={{
              background: "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)",
              color: "#FFF",
              textDecoration: "none",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <InstagramIcon />
            Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
