import type { Metadata } from "next";
import NewsTicker from "@/components/NewsTicker";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getServerContent } from "@/lib/serverContent";
import { renderRichText } from "@/lib/richText";

export const metadata: Metadata = {
  title: "אודות | Dr. Sport - ד״ר אלון כהן",
  description:
    "ד״ר אלון כהן - רופא ספורט המשלב ידע קליני, הבנה פיזיולוגית מתקדמת וגישה חדשנית לאופטימיזציה גופנית ולונג'ביטי.",
};

const paragraphStyle = { color: "#C3D2E8" };

export default function AboutPage() {
  const { about } = getServerContent();

  return (
    <>
      <NewsTicker />
      <Header />
      <main style={{ paddingTop: "104px", background: "#050E1F" }}>
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-right">
          <div className="flex items-center justify-between gap-6 flex-wrap-reverse mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/dr-alon.jpg"
              alt="ד״ר אלון כהן - רופא ספורט"
              style={{
                width: "clamp(140px, 18vw, 190px)",
                aspectRatio: "4 / 5",
                objectFit: "cover",
                objectPosition: "center 25%",
                borderRadius: "50%",
                border: "3px solid color-mix(in srgb, var(--accent) 50%, transparent)",
                boxShadow: "0 0 40px color-mix(in srgb, var(--accent) 25%, transparent)",
              }}
            />
            <h1
              className="text-3xl md:text-4xl font-extrabold leading-tight"
              style={{ color: "#F0F4FF" }}
            >
              {about.title}
            </h1>
          </div>
          <div
            className="h-1 rounded-full mb-10"
            style={{
              background: "linear-gradient(90deg, transparent, var(--accent))",
              width: "160px",
              marginLeft: "auto",
            }}
          />

          {about.paragraphs.map((paragraph, i) => (
            <p
              key={i}
              className={`text-base leading-relaxed ${i === about.paragraphs.length - 1 ? "mb-10" : "mb-5"}`}
              style={paragraphStyle}
            >
              {renderRichText(paragraph)}
            </p>
          ))}

          {/* Location callout */}
          <div
            className="rounded-2xl p-6 mb-12"
            style={{
              background: "linear-gradient(135deg, #0B1F4A 0%, #1A3A7C 100%)",
              border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
              boxShadow: "0 0 40px color-mix(in srgb, var(--accent) 8%, transparent)",
            }}
          >
            <p
              className="text-lg font-extrabold mb-1"
              style={{ color: "var(--accent)" }}
            >
              📍 מיקום הקליניקה
            </p>
            <p className="text-sm leading-relaxed" style={paragraphStyle}>
              {about.location}
            </p>
          </div>

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
              רוצים לקבוע פגישה?
            </p>
            <p className="text-sm mb-4" style={{ color: "#8BA4C8" }}>
              ייעוץ ראשוני ללא התחייבות · מענה תוך 24 שעות
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
        </article>
      </main>
      <Footer />
    </>
  );
}
