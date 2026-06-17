"use client";

import { useState } from "react";
import Image from "next/image";

const navLinks = [
  { href: "#home", label: "בית" },
  { href: "#blog", label: "בלוג" },
  { href: "#shop", label: "החנות" },
  { href: "#recovery", label: "שיקום" },
  { href: "#treatments", label: "טיפולים" },
  { href: "#contact", label: "צור קשר" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header
      className="fixed right-0 left-0 z-50"
      style={{
        top: "40px",
        background: "linear-gradient(135deg, #0B1F4A 0%, #1A3A7C 100%)",
        borderBottom: "1px solid rgba(43, 87, 184, 0.4)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo — right side in RTL */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <a href="#home" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
              <Image
                src="/logo.jpg"
                alt="Dr. Sport — Dr. Alon Cohen"
                width={130}
                height={44}
                style={{ objectFit: "contain", borderRadius: "6px", background: "white", padding: "4px 8px" }}
                priority
              />
            </a>
          </div>

          {/* Desktop nav — left side in RTL */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-semibold transition-colors duration-200"
                style={{ color: "#8BA4C8", textDecoration: "none" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "#00E676")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "#8BA4C8")
                }
              >
                {link.label}
              </a>
            ))}
            <a
              href="tel:03-123-4567"
              className="text-sm font-bold px-4 py-2 rounded-full transition-all duration-200"
              style={{
                background: "#00E676",
                color: "#050E1F",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#00c864";
                e.currentTarget.style.boxShadow =
                  "0 0 16px rgba(0,230,118,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#00E676";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              📞 03-123-4567
            </a>
          </nav>

          {/* Hamburger — left side on mobile */}
          <button
            type="button"
            className="md:hidden flex flex-col gap-1.5 p-4"
            aria-label="פתח תפריט"
            style={{ cursor: "pointer", WebkitTapHighlightColor: "transparent", touchAction: "manipulation", position: "relative", zIndex: 100 }}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: "#F0F4FF",
                transform: menuOpen
                  ? "rotate(45deg) translate(4px, 4px)"
                  : "none",
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: "#F0F4FF",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-0.5 transition-all duration-300"
              style={{
                background: "#F0F4FF",
                transform: menuOpen
                  ? "rotate(-45deg) translate(4px, -4px)"
                  : "none",
              }}
            />
          </button>
        </div>

        {/* Mobile menu — absolute so it floats over page content */}
        {menuOpen && (
          <div
            className="md:hidden py-4 border-t"
            style={{
              borderColor: "rgba(43,87,184,0.4)",
              position: "absolute",
              top: "64px",
              right: 0,
              left: 0,
              background: "linear-gradient(135deg, #0B1F4A 0%, #1A3A7C 100%)",
              zIndex: 100,
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-semibold py-2 px-3 rounded-lg transition-colors"
                  style={{ color: "#F0F4FF", textDecoration: "none" }}
                  onClick={() => setMenuOpen(false)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "rgba(0,230,118,0.1)";
                    e.currentTarget.style.color = "#00E676";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = "#F0F4FF";
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:03-123-4567"
                className="text-base font-bold py-2 px-4 rounded-full text-center mt-2"
                style={{
                  background: "#00E676",
                  color: "#050E1F",
                  textDecoration: "none",
                }}
                onClick={() => setMenuOpen(false)}
              >
                📞 03-123-4567
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
