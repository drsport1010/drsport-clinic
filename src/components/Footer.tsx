"use client";

import { useContent } from "@/lib/useContent";

const navLinks = [
  { href: "/", label: "בית" },
  { href: "/#blog", label: "בלוג" },
  { href: "/shop", label: "החנות" },
  { href: "/#recovery", label: "שיקום" },
  { href: "/#treatments", label: "טיפולים" },
  { href: "/questionnaire", label: "שאלון רפואי" },
  { href: "/#contact", label: "צור קשר" },
];

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="2" width="20" height="20" rx="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg width="15" height="17" viewBox="0 0 24 28" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.74a4.85 4.85 0 0 1-1.01-.05z" />
    </svg>
  );
}

export default function Footer() {
  const { footer } = useContent();
  const phoneHref = "tel:" + (footer.phone || "").replace(/[^0-9+]/g, "");

  return (
    <footer
      style={{
        background: "#0B1F4A",
        borderTop: "1px solid rgba(43,87,184,0.4)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Col 1: Logo + tagline */}
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-3">
              <span
                className="text-xl font-extrabold tracking-widest"
                style={{ color: "#F0F4FF" }}
              >
                DR.{" "}
                <span style={{ color: "var(--accent)" }} className="glow-green">
                  SPORT
                </span>
              </span>
              <span
                className="pulse-dot inline-block w-2.5 h-2.5 rounded-full"
                style={{ background: "var(--accent)" }}
              />
            </div>
            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: "#8BA4C8" }}
            >
              {footer.tagline1}
              <br />
              {footer.tagline2}
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 justify-end">
              <a
                href={footer.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  background:
                    "linear-gradient(135deg, #833AB4, #FD1D1D, #F77737)",
                  color: "#FFF",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.8")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                <InstagramIcon />
              </a>
              <a
                href={footer.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
                style={{
                  background: "#010101",
                  color: "#FFF",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#222")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#010101")}
              >
                <TikTokIcon />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="text-right">
            <h4
              className="text-sm font-extrabold mb-4 tracking-wider uppercase"
              style={{ color: "#F0F4FF" }}
            >
              ניווט
            </h4>
            <nav className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm transition-colors duration-200"
                  style={{ color: "#8BA4C8", textDecoration: "none" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#8BA4C8")}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3: Hours + Contact */}
          <div className="text-right">
            <h4
              className="text-sm font-extrabold mb-4 tracking-wider uppercase"
              style={{ color: "#F0F4FF" }}
            >
              שעות פעילות
            </h4>
            <div className="flex flex-col gap-1.5 mb-6">
              {(footer.hours || []).map((row) => (
                <div key={row.days} className="flex items-center justify-end gap-3">
                  <span className="text-sm" style={{ color: "#8BA4C8" }}>
                    {row.time}
                  </span>
                  <span
                    className="text-sm font-semibold"
                    style={{ color: "#F0F4FF" }}
                  >
                    {row.days}
                  </span>
                </div>
              ))}
            </div>

            <h4
              className="text-sm font-extrabold mb-3 tracking-wider uppercase"
              style={{ color: "#F0F4FF" }}
            >
              צור קשר
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href={phoneHref}
                className="text-sm transition-colors"
                style={{ color: "#8BA4C8", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8BA4C8")}
              >
                📞 {footer.phone}
              </a>
              <a
                href={`mailto:${footer.email}`}
                className="text-sm transition-colors"
                style={{ color: "#8BA4C8", textDecoration: "none" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8BA4C8")}
              >
                ✉️ {footer.email}
              </a>
              <p className="text-sm" style={{ color: "#8BA4C8" }}>
                {footer.address}
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="border-t pt-6 flex items-center justify-between flex-wrap gap-4"
          style={{ borderColor: "rgba(43,87,184,0.3)" }}
        >
          <p className="text-xs" style={{ color: "#8BA4C8" }}>
            Built with ❤️ for Dr. Sport
          </p>
          <p className="text-xs text-right" style={{ color: "#8BA4C8" }}>
            {footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
