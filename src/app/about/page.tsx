import type { Metadata } from "next";
import NewsTicker from "@/components/NewsTicker";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "אודות | Dr. Sport - ד״ר אלון כהן",
  description:
    "ד״ר אלון כהן - רופא ספורט המשלב ידע קליני, הבנה פיזיולוגית מתקדמת וגישה חדשנית לאופטימיזציה גופנית ולונג'ביטי.",
};

const paragraphStyle = { color: "#C3D2E8" };

export default function AboutPage() {
  return (
    <>
      <NewsTicker />
      <Header />
      <main style={{ paddingTop: "104px", background: "#050E1F" }}>
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-right">
          <div className="flex items-center justify-between gap-6 flex-wrap-reverse mb-4">
            <img
              src="/dr-alon.jpg"
              alt="ד״ר אלון כהן - רופא ספורט"
              style={{
                width: "clamp(140px, 18vw, 190px)",
                aspectRatio: "4 / 5",
                objectFit: "cover",
                objectPosition: "center 25%",
                borderRadius: "50%",
                border: "3px solid rgba(0,230,118,0.5)",
                boxShadow: "0 0 40px rgba(0,230,118,0.25)",
              }}
            />
            <h1
              className="text-3xl md:text-4xl font-extrabold leading-tight"
              style={{ color: "#F0F4FF" }}
            >
              אודות ד״ר אלון כהן
            </h1>
          </div>
          <div
            className="h-1 rounded-full mb-10"
            style={{
              background: "linear-gradient(90deg, transparent, #00E676)",
              width: "160px",
              marginLeft: "auto",
            }}
          />

          <p className="text-base leading-relaxed mb-5" style={paragraphStyle}>
            <strong style={{ color: "#F0F4FF" }}>ד״ר אלון כהן</strong> הוא רופא
            ספורט, המשלב בין ידע קליני, הבנה פיזיולוגית מתקדמת וגישה חדשנית
            לעולם האופטימיזציה הגופנית והארכת חיים בריאים (Longevity). את דרכו
            המקצועית החל בפקולטה לרפואה של אוניברסיטת בר-אילן, אותה סיים בהצלחה
            יתרה עם עבודת גמר מצטיינת, ולאחר מכן המשיך ללימודי המשך ברפואת
            ספורט באוניברסיטת תל אביב.
          </p>

          <p className="text-base leading-relaxed mb-5" style={paragraphStyle}>
            במהלך השנים צבר ד״ר כהן ניסיון קליני עשיר ומגוון במסגרת עבודתו בבית
            החולים &quot;איכילוב&quot;, שם פעל במחלקות הכירורגיות והפנימיות -
            ניסיון המעניק לו ראייה רפואית הוליסטית ויכולת אבחון מדויקת של מצבים
            מורכבים.
          </p>

          <p className="text-base leading-relaxed mb-5" style={paragraphStyle}>
            כיום, בקליניקה שלו, ד״ר כהן מציע מעטפת רפואית שלמה עבור ספורטאים
            חובבים ומקצוענים, קבוצות ואיגודי ספורט, לצד אנשים השואפים לשפר את
            ביצועיהם הגופניים ולשמור על חיוניות לאורך שנים. הקליניקה מתמחה
            באבחון וטיפול בפציעות ספורט, ניתוח מבנה גוף מקיף, בדיקות אחוזי שומן
            ומסת שריר, בדיקות תפקודי ריאות (ספירומטריה), בדיקות מאמץ
            (ארגומטריה), בדיקות CPET ואק״ג.
          </p>

          <p className="text-base leading-relaxed mb-5" style={paragraphStyle}>
            מתוך תפיסה רפואית מתקדמת הדוגלת הן בריפוי והן במניעה ובשילוב רפואת
            לונג&apos;ביטי, ד״ר כהן מיישם מגוון רחב של טיפולים פרוגרסיביים
            בחזית המדע. ארגז הכלים הטיפולי שלו כולל הזרקות PRP (פלזמה עשירה
            בטסיות) למפרקים, הזרקות סטרואידים מונחות, טיפול בגלי הלם, טיפול
            באוזון, דיקור יבש, עירויי ויטמינים מותאמים אישית והתאמת תוספי תזונה
            רפואיים מבוססי מחקר.
          </p>

          <p className="text-base leading-relaxed mb-10" style={paragraphStyle}>
            ד״ר אלון כהן מאמין בליווי אישי, מקצועי ובלתי מתפשר, במטרה להחזיר את
            המטופל לפעילות מלאה במינימום זמן ובמקסימום בטיחות. בנוסף, הקליניקה
            מציעה ליווי למען שיפור איכות החיים, שיקום ואיזון הגוף ומתן כלים
            רפואיים למען אריכות ושיפור איכות החיים.
          </p>

          {/* Location callout */}
          <div
            className="rounded-2xl p-6 mb-12"
            style={{
              background: "linear-gradient(135deg, #0B1F4A 0%, #1A3A7C 100%)",
              border: "1px solid rgba(0,230,118,0.3)",
              boxShadow: "0 0 40px rgba(0,230,118,0.08)",
            }}
          >
            <p
              className="text-lg font-extrabold mb-1"
              style={{ color: "#00E676" }}
            >
              📍 מיקום הקליניקה
            </p>
            <p className="text-sm leading-relaxed" style={paragraphStyle}>
              מרכז הספורט של אוניברסיטת תל אביב (קבלת קהל בתיאום מראש בלבד).
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
                background: "#00E676",
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
