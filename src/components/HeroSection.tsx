"use client";

import Link from "next/link";

export default function HeroSection() {
  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #050E1F 0%, #0B1F4A 50%, #050E1F 100%)",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(43,87,184,0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(43,87,184,0.07) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
          pointerEvents: "none",
        }}
      />

      {/* Glowing orb top-left */}
      <div
        style={{
          position: "absolute",
          top: "-10%",
          left: "10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(0,230,118,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Glowing orb bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: "-15%",
          right: "5%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(43,87,184,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        style={{ width: "100%", paddingTop: "124px" }}
      >
        <div className="text-right max-w-3xl mr-0 ml-auto">
          {/* Badge */}
          <div className="flex items-center gap-2 justify-end mb-6">
            <span
              className="text-xs font-bold px-4 py-1.5 rounded-full"
              style={{
                background: "rgba(0,230,118,0.12)",
                color: "#00E676",
                border: "1px solid rgba(0,230,118,0.3)",
                letterSpacing: "0.08em",
              }}
            >
              מרפאת ספורט מובילה בישראל
            </span>
          </div>

          {/* Main title */}
          <h1
            className="font-extrabold leading-tight mb-4"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4.8rem)",
              color: "#F0F4FF",
              lineHeight: 1.15,
            }}
          >
            <span className="neon-green glow-green">ד״ר ספורט</span>
            {" - "}
            ד״ר אלון כהן
          </h1>

          {/* Subtitle */}
          <h2
            className="font-bold mb-6"
            style={{
              fontSize: "clamp(1.3rem, 3vw, 2.2rem)",
              color: "#F0F4FF",
              lineHeight: 1.3,
            }}
          >
            רפואת ספורט{" "}
            <span style={{ color: "#FF6D00" }}>מנצחת</span>
          </h2>

          {/* Description */}
          <p
            className="text-base md:text-lg leading-relaxed mb-10 max-w-xl mr-0 ml-auto"
            style={{ color: "#8BA4C8" }}
          >
            רפואת ספורט מתקדמת ומותאמת אישית, רפואה רגנרטיבית, אבחון פציעות ספורט, טיפול ושיקום ספורטאים
          </p>

          {/* CTA Buttons */}
          <div className="flex items-center gap-4 justify-end flex-wrap">
            <a
              href="#contact"
              className="px-8 py-4 rounded-xl font-extrabold text-base transition-all duration-200"
              style={{
                background: "#00E676",
                color: "#050E1F",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "#00c864";
                el.style.boxShadow = "0 0 30px rgba(0,230,118,0.4)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "#00E676";
                el.style.boxShadow = "none";
                el.style.transform = "none";
              }}
            >
              📅 קבע תור
            </a>
            <Link
              href="/about"
              className="px-8 py-4 rounded-xl font-extrabold text-base transition-all duration-200"
              style={{
                background: "transparent",
                color: "#F0F4FF",
                textDecoration: "none",
                border: "1px solid rgba(240,244,255,0.3)",
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = "rgba(240,244,255,0.07)";
                el.style.borderColor = "rgba(240,244,255,0.6)";
                el.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = "transparent";
                el.style.borderColor = "rgba(240,244,255,0.3)";
                el.style.transform = "none";
              }}
            >
              אודות
            </Link>
          </div>

        </div>
      </div>

    </section>
  );
}
