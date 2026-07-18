import type { Metadata } from "next";
import NewsTicker from "@/components/NewsTicker";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QuestionnaireForm from "@/components/QuestionnaireForm";

export const metadata: Metadata = {
  title: "שאלון קליטה רפואי | Dr. Sport - ד״ר אלון כהן",
  description:
    "שאלון קליטה רפואי לפני פגישה בקליניקה של ד״ר אלון כהן - פציעות ספורט ופעילות גופנית. מילוי השאלון מסייע להפיק את המירב מהמפגש הרפואי.",
  robots: { index: false },
};

export default function QuestionnairePage() {
  return (
    <>
      <NewsTicker />
      <Header />
      <main style={{ paddingTop: "104px", background: "#050E1F" }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-right">
          <h1
            className="text-3xl md:text-4xl font-extrabold leading-tight mb-3"
            style={{ color: "#F0F4FF" }}
          >
            שאלון קליטה רפואי
          </h1>
          <p className="text-base mb-2" style={{ color: "#8BA4C8" }}>
            פציעות ספורט ופעילות גופנית
          </p>
          <div
            className="h-1 rounded-full mb-8"
            style={{
              background: "linear-gradient(90deg, transparent, var(--accent))",
              width: "160px",
              marginLeft: "auto",
            }}
          />
          <div
            className="rounded-2xl p-5 mb-8"
            style={{
              background: "linear-gradient(135deg, #0B1F4A 0%, #1A3A7C 100%)",
              border: "1px solid color-mix(in srgb, var(--accent) 30%, transparent)",
            }}
          >
            <p className="text-sm leading-relaxed" style={{ color: "#C3D2E8" }}>
              כדי להפיק את המירב מהמפגש, אנא מלא/י את השאלון לפני ההגעה לקליניקה.
              המילוי אורך כ-5 דקות, ובסיומו תועבר/י ישירות לקביעת מועד הפגישה ביומן.
            </p>
          </div>
          <QuestionnaireForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
