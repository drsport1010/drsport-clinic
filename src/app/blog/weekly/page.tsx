import type { Metadata } from "next";
import Link from "next/link";
import NewsTicker from "@/components/NewsTicker";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WeeklyUpdateView from "@/components/WeeklyUpdateView";
import { getServerContent } from "@/lib/serverContent";

export function generateMetadata(): Metadata {
  const latest = (getServerContent().weeklyUpdates || [])[0];
  return {
    title: "העדכון השבועי של ד״ר ספורט | Dr. Sport - ד״ר אלון כהן",
    description: latest
      ? `${latest.headline} - סיכום פציעות הספורט של השבוע ומעקב שיקום הספורטאים, מאת ד״ר אלון כהן.`
      : "סיכום שבועי של פציעות ספורט חדשות ומעקב שיקום ספורטאים, מאת ד״ר אלון כהן.",
  };
}

export default function WeeklyUpdatePage() {
  return (
    <>
      <NewsTicker />
      <Header />
      <main style={{ paddingTop: "104px", background: "#050E1F" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 text-right">
          <Link
            href="/#blog"
            className="inline-block text-sm font-bold"
            style={{ color: "var(--accent)", textDecoration: "none" }}
          >
            → חזרה לבלוג
          </Link>
        </div>
        <WeeklyUpdateView />
      </main>
      <Footer />
    </>
  );
}
